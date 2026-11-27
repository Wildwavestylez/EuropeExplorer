import { getSql } from './_lib/db.js'

const LANGUAGES = new Set(['en', 'de', 'cs', 'es', 'fr', 'it', 'nl'])
const CATEGORIES = new Set(['bug', 'map', 'data', 'translation', 'idea', 'other'])

function response(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}

async function checkRateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP')
  if (!ip || !globalThis.caches?.default || !globalThis.crypto?.subtle) return false
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))
  const key = [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, '0')).join('')
  // Cache API keys must use this site's hostname; an external synthetic hostname
  // can make cache.put fail in Cloudflare and prevent every report from being saved.
  const cacheKeyUrl = new URL('/__internal-rate-limit/error-report/' + key, request.url)
  const cacheKey = new Request(cacheKeyUrl.toString())
  const cache = caches.default
  if (await cache.match(cacheKey)) return true
  await cache.put(cacheKey, new Response('1', {
    headers: { 'cache-control': 'public, max-age=60' },
  }))
  return false
}

export async function onRequestPost(context) {
  let stage = 'request-validation'
  let databaseIdentity = null
  try {
    const request = context.request
    const origin = request.headers.get('Origin')
    if (origin && new URL(origin).origin !== new URL(request.url).origin) {
      return response({ error: 'Cross-origin requests are not accepted.' }, 403)
    }
    if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
      return response({ error: 'Expected a JSON request.' }, 415)
    }
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > 12000) return response({ error: 'Report is too large.' }, 413)

    stage = 'read-request-body'
    const body = await request.json()
    // Quietly accept bot submissions that fill the hidden honeypot.
    if (String(body.website || '').trim()) return response({ ok: true })
    if (Number(body.elapsedMs) < 1500) return response({ error: 'Please take a moment to describe the issue.' }, 400)
    stage = 'rate-limit-check'
    if (await checkRateLimit(request)) return response({ error: 'Please wait a minute before sending another report.' }, 429)

    const category = String(body.category || '')
    const message = String(body.message || '').trim()
    const language = String(body.language || 'en')
    const pageUrl = String(body.pageUrl || '').slice(0, 2048)
    const countryCode = String(body.countryCode || '').slice(0, 2).toUpperCase() || null
    const postalCode = String(body.postalCode || '').slice(0, 16) || null
    const lat = Number.isFinite(Number(body.lat)) ? Number(body.lat) : null
    const lon = Number.isFinite(Number(body.lon)) ? Number(body.lon) : null

    if (!CATEGORIES.has(category)) return response({ error: 'Please choose a report category.' }, 400)
    if (message.length < 10 || message.length > 4000) return response({ error: 'The description must contain 10 to 4,000 characters.' }, 400)
    if (!LANGUAGES.has(language)) return response({ error: 'Unsupported language.' }, 400)
    if (lat !== null && (lat < -90 || lat > 90)) return response({ error: 'Invalid map latitude.' }, 400)
    if (lon !== null && (lon < -180 || lon > 180)) return response({ error: 'Invalid map longitude.' }, 400)

    stage = 'database-connection-and-insert'
    const sql = getSql(context)
    const identityRows = await sql`SELECT current_user AS role, current_database() AS database`
    databaseIdentity = identityRows[0] || null
    const rows = await sql`
      INSERT INTO public.error_reports
        (category, message, contact_email, language, page_url, country_code, postal_code, map_lat, map_lon)
      VALUES
        (${category}, ${message}, NULL, ${language}, ${pageUrl || null},
         ${countryCode}, ${postalCode}, ${lat}, ${lon})
      RETURNING id
    `
    stage = 'database-insert-complete'
    return response({ ok: true, reportId: rows[0].id }, 201)
  } catch (error) {
    console.error(JSON.stringify({
      service: 'europe-explorer-api',
      operation: 'report-submit',
      path: new URL(context.request.url).pathname,
      errorName: error?.name || 'Error',
      errorMessage: error?.message || String(error),
      errorCode: error?.code || error?.cause?.code || null,
      errorDetail: error?.detail || error?.cause?.message || null,
      stage,
      stack: error?.stack || null,
    }))
    const diagnosticId = globalThis.crypto?.randomUUID?.() || String(Date.now())
    return response({
      error: 'The report could not be saved right now. Please try again later.',
      diagnostic: { id: diagnosticId, stage, errorName: error?.name || 'Error', errorCode: error?.code || error?.cause?.code || null, errorMessage: String(error?.message || error || '').slice(0, 300), errorDetail: String(error?.detail || error?.cause?.message || '').slice(0, 300) || null, databaseRole: databaseIdentity?.role || null, databaseName: databaseIdentity?.database || null }
    }, 500)
  }
}
