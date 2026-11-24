import { getSql, json, errorResponse, isValidCountry } from './_lib/db.js'
export async function onRequestGet(context) {
  try {
    const country = String(new URL(context.request.url).searchParams.get('country') || '').toUpperCase()
    if (country === 'DE') return json({ places: [], country, published: false })
    if (!isValidCountry(country)) return json({ error: 'Unsupported country.' }, 400)
    const sql = getSql(context)
    let rows
    if (country === 'CZ') rows = await sql`
      SELECT postcode, COALESCE(record->'content', record) AS content
      FROM public.czechia_cap_records WHERE workflow_status='published' AND content_version=5 ORDER BY postcode
    `
    else if (country === 'IT') rows = await sql`
      SELECT postcode, record AS content FROM public.italy_cap_records
      WHERE workflow_status='published' AND record->>'status'='published' AND record->>'data_version'='5' ORDER BY postcode
    `
    else rows = await sql`
      SELECT postcode, record AS content FROM public.slovakia_cap_records
      WHERE workflow_status='published' AND record->>'status'='published' AND record->>'data_version'='5' ORDER BY postcode
    `
    const places = rows.map(({ postcode, content }) => ({
      id: country + ':' + postcode, country_code: country, postal_code: String(postcode),
      city: content?.city || '', municipality: content?.city || '', district: content?.district || '',
      region: content?.state || '', county: content?.county || '',
      latitude: content?.representative_point?.lat ?? null, longitude: content?.representative_point?.lon ?? null,
      status: 'published', data_version: 5,
    }))
    return json({ country, places, published: true })
  } catch (error) { return errorResponse(error) }
}
