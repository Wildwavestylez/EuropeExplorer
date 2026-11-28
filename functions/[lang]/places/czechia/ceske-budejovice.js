const SITE = 'https://europe-explorer.org'
const SLUG = '/places/czechia/ceske-budejovice'
const LANGS = {
  "cs": {
    "locale": "cs_CZ",
    "title": "České Budějovice – královské město s bohatou historií | Europe Explorer",
    "description": "Poznejte České Budějovice, královské město založené roku 1265. Černá věž, Samsonova kašna a příběhy jižních Čech čekají na objevení.",
    "eyebrow": "JIŽNÍ ČECHY · ČESKO",
    "kicker": "Královské město od roku 1265",
    "hook": "České Budějovice založil roku 1265 český král Přemysl Otakar II. Historické centrum s rozlehlým náměstím, Černou věží a Samsonovou kašnou dodnes vypráví příběh významného královského města.",
    "support": "Poznejte slavné památky, místní příběhy i méně známá zákoutí, která dávají městu jeho jedinečný charakter.",
    "cta": "Prozkoumat město",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Místa, příběhy a nečekané objevy"
  },
  "de": {
    "locale": "de_DE",
    "title": "České Budějovice – die königliche Stadt Südböhmens | Europe Explorer",
    "description": "Entdecke České Budějovice, die 1265 gegründete Königsstadt. Der Schwarze Turm, der Samsonbrunnen und südböhmische Geschichten warten darauf, entdeckt zu werden.",
    "eyebrow": "SÜDBÖHMEN · TSCHECHIEN",
    "kicker": "Königsstadt seit 1265",
    "hook": "České Budějovice wurde 1265 vom böhmischen König Přemysl Otakar II. gegründet. Die historische Altstadt mit ihrem weitläufigen Hauptplatz, dem Schwarzen Turm und dem Samsonbrunnen erzählt bis heute die Geschichte einer bedeutenden Königsstadt.",
    "support": "Entdecke berühmte Sehenswürdigkeiten, lokale Geschichten und versteckte Ecken, die den besonderen Charakter der Stadt ausmachen.",
    "cta": "Stadt erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Orte, Geschichten und unerwartete Entdeckungen"
  },
  "en": {
    "locale": "en_US",
    "title": "České Budějovice – the historic royal city of South Bohemia | Europe Explorer",
    "description": "Explore České Budějovice, founded as a royal city in 1265. Discover the Black Tower, Samson Fountain and the stories of South Bohemia.",
    "eyebrow": "SOUTH BOHEMIA · CZECHIA",
    "kicker": "A royal city founded in 1265",
    "hook": "České Budějovice was founded in 1265 by King Ottokar II of Bohemia. Its historic centre, grand main square, Black Tower and Samson Fountain still tell the story of an important royal city.",
    "support": "Find celebrated landmarks, local stories and quieter corners that reveal the city's distinctive character.",
    "cta": "Explore the city",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and unexpected discoveries"
  },
  "es": {
    "locale": "es_ES",
    "title": "České Budějovice – la histórica ciudad real de Bohemia del Sur | Europe Explorer",
    "description": "Explora České Budějovice, fundada como ciudad real en 1265. Descubre la Torre Negra, la fuente de Sansón y las historias de Bohemia del Sur.",
    "eyebrow": "BOHEMIA DEL SUR · CHEQUIA",
    "kicker": "Ciudad real fundada en 1265",
    "hook": "České Budějovice fue fundada en 1265 por el rey Přemysl Otakar II de Bohemia. Su centro histórico, la amplia plaza principal, la Torre Negra y la fuente de Sansón conservan la historia de una importante ciudad real.",
    "support": "Descubre monumentos emblemáticos, historias locales y rincones menos conocidos que revelan el carácter único de la ciudad.",
    "cta": "Explorar la ciudad",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "Lugares, historias y descubrimientos inesperados"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "České Budějovice – la cité royale historique de Bohême du Sud | Europe Explorer",
    "description": "Explorez České Budějovice, fondée comme ville royale en 1265. Découvrez la Tour noire, la fontaine de Samson et les histoires de Bohême du Sud.",
    "eyebrow": "BOHÊME DU SUD · TCHÉQUIE",
    "kicker": "Une cité royale fondée en 1265",
    "hook": "České Budějovice fut fondée en 1265 par le roi de Bohême Přemysl Otakar II. Son centre historique, sa vaste place principale, la Tour noire et la fontaine de Samson racontent encore l’histoire d’une importante cité royale.",
    "support": "Partez à la découverte de monuments célèbres, d’histoires locales et de lieux plus discrets qui révèlent le caractère singulier de la ville.",
    "cta": "Explorer la ville",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "Lieux, histoires et découvertes inattendues"
  },
  "it": {
    "locale": "it_IT",
    "title": "České Budějovice – la storica città reale della Boemia meridionale | Europe Explorer",
    "description": "Esplora České Budějovice, fondata come città reale nel 1265. Scopri la Torre Nera, la fontana di Sansone e le storie della Boemia meridionale.",
    "eyebrow": "BOEMIA MERIDIONALE · CECHIA",
    "kicker": "Città reale fondata nel 1265",
    "hook": "České Budějovice fu fondata nel 1265 dal re di Boemia Přemysl Otakar II. Il centro storico, la grande piazza principale, la Torre Nera e la fontana di Sansone raccontano ancora la storia di un’importante città reale.",
    "support": "Scopri monumenti celebri, storie locali e angoli meno conosciuti che rivelano il carattere unico della città.",
    "cta": "Esplora la città",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "Luoghi, storie e scoperte inaspettate"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "České Budějovice – de historische koningsstad van Zuid-Bohemen | Europe Explorer",
    "description": "Verken České Budějovice, in 1265 gesticht als koningsstad. Ontdek de Zwarte Toren, de Samsonfontein en de verhalen van Zuid-Bohemen.",
    "eyebrow": "ZUID-BOHEMEN · TSJECHIË",
    "kicker": "Koningsstad sinds 1265",
    "hook": "České Budějovice werd in 1265 gesticht door de Boheemse koning Přemysl Otakar II. De historische binnenstad met haar uitgestrekte plein, de Zwarte Toren en de Samsonfontein vertelt nog altijd het verhaal van een belangrijke koningsstad.",
    "support": "Ontdek beroemde bezienswaardigheden, lokale verhalen en minder bekende plekken die het bijzondere karakter van de stad laten zien.",
    "cta": "Verken de stad",
    "back": "Terug naar Europe Explorer",
    "tag": "ONTDEKKINGSKAART",
    "tagline": "Plekken, verhalen en onverwachte ontdekkingen"
  }
}
const SUPPORTED = Object.keys(LANGS)

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
}

function mapUrl(lang) {
  const params = new URLSearchParams({ view: 'map', country: 'CZ', lat: '48.9745', lon: '14.4743', zoom: '14', lang })
  return '/?' + params.toString()
}

export async function onRequestGet({ params }) {
  const lang = SUPPORTED.includes(String(params.lang || '').toLowerCase()) ? String(params.lang).toLowerCase() : null
  if (!lang) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } })
  const t = LANGS[lang]
  const canonical = SITE + '/' + lang + SLUG
  const alternates = SUPPORTED.map(code => '<link rel="alternate" hreflang="' + code + '" href="' + SITE + '/' + code + SLUG + '">').join('\n')
  const languageLinks = SUPPORTED.map(code => '<a href="/' + code + SLUG + '" hreflang="' + code + '" lang="' + code + '"' + (code === lang ? ' aria-current="page" class="active"' : '') + '>' + code.toUpperCase() + '</a>').join('')
  const jsonLd = { '@context': 'https://schema.org', '@type': 'City', name: 'České Budějovice', alternateName: 'Budweis', containedInPlace: { '@type': 'AdministrativeArea', name: 'South Bohemian Region' }, description: t.description, url: canonical }
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
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh;background:#101c2b}.topbar{height:76px;padding:0 clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:510px;padding:clamp(58px,9vw,112px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:760px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label,.footer{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:29px;color:#9aabb7}.hero h1{font:600 clamp(42px,6vw,76px)/1.05 Manrope,sans-serif;letter-spacing:-3px;color:#f4f1e9;margin:17px 0 20px}.hook{max-width:730px;color:#c3cdd3;font-size:clamp(16px,1.7vw,19px);line-height:1.8;margin:0}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.92}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.orbit{position:absolute;left:14px;top:93px;width:360px;height:130px;border:1px solid #e3a35c66;border-radius:50%;transform:rotate(-28deg)}.orbit.two{transform:rotate(34deg);border-color:#8fa9b744}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.visual-label{position:absolute;color:#d2a36f;font-size:9px}.visual-label.a{right:0;top:15px}.visual-label.b{left:0;bottom:13px}.explore{padding:52px clamp(24px,10vw,160px) 68px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr);gap:50px;align-items:center}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;letter-spacing:-.7px;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:720px}.action{display:flex;justify-content:flex-end}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:220px;transition:background .15s,transform .15s}.cta:hover{background:#ffc17d;transform:translateY(-2px)}.cta span{font-size:19px}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}.foot a:hover{color:#f2a65a}@media(max-width:850px){.art{right:-55px;opacity:.28}.hero{min-height:450px}.explore{grid-template-columns:1fr;gap:26px}.action{justify-content:flex-start}}@media(max-width:520px){.topbar{height:auto;min-height:68px;padding:12px 18px;align-items:flex-start;flex-direction:column}.languages{justify-content:flex-start}.hero{padding:65px 23px 58px}.hero h1{letter-spacing:-1.8px}.art{right:-155px;top:52%;opacity:.2}.explore{padding:38px 23px 52px}.cta{width:100%}.foot{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body><div class="shell">
<header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header>
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>České Budějovice</h1><p class="hook">${escapeHtml(t.hook)}</p></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">48.9745° N · 14.4743° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div><div class="action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></section></main>
<footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer>
</div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=1800', 'x-content-type-options': 'nosniff' } })
}
