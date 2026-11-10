import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Search, Compass, MapPin, Globe2, ArrowUpRight, X, LoaderCircle, SlidersHorizontal, Menu, List, Filter } from 'lucide-react'
import { supabase } from './lib/supabase'
import ViewportFactLayer from './components/ViewportFactLayer'

const LANGS = [
  { id: 'en', label: 'EN' }, { id: 'de', label: 'DE' }, { id: 'cs', label: 'CS' },
  { id: 'es', label: 'ES' }, { id: 'fr', label: 'FR' }, { id: 'it', label: 'IT' },
]

function getInitialLanguage() {
  const supported = LANGS.map(language => language.id)
  try {
    const saved = window.localStorage.getItem('europe-explorer-language')
    if (saved && supported.includes(saved)) return saved
  } catch {}
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const browserLanguage of browserLanguages) {
    const code = String(browserLanguage || '').toLowerCase().split('-')[0]
    if (supported.includes(code)) return code
  }
  return 'en'
}

const copy = {
  en: { eyebrow: 'A continent to discover', title: 'Europe, one place at a time.', subtitle: 'Explore local stories, places and hidden highlights.', search: 'Search places or postal codes', all: 'All places', results: 'published areas', explore: 'Explore the map', details: 'Local highlights', loading: 'Discovering places…', empty: 'No matching places found.', choose: 'Select a place on the map or from the list.', source: 'Explore by postal area', note: 'Map markers show the representative point of each postal area.' },
  de: { eyebrow: 'Ein Kontinent zum Entdecken', title: 'Europa. Ort für Ort.', subtitle: 'Entdecke lokale Geschichten, Orte und besondere Highlights.', search: 'Orte oder Postleitzahl suchen', all: 'Alle Orte', results: 'veröffentlichte Gebiete', explore: 'Karte entdecken', details: 'Lokale Highlights', loading: 'Orte werden geladen…', empty: 'Keine passenden Orte gefunden.', choose: 'Wähle einen Ort auf der Karte oder aus der Liste.', source: 'Entdecken nach Postleitzahl', note: 'Die Kartenmarkierungen zeigen den repräsentativen Punkt des Postleitzahlgebiets.' },
  cs: { eyebrow: 'Kontinent plný objevů', title: 'Evropa. Místo po místě.', subtitle: 'Objevuj místní příběhy, místa a zajímavosti.', search: 'Hledat místo nebo PSČ', all: 'Všechna místa', results: 'publikovaných oblastí', explore: 'Prozkoumat mapu', details: 'Místní zajímavosti', loading: 'Načítám místa…', empty: 'Nic jsme nenašli.', choose: 'Vyber místo na mapě nebo v seznamu.', source: 'Objevuj podle PSČ', note: 'Značky na mapě ukazují reprezentativní bod PSČ oblasti.' },
  es: { eyebrow: 'Un continente por descubrir', title: 'Europa, lugar por lugar.', subtitle: 'Descubre historias, lugares y rincones especiales.', search: 'Buscar lugares o códigos postales', all: 'Todos los lugares', results: 'zonas publicadas', explore: 'Explorar el mapa', details: 'Lugares destacados', loading: 'Cargando lugares…', empty: 'No se encontraron lugares.', choose: 'Elige un lugar en el mapa o en la lista.', source: 'Explorar por código postal', note: 'Los marcadores muestran el punto representativo de cada zona postal.' },
  fr: { eyebrow: 'Un continent à découvrir', title: 'L’Europe, lieu après lieu.', subtitle: 'Explorez les histoires et lieux remarquables.', search: 'Rechercher un lieu ou code postal', all: 'Tous les lieux', results: 'zones publiées', explore: 'Explorer la carte', details: 'À découvrir', loading: 'Chargement…', empty: 'Aucun lieu trouvé.', choose: 'Choisissez un lieu sur la carte ou dans la liste.', source: 'Explorer par code postal', note: 'Les marqueurs indiquent le point représentatif de chaque zone postale.' },
  it: { eyebrow: 'Un continente da scoprire', title: 'Europa, un luogo alla volta.', subtitle: 'Scopri storie, luoghi e tesori locali.', search: 'Cerca luoghi o codici postali', all: 'Tutti i luoghi', results: 'aree pubblicate', explore: 'Esplora la mappa', details: 'Da scoprire', loading: 'Caricamento…', empty: 'Nessun luogo trovato.', choose: 'Seleziona un luogo sulla mappa o dall’elenco.', source: 'Esplora per CAP', note: 'I marcatori mostrano il punto rappresentativo di ogni area postale.' },
}


const uiCopy = {
  en: { tagline:'DISCOVER THE UNEXPECTED', openMenu:'Open menu', closeMenu:'Close menu', filters:'FILTERS', places:'PLACES', germany:'GERMANY', czechia:'CZECHIA', map:'EXPLORATION MAP', bundesland:'BUNDESLAND', region:'REGION', county:'LANDKREIS / KREIS', district:'DISTRICT', allStates:'All federal states', allRegions:'All regions', allCounties:'All districts', reset:'RESET FILTERS', live:'LIVE DATA · SUPABASE', pins:'FACT PINS', areas:'AREAS', factLocation:'FACT LOCATION', clusterHint:'CLUSTERS MERGE ON ZOOM-OUT', pinDiscovery:'PIN DISCOVERY', localDiscovery:'LOCAL DISCOVERY', postalArea:'POSTAL AREA', discover:'Discover this place', noHighlights:'No published highlights are available for this area yet.', next:'YOUR NEXT DISCOVERY', closeDetails:'Close details', footer:'BUILT FOR THE CURIOUS · DATA FROM PUBLISHED POSTAL AREAS', error:'Could not load places from the database.' },
  de: { tagline:'ENTDECKE DAS UNERWARTETE', openMenu:'Menü öffnen', closeMenu:'Menü schließen', filters:'FILTER', places:'ORTE', germany:'DEUTSCHLAND', czechia:'TSCHECHIEN', map:'ENTDECKUNGSKARTE', bundesland:'BUNDESLAND', region:'REGION', county:'LANDKREIS / KREIS', district:'LANDKREIS', allStates:'Alle Bundesländer', allRegions:'Alle Regionen', allCounties:'Alle Landkreise', reset:'FILTER ZURÜCKSETZEN', live:'LIVE-DATEN · SUPABASE', pins:'FAKTEN-MARKER', areas:'GEBIETE', factLocation:'ORT DER SEHENSWÜRDIGKEIT', clusterHint:'CLUSTER BEIM HERAUSZOOMEN ZUSAMMENGEFASST', pinDiscovery:'ENTDECKUNG PER MARKER', localDiscovery:'ENTDECKUNG VOR ORT', postalArea:'POSTLEITZAHLGEBIET', discover:'Diesen Ort entdecken', noHighlights:'Für dieses Gebiet sind noch keine veröffentlichten Highlights verfügbar.', next:'DEINE NÄCHSTE ENTDECKUNG', closeDetails:'Details schließen', footer:'FÜR ENTDECKER · DATEN AUS VERÖFFENTLICHTEN POSTLEITZAHLGEBIETEN', error:'Orte konnten nicht aus der Datenbank geladen werden.' },
  cs: { tagline:'OBJEVUJ NEČEKANÉ', openMenu:'Otevřít menu', closeMenu:'Zavřít menu', filters:'FILTRY', places:'MÍSTA', germany:'NĚMECKO', czechia:'ČESKO', map:'MAPA OBJEVŮ', bundesland:'SPOLKOVÁ ZEMĚ', region:'KRAJ', county:'OKRES', district:'OKRES', allStates:'Všechny spolkové země', allRegions:'Všechny kraje', allCounties:'Všechny okresy', reset:'VYMAZAT FILTRY', live:'ŽIVÁ DATA · SUPABASE', pins:'ZAJÍMAVOSTI NA MAPĚ', areas:'OBLASTI', factLocation:'MÍSTO ZAJÍMAVOSTI', clusterHint:'PŘI ODDÁLENÍ SE BODY SESKUPUJÍ', pinDiscovery:'OBJEV Z MAPY', localDiscovery:'MÍSTNÍ OBJEV', postalArea:'OBLAST PSČ', discover:'Objev toto místo', noHighlights:'Pro tuto oblast zatím nejsou dostupné žádné publikované zajímavosti.', next:'TVŮJ DALŠÍ OBJEV', closeDetails:'Zavřít detail', footer:'PRO ZVĚDAVÉ · DATA Z PUBLIKOVANÝCH POŠTOVNÍCH OBLASTÍ', error:'Místa se nepodařilo načíst z databáze.' },
  es: { tagline:'DESCUBRE LO INESPERADO', openMenu:'Abrir menú', closeMenu:'Cerrar menú', filters:'FILTROS', places:'LUGARES', germany:'ALEMANIA', czechia:'CHEQUIA', map:'MAPA DE EXPLORACIÓN', bundesland:'ESTADO FEDERADO', region:'REGIÓN', county:'DISTRITO', district:'DISTRITO', allStates:'Todos los estados federados', allRegions:'Todas las regiones', allCounties:'Todos los distritos', reset:'BORRAR FILTROS', live:'DATOS EN DIRECTO · SUPABASE', pins:'PUNTOS DE INTERÉS', areas:'ZONAS', factLocation:'UBICACIÓN DEL PUNTO', clusterHint:'LOS GRUPOS SE UNEN AL ALEJAR EL ZOOM', pinDiscovery:'DESCUBRIMIENTO EN EL MAPA', localDiscovery:'DESCUBRIMIENTO LOCAL', postalArea:'ZONA POSTAL', discover:'Descubre este lugar', noHighlights:'Todavía no hay lugares destacados publicados para esta zona.', next:'TU PRÓXIMO DESCUBRIMIENTO', closeDetails:'Cerrar detalles', footer:'PARA PERSONAS CURIOSAS · DATOS DE ZONAS POSTALES PUBLICADAS', error:'No se pudieron cargar los lugares de la base de datos.' },
  fr: { tagline:'DÉCOUVREZ L’INATTENDU', openMenu:'Ouvrir le menu', closeMenu:'Fermer le menu', filters:'FILTRES', places:'LIEUX', germany:'ALLEMAGNE', czechia:'TCHÉQUIE', map:'CARTE EXPLORATOIRE', bundesland:'LAND', region:'RÉGION', county:'ARRONDISSEMENT', district:'DISTRICT', allStates:'Tous les Länder', allRegions:'Toutes les régions', allCounties:'Tous les districts', reset:'RÉINITIALISER LES FILTRES', live:'DONNÉES EN DIRECT · SUPABASE', pins:'POINTS D’INTÉRÊT', areas:'ZONES', factLocation:'EMPLACEMENT DU POINT', clusterHint:'LES GROUPES SE REGROUPENT AU DÉZOOMAGE', pinDiscovery:'DÉCOUVERTE SUR LA CARTE', localDiscovery:'DÉCOUVERTE LOCALE', postalArea:'ZONE POSTALE', discover:'Découvrez ce lieu', noHighlights:'Aucun lieu remarquable publié n’est encore disponible pour cette zone.', next:'VOTRE PROCHAINE DÉCOUVERTE', closeDetails:'Fermer les détails', footer:'POUR LES CURIEUX · DONNÉES DES ZONES POSTALES PUBLIÉES', error:'Impossible de charger les lieux depuis la base de données.' },
  it: { tagline:'SCOPRI L’INATTESO', openMenu:'Apri il menu', closeMenu:'Chiudi il menu', filters:'FILTRI', places:'LUOGHI', germany:'GERMANIA', czechia:'CECHIA', map:'MAPPA DI ESPLORAZIONE', bundesland:'STATO FEDERATO', region:'REGIONE', county:'DISTRETTO', district:'DISTRETTO', allStates:'Tutti gli stati federati', allRegions:'Tutte le regioni', allCounties:'Tutti i distretti', reset:'REIMPOSTA FILTRI', live:'DATI IN DIRETTA · SUPABASE', pins:'PUNTI DI INTERESSE', areas:'AREE', factLocation:'LUOGO DEL PUNTO', clusterHint:'I GRUPPI SI UNISCONO RIDUCENDO LO ZOOM', pinDiscovery:'SCOPERTA SULLA MAPPA', localDiscovery:'SCOPERTA LOCALE', postalArea:'AREA POSTALE', discover:'Scopri questo luogo', noHighlights:'Non sono ancora disponibili punti di interesse pubblicati per quest’area.', next:'LA TUA PROSSIMA SCOPERTA', closeDetails:'Chiudi dettagli', footer:'PER I CURIOSI · DATI DELLE AREE POSTALI PUBBLICATE', error:'Impossibile caricare i luoghi dal database.' },
}


const mapCategoryCopy = {
  en: { castle:'Castle', historical_monument:'Historical monument', nature:'Nature', viewpoint_landscape:'Viewpoint / landscape', historic_city:'Historic city', museum:'Museum', religious_site:'Religious site', technical_heritage:'Technical heritage', personality:'Personality' },
  de: { castle:'Burg / Schloss', historical_monument:'Historisches Denkmal', nature:'Natur', viewpoint_landscape:'Aussichtspunkt / Landschaft', historic_city:'Historische Stadt', museum:'Museum', religious_site:'Religiöser Ort', technical_heritage:'Technisches Kulturerbe', personality:'Persönlichkeit' },
  cs: { castle:'Hrad / zámek', historical_monument:'Historická památka', nature:'Příroda', viewpoint_landscape:'Vyhlídka / krajina', historic_city:'Historické město', museum:'Muzeum', religious_site:'Sakrální místo', technical_heritage:'Technické dědictví', personality:'Osobnost' },
  es: { castle:'Castillo', historical_monument:'Monumento histórico', nature:'Naturaleza', viewpoint_landscape:'Mirador / paisaje', historic_city:'Ciudad histórica', museum:'Museo', religious_site:'Lugar religioso', technical_heritage:'Patrimonio técnico', personality:'Personalidad' },
  fr: { castle:'Château', historical_monument:'Monument historique', nature:'Nature', viewpoint_landscape:'Belvédère / paysage', historic_city:'Ville historique', museum:'Musée', religious_site:'Site religieux', technical_heritage:'Patrimoine technique', personality:'Personnalité' },
  it: { castle:'Castello', historical_monument:'Monumento storico', nature:'Natura', viewpoint_landscape:'Belvedere / paesaggio', historic_city:'Città storica', museum:'Museo', religious_site:'Luogo religioso', technical_heritage:'Patrimonio tecnico', personality:'Personalità' },
}

function getLocalizedFacts(content, lang) {
  const base = Array.isArray(content?.facts) ? content.facts : []
  const translated = content?.translations?.[lang]?.facts
  const byId = new Map((Array.isArray(translated) ? translated : []).map(f => [f.id, f]))
  return base.map(f => ({ ...f, ...(byId.get(f.id) || {}) }))
}

function factCoordinates(place) {
  return (place?.content?.facts || []).map(fact => fact.location)
    .filter(point => point && Number.isFinite(point.lat) && Number.isFinite(point.lon)
      && point.lat >= -90 && point.lat <= 90 && point.lon >= -180 && point.lon <= 180)
    .map(point => [point.lat, point.lon])
}

function MapFocus({ place, selectedFact, mapStart, activeMode }) {
  const map = useMap()
  useEffect(() => {
    const factLat = Number(selectedFact?.location?.lat)
    const factLon = Number(selectedFact?.location?.lon)
    if (selectedFact && Number.isFinite(factLat) && Number.isFinite(factLon)) {
      map.flyTo([factLat, factLon], 13, { duration: 0.8 })
    } else if (place && Number.isFinite(Number(place.latitude)) && Number.isFinite(Number(place.longitude))) {
      map.flyTo([Number(place.latitude), Number(place.longitude)], 12, { duration: 0.8 })
    } else if (activeMode && Array.isArray(mapStart) && mapStart.length === 2
      && Number.isFinite(Number(mapStart[0])) && Number.isFinite(Number(mapStart[1]))) {
      map.flyTo([Number(mapStart[0]), Number(mapStart[1])], activeMode === 'area' ? 6 : 13, { duration: 0.8 })
    } else {
      map.setView([51.1657, 10.4515], 6, { animate: true })
    }
  }, [place, selectedFact, mapStart, activeMode, map])
  return null
}

function getState(place) {
  return place.content?.state || place.region || ''
}

function getCounty(place) {
  // Landkreis/Kreis is the county field; district is a Stadtteil/Ortsteil.
  return place.county || ''
}

export default function App() {
  const [places, setPlaces] = useState([])
  const [activeMode, setActiveMode] = useState('')
  const [introSearch, setIntroSearch] = useState('')
  const [introMessage, setIntroMessage] = useState('')
  const [mapStart, setMapStart] = useState([51.1657, 10.4515])
  const [loadDiagnostics, setLoadDiagnostics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [lang, setLang] = useState(getInitialLanguage)
  const [selected, setSelected] = useState(null)
  const [selectedFact, setSelectedFact] = useState(null)
  const [country, setCountry] = useState('DE')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [placesOpen, setPlacesOpen] = useState(false)
  const [factSheetExpanded, setFactSheetExpanded] = useState(false)
  const [factSheetOpen, setFactSheetOpen] = useState(false)
  const factSheetDragStart = useRef(null)
  useEffect(() => {
    try { window.localStorage.setItem('europe-explorer-language', lang) } catch {}
  }, [lang])

  const t = copy[lang] || copy.en
  const u = uiCopy[lang] || uiCopy.en

  const handlePlaceSelect = useCallback(async (place) => {
    const { data, error } = await supabase
      .from('postal_codes')
      .select('content')
      .eq('id', place.id)
      .single()
    if (error) {
      console.error('Could not load selected postal-area details:', error)
      return
    }
    setSelected({ ...place, content: data.content })
    setSelectedFact(null)
  }, [])

  const handleFactSelect = useCallback(async (place, fact) => {
    const { data, error } = await supabase
      .from('postal_codes')
      .select('content')
      .eq('id', place.id)
      .single()
    if (error) {
      console.error('Could not load selected postal-area details:', error)
      return
    }
    setSelected({ ...place, content: data.content })
    setSelectedFact(fact)
    setFactSheetExpanded(false)
    setFactSheetOpen(true)
  }, [])

  useEffect(() => {
    if (!activeMode) { setLoading(false); return }
    let alive = true
    async function load() {
      const pageSize = 800
      setLoading(true)
      setError('')
      setLoadDiagnostics(country === 'DE' ? {
        country, fetched: 0, accepted: 0, rejected: [], pageCount: 0, pageSize,
        diagnosticsError: '',
      } : null)
      try {
        let from = 0
        let all = []
        let pageCount = 0
        while (true) {
          const { data, error } = await supabase
            .from('postal_codes_explorer_completed')
            .select('id,country_code,postal_code,city,municipality,district,region,latitude,longitude,county')
            .eq('country_code', country)
            .order('postal_code')
            .range(from, from + pageSize - 1)
          if (error) throw error
          const page = data || []
          pageCount += 1
          all = all.concat(page)
          if (page.length < pageSize) break
          from += pageSize
        }
        if (!alive) return
        setPlaces(all)
        if (country !== 'DE') {
          setLoadDiagnostics(null)
          return
        }
        // Diagnostics are non-blocking: failures must not hide this link or stop Explorer.
        setLoadDiagnostics({
          country, fetched: all.length, accepted: all.length, rejected: [],
          pageCount, pageSize, diagnosticsError: '',
        })
        try {
          // Keep diagnostic requests small: the view runs full JSON-schema checks
          // and large pages can exceed Supabase's statement timeout.
          const diagnosticsPageSize = 50
          const { count: publishedCount, error: countError } = await supabase
            .from('postal_codes')
            .select('id', { count: 'exact', head: true })
            .eq('country_code', 'DE')
            .eq('status', 'published')
          if (countError) throw countError
          let diagnosticFrom = 0
          let rejected = []
          // The RPC paginates SOURCE published rows, then returns only rejected ones.
          // Therefore an empty/short result page does not mean the source has ended.
          while (diagnosticFrom < (publishedCount || 0)) {
            const { data: diagnosticPage, error: diagnosticError } = await supabase
              .rpc('get_postal_code_diagnostics_page', {
                p_offset: diagnosticFrom,
                p_limit: diagnosticsPageSize,
              })
            if (diagnosticError) throw diagnosticError
            const page = diagnosticPage || []
            rejected = rejected.concat(page.map(record => ({
              ...record,
              reasons: Array.isArray(record.reasons) ? record.reasons : [],
            })))
            diagnosticFrom += diagnosticsPageSize
          }
          if (alive) setLoadDiagnostics({
            country, fetched: publishedCount || 0, accepted: all.length,
            rejected, pageCount, pageSize, diagnosticsError: '',
          })
        } catch (diagnosticError) {
          console.error('Could not load postal-code diagnostics:', diagnosticError)
          if (alive) setLoadDiagnostics(current => current?.country === country
            ? { ...current, diagnosticsError: diagnosticError.message || 'Diagnostics could not be loaded.' }
            : current)
        }
      } catch (e) {
        if (alive) setError(e.message || u.error)
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => { alive = false }
  }, [country, activeMode])

  const startWithLocation = () => {
    setIntroMessage('')
    if (!navigator.geolocation) { setIntroMessage(lang === 'cs' ? 'Toto zařízení nepodporuje polohu.' : 'Location is not available on this device.'); return }
    setIntroMessage(lang === 'cs' ? 'Čekám na povolení polohy…' : 'Waiting for location permission…')
    navigator.geolocation.getCurrentPosition(position => {
      setMapStart([position.coords.latitude, position.coords.longitude])
      setSelected(null); setSelectedFact(null); setActiveMode('location')
      setIntroMessage('')
    }, () => setIntroMessage(lang === 'cs' ? 'Polohu se nepodařilo získat. Zkontroluj oprávnění GPS.' : 'Could not get your location. Check GPS permissions.'), { enableHighAccuracy: true, timeout: 12000 })
  }

  const searchIntroPlace = async (event) => {
    event.preventDefault()
    const term = introSearch.trim()
    if (!term) return
    setIntroMessage(lang === 'cs' ? 'Vyhledávám místo…' : 'Searching for place…')
    try {
      const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(term)}&limit=1&lang=${lang}`)
      if (!response.ok) throw new Error('Search failed')
      const result = await response.json()
      const feature = result.features?.[0]
      if (!feature) { setIntroMessage(lang === 'cs' ? 'Místo se nepodařilo najít.' : 'Place not found.'); return }
      const [lon, lat] = feature.geometry.coordinates
      setMapStart([lat, lon]); setSelected(null); setSelectedFact(null); setActiveMode('search'); setIntroMessage('')
    } catch { setIntroMessage(lang === 'cs' ? 'Vyhledávání se nezdařilo. Zkus to prosím znovu.' : 'Search failed. Please try again.') }
  }

  const startExplorer = async () => {
    setIntroMessage(lang === 'cs' ? 'Hledám náhodný objev…' : 'Finding a random discovery…')
    try {
      // The map index contains one row per published fact with valid GPS coordinates.
      // Sampling this table makes every eligible fact equally likely, regardless of
      // how many facts happen to belong to its postal-code record.
      const { count, error: countError } = await supabase
        .from('explorer_map_points')
        .select('postal_id', { count: 'exact', head: true })
      if (countError) throw countError
      if (!count) throw new Error('No published facts with coordinates')

      const offset = Math.floor(Math.random() * count)
      const { data: mapFacts, error: pickError } = await supabase
        .from('explorer_map_points')
        .select('postal_id,country_code,postal_code,city,fact_id,lat,lon')
        .range(offset, offset)
      if (pickError) throw pickError
      const mapFact = mapFacts?.[0]
      if (!mapFact) throw new Error('Random fact could not be selected')

      const { data: place, error: placeError } = await supabase
        .from('postal_codes')
        .select('id,country_code,postal_code,city,municipality,district,region,latitude,longitude,content')
        .eq('id', mapFact.postal_id)
        .eq('status', 'published')
        .single()
      if (placeError) throw placeError

      const fact = (place.content?.facts || []).find(item => String(item.id) === String(mapFact.fact_id))
      if (!fact) throw new Error('Selected fact is no longer available in its published record')

      const selectedPlace = {
        ...place,
        latitude: mapFact.lat,
        longitude: mapFact.lon,
      }
      setCountry(place.country_code || 'DE')
      setMapStart([mapFact.lat, mapFact.lon])
      setSelected(selectedPlace)
      setSelectedFact(fact)
      setActiveMode('real')
      setFactSheetExpanded(false)
      setFactSheetOpen(true)
      setIntroMessage('')
    } catch (e) {
      console.error('Real Explorer failed:', e)
      setIntroMessage(lang === 'cs' ? 'Náhodný objev se nepodařilo načíst. Zkus to znovu.' : 'Could not load a random discovery. Please try again.')
    }
  }

  const stateOptions = useMemo(() => [...new Set(places.map(getState).filter(Boolean))].sort((a, b) => a.localeCompare(b)), [places])
  const countyOptions = useMemo(() => [...new Set(places
    .filter(place => !selectedState || getState(place) === selectedState)
    .map(getCounty).filter(Boolean))].sort((a, b) => a.localeCompare(b)), [places, selectedState])

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase()
    return places.filter(p => {
      if (selectedState && getState(p) !== selectedState) return false
      if (selectedCounty && getCounty(p) !== selectedCounty) return false
      if (!q) return true
      return [p.postal_code, p.city, p.municipality, getCounty(p), getState(p)]
        .filter(Boolean).join(' ').toLocaleLowerCase().includes(q)
    })
  }, [places, query, selectedState, selectedCounty])

  const localizedFacts = selected ? getLocalizedFacts(selected.content, lang) : []
  const facts = selectedFact
    ? localizedFacts.filter(fact => fact.id === selectedFact.id)
    : localizedFacts
  const activeFact = facts[0] || null
  const center = selected && Number.isFinite(selected.latitude) && Number.isFinite(selected.longitude)
    ? [selected.latitude, selected.longitude] : mapStart
  const selectedPoint = selected?.content?.representative_point || (selected ? { lat: selected.latitude, lon: selected.longitude } : null)

  return <main className={`app-shell ${!activeMode ? 'intro-active' : ''}`}>
    <header className="topbar">
      <a className="brand" href="#" onClick={event => { event.preventDefault(); setActiveMode(''); setSelected(null); setSelectedFact(null); setFactSheetOpen(false) }}><span className="brand-mark"><Compass size={20} /></span><span>EUROPE<span className="brand-light">EXPLORER</span></span></a>
      <div className="top-actions">
        <span className="live-dot" /><span className="top-caption">{u.tagline}</span>
        <div className={`language-switch ${menuOpen ? "menu-visible" : ""}`}>{LANGS.map(l => <button key={l.id} className={lang === l.id ? "active" : ""} onClick={() => { setLang(l.id); setMenuOpen(false) }}>{l.label}</button>)}</div><button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? u.closeMenu : u.openMenu} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </header>

    {!activeMode ? <section className="welcome-screen">
      <div className="welcome-orbit" aria-hidden="true"><div className="welcome-globe"><span /><i /><b /></div><small>EUROPE / DISCOVER</small></div>
      <div className="welcome-copy"><div className="eyebrow"><span />{lang === 'cs' ? 'EVROPA PLNÁ OBJEVŮ' : (copy[lang] || copy.en).eyebrow.toUpperCase()}</div>
        <h1>{lang === 'cs' ? 'Kam se dnes podíváme?' : 'Where will you explore today?'}</h1>
        <p>{lang === 'cs' ? 'Objevuj zajímavá místa, příběhy a skrytá zákoutí Evropy.' : 'Discover remarkable places, local stories and hidden corners of Europe.'}</p>
      </div>
      <div className="welcome-options">
        <button className="welcome-option" onClick={startWithLocation}><span className="welcome-icon"><MapPin size={21}/></span><span><strong>{lang === 'cs' ? 'Moje aktuální poloha' : 'My current location'}</strong><small>{lang === 'cs' ? 'Objevuj zajímavosti v okolí' : 'Discover highlights nearby'}</small></span><ArrowUpRight size={18}/></button>
        <form className="welcome-option welcome-search" onSubmit={searchIntroPlace}><span className="welcome-icon"><Search size={21}/></span><span className="welcome-search-fields"><strong>{lang === 'cs' ? 'Vyhledat místo' : 'Search for a place'}</strong><input value={introSearch} onChange={e => setIntroSearch(e.target.value)} placeholder={lang === 'cs' ? 'Město, obec nebo PSČ…' : 'City, town or postal code…'} /></span><button type="submit" aria-label="Search"><ArrowUpRight size={18}/></button></form>
        <button className="welcome-option" onClick={() => { setActiveMode('area'); setIntroMessage('') }}><span className="welcome-icon"><Globe2 size={21}/></span><span><strong>{lang === 'cs' ? 'Vybrat oblast' : 'Choose an area'}</strong><small>{lang === 'cs' ? 'Země, region a okres' : 'Country, region and district'}</small></span><ArrowUpRight size={18}/></button>
        <button className="welcome-option welcome-real" onClick={startExplorer}><span className="welcome-icon"><Compass size={22}/></span><span><strong>Real Explorer</strong><small>{lang === 'cs' ? 'Nech se překvapit náhodným objevem' : 'Let a random discovery surprise you'}</small></span><ArrowUpRight size={18}/></button>
      </div>
      {introMessage && <p className="welcome-message" role="status">{introMessage}</p>}
      <div className="welcome-foot"><span><i/> {lang === 'cs' ? 'EVROPA ČEKÁ NA OBJEVENÍ' : 'EUROPE IS WAITING TO BE DISCOVERED'}</span><span>01 — 04</span></div>
    </section> : <>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span />{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="search-wrap"><Search size={19} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search} /><kbd>⌕</kbd></div>
        <div className="hero-meta"><span><Globe2 size={15} /> {t.all}</span><b>{loading ? '—' : filtered.length.toLocaleString()}</b><span>{t.results}</span></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="globe"><div className="globe-grid" /><span className="globe-pin pin-a" /><span className="globe-pin pin-b" /><span className="globe-pin pin-c" /></div><span className="art-label label-a">51° 10′ N</span><span className="art-label label-b">EUROPE / 01</span></div>
    </section>

    <section className="workspace">
      <div className="section-heading"><div><div className="section-kicker"><span />{t.explore}</div><h2>{t.source}</h2></div><div className="country-select"><SlidersHorizontal size={15} /><select value={country} onChange={e => { setCountry(e.target.value); setSelected(null); setSelectedFact(null); setSelectedState(''); setSelectedCounty('') }}><option value="DE">{u.germany} · DE</option><option value="CZ">{u.czechia} · CZ</option></select></div></div>
      <div className="mobile-tools"><button onClick={() => setFiltersOpen(v => !v)} aria-expanded={filtersOpen}><Filter size={16} /> {u.filters}</button><button onClick={() => setPlacesOpen(v => !v)} aria-expanded={placesOpen}><List size={16} /> {u.places} ({filtered.length})</button></div><div className={`filter-bar ${filtersOpen ? "mobile-open" : ""}`}>
        <label className="filter-field"><span>{country === 'DE' ? u.bundesland : u.region}</span><select value={selectedState} onChange={e => { setSelectedState(e.target.value); setSelectedCounty(''); setSelected(null); setSelectedFact(null) }}><option value="">{country === 'DE' ? u.allStates : u.allRegions}</option>{stateOptions.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
        <label className="filter-field"><span>{country === 'DE' ? u.county : u.district}</span><select value={selectedCounty} onChange={e => { setSelectedCounty(e.target.value); setSelected(null) }}><option value="">{u.allCounties}</option>{countyOptions.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
        <button className="filter-reset" onClick={() => { setSelectedState(''); setSelectedCounty(''); setQuery(''); setSelected(null); setSelectedFact(null) }}>{u.reset}</button>
      </div>
      <div className="explorer-grid">
        <aside className={`places-panel ${placesOpen ? "mobile-open" : ""}`}>
          <div className="panel-head"><span>{t.all}</span><span className="count">{filtered.length}</span></div>
          <div className="place-list">
            {loading && <div className="state-message"><LoaderCircle className="spin" size={20} />{t.loading}</div>}
            {error && <div className="error-message">{error}</div>}
            {!loading && !error && filtered.length === 0 && <div className="state-message">{t.empty}</div>}
            {filtered.map(p => <button key={p.id} className={'place-row ' + (selected?.id === p.id ? 'selected' : '')} onClick={() => { handlePlaceSelect(p); setPlacesOpen(false) }}>
              <span className="place-marker"><MapPin size={17} /></span><span className="place-info"><strong>{p.city || p.postal_code}</strong><small>{[p.postal_code, p.region, p.district].filter(Boolean).join(' · ')}</small></span><ArrowUpRight size={15} className="row-arrow" />
            </button>)}
          </div>
          <div className="panel-foot"><span className="status-dot" /> {u.live}</div>
        </aside>

        <div className="map-panel">
          <div className="map-topline"><span><span className="status-dot" /> {country === 'DE' ? u.germany : u.czechia} / {u.map}</span><span>{u.pins} · {filtered.length.toLocaleString()} {u.areas}</span></div>
          <MapContainer center={center} zoom={6} scrollWheelZoom className="map">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapFocus place={selected} selectedFact={selectedFact} mapStart={mapStart} activeMode={activeMode} />
            <ViewportFactLayer onSelectFact={handleFactSelect} />
          </MapContainer>
          <div className="map-legend"><span className="legend-dot" /> {u.factLocation} <span className="legend-line" /> {u.clusterHint}</div>
        </div>

        <aside className={`detail-panel ${selected ? "has-selection" : ""}`}>
          {selected ? <>
            <div className="detail-image"><div className="detail-image-grid" /><span className="image-tag">{selectedFact ? u.pinDiscovery : u.localDiscovery}</span><span className="image-coords">{(selectedFact?.location || selectedPoint)?.lat?.toFixed(3)}, {(selectedFact?.location || selectedPoint)?.lon?.toFixed(3)}</span></div>
            <div className="detail-content"><div className="detail-kicker">{selectedFact ? u.pinDiscovery : u.postalArea} / {selected.postal_code}</div><h3>{selected.city || selected.postal_code}</h3><p className="detail-location">{[selected.municipality, selected.district, selected.region].filter(Boolean).join(', ')}</p><div className="detail-divider" /><div className="detail-subhead">{t.details}<span>{facts.length.toString().padStart(2, '0')}</span></div>
              {facts.length ? <div className="fact-list">{facts.map((f, i) => <article className="fact" key={f.id || i}><span className="fact-index">{String(i + 1).padStart(2, '0')}</span><div><h4>{f.title || f.name || u.discover}</h4><p>{f.text || f.description || ''}</p><span className="fact-category">{(mapCategoryCopy[lang]?.[f.map_category] || f.category || 'Discovery').toUpperCase()}</span></div></article>)}</div> : <p className="detail-location">{u.noHighlights}</p>}
            </div><button className="close-detail" onClick={() => { setSelected(null); setSelectedFact(null) }} aria-label={u.closeDetails}><X size={16} /></button>
          </> : <div className="empty-detail"><div className="empty-icon"><MapPin size={26} /></div><span>{u.next}</span><h3>{t.choose}</h3><p>{t.note}</p></div>}
        </aside>
      </div>
    </section>
    </>}
    {factSheetOpen && selectedFact && activeFact && <section className={`fact-screen-sheet ${factSheetExpanded ? 'is-expanded' : ''}`} role="dialog" aria-label={activeFact.title || activeFact.name || u.pinDiscovery}>
      <div className="fact-screen-sheet-heading">
        <div className="fact-screen-sheet-title">{activeFact.title || activeFact.name || u.discover}</div>
        <button className="fact-screen-sheet-close" onClick={() => { setFactSheetOpen(false); setFactSheetExpanded(false) }} aria-label={u.closeDetails}><X size={18} /></button>
        <div className="fact-screen-sheet-subtitle">{[selected?.postal_code, activeFact.location?.name, selected?.city].filter(Boolean).join(' · ')}</div>
      </div>
      <div className="fact-screen-sheet-body">{activeFact.text || activeFact.description || ''}</div>
      <div className="fact-screen-sheet-category">{(mapCategoryCopy[lang]?.[activeFact.map_category] || activeFact.category || 'Discovery').toUpperCase()}</div>
      <button className="fact-screen-sheet-handle" onPointerDown={event => { factSheetDragStart.current = event.clientY; event.currentTarget.setPointerCapture?.(event.pointerId) }} onPointerUp={event => { if (factSheetDragStart.current === null) return; const delta = event.clientY - factSheetDragStart.current; setFactSheetExpanded(Math.abs(delta) > 12 ? delta < 0 : !factSheetExpanded); factSheetDragStart.current = null }} onPointerCancel={() => { factSheetDragStart.current = null }} onClick={() => {}} aria-label={factSheetExpanded ? 'Collapse fact' : 'Expand fact'}>
        <span className="fact-screen-sheet-grip" /><span>{factSheetExpanded ? (lang === 'cs' ? 'TAŽENÍM DOLŮ SBALÍŠ' : 'DRAG DOWN TO COLLAPSE') : (lang === 'cs' ? 'TAŽENÍM NAHORU ZOBRAZÍŠ VÍCE' : 'DRAG UP TO READ MORE')}</span>
      </button>
    </section>}
    {country === 'DE' && loadDiagnostics?.country === 'DE' && <section style={{ margin: '8px auto 16px', padding: '0 12px', maxWidth: '1200px', color: '#78716c', fontSize: '11px' }}>
      <details>
        <summary style={{ cursor: 'pointer', display: 'inline-block', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 400, fontSize: '11px' }}>Diagnostika</summary>
        <div style={{ marginTop: '12px', padding: '16px', border: '1px solid #d6d3d1', borderRadius: '10px', background: '#fff', color: '#292524', fontSize: '13px' }}>
          <p style={{ margin: '0 0 6px' }}>Published DE records checked: <strong>{loadDiagnostics.fetched}</strong> · Complete in Explorer: <strong>{loadDiagnostics.accepted}</strong> · Rejected: <strong>{loadDiagnostics.rejected.length}</strong></p>
          <p style={{ margin: '0 0 12px' }}>Complete-record pages: {loadDiagnostics.pageCount} · Page size: {loadDiagnostics.pageSize} · Diagnostics fetched in batches of 50</p>
          {loadDiagnostics.diagnosticsError ? <p style={{ color: '#b91c1c' }}>Diagnostics unavailable: {loadDiagnostics.diagnosticsError}</p> : null}
          {loadDiagnostics.rejected.length === 0 ? <p>{loadDiagnostics.diagnosticsError ? 'Explorer data is available, but diagnostic records could not be loaded.' : 'All published records pass the Explorer completeness checks.'}</p> : <ol style={{ margin: 0, paddingLeft: '22px' }}>{loadDiagnostics.rejected.map((record, index) => <li key={record.id || record.postal_code || index} style={{ marginBottom: '10px' }}>
            <strong>{record.postal_code || 'Unknown postal code'}</strong>{record.city ? ` · ${record.city}` : ''}
            <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>{record.reasons.map((reason, reasonIndex) => <li key={reasonIndex}>{reason}</li>)}</ul>
          </li>)}</ol>}
        </div>
      </details>
    </section>}
    <footer><span>EUROPE EXPLORER</span><span>{u.footer}</span><span>© 2026</span></footer>
  </main>
}