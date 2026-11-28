const SITE = 'https://europe-explorer.org'
const SLUG = '/places/czechia/prague/castle'
const CENTER = { lat: '50.0909', lon: '14.4005', zoom: '16' }
const LANGS = {
  "cs": {
    "locale": "cs_CZ",
    "title": "Pražský hrad – katedrála sv. Víta, Zlatá ulička a historie | Europe Explorer",
    "description": "Pražský hrad, katedrála sv. Víta, Starý královský palác i Zlatá ulička. Objevte hradní areál a jeho příběhy v mapě Europe Exploreru.",
    "eyebrow": "PRAHA · ČESKO",
    "kicker": "Více než tisíc let českých dějin",
    "hook": "Pražský hrad vznikl podle historických pramenů kolem roku 880 a stal se sídlem českých knížat, králů i prezidentů. Monumentální areál spojuje katedrálu sv. Víta, Starý královský palác, baziliku sv. Jiří a malebnou Zlatou uličku – a skrývá mnohem víc, co můžeš objevit právě tady.",
    "support": "Prozkoumej slavné hradní památky, nádvoří, zahrady i méně známá zákoutí Hradčan. Všechna tahle místa najdeš přímo v mapě Europe Exploreru.",
    "cta": "Prozkoumat Pražský hrad",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Za hradními branami čekají staletí příběhů"
  },
  "de": {
    "locale": "de_DE",
    "title": "Prager Burg – Veitsdom, Goldenes Gässchen und Geschichte | Europe Explorer",
    "description": "Entdecke die Prager Burg mit Veitsdom, Altem Königspalast, Georgsbasilika und Goldenem Gässchen auf der Karte von Europe Explorer.",
    "eyebrow": "PRAG · TSCHECHIEN",
    "kicker": "Mehr als tausend Jahre böhmische Geschichte",
    "hook": "Die Prager Burg wurde historischen Quellen zufolge um 880 gegründet und war Sitz böhmischer Fürsten, Könige und Präsidenten. Der monumentale Komplex vereint den Veitsdom, den Alten Königspalast, die Georgsbasilika und das malerische Goldene Gässchen – und birgt noch vieles mehr, das es hier zu entdecken gibt.",
    "support": "Entdecke berühmte Burgsehenswürdigkeiten, Höfe, Gärten und weniger bekannte Winkel der Prager Burg. All diese Orte findest du direkt auf der Europe-Explorer-Karte.",
    "cta": "Prager Burg erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Hinter den Burgtoren warten Jahrhunderte voller Geschichten"
  },
  "en": {
    "locale": "en_US",
    "title": "Prague Castle – St Vitus Cathedral, Golden Lane and history | Europe Explorer",
    "description": "Discover Prague Castle, St Vitus Cathedral, the Old Royal Palace, St George’s Basilica and Golden Lane with Europe Explorer.",
    "eyebrow": "PRAGUE · CZECHIA",
    "kicker": "More than a thousand years of Czech history",
    "hook": "According to historical sources, Prague Castle was founded around 880 and became the seat of Bohemian princes, kings and presidents. This monumental complex brings together St Vitus Cathedral, the Old Royal Palace, St George’s Basilica and the picturesque Golden Lane – with many more stories waiting to be discovered.",
    "support": "Explore the castle’s celebrated landmarks, courtyards, gardens and quieter corners of Hradčany. Find them all directly on the Europe Explorer map.",
    "cta": "Explore Prague Castle",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "Centuries of stories await beyond the castle gates"
  },
  "es": {
    "locale": "es_ES",
    "title": "Castillo de Praga – catedral de San Vito, Callejón del Oro e historia | Europe Explorer",
    "description": "Descubre el Castillo de Praga, la catedral de San Vito, el Palacio Real Antiguo y el Callejón del Oro con Europe Explorer.",
    "eyebrow": "PRAGA · CHEQUIA",
    "kicker": "Más de mil años de historia checa",
    "hook": "Según las fuentes históricas, el Castillo de Praga se fundó hacia el año 880 y fue sede de los príncipes y reyes de Bohemia y, más tarde, de los presidentes. Este monumental conjunto reúne la catedral de San Vito, el Antiguo Palacio Real, la basílica de San Jorge y el pintoresco Callejón del Oro, además de muchas otras historias por descubrir.",
    "support": "Explora los monumentos del castillo, sus patios, jardines y rincones menos conocidos de Hradčany. Encuéntralos directamente en el mapa de Europe Explorer.",
    "cta": "Explorar el Castillo de Praga",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "Tras las puertas del castillo esperan siglos de historias"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "Château de Prague – cathédrale Saint-Guy, Ruelle d’Or et histoire | Europe Explorer",
    "description": "Découvrez le château de Prague, la cathédrale Saint-Guy, l’ancien palais royal, la basilique Saint-Georges et la Ruelle d’Or avec Europe Explorer.",
    "eyebrow": "PRAGUE · TCHÉQUIE",
    "kicker": "Plus de mille ans d’histoire tchèque",
    "hook": "Selon les sources historiques, le château de Prague fut fondé vers 880 et devint la résidence des princes et rois de Bohême, puis des présidents. Cet ensemble monumental réunit la cathédrale Saint-Guy, l’ancien palais royal, la basilique Saint-Georges et la pittoresque Ruelle d’Or, tout en recelant bien d’autres histoires à découvrir.",
    "support": "Explorez les monuments du château, ses cours, ses jardins et les recoins moins connus de Hradčany. Retrouvez-les directement sur la carte Europe Explorer.",
    "cta": "Explorer le château de Prague",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "Des siècles d’histoires vous attendent derrière les portes du château"
  },
  "it": {
    "locale": "it_IT",
    "title": "Castello di Praga – cattedrale di San Vito, Vicolo d’Oro e storia | Europe Explorer",
    "description": "Scopri il Castello di Praga, la cattedrale di San Vito, il Vecchio Palazzo Reale, la basilica di San Giorgio e il Vicolo d’Oro con Europe Explorer.",
    "eyebrow": "PRAGA · CECHIA",
    "kicker": "Oltre mille anni di storia ceca",
    "hook": "Secondo le fonti storiche, il Castello di Praga fu fondato intorno all’880 e divenne sede dei principi e dei re di Boemia e, in seguito, dei presidenti. Questo complesso monumentale riunisce la cattedrale di San Vito, il Vecchio Palazzo Reale, la basilica di San Giorgio e il pittoresco Vicolo d’Oro, custodendo molte altre storie da scoprire.",
    "support": "Esplora i monumenti del castello, i cortili, i giardini e gli angoli meno conosciuti di Hradčany. Li trovi tutti direttamente sulla mappa di Europe Explorer.",
    "cta": "Esplora il Castello di Praga",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "Dietro le porte del castello attendono secoli di storie"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "Praagse Burcht – Sint-Vituskathedraal, Gouden Straatje en geschiedenis | Europe Explorer",
    "description": "Ontdek de Praagse Burcht, de Sint-Vituskathedraal, het Oude Koninklijk Paleis, de Sint-Jorisbasiliek en het Gouden Straatje met Europe Explorer.",
    "eyebrow": "PRAAG · TSJECHIË",
    "kicker": "Meer dan duizend jaar Tsjechische geschiedenis",
    "hook": "Volgens historische bronnen werd de Praagse Burcht rond 880 gesticht. Ze werd de zetel van Boheemse vorsten en koningen en later van presidenten. Dit monumentale complex omvat de Sint-Vituskathedraal, het Oude Koninklijk Paleis, de Sint-Jorisbasiliek en het schilderachtige Gouden Straatje – en nog veel meer verhalen om te ontdekken.",
    "support": "Verken de beroemde monumenten, binnenplaatsen, tuinen en minder bekende plekken van Hradčany. Je vindt ze allemaal rechtstreeks op de kaart van Europe Explorer.",
    "cta": "Verken de Praagse Burcht",
    "back": "Terug naar Europe Explorer",
    "tag": "ONTDEKKINGSKAART",
    "tagline": "Achter de burchtpoorten wachten eeuwen aan verhalen"
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
  const jsonLd = { '@context': 'https://schema.org', '@type': 'LandmarksOrHistoricalBuildings', name: 'Pražský hrad', containedInPlace: { '@type': 'City', name: 'Prague' }, description: t.description, url: canonical }
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
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh;background:#101c2b}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:510px;padding:clamp(48px,7vw,92px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:800px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:22px;color:#9aabb7}.hero h1{font:600 clamp(40px,5.6vw,72px)/1.06 Manrope,sans-serif;letter-spacing:-2.5px;color:#f4f1e9;margin:15px 0 18px}.hook{max-width:760px;color:#c3cdd3;font-size:clamp(16px,1.65vw,19px);line-height:1.72;margin:0}.hero-action{margin-top:22px;display:flex;justify-content:flex-start}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:230px;min-height:52px;transition:background .15s,transform .15s}.cta:hover{background:#ffc17d;transform:translateY(-2px)}.cta span{font-size:19px}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.9}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.orbit{position:absolute;left:14px;top:93px;width:360px;height:130px;border:1px solid #e3a35c66;border-radius:50%;transform:rotate(-28deg)}.orbit.two{transform:rotate(34deg);border-color:#8fa9b744}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.visual-label{position:absolute;color:#d2a36f;font-size:9px}.visual-label.a{right:0;top:15px}.visual-label.b{left:0;bottom:13px}.explore{padding:42px clamp(24px,10vw,160px) 60px;display:grid;grid-template-columns:1fr;gap:18px;align-items:center}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;letter-spacing:-.7px;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:760px}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}.foot a:hover{color:#f2a65a}@media(max-width:850px){.art{right:-55px;opacity:.25}.hero{min-height:430px}.explore{grid-template-columns:1fr;gap:20px}}@media(max-width:520px){.topbar{align-items:flex-start;flex-direction:column;padding:12px 18px}.languages{justify-content:flex-start}.hero{min-height:0;padding:42px 23px 44px}.hero h1{font-size:clamp(38px,11vw,52px);letter-spacing:-1.8px;margin-bottom:15px}.kicker{margin-top:18px}.hook{font-size:16px;line-height:1.62}.hero-action{margin-top:18px}.cta{width:100%;min-height:54px}.art{right:-155px;top:55%;opacity:.16}.explore{padding:32px 23px 42px}.foot{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body><div class="shell">
<header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header>
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>Pražský hrad</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">${CENTER.lat}° N · ${CENTER.lon}° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div></section></main>
<footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer>
</div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=1800', 'x-content-type-options': 'nosniff' } })
}
