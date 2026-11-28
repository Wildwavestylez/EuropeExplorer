const SITE='https://europe-explorer.org'
const SLUG="/places/italy/rome/centro-storico"
const CENTER={lat:"41.8986",lon:"12.4769",zoom:"16"}
const NAME_BY_LANG={"cs":"Historické centrum Říma","de":"Roms historisches Zentrum","en":"Rome Historic Centre","es":"Centro histórico de Roma","fr":"Centre historique de Rome","it":"Centro storico di Roma","nl":"Historisch centrum van Rome"}
const LANGS={
  "cs": {
    "locale": "cs_IT",
    "title": "Historické centrum Říma – Pantheon, Trevi a Piazza Navona | Europe Explorer",
    "description": "Pantheon, Fontána di Trevi, Piazza Navona a Campo de' Fiori patří do husté sítě historických ulic v centru Říma.",
    "kicker": "Nejznámější náměstí a památky blízko sebe",
    "hook": "Tady se Řím poznává pěšky: Pantheon, Piazza Navona, Fontána di Trevi i Campo de' Fiori leží v kompaktní síti ulic a náměstí. Jednotlivá místa můžeš spojit do jedné procházky bez dlouhých přesunů.",
    "support": "Prozkoumejte slavné památky i méně známá místa a příběhy, které se skrývají v ulicích Říma.",
    "cta": "Prozkoumat oblast",
    "back": "Zpět na Řím",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and local discoveries"
  },
  "de": {
    "locale": "de_IT",
    "title": "Roms historisches Zentrum – Pantheon, Trevi und Piazza Navona | Europe Explorer",
    "description": "Pantheon, Trevi-Brunnen, Piazza Navona und Campo de’ Fiori liegen im dichten historischen Zentrum Roms.",
    "kicker": "Berühmte Plätze und Sehenswürdigkeiten nah beieinander",
    "hook": "Hier lässt sich Rom zu Fuß entdecken: Pantheon, Piazza Navona, Trevi-Brunnen und Campo de’ Fiori liegen in einem kompakten Netz aus Gassen und Plätzen.",
    "support": "Entdecke berühmte Sehenswürdigkeiten ebenso wie weniger bekannte Orte und Geschichten in den Straßen Roms.",
    "cta": "Gebiet erkunden",
    "back": "Zurück nach Rom",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and local discoveries"
  },
  "en": {
    "locale": "en_IT",
    "title": "Rome Historic Centre – Pantheon, Trevi Fountain and Piazza Navona | Europe Explorer",
    "description": "Discover the Pantheon, Trevi Fountain, Piazza Navona and Campo de’ Fiori in Rome’s walkable historic centre.",
    "kicker": "Iconic squares and sights within easy reach",
    "hook": "This is Rome at its most walkable: the Pantheon, Piazza Navona, Trevi Fountain and Campo de’ Fiori sit within a compact network of streets and squares, easy to combine in one stroll.",
    "support": "Discover celebrated landmarks alongside lesser-known places and stories hidden in Rome’s streets.",
    "cta": "Explore this area",
    "back": "Back to Rome",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and local discoveries"
  },
  "es": {
    "locale": "es_IT",
    "title": "Centro histórico de Roma – Panteón, Trevi y Piazza Navona | Europe Explorer",
    "description": "Descubre el Panteón, la Fontana di Trevi, Piazza Navona y Campo de’ Fiori en el centro histórico de Roma.",
    "kicker": "Plazas y monumentos emblemáticos muy cerca",
    "hook": "Aquí Roma se descubre a pie: el Panteón, Piazza Navona, la Fontana di Trevi y Campo de’ Fiori forman una red compacta de calles y plazas que puedes recorrer en un mismo paseo.",
    "support": "Descubre monumentos famosos y también lugares menos conocidos e historias escondidas en las calles de Roma.",
    "cta": "Explorar la zona",
    "back": "Volver a Roma",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and local discoveries"
  },
  "fr": {
    "locale": "fr_IT",
    "title": "Centre historique de Rome – Panthéon, Trevi et Piazza Navona | Europe Explorer",
    "description": "Découvrez le Panthéon, la fontaine de Trevi, la Piazza Navona et Campo de’ Fiori dans le centre historique de Rome.",
    "kicker": "Places et monuments emblématiques à deux pas",
    "hook": "C’est ici que Rome se découvre à pied : le Panthéon, la Piazza Navona, la fontaine de Trevi et Campo de’ Fiori s’inscrivent dans un réseau compact de rues et de places.",
    "support": "Découvrez les grands monuments ainsi que des lieux moins connus et les histoires cachées dans les rues de Rome.",
    "cta": "Explorer le quartier",
    "back": "Retour à Rome",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and local discoveries"
  },
  "it": {
    "locale": "it_IT",
    "title": "Centro storico di Roma – Pantheon, Trevi e Piazza Navona | Europe Explorer",
    "description": "Scopri Pantheon, Fontana di Trevi, Piazza Navona e Campo de’ Fiori nel centro storico di Roma.",
    "kicker": "Piazze e monumenti iconici a pochi passi",
    "hook": "Qui Roma si scopre a piedi: Pantheon, Piazza Navona, Fontana di Trevi e Campo de’ Fiori si trovano in una rete compatta di strade e piazze, ideale per una passeggiata.",
    "support": "Scopri i monumenti più celebri, ma anche luoghi meno conosciuti e storie nascoste tra le strade di Roma.",
    "cta": "Esplora la zona",
    "back": "Torna a Roma",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and local discoveries"
  },
  "nl": {
    "locale": "nl_IT",
    "title": "Historisch centrum van Rome – Pantheon, Trevifontein en Piazza Navona | Europe Explorer",
    "description": "Ontdek het Pantheon, de Trevifontein, Piazza Navona en Campo de’ Fiori in het historische centrum van Rome.",
    "kicker": "Beroemde pleinen en bezienswaardigheden op loopafstand",
    "hook": "Hier ontdek je Rome te voet: het Pantheon, Piazza Navona, de Trevifontein en Campo de’ Fiori liggen in een compact netwerk van straten en pleinen.",
    "support": "Ontdek beroemde bezienswaardigheden en minder bekende plekken en verhalen die in de straten van Rome verborgen liggen.",
    "cta": "Verken dit gebied",
    "back": "Terug naar Rome",
    "tag": "DISCOVERY MAP",
    "tagline": "Places, stories and local discoveries"
  }
}
const SUPPORTED=Object.keys(LANGS)
const AREA_LINKS={"cs":[{"href":"/cs/places/italy/rome/ancient-rome","label":"Antický Řím"},{"href":"/cs/places/italy/rome/centro-storico","label":"Historické centrum"},{"href":"/cs/places/italy/rome/vatican","label":"Vatikán"},{"href":"/cs/places/italy/rome/trastevere","label":"Trastevere"},{"href":"/cs/places/italy/rome/tridente-borghese","label":"Severní Řím a Villa Borghese"}],"de":[{"href":"/de/places/italy/rome/ancient-rome","label":"Das antike Rom"},{"href":"/de/places/italy/rome/centro-storico","label":"Historisches Zentrum"},{"href":"/de/places/italy/rome/vatican","label":"Vatikan"},{"href":"/de/places/italy/rome/trastevere","label":"Trastevere"},{"href":"/de/places/italy/rome/tridente-borghese","label":"Nördliches Rom und Villa Borghese"}],"en":[{"href":"/en/places/italy/rome/ancient-rome","label":"Ancient Rome"},{"href":"/en/places/italy/rome/centro-storico","label":"Historic Centre"},{"href":"/en/places/italy/rome/vatican","label":"The Vatican"},{"href":"/en/places/italy/rome/trastevere","label":"Trastevere"},{"href":"/en/places/italy/rome/tridente-borghese","label":"Northern Rome & Villa Borghese"}],"es":[{"href":"/es/places/italy/rome/ancient-rome","label":"Roma antigua"},{"href":"/es/places/italy/rome/centro-storico","label":"Centro histórico"},{"href":"/es/places/italy/rome/vatican","label":"El Vaticano"},{"href":"/es/places/italy/rome/trastevere","label":"Trastevere"},{"href":"/es/places/italy/rome/tridente-borghese","label":"Norte de Roma y Villa Borghese"}],"fr":[{"href":"/fr/places/italy/rome/ancient-rome","label":"Rome antique"},{"href":"/fr/places/italy/rome/centro-storico","label":"Centre historique"},{"href":"/fr/places/italy/rome/vatican","label":"Le Vatican"},{"href":"/fr/places/italy/rome/trastevere","label":"Trastevere"},{"href":"/fr/places/italy/rome/tridente-borghese","label":"Rome du Nord et Villa Borghese"}],"it":[{"href":"/it/places/italy/rome/ancient-rome","label":"Roma antica"},{"href":"/it/places/italy/rome/centro-storico","label":"Centro storico"},{"href":"/it/places/italy/rome/vatican","label":"Vaticano"},{"href":"/it/places/italy/rome/trastevere","label":"Trastevere"},{"href":"/it/places/italy/rome/tridente-borghese","label":"Roma nord e Villa Borghese"}],"nl":[{"href":"/nl/places/italy/rome/ancient-rome","label":"Het oude Rome"},{"href":"/nl/places/italy/rome/centro-storico","label":"Historisch centrum"},{"href":"/nl/places/italy/rome/vatican","label":"Het Vaticaan"},{"href":"/nl/places/italy/rome/trastevere","label":"Trastevere"},{"href":"/nl/places/italy/rome/tridente-borghese","label":"Noord-Rome en Villa Borghese"}]}
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function mapUrl(lang){const params=new URLSearchParams({view:'map',country:'IT',lat:CENTER.lat,lon:CENTER.lon,zoom:CENTER.zoom,lang});return '/?'+params.toString()}
export async function onRequestGet({params}){
 const lang=SUPPORTED.includes(String(params.lang||'').toLowerCase())?String(params.lang).toLowerCase():null
 if(!lang)return new Response('Not found',{status:404,headers:{'content-type':'text/plain; charset=utf-8'}})
 const t=LANGS[lang],NAME=NAME_BY_LANG[lang],canonical=SITE+'/'+lang+SLUG
 const alternates=SUPPORTED.map(code=>'<link rel="alternate" hreflang="'+code+'" href="'+SITE+'/'+code+SLUG+'">').join('\\n')
 const languageLinks=SUPPORTED.map(code=>'<a href="/'+code+SLUG+'" hreflang="'+code+'" lang="'+code+'"'+(code===lang?' aria-current="page" class="active"':'')+'>'+code.toUpperCase()+'</a>').join('')
 const jsonLd={'@context':'https://schema.org','@type':"Place",name:NAME,containedInPlace:{'@type':'City',name:'Rome'},description:t.description,url:canonical}
 const links='<a class="area-link" href="/'+lang+'/places/italy/rome"><span class="area-number">←</span><span>'+escapeHtml(t.back)+'</span><span aria-hidden="true">↗</span></a>'
 const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(t.title)}</title><meta name="description" content="${escapeHtml(t.description)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="x-default" href="${SITE}/en${SLUG}">${alternates}<meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="website"><meta property="og:site_name" content="Europe Explorer"><meta property="og:locale" content="${t.locale}"><meta property="og:title" content="${escapeHtml(t.title)}"><meta property="og:description" content="${escapeHtml(t.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g,'\\\\u003c')}</script><style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:0;padding:clamp(44px,7vw,88px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:820px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:20px;color:#9aabb7}.hero h1{font:600 clamp(40px,5.6vw,72px)/1.06 Manrope,sans-serif;letter-spacing:-2.5px;color:#f4f1e9;margin:15px 0 18px}.hook{max-width:760px;color:#c3cdd3;font-size:clamp(16px,1.65vw,19px);line-height:1.68;margin:0}.hero-action{margin-top:20px}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:230px;min-height:54px}.cta span{font-size:19px}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.8}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.explore{padding:36px clamp(24px,10vw,160px) 58px}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:780px}.area-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:26px}.area-link{display:flex;align-items:center;gap:16px;padding:18px 20px;border:1px solid #304355;border-radius:5px;color:#e9edf0;text-decoration:none;font:600 14px Manrope,sans-serif;min-height:64px}.area-link:hover{border-color:#f2a65a;color:#f2a65a}.area-number{font:11px 'DM Mono',monospace;color:#f2a65a}.area-link span:last-child{margin-left:auto;color:#f2a65a}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}@media(max-width:650px){.topbar{align-items:flex-start;flex-direction:column;padding:12px 18px}.languages{justify-content:flex-start}.hero{padding:38px 23px 42px}.hero h1{font-size:clamp(38px,11vw,52px);letter-spacing:-1.8px}.hook{font-size:16px;line-height:1.6}.hero-action{margin-top:17px}.cta{width:100%}.art{right:-155px;top:55%;opacity:.14}.explore{padding:30px 23px 40px}.area-list{grid-template-columns:1fr}.foot{align-items:flex-start;flex-direction:column}}
</style></head><body><div class="shell"><header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header><main><section class="hero"><div class="copy"><div class="eyebrow">ROME · ITALY</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>${escapeHtml(NAME)}</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div></div></section><section class="explore"><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p><nav class="area-list" aria-label="Rome areas">${links}</nav></section></main><footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/${lang}/places/italy/rome">${escapeHtml(t.back)} ↗</a></footer></div></body></html>`
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300, s-maxage=1800','x-content-type-options':'nosniff'}})
}
