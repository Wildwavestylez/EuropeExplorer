const SITE='https://europe-explorer.org'
const SLUG='/places/czechia/trebic'
const CENTER={lat:'49.2149',lon:'15.8817',zoom:'16'}
const NAME="Třebíč"
const LANGS={
  "cs": {
    "locale": "cs_CZ",
    "title": "Třebíč – Příběh soužití židovské a křesťanské kultury | Europe Explorer",
    "description": "Třebíč uchovává mimořádné svědectví o soužití židovské a křesťanské komunity. Židovská čtvrť, starý židovský hřbitov a románsko-gotická bazilika sv. Prokop",
    "eyebrow": "VYSOČINA · ČESKO",
    "kicker": "Příběh soužití židovské a křesťanské kultury",
    "hook": "Třebíč uchovává mimořádné svědectví o soužití židovské a křesťanské komunity. Židovská čtvrť, starý židovský hřbitov a románsko-gotická bazilika sv. Prokopa tvoří jedinečný soubor zapsaný na seznamu UNESCO.",
    "support": "Poznejte známá místa i méně objevené zajímavosti a místní příběhy, které dávají tomuto místu jeho jedinečný charakter.",
    "cta": "Prozkoumat město",
    "back": "Zpět na Europe Explorer",
    "tag": "MAPA OBJEVŮ",
    "tagline": "Místa, příběhy a nečekané objevy"
  },
  "de": {
    "locale": "de_DE",
    "title": "Třebíč – Das Erbe jüdischer und christlicher Kultur | Europe Explorer",
    "description": "Třebíč bewahrt ein außergewöhnliches Zeugnis des Zusammenlebens jüdischer und christlicher Gemeinschaften. Das jüdische Viertel, der alte jüdische Friedhof",
    "eyebrow": "HOCHLAND · TSCHECHIEN",
    "kicker": "Das Erbe jüdischer und christlicher Kultur",
    "hook": "Třebíč bewahrt ein außergewöhnliches Zeugnis des Zusammenlebens jüdischer und christlicher Gemeinschaften. Das jüdische Viertel, der alte jüdische Friedhof und die romanisch-gotische Basilika des heiligen Prokop bilden ein einzigartiges UNESCO-Welterbe.",
    "support": "Entdecke bekannte Sehenswürdigkeiten ebenso wie weniger bekannte Orte und lokale Geschichten, die diesem Ort seinen besonderen Charakter verleihen.",
    "cta": "Stadt erkunden",
    "back": "Zurück zu Europe Explorer",
    "tag": "ENTDECKUNGSKARTE",
    "tagline": "Orte, Geschichten und unerwartete Entdeckungen"
  },
  "en": {
    "locale": "en_US",
    "title": "Třebíč – A story of Jewish and Christian heritage | Europe Explorer",
    "description": "Třebíč preserves an exceptional record of Jewish and Christian communities living side by side. The Jewish Quarter, the old Jewish cemetery and the Romanes",
    "eyebrow": "VYSOČINA · CZECHIA",
    "kicker": "A story of Jewish and Christian heritage",
    "hook": "Třebíč preserves an exceptional record of Jewish and Christian communities living side by side. The Jewish Quarter, the old Jewish cemetery and the Romanesque-Gothic Basilica of St Procopius form a remarkable UNESCO World Heritage ensemble.",
    "support": "Explore celebrated landmarks alongside lesser-known places and local stories that reveal the destination’s distinctive character.",
    "cta": "Explore the city",
    "back": "Back to Europe Explorer",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and unexpected discoveries"
  },
  "es": {
    "locale": "es_ES",
    "title": "Třebíč – Un legado de convivencia judía y cristiana | Europe Explorer",
    "description": "Třebíč conserva un testimonio excepcional de la convivencia entre las comunidades judía y cristiana. El barrio judío, el antiguo cementerio judío y la basí",
    "eyebrow": "VYSOČINA · CHEQUIA",
    "kicker": "Un legado de convivencia judía y cristiana",
    "hook": "Třebíč conserva un testimonio excepcional de la convivencia entre las comunidades judía y cristiana. El barrio judío, el antiguo cementerio judío y la basílica románico-gótica de San Procopio forman un conjunto singular declarado Patrimonio Mundial por la UNESCO.",
    "support": "Descubre monumentos conocidos, rincones menos visitados e historias locales que revelan el carácter propio de este destino.",
    "cta": "Explorar la ciudad",
    "back": "Volver a Europe Explorer",
    "tag": "MAPA DE DESCUBRIMIENTOS",
    "tagline": "Lugares, historias y descubrimientos inesperados"
  },
  "fr": {
    "locale": "fr_FR",
    "title": "Třebíč – Un héritage juif et chrétien partagé | Europe Explorer",
    "description": "Třebíč conserve un témoignage exceptionnel de la coexistence des communautés juive et chrétienne. Le quartier juif, l’ancien cimetière juif et la basilique",
    "eyebrow": "VYSOČINA · TCHÉQUIE",
    "kicker": "Un héritage juif et chrétien partagé",
    "hook": "Třebíč conserve un témoignage exceptionnel de la coexistence des communautés juive et chrétienne. Le quartier juif, l’ancien cimetière juif et la basilique romano-gothique Saint-Procope forment un ensemble remarquable inscrit au patrimoine mondial de l’UNESCO.",
    "support": "Découvrez les monuments célèbres, des lieux moins connus et les histoires locales qui donnent à cette destination son caractère singulier.",
    "cta": "Explorer la ville",
    "back": "Retour à Europe Explorer",
    "tag": "CARTE DES DÉCOUVERTES",
    "tagline": "Lieux, histoires et découvertes inattendues"
  },
  "it": {
    "locale": "it_IT",
    "title": "Třebíč – Un’eredità condivisa ebraica e cristiana | Europe Explorer",
    "description": "Třebíč conserva una testimonianza eccezionale della convivenza tra le comunità ebraica e cristiana. Il quartiere ebraico, l’antico cimitero ebraico e la ba",
    "eyebrow": "VYSOČINA · CECHIA",
    "kicker": "Un’eredità condivisa ebraica e cristiana",
    "hook": "Třebíč conserva una testimonianza eccezionale della convivenza tra le comunità ebraica e cristiana. Il quartiere ebraico, l’antico cimitero ebraico e la basilica romanico-gotica di San Procopio formano un notevole complesso patrimonio UNESCO.",
    "support": "Scopri i monumenti più noti, angoli meno conosciuti e storie locali che rivelano il carattere unico di questa destinazione.",
    "cta": "Esplora la città",
    "back": "Torna a Europe Explorer",
    "tag": "MAPPA DELLE SCOPERTE",
    "tagline": "Luoghi, storie e scoperte inaspettate"
  },
  "nl": {
    "locale": "nl_NL",
    "title": "Třebíč – Een gedeeld joods en christelijk erfgoed | Europe Explorer",
    "description": "Třebíč bewaart een uitzonderlijk getuigenis van het samenleven van joodse en christelijke gemeenschappen. De Joodse wijk, de oude Joodse begraafplaats en d",
    "eyebrow": "VYSOČINA · TSJECHIË",
    "kicker": "Een gedeeld joods en christelijk erfgoed",
    "hook": "Třebíč bewaart een uitzonderlijk getuigenis van het samenleven van joodse en christelijke gemeenschappen. De Joodse wijk, de oude Joodse begraafplaats en de romaans-gotische Sint-Procopiusbasiliek vormen samen een bijzonder UNESCO-werelderfgoed.",
    "support": "Ontdek bekende bezienswaardigheden, minder bekende plekken en lokale verhalen die deze bestemming haar bijzondere karakter geven.",
    "cta": "Verken de stad",
    "back": "Terug naar Europe Explorer",
    "tag": "ONTDEKKINGSKAART",
    "tagline": "Plekken, verhalen en onverwachte ontdekkingen"
  }
}
const SUPPORTED=Object.keys(LANGS)
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function mapUrl(lang){const params=new URLSearchParams({view:'map',country:'CZ',lat:CENTER.lat,lon:CENTER.lon,zoom:CENTER.zoom,lang});return '/?'+params.toString()}
export async function onRequestGet({params}){
 const lang=SUPPORTED.includes(String(params.lang||'').toLowerCase())?String(params.lang).toLowerCase():null
 if(!lang)return new Response('Not found',{status:404,headers:{'content-type':'text/plain; charset=utf-8'}})
 const t=LANGS[lang],canonical=SITE+'/'+lang+SLUG
 const alternates=SUPPORTED.map(code=>'<link rel="alternate" hreflang="'+code+'" href="'+SITE+'/'+code+SLUG+'">').join('\\n')
 const languageLinks=SUPPORTED.map(code=>'<a href="/'+code+SLUG+'" hreflang="'+code+'" lang="'+code+'"'+(code===lang?' aria-current="page" class="active"':'')+'>'+code.toUpperCase()+'</a>').join('')
 const jsonLd={'@context':'https://schema.org','@type':'City',name:NAME,containedInPlace:{'@type':'Country',name:'Czechia'},description:t.description,url:canonical}
 const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(t.title)}</title><meta name="description" content="${escapeHtml(t.description)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="x-default" href="${SITE}/en${SLUG}">${alternates}<meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="website"><meta property="og:site_name" content="Europe Explorer"><meta property="og:locale" content="${t.locale}"><meta property="og:title" content="${escapeHtml(t.title)}"><meta property="og:description" content="${escapeHtml(t.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g,'\\\\u003c')}</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh;background:#101c2b}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:470px;padding:clamp(48px,7vw,88px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:800px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:24px;color:#9aabb7}.hero h1{font:600 clamp(42px,6vw,76px)/1.05 Manrope,sans-serif;letter-spacing:-3px;color:#f4f1e9;margin:16px 0 18px}.hook{max-width:760px;color:#c3cdd3;font-size:clamp(16px,1.7vw,19px);line-height:1.72;margin:0}.hero-action{margin-top:22px;display:flex;justify-content:flex-start}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:230px;min-height:52px;transition:background .15s,transform .15s}.cta:hover{background:#ffc17d;transform:translateY(-2px)}.cta span{font-size:19px}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.92}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.orbit{position:absolute;left:14px;top:93px;width:360px;height:130px;border:1px solid #e3a35c66;border-radius:50%;transform:rotate(-28deg)}.orbit.two{transform:rotate(34deg);border-color:#8fa9b744}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.visual-label{position:absolute;color:#d2a36f;font-size:9px}.visual-label.a{right:0;top:15px}.visual-label.b{left:0;bottom:13px}.explore{padding:45px clamp(24px,10vw,160px) 64px}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;letter-spacing:-.7px;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:760px}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}.foot a:hover{color:#f2a65a}@media(max-width:850px){.art{right:-55px;opacity:.25}.hero{min-height:420px}.explore{padding-top:36px}}@media(max-width:520px){.topbar{align-items:flex-start;flex-direction:column}.languages{justify-content:flex-start}.hero{padding:38px 23px 42px;min-height:0}.hero h1{letter-spacing:-1.8px;margin:14px 0}.hook{font-size:16px;line-height:1.62}.hero-action{margin-top:18px}.cta{width:100%}.art{right:-155px;top:52%;opacity:.17}.explore{padding:30px 23px 42px}.foot{align-items:flex-start;flex-direction:column}}
</style></head><body><div class="shell"><header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header><main><section class="hero"><div class="copy"><div class="eyebrow">${escapeHtml(t.eyebrow)}</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>${escapeHtml(NAME)}</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div><div class="orbit"></div><div class="orbit two"></div><span class="visual-label a">${escapeHtml(t.tag)}</span><span class="visual-label b">${CENTER.lat}° N · ${CENTER.lon}° E</span></div></section><section class="explore"><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p></section></main><footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/">${escapeHtml(t.back)} ↗</a></footer></div></body></html>`
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300, s-maxage=1800','x-content-type-options':'nosniff'}})
}
