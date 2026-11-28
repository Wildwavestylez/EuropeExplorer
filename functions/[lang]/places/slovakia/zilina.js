const SITE='https://europe-explorer.org'
const SLUG='/places/slovakia/zilina'
const CENTER={lat:'49.2231',lon:'18.7394',zoom:'17'}
const NAME="Žilina"
const ALT="Zsolna"
const LANGS={
  "cs": {
    "locale": "cs_SK",
    "title": "Žilina – historické náměstí a brána do Malé Fatry | Europe Explorer",
    "description": "Poznejte Žilinu, město s podloubím Mariánského náměstí, barokními památkami a hradem Budatín.",
    "eyebrow": "Žilina · Slovensko",
    "kicker": "Podloubí historického Mariánského náměstí",
    "hook": "Žilina zaujme Mariánským náměstím s podloubími, barokním kostelem sv. Pavla a nedalekým Budatínským hradem na soutoku Váhu a Kysuce.",
    "support": "Poznejte historické srdce města i příběhy regionu Horního Pováží.",
    "cta": "Prozkoumat město",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Místa, příběhy a nečekané objevy"
  },
  "de": {
    "locale": "de_SK",
    "title": "Žilina – historischer Platz und Tor zur Kleinen Fatra | Europe Explorer",
    "description": "Entdecke Žilina mit den Arkaden des Mariánske námestie, barocken Sehenswürdigkeiten und der Burg Budatín.",
    "eyebrow": "Žilina · Slowakei",
    "kicker": "Arkaden am historischen Mariánske námestie",
    "hook": "Žilina begeistert mit dem Arkadenplatz Mariánske námestie, der barocken Pauluskirche und der Burg Budatín am Zusammenfluss von Waag und Kysuca.",
    "support": "Entdecke das historische Herz der Stadt und die Geschichten der Region Oberwaag.",
    "cta": "Stadt erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Orte, Geschichten und unerwartete Entdeckungen"
  },
  "en": {
    "locale": "en_US",
    "title": "Žilina – historic arcades and a gateway to Malá Fatra | Europe Explorer",
    "description": "Discover Žilina, with the arcades of Mariánske Square, Baroque landmarks and Budatín Castle.",
    "eyebrow": "Žilina · Slovakia",
    "kicker": "Arcades of historic Mariánske Square",
    "hook": "Žilina is known for the arcaded Mariánske Square, its Baroque Church of St Paul and nearby Budatín Castle at the meeting of the Váh and Kysuca rivers.",
    "support": "Explore the city’s historic heart and the stories of the Upper Váh region.",
    "cta": "Explore the city",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and unexpected discoveries"
  },
  "es": {
    "locale": "es_ES",
    "title": "Žilina – soportales históricos y puerta a Malá Fatra | Europe Explorer",
    "description": "Descubre Žilina, con los soportales de Mariánske námestie, monumentos barrocos y el castillo de Budatín.",
    "eyebrow": "Žilina · Eslovaquia",
    "kicker": "Soportales de la histórica plaza Mariánske",
    "hook": "Žilina destaca por la plaza porticada Mariánske námestie, la iglesia barroca de San Pablo y el cercano castillo de Budatín, junto a la confluencia de los ríos Váh y Kysuca.",
    "support": "Explora el corazón histórico de la ciudad y las historias de la región del Alto Váh.",
    "cta": "Explorar la ciudad",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "Lugares, historias y descubrimientos inesperados"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "Žilina – arcades historiques et porte de la Petite Fatra | Europe Explorer",
    "description": "Découvrez Žilina, ses arcades de Mariánske námestie, ses monuments baroques et le château de Budatín.",
    "eyebrow": "Žilina · Slovaquie",
    "kicker": "Arcades de la place historique Mariánske",
    "hook": "Žilina séduit par les arcades de la place Mariánske námestie, son église baroque Saint-Paul et le château voisin de Budatín, au confluent du Váh et de la Kysuca.",
    "support": "Explorez le cœur historique de la ville et les récits de la région de la Haute-Váh.",
    "cta": "Explorer la ville",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "Lieux, histoires et découvertes inattendues"
  },
  "it": {
    "locale": "it_IT",
    "title": "Žilina – portici storici e porta della Piccola Fatra | Europe Explorer",
    "description": "Scopri Žilina, con i portici di Mariánske námestie, monumenti barocchi e il castello di Budatín.",
    "eyebrow": "Žilina · Slovacchia",
    "kicker": "Portici della storica piazza Mariánske",
    "hook": "Žilina è nota per i portici di Mariánske námestie, la chiesa barocca di San Paolo e il vicino castello di Budatín, alla confluenza dei fiumi Váh e Kysuca.",
    "support": "Esplora il cuore storico della città e le storie della regione dell’Alto Váh.",
    "cta": "Esplora la città",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "Luoghi, storie e scoperte inaspettate"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "Žilina – historische arcaden en toegangspoort tot Malá Fatra | Europe Explorer",
    "description": "Ontdek Žilina, met de arcaden van het Mariánske-plein, barokke monumenten en kasteel Budatín.",
    "eyebrow": "Žilina · Slowakije",
    "kicker": "Arcaden van het historische Mariánske-plein",
    "hook": "Žilina staat bekend om de arcaden van het Mariánske-plein, de barokke Sint-Pauluskerk en het nabijgelegen kasteel Budatín aan de samenvloeiing van de Váh en Kysuca.",
    "support": "Ontdek het historische hart van de stad en de verhalen van de Boven-Váhstreek.",
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
