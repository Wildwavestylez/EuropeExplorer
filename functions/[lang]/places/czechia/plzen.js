const SITE = 'https://europe-explorer.org'
const SLUG = '/places/czechia/plzen'
const CENTER = { lat: '49.7475', lon: '13.3776', zoom: '16' }
const LANGS = {
  cs: {
    locale: 'cs_CZ',
    title: 'Plzeň – historické srdce západních Čech a město piva | Europe Explorer',
    description: 'Poznejte Plzeň, město založené roku 1295 na soutoku čtyř řek. Objevte katedrálu sv. Bartoloměje, Velkou synagogu i příběh plzeňského ležáku.',
    eyebrow: 'ZÁPADNÍ ČECHY · ČESKO',
    kicker: 'Město čtyř řek s příběhem, který zná celý svět',
    hook: 'Plzeň založil roku 1295 král Václav II. na soutoku čtyř řek. Její historické centrum spojuje gotickou katedrálu sv. Bartoloměje s nejvyšší kostelní věží v Česku, monumentální Velkou synagogou a příběhem ležáku Pilsner Urquell, který se tu zrodil v roce 1842.',
    support: 'Prozkoumejte známé památky, skryté kouty historického centra i místní příběhy, které na běžných turistických trasách snadno minete.',
    cta: 'Prozkoumat město', back: 'Zpět na Europe Explorer', tag: 'MAPA OBJEVŮ',
    tagline: 'Místa, příběhy a nečekané objevy'
  },
  de: {
    locale: 'de_DE',
    title: 'Pilsen – historische Altstadt und Heimat des Pilsner Biers | Europe Explorer',
    description: 'Entdecke Pilsen, 1295 am Zusammenfluss von vier Flüssen gegründet. Erkunde den St.-Bartholomäus-Dom, die Große Synagoge und die Heimat des Pilsner Biers.',
    eyebrow: 'WESTBÖHMEN · TSCHECHIEN',
    kicker: 'Eine Stadt an vier Flüssen mit weltweiter Geschichte',
    hook: 'Pilsen wurde 1295 auf Anordnung König Wenzels II. am Zusammenfluss von vier Flüssen gegründet. Die Altstadt vereint den gotischen St.-Bartholomäus-Dom mit dem höchsten Kirchturm Tschechiens, die monumentale Große Synagoge und die Geschichte des Pilsner Urquell, dessen erster Sud hier 1842 entstand.',
    support: 'Entdecke bekannte Sehenswürdigkeiten, versteckte Winkel der Altstadt und lokale Geschichten abseits der üblichen Routen.',
    cta: 'Stadt erkunden', back: 'Zurück zu Europe Explorer', tag: 'ENTDECKUNGSKARTE',
    tagline: 'Orte, Geschichten und unerwartete Entdeckungen'
  },
  en: {
    locale: 'en_US',
    title: 'Plzeň (Pilsen) – historic West Bohemian city and home of Pilsner | Europe Explorer',
    description: 'Explore Plzeň, founded in 1295 at the meeting of four rivers. Discover St Bartholomew’s Cathedral, the Great Synagogue and the birthplace of Pilsner lager.',
    eyebrow: 'WEST BOHEMIA · CZECHIA',
    kicker: 'A four-river city with a story known around the world',
    hook: 'Plzeň was founded in 1295 by King Wenceslas II at the confluence of four rivers. Its historic centre brings together the Gothic St Bartholomew’s Cathedral, home to the Czech Republic’s tallest church tower, the monumental Great Synagogue and the story of Pilsner Urquell, first brewed here in 1842.',
    support: 'Explore celebrated landmarks, quieter corners of the historic centre and local stories you might miss on a conventional sightseeing route.',
    cta: 'Explore the city', back: 'Back to Europe Explorer', tag: 'DISCOVERY MAP',
    tagline: 'Places, stories and unexpected discoveries'
  },
  es: {
    locale: 'es_ES',
    title: 'Plzeň (Pilsen) – historia de Bohemia occidental y origen de la cerveza pilsner | Europe Explorer',
    description: 'Explora Plzeň, fundada en 1295 en la confluencia de cuatro ríos. Descubre la catedral de San Bartolomé, la Gran Sinagoga y el origen de la cerveza pilsner.',
    eyebrow: 'BOHEMIA OCCIDENTAL · CHEQUIA',
    kicker: 'Una ciudad de cuatro ríos con una historia universal',
    hook: 'Plzeň fue fundada en 1295 por orden del rey Wenceslao II, en la confluencia de cuatro ríos. Su centro histórico reúne la catedral gótica de San Bartolomé, cuya torre es la más alta de una iglesia en Chequia, la monumental Gran Sinagoga y la historia de la Pilsner Urquell, elaborada aquí por primera vez en 1842.',
    support: 'Descubre monumentos emblemáticos, rincones tranquilos del casco histórico e historias locales que suelen quedar fuera de las rutas habituales.',
    cta: 'Explorar la ciudad', back: 'Volver a Europe Explorer', tag: 'MAPA DE DESCUBRIMIENTOS',
    tagline: 'Lugares, historias y descubrimientos inesperados'
  },
  fr: {
    locale: 'fr_FR',
    title: 'Plzeň (Pilsen) – patrimoine de Bohême occidentale et berceau de la pils | Europe Explorer',
    description: 'Explorez Plzeň, fondée en 1295 au confluent de quatre rivières. Découvrez la cathédrale Saint-Barthélemy, la Grande Synagogue et l’histoire de la bière pils.',
    eyebrow: 'BOHÊME DE L’OUEST · TCHÉQUIE',
    kicker: 'Une ville de quatre rivières au rayonnement mondial',
    hook: 'Plzeň fut fondée en 1295 sur ordre du roi Venceslas II, au confluent de quatre rivières. Son centre historique réunit la cathédrale gothique Saint-Barthélemy, dont la tour est la plus haute tour d’église de Tchéquie, la monumentale Grande Synagogue et l’histoire de la Pilsner Urquell, brassée ici pour la première fois en 1842.',
    support: 'Partez à la découverte des monuments emblématiques, des ruelles plus discrètes du centre historique et des histoires locales hors des itinéraires classiques.',
    cta: 'Explorer la ville', back: 'Retour à Europe Explorer', tag: 'CARTE DES DÉCOUVERTES',
    tagline: 'Lieux, histoires et découvertes inattendues'
  },
  it: {
    locale: 'it_IT',
    title: 'Plzeň (Pilsen) – storia della Boemia occidentale e patria della birra pils | Europe Explorer',
    description: 'Esplora Plzeň, fondata nel 1295 alla confluenza di quattro fiumi. Scopri la cattedrale di San Bartolomeo, la Grande Sinagoga e le origini della birra pils.',
    eyebrow: 'BOEMIA OCCIDENTALE · CECHIA',
    kicker: 'Una città di quattro fiumi dalla storia famosa nel mondo',
    hook: 'Plzeň fu fondata nel 1295 per volere del re Venceslao II, alla confluenza di quattro fiumi. Il centro storico riunisce la gotica cattedrale di San Bartolomeo, con la torre di chiesa più alta della Cechia, la monumentale Grande Sinagoga e la storia della Pilsner Urquell, prodotta qui per la prima volta nel 1842.',
    support: 'Scopri monumenti celebri, angoli meno conosciuti del centro storico e storie locali che spesso sfuggono ai normali itinerari turistici.',
    cta: 'Esplora la città', back: 'Torna a Europe Explorer', tag: 'MAPPA DELLE SCOPERTE',
    tagline: 'Luoghi, storie e scoperte inaspettate'
  },
  nl: {
    locale: 'nl_NL',
    title: 'Plzeň (Pilsen) – historische stad in West-Bohemen en bakermat van pils | Europe Explorer',
    description: 'Ontdek Plzeň, in 1295 gesticht aan de samenvloeiing van vier rivieren. Bekijk de Sint-Bartholomeüskathedraal, de Grote Synagoge en de bakermat van pilsbier.',
    eyebrow: 'WEST-BOHEMEN · TSJECHIË',
    kicker: 'Een stad aan vier rivieren met een wereldberoemd verhaal',
    hook: 'Plzeň werd in 1295 gesticht in opdracht van koning Wenceslaus II, aan de samenvloeiing van vier rivieren. De historische binnenstad brengt de gotische Sint-Bartholomeüskathedraal met de hoogste kerktoren van Tsjechië samen met de monumentale Grote Synagoge en het verhaal van Pilsner Urquell, dat hier in 1842 voor het eerst werd gebrouwen.',
    support: 'Ontdek bekende bezienswaardigheden, rustige hoekjes van de historische binnenstad en lokale verhalen buiten de gebruikelijke wandelroutes.',
    cta: 'Verken de stad', back: 'Terug naar Europe Explorer', tag: 'ONTDEKKINGSKAART',
    tagline: 'Plekken, verhalen en onverwachte ontdekkingen'
  }
}
const SUPPORTED = Object.keys(LANGS)

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
}

function mapUrl(lang) {
  const params = new URLSearchParams({ view: 'map', country: 'CZ', lat: CENTER.lat, lon: CENTER.lon, zoom: CENTER.zoom, lang })
  return '/?' + params.toString()
}

export async function onRequestGet({ params }) {
  const lang = SUPPORTED.includes(String(params.lang || '').toLowerCase()) ? String(params.lang).toLowerCase() : null
  if (!lang) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } })
  const t = LANGS[lang]
  const canonical = SITE + '/' + lang + SLUG
  const alternates = SUPPORTED.map(code => '<link rel="alternate" hreflang="' + code + '" href="' + SITE + '/' + code + SLUG + '">').join('\n')
  const languageLinks = SUPPORTED.map(code => '<a href="/' + code + SLUG + '" hreflang="' + code + '" lang="' + code + '"' + (code === lang ? ' aria-current="page" class="active"' : '') + '>' + code.toUpperCase() + '</a>').join('')
  const jsonLd = { '@context': 'https://schema.org', '@type': 'City', name: 'Plzeň', alternateName: ['Pilsen', 'Plzeň'], containedInPlace: { '@type': 'AdministrativeArea', name: 'Plzeň Region' }, description: t.description, url: canonical }
  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(t.title)}</title><meta name="description" content="${escapeHtml(t.description)}">
<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="x-default" href="${SITE}/en${SLUG}">${alternates}
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website"><meta property="og:site_name" content="Europe Explorer"><meta property="og:locale" content="${t.locale}"><meta property="og:title" content="${escapeHtml(t.title)}"><meta property="og:description" content="${escapeHtml(t.description)}"><meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh;background:#101c2b}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:510px;padding:clamp(58px,9vw,112px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:790px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label,.footer{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:29px;color:#9aabb7}.hero h1{font:600 clamp(42px,6vw,76px)/1.05 Manrope,sans-serif;letter-spacing:-3px;color:#f4f1e9;margin:17px 0 20px}.hook{max-width:750px;color:#c3cdd3;font-size:clamp(16px,1.7vw,19px);line-height:1.8;margin:0}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.92}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.orbit{position:absolute;left:14px;top:93px;width:360px;height:130px;border:1px solid #e3a35c66;border-radius:50%;transform:rotate(-28deg)}.orbit.two{transform:rotate(34deg);border-color:#8fa9b744}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.visual-label{position:absolute;color:#d2a36f;font-size:9px}.visual-label.a{right:0;top:15px}.visual-label.b{left:0;bottom:13px}.explore{padding:52px clamp(24px,10vw,160px) 68px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr);gap:50px;align-items:center}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;letter-spacing:-.7px;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:720px}.action{display:flex;justify-content:flex-end}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:220px;transition:background .15s,transform .15s}.cta:hover{background:#ffc17d;transform:translateY(-2px)}.cta span{font-size:19px}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}.foot a:hover{color:#f2a65a}@media(max-width:850px){.art{right:-55px;opacity:.28}.hero{min-height:450px}.explore{grid-template-columns:1fr;gap:26px}.action{justify-content:flex-start}}@media(max-width:520px){.topbar{align-items:flex-start;flex-direction:column}.languages{justify-content:flex-start}.hero{padding:65px 23px 58px}.hero h1{letter-spacing:-1.8px}.art{right:-155px;top:52%;opacity:.2}.explore{padding:38px 23px 52px}.cta{width:100%}.foot{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body><div class="shell">
<header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header>
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>Plzeň</h1><p class="hook">${escapeHtml(t.hook)}</p></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">49.7475° N · 13.3776° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div><div class="action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></section></main>
<footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer>
</div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=1800', 'x-content-type-options': 'nosniff' } })
}
