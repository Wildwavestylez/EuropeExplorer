import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

function localizedTitle(place, fact, lang) {
  const translated = place.content?.translations?.[lang]?.facts?.find(item => item.id === fact.id)
  return translated?.title || fact.title || fact.id
}

const categoryLabels = {
  en: { castle:'Castle', historical_monument:'Historical monument', nature:'Nature', viewpoint_landscape:'Viewpoint / landscape', historic_city:'Historic city', museum:'Museum', religious_site:'Religious site', technical_heritage:'Technical heritage', personality:'Personality' },
  de: { castle:'Burg / Schloss', historical_monument:'Historisches Denkmal', nature:'Natur', viewpoint_landscape:'Aussichtspunkt / Landschaft', historic_city:'Historische Stadt', museum:'Museum', religious_site:'Religiöser Ort', technical_heritage:'Technisches Kulturerbe', personality:'Persönlichkeit' },
  cs: { castle:'Hrad / zámek', historical_monument:'Historická památka', nature:'Příroda', viewpoint_landscape:'Vyhlídka / krajina', historic_city:'Historické město', museum:'Muzeum', religious_site:'Sakrální místo', technical_heritage:'Technické dědictví', personality:'Osobnost' },
  es: { castle:'Castillo', historical_monument:'Monumento histórico', nature:'Naturaleza', viewpoint_landscape:'Mirador / paisaje', historic_city:'Ciudad histórica', museum:'Museo', religious_site:'Lugar religioso', technical_heritage:'Patrimonio técnico', personality:'Personalidad' },
  fr: { castle:'Château', historical_monument:'Monument historique', nature:'Nature', viewpoint_landscape:'Belvédère / paysage', historic_city:'Ville historique', museum:'Musée', religious_site:'Site religieux', technical_heritage:'Patrimoine technique', personality:'Personnalité' },
  it: { castle:'Castello', historical_monument:'Monumento storico', nature:'Natura', viewpoint_landscape:'Belvedere / paesaggio', historic_city:'Città storica', museum:'Museo', religious_site:'Luogo religioso', technical_heritage:'Patrimonio tecnico', personality:'Personalità' },
}

const dragLabels = {
  en: { hint:'DRAG UP TO READ MORE', expanded:'DRAG DOWN TO COLLAPSE' },
  de: { hint:'NACH OBEN ZIEHEN FÜR MEHR', expanded:'NACH UNTEN ZIEHEN ZUM SCHLIESSEN' },
  cs: { hint:'TAŽENÍM NAHORU ZOBRAZÍŠ VÍCE', expanded:'TAŽENÍM DOLŮ SBALÍŠ' },
  es: { hint:'DESLIZA HACIA ARRIBA PARA LEER MÁS', expanded:'DESLIZA HACIA ABAJO PARA CERRAR' },
  fr: { hint:'FAITES GLISSER VERS LE HAUT POUR LIRE', expanded:'FAITES GLISSER VERS LE BAS POUR RÉDUIRE' },
  it: { hint:'TRASCINA IN ALTO PER LEGGERE DI PIÙ', expanded:'TRASCINA IN BASSO PER RIDURRE' },
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

        const translated = place.content?.translations?.[lang]?.facts?.find(item => item.id === fact.id)
        const popup = document.createElement('div')
        popup.className = 'fact-popup-card'

        const heading = document.createElement('div')
        heading.className = 'fact-popup-heading'
        const title = document.createElement('strong')
        title.className = 'fact-popup-title'
        title.textContent = localizedTitle(place, fact, lang)
        const subtitle = document.createElement('div')
        subtitle.className = 'fact-popup-subtitle'
        subtitle.textContent = [place.postal_code, point.name, place.city].filter(Boolean).join(' · ')
        heading.append(title, subtitle)

        const summary = document.createElement('div')
        summary.className = 'fact-popup-summary'
        summary.textContent = translated?.text || translated?.description || fact.text || fact.description || ''

        const category = document.createElement('small')
        category.className = 'fact-popup-category'
        category.textContent = categoryLabels[lang]?.[fact.map_category] || (fact.category || 'Discovery').replaceAll('_', ' ')

        const handle = document.createElement('button')
        handle.type = 'button'
        handle.className = 'fact-popup-handle'
        handle.setAttribute('aria-label', dragLabels[lang]?.hint || dragLabels.en.hint)
        const grip = document.createElement('span')
        grip.className = 'fact-popup-grip'
        const hint = document.createElement('span')
        hint.className = 'fact-popup-hint'
        hint.textContent = dragLabels[lang]?.hint || dragLabels.en.hint
        handle.append(grip, hint)

        popup.append(heading, summary, category, handle)

        let expanded = false
        let startY = null
        let dragged = false
        const setExpanded = value => {
          expanded = value
          popup.classList.toggle('is-expanded', expanded)
          hint.textContent = expanded
            ? (dragLabels[lang]?.expanded || dragLabels.en.expanded)
            : (dragLabels[lang]?.hint || dragLabels.en.hint)
          handle.setAttribute('aria-label', hint.textContent)
        }
        handle.addEventListener('pointerdown', event => {
          startY = event.clientY
          dragged = false
          handle.setPointerCapture?.(event.pointerId)
          event.preventDefault()
        })
        handle.addEventListener('pointermove', event => {
          if (startY === null) return
          const delta = event.clientY - startY
          if (Math.abs(delta) > 8) dragged = true
        })
        handle.addEventListener('pointerup', event => {
          if (startY === null) return
          const delta = event.clientY - startY
          if (Math.abs(delta) > 18) setExpanded(delta < 0)
          else if (!dragged) setExpanded(!expanded)
          startY = null
        })
        handle.addEventListener('pointercancel', () => { startY = null })
        handle.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setExpanded(!expanded)
          }
        })

        marker.bindPopup(popup, {
          className: 'fact-map-popup',
          minWidth: 280,
          maxWidth: 280,
          closeButton: true,
          autoPan: false,
          keepInView: false,
        })
        marker.on('click', () => onSelectFact(place, fact))
        cluster.addLayer(marker)
      })
    })

    map.addLayer(cluster)
    return () => { map.removeLayer(cluster); cluster.clearLayers() }
  }, [map, places, lang, onSelectFact])

  return null
}
