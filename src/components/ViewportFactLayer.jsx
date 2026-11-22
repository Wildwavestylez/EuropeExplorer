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

const NEON_DATABASE_URL = import.meta.env.VITE_NEON_DATABASE_URL || 'postgresql://travel_reader:7T_swaVG-dzyx_cxj_47upFddYwdVHzu4Y3TQcsiyBibJLKa@ep-floral-grass-bgpfzbe4-pooler.c-9.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require'
let neonSqlPromise = null

async function getNeonSql() {
  if (!NEON_DATABASE_URL) throw new Error('VITE_NEON_DATABASE_URL is not configured')
  if (!neonSqlPromise) neonSqlPromise = import('https://esm.sh/@neondatabase/serverless@1.2.1?bundle')
    .then(({ neon }) => neon(NEON_DATABASE_URL, { disableWarningInBrowsers: true }))
    .catch(error => { neonSqlPromise = null; throw error })
  return neonSqlPromise
}

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
  const sql = await getNeonSql()
  if (source.table === 'czechia_cap_records') {
    return normalizeRows(await sql\`
      SELECT r.postcode, (COALESCE(r.record->'content',r.record))->>'city' AS city,
        fact->>'id' AS fact_id, fact->>'title' AS title,
        fact->>'category' AS category, fact->>'map_category' AS map_category,
        (fact->'location'->>'lat')::double precision AS lat,
        (fact->'location'->>'lon')::double precision AS lon
      FROM public.czechia_cap_records r
      CROSS JOIN LATERAL jsonb_array_elements(
        CASE WHEN jsonb_typeof(COALESCE(r.record->'content',r.record)->'facts')='array' THEN COALESCE(r.record->'content',r.record)->'facts' ELSE '[]'::jsonb END
      ) AS items(fact)
      WHERE r.workflow_status='published' AND r.content_version=5
        AND jsonb_typeof(fact->'location')='object'
        AND (fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
        AND (fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
        AND (fact->'location'->>'lat')::double precision BETWEEN \${bounds.south} AND \${bounds.north}
        AND (fact->'location'->>'lon')::double precision BETWEEN \${bounds.west} AND \${bounds.east}
      ORDER BY r.postcode, fact->>'id'
      LIMIT \${MAX_DETAIL_POINTS}
    \`, source.code)
  }
  if (source.table === 'italy_cap_records') {
    return normalizeRows(await sql\`
      SELECT r.postcode, r.record->>'city' AS city, fact->>'id' AS fact_id,
        fact->>'title' AS title, fact->>'category' AS category, fact->>'map_category' AS map_category,
        (fact->'location'->>'lat')::double precision AS lat,
        (fact->'location'->>'lon')::double precision AS lon
      FROM public.italy_cap_records r
      CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END) AS items(fact)
      WHERE r.workflow_status='published' AND r.record->>'status'='published' AND r.record->>'data_version'='5'
        AND jsonb_typeof(fact->'location')='object'
        AND (fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
        AND (fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
        AND (fact->'location'->>'lat')::double precision BETWEEN \${bounds.south} AND \${bounds.north}
        AND (fact->'location'->>'lon')::double precision BETWEEN \${bounds.west} AND \${bounds.east}
      ORDER BY r.postcode, fact->>'id'
      LIMIT \${MAX_DETAIL_POINTS}
    \`, source.code)
  }
  if (source.table === 'slovakia_cap_records') {
    return normalizeRows(await sql\`
      SELECT r.postcode, r.record->>'city' AS city, fact->>'id' AS fact_id,
        fact->>'title' AS title, fact->>'category' AS category, fact->>'map_category' AS map_category,
        (fact->'location'->>'lat')::double precision AS lat,
        (fact->'location'->>'lon')::double precision AS lon
      FROM public.slovakia_cap_records r
      CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END) AS items(fact)
      WHERE r.workflow_status='published' AND r.record->>'status'='published' AND r.record->>'data_version'='5'
        AND jsonb_typeof(fact->'location')='object'
        AND (fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
        AND (fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
        AND (fact->'location'->>'lat')::double precision BETWEEN \${bounds.south} AND \${bounds.north}
        AND (fact->'location'->>'lon')::double precision BETWEEN \${bounds.west} AND \${bounds.east}
      ORDER BY r.postcode, fact->>'id'
      LIMIT \${MAX_DETAIL_POINTS}
    \`, source.code)
  }
  return []
}

function makeMarker(point, zoom) {
  return L.marker([point.lat, point.lon], {
    icon: L.divIcon({
      className: zoom >= 13 ? 'fact-pin-icon fact-pin-detailed' : 'fact-pin-icon',
      html: '<span class="fact-pin-dot"></span>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
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
  const callbackRef = useRef(onSelectFact)
  const timingCallbackRef = useRef(onSourceTiming)
  callbackRef.current = onSelectFact
  timingCallbackRef.current = onSourceTiming

  const renderPoints = useCallback((points, zoom) => {
    const layer = layerRef.current
    if (!layer) return
    // Rebuild from the current viewport only. Previously visited areas must
    // not leave thousands of off-screen markers attached to the map.
    layer.clearLayers()
    const markers = points.map(point => {
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
      return marker
    })
    layer.addLayers(markers)
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
      animate: false,
      animateAddingMarkers: false,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 52,
      disableClusteringAtZoom: 14,
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
      layerRef.current = null
      cacheRef.current.clear()
      loadedBoundsRef.current = null
      loadedSourcesRef.current = ''
    }
  }, [map, loadViewport])

  return null
}
