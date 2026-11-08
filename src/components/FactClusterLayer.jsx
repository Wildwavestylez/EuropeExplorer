import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const MAP_CATEGORY = {\n  castle: '🏰',\n  historical_monument: '🏛️',\n  nature: '🌲',\n  viewpoint_landscape: '🏞️',\n  historic_city: '🏙️',\n  museum: '🏺',\n  religious_site: '⛪',\n  technical_heritage: '🏗️',\n}\n\nfunction localizedTitle(place, fact, lang) {
  const translated = place.content?.translations?.[lang]?.facts?.find(item => item.id === fact.id)
  return translated?.title || fact.title || fact.id
}

export default function FactClusterLayer({ places, lang, onSelect }) {
  const map = useMap()

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 52,
      disableClusteringAtZoom: 17,
    })

    places.forEach(place => {
      place.content.facts.forEach(fact => {
        const point = fact.location
        if (!point || !Number.isFinite(point.lat) || !Number.isFinite(point.lon)) return
        if (point.lat < -90 || point.lat > 90 || point.lon < -180 || point.lon > 180) return

        const marker = L.marker([point.lat, point.lon], {
          icon: L.divIcon({
            className: 'fact-pin-icon',
            html: '<span class="fact-pin-dot"></span>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          }),
          title: localizedTitle(place, fact, lang),
          riseOnHover: true,
        })
        const popup = document.createElement('div')
        const title = document.createElement('strong')
        title.textContent = localizedTitle(place, fact, lang)
        const subtitle = document.createElement('div')
        subtitle.textContent = [place.postal_code, point.name, place.city].filter(Boolean).join(' · ')
        popup.append(title, subtitle)
        marker.bindPopup(popup)
        marker.on('click', () => onSelect(place))
        cluster.addLayer(marker)
      })
    })

    map.addLayer(cluster)
    return () => { map.removeLayer(cluster); cluster.clearLayers() }
  }, [map, places, lang, onSelect])

  return null
}
