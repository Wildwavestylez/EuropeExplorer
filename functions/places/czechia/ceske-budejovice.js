import { getSql } from '../../api/_lib/db.js'

const SITE = 'https://europe-explorer.org'
const PATH = '/places/czechia/ceske-budejovice'
const LANG_NAME = 'cs'

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char])
}

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim()
}

function renderFact(fact) {
  const title = cleanText(fact?.title || fact?.name || '')
  const body = cleanText(fact?.text || fact?.description || '')
  if (!title || !body) return ''
  return `<article class="fact"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`
}

export async function onRequestGet(context) {
  try {
    const sql = getSql(context)
    const rows = await sql`
      SELECT postcode, COALESCE(record->'content', record) AS content
      FROM public.czechia_cap_records
      WHERE workflow_status = 'published' AND content_version = 5
        AND COALESCE(record->'content', record)->>'city' = 'České Budějovice'
      ORDER BY postcode
    `

    if (!rows.length) {
      return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } })
    }

    const areas = rows.map(({ postcode, content }) => {
      const translations = content?.translations || {}
      const localized = translations[LANG_NAME] || translations.en || {}
      const facts = Array.isArray(localized.facts) ? localized.facts : []
      const representative = cleanText(content?.representative_place || '')
      return { postcode: String(postcode), district: cleanText(content?.district || ''), representative, facts }
    })

    const factsHtml = areas.map(area => {
      const selectedFacts = area.facts.slice(0, 3).map(renderFact).join('')
      return `<section class="area" id="psc-${escapeHtml(area.postcode)}">
        <div class="area-label">PSČ ${escapeHtml(area.postcode)}</div>
        ${area.district ? `<h2>${escapeHtml(area.district)}</h2>` : ''}
        ${area.representative ? `<p class="representative">Orientační místo: ${escapeHtml(area.representative)}</p>` : ''}
        ${selectedFacts || '<p>Další místní zajímavosti postupně doplňujeme.</p>'}
      </section>`
    }).join('')

    const description = 'Objevte České Budějovice: historické centrum, Černou věž, Samsonovu kašnu a místní příběhy. Prozkoumejte zajímavosti podle PSČ na mapě Europe Explorer.'
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

    const html = `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>České Budějovice – památky, historie a zajímavosti podle PSČ | Europe Explorer</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${SITE + PATH}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Europe Explorer">
<meta property="og:locale" content="cs_CZ">
<meta property="og:title" content="České Budějovice – památky, historie a zajímavosti">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${SITE + PATH}">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
<style>
:root{color-scheme:light;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172536;background:#f5f7fa}
*{box-sizing:border-box}body{margin:0}.hero{background:#101c2b;color:#fff;padding:64px 22px 56px}.wrap{max-width:900px;margin:auto}.eyebrow{color:#9fc6d8;text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:700}.hero h1{font-size:clamp(34px,6vw,58px);line-height:1.08;margin:16px 0}.hero p{max-width:680px;color:#d7e2eb;font-size:18px;line-height:1.65}.crumb{font-size:13px;color:#a9c3d4;margin-bottom:24px}.crumb a{color:inherit}.content{padding:38px 22px 64px}.intro{font-size:17px;line-height:1.8;max-width:780px}.toc{display:flex;flex-wrap:wrap;gap:9px;margin:26px 0 42px}.toc a{background:#e6edf3;border:1px solid #d4e0e9;border-radius:999px;padding:9px 13px;color:#24435a;text-decoration:none;font-size:14px}.area{border-top:1px solid #d8e0e7;padding:28px 0}.area-label{font-size:12px;font-weight:800;letter-spacing:.12em;color:#52758d}.area h2{font-size:25px;margin:8px 0}.representative{font-size:13px;color:#64748b}.fact{background:#fff;border:1px solid #e0e7ed;border-radius:14px;padding:20px 22px;margin:14px 0;box-shadow:0 4px 16px #14283a08}.fact h3{font-size:19px;margin:0 0 9px}.fact p{line-height:1.75;margin:0;color:#405163}.cta{background:#e8f0f5;border-radius:18px;padding:26px;margin-top:40px}.cta a{display:inline-block;background:#142638;color:#fff;text-decoration:none;border-radius:9px;padding:12px 17px;margin-top:8px}.foot{padding:26px 22px;background:#101c2b;color:#b9c8d5;font-size:13px}.foot a{color:#fff}
</style>
</head>
<body>
<header class="hero"><div class="wrap">
<div class="crumb"><a href="/">Europe Explorer</a> / Česko / České Budějovice</div>
<div class="eyebrow">Objevujte jižní Čechy</div>
<h1>České Budějovice</h1>
<p>Královské město s bohatou historií, výraznými památkami a příběhy, které se ukrývají v jednotlivých městských čtvrtích.</p>
</div></header>
<main class="content wrap">
<p class="intro">České Budějovice založil roku 1265 Přemysl Otakar II. Jejich historické centrum, rozlehlé náměstí Přemysla Otakara II., Samsonova kašna i Černá věž připomínají význam někdejšího královského města. Europe Explorer představuje místní zajímavosti v kontextu poštovních oblastí – od historického jádra až po městské části a jejich okolí.</p>
<nav class="toc" aria-label="Poštovní oblasti">${areas.map(area => `<a href="#psc-${encodeURIComponent(area.postcode)}">PSČ ${escapeHtml(area.postcode)}</a>`).join('')}</nav>
<h2>Místní příběhy a zajímavosti podle PSČ</h2>
${factsHtml}
<section class="cta"><h2>Pokračujte v objevování</h2><p>Podívejte se na další místa a příběhy v interaktivní mapě Europe Explorer.</p><a href="/">Otevřít interaktivní mapu</a></section>
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
