import { getSql } from '../../api/_lib/db.js'

const SITE = 'https://europe-explorer.org'
const PATH = '/places/czechia/ceske-budejovice'

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char])
}

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim()
}

function renderFact(fact, featured = false) {
  const title = cleanText(fact?.title || fact?.name || '')
  const body = cleanText(fact?.text || fact?.description || '')
  if (!title || !body) return ''
  return `<article class="fact${featured ? ' featured' : ''}">
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
  </article>`
}

// Editorial order for visitors. This is deliberately independent of the
// internal postal-area records and their database order.
const FEATURE_ORDER = [
  'Historické centrum a náměstí Přemysla Otakara II.',
  'Samsonova kašna',
  'Černá věž',
  'Katedrála svatého Mikuláše',
  'Barokní radnice na hlavním náměstí',
  'Dominikánský klášter a kostel Obětování Panny Marie',
  'Solnice – městská sýpka a zbrojnice',
  'Masné krámy – historická městská tržnice',
  'Středověké opevnění: Rabenštejnská věž a Železná panna',
  'Jihočeské muzeum',
  'Jihočeské divadlo',
  'Muzeum koněspřežky ve strážním domku č. 1',
  'Budějovický Budvar: český akciový pivovar založený roku 1895',
]

export async function onRequestGet(context) {
  try {
    const sql = getSql(context)
    const rows = await sql`
      SELECT COALESCE(record->'content', record) AS content
      FROM public.czechia_cap_records
      WHERE workflow_status = 'published' AND content_version = 5
        AND COALESCE(record->'content', record)->>'city' = 'České Budějovice'
    `

    if (!rows.length) {
      return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } })
    }

    // Postal codes remain an internal storage/association layer. Only curated
    // visitor-facing stories are selected and displayed on this landing page.
    const byTitle = new Map()
    for (const row of rows) {
      const facts = row.content?.translations?.cs?.facts
      if (!Array.isArray(facts)) continue
      for (const fact of facts) {
        const title = cleanText(fact?.title || fact?.name || '')
        if (title && !byTitle.has(title)) byTitle.set(title, fact)
      }
    }

    const featured = FEATURE_ORDER
      .map(title => byTitle.get(title))
      .filter(Boolean)

    const description = 'Objevte České Budějovice, královské město založené Přemyslem Otakarem II. roku 1265. Poznejte Černou věž, Samsonovu kašnu, historické náměstí a další památky.'
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'City',
      name: 'České Budějovice',
      alternateName: 'Budweis',
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Jihočeský kraj' },
      description,
      url: SITE + PATH,
      touristType: ['History', 'Culture', 'Architecture'],
    }

    const featuredHtml = featured.map((fact, index) => renderFact(fact, index < 3)).join('')
    const html = `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>České Budějovice – památky, historie a co navštívit | Europe Explorer</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${SITE + PATH}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Europe Explorer">
<meta property="og:locale" content="cs_CZ">
<meta property="og:title" content="České Budějovice – památky, historie a co navštívit">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${SITE + PATH}">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
<style>
:root{color-scheme:light;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172536;background:#f5f7fa}
*{box-sizing:border-box}body{margin:0}.hero{background:linear-gradient(135deg,#101c2b,#25475b);color:#fff;padding:76px 22px 68px}.wrap{max-width:960px;margin:auto}.eyebrow{color:#b7d7e5;text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:700}.hero h1{font-size:clamp(38px,7vw,68px);line-height:1.04;margin:16px 0}.hero p{max-width:720px;color:#e0eaf0;font-size:19px;line-height:1.7}.crumb{font-size:13px;color:#c0d1dc;margin-bottom:30px}.crumb a{color:inherit}.content{padding:42px 22px 68px}.intro{font-size:18px;line-height:1.85;max-width:850px}.intro strong{color:#172f43}.section-title{font-size:30px;margin:48px 0 10px}.section-lead{color:#607182;line-height:1.7;margin:0 0 24px}.highlights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.fact{background:#fff;border:1px solid #e0e7ed;border-radius:16px;padding:22px 24px;box-shadow:0 5px 22px #14283a09}.fact.featured{border-color:#c9d9e3}.fact h3{font-size:20px;margin:0 0 10px;color:#18344a}.fact p{line-height:1.8;margin:0;color:#405163}.cta{background:#e8f0f5;border-radius:18px;padding:28px;margin-top:48px}.cta a{display:inline-block;background:#142638;color:#fff;text-decoration:none;border-radius:9px;padding:12px 17px;margin-top:8px}.foot{padding:26px 22px;background:#101c2b;color:#b9c8d5;font-size:13px}.foot a{color:#fff}@media(max-width:650px){.highlights{grid-template-columns:1fr}.hero{padding-top:48px}}
</style>
</head>
<body>
<header class="hero"><div class="wrap">
<div class="crumb"><a href="/">Europe Explorer</a> / Česko / České Budějovice</div>
<div class="eyebrow">Jižní Čechy · Královské město</div>
<h1>České Budějovice</h1>
<p>Město velkého náměstí, barokní kašny a věže, která už po staletí bdí nad jeho střechami.</p>
</div></header>
<main class="content wrap">
<p class="intro"><strong>České Budějovice založil roku 1265 český král Přemysl Otakar II.</strong> Nové královské město mělo strategickou polohu na soutoku Vltavy a Malše a rychle se stalo významným hospodářským i správním centrem jižních Čech. Jeho příběh dodnes vypráví pravidelné historické centrum, rozlehlé náměstí Přemysla Otakara II., Samsonova kašna i téměř dvaasedmdesát metrů vysoká Černá věž.</p>
<h2 class="section-title">To nejznámější z Českých Budějovic</h2>
<p class="section-lead">Začněte v historickém srdci města. Tohle jsou místa, která stojí za to poznat jako první.</p>
<section class="highlights">
${featuredHtml || '<p>Turistické zajímavosti právě připravujeme.</p>'}
</section>
<section class="cta"><h2>Objevujte dál</h2><p>Vydejte se s Europe Explorer za dalšími místy, památkami a příběhy napříč Evropou.</p><a href="/">Otevřít interaktivní mapu</a></section>
</main>
<footer class="foot"><div class="wrap">Europe Explorer · Objevujte Evropu místo po místě · <a href="/">Zpět na hlavní stránku</a></div></footer>
</body></html>`

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300, s-maxage=1800',
        'x-content-type-options': 'nosniff',
      },
    })
  } catch (error) {
    console.error(JSON.stringify({ service: 'europe-explorer', operation: 'seo-city-page', error: error?.message || String(error) }))
    return new Response('Page temporarily unavailable', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    })
  }
}
