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
const VIEWPORT_BUFFER_RATIO = 0.2
const VIEWPORT_DEBOUNCE_MS = 300
const MIN_LIVE_POI_ZOOM = 12

function getAggregationCellSize(zoom) {
  if (zoom <= 7) return 0.35
  if (zoom <= 9) return 0.12
  if (zoom <= 11) return 0.04
  return 0
}

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
    is_cluster: Boolean(row.is_cluster),
    feature_count: Number(row.feature_count) || 1,
  })).filter(point => Number.isFinite(point.lat) && Number.isFinite(point.lon))
}

const RETRYABLE_HTTP_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504])

function waitBeforeRetry(signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted.', 'AbortError'))
      return
    }
    const timer = window.setTimeout(resolve, 900)
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer)
      reject(new DOMException('Request aborted.', 'AbortError'))
    }, { once: true })
  })
}

async function fetchJsonWithRetry(url, signal) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, { signal })
      const payload = await response.json()
      if (response.ok) return payload

      const error = new Error(payload.error || 'Viewport API request failed.')
      error.status = response.status
      if (attempt === 0 && RETRYABLE_HTTP_STATUSES.has(response.status)) {
        console.warn('[Europe Explorer] temporary viewport error; retrying once:', response.status)
        await waitBeforeRetry(signal)
        continue
      }
      throw error
    } catch (error) {
      if (error?.name === 'AbortError') throw error
      const retryable = error?.status == null || RETRYABLE_HTTP_STATUSES.has(error.status)
      if (attempt === 0 && retryable) {
        console.warn('[Europe Explorer] viewport request failed; retrying once:', error?.message || error)
        await waitBeforeRetry(signal)
        continue
      }
      throw error
    }
  }
  throw new Error('Viewport API request failed after retry.')
}

async function queryCountry(source, bounds, zoom, signal) {
  const allRows = []
  const pageSize = 1000
  let offset = 0
  const maxPoints = MAX_DETAIL_POINTS
  while (allRows.length < maxPoints) {
    const params = new URLSearchParams({
      country: source.code,
      south: String(bounds.south), west: String(bounds.west),
      north: String(bounds.north), east: String(bounds.east),
      offset: String(offset),
      zoom: String(zoom),
    })
    const payload = await fetchJsonWithRetry('/api/viewport?' + params.toString(), signal)
    const rows = payload.points || []
    allRows.push(...rows.slice(0, maxPoints - allRows.length))
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
  if (point.is_cluster) {
    return L.marker([point.lat, point.lon], {
      icon: L.divIcon({ className: 'fact-cluster-icon', html: '<span class="fact-cluster-count">' + point.feature_count + '</span>', iconSize: [42, 42], iconAnchor: [21, 21] }),
      title: point.feature_count + ' discoveries',
      riseOnHover: true,
      featureCount: point.feature_count,
    })
  }
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
  const loadedZoomRef = useRef(null)
  const requestIdRef = useRef(0)
  const abortRef = useRef(null)
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
      const key = [point.country_code, point.postcode, point.is_cluster ? 'grid:' + point.lat + ':' + point.lon : (point.fact_id || (point.lat + ':' + point.lon))].join(':')
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
        if (point.is_cluster) {
          map.setView([point.lat, point.lon], Math.min(map.getMaxZoom(), map.getZoom() + 2), { animate: true })
          return
        }
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
  }, [map])

  const loadViewport = useCallback(async () => {
    const mapBounds = map.getBounds()
    // Leaflet can return fractional zoom values during touch gestures.
    // The viewport API intentionally accepts integer zoom levels only.
    const zoom = Math.round(map.getZoom())

    // Overview zooms (11 and below) must never query the live POI database.
    // Invalidate any older request so a late response cannot repopulate markers.
    if (zoom < MIN_LIVE_POI_ZOOM) {
      requestIdRef.current += 1
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = null
      layerRef.current?.clearLayers()
      markerByKeyRef.current.clear()
      loadedBoundsRef.current = null
      loadedSourcesRef.current = ''
      loadedZoomRef.current = null
      return
    }

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
    if (containsViewport && loadedSourcesRef.current === sourceKey && loadedZoomRef.current === zoom) return

    const key = makeViewportKey(queryBounds, zoom)
    const requestId = ++requestIdRef.current
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    if (!sources.length) {
      renderPoints([], zoom)
      return
    }

    if (cacheRef.current.has(key)) {
      loadedBoundsRef.current = queryBounds
      loadedSourcesRef.current = sourceKey
      loadedZoomRef.current = zoom
      renderPoints(cacheRef.current.get(key), zoom)
      return
    }

    const results = await Promise.all(sources.map(async source => {
      const startedAt = performance.now()
      try {
        const points = await queryCountry(source, queryBounds, zoom, controller.signal)
        timingCallbackRef.current?.({
          source: source.label,
          milliseconds: Math.round((performance.now() - startedAt) * 10) / 10,
          points: points.length,
          viewport: key,
          status: 'ok',
          mode: getAggregationCellSize(zoom) ? 'database grid aggregation' : 'individual facts',
          limited: points.length >= MAX_DETAIL_POINTS,
        })
        return { points, failed: false }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          timingCallbackRef.current?.({
            source: source.label,
            milliseconds: Math.round((performance.now() - startedAt) * 10) / 10,
            points: 0,
            viewport: key,
            status: 'error',
            error: String(error?.message || error),
          })
          console.error('Europe Explorer ' + source.label + ' failed after retry:', error)
        }
        return { points: [], failed: error?.name !== 'AbortError' }
      }
    }))

    if (requestId !== requestIdRef.current) return
    const points = results.flatMap(result => result.points)
    const hasFailedSource = results.some(result => result.failed)
    // Never cache a partial/failed viewport as a successful empty result.
    // A later map movement can therefore request the missing source again.
    if (!hasFailedSource) {
      cacheRef.current.set(key, points)
      loadedBoundsRef.current = queryBounds
      loadedSourcesRef.current = sourceKey
      loadedZoomRef.current = zoom
      while (cacheRef.current.size > MAX_CACHE_ENTRIES) {
        cacheRef.current.delete(cacheRef.current.keys().next().value)
      }
    } else {
      loadedBoundsRef.current = null
      loadedSourcesRef.current = ''
      loadedZoomRef.current = null
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
      if (abortRef.current) abortRef.current.abort()
      timerRef.current = window.setTimeout(() => loadViewport(), VIEWPORT_DEBOUNCE_MS)
    }
    map.on('moveend', scheduleLoad)
    map.on('zoomend', scheduleLoad)
    scheduleLoad()

    return () => {
      map.off('moveend', scheduleLoad)
      map.off('zoomend', scheduleLoad)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      requestIdRef.current += 1
      if (abortRef.current) abortRef.current.abort()
      map.removeLayer(layer)
      layer.clearLayers()
      markerByKeyRef.current.clear()
      layerRef.current = null
      cacheRef.current.clear()
      loadedBoundsRef.current = null
      loadedSourcesRef.current = ''
      loadedZoomRef.current = null
    }
  }, [map, loadViewport])

  return null
}
