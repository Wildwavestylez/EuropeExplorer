import { useCallback, useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Search, Compass, MapPin, Globe2, ArrowUpRight, X, LoaderCircle, SlidersHorizontal, Menu, List, Filter } from 'lucide-react'
import { supabase } from './lib/supabase'
import { isV3Record } from './lib/v3'
import FactClusterLayer from './components/FactClusterLayer'

const LANGS = [
  { id: 'en', label: 'EN' }, { id: 'de', label: 'DE' }, { id: 'cs', label: 'CS' },
  { id: 'es', label: 'ES' }, { id: 'fr', label: 'FR' }, { id: 'it', label: 'IT' },
]
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

function MapFocus({ place, selectedFact, places }) {
  const map = useMap()
  useEffect(() => {
    const factPoint = selectedFact?.location
    const points = place && factPoint && Number.isFinite(factPoint.lat) && Number.isFinite(factPoint.lon)
      ? [[factPoint.lat, factPoint.lon]]
      : place ? factCoordinates(place) : places.flatMap(factCoordinates)
    if (points.length > 1) {
      map.fitBounds(points, { padding: [58, 58], maxZoom: place ? 15 : 6, animate: true, duration: 0.8 })
    } else if (points.length === 1) {
      map.flyTo(points[0], place ? 14 : 6, { duration: 0.8 })
    } else if (place) {
      const point = place.content?.representative_point
      if (Number.isFinite(point?.lat) && Number.isFinite(point?.lon)) map.flyTo([point.lat, point.lon], 11, { duration: 0.8 })
    } else {
      map.setView([51.1657, 10.4515], 6, { animate: true })
    }
  }, [place, selectedFact, places, map])
  return null
}

function getState(place) {
  return place.content?.state || place.region || ''
}

function getCounty(place) {
  return place.content?.county || place.district || ''
}

export default function App() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [lang, setLang] = useState('en')
  const [selected, setSelected] = useState(null)
  const [selectedFact, setSelectedFact] = useState(null)
  const [country, setCountry] = useState('DE')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [placesOpen, setPlacesOpen] = useState(false)
  const t = copy[lang] || copy.en
  const u = uiCopy[lang] || uiCopy.en

  const handleFactSelect = useCallback((place, fact) => {
    setSelected(place)
    setSelectedFact(fact)
  }, [])

  useEffect(() => {
    let alive = true
    async function load() {
      setLoading(true); setError('')
      try {
        const pageSize = 800
        let from = 0
        let all = []
        while (true) {
          const { data, error } = await supabase
            .from('postal_codes')
            .select('id,country_code,postal_code,city,municipality,district,region,content')
            .eq('status', 'published')
            .eq('country_code', country)
            .order('postal_code')
            .range(from, from + pageSize - 1)
          if (error) throw error
          all = all.concat(data || [])
          if (!data || data.length < pageSize) break
          from += pageSize
        }
        if (alive) setPlaces(all.filter(p => isV3Record(p.content, country)))
      } catch (e) {
        if (alive) setError(e.message || u.error)
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => { alive = false }
  }, [country])

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
  const selectedPoint = selected?.content?.representative_point
  const center = Number.isFinite(selectedPoint?.lat) && Number.isFinite(selectedPoint?.lon)
    ? [selectedPoint.lat, selectedPoint.lon] : [51.1657, 10.4515]
  const factPinCount = filtered.reduce((total, place) => total + place.content.facts.filter(f => {
    const point = f.location
    return point && Number.isFinite(point.lat) && Number.isFinite(point.lon)
      && point.lat >= -90 && point.lat <= 90 && point.lon >= -180 && point.lon <= 180
  }).length, 0)

  return <main className="app-shell">
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-mark"><Compass size={20} /></span><span>EUROPE<span className="brand-light">EXPLORER</span></span></a>
      <div className="top-actions">
        <span className="live-dot" /><span className="top-caption">DISCOVER THE UNEXPECTED</span>
        <div className={`language-switch ${menuOpen ? "menu-visible" : ""}`}>{LANGS.map(l => <button key={l.id} className={lang === l.id ? "active" : ""} onClick={() => { setLang(l.id); setMenuOpen(false) }}>{l.label}</button>)}</div><button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? u.closeMenu : u.openMenu} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </header>

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
            {filtered.map(p => <button key={p.id} className={'place-row ' + (selected?.id === p.id ? 'selected' : '')} onClick={() => { setSelected(p); setSelectedFact(null); setPlacesOpen(false) }}>
              <span className="place-marker"><MapPin size={17} /></span><span className="place-info"><strong>{p.city || p.postal_code}</strong><small>{[p.postal_code, p.region, p.district].filter(Boolean).join(' · ')}</small></span><ArrowUpRight size={15} className="row-arrow" />
            </button>)}
          </div>
          <div className="panel-foot"><span className="status-dot" /> {u.live}</div>
        </aside>

        <div className="map-panel">
          <div className="map-topline"><span><span className="status-dot" /> {country === 'DE' ? country === 'DE' ? u.germany : u.czechia} / {u.map}</span><span>{factPinCount.toLocaleString()} {u.pins} · {filtered.length.toLocaleString()} {u.areas}</span></div>
          <MapContainer center={center} zoom={6} scrollWheelZoom className="map">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapFocus place={selected} selectedFact={selectedFact} places={filtered} />
            <FactClusterLayer places={filtered} lang={lang} onSelectFact={handleFactSelect} />
          </MapContainer>
          <div className="map-legend"><span className="legend-dot" /> {u.factLocation} <span className="legend-line" /> {u.clusterHint}</div>
        </div>

        <aside className={`detail-panel ${selected ? "has-selection" : ""}`}>
          {selected ? <>
            <div className="detail-image"><div className="detail-image-grid" /><span className="image-tag">{selectedFact ? u.pinDiscovery : u.localDiscovery}</span><span className="image-coords">{(selectedFact?.location || selectedPoint)?.lat?.toFixed(3)}, {(selectedFact?.location || selectedPoint)?.lon?.toFixed(3)}</span></div>
            <div className="detail-content"><div className="detail-kicker">{selectedFact ? u.pinDiscovery : u.postalArea} / {selected.postal_code}</div><h3>{selected.city || selected.postal_code}</h3><p className="detail-location">{[selected.municipality, selected.district, selected.region].filter(Boolean).join(', ')}</p><div className="detail-divider" /><div className="detail-subhead">{t.details}<span>{facts.length.toString().padStart(2, '0')}</span></div>
              {facts.length ? <div className="fact-list">{facts.map((f, i) => <article className="fact" key={f.id || i}><span className="fact-index">{String(i + 1).padStart(2, '0')}</span><div><h4>{f.title || f.name || u.discover}</h4><p>{f.text || f.description || ''}</p><span className="fact-category">{(f.category || 'DISCOVERY').replaceAll('_', ' ').toUpperCase()}</span></div></article>)}</div> : <p className="detail-location">{u.noHighlights}</p>}
            </div><button className="close-detail" onClick={() => { setSelected(null); setSelectedFact(null) }} aria-label={u.closeDetails}><X size={16} /></button>
          </> : <div className="empty-detail"><div className="empty-icon"><MapPin size={26} /></div><span>{u.next}</span><h3>{t.choose}</h3><p>{t.note}</p></div>}
        </aside>
      </div>
    </section>
    <footer><span>EUROPE EXPLORER</span><span>{u.footer}</span><span>© 2026</span></footer>
  </main>
}