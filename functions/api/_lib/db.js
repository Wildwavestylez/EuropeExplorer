import { neon } from '@neondatabase/serverless'

export function getSql(context) {
  if (!context.env.DATABASE_URL) throw new Error('DATABASE_URL secret is not configured')
  return neon(context.env.DATABASE_URL)
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60, s-maxage=300',
    },
  })
}

export function errorResponse(error, request, operation = 'unknown') {
  // Keep database details out of the public response, but emit structured
  // diagnostics so Cloudflare Workers Observability can identify the cause.
  console.error(JSON.stringify({
    service: 'europe-explorer-api',
    operation,
    path: request ? new URL(request.url).pathname : null,
    errorName: error?.name || 'Error',
    errorMessage: error?.message || String(error),
    errorCode: error?.code || error?.cause?.code || null,
    errorDetail: error?.detail || error?.cause?.message || null,
    stack: error?.stack || null,
  }))
  return json({ error: 'Data service temporarily unavailable.' }, 500)
}

export const TABLES = Object.freeze({
  IT: 'italy_cap_records',
  CZ: 'czechia_cap_records',
  SK: 'slovakia_cap_records',
})

export function isValidCountry(code) {
  return Object.hasOwn(TABLES, code)
}
