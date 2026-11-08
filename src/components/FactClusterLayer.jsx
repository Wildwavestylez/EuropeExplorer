import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const MAP_CATEGORY = {
  castle: '🏰',
  historical_monument: '🏛️',
  nature: '🌲',
  viewpoint_landscape: '🏞️',
  historic_city: '🏙️',
  museum: '🏺',
  religious_site: '⛪',
  technical_heritage: '🏗️',
}

function localizedTitle(place, fact, lang) {
  const translated = place.content?.translations?.[lang]?.facts?.find(item => item.id === fact.id)
  return translated?.title || fact.title || fact.id
}

export default function FactClusterLayer({ places, lang, onSelectFact }) {
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
        const summary = document.createElement('p')
        const translated = place.content?.translations?.[lang]?.facts?.find(item => item.id === fact.id)
        summary.textContent = translated?.text || translated?.description || fact.text || fact.description || ''
        const subtitle = document.createElement('div')
        subtitle.textContent = [place.postal_code, point.name, place.city].filter(Boolean).join(' · ')
        const category = document.createElement('small')
        category.textContent = (fact.map_category || fact.category || 'discovery').replaceAll('_', ' ')
        popup.append(title, summary, subtitle, category)
        marker.bindPopup(popup)
        marker.on('click', () => onSelectFact(place, fact))
        cluster.addLayer(marker)
      })
    })

    map.addLayer(cluster)
    return () => { map.removeLayer(cluster); cluster.clearLayers() }
  }, [map, places, lang, onSelectFact])

  return null
}
