const SITE = 'https://europe-explorer.org'
const SLUG = '/places/czechia/ostrava'
const CENTER = { lat: '49.835894', lon: '18.292448', zoom: '15' }
const LANGS = {
  "cs": {
    "locale": "cs_CZ",
    "title": "Ostrava – industriální dědictví, památky a příběhy města | Europe Explorer",
    "description": "Ostrava spojuje industriální dědictví, hornickou historii, architekturu i současnou kulturu. Prozkoumejte město s Europe Explorerem.",
    "eyebrow": "MORAVSKOSLEZSKÝ KRAJ · ČESKO",
    "kicker": "Město, které proměnilo svou industriální minulost",
    "hook": "Ostrava vyrostla v průmyslové srdce regionu díky uhlí a železu. Dnes se její industriální dědictví – od Dolních Vítkovic po Landek – potkává s historickým centrem a živou kulturou.",
    "support": "Objevuj známé ostravské dominanty, městské příběhy i méně nápadná zákoutí. Všechna tahle místa najdeš přímo v mapě Europe Exploreru.",
    "cta": "Prozkoumat město",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Ostrava má mnohem víc tváří"
  },
  "de": {
    "locale": "de_DE",
    "title": "Ostrava – Industriekultur, Sehenswürdigkeiten und Stadtgeschichten | Europe Explorer",
    "description": "Ostrava verbindet industrielles Erbe, Bergbaugeschichte, Architektur und moderne Kultur. Entdecke die Stadt mit Europe Explorer.",
    "eyebrow": "MÄHRISCH-SCHLESISCHE REGION · TSCHECHIEN",
    "kicker": "Eine Stadt, die ihre Industriegeschichte neu entdeckt",
    "hook": "Kohle und Eisen machten Ostrava zum industriellen Herzen der Region. Heute trifft ihr industrielles Erbe – von Dolní Vítkovice bis Landek – auf eine historische Altstadt und eine lebendige Kulturszene.",
    "support": "Entdecke bekannte Wahrzeichen, lokale Geschichten und weniger bekannte Ecken. All diese Orte findest du direkt auf der Europe-Explorer-Karte.",
    "cta": "Stadt erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Ostrava hat viele überraschende Seiten"
  },
  "en": {
    "locale": "en_US",
    "title": "Ostrava – industrial heritage, sights and city stories | Europe Explorer",
    "description": "Ostrava brings together industrial heritage, mining history, architecture and contemporary culture. Explore the city with Europe Explorer.",
    "eyebrow": "MORAVIAN-SILESIAN REGION · CZECHIA",
    "kicker": "A city reinventing its industrial past",
    "hook": "Coal and iron turned Ostrava into the industrial heart of the region. Today, its industrial heritage – from Dolní Vítkovice to Landek – meets a historic centre and a lively cultural scene.",
    "support": "Discover Ostrava’s best-known landmarks, local stories and quieter corners. Find them all directly on the Europe Explorer map.",
    "cta": "Explore the city",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "There is more to Ostrava than meets the eye"
  },
  "es": {
    "locale": "es_ES",
    "title": "Ostrava – patrimonio industrial, monumentos e historias | Europe Explorer",
    "description": "Ostrava combina patrimonio industrial, historia minera, arquitectura y cultura contemporánea. Descubre la ciudad con Europe Explorer.",
    "eyebrow": "REGIÓN DE MORAVIA-SILESIA · CHEQUIA",
    "kicker": "Una ciudad que reinventó su pasado industrial",
    "hook": "El carbón y el hierro convirtieron Ostrava en el corazón industrial de la región. Hoy, su patrimonio industrial – de Dolní Vítkovice a Landek – convive con un centro histórico y una animada vida cultural.",
    "support": "Descubre los monumentos más conocidos de Ostrava, sus historias locales y rincones menos conocidos. Encuéntralos directamente en el mapa de Europe Explorer.",
    "cta": "Explorar la ciudad",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "Ostrava tiene muchas caras por descubrir"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "Ostrava – patrimoine industriel, monuments et histoires | Europe Explorer",
    "description": "Ostrava réunit patrimoine industriel, histoire minière, architecture et culture contemporaine. Explorez la ville avec Europe Explorer.",
    "eyebrow": "RÉGION DE MORAVIE-SILÉSIE · TCHÉQUIE",
    "kicker": "Une ville qui réinvente son passé industriel",
    "hook": "Le charbon et le fer ont fait d’Ostrava le cœur industriel de la région. Aujourd’hui, son patrimoine industriel – de Dolní Vítkovice à Landek – côtoie un centre historique et une scène culturelle dynamique.",
    "support": "Découvrez les monuments emblématiques d’Ostrava, ses histoires locales et ses recoins moins connus. Retrouvez-les directement sur la carte Europe Explorer.",
    "cta": "Explorer la ville",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "Ostrava révèle bien des surprises"
  },
  "it": {
    "locale": "it_IT",
    "title": "Ostrava – patrimonio industriale, luoghi da scoprire e storie | Europe Explorer",
    "description": "Ostrava unisce patrimonio industriale, storia mineraria, architettura e cultura contemporanea. Scopri la città con Europe Explorer.",
    "eyebrow": "REGIONE MORAVIA-SLESIA · CECHIA",
    "kicker": "Una città che ha reinventato il proprio passato industriale",
    "hook": "Il carbone e il ferro hanno trasformato Ostrava nel cuore industriale della regione. Oggi il suo patrimonio industriale – da Dolní Vítkovice a Landek – convive con un centro storico e una vivace scena culturale.",
    "support": "Scopri i monumenti più noti di Ostrava, le storie locali e gli angoli meno conosciuti. Li trovi tutti direttamente sulla mappa di Europe Explorer.",
    "cta": "Esplora la città",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "Ostrava ha tante storie da raccontare"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "Ostrava – industrieel erfgoed, bezienswaardigheden en verhalen | Europe Explorer",
    "description": "Ostrava combineert industrieel erfgoed, mijnbouwgeschiedenis, architectuur en hedendaagse cultuur. Verken de stad met Europe Explorer.",
    "eyebrow": "MORAVIË-SILEZIË · TSJECHIË",
    "kicker": "Een stad die haar industriële verleden opnieuw ontdekt",
    "hook": "Steenkool en ijzer maakten Ostrava tot het industriële hart van de regio. Tegenwoordig gaat het industriële erfgoed – van Dolní Vítkovice tot Landek – samen met een historisch centrum en een levendige culturele scene.",
    "support": "Ontdek de bekendste bezienswaardigheden, lokale verhalen en minder bekende plekken van Ostrava. Je vindt ze allemaal rechtstreeks op de kaart van Europe Explorer.",
    "cta": "Verken de stad",
    "back": "Terug naar Europe Explorer",
    "tag": "ONTDEKKINGSKAART",
    "tagline": "Ostrava heeft veel meer te ontdekken"
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
  const jsonLd = { '@context': 'https://schema.org', '@type': 'City', name: 'Ostrava', alternateName: 'Moravian Ostrava', containedInPlace: { '@type': 'AdministrativeArea', name: 'Moravian-Silesian Region' }, description: t.description, url: canonical }
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
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh;background:#101c2b}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:510px;padding:clamp(58px,9vw,112px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:790px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:29px;color:#9aabb7}.hero h1{font:600 clamp(42px,6vw,76px)/1.05 Manrope,sans-serif;letter-spacing:-3px;color:#f4f1e9;margin:17px 0 20px}.hook{max-width:750px;color:#c3cdd3;font-size:clamp(16px,1.7vw,19px);line-height:1.8;margin:0}.hero-action{margin-top:24px;display:flex;justify-content:flex-start}.hero-action .cta{min-width:230px}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.92}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.orbit{position:absolute;left:14px;top:93px;width:360px;height:130px;border:1px solid #e3a35c66;border-radius:50%;transform:rotate(-28deg)}.orbit.two{transform:rotate(34deg);border-color:#8fa9b744}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.visual-label{position:absolute;color:#d2a36f;font-size:9px}.visual-label.a{right:0;top:15px}.visual-label.b{left:0;bottom:13px}.explore{padding:52px clamp(24px,10vw,160px) 68px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr);gap:50px;align-items:center}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;letter-spacing:-.7px;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:720px}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:220px;transition:background .15s,transform .15s}.cta:hover{background:#ffc17d;transform:translateY(-2px)}.cta span{font-size:19px}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}.foot a:hover{color:#f2a65a}@media(max-width:850px){.art{right:-55px;opacity:.28}.hero{min-height:450px}.explore{grid-template-columns:1fr;gap:26px}}@media(max-width:520px){.topbar{align-items:flex-start;flex-direction:column}.languages{justify-content:flex-start}.hero{padding:65px 23px 58px}.hero-action{margin-top:24px}.hero-action .cta{width:auto;min-width:230px;max-width:100%}.hero h1{letter-spacing:-1.8px}.art{right:-155px;top:52%;opacity:.2}.explore{padding:38px 23px 52px}.foot{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body><div class="shell">
<header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header>
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>Ostrava</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">${CENTER.lat}° N · ${CENTER.lon}° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div></section></main>
<footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer>
</div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=1800', 'x-content-type-options': 'nosniff' } })
}
