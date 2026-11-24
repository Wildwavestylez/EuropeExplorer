import { useCallback, useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

// Add a country here only when its published source is ready.
// Broad envelopes decide which country sources may intersect the viewport;
// SQL always applies the exact visible bounds, including cross-border views.
const COUNTRY_SOURCES = [
  { code: 'CZ', label: 'Czechia / Neon', table: 'czechia_cap_records', bounds: { south: 48.55, west: 12.09, north: 51.06, east: 18.86 } },
  { code: 'IT', label: 'Italy / Neon', table: 'italy_cap_records', bounds: { south: 35.49, west: 6.62, north: 47.09, east: 18.52 } },
  { code: 'SK', label: 'Slovakia / Neon', table: 'slovakia_cap_records', bounds: { south: 47.73, west: 16.83, north: 49.61, east: 22.57 } },
  // Germany will be enabled here after its published Neon migration is complete.
]

const MAX_DETAIL_POINTS = 5000
const MAX_CACHE_ENTRIES = 24
const VIEWPORT_BUFFER_RATIO = 0.45

function intersects(a, b) {
  return a.west <= b.east && a.east >= b.west && a.south <= b.north && a.north >= b.south
}

function makeViewportKey(bounds, zoom) {
  return [zoom, bounds.south, bounds.west, bounds.north, bounds.east]
    .map(value => typeof value === 'number' ? value.toFixed(3) : value).join(':')
}

function normalizeRows(rows, country) {
  return rows.map(row => ({
    ...row,
    postcode: row.postcode == null ? '' : String(row.postcode),
    lat: Number(row.lat),
    lon: Number(row.lon),
    country_code: country,
    is_cluster: false,
  })).filter(point => Number.isFinite(point.lat) && Number.isFinite(point.lon))
}

async function queryCountry(source, bounds) {
  const allRows = []
  const pageSize = 1000
  let offset = 0
  while (true) {
    const params = new URLSearchParams({
      country: source.code,
      south: String(bounds.south), west: String(bounds.west),
      north: String(bounds.north), east: String(bounds.east),
      offset: String(offset),
    })
    const response = await fetch('/api/viewport?' + params.toString())
    const payload = await response.json()
    if (!response.ok) throw new Error(payload.error || 'Viewport API request failed.')
    const rows = payload.points || []
    allRows.push(...rows)
    if (!payload.hasMore || rows.length < pageSize) break
    offset += pageSize
  }
  return normalizeRows(allRows, source.code)
}

const MAP_CATEGORY_ICONS = {
  castle: '🏰',
  religious_site: '⛪',
  historical_monument: '🏛️',
  architecture: '🏛️',
  historic_city: '🏘️',
  museum: '🖼️',
  archaeological_site: '🏺',
  nature: '🌳',
  viewpoint_landscape: '🏞️',
  park_garden: '🌿',
  technical_heritage: '⚙️',
  cultural_site: '🎭',
  visitor_attraction: '🎡',
  local_culture: '🎨',
  science_site: '🔬',
  personality: '👤',
  sports_venue: '🏟️',
}

function makeMarker(point, zoom) {
  const category = point.map_category || point.category
  const icon = MAP_CATEGORY_ICONS[category] || '📍'
  return L.marker([point.lat, point.lon], {
    icon: L.divIcon({
      className: 'fact-pin-icon',
      html: '<span class="fact-pin-emoji" role="img" aria-label="' + icon + '">' + icon + '</span>',
      iconSize: [34, 38],
      iconAnchor: [17, 34],
    }),
    title: zoom >= 13 ? (point.title || point.postcode || '') : '',
    riseOnHover: true,
  })
}

export default function ViewportFactLayer({ onSelectFact, onSourceTiming }) {
  const map = useMap()
  const cacheRef = useRef(new Map())
  const loadedBoundsRef = useRef(null)
  const loadedSourcesRef = useRef('')
  const requestIdRef = useRef(0)
  const timerRef = useRef(null)
  const layerRef = useRef(null)
  const markerByKeyRef = useRef(new Map())
  const callbackRef = useRef(onSelectFact)
  const timingCallbackRef = useRef(onSourceTiming)
  callbackRef.current = onSelectFact
  timingCallbackRef.current = onSourceTiming

  const renderPoints = useCallback((points, zoom) => {
    const layer = layerRef.current
    if (!layer) return

    // Diff the incoming viewport against existing markers. Do not tear down
    // thousands of markers on every fetch: that forces a full cluster rebuild
    // and causes visible frame drops while panning/zooming.
    const desired = new Map()
    points.forEach(point => {
      const key = [point.country_code, point.postcode, point.fact_id || (point.lat + ':' + point.lon)].join(':')
      desired.set(key, point)
    })

    for (const [key, marker] of markerByKeyRef.current) {
      if (!desired.has(key)) {
        layer.removeLayer(marker)
        markerByKeyRef.current.delete(key)
      }
    }

    const additions = []
    for (const [key, point] of desired) {
      if (markerByKeyRef.current.has(key)) continue
      const marker = makeMarker(point, zoom)
      marker.on('click', () => {
        callbackRef.current?.({
          id: point.id || point.postal_id || point.country_code + ':' + point.postcode,
          country_code: point.country_code,
          postal_code: point.postcode,
          city: point.city,
        }, {
          id: point.fact_id,
          title: point.title,
          category: point.category,
          map_category: point.map_category || point.category,
          location: { lat: point.lat, lon: point.lon },
        })
      })
      markerByKeyRef.current.set(key, marker)
      additions.push(marker)
    }

    if (additions.length) layer.addLayers(additions)
  }, [])

  const loadViewport = useCallback(async () => {
    const mapBounds = map.getBounds()
    const zoom = map.getZoom()
    const bounds = {
      south: Math.max(-90, mapBounds.getSouth()),
      north: Math.min(90, mapBounds.getNorth()),
      west: Math.max(-180, mapBounds.getWest()),
      east: Math.min(180, mapBounds.getEast()),
    }
    const latPadding = (bounds.north - bounds.south) * VIEWPORT_BUFFER_RATIO
    const lonPadding = (bounds.east - bounds.west) * VIEWPORT_BUFFER_RATIO
    const queryBounds = {
      south: Math.max(-90, bounds.south - latPadding),
      north: Math.min(90, bounds.north + latPadding),
      west: Math.max(-180, bounds.west - lonPadding),
      east: Math.min(180, bounds.east + lonPadding),
    }
    // Include every country touched by the buffered viewport so border and
    // tri-border views do not miss points just outside the visible rectangle.
    const sources = COUNTRY_SOURCES.filter(source => intersects(source.bounds, queryBounds))
    const sourceKey = sources.map(source => source.code).join(',')
    const loadedBounds = loadedBoundsRef.current
    const containsViewport = loadedBounds &&
      bounds.south >= loadedBounds.south && bounds.north <= loadedBounds.north &&
      bounds.west >= loadedBounds.west && bounds.east <= loadedBounds.east

    // Keep the same marker set while the user moves/zooms inside the already
    // loaded safety margin. MarkerCluster can then recalculate naturally,
    // instead of clearing and rebuilding every cluster after each gesture.
    if (containsViewport && loadedSourcesRef.current === sourceKey) return

    const key = makeViewportKey(queryBounds, 0)
    const requestId = ++requestIdRef.current

    if (!sources.length) {
      renderPoints([], zoom)
      return
    }

    if (cacheRef.current.has(key)) {
      loadedBoundsRef.current = queryBounds
      loadedSourcesRef.current = sourceKey
      renderPoints(cacheRef.current.get(key), zoom)
      return
    }

    const results = await Promise.all(sources.map(async source => {
      const startedAt = performance.now()
      try {
        const points = await queryCountry(source, queryBounds)
        timingCallbackRef.current?.({
          source: source.label,
          milliseconds: Math.round((performance.now() - startedAt) * 10) / 10,
          points: points.length,
          viewport: key,
          status: 'ok',
          mode: 'exact viewport',
          limited: points.length === MAX_DETAIL_POINTS,
        })
        return points
      } catch (error) {
        timingCallbackRef.current?.({
          source: source.label,
          milliseconds: Math.round((performance.now() - startedAt) * 10) / 10,
          points: 0,
          viewport: key,
          status: 'error',
          error: String(error?.message || error),
        })
        console.error('Europe Explorer ' + source.label + ' failed:', error)
        return []
      }
    }))

    if (requestId !== requestIdRef.current) return
    const points = results.flat()
    cacheRef.current.set(key, points)
    loadedBoundsRef.current = queryBounds
    loadedSourcesRef.current = sourceKey
    while (cacheRef.current.size > MAX_CACHE_ENTRIES) {
      cacheRef.current.delete(cacheRef.current.keys().next().value)
    }
    renderPoints(points, zoom)
    console.info('[Europe Explorer] exact viewport loaded', {
      zoom,
      countriesQueried: sources.map(source => source.code),
      points: points.length,
      bounds: queryBounds,
      visibleBounds: bounds,
    })
  }, [map, renderPoints])

  useEffect(() => {
    const layer = L.markerClusterGroup({
      iconCreateFunction: cluster => {
        const total = cluster.getAllChildMarkers().reduce((sum, marker) => sum + (Number(marker.options.featureCount) || 1), 0)
        return L.divIcon({ className: 'fact-cluster-icon', html: '<span class="fact-cluster-count">' + total + '</span>', iconSize: [42, 42], iconAnchor: [21, 21] })
      },
      chunkedLoading: true,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 52,
      // Keep clusters enabled at every zoom level. Coincident facts stay
      // visible as a counted cluster; spiderfy reveals them on click at max zoom.
    })
    layerRef.current = layer
    map.addLayer(layer)

    const scheduleLoad = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      requestIdRef.current += 1
      timerRef.current = window.setTimeout(() => loadViewport(), 180)
    }
    map.on('moveend', scheduleLoad)
    map.on('zoomend', scheduleLoad)
    scheduleLoad()

    return () => {
      map.off('moveend', scheduleLoad)
      map.off('zoomend', scheduleLoad)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      requestIdRef.current += 1
      map.removeLayer(layer)
      layer.clearLayers()
      markerByKeyRef.current.clear()
      layerRef.current = null
      cacheRef.current.clear()
      loadedBoundsRef.current = null
      loadedSourcesRef.current = ''
    }
  }, [map, loadViewport])

  return null
}
