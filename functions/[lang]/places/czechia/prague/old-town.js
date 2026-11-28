const SITE = 'https://europe-explorer.org'
const SLUG = '/places/czechia/prague/old-town'
const CENTER = { lat: '50.0870', lon: '14.4206', zoom: '16' }
const LANGS = {
  "cs": {
    "locale": "cs_CZ",
    "title": "Pražské Staré Město – památky, orloj a příběhy | Europe Explorer",
    "description": "Staré Město pražské ukrývá Staroměstské náměstí, orloj, Týnský chrám i uličky Královské cesty. Objevte je v mapě Europe Exploreru.",
    "eyebrow": "PRAHA · ČESKO",
    "kicker": "Srdce historické Prahy",
    "hook": "Staré Město se po staletí rozvíjelo kolem Staroměstského náměstí, kde se gotické věže zvedají nad místem korunovačních průvodů i zásadních okamžiků českých dějin. Od orloje a Týnského chrámu až po Královskou cestu tu čeká nespočet památek a příběhů – najdeš je právě tady.",
    "support": "Prozkoumej známé pražské památky, skrytá zákoutí i příběhy historických ulic. Všechna tahle místa najdeš přímo v mapě Europe Exploreru.",
    "cta": "Prozkoumat Staré Město",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Pražské Staré Město má co vyprávět"
  },
  "de": {
    "locale": "de_DE",
    "title": "Prager Altstadt – Sehenswürdigkeiten, Astronomische Uhr und Geschichte | Europe Explorer",
    "description": "Entdecke den Altstädter Ring, die Astronomische Uhr, die Teynkirche und die historischen Gassen der Prager Altstadt auf der Europe-Explorer-Karte.",
    "eyebrow": "PRAG · TSCHECHIEN",
    "kicker": "Das historische Herz von Prag",
    "hook": "Seit Jahrhunderten entwickelte sich die Prager Altstadt rund um den Altstädter Ring, dessen gotische Türme über einem Ort voller Krönungszüge und Wendepunkte der böhmischen Geschichte aufragen. Von der Astronomischen Uhr und der Teynkirche bis zum Königsweg warten unzählige Sehenswürdigkeiten und Geschichten darauf, entdeckt zu werden.",
    "support": "Entdecke berühmte Prager Sehenswürdigkeiten, versteckte Winkel und die Geschichten historischer Gassen. All diese Orte findest du direkt auf der Europe-Explorer-Karte.",
    "cta": "Altstadt erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Prags Altstadt steckt voller Geschichten"
  },
  "en": {
    "locale": "en_US",
    "title": "Prague Old Town – landmarks, Astronomical Clock and history | Europe Explorer",
    "description": "Explore Prague Old Town, from Old Town Square and its Astronomical Clock to Týn Church and the historic Royal Route, with Europe Explorer.",
    "eyebrow": "PRAGUE · CZECHIA",
    "kicker": "The historic heart of Prague",
    "hook": "For centuries, Prague’s Old Town has grown around Old Town Square, where Gothic towers rise above a place shaped by coronation processions and defining moments in Czech history. From the Astronomical Clock and Týn Church to the historic Royal Route, landmarks and stories await around every corner.",
    "support": "Discover Prague’s celebrated landmarks, tucked-away corners and the stories behind its historic streets. Find them all directly on the Europe Explorer map.",
    "cta": "Explore Old Town",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "Prague Old Town has stories to tell"
  },
  "es": {
    "locale": "es_ES",
    "title": "Ciudad Vieja de Praga – monumentos, reloj astronómico e historia | Europe Explorer",
    "description": "Descubre la Plaza de la Ciudad Vieja, el reloj astronómico, la iglesia de Týn y las calles históricas de Praga con Europe Explorer.",
    "eyebrow": "PRAGA · CHEQUIA",
    "kicker": "El corazón histórico de Praga",
    "hook": "Durante siglos, la Ciudad Vieja de Praga ha crecido alrededor de la Plaza de la Ciudad Vieja, cuyas torres góticas se alzan sobre un lugar marcado por las procesiones de coronación y momentos decisivos de la historia checa. Del reloj astronómico y la iglesia de Týn a la histórica Ruta Real, cada rincón guarda monumentos e historias.",
    "support": "Descubre los monumentos más conocidos de Praga, rincones escondidos y las historias de sus calles históricas. Encuéntralos directamente en el mapa de Europe Explorer.",
    "cta": "Explorar la Ciudad Vieja",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "La Ciudad Vieja de Praga está llena de historias"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "Vieille Ville de Prague – monuments, horloge astronomique et histoire | Europe Explorer",
    "description": "Découvrez la place de la Vieille-Ville, son horloge astronomique, l’église Notre-Dame du Týn et les ruelles historiques de Prague avec Europe Explorer.",
    "eyebrow": "PRAGUE · TCHÉQUIE",
    "kicker": "Le cœur historique de Prague",
    "hook": "Depuis des siècles, la Vieille Ville de Prague s’est développée autour de la place de la Vieille-Ville, dont les tours gothiques dominent un lieu marqué par les cortèges de couronnement et les grands moments de l’histoire tchèque. De l’horloge astronomique à l’église Notre-Dame du Týn, en passant par la Voie royale, monuments et récits jalonnent chaque rue.",
    "support": "Découvrez les monuments emblématiques de Prague, ses recoins cachés et les histoires de ses rues historiques. Retrouvez-les directement sur la carte Europe Explorer.",
    "cta": "Explorer la Vieille Ville",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "La Vieille Ville de Prague a tant d’histoires à raconter"
  },
  "it": {
    "locale": "it_IT",
    "title": "Città Vecchia di Praga – monumenti, orologio astronomico e storia | Europe Explorer",
    "description": "Scopri la Piazza della Città Vecchia, l’orologio astronomico, la chiesa di Týn e le strade storiche di Praga con Europe Explorer.",
    "eyebrow": "PRAGA · CECHIA",
    "kicker": "Il cuore storico di Praga",
    "hook": "Da secoli la Città Vecchia di Praga si sviluppa attorno alla Piazza della Città Vecchia, dove le torri gotiche dominano un luogo segnato da cortei d’incoronazione e momenti decisivi della storia ceca. Dall’orologio astronomico alla chiesa di Týn, passando per la Via Reale, ogni angolo custodisce monumenti e storie.",
    "support": "Scopri i monumenti più celebri di Praga, gli angoli nascosti e le storie delle sue strade storiche. Li trovi tutti direttamente sulla mappa di Europe Explorer.",
    "cta": "Esplora la Città Vecchia",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "La Città Vecchia di Praga ha tante storie da raccontare"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "Oude Stad Praag – bezienswaardigheden, astronomisch uurwerk en geschiedenis | Europe Explorer",
    "description": "Ontdek het Oude Stadsplein, het astronomische uurwerk, de Týnkerk en de historische straten van Praag met Europe Explorer.",
    "eyebrow": "PRAAG · TSJECHIË",
    "kicker": "Het historische hart van Praag",
    "hook": "De Oude Stad van Praag groeide eeuwenlang rond het Oude Stadsplein, waar gotische torens oprijzen boven een plek die werd gevormd door kroningsstoeten en beslissende momenten uit de Tsjechische geschiedenis. Van het astronomische uurwerk en de Týnkerk tot de historische Koningsroute: overal wachten monumenten en verhalen.",
    "support": "Ontdek de bekendste bezienswaardigheden van Praag, verborgen hoekjes en de verhalen achter historische straten. Je vindt ze allemaal rechtstreeks op de kaart van Europe Explorer.",
    "cta": "Verken de Oude Stad",
    "back": "Terug naar Europe Explorer",
    "tag": "ONTDEKKINGSKAART",
    "tagline": "De Oude Stad van Praag zit vol verhalen"
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
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Place', name: 'Pražské Staré Město', containedInPlace: { '@type': 'City', name: 'Prague' }, description: t.description, url: canonical }
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
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>Pražské Staré Město</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">${CENTER.lat}° N · ${CENTER.lon}° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div></section></main>
<footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer>
</div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=1800', 'x-content-type-options': 'nosniff' } })
}
