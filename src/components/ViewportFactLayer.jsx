import { useCallback, useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { supabase } from '../lib/supabase'

const MAX_POINTS = 1000
const CACHE_LIMIT = 24

function makeMarker(point, zoom) {
  if (point.is_cluster) {
    return L.marker([point.lat, point.lon], {
      featureCount: Number(point.point_count) || 0,
      icon: L.divIcon({
        className: 'fact-cluster-icon',
        html: `<span class="fact-cluster-count">${point.point_count}</span>`,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
      }),
      title: String(point.point_count),
    })
  }

  return L.marker([point.lat, point.lon], {
    icon: L.divIcon({
      className: zoom >= 13 ? 'fact-pin-icon fact-pin-detailed' : 'fact-pin-icon',
      html: '<span class="fact-pin-dot"></span>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    }),
    title: zoom >= 13 ? (point.title || point.postal_code || '') : '',
    riseOnHover: true,
  })
}

export default function ViewportFactLayer({ country, onSelectFact }) {
  const map = useMap()
  const cacheRef = useRef(new Map())
  const requestRef = useRef(null)
  const timerRef = useRef(null)
  const layerRef = useRef(null)
  const callbackRef = useRef(onSelectFact)
  callbackRef.current = onSelectFact

  const loadViewport = useCallback(async () => {
    const bounds = map.getBounds()
    const zoom = map.getZoom()
    const south = Math.max(-90, bounds.getSouth())
    const north = Math.min(90, bounds.getNorth())
    const west = Math.max(-180, bounds.getWest())
    const east = Math.min(180, bounds.getEast())
    const key = [country, zoom, south, west, north, east].map(v =>
      typeof v === 'number' ? v.toFixed(3) : v
    ).join(':')

    let points = cacheRef.current.get(key)
    if (!points) {
      requestRef.current?.abort()
      const controller = new AbortController()
      requestRef.current = controller
      const { data, error } = await supabase.rpc('get_explorer_map_points', {
        p_country_code: country,
        p_south: south,
        p_west: west,
        p_north: north,
        p_east: east,
        p_zoom: zoom,
        p_limit: MAX_POINTS,
      }).abortSignal(controller.signal)

      if (controller.signal.aborted) return
      if (error) {
        console.error('Explorer map viewport query failed:', error)
        return
      }
      points = data || []
      cacheRef.current.set(key, points)
      if (cacheRef.current.size > CACHE_LIMIT) {
        cacheRef.current.delete(cacheRef.current.keys().next().value)
      }
    }

    if (requestRef.current?.signal.aborted) return
    const layer = layerRef.current
    if (!layer) return
    layer.clearLayers()

    points.forEach(point => {
      const marker = makeMarker(point, zoom)
      if (!point.is_cluster) {
        marker.on('click', () => {
          callbackRef.current?.({
            id: point.id,
            postal_code: point.postal_code,
            city: point.city,
          }, {
            id: point.fact_id,
            title: point.title,
            category: point.category,
            map_category: point.category,
            location: { lat: point.lat, lon: point.lon },
          })
        })
      }
      layer.addLayer(marker)
    })
  }, [country, map])

  useEffect(() => {
    const layer = L.markerClusterGroup({
      iconCreateFunction: cluster => {
        const totalFacts = cluster.getAllChildMarkers().reduce((sum, marker) => sum + (Number(marker.options.featureCount) || 1), 0)
        return L.divIcon({
          className: 'fact-cluster-icon',
          html: '<span class="fact-cluster-count">' + totalFacts + '</span>',
          iconSize: [42, 42],
          iconAnchor: [21, 21],
        })
      },
      chunkedLoading: true,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 52,
      disableClusteringAtZoom: 13,
    })
    layerRef.current = layer
    map.addLayer(layer)
    cacheRef.current.clear()

    const scheduleLoad = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      requestRef.current?.abort()
      timerRef.current = window.setTimeout(() => {
        loadViewport()
      }, 220)
    }

    map.on('moveend', scheduleLoad)
    map.on('zoomend', scheduleLoad)
    scheduleLoad()

    return () => {
      map.off('moveend', scheduleLoad)
      map.off('zoomend', scheduleLoad)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      requestRef.current?.abort()
      map.removeLayer(layer)
      layer.clearLayers()
      layerRef.current = null
    }
  }, [map, loadViewport])


  return null
}
