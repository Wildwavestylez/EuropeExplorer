const SITE='https://europe-explorer.org'
const SLUG="/places/italy/rome"
const CENTER={lat:"41.9009",lon:"12.4833",zoom:"14"}
const NAME_BY_LANG={"cs":"Řím","de":"Rom","en":"Rome","es":"Roma","fr":"Rome","it":"Roma","nl":"Rome"}
const LANGS={
  "cs": {
    "locale": "cs_IT",
    "title": "Řím – antické dědictví, slavná náměstí a příběhy | Europe Explorer",
    "description": "Poznejte Řím od Kolosea a Fora Romana přes historické centrum až po Vatikán a Trastevere. Objevujte italskou metropoli po přirozených městských oblastech.",
    "kicker": "Věčné město – objevované po čtvrtích",
    "hook": "Řím není jen seznam slavných památek. Koloseum a Forum Romanum vyprávějí příběh antické říše, historické centrum spojuje Pantheon, náměstí a barokní fontány a za Tiberou čeká Vatikán i živé čtvrti na pravém břehu.",
    "support": "Vyberte si římskou oblast podle toho, co vás zajímá. Mapa Europe Exploreru vám pomůže objevovat památky i zajímavosti v jejich skutečných souvislostech.",
    "cta": "Prozkoumat Řím",
    "back": "Zpět na Řím",
    "tag": "DISCOVERY MAP",
    "tagline": "Explore Rome by area"
  },
  "de": {
    "locale": "de_IT",
    "title": "Rom – antikes Erbe, berühmte Plätze und Geschichten | Europe Explorer",
    "description": "Entdecke Rom vom Kolosseum und Forum Romanum über das historische Zentrum bis zum Vatikan und nach Trastevere.",
    "kicker": "Die Ewige Stadt – Viertel für Viertel",
    "hook": "Rom ist weit mehr als eine Liste berühmter Sehenswürdigkeiten. Kolosseum und Forum Romanum erzählen von der Antike, im historischen Zentrum liegen Pantheon, Plätze und barocke Brunnen, jenseits des Tibers warten Vatikan und lebendige Viertel.",
    "support": "Wähle ein römisches Viertel nach deinen Interessen. Die Europe-Explorer-Karte zeigt bekannte Sehenswürdigkeiten und lokale Entdeckungen in ihrem räumlichen Zusammenhang.",
    "cta": "Rom erkunden",
    "back": "Zurück nach Rom",
    "tag": "DISCOVERY MAP",
    "tagline": "Explore Rome by area"
  },
  "en": {
    "locale": "en_IT",
    "title": "Rome – ancient heritage, iconic squares and stories | Europe Explorer",
    "description": "Explore Rome from the Colosseum and Roman Forum to the historic centre, Vatican and Trastevere, organised by walkable areas.",
    "kicker": "The Eternal City, explored area by area",
    "hook": "Rome is more than a checklist of famous sights. The Colosseum and Roman Forum tell the story of the ancient city; the historic centre gathers the Pantheon, grand squares and Baroque fountains, while across the Tiber lie the Vatican and lively neighbourhoods.",
    "support": "Choose a part of Rome that matches your interests. The Europe Explorer map brings famous landmarks and local discoveries together in their real geographic context.",
    "cta": "Explore Rome",
    "back": "Back to Rome",
    "tag": "DISCOVERY MAP",
    "tagline": "Explore Rome by area"
  },
  "es": {
    "locale": "es_IT",
    "title": "Roma – legado antiguo, plazas emblemáticas e historias | Europe Explorer",
    "description": "Explora Roma desde el Coliseo y el Foro Romano hasta el centro histórico, el Vaticano y Trastevere.",
    "kicker": "La Ciudad Eterna, zona por zona",
    "hook": "Roma es mucho más que una lista de monumentos. El Coliseo y el Foro Romano cuentan la historia antigua; el centro histórico reúne el Panteón, grandes plazas y fuentes barrocas, y al otro lado del Tíber esperan el Vaticano y barrios llenos de vida.",
    "support": "Elige una zona de Roma según tus intereses. El mapa de Europe Explorer reúne monumentos conocidos y descubrimientos locales en su contexto geográfico real.",
    "cta": "Explorar Roma",
    "back": "Volver a Roma",
    "tag": "DISCOVERY MAP",
    "tagline": "Explore Rome by area"
  },
  "fr": {
    "locale": "fr_IT",
    "title": "Rome – héritage antique, places emblématiques et récits | Europe Explorer",
    "description": "Explorez Rome, du Colisée et du Forum romain au centre historique, au Vatican et à Trastevere.",
    "kicker": "La Ville éternelle, quartier par quartier",
    "hook": "Rome ne se résume pas à une liste de monuments. Le Colisée et le Forum racontent l’Antiquité ; le centre historique réunit le Panthéon, de grandes places et des fontaines baroques, tandis qu’au-delà du Tibre se trouvent le Vatican et des quartiers animés.",
    "support": "Choisissez un quartier de Rome selon vos envies. La carte Europe Explorer rassemble monuments célèbres et découvertes locales dans leur véritable contexte géographique.",
    "cta": "Explorer Rome",
    "back": "Retour à Rome",
    "tag": "DISCOVERY MAP",
    "tagline": "Explore Rome by area"
  },
  "it": {
    "locale": "it_IT",
    "title": "Roma – eredità antica, piazze iconiche e storie | Europe Explorer",
    "description": "Esplora Roma dal Colosseo e dal Foro Romano al centro storico, al Vaticano e a Trastevere.",
    "kicker": "La Città Eterna, quartiere per quartiere",
    "hook": "Roma è molto più di un elenco di monumenti. Colosseo e Foro Romano raccontano la città antica; il centro storico riunisce Pantheon, grandi piazze e fontane barocche, mentre oltre il Tevere si trovano il Vaticano e quartieri vivaci.",
    "support": "Scegli la zona di Roma che più ti interessa. La mappa di Europe Explorer riunisce monumenti famosi e scoperte locali nel loro reale contesto geografico.",
    "cta": "Esplora Roma",
    "back": "Torna a Roma",
    "tag": "DISCOVERY MAP",
    "tagline": "Explore Rome by area"
  },
  "nl": {
    "locale": "nl_IT",
    "title": "Rome – antiek erfgoed, beroemde pleinen en verhalen | Europe Explorer",
    "description": "Verken Rome van het Colosseum en Forum Romanum tot het historische centrum, het Vaticaan en Trastevere.",
    "kicker": "De Eeuwige Stad, wijk voor wijk",
    "hook": "Rome is meer dan een lijst beroemde bezienswaardigheden. Het Colosseum en Forum Romanum vertellen het verhaal van de oudheid; in het historische centrum liggen het Pantheon, grote pleinen en barokke fonteinen, terwijl aan de overkant van de Tiber het Vaticaan en levendige wijken wachten.",
    "support": "Kies een deel van Rome dat bij je interesses past. De kaart van Europe Explorer brengt bekende bezienswaardigheden en lokale ontdekkingen samen in hun echte geografische context.",
    "cta": "Verken Rome",
    "back": "Terug naar Rome",
    "tag": "DISCOVERY MAP",
    "tagline": "Explore Rome by area"
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
 const jsonLd={'@context':'https://schema.org','@type':"City",name:NAME,containedInPlace:{'@type':'City',name:'Rome'},description:t.description,url:canonical}
 const links=AREA_LINKS[lang].map((a,i)=>'<a class="area-link" href="'+a.href+'"><span class="area-number">0'+(i+1)+'</span><span>'+escapeHtml(a.label)+'</span><span aria-hidden="true">↗</span></a>').join('')
 const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(t.title)}</title><meta name="description" content="${escapeHtml(t.description)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="x-default" href="${SITE}/en${SLUG}">${alternates}<meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="website"><meta property="og:site_name" content="Europe Explorer"><meta property="og:locale" content="${t.locale}"><meta property="og:title" content="${escapeHtml(t.title)}"><meta property="og:description" content="${escapeHtml(t.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g,'\\\\u003c')}</script><style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#e9edf0;background:#101c2b;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#101c2b}.shell{max-width:1800px;margin:auto;min-height:100vh}.topbar{min-height:76px;padding:12px clamp(22px,5.5vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #263647;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#f4f1e9;text-decoration:none;font:800 13px Manrope,sans-serif;letter-spacing:2px;white-space:nowrap}.mark{width:34px;height:34px;border:1px solid #496071;border-radius:50%;display:grid;place-items:center;color:#f2a65a;font-size:19px}.brand-light{font-weight:500;color:#9aabb7;margin-left:4px}.languages{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.languages a{padding:7px 8px;color:#81919d;text-decoration:none;font:10px 'DM Mono',monospace;border-radius:4px}.languages a:hover,.languages a.active{color:#f2a65a;background:#263647}.hero{position:relative;overflow:hidden;min-height:0;padding:clamp(44px,7vw,88px) clamp(24px,10vw,160px);display:flex;align-items:center;background:radial-gradient(ellipse at 78% 45%,#1e3548 0,transparent 42%),linear-gradient(115deg,#142334,#172b3e 65%,#101c2b)}.copy{max-width:820px;position:relative;z-index:2}.eyebrow,.kicker,.visual-label{font:10px 'DM Mono',monospace;letter-spacing:1.2px;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:10px;color:#f2a65a}.eyebrow:before{content:'';width:25px;height:1px;background:#f2a65a}.kicker{margin-top:20px;color:#9aabb7}.hero h1{font:600 clamp(40px,5.6vw,72px)/1.06 Manrope,sans-serif;letter-spacing:-2.5px;color:#f4f1e9;margin:15px 0 18px}.hook{max-width:760px;color:#c3cdd3;font-size:clamp(16px,1.65vw,19px);line-height:1.68;margin:0}.hero-action{margin-top:20px}.cta{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:16px 22px;background:#f2a65a;color:#172536;text-decoration:none;font:700 13px Manrope,sans-serif;border-radius:3px;min-width:230px;min-height:54px}.cta span{font-size:19px}.art{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:min(31vw,390px);height:300px;opacity:.8}.orb{position:absolute;inset:32px 50px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#42647a,#203b50 58%,#172a3b);box-shadow:inset -20px -12px 35px #0b1724,0 0 65px #294b6144}.grid{position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(0deg,transparent 0 27px,#b1c1c51c 28px 29px),repeating-linear-gradient(90deg,transparent 0 27px,#b1c1c51c 28px 29px);transform:rotate(-18deg)}.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#f2a65a;box-shadow:0 0 0 7px #f2a65a25}.pin.one{top:83px;left:166px}.pin.two{top:153px;left:243px}.pin.three{top:194px;left:112px}.explore{padding:36px clamp(24px,10vw,160px) 58px}.explore h2{font:600 clamp(22px,3vw,31px) Manrope,sans-serif;color:#f0eee8;margin:0 0 13px}.explore p{font-size:15px;line-height:1.8;color:#aab7c0;margin:0;max-width:780px}.area-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:26px}.area-link{display:flex;align-items:center;gap:16px;padding:18px 20px;border:1px solid #304355;border-radius:5px;color:#e9edf0;text-decoration:none;font:600 14px Manrope,sans-serif;min-height:64px}.area-link:hover{border-color:#f2a65a;color:#f2a65a}.area-number{font:11px 'DM Mono',monospace;color:#f2a65a}.area-link span:last-child{margin-left:auto;color:#f2a65a}.foot{padding:20px clamp(22px,5.5vw,90px);border-top:1px solid #293b4c;display:flex;justify-content:space-between;gap:20px;align-items:center;color:#81919d;font:10px 'DM Mono',monospace;letter-spacing:.7px;text-transform:uppercase}.foot a{color:#c4d0d7;text-decoration:none}@media(max-width:650px){.topbar{align-items:flex-start;flex-direction:column;padding:12px 18px}.languages{justify-content:flex-start}.hero{padding:38px 23px 42px}.hero h1{font-size:clamp(38px,11vw,52px);letter-spacing:-1.8px}.hook{font-size:16px;line-height:1.6}.hero-action{margin-top:17px}.cta{width:100%}.art{right:-155px;top:55%;opacity:.14}.explore{padding:30px 23px 40px}.area-list{grid-template-columns:1fr}.foot{align-items:flex-start;flex-direction:column}}
</style></head><body><div class="shell"><header class="topbar"><a class="brand" href="/"><span class="mark">✳</span><span>EUROPE EXPLORER<span class="brand-light"> / DISCOVER</span></span></a><nav class="languages" aria-label="Language">${languageLinks}</nav></header><main><section class="hero"><div class="copy"><div class="eyebrow">ROME · ITALY</div><div class="kicker">${escapeHtml(t.kicker)}</div><h1>${escapeHtml(NAME)}</h1><p class="hook">${escapeHtml(t.hook)}</p><div class="hero-action"><a class="cta" href="${mapUrl(lang)}">${escapeHtml(t.cta)} <span aria-hidden="true">↗</span></a></div></div><div class="art" aria-hidden="true"><div class="orb"><div class="grid"></div><i class="pin one"></i><i class="pin two"></i><i class="pin three"></i></div></div></section><section class="explore"><h2>${escapeHtml(t.tagline)}</h2><p>${escapeHtml(t.support)}</p><nav class="area-list" aria-label="Rome areas">${links}</nav></section></main><footer class="foot"><span>EUROPE EXPLORER · BUILT FOR THE CURIOUS</span><a href="/${lang}/places/italy/rome">${escapeHtml(t.back)} ↗</a></footer></div></body></html>`
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300, s-maxage=1800','x-content-type-options':'nosniff'}})
}
