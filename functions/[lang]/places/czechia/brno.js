const SITE = 'https://europe-explorer.org'
const SLUG = '/places/czechia/brno'
const CENTER = { lat: '49.1947', lon: '16.6059', zoom: '15' }
const LANGS = {
  "cs": {
    "locale": "cs_CZ",
    "title": "Brno – památky, zajímavá místa a příběhy města | Europe Explorer",
    "description": "Brno skrývá spoustu památek, zajímavých míst a příběhů. Prozkoumejte historické centrum a objevujte Brno s Europe Explorerem.",
    "eyebrow": "JIŽNÍ MORAVA · ČESKO",
    "kicker": "Město, které má co odhalovat",
    "hook": "Brno skrývá spoustu památek, zajímavých míst a příběhů. Od Špilberku a Petrova až po náměstí, historické uličky a nenápadná zákoutí – najdeš je právě tady.",
    "support": "Prozkoumej známé brněnské dominanty i místa, kolem kterých bys jinak možná prošel. Všechna dobrodružství začínají v mapě Europe Exploreru.",
    "cta": "Prozkoumat město",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Brno čeká na tvoje objevy"
  },
  "de": {
    "locale": "de_DE",
    "title": "Brünn – Sehenswürdigkeiten, besondere Orte und Stadtgeschichten | Europe Explorer",
    "description": "Brünn steckt voller Sehenswürdigkeiten, besonderer Orte und Geschichten. Entdecke die Altstadt und erkunde die Stadt mit Europe Explorer.",
    "eyebrow": "SÜDMÄHREN · TSCHECHIEN",
    "kicker": "Eine Stadt voller Entdeckungen",
    "hook": "Brünn steckt voller Sehenswürdigkeiten, besonderer Orte und Geschichten. Von der Burg Špilberk und dem Petrov bis zu Plätzen, historischen Gassen und versteckten Winkeln – hier findest du sie.",
    "support": "Entdecke bekannte Wahrzeichen und Orte, an denen du sonst vielleicht vorbeigehen würdest. Dein Streifzug beginnt auf der Europe-Explorer-Karte.",
    "cta": "Stadt erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Brünn wartet darauf, entdeckt zu werden"
  },
  "en": {
    "locale": "en_US",
    "title": "Brno – sights, hidden places and stories | Europe Explorer",
    "description": "Brno is full of landmarks, interesting places and stories. Explore its historic centre and discover the city with Europe Explorer.",
    "eyebrow": "SOUTH MORAVIA · CZECHIA",
    "kicker": "A city with plenty to discover",
    "hook": "Brno is full of landmarks, interesting places and stories. From Špilberk Castle and Petrov to historic squares, old streets and tucked-away corners – you can find them right here.",
    "support": "Explore Brno’s best-known landmarks as well as places you might otherwise walk straight past. Your discoveries begin on the Europe Explorer map.",
    "cta": "Explore the city",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "Brno is waiting to be explored"
  },
  "es": {
    "locale": "es_ES",
    "title": "Brno – monumentos, lugares especiales e historias | Europe Explorer",
    "description": "Brno está llena de monumentos, lugares interesantes e historias. Explora su centro histórico y descubre la ciudad con Europe Explorer.",
    "eyebrow": "MORAVIA DEL SUR · CHEQUIA",
    "kicker": "Una ciudad llena de descubrimientos",
    "hook": "Brno está llena de monumentos, lugares interesantes e historias. Desde el castillo de Špilberk y Petrov hasta plazas históricas, calles antiguas y rincones escondidos: los encontrarás aquí mismo.",
    "support": "Explora los monumentos más conocidos de Brno y también esos lugares por los que quizá pasarías sin darte cuenta. Tus descubrimientos comienzan en el mapa de Europe Explorer.",
    "cta": "Explorar la ciudad",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "Brno está esperando a que la descubras"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "Brno – monuments, lieux remarquables et histoires | Europe Explorer",
    "description": "Brno regorge de monuments, de lieux intéressants et d’histoires. Explorez son centre historique avec Europe Explorer.",
    "eyebrow": "MORAVIE-DU-SUD · TCHÉQUIE",
    "kicker": "Une ville qui réserve bien des découvertes",
    "hook": "Brno regorge de monuments, de lieux intéressants et d’histoires. Du château du Špilberk et de Petrov aux places historiques, aux vieilles rues et aux recoins discrets, vous les trouverez ici.",
    "support": "Explorez les monuments incontournables de Brno ainsi que des lieux devant lesquels vous passeriez peut-être sans vous arrêter. Vos découvertes commencent sur la carte Europe Explorer.",
    "cta": "Explorer la ville",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "Brno n’attend que votre curiosité"
  },
  "it": {
    "locale": "it_IT",
    "title": "Brno – monumenti, luoghi da scoprire e storie | Europe Explorer",
    "description": "Brno custodisce monumenti, luoghi interessanti e tante storie. Esplora il centro storico e scopri la città con Europe Explorer.",
    "eyebrow": "MORAVIA MERIDIONALE · CECHIA",
    "kicker": "Una città ricca di scoperte",
    "hook": "Brno custodisce monumenti, luoghi interessanti e tante storie. Dal castello dello Špilberk e Petrov alle piazze storiche, alle strade antiche e agli angoli nascosti: li trovi proprio qui.",
    "support": "Esplora i luoghi più famosi di Brno e quelli davanti ai quali potresti passare senza notarli. Le tue scoperte cominciano sulla mappa di Europe Explorer.",
    "cta": "Esplora la città",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "Brno aspetta solo di essere scoperta"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "Brno – bezienswaardigheden, bijzondere plekken en verhalen | Europe Explorer",
    "description": "Brno zit vol bezienswaardigheden, interessante plekken en verhalen. Verken het historische centrum met Europe Explorer.",
    "eyebrow": "ZUID-MORAVIË · TSJECHIË",
    "kicker": "Een stad vol ontdekkingen",
    "hook": "Brno zit vol bezienswaardigheden, interessante plekken en verhalen. Van de burcht Špilberk en Petrov tot historische pleinen, oude straten en verborgen hoekjes – je vindt ze precies hier.",
    "support": "Ontdek de bekende bezienswaardigheden van Brno én plekken waar je anders misschien zomaar aan voorbijloopt. Je ontdekkingstocht begint op de kaart van Europe Explorer.",
    "cta": "Verken de stad",
    "back": "Terug naar Europe Explorer",
    "tag": "ONTDEKKINGSKAART",
    "tagline": "Brno wacht om ontdekt te worden"
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
  const jsonLd = { '@context': 'https://schema.org', '@type': 'City', name: 'Brno', description: t.description, url: canonical, containedInPlace: { '@type': 'AdministrativeArea', name: 'South Moravian Region' } }
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
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh;background:#101c2b}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:510px;padding:clamp(58px,9vw,112px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:790px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:29px;color:#9aabb7}.hero h1{font:600 clamp(42px,6vw,76px)/1.05 Manrope,sans-serif;letter-spacing:-3px;color:#f4f1e9;margin:17px 0 20px}.hook{max-width:750px;color:#c3cdd3;font-size:clamp(16px,1.7vw,19px);line-height:1.8;margin:0}.hero-action{margin-top:28px;display:flex;justify-content:flex-start}.hero-action .cta{min-width:230px}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.92}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.orbit{position:absolute;left:14px;top:93px;width:360px;height:130px;border:1px solid #e3a35c66;border-radius:50%;transform:rotate(-28deg)}.orbit.two{transform:rotate(34deg);border-color:#8fa9b744}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.visual-label{position:absolute;color:#d2a36f;font-size:9px}.visual-label.a{right:0;top:15px}.visual-label.b{left:0;bottom:13px}.explore{padding:52px clamp(24px,10vw,160px) 68px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr);gap:50px;align-items:center}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;letter-spacing:-.7px;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:720px}.action{display:flex;justify-content:flex-end}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:220px;transition:background .15s,transform .15s}.cta:hover{background:#ffc17d;transform:translateY(-2px)}.cta span{font-size:19px}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}.foot a:hover{color:#f2a65a}@media(max-width:850px){.art{right:-55px;opacity:.28}.hero{min-height:450px}.explore{grid-template-columns:1fr;gap:26px}.action{justify-content:flex-start}}@media(max-width:520px){.topbar{align-items:flex-start;flex-direction:column}.languages{justify-content:flex-start}.hero{padding:65px 23px 58px}.hero-action{margin-top:24px}.hero-action .cta{width:auto;min-width:230px;max-width:100%}.hero h1{letter-spacing:-1.8px}.art{right:-155px;top:52%;opacity:.2}.explore{padding:38px 23px 52px}.cta{width:100%}.foot{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body><div class="shell">
<header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header>
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>Brno</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">${CENTER.lat}° N · ${CENTER.lon}° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div></section></main>
<footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer>
</div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=1800', 'x-content-type-options': 'nosniff' } })
}
