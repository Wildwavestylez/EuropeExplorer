const SITE = 'https://europe-explorer.org'
const SLUG = '/places/czechia/karlovy-vary'
const CENTER = { lat: '50.22386', lon: '12.88249', zoom: '16' }
const LANGS = {
  cs: {
    locale: 'cs_CZ',
    title: 'Karlovy Vary – světové lázně, kolonády a termální prameny | Europe Explorer',
    description: 'Poznejte Karlovy Vary, slavné lázeňské město s termálními prameny, ikonickými kolonádami a památkami zapsanými na seznamu UNESCO.',
    eyebrow: 'ZÁPADNÍ ČECHY · ČESKO',
    kicker: 'Lázeňská elegance v údolí řeky Teplé',
    hook: 'Karlovy Vary vyrostly kolem horkých minerálních pramenů, jejichž objev je podle pověsti spojen s císařem Karlem IV. Kolonády, lázeňské paláce a jedinečná atmosféra města jsou součástí světového dědictví UNESCO od roku 2021.',
    support: 'Projděte se kolem Vřídla, historických kolonád i méně známých míst a příběhů, které utvářejí zdejší lázeňskou tradici.',
    cta: 'Prozkoumat město', back: 'Zpět na Europe Explorer', tag: 'MAPA OBJEVŮ',
    tagline: 'Místa, příběhy a nečekané objevy'
  },
  de: {
    locale: 'de_DE',
    title: 'Karlsbad – UNESCO-Kurstadt mit Kolonnaden und Thermalquellen | Europe Explorer',
    description: 'Entdecke Karlsbad mit seinen heißen Mineralquellen, prachtvollen Kolonnaden und dem UNESCO-Welterbe der europäischen Kurstädte.',
    eyebrow: 'WESTBÖHMEN · TSCHECHIEN',
    kicker: 'Elegante Kurarchitektur im Tal der Teplá',
    hook: 'Karlsbad entstand rund um seine heißen Mineralquellen, deren Entdeckung der Überlieferung nach mit Kaiser Karl IV. verbunden ist. Kolonnaden, Kurpaläste und die besondere Atmosphäre der Stadt gehören seit 2021 zum UNESCO-Welterbe der Great Spa Towns of Europe.',
    support: 'Entdecke die Sprudelquelle, historische Kolonnaden und weniger bekannte Orte und Geschichten, die Karlsbads Kurtradition prägen.',
    cta: 'Stadt erkunden', back: 'Zurück zu Europe Explorer', tag: 'ENTDECKUNGSKARTE',
    tagline: 'Orte, Geschichten und unerwartete Entdeckungen'
  },
  en: {
    locale: 'en_US',
    title: 'Karlovy Vary – UNESCO spa heritage, colonnades and hot springs | Europe Explorer',
    description: 'Explore Karlovy Vary, the celebrated Czech spa town known for its thermal springs, elegant colonnades and UNESCO-listed spa heritage.',
    eyebrow: 'WEST BOHEMIA · CZECHIA',
    kicker: 'Spa elegance in the valley of the Teplá',
    hook: 'Karlovy Vary grew around its hot mineral springs, whose discovery is traditionally linked to Emperor Charles IV. Its colonnades, grand spa buildings and distinctive atmosphere have formed part of the UNESCO-listed Great Spa Towns of Europe since 2021.',
    support: 'Explore the Hot Spring, historic colonnades and quieter places and stories that reveal the town’s remarkable spa heritage.',
    cta: 'Explore the city', back: 'Back to Europe Explorer', tag: 'DISCOVERY MAP',
    tagline: 'Places, stories and unexpected discoveries'
  },
  es: {
    locale: 'es_ES',
    title: 'Karlovy Vary – balneario UNESCO, columnatas y fuentes termales | Europe Explorer',
    description: 'Descubre Karlovy Vary, la célebre ciudad balneario checa de aguas termales, elegantes columnatas y patrimonio reconocido por la UNESCO.',
    eyebrow: 'BOHEMIA OCCIDENTAL · CHEQUIA',
    kicker: 'Elegancia termal en el valle del río Teplá',
    hook: 'Karlovy Vary creció alrededor de sus fuentes minerales calientes, cuyo descubrimiento se vincula tradicionalmente con el emperador Carlos IV. Sus columnatas, edificios balnearios y su singular ambiente forman parte del conjunto de Grandes Ciudades Balneario de Europa, inscrito por la UNESCO en 2021.',
    support: 'Explora el géiser Vřídlo, las históricas columnatas y rincones e historias menos conocidos que revelan la tradición balnearia de la ciudad.',
    cta: 'Explorar la ciudad', back: 'Volver a Europe Explorer', tag: 'MAPA DE DESCUBRIMIENTOS',
    tagline: 'Lugares, historias y descubrimientos inesperados'
  },
  fr: {
    locale: 'fr_FR',
    title: 'Karlovy Vary – ville thermale UNESCO, colonnades et sources chaudes | Europe Explorer',
    description: 'Explorez Karlovy Vary, célèbre ville thermale tchèque, connue pour ses sources chaudes, ses élégantes colonnades et son patrimoine UNESCO.',
    eyebrow: 'BOHÊME DE L’OUEST · TCHÉQUIE',
    kicker: 'L’élégance thermale dans la vallée de la Teplá',
    hook: 'Karlovy Vary s’est développée autour de ses sources minérales chaudes, dont la découverte est traditionnellement associée à l’empereur Charles IV. Ses colonnades, ses palais thermaux et son atmosphère singulière font partie des Grandes villes d’eaux d’Europe inscrites à l’UNESCO depuis 2021.',
    support: 'Partez à la découverte du geyser Vřídlo, des colonnades historiques et de lieux et récits plus discrets qui racontent la tradition thermale de la ville.',
    cta: 'Explorer la ville', back: 'Retour à Europe Explorer', tag: 'CARTE DES DÉCOUVERTES',
    tagline: 'Lieux, histoires et découvertes inattendues'
  },
  it: {
    locale: 'it_IT',
    title: 'Karlovy Vary – terme UNESCO, colonnati e sorgenti termali | Europe Explorer',
    description: 'Esplora Karlovy Vary, celebre città termale ceca con sorgenti calde, eleganti colonnati e un patrimonio riconosciuto dall’UNESCO.',
    eyebrow: 'BOEMIA OCCIDENTALE · CECHIA',
    kicker: 'Eleganza termale nella valle del fiume Teplá',
    hook: 'Karlovy Vary si è sviluppata intorno alle sue sorgenti minerali calde, la cui scoperta è tradizionalmente legata all’imperatore Carlo IV. I colonnati, gli edifici termali e l’atmosfera particolare della città fanno parte delle Grandi città termali d’Europa, iscritte dall’UNESCO nel 2021.',
    support: 'Scopri il geyser Vřídlo, gli storici colonnati e luoghi e storie meno conosciuti che raccontano la tradizione termale della città.',
    cta: 'Esplora la città', back: 'Torna a Europe Explorer', tag: 'MAPPA DELLE SCOPERTE',
    tagline: 'Luoghi, storie e scoperte inaspettate'
  },
  nl: {
    locale: 'nl_NL',
    title: 'Karlovy Vary – UNESCO-kuuroord met colonnades en warmwaterbronnen | Europe Explorer',
    description: 'Ontdek Karlovy Vary, de beroemde Tsjechische kuurstad met thermale bronnen, elegante colonnades en UNESCO-werelderfgoed.',
    eyebrow: 'WEST-BOHEMEN · TSJECHIË',
    kicker: 'Kuuroordallure in het dal van de Teplá',
    hook: 'Karlovy Vary ontwikkelde zich rond de hete mineraalbronnen, waarvan de ontdekking volgens de overlevering verbonden is met keizer Karel IV. De colonnades, kuurpaleizen en bijzondere sfeer van de stad maken sinds 2021 deel uit van het UNESCO-werelderfgoed Great Spa Towns of Europe.',
    support: 'Ontdek de geiser Vřídlo, historische colonnades en minder bekende plekken en verhalen die de kuurtraditie van de stad laten zien.',
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
  const jsonLd = { '@context': 'https://schema.org', '@type': 'City', name: 'Karlovy Vary', alternateName: ['Karlsbad', 'Carlsbad'], containedInPlace: { '@type': 'AdministrativeArea', name: 'Karlovy Vary Region' }, description: t.description, url: canonical }
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
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>Karlovy Vary</h1><p class="hook">${escapeHtml(t.hook)}</p></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">50.2239° N · 12.8825° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div><div class="action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></section></main>
<footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer>
</div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=1800', 'x-content-type-options': 'nosniff' } })
}
