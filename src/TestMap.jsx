import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'

const DEMO_POINTS = [
  { id: 1, name: 'Hrad Karlštejn', category: 'castle', icon: '🏰', lat: 49.939, lon: 14.188 },
  { id: 2, name: 'Pražský hrad', category: 'castle', icon: '🏰', lat: 50.091, lon: 14.400 },
  { id: 3, name: 'Český Krumlov', category: 'historic_city', icon: '🏙️', lat: 48.812, lon: 14.317 },
  { id: 4, name: 'Národní muzeum', category: 'museum', icon: '🏛️', lat: 50.079, lon: 14.430 },
  { id: 5, name: 'Svatý Jan pod Skalou', category: 'nature', icon: '🌲', lat: 49.969, lon: 14.134 },
  { id: 6, name: 'Ještěd', category: 'viewpoint', icon: '⛰️', lat: 50.732, lon: 14.985 },
  { id: 7, name: 'Katedrála sv. Víta', category: 'religious_site', icon: '⛪', lat: 50.090, lon: 14.400 },
  { id: 8, name: 'Plzeňský pivovar', category: 'industry', icon: '⚙️', lat: 49.747, lon: 13.377 },
  { id: 9, name: 'Zámek Hluboká', category: 'castle', icon: '🏰', lat: 49.051, lon: 14.441 },
  { id: 10, name: 'Lednický park', category: 'park', icon: '🌳', lat: 48.799, lon: 16.803 },
  { id: 11, name: 'Braniborská brána', category: 'monument', icon: '🏛️', lat: 52.516, lon: 13.377 },
  { id: 12, name: 'Berlínská katedrála', category: 'religious_site', icon: '⛪', lat: 52.519, lon: 13.401 },
  { id: 13, name: 'Museumsinsel', category: 'museum', icon: '🖼️', lat: 52.517, lon: 13.398 },
  { id: 14, name: 'Sanssouci', category: 'castle', icon: '🏰', lat: 52.403, lon: 13.038 },
  { id: 15, name: 'Teufelsberg', category: 'viewpoint', icon: '🔭', lat: 52.495, lon: 13.241 },
  { id: 16, name: 'Drážďanský Zwinger', category: 'museum', icon: '🏛️', lat: 51.053, lon: 13.734 },
  { id: 17, name: 'Frauenkirche', category: 'religious_site', icon: '⛪', lat: 51.052, lon: 13.741 },
  { id: 18, name: 'Bastei', category: 'nature', icon: '🌄', lat: 50.963, lon: 14.072 },
  { id: 19, name: 'Kolínský dóm', category: 'religious_site', icon: '⛪', lat: 50.941, lon: 6.958 },
  { id: 20, name: 'Aachenská katedrála', category: 'religious_site', icon: '⛪', lat: 50.775, lon: 6.083 },
  { id: 21, name: 'Zugspitze', category: 'nature', icon: '🏔️', lat: 47.421, lon: 10.986 },
  { id: 22, name: 'Zámek Neuschwanstein', category: 'castle', icon: '🏰', lat: 47.557, lon: 10.749 },
  { id: 23, name: 'Innsbruck – Zlatá stříška', category: 'architecture', icon: '🏘️', lat: 47.268, lon: 11.393 },
  { id: 24, name: 'Brennerský průsmyk', category: 'landscape', icon: '🏔️', lat: 47.006, lon: 11.506 },
  { id: 25, name: 'Salcburk – pevnost', category: 'castle', icon: '🏰', lat: 47.795, lon: 13.047 },
  { id: 26, name: 'Hallstatt', category: 'historic_city', icon: '🏘️', lat: 47.562, lon: 13.649 },
  { id: 27, name: 'Vídeň – Schönbrunn', category: 'castle', icon: '🏰', lat: 48.185, lon: 16.312 },
  { id: 28, name: 'Stephansdom', category: 'religious_site', icon: '⛪', lat: 48.208, lon: 16.373 },
  { id: 29, name: 'Budapešť – Parlament', category: 'monument', icon: '🏛️', lat: 47.507, lon: 19.046 },
  { id: 30, name: 'Bastion rybářů', category: 'viewpoint', icon: '🌅', lat: 47.502, lon: 19.034 },
  { id: 31, name: 'Paříž – Eiffelova věž', category: 'monument', icon: '🗼', lat: 48.858, lon: 2.295 },
  { id: 32, name: 'Louvre', category: 'museum', icon: '🖼️', lat: 48.860, lon: 2.337 },
  { id: 33, name: 'Mont-Saint-Michel', category: 'heritage', icon: '🏰', lat: 48.636, lon: -1.511 },
  { id: 34, name: 'Řím – Koloseum', category: 'monument', icon: '🏛️', lat: 41.890, lon: 12.492 },
  { id: 35, name: 'Vatikán', category: 'religious_site', icon: '⛪', lat: 41.903, lon: 12.453 },
  { id: 36, name: 'Florencie – Duomo', category: 'architecture', icon: '⛪', lat: 43.773, lon: 11.256 },
  { id: 37, name: 'Benátky', category: 'historic_city', icon: '🚣', lat: 45.440, lon: 12.315 },
  { id: 38, name: 'Barcelona – Sagrada Família', category: 'architecture', icon: '⛪', lat: 41.403, lon: 2.174 },
  { id: 39, name: 'Amsterdam – Rijksmuseum', category: 'museum', icon: '🖼️', lat: 52.360, lon: 4.885 },
  { id: 40, name: 'Bruggy', category: 'historic_city', icon: '🏘️', lat: 51.209, lon: 3.224 },
  { id: 41, name: 'Varšava – Staré město', category: 'historic_city', icon: '🏘️', lat: 52.249, lon: 21.012 },
  { id: 42, name: 'Krakov – Wawel', category: 'castle', icon: '🏰', lat: 50.054, lon: 19.936 },
  { id: 43, name: 'Stockholm – Gamla Stan', category: 'historic_city', icon: '🏘️', lat: 59.325, lon: 18.071 },
  { id: 44, name: 'Kodaň – Nyhavn', category: 'local_culture', icon: '🎭', lat: 55.680, lon: 12.590 },
  { id: 45, name: 'Athény – Akropole', category: 'archaeology', icon: '🏺', lat: 37.972, lon: 23.726 },
  { id: 46, name: 'Most v Mostaru', category: 'architecture', icon: '🌉', lat: 43.337, lon: 17.815 },
]

function iconFor(point) {
  return L.divIcon({
    className: 'icon-lab-marker',
    html: `<span class="icon-lab-emoji" role="img" aria-label="${point.category}">${point.icon}</span>`,
    iconSize: [38, 42],
    iconAnchor: [19, 38],
    popupAnchor: [0, -35],
  })
}

function DemoMarkers() {
  const map = useMap()

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 48,
      disableClusteringAtZoom: 13,
      iconCreateFunction: group => {
        const count = group.getChildCount()
        return L.divIcon({
          className: 'icon-lab-cluster',
          html: `<span class="icon-lab-cluster-count">${count}</span>`,
          iconSize: [42, 42],
          iconAnchor: [21, 21],
        })
      },
    })

    DEMO_POINTS.forEach(point => {
      const marker = L.marker([point.lat, point.lon], { icon: iconFor(point), riseOnHover: true })
      marker.bindPopup(`
        <div class="icon-lab-popup">
          <strong>${point.name}</strong>
          <span>${point.category}</span>
          <small>${point.lat.toFixed(3)}, ${point.lon.toFixed(3)}</small>
        </div>
      `)
      cluster.addLayer(marker)
    })

    map.addLayer(cluster)
    return () => map.removeLayer(cluster)
  }, [map])

  return null
}

export default function TestMap() {
  return (
    <main className="app-shell icon-lab-shell">
      <header className="topbar icon-lab-topbar">
        <a className="brand" href="./index.html" aria-label="Europe Explorer">
          <span className="brand-mark">E</span>
          <span>EUROPE <span className="brand-light">EXPLORER</span></span>
        </a>
        <div className="icon-lab-label"><span className="live-dot" /> ICON LAB · TEST MAP</div>
      </header>
      <section className="icon-lab-map-wrap">
        <div className="map-topline icon-lab-map-topline">
          <span><span className="status-dot" /> EUROPE / ICON TESTING</span>
          <span>{DEMO_POINTS.length} DEMO POINTS · NO DATABASE</span>
        </div>
        <MapContainer center={[50.8, 10.5]} zoom={5} minZoom={3} maxZoom={18} scrollWheelZoom className="icon-lab-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DemoMarkers />
        </MapContainer>
        <div className="icon-lab-legend">TEST DATA ONLY <span /> MARKERS CLUSTER ON ZOOM-OUT</div>
      </section>
    </main>
  )
}