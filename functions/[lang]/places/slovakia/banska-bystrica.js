const SITE='https://europe-explorer.org'
const SLUG='/places/slovakia/banska-bystrica'
const CENTER={lat:'48.7360',lon:'19.1454',zoom:'17'}
const NAME="Banská Bystrica"
const ALT="Neusohl"
const LANGS={
  "cs": {
    "locale": "cs_SK",
    "title": "Banská Bystrica – město mědi a povstalecké historie | Europe Explorer",
    "description": "Poznejte Banskou Bystrici, historické hornické město s náměstím SNP, Hodinovou věží a příběhem Slovenského národního povstání.",
    "eyebrow": "Banská Bystrica · Slovensko",
    "kicker": "Město mědi a povstalecké historie",
    "hook": "Banská Bystrica vyrostla díky těžbě mědi. Její historické srdce tvoří náměstí SNP s Hodinovou věží a měšťanskými domy; město je také úzce spjato se Slovenským národním povstáním.",
    "support": "Prozkoumejte historické centrum a příběhy, které formovaly střední Slovensko.",
    "cta": "Prozkoumat město",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Místa, příběhy a nečekané objevy"
  },
  "de": {
    "locale": "de_SK",
    "title": "Banská Bystrica – Kupferstadt mit bewegter Geschichte | Europe Explorer",
    "description": "Entdecke Banská Bystrica, die historische Bergbaustadt mit SNP-Platz, Uhrturm und der Geschichte des Slowakischen Nationalaufstands.",
    "eyebrow": "Banská Bystrica · Slowakei",
    "kicker": "Kupferstadt mit bewegter Geschichte",
    "hook": "Banská Bystrica wuchs durch den Kupferbergbau. Das historische Herz bildet der SNP-Platz mit Uhrturm und Bürgerhäusern; die Stadt ist eng mit dem Slowakischen Nationalaufstand verbunden.",
    "support": "Entdecke die Altstadt und die Geschichten, die die Mittelslowakei geprägt haben.",
    "cta": "Stadt erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Orte, Geschichten und unerwartete Entdeckungen"
  },
  "en": {
    "locale": "en_US",
    "title": "Banská Bystrica – a copper town shaped by history | Europe Explorer",
    "description": "Discover Banská Bystrica, a historic mining town with SNP Square, the Clock Tower and the story of the Slovak National Uprising.",
    "eyebrow": "Banská Bystrica · Slovakia",
    "kicker": "A copper town shaped by history",
    "hook": "Banská Bystrica grew wealthy through copper mining. Its historic heart is SNP Square, lined with burgher houses and watched over by the Clock Tower. The city is closely linked to the Slovak National Uprising.",
    "support": "Explore the historic centre and the stories that shaped central Slovakia.",
    "cta": "Explore the city",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and unexpected discoveries"
  },
  "es": {
    "locale": "es_ES",
    "title": "Banská Bystrica – ciudad del cobre y de una historia decisiva | Europe Explorer",
    "description": "Descubre Banská Bystrica, ciudad minera histórica con la plaza SNP, la Torre del Reloj y la historia del Levantamiento Nacional Eslovaco.",
    "eyebrow": "Banská Bystrica · Eslovaquia",
    "kicker": "Ciudad del cobre y de una historia decisiva",
    "hook": "Banská Bystrica prosperó gracias a la minería del cobre. Su corazón histórico es la plaza SNP, con casas burguesas y la Torre del Reloj. La ciudad está estrechamente vinculada al Levantamiento Nacional Eslovaco.",
    "support": "Explora el centro histórico y las historias que marcaron Eslovaquia central.",
    "cta": "Explorar la ciudad",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "Lugares, historias y descubrimientos inesperados"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "Banská Bystrica – ville du cuivre et de mémoire | Europe Explorer",
    "description": "Découvrez Banská Bystrica, ville minière historique avec la place SNP, la tour de l’Horloge et l’histoire du soulèvement national slovaque.",
    "eyebrow": "Banská Bystrica · Slovaquie",
    "kicker": "Ville du cuivre et de mémoire",
    "hook": "Banská Bystrica s’est développée grâce à l’extraction du cuivre. Son cœur historique est la place SNP, bordée de maisons bourgeoises et dominée par la tour de l’Horloge. La ville est liée au soulèvement national slovaque.",
    "support": "Explorez le centre historique et les récits qui ont façonné la Slovaquie centrale.",
    "cta": "Explorer la ville",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "Lieux, histoires et découvertes inattendues"
  },
  "it": {
    "locale": "it_IT",
    "title": "Banská Bystrica – città del rame e della memoria | Europe Explorer",
    "description": "Scopri Banská Bystrica, storica città mineraria con piazza SNP, Torre dell’Orologio e la storia della Rivolta nazionale slovacca.",
    "eyebrow": "Banská Bystrica · Slovacchia",
    "kicker": "Città del rame e della memoria",
    "hook": "Banská Bystrica prosperò grazie all’estrazione del rame. Il suo cuore storico è la piazza SNP, circondata da case borghesi e dominata dalla Torre dell’Orologio. La città è legata alla Rivolta nazionale slovacca.",
    "support": "Esplora il centro storico e le storie che hanno plasmato la Slovacchia centrale.",
    "cta": "Esplora la città",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "Luoghi, storie e scoperte inaspettate"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "Banská Bystrica – kopermijnstad met een bewogen verleden | Europe Explorer",
    "description": "Ontdek Banská Bystrica, een historische mijnstad met het SNP-plein, de Klokkentoren en het verhaal van de Slowaakse Nationale Opstand.",
    "eyebrow": "Banská Bystrica · Slowakije",
    "kicker": "Kopermijnstad met een bewogen verleden",
    "hook": "Banská Bystrica groeide dankzij de kopermijnbouw. Het historische hart is het SNP-plein met burgerhuizen en de markante Klokkentoren. De stad is nauw verbonden met de Slowaakse Nationale Opstand.",
    "support": "Verken het historische centrum en de verhalen die Midden-Slowakije hebben gevormd.",
    "cta": "Verken de stad",
    "back": "Terug naar Europe Explorer",
    "tag": "ONTDEKKINGSKAART",
    "tagline": "Plekken, verhalen en onverwachte ontdekkingen"
  }
}
const SUPPORTED=Object.keys(LANGS)
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function mapUrl(lang){const params=new URLSearchParams({view:'map',country:'SK',lat:CENTER.lat,lon:CENTER.lon,zoom:CENTER.zoom,lang});return '/?'+params.toString()}
export async function onRequestGet({params}){
 const lang=SUPPORTED.includes(String(params.lang||'').toLowerCase())?String(params.lang).toLowerCase():null
 if(!lang)return new Response('Not found',{status:404,headers:{'content-type':'text/plain; charset=utf-8'}})
 const t=LANGS[lang],canonical=SITE+'/'+lang+SLUG
 const alternates=SUPPORTED.map(code=>'<link rel="alternate" hreflang="'+code+'" href="'+SITE+'/'+code+SLUG+'">').join('\n')
 const languageLinks=SUPPORTED.map(code=>'<a href="/'+code+SLUG+'" hreflang="'+code+'" lang="'+code+'"'+(code===lang?' aria-current="page" class="active"':'')+'>'+code.toUpperCase()+'</a>').join('')
 const jsonLd={'@context':'https://schema.org','@type':'City',name:NAME,alternateName:ALT,containedInPlace:{'@type':'Country',name:'Slovakia'},description:t.description,url:canonical}
 const html=`<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(t.title)}</title><meta name="description" content="${escapeHtml(t.description)}">
<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="x-default" href="${SITE}/en${SLUG}">${alternates}
<meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="website"><meta property="og:site_name" content="Europe Explorer"><meta property="og:locale" content="${t.locale}"><meta property="og:title" content="${escapeHtml(t.title)}"><meta property="og:description" content="${escapeHtml(t.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g,'\\u003c')}</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh;background:#101c2b}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:0;padding:clamp(44px,7vw,88px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:800px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:20px;color:#9aabb7}.hero h1{font:600 clamp(40px,5.6vw,72px)/1.06 Manrope,sans-serif;letter-spacing:-2.5px;color:#f4f1e9;margin:15px 0 18px}.hook{max-width:760px;color:#c3cdd3;font-size:clamp(16px,1.65vw,19px);line-height:1.68;margin:0}.hero-action{margin-top:20px;display:flex;justify-content:flex-start}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:230px;min-height:54px}.cta:hover{background:#ffc17d}.cta span{font-size:19px}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.85}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.orbit{position:absolute;left:14px;top:93px;width:360px;height:130px;border:1px solid #e3a35c66;border-radius:50%;transform:rotate(-28deg)}.orbit.two{transform:rotate(34deg);border-color:#8fa9b744}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.visual-label{position:absolute;color:#d2a36f;font-size:9px}.visual-label.a{right:0;top:15px}.visual-label.b{left:0;bottom:13px}.explore{padding:38px clamp(24px,10vw,160px) 56px;display:grid;grid-template-columns:1fr;gap:18px}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:760px}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}@media(max-width:850px){.art{right:-55px;opacity:.22}}@media(max-width:520px){.topbar{align-items:flex-start;flex-direction:column;padding:12px 18px}.languages{justify-content:flex-start}.hero{padding:40px 23px 42px}.hero h1{font-size:clamp(38px,11vw,52px);letter-spacing:-1.8px;margin-bottom:15px}.kicker{margin-top:16px}.hook{font-size:16px;line-height:1.6}.hero-action{margin-top:17px}.cta{width:100%}.art{right:-155px;top:55%;opacity:.15}.explore{padding:30px 23px 40px}.foot{align-items:flex-start;flex-direction:column}}
</style></head><body><div class="shell">
<header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header>
<main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>${escapeHtml(NAME)}</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">${CENTER.lat}° N · ${CENTER.lon}° E</span></div></section>
<section class="explore"><div><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></div></section></main><footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer></div></body></html>`
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300, s-maxage=1800','x-content-type-options':'nosniff'}})
}
