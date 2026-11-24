import { getSql, json, errorResponse, isValidCountry } from './_lib/db.js'
export async function onRequestGet(context) {
  try {
    const params = new URL(context.request.url).searchParams
    const country = String(params.get('country') || '').toUpperCase()
    const postcode = String(params.get('postcode') || '').trim()
    if (country === 'DE') return json({ error: 'This postal area has not been published to Neon yet.' }, 404)
    if (!isValidCountry(country)) return json({ error: 'Unsupported country.' }, 400)
    if (!/^\d{5}$/.test(postcode)) return json({ error: 'Invalid postal code.' }, 400)
    const sql = getSql(context)
    let rows
    if (country === 'CZ') rows = await sql`
      SELECT COALESCE(record->'content', record) AS content FROM public.czechia_cap_records
      WHERE postcode=${postcode} AND workflow_status='published' AND content_version=5 LIMIT 1
    `
    else if (country === 'IT') rows = await sql`
      SELECT record AS content FROM public.italy_cap_records WHERE postcode=${postcode}
      AND workflow_status='published' AND record->>'status'='published' AND record->>'data_version'='5' LIMIT 1
    `
    else rows = await sql`
      SELECT record AS content FROM public.slovakia_cap_records WHERE postcode=${postcode}
      AND workflow_status='published' AND record->>'status'='published' AND record->>'data_version'='5' LIMIT 1
    `
    if (!rows.length) return json({ error: 'Published V5 record not found.' }, 404)
    return json({ country, postcode, content: rows[0].content })
  } catch (error) { return errorResponse(error) }
}
