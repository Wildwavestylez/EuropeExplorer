import { getSql, json, errorResponse } from './_lib/db.js'

export async function onRequestGet(context) {
  try {
    const sql = getSql(context)
    const rows = await sql`
      WITH published AS (
        SELECT 'CZ'::text AS country_code, postcode,
          COALESCE(record->'content', record) AS content
        FROM public.czechia_cap_records
        WHERE workflow_status='published' AND content_version=5
        UNION ALL
        SELECT 'IT'::text, postcode, record
        FROM public.italy_cap_records
        WHERE workflow_status='published' AND record->>'status'='published' AND record->>'data_version'='5'
        UNION ALL
        SELECT 'SK'::text, postcode, record
        FROM public.slovakia_cap_records
        WHERE workflow_status='published' AND record->>'status'='published' AND record->>'data_version'='5'
      ), candidates AS (
        SELECT p.country_code, p.postcode, p.content,
          f AS fact,
          (f->'location'->>'lat')::double precision AS lat,
          (f->'location'->>'lon')::double precision AS lon
        FROM published p
        CROSS JOIN LATERAL jsonb_array_elements(
          CASE WHEN jsonb_typeof(p.content->'facts')='array' THEN p.content->'facts' ELSE '[]'::jsonb END
        ) facts(f)
        WHERE jsonb_typeof(f->'location')='object'
          AND (f->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lat')::double precision BETWEEN -90 AND 90
          AND (f->'location'->>'lon')::double precision BETWEEN -180 AND 180
      )
      SELECT country_code, postcode, content, fact, lat, lon
      FROM candidates
      ORDER BY random()
      LIMIT 1
    `
    if (!rows.length) return json({ error: 'No published facts with valid coordinates are available.' }, 404)
    const row = rows[0]
    const content = row.content
    const place = {
      id: row.country_code + ':' + row.postcode,
      country_code: row.country_code,
      postal_code: String(row.postcode),
      city: content?.city || '',
      municipality: content?.city || '',
      district: content?.district || '',
      region: content?.state || '',
      county: content?.county || '',
      latitude: Number(content?.representative_point?.lat ?? row.lat),
      longitude: Number(content?.representative_point?.lon ?? row.lon),
      status: 'published',
      data_version: 5,
      content,
    }
    return json({
      country: row.country_code,
      place,
      fact: row.fact,
      focus: { lat: Number(row.lat), lon: Number(row.lon) },
    })
  } catch (error) {
    return errorResponse(error)
  }
}
