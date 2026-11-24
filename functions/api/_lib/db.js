import { neon } from '@neondatabase/serverless'
export function getSql(context) {
  if (!context.env.DATABASE_URL) throw new Error('DATABASE_URL secret is not configured')
  return neon(context.env.DATABASE_URL)
}
export function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=60, s-maxage=300' } })
}
export function errorResponse(error) {
  console.error('[Europe Explorer API]', error)
  return json({ error: 'Data service temporarily unavailable.' }, 500)
}
export const TABLES = Object.freeze({ IT: 'italy_cap_records', CZ: 'czechia_cap_records', SK: 'slovakia_cap_records' })
export function isValidCountry(code) { return Object.hasOwn(TABLES, code) }
