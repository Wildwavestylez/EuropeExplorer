import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Search, Compass, MapPin, Globe2, ArrowUpRight, X, LoaderCircle, SlidersHorizontal, Menu, List, Filter } from 'lucide-react'
import ViewportFactLayer from './components/ViewportFactLayer'


async function apiGet(path) {
  const response = await fetch(path)
  const payload = await response.json()
  if (!response.ok) throw new Error(payload.error || 'Data service request failed.')
  return payload
}
const recordCache = new Map()
const placesCache = new Map()
async function getPublishedPlaces(country) {
  if (!placesCache.has(country)) {
    placesCache.set(country, apiGet('/api/places?country=' + country).then(result => result.places || []).catch(error => {
      placesCache.delete(country)
      throw error
    }))
  }
  return placesCache.get(country)
}
async function getPublishedRecord(country, postcode) {
  const key = country + ':' + postcode
  if (!recordCache.has(key)) {
    recordCache.set(key, apiGet('/api/place?country=' + country + '&postcode=' + encodeURIComponent(postcode))
      .then(result => result.content)
      .catch(error => {
        recordCache.delete(key)
        throw error
      }))
  }
  return recordCache.get(key)
}
const getItalyRecord = postcode => getPublishedRecord('IT', postcode)
const getCzechRecord = postcode => getPublishedRecord('CZ', postcode)
const getSlovakiaRecord = postcode => getPublishedRecord('SK', postcode)
const getItalyPublishedPlaces = () => getPublishedPlaces('IT')
const getCzechPublishedPlaces = () => getPublishedPlaces('CZ')
const getSlovakiaPublishedPlaces = () => getPublishedPlaces('SK')
async function getCzechDiagnostics() {
  return apiGet('/api/diagnostics?country=CZ')
}
const LANGS = [
  { id: 'en', label: 'EN' }, { id: 'de', label: 'DE' }, { id: 'cs', label: 'CS' },
  { id: 'es', label: 'ES' }, { id: 'fr', label: 'FR' }, { id: 'it', label: 'IT' }, { id: 'nl', label: 'NL' }, 
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
  nl: { eyebrow: 'Een continent om te ontdekken', title: 'Europa, plek voor plek.', subtitle: 'Ontdek lokale verhalen, bijzondere plekken en verborgen parels.', search: 'Zoek plaatsen of postcodes', all: 'Alle plaatsen', results: 'gepubliceerde gebieden', explore: 'Verken de kaart', details: 'Bijzondere plekken', loading: 'Plaatsen laden…', empty: 'Geen overeenkomende plaatsen gevonden.', choose: 'Selecteer een plaats op de kaart of in de lijst.', source: 'Ontdek per postcodegebied', note: 'De kaartmarkeringen tonen het representatieve punt van elk postcodegebied.' },
}


const uiCopy = {
  en: { tagline:'DISCOVER THE UNEXPECTED', openMenu:'Open menu', closeMenu:'Close menu', filters:'FILTERS', places:'PLACES', germany:'GERMANY', czechia:'CZECHIA', slovakia:'SLOVAKIA', map:'EXPLORATION MAP', bundesland:'BUNDESLAND', region:'REGION', county:'LANDKREIS / KREIS', district:'DISTRICT', allStates:'All federal states', allRegions:'All regions', allCounties:'All districts', reset:'RESET FILTERS', live:'LIVE DATA · NEON', liveGithub:'LIVE DATA · GITHUB', pins:'FACT PINS', areas:'AREAS', factLocation:'FACT LOCATION', clusterHint:'CLUSTERS MERGE ON ZOOM-OUT', pinDiscovery:'PIN DISCOVERY', localDiscovery:'LOCAL DISCOVERY', postalArea:'POSTAL AREA', discover:'Discover this place', noHighlights:'No published highlights are available for this area yet.', next:'YOUR NEXT DISCOVERY', closeDetails:'Close details', footer:'BUILT FOR THE CURIOUS · DATA FROM PUBLISHED POSTAL AREAS', error:'Could not load places from the database.' },
  de: { tagline:'ENTDECKE DAS UNERWARTETE', openMenu:'Menü öffnen', closeMenu:'Menü schließen', filters:'FILTER', places:'ORTE', germany:'DEUTSCHLAND', czechia:'TSCHECHIEN', slovakia:'SLOWAKEI', map:'ENTDECKUNGSKARTE', bundesland:'BUNDESLAND', region:'REGION', county:'LANDKREIS / KREIS', district:'LANDKREIS', allStates:'Alle Bundesländer', allRegions:'Alle Regionen', allCounties:'Alle Landkreise', reset:'FILTER ZURÜCKSETZEN', live:'LIVE-DATEN · NEON', liveGithub:'LIVE-DATEN · GITHUB', pins:'FAKTEN-MARKER', areas:'GEBIETE', factLocation:'ORT DER SEHENSWÜRDIGKEIT', clusterHint:'CLUSTER BEIM HERAUSZOOMEN ZUSAMMENGEFASST', pinDiscovery:'ENTDECKUNG PER MARKER', localDiscovery:'ENTDECKUNG VOR ORT', postalArea:'POSTLEITZAHLGEBIET', discover:'Diesen Ort entdecken', noHighlights:'Für dieses Gebiet sind noch keine veröffentlichten Highlights verfügbar.', next:'DEINE NÄCHSTE ENTDECKUNG', closeDetails:'Details schließen', footer:'FÜR ENTDECKER · DATEN AUS VERÖFFENTLICHTEN POSTLEITZAHLGEBIETEN', error:'Orte konnten nicht aus der Datenbank geladen werden.' },
  cs: { tagline:'OBJEVUJ NEČEKANÉ', openMenu:'Otevřít menu', closeMenu:'Zavřít menu', filters:'FILTRY', places:'MÍSTA', germany:'NĚMECKO', czechia:'ČESKO', slovakia:'SLOVENSKO', map:'MAPA OBJEVŮ', bundesland:'SPOLKOVÁ ZEMĚ', region:'KRAJ', county:'OKRES', district:'OKRES', allStates:'Všechny spolkové země', allRegions:'Všechny kraje', allCounties:'Všechny okresy', reset:'VYMAZAT FILTRY', live:'ŽIVÁ DATA · NEON', liveGithub:'ŽIVÁ DATA · GITHUB', pins:'ZAJÍMAVOSTI NA MAPĚ', areas:'OBLASTI', factLocation:'MÍSTO ZAJÍMAVOSTI', clusterHint:'PŘI ODDÁLENÍ SE BODY SESKUPUJÍ', pinDiscovery:'OBJEV Z MAPY', localDiscovery:'MÍSTNÍ OBJEV', postalArea:'OBLAST PSČ', discover:'Objev toto místo', noHighlights:'Pro tuto oblast zatím nejsou dostupné žádné publikované zajímavosti.', next:'TVŮJ DALŠÍ OBJEV', closeDetails:'Zavřít detail', footer:'PRO ZVĚDAVÉ · DATA Z PUBLIKOVANÝCH POŠTOVNÍCH OBLASTÍ', error:'Místa se nepodařilo načíst z databáze.' },
  es: { tagline:'DESCUBRE LO INESPERADO', openMenu:'Abrir menú', closeMenu:'Cerrar menú', filters:'FILTROS', places:'LUGARES', germany:'ALEMANIA', czechia:'CHEQUIA', slovakia:'ESLOVAQUIA', map:'MAPA DE EXPLORACIÓN', bundesland:'ESTADO FEDERADO', region:'REGIÓN', county:'DISTRITO', district:'DISTRITO', allStates:'Todos los estados federados', allRegions:'Todas las regiones', allCounties:'Todos los distritos', reset:'BORRAR FILTROS', live:'DATOS EN DIRECTO · NEON', liveGithub:'DATOS EN DIRECTO · GITHUB', pins:'PUNTOS DE INTERÉS', areas:'ZONAS', factLocation:'UBICACIÓN DEL PUNTO', clusterHint:'LOS GRUPOS SE UNEN AL ALEJAR EL ZOOM', pinDiscovery:'DESCUBRIMIENTO EN EL MAPA', localDiscovery:'DESCUBRIMIENTO LOCAL', postalArea:'ZONA POSTAL', discover:'Descubre este lugar', noHighlights:'Todavía no hay lugares destacados publicados para esta zona.', next:'TU PRÓXIMO DESCUBRIMIENTO', closeDetails:'Cerrar detalles', footer:'PARA PERSONAS CURIOSAS · DATOS DE ZONAS POSTALES PUBLICADAS', error:'No se pudieron cargar los lugares de la base de datos.' },
  fr: { tagline:'DÉCOUVREZ L’INATTENDU', openMenu:'Ouvrir le menu', closeMenu:'Fermer le menu', filters:'FILTRES', places:'LIEUX', germany:'ALLEMAGNE', czechia:'TCHÉQUIE', slovakia:'SLOVAQUIE', map:'CARTE EXPLORATOIRE', bundesland:'LAND', region:'RÉGION', county:'ARRONDISSEMENT', district:'DISTRICT', allStates:'Tous les Länder', allRegions:'Toutes les régions', allCounties:'Tous les districts', reset:'RÉINITIALISER LES FILTRES', live:'DONNÉES EN DIRECT · NEON', liveGithub:'DONNÉES EN DIRECT · GITHUB', pins:'POINTS D’INTÉRÊT', areas:'ZONES', factLocation:'EMPLACEMENT DU POINT', clusterHint:'LES GROUPES SE REGROUPENT AU DÉZOOMAGE', pinDiscovery:'DÉCOUVERTE SUR LA CARTE', localDiscovery:'DÉCOUVERTE LOCALE', postalArea:'ZONE POSTALE', discover:'Découvrez ce lieu', noHighlights:'Aucun lieu remarquable publié n’est encore disponible pour cette zone.', next:'VOTRE PROCHAINE DÉCOUVERTE', closeDetails:'Fermer les détails', footer:'POUR LES CURIEUX · DONNÉES DES ZONES POSTALES PUBLIÉES', error:'Impossible de charger les lieux depuis la base de données.' },
  it: { tagline:'SCOPRI L’INATTESO', openMenu:'Apri il menu', closeMenu:'Chiudi il menu', filters:'FILTRI', places:'LUOGHI', germany:'GERMANIA', czechia:'CECHIA', slovakia:'SLOVACCHIA', map:'MAPPA DI ESPLORAZIONE', bundesland:'STATO FEDERATO', region:'REGIONE', county:'DISTRETTO', district:'DISTRETTO', allStates:'Tutti gli stati federati', allRegions:'Tutte le regioni', allCounties:'Tutti i distretti', reset:'REIMPOSTA FILTRI', live:'DATI IN DIRETTA · NEON', liveGithub:'DATI IN DIRETTA · GITHUB', pins:'PUNTI DI INTERESSE', areas:'AREE', factLocation:'LUOGO DEL PUNTO', clusterHint:'I GRUPPI SI UNISCONO RIDUCENDO LO ZOOM', pinDiscovery:'SCOPERTA SULLA MAPPA', localDiscovery:'SCOPERTA LOCALE', postalArea:'AREA POSTALE', discover:'Scopri questo luogo', noHighlights:'Non sono ancora disponibili punti di interesse pubblicati per quest’area.', next:'LA TUA PROSSIMA SCOPERTA', closeDetails:'Chiudi dettagli', footer:'PER I CURIOSI · DATI DELLE AREE POSTALI PUBBLICATE', error:'Impossibile caricare i luoghi dal database.' },
  nl: { tagline:'ONTDEK HET ONVERWACHTE', openMenu:'Menu openen', closeMenu:'Menu sluiten', filters:'FILTERS', places:'PLAATSEN', germany:'DUITSLAND', czechia:'TSJECHIË', slovakia:'SLOWAKIJE', map:'ONTDEKKINGSKAART', bundesland:'BONDSLAND', region:'REGIO', county:'LANDKREIS / DISTRICT', district:'DISTRICT', allStates:'Alle deelstaten', allRegions:'Alle regio’s', allCounties:'Alle districten', reset:'FILTERS WISSEN', live:'LIVEGEGEVENS · NEON', liveGithub:'LIVEGEGEVENS · GITHUB', pins:'FEITMARKERINGEN', areas:'GEBIEDEN', factLocation:'LOCATIE VAN DE BEZIENSWAARDIGHEID', clusterHint:'MARKERINGEN WORDEN GEGROEPEERD BIJ UITZOOMEN', pinDiscovery:'ONTDEKKING VIA MARKERING', localDiscovery:'ONTDEKKING IN DE BUURT', postalArea:'POSTCODEGEBIED', discover:'Ontdek deze plek', noHighlights:'Er zijn nog geen gepubliceerde hoogtepunten voor dit gebied.', next:'JOUW VOLGENDE ONTDEKKING', closeDetails:'Details sluiten', footer:'GEMAAKT VOOR NIEUWSGIERIGEN · GEGEVENS UIT GEPUBLICEERDE POSTCODEGEBIEDEN', error:'Plaatsen konden niet uit de database worden geladen.' },
}


const mapCategoryCopy = {
  en: { castle:'Castle', cultural_site:'Cultural venue', historical_monument:'Historical monument', nature:'Nature', viewpoint_landscape:'Viewpoint / landscape', historic_city:'Historic city', museum:'Museum', religious_site:'Religious site', technical_heritage:'Technical heritage', personality:'Personality', architecture:'Architecture', archaeological_site:'Archaeological site', park_garden:'Park / garden', visitor_attraction:'Visitor attraction', local_culture:'Local culture', science_site:'Science site', sports_venue:'Sports venue' },
  de: { castle:'Burg / Schloss', cultural_site:'Kulturort', historical_monument:'Historisches Denkmal', nature:'Natur', viewpoint_landscape:'Aussichtspunkt / Landschaft', historic_city:'Historische Stadt', museum:'Museum', religious_site:'Religiöser Ort', technical_heritage:'Technisches Kulturerbe', personality:'Persönlichkeit', architecture:'Architektur', archaeological_site:'Archäologische Stätte', park_garden:'Park / Garten', visitor_attraction:'Besucherattraktion', local_culture:'Lokale Kultur', science_site:'Wissenschaftlicher Ort', sports_venue:'Sportstätte' },
  cs: { castle:'Hrad / zámek', cultural_site:'Kulturní místo', historical_monument:'Historická památka', nature:'Příroda', viewpoint_landscape:'Vyhlídka / krajina', historic_city:'Historické město', museum:'Muzeum', religious_site:'Sakrální místo', technical_heritage:'Technické dědictví', personality:'Osobnost', architecture:'Architektura', archaeological_site:'Archeologické naleziště', park_garden:'Park / zahrada', visitor_attraction:'Turistická atrakce', local_culture:'Místní kultura', science_site:'Vědecké místo', sports_venue:'Sportoviště' },
  es: { castle:'Castillo', cultural_site:'Espacio cultural', historical_monument:'Monumento histórico', nature:'Naturaleza', viewpoint_landscape:'Mirador / paisaje', historic_city:'Ciudad histórica', museum:'Museo', religious_site:'Lugar religioso', technical_heritage:'Patrimonio técnico', personality:'Personalidad', architecture:'Arquitectura', archaeological_site:'Yacimiento arqueológico', park_garden:'Parque / jardín', visitor_attraction:'Atracción turística', local_culture:'Cultura local', science_site:'Lugar científico', sports_venue:'Instalación deportiva' },
  fr: { castle:'Château', cultural_site:'Lieu culturel', historical_monument:'Monument historique', nature:'Nature', viewpoint_landscape:'Belvédère / paysage', historic_city:'Ville historique', museum:'Musée', religious_site:'Site religieux', technical_heritage:'Patrimoine technique', personality:'Personnalité', architecture:'Architecture', archaeological_site:'Site archéologique', park_garden:'Parc / jardin', visitor_attraction:'Attraction touristique', local_culture:'Culture locale', science_site:'Site scientifique', sports_venue:'Équipement sportif' },
  it: { castle:'Castello', cultural_site:'Luogo culturale', historical_monument:'Monumento storico', nature:'Natura', viewpoint_landscape:'Belvedere / paesaggio', historic_city:'Città storica', museum:'Museo', religious_site:'Luogo religioso', technical_heritage:'Patrimonio tecnico', personality:'Personalità', architecture:'Architettura', archaeological_site:'Sito archeologico', park_garden:'Parco / giardino', visitor_attraction:'Attrazione turistica', local_culture:'Cultura locale', science_site:'Luogo scientifico', sports_venue:'Impianto sportivo' },
  nl: { castle:'Kasteel', religious_site:'Religieuze locatie', historical_monument:'Historisch monument', architecture:'Architectuur', historic_city:'Historische stad', museum:'Museum', archaeological_site:'Archeologische vindplaats', nature:'Natuur', viewpoint_landscape:'Uitzichtpunt / landschap', park_garden:'Park / tuin', technical_heritage:'Technisch erfgoed', cultural_site:'Culturele locatie', visitor_attraction:'Bezienswaardigheid', local_culture:'Lokale cultuur', science_site:'Wetenschappelijke locatie', personality:'Persoonlijkheid', sports_venue:'Sportlocatie' },
}

const editorialCategoryCopy = {
  en: { nature_and_landscape:'Nature and landscape', heritage_and_monuments:'Heritage and monuments', architecture_and_urbanism:'Architecture and urbanism', history:'History', culture_and_industry:'Culture and industry', people:'People', geography_and_context:'Geography and context', tourism_and_surroundings:'Tourism and surroundings', hidden_gem:'Hidden gem', local_story:'Local story', other_verified_significance:'Other verified significance', sports_venue:'Sports venue', architecture:'Architecture', industrial_heritage:'Industrial heritage', transport:'Transport', park:'Park' },
  de: { nature_and_landscape:'Natur und Landschaft', heritage_and_monuments:'Kulturerbe und Denkmäler', architecture_and_urbanism:'Architektur und Städtebau', history:'Geschichte', culture_and_industry:'Kultur und Industrie', people:'Persönlichkeiten', geography_and_context:'Geografie und Kontext', tourism_and_surroundings:'Tourismus und Umgebung', hidden_gem:'Geheimtipp', local_story:'Lokale Geschichte', other_verified_significance:'Sonstige belegte Bedeutung', sports_venue:'Sportstätte', architecture:'Architektur', industrial_heritage:'Industriekultur', transport:'Verkehr', park:'Park' },
  cs: { nature_and_landscape:'Příroda a krajina', heritage_and_monuments:'Dědictví a památky', architecture_and_urbanism:'Architektura a urbanismus', history:'Historie', culture_and_industry:'Kultura a průmysl', people:'Osobnosti', geography_and_context:'Geografie a souvislosti', tourism_and_surroundings:'Turismus a okolí', hidden_gem:'Skrytý poklad', local_story:'Místní příběh', other_verified_significance:'Jiný doložený význam', sports_venue:'Sportoviště', architecture:'Architektura', industrial_heritage:'Průmyslové dědictví', transport:'Doprava', park:'Park' },
  es: { nature_and_landscape:'Naturaleza y paisaje', heritage_and_monuments:'Patrimonio y monumentos', architecture_and_urbanism:'Arquitectura y urbanismo', history:'Historia', culture_and_industry:'Cultura e industria', people:'Personas', geography_and_context:'Geografía y contexto', tourism_and_surroundings:'Turismo y alrededores', hidden_gem:'Rincón escondido', local_story:'Historia local', other_verified_significance:'Otra relevancia verificada', sports_venue:'Instalación deportiva', architecture:'Arquitectura', industrial_heritage:'Patrimonio industrial', transport:'Transporte', park:'Parque' },
  fr: { nature_and_landscape:'Nature et paysage', heritage_and_monuments:'Patrimoine et monuments', architecture_and_urbanism:'Architecture et urbanisme', history:'Histoire', culture_and_industry:'Culture et industrie', people:'Personnalités', geography_and_context:'Géographie et contexte', tourism_and_surroundings:'Tourisme et environs', hidden_gem:'Lieu insolite', local_story:'Histoire locale', other_verified_significance:'Autre importance vérifiée', sports_venue:'Installation sportive', architecture:'Architecture', industrial_heritage:'Patrimoine industriel', transport:'Transports', park:'Parc' },
  it: { nature_and_landscape:'Natura e paesaggio', heritage_and_monuments:'Patrimonio e monumenti', architecture_and_urbanism:'Architettura e urbanistica', history:'Storia', culture_and_industry:'Cultura e industria', people:'Persone', geography_and_context:'Geografia e contesto', tourism_and_surroundings:'Turismo e dintorni', hidden_gem:'Gioiello nascosto', local_story:'Storia locale', other_verified_significance:'Altra rilevanza verificata', sports_venue:'Impianto sportivo', architecture:'Architettura', industrial_heritage:'Patrimonio industriale', transport:'Trasporti', park:'Parco' },
  nl: { nature_and_landscape:'Natuur en landschap', heritage_and_monuments:'Erfgoed en monumenten', architecture_and_urbanism:'Architectuur en stedenbouw', history:'Geschiedenis', culture_and_industry:'Cultuur en industrie', people:'Personen', geography_and_context:'Geografie en context', tourism_and_surroundings:'Toerisme en omgeving', hidden_gem:'Verborgen parel', local_story:'Lokaal verhaal', other_verified_significance:'Andere aantoonbare betekenis', sports_venue:'Sportaccommodatie', architecture:'Architectuur', industrial_heritage:'Industrieel erfgoed', transport:'Vervoer', park:'Park' },
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

function MapFocus({ place, selectedFact, randomFocusPoint, mapStart, activeMode, areaPlaces, areaBounds, areaMapPoints }) {
  const map = useMap()
  useEffect(() => {
    // Only an explicit Random Explorer request may move the map to a selected fact.
    // Selecting a fact by clicking its map pin must never change the current map view.
    if (Array.isArray(randomFocusPoint) && randomFocusPoint.length === 2
      && Number.isFinite(Number(randomFocusPoint[0])) && Number.isFinite(Number(randomFocusPoint[1]))) {
      map.flyTo([Number(randomFocusPoint[0]), Number(randomFocusPoint[1])], 14, { duration: 0.9 })
      return
    }
    if (selectedFact) return
    // An explicit area-picker selection takes priority over postal-code marker bounds.
    if (activeMode === 'area' && Array.isArray(areaBounds) && areaBounds.length === 2) {
      map.flyToBounds(areaBounds, { padding: [36, 36], maxZoom: 11, duration: 1.0 })
      return
    }
    if (place && Number.isFinite(Number(place.latitude)) && Number.isFinite(Number(place.longitude))) {
      map.flyTo([Number(place.latitude), Number(place.longitude)], 12, { duration: 0.8 })
    } else if (activeMode === 'area' && Array.isArray(areaMapPoints)) {
      if (areaMapPoints.length === 1) {
        map.flyTo(areaMapPoints[0], 14, { duration: 0.8 })
      } else if (areaMapPoints.length > 1) {
        map.flyToBounds(areaMapPoints, { padding: [48, 48], maxZoom: 13, duration: 0.9 })
      } else if (Array.isArray(mapStart) && mapStart.length === 2) {
        map.flyTo([Number(mapStart[0]), Number(mapStart[1])], 6, { duration: 0.8 })
      }
    } else if (activeMode && Array.isArray(mapStart) && mapStart.length === 2
      && Number.isFinite(Number(mapStart[0])) && Number.isFinite(Number(mapStart[1]))) {
      map.flyTo([Number(mapStart[0]), Number(mapStart[1])], 13, { duration: 0.8 })
    } else {
      map.setView([51.1657, 10.4515], 6, { animate: true })
    }
  }, [place, selectedFact, randomFocusPoint, mapStart, activeMode, areaPlaces, areaBounds, areaMapPoints, map])
  return null
}

function getState(place) {
  return place.region || place.content?.state || ''
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
  const [mapSourceTimings, setMapSourceTimings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [lang, setLang] = useState(getInitialLanguage)
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const [selected, setSelected] = useState(null)
  const [selectedFact, setSelectedFact] = useState(null)
  const [randomFocusPoint, setRandomFocusPoint] = useState(null)
  const [country, setCountry] = useState('DE')
  const [areaPickerOpen, setAreaPickerOpen] = useState(false)
  const [areaCatalog, setAreaCatalog] = useState([])
  const [areaCatalogLoading, setAreaCatalogLoading] = useState(false)
  const [areaCatalogError, setAreaCatalogError] = useState('')
  const [areaCountry, setAreaCountry] = useState('')
  const [areaState, setAreaState] = useState('')
  const [areaCounty, setAreaCounty] = useState('')
  const [areaBounds, setAreaBounds] = useState(null)
  const [areaMapPoints, setAreaMapPoints] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [placesOpen, setPlacesOpen] = useState(false)
  const [factSheetExpanded, setFactSheetExpanded] = useState(false)
  const [factSheetOpen, setFactSheetOpen] = useState(false)
  const factSheetDragStart = useRef(null)
  const selectionRequestRef = useRef(0)
  useEffect(() => {
    try { window.localStorage.setItem('europe-explorer-language', lang) } catch {}
  }, [lang])

  const t = copy[lang] || copy.en
  const u = uiCopy[lang] || uiCopy.en

  // The picker is driven exclusively by records that are already eligible for Explorer.
  // New countries, regions and counties appear automatically when the completed view changes.
  useEffect(() => {
    let alive = true
    async function loadAreaCatalog() {
      setAreaCatalogLoading(true)
      setAreaCatalogError('')
      try {
        let records = []
        const [czechPlaces, italyPlaces, slovakiaPlaces] = await Promise.all([
          getCzechPublishedPlaces(), getItalyPublishedPlaces(), getSlovakiaPublishedPlaces(),
        ])
        for (const [code, list] of [['CZ',czechPlaces],['IT',italyPlaces],['SK',slovakiaPlaces]]) {
          records = records.concat(list.map(row => ({country_code:code,region:row.region||'',county:row.county||''})))
        }
        if (!alive) return
        setAreaCatalog(records)
        const availableCountries = [...new Set(records.map(row => row.country_code).filter(Boolean))].sort()
        setAreaCountry(current => availableCountries.includes(current) ? current : (availableCountries[0] || ''))
      } catch (error) {
        console.error('Could not load available Explorer areas:', error)
        if (alive) setAreaCatalogError(error.message || 'Could not load available areas.')
      } finally {
        if (alive) setAreaCatalogLoading(false)
      }
    }
    loadAreaCatalog()
    return () => { alive = false }
  }, [])

  const areaCountries = useMemo(
    () => [...new Set(areaCatalog.map(row => row.country_code).filter(Boolean))].sort(),
    [areaCatalog]
  )
  const areaStates = useMemo(
    () => [...new Set(areaCatalog.filter(row => row.country_code === areaCountry).map(row => row.region).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [areaCatalog, areaCountry]
  )
  const areaCounties = useMemo(
    () => [...new Set(areaCatalog.filter(row => row.country_code === areaCountry && (!areaState || row.region === areaState)).map(row => row.county).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [areaCatalog, areaCountry, areaState]
  )
  const openAreaPicker = () => {
    setAreaCountry(country)
    setAreaState('')
    setAreaCounty('')
    setAreaPickerOpen(true)
    setIntroMessage('')
  }
  const confirmAreaPicker = () => {
    if (!areaCountry) return
    selectionRequestRef.current += 1
    selectionRequestRef.current += 1

    // Use only the postal areas already present in the published Explorer data.
    // The map will fit the representative points after the selected country's
    // published records have loaded; no external geocoder or future areas.
    setAreaBounds(null)
    setCountry(areaCountry)
    setSelectedState(areaState)
    setSelectedCounty(areaCounty)
    setQuery('')
    setSelected(null)
    setSelectedFact(null)
    setRandomFocusPoint(null)
    setFactSheetOpen(false)
    setMapStart([51.1657, 10.4515])
    setActiveMode('area')
    setAreaPickerOpen(false)
    setIntroMessage('')
  }

  const handlePlaceSelect = useCallback(async (place) => {
    const requestId = ++selectionRequestRef.current
    try {
      const content = await getPublishedRecord(place.country_code, place.postal_code)
      if (requestId !== selectionRequestRef.current) return
      setSelected({ ...place, content })
      setRandomFocusPoint(null)
      setSelectedFact(null)
      setFactSheetOpen(false)
    } catch (error) {
      if (requestId === selectionRequestRef.current) console.error('Could not load postal-area details:', error)
    }
  }, [])

  const handleFactSelect = useCallback(async (place, fact) => {
    const requestId = ++selectionRequestRef.current
    try {
      const content = await getPublishedRecord(place.country_code, place.postal_code)
      if (requestId !== selectionRequestRef.current) return
      const canonicalFact = (content.facts || []).find(item => String(item.id) === String(fact.id))
      if (!canonicalFact) throw new Error('Selected fact is not present in the published record.')
      setSelected({ ...place, content })
      setRandomFocusPoint(null)
      setSelectedFact(canonicalFact)
      setFactSheetExpanded(false)
      setFactSheetOpen(true)
    } catch (error) {
      if (requestId === selectionRequestRef.current) console.error('Could not load selected fact details:', error)
    }
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
        if (country === 'CZ') {
          all = await getCzechPublishedPlaces()
          pageCount = 1
          if (!alive) return
          setPlaces(all)
          setLoadDiagnostics({
            country, fetched: all.length, accepted: all.length, rejected: [],
            pageCount, pageSize: all.length, factsTotal: 0, locatedFacts: 0,
            diagnosticsError: '',
          })
          try {
            const diagnostics = await getCzechDiagnostics()
            if (alive) setLoadDiagnostics(diagnostics)
          } catch (diagnosticError) {
            console.error('Could not load Czech postal-code diagnostics:', diagnosticError)
            if (alive) setLoadDiagnostics(current => current?.country === 'CZ'
              ? { ...current, diagnosticsError: diagnosticError.message || 'Diagnostiku českých PSČ se nepodařilo načíst.' }
              : current)
          }
          return
        }
        if (country === 'IT') {
          all = await getItalyPublishedPlaces()
          pageCount = 1
          if (!alive) return
          setPlaces(all)
          setLoadDiagnostics(null)
          return
        }
        if (country === 'SK') {
          all = await getSlovakiaPublishedPlaces()
          pageCount = 1
          if (!alive) return
          setPlaces(all)
          setLoadDiagnostics(null)
          return
        }
        if (country === 'DE') {
          // Germany is intentionally hidden until audited V5 records are published to Neon.
          all = []
          pageCount = 0
        } else {
          // Czechia's published areas are listed from postal_codes directly;
          // the completed V3 view currently contains Germany only.
          all = []
        }
        if (!alive) return
        setPlaces(all)
        if (country !== 'DE') {
          setLoadDiagnostics(null)
          return
        }
        setLoadDiagnostics({
          country, fetched: 0, accepted: 0, rejected: [], pageCount: 0,
          pageSize, diagnosticsError: 'Germany is not yet published in Neon.',
        })
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
    selectionRequestRef.current += 1
    setIntroMessage('')
    if (!navigator.geolocation) { setIntroMessage(lang === 'cs' ? 'Toto zařízení nepodporuje polohu.' : lang === 'de' ? 'Dieses Gerät unterstützt keine Standortbestimmung.' : lang === 'nl' ? 'Dit apparaat ondersteunt geen locatiebepaling.' : 'Location is not available on this device.'); return }
    setIntroMessage(lang === 'cs' ? 'Čekám na povolení polohy…' : lang === 'de' ? 'Warte auf die Standortfreigabe…' : lang === 'nl' ? 'Wachten op toestemming voor je locatie…' : 'Waiting for location permission…')
    navigator.geolocation.getCurrentPosition(position => {
      if (requestId !== selectionRequestRef.current) return
      setMapStart([position.coords.latitude, position.coords.longitude])
      setSelected(null); setSelectedFact(null); setActiveMode('location')
      setIntroMessage('')
    }, () => { if (requestId === selectionRequestRef.current) setIntroMessage(lang === 'cs' ? 'Polohu se nepodařilo získat. Zkontroluj oprávnění GPS.' : lang === 'de' ? 'Dein Standort konnte nicht ermittelt werden. Überprüfe die Standortberechtigung.' : lang === 'nl' ? 'Je locatie kon niet worden bepaald. Controleer de locatietoestemming.' : 'Could not get your location. Check GPS permissions.') }, { enableHighAccuracy: true, timeout: 12000 })
  }

  const searchIntroPlace = async (event) => {
    event.preventDefault()
    const requestId = ++selectionRequestRef.current
    const term = introSearch.trim()
    if (!term) return
    setIntroMessage(lang === 'cs' ? 'Vyhledávám místo…' : lang === 'de' ? 'Ort wird gesucht…' : lang === 'nl' ? 'Plaats zoeken…' : 'Searching for place…')

    const requestJson = async (url) => {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 9000)
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) throw new Error(`Geocoding service returned ${response.status}`)
        return await response.json()
      } finally {
        window.clearTimeout(timeout)
      }
    }

    try {
      let coordinates = null
      let lastError = null

      // Primary geocoder: Photon / OpenStreetMap.
      try {
        const result = await requestJson(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(term)}&limit=5&lang=${lang}`
        )
        const feature = result.features?.find(item => {
          const coords = item.geometry?.coordinates
          return Array.isArray(coords) && coords.length >= 2
            && Number.isFinite(Number(coords[0])) && Number.isFinite(Number(coords[1]))
            && Number(coords[1]) >= -90 && Number(coords[1]) <= 90
            && Number(coords[0]) >= -180 && Number(coords[0]) <= 180
        })
        if (feature) coordinates = feature.geometry.coordinates
      } catch (error) {
        lastError = error
        console.warn('Photon geocoding failed; trying fallback:', error)
      }

      // Fallback geocoder: Nominatim / OpenStreetMap.
      if (!coordinates) {
        try {
          const results = await requestJson(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&addressdetails=1&accept-language=${encodeURIComponent(lang)}&q=${encodeURIComponent(term)}`
          )
          const result = results?.find(item =>
            Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon))
            && Number(item.lat) >= -90 && Number(item.lat) <= 90
            && Number(item.lon) >= -180 && Number(item.lon) <= 180
          )
          if (result) coordinates = [Number(result.lon), Number(result.lat)]
        } catch (error) {
          lastError = error
          console.error('Fallback geocoding failed:', error)
        }
      }

      if (requestId !== selectionRequestRef.current) return
      if (!coordinates) {
        setIntroMessage(lastError
          ? (lang === 'cs' ? 'Vyhledávací služby jsou právě nedostupné. Zkus to prosím za chvíli.' : lang === 'de' ? 'Die Suchdienste sind vorübergehend nicht verfügbar. Bitte versuche es gleich noch einmal.' : lang === 'nl' ? 'De zoekdiensten zijn tijdelijk niet beschikbaar. Probeer het zo meteen opnieuw.' : 'Search services are temporarily unavailable. Please try again shortly.')
          : (lang === 'cs' ? 'Místo se nepodařilo najít. Zkus upřesnit název nebo přidat zemi.' : lang === 'de' ? 'Ort nicht gefunden. Versuche es mit einem genaueren Namen oder füge das Land hinzu.' : lang === 'nl' ? 'Plaats niet gevonden. Probeer een specifiekere naam of voeg het land toe.' : 'Place not found. Try a more specific name or add the country.'))
        return
      }

      const [lon, lat] = coordinates.map(Number)
      setMapStart([lat, lon])
      setSelected(null)
      setSelectedFact(null)
      setActiveMode('search')
      setIntroMessage('')
    } catch (error) {
      if (requestId !== selectionRequestRef.current) return
      console.error('Place search failed:', error)
      setIntroMessage(lang === 'cs' ? 'Vyhledávání se nezdařilo. Zkus to prosím znovu.' : lang === 'de' ? 'Die Suche ist fehlgeschlagen. Bitte versuche es erneut.' : lang === 'nl' ? 'Zoeken is mislukt. Probeer het opnieuw.' : 'Search failed. Please try again.')
    }
  }

  const startExplorer = async () => {
    const requestId = ++selectionRequestRef.current
    const requestId = ++selectionRequestRef.current
    setIntroMessage(lang === 'cs' ? 'Hledám náhodný objev…' : lang === 'de' ? 'Zufällige Entdeckung wird gesucht…' : lang === 'nl' ? 'Een willekeurige ontdekking zoeken…' : 'Finding a random discovery…')
    try {
      // The API draws from the complete published V5 fact pool in Neon,
      // independently of the currently selected country or map filters.
      const discovery = await apiGet('/api/discover')
      if (requestId !== selectionRequestRef.current) return
      if (requestId !== selectionRequestRef.current) return
      setSelected(discovery.place)
      setSelectedFact(discovery.fact)
      setRandomFocusPoint(discovery.focus)
      setActiveMode('place')
      setFactSheetExpanded(false)
      setFactSheetOpen(true)
      setIntroMessage('')
    } catch (error) {
      if (requestId !== selectionRequestRef.current) return
      console.error('Random discovery failed:', error)
      setIntroMessage(lang === 'cs' ? 'Náhodný objev se nepodařilo načíst.' : 'Could not load a random discovery.')
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

  // Area navigation uses the country-specific published map coordinates.
  useEffect(() => {
    let alive = true
    async function loadAreaMapPoints() {
      if (activeMode !== 'area') {
        setAreaMapPoints([])
        return
      }
      if (country === 'SK' || country === 'IT' || country === 'CZ') {
        setAreaMapPoints(filtered.map(place => [Number(place.latitude), Number(place.longitude)])
          .filter(([lat, lon]) => Number.isFinite(lat) && Number.isFinite(lon)))
        return
      }
      // Germany's published map points will be enabled after its Neon migration.
      if (country === 'DE') {
        setAreaMapPoints([])
        return
      }
      setAreaMapPoints([])
    }
    loadAreaMapPoints()
    return () => { alive = false }
  }, [activeMode, filtered, country])

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
        <div className="language-switch">{LANGS.map(l => <button key={l.id} className={lang === l.id ? "active" : ""} onClick={() => setLang(l.id)}>{l.label}</button>)}</div><button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? u.closeMenu : u.openMenu} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}<span>{({cs:"MENU",de:"MENÜ",en:"MENU",es:"MENÚ",fr:"MENU",it:"MENU",nl:"MENU"})[lang] || "MENU"}</span></button>
      </div>
    </header>
    {menuOpen && <div className="explorer-menu">
      <div className="explorer-menu-languages">{LANGS.map(l => <button key={l.id} className={lang === l.id ? 'active' : ''} onClick={() => setLang(l.id)}>{l.label}</button>)}</div>
      <div className="explorer-menu-actions">
        <button className="welcome-option" onClick={() => { setMenuOpen(false); startWithLocation() }}><span className="welcome-icon"><MapPin size={20}/></span><span><strong>{lang === 'cs' ? 'Moje aktuální poloha' : lang === 'de' ? 'Mein aktueller Standort' : lang === 'nl' ? 'Mijn huidige locatie' : 'My current location'}</strong><small>{lang === 'cs' ? 'Objevuj zajímavosti v okolí' : lang === 'de' ? 'Entdecke Sehenswürdigkeiten in deiner Nähe' : lang === 'nl' ? 'Ontdek bijzondere plekken in de buurt' : 'Discover highlights nearby'}</small></span><ArrowUpRight size={17}/></button>
        <form className="welcome-option welcome-search" onSubmit={event => { setMenuOpen(false); searchIntroPlace(event) }}><span className="welcome-icon"><Search size={20}/></span><span className="welcome-search-fields"><strong>{lang === 'cs' ? 'Vyhledat místo' : lang === 'de' ? 'Ort suchen' : lang === 'nl' ? 'Zoek een plaats' : 'Search for a place'}</strong><input value={introSearch} onChange={event => setIntroSearch(event.target.value)} placeholder={lang === 'cs' ? 'Město, obec nebo PSČ…' : lang === 'de' ? 'Stadt, Ort oder Postleitzahl…' : lang === 'nl' ? 'Stad, dorp of postcode…' : 'City, town or postal code…'} /></span><button type="submit" aria-label={lang === 'de' ? 'Suchen' : lang === 'nl' ? 'Zoeken' : 'Search'}><ArrowUpRight size={17}/></button></form>
        <button className="welcome-option" onClick={() => { setMenuOpen(false); openAreaPicker() }}><span className="welcome-icon"><Globe2 size={20}/></span><span><strong>{lang === 'cs' ? 'Vybrat oblast' : lang === 'de' ? 'Gebiet auswählen' : lang === 'nl' ? 'Kies een gebied' : 'Choose an area'}</strong><small>{lang === 'cs' ? 'Země, region a okres' : lang === 'de' ? 'Land, Region und Landkreis' : lang === 'nl' ? 'Land, regio en district' : 'Country, region and district'}</small></span><ArrowUpRight size={17}/></button>
        <button className="welcome-option welcome-real" onClick={() => { setMenuOpen(false); startExplorer() }}><span className="welcome-icon"><Compass size={21}/></span><span><strong>Real Explorer</strong><small>{lang === 'cs' ? 'Nech se překvapit náhodným objevem' : lang === 'de' ? 'Lass dich von einer zufälligen Entdeckung überraschen' : lang === 'nl' ? 'Laat je verrassen door een willekeurige ontdekking' : 'Let a random discovery surprise you'}</small></span><ArrowUpRight size={17}/></button>
      </div>
    </div>}

    {!activeMode ? <section className="welcome-screen">
      <div className="welcome-orbit" aria-hidden="true"><div className="welcome-globe"><span /><i /><b /></div><small>EUROPE / DISCOVER</small></div>
      <div className="welcome-copy"><div className="eyebrow"><span />{lang === 'cs' ? 'EVROPA PLNÁ OBJEVŮ' : (copy[lang] || copy.en).eyebrow.toUpperCase()}</div>
        <h1>{lang === 'cs' ? 'Kam se dnes podíváme?' : lang === 'de' ? 'Wohin geht deine Entdeckungsreise heute?' : lang === 'nl' ? 'Waar ga je vandaag op ontdekking?' : 'Where will you explore today?'}</h1>
        <p>{lang === 'cs' ? 'Objevuj zajímavá místa, příběhy a skrytá zákoutí Evropy.' : lang === 'de' ? 'Entdecke besondere Orte, lokale Geschichten und verborgene Winkel Europas.' : lang === 'nl' ? 'Ontdek bijzondere plekken, lokale verhalen en verborgen hoekjes van Europa.' : 'Discover remarkable places, local stories and hidden corners of Europe.'}</p>
      </div>
      <div className="welcome-options">
        <button className="welcome-option" onClick={startWithLocation}><span className="welcome-icon"><MapPin size={21}/></span><span><strong>{lang === 'cs' ? 'Moje aktuální poloha' : lang === 'de' ? 'Mein aktueller Standort' : lang === 'nl' ? 'Mijn huidige locatie' : 'My current location'}</strong><small>{lang === 'cs' ? 'Objevuj zajímavosti v okolí' : lang === 'de' ? 'Entdecke Sehenswürdigkeiten in deiner Nähe' : lang === 'nl' ? 'Ontdek bijzondere plekken in de buurt' : 'Discover highlights nearby'}</small></span><ArrowUpRight size={18}/></button>
        <form className="welcome-option welcome-search" onSubmit={searchIntroPlace}><span className="welcome-icon"><Search size={21}/></span><span className="welcome-search-fields"><strong>{lang === 'cs' ? 'Vyhledat místo' : lang === 'de' ? 'Ort suchen' : lang === 'nl' ? 'Zoek een plaats' : 'Search for a place'}</strong><input value={introSearch} onChange={e => setIntroSearch(e.target.value)} placeholder={lang === 'cs' ? 'Město, obec nebo PSČ…' : lang === 'de' ? 'Stadt, Ort oder Postleitzahl…' : lang === 'nl' ? 'Stad, dorp of postcode…' : 'City, town or postal code…'} /></span><button type="submit" aria-label={lang === 'de' ? 'Suchen' : lang === 'nl' ? 'Zoeken' : 'Search'}><ArrowUpRight size={18}/></button></form>
        <button className="welcome-option" onClick={openAreaPicker}><span className="welcome-icon"><Globe2 size={21}/></span><span><strong>{lang === 'cs' ? 'Vybrat oblast' : lang === 'de' ? 'Gebiet auswählen' : lang === 'nl' ? 'Kies een gebied' : 'Choose an area'}</strong><small>{lang === 'cs' ? 'Země, region a okres' : lang === 'de' ? 'Land, Region und Landkreis' : lang === 'nl' ? 'Land, regio en district' : 'Country, region and district'}</small></span><ArrowUpRight size={18}/></button>
        <button className="welcome-option welcome-real" onClick={startExplorer}><span className="welcome-icon"><Compass size={22}/></span><span><strong>Real Explorer</strong><small>{lang === 'cs' ? 'Nech se překvapit náhodným objevem' : lang === 'de' ? 'Lass dich von einer zufälligen Entdeckung überraschen' : lang === 'nl' ? 'Laat je verrassen door een willekeurige ontdekking' : 'Let a random discovery surprise you'}</small></span><ArrowUpRight size={18}/></button>
      </div>
      {introMessage && <p className="welcome-message" role="status">{introMessage}</p>}
      <div className="welcome-foot"><span><i/> {lang === 'cs' ? 'EVROPA ČEKÁ NA OBJEVENÍ' : lang === 'de' ? 'EUROPA WARTET DARAUF, ENTDECKT ZU WERDEN' : lang === 'nl' ? 'EUROPA WACHT OM ONTDEKT TE WORDEN' : 'EUROPE IS WAITING TO BE DISCOVERED'}</span><span>01 — 04</span></div>
    </section> : <>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span />{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="globe"><div className="globe-grid" /><span className="globe-pin pin-a" /><span className="globe-pin pin-b" /><span className="globe-pin pin-c" /></div><span className="art-label label-a">51° 10′ N</span><span className="art-label label-b">EUROPE / 01</span></div>
    </section>
    <section className="workspace">
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
          <div className="panel-foot"><span className="status-dot" /> {(country === 'SK' || country === 'IT' || country === 'CZ') ? 'LIVE DATA · NEON' : u.live}</div>
        </aside>

        <div className="map-panel">
          <div className="map-topline"><span><span className="status-dot" /> {country === 'DE' ? u.germany : country === 'SK' ? u.slovakia : country === 'IT' ? (lang === 'de' ? 'ITALIEN' : lang === 'cs' ? 'ITÁLIE' : lang === 'nl' ? 'ITALIË' : lang === 'fr' ? 'ITALIE' : lang === 'es' ? 'ITALIA' : lang === 'it' ? 'ITALIA' : 'ITALY') : u.czechia} / {u.map}</span><span>{u.pins} · {filtered.length.toLocaleString()} {u.areas}</span></div>
          <MapContainer center={center} zoom={6} scrollWheelZoom className="map">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapFocus place={selected} selectedFact={selectedFact} randomFocusPoint={randomFocusPoint} mapStart={mapStart} activeMode={activeMode} areaPlaces={activeMode === 'area' ? filtered : null} areaBounds={areaBounds} areaMapPoints={areaMapPoints} />
            <ViewportFactLayer country={country} onSelectFact={handleFactSelect} onSourceTiming={entry => setMapSourceTimings(current => [entry, ...current.filter(item => !(item.source === entry.source && item.viewport === entry.viewport))].slice(0, 12))} />
          </MapContainer>
          <div className="map-legend"><span className="legend-dot" /> {u.factLocation} <span className="legend-line" /> {u.clusterHint}</div>
    {factSheetOpen && selectedFact && activeFact && <section className={`fact-screen-sheet ${factSheetExpanded ? 'is-expanded' : ''}`} role="dialog" aria-label={activeFact.title || activeFact.name || u.pinDiscovery}>
      <div className="fact-screen-sheet-heading">
        <div className="fact-screen-sheet-title">{activeFact.title || activeFact.name || u.discover}</div>
        <button className="fact-screen-sheet-close" onClick={() => { setFactSheetOpen(false); setFactSheetExpanded(false) }} aria-label={u.closeDetails}><X size={18} /></button>
        <div className="fact-screen-sheet-subtitle">{[selected?.postal_code, activeFact.location?.name, selected?.city].filter(Boolean).join(' · ')}</div>
      </div>
      <div className="fact-screen-sheet-body">{activeFact.text || activeFact.description || ''}</div>
      <div className="fact-screen-sheet-category">{(mapCategoryCopy[lang]?.[activeFact.map_category] || editorialCategoryCopy[lang]?.[activeFact.category] || activeFact.category || 'Discovery').toUpperCase()}</div>
      <button className="fact-screen-sheet-handle" onPointerDown={event => { factSheetDragStart.current = event.clientY; event.currentTarget.setPointerCapture?.(event.pointerId) }} onPointerUp={event => { if (factSheetDragStart.current === null) return; const delta = event.clientY - factSheetDragStart.current; setFactSheetExpanded(Math.abs(delta) > 12 ? delta < 0 : !factSheetExpanded); factSheetDragStart.current = null }} onPointerCancel={() => { factSheetDragStart.current = null }} onClick={() => {}} aria-label={factSheetExpanded ? (lang === 'de' ? 'Fakt einklappen' : lang === 'nl' ? 'Feit inklappen' : 'Collapse fact') : (lang === 'de' ? 'Fakt ausklappen' : lang === 'nl' ? 'Feit uitklappen' : 'Expand fact')}>
        <span className="fact-screen-sheet-grip" /><span>{factSheetExpanded ? (lang === 'cs' ? 'TAŽENÍM DOLŮ SBALÍŠ' : lang === 'de' ? 'NACH UNTEN ZIEHEN ZUM EINKLAPPEN' : lang === 'nl' ? 'VEEG OMLAAG OM TE SLUITEN' : 'DRAG DOWN TO COLLAPSE') : (lang === 'cs' ? 'TAŽENÍM NAHORU ZOBRAZÍŠ VÍCE' : lang === 'de' ? 'NACH OBEN ZIEHEN FÜR MEHR INHALTE' : lang === 'nl' ? 'VEEG OMHOOG OM MEER TE LEZEN' : 'DRAG UP TO READ MORE')}</span>
      </button>
    </section>}
        </div>

        <aside className={`detail-panel ${selected ? "has-selection" : ""}`}>
          {selected ? <>
            <div className="detail-image"><div className="detail-image-grid" /><span className="image-tag">{selectedFact ? u.pinDiscovery : u.localDiscovery}</span><span className="image-coords">{(selectedFact?.location || selectedPoint)?.lat?.toFixed(3)}, {(selectedFact?.location || selectedPoint)?.lon?.toFixed(3)}</span></div>
            <div className="detail-content"><div className="detail-kicker">{selectedFact ? u.pinDiscovery : u.postalArea} / {selected.postal_code}</div><h3>{selected.city || selected.postal_code}</h3><p className="detail-location">{[selected.municipality, selected.district, selected.region].filter(Boolean).join(', ')}</p><div className="detail-divider" /><div className="detail-subhead">{t.details}<span>{facts.length.toString().padStart(2, '0')}</span></div>
              {facts.length ? <div className="fact-list">{facts.map((f, i) => <article className="fact" key={f.id || i}><span className="fact-index">{String(i + 1).padStart(2, '0')}</span><div><h4>{f.title || f.name || u.discover}</h4><p>{f.text || f.description || ''}</p><span className="fact-category">{(mapCategoryCopy[lang]?.[f.map_category] || editorialCategoryCopy[lang]?.[f.category] || f.category || 'Discovery').toUpperCase()}</span></div></article>)}</div> : <p className="detail-location">{u.noHighlights}</p>}
            </div><button className="close-detail" onClick={() => { setSelected(null); setSelectedFact(null) }} aria-label={u.closeDetails}><X size={16} /></button>
          </> : <div className="empty-detail"><div className="empty-icon"><MapPin size={26} /></div><span>{u.next}</span><h3>{t.choose}</h3><p>{t.note}</p></div>}
        </aside>
      </div>
    </section>
    </>}
    {areaPickerOpen && <div className="area-picker-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setAreaPickerOpen(false) }}>
      <section className="area-picker" role="dialog" aria-modal="true" aria-labelledby="area-picker-title">
        <button className="area-picker-close" onClick={() => setAreaPickerOpen(false)} aria-label={lang === 'cs' ? 'Zavřít' : lang === 'de' ? 'Schließen' : lang === 'nl' ? 'Sluiten' : 'Close'}><X size={19}/></button>
        <div className="area-picker-kicker">{lang === 'cs' ? 'VÝBĚR OBLASTI' : lang === 'de' ? 'GEBIET AUSWÄHLEN' : lang === 'nl' ? 'GEBIED KIEZEN' : 'AREA SELECTION'}</div>
        <h2 id="area-picker-title">{lang === 'cs' ? 'Kam se chceš podívat?' : lang === 'de' ? 'Wohin möchtest du?' : lang === 'nl' ? 'Waar wil je op ontdekking?' : 'Where would you like to explore?'}</h2>
        <p>{lang === 'cs' ? 'Vyber zemi a potom můžeš výběr upřesnit podle regionu a okresu.' : lang === 'de' ? 'Wähle ein Land und grenze die Auswahl nach Region und Landkreis ein.' : lang === 'nl' ? 'Kies een land en verfijn je selectie daarna op regio en district.' : 'Choose a country, then narrow your selection by region and district.'}</p>
        {areaCatalogLoading ? <div className="area-picker-status"><LoaderCircle className="spin" size={18}/>{lang === 'cs' ? 'Načítám dostupné oblasti…' : lang === 'de' ? 'Verfügbare Gebiete werden geladen…' : lang === 'nl' ? 'Beschikbare gebieden laden…' : 'Loading available areas…'}</div> : areaCatalogError ? <div className="area-picker-error">{areaCatalogError}</div> : areaCountries.length === 0 ? <div className="area-picker-status">{lang === 'cs' ? 'Zatím nejsou dostupné žádné publikované oblasti.' : lang === 'de' ? 'Derzeit sind keine veröffentlichten Gebiete verfügbar.' : lang === 'nl' ? 'Er zijn nog geen gepubliceerde gebieden beschikbaar.' : 'No published areas are available yet.'}</div> : <>
          <label className="area-picker-field"><span>{lang === 'cs' ? 'ZEMĚ' : lang === 'de' ? 'LAND' : lang === 'nl' ? 'LAND' : 'COUNTRY'}</span><select value={areaCountry} onChange={event => { setAreaCountry(event.target.value); setAreaState(''); setAreaCounty('') }}>{areaCountries.map(code => <option key={code} value={code}>{code === 'DE' ? u.germany : code === 'CZ' ? u.czechia : code === 'SK' ? u.slovakia : code === 'IT' ? (lang === 'de' ? 'ITALIEN' : lang === 'cs' ? 'ITÁLIE' : lang === 'nl' ? 'ITALIË' : lang === 'fr' ? 'ITALIE' : lang === 'es' ? 'ITALIA' : lang === 'it' ? 'ITALIA' : 'ITALY') : code}</option>)}</select></label>
          <div className="area-picker-row">
            <label className="area-picker-field"><span>{areaCountry === 'DE' ? u.bundesland : u.region}</span><select value={areaState} onChange={event => { setAreaState(event.target.value); setAreaCounty('') }}><option value="">{areaCountry === 'DE' ? u.allStates : u.allRegions}</option>{areaStates.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
            <label className="area-picker-field"><span>{areaCountry === 'CZ' ? u.district : u.county}</span><select value={areaCounty} onChange={event => setAreaCounty(event.target.value)}><option value="">{u.allCounties}</option>{areaCounties.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
          </div>
          <div className="area-picker-footer"><span>{areaCatalog.filter(row => row.country_code === areaCountry && (!areaState || row.region === areaState) && (!areaCounty || row.county === areaCounty)).length.toLocaleString()} {lang === 'cs' ? 'dostupných oblastí' : lang === 'de' ? 'verfügbare Gebiete' : lang === 'nl' ? 'beschikbare gebieden' : 'available areas'}</span><button onClick={confirmAreaPicker}>{lang === 'cs' ? 'Zobrazit na mapě' : lang === 'de' ? 'Auf der Karte anzeigen' : lang === 'nl' ? 'Toon op de kaart' : 'Explore this area'} <ArrowUpRight size={16}/></button></div>
        </>}
      </section>
    </div>}
    {(country === 'DE' && loadDiagnostics?.country === 'DE' || country === 'CZ' && loadDiagnostics?.country === 'CZ') && <section style={{ margin: '8px auto 16px', padding: '0 12px', maxWidth: '1200px', color: '#78716c', fontSize: '11px' }}>
      <details>
        <summary style={{ cursor: 'pointer', display: 'inline-block', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 400, fontSize: '11px' }}>Diagnostika</summary>
        <div style={{ marginTop: '12px', padding: '16px', border: '1px solid #d6d3d1', borderRadius: '10px', background: '#fff', color: '#292524', fontSize: '13px' }}>
          <p style={{ margin: '0 0 6px' }}>{country === 'CZ' ? 'Publikovaná česká PSČ V5 zkontrolována' : 'Published DE records checked'}: <strong>{loadDiagnostics.fetched}</strong> · {country === 'CZ' ? 'PSČ s použitelnými body' : 'Complete in Explorer'}: <strong>{loadDiagnostics.accepted}</strong> · {country === 'CZ' ? 'PSČ s problémem' : 'Rejected'}: <strong>{loadDiagnostics.rejected.length}</strong></p>
          {country === 'CZ' ? <p style={{ margin: '0 0 12px' }}>Zajímavosti celkem: <strong>{loadDiagnostics.factsTotal ?? '—'}</strong> · S platnou GPS polohou: <strong>{loadDiagnostics.locatedFacts ?? '—'}</strong> · Bez platné GPS: <strong>{(loadDiagnostics.factsTotal ?? 0) - (loadDiagnostics.locatedFacts ?? 0)}</strong></p> : <p style={{ margin: '0 0 12px' }}>Complete-record pages: {loadDiagnostics.pageCount} · Page size: {loadDiagnostics.pageSize} · Diagnostics fetched in batches of 50</p>}
          {loadDiagnostics.diagnosticsError ? <p style={{ color: '#b91c1c' }}>Diagnostics unavailable: {loadDiagnostics.diagnosticsError}</p> : null}
          {loadDiagnostics.rejected.length === 0 ? <p>{loadDiagnostics.diagnosticsError ? (country === 'CZ' ? 'Data PSČ jsou načtená, ale podrobnou diagnostiku se nepodařilo načíst.' : 'Explorer data is available, but diagnostic records could not be loaded.') : (country === 'CZ' ? 'Všechna publikovaná česká PSČ V5 mají platnou polohu a alespoň jednu zajímavost s GPS.' : 'All published records pass the Explorer completeness checks.')}</p> : <ol style={{ margin: 0, paddingLeft: '22px' }}>{loadDiagnostics.rejected.map((record, index) => <li key={record.id || record.postal_code || index} style={{ marginBottom: '10px' }}>
            <strong>{record.postal_code || 'Unknown postal code'}</strong>{record.city ? ` · ${record.city}` : ''}
            <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>{record.reasons.map((reason, reasonIndex) => <li key={reasonIndex}>{reason}</li>)}</ul>{country === 'CZ' ? <p style={{ margin: '4px 0 0', color: '#57534e' }}>Fakta s GPS: {record.located_facts} / {record.facts_total}</p> : null}
          </li>)}</ol>}
        </div>
      </details>
    </section>}
    {activeMode && <section style={{ margin: '8px auto 16px', padding: '0 12px', maxWidth: '1200px', color: '#78716c', fontSize: '11px' }}>
      <details>
        <summary style={{ cursor: 'pointer', display: 'inline-block', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 400, fontSize: '11px' }}>Diagnostika načítání mapy</summary>
        <div style={{ marginTop: '12px', padding: '16px', border: '1px solid #d6d3d1', borderRadius: '10px', background: '#fff', color: '#292524', fontSize: '13px' }}>
          <p style={{ margin: '0 0 10px' }}>Časy jednotlivých zdrojů pro poslední načítání mapy. Při pohybu mapy se hodnoty aktualizují.</p>
          {mapSourceTimings.length === 0 ? <p>Zatím čekám na první výsledky načítání…</p> : <div style={{ display: 'grid', gap: '8px' }}>
            {mapSourceTimings.map((item, index) => <div key={item.source + item.viewport} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '8px 10px', background: '#f5f5f4', borderRadius: '6px' }}>
              <span><strong>{item.source}</strong><br/><small>{item.status === 'error' ? 'Chyba: ' + item.error : item.points + ' bodů'}</small></span>
              <strong style={{ color: item.status === 'error' ? '#b91c1c' : '#166534', fontVariantNumeric: 'tabular-nums' }}>{item.milliseconds} ms</strong>
            </div>)}
          </div>}
        </div>
      </details>
    </section>}
    <footer><span>EUROPE EXPLORER</span><span>{u.footer}</span><span>© 2026</span></footer>
  </main>
}