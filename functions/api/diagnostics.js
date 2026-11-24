import { getSql, json, errorResponse } from './_lib/db.js'

export async function onRequestGet(context) {
  try {
    const country = String(new URL(context.request.url).searchParams.get('country') || '').toUpperCase()
    if (country !== 'CZ') return json({ error: 'Diagnostics are not available for this country.' }, 400)
    const sql = getSql(context)
    const rows = await sql`
      SELECT r.postcode,
        (COALESCE(r.record->'content',r.record))->>'city' AS city,
        (COALESCE(r.record->'content',r.record))->'representative_point'->>'lat' AS representative_lat,
        (COALESCE(r.record->'content',r.record))->'representative_point'->>'lon' AS representative_lon,
        COUNT(items.fact) FILTER (WHERE items.fact IS NOT NULL)::int AS facts_total,
        COUNT(items.fact) FILTER (
          WHERE jsonb_typeof(items.fact->'location')='object'
            AND (items.fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
            AND (items.fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
            AND (items.fact->'location'->>'lat')::double precision BETWEEN -90 AND 90
            AND (items.fact->'location'->>'lon')::double precision BETWEEN -180 AND 180
        )::int AS located_facts
      FROM public.czechia_cap_records r
      LEFT JOIN LATERAL jsonb_array_elements(
        CASE WHEN jsonb_typeof(COALESCE(r.record->'content',r.record)->'facts')='array'
          THEN COALESCE(r.record->'content',r.record)->'facts' ELSE '[]'::jsonb END
      ) AS items(fact) ON true
      WHERE r.workflow_status='published' AND r.content_version=5
      GROUP BY r.postcode, COALESCE(r.record->'content',r.record)
      ORDER BY r.postcode
    `
    const rejected = []
    let accepted = 0, factsTotal = 0, locatedFacts = 0
    for (const row of rows) {
      const total = Number(row.facts_total || 0), located = Number(row.located_facts || 0)
      factsTotal += total
      locatedFacts += located
      const lat = Number(row.representative_lat), lon = Number(row.representative_lon)
      const reasons = []
      if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180)
        reasons.push('Chybí platný representative_point – PSČ nelze správně umístit do seznamu a výběru oblasti.')
      if (total === 0) reasons.push('Záznam neobsahuje žádné facts.')
      else if (located === 0) reasons.push(`Žádný z ${total} faktů nemá platné GPS souřadnice location.lat/lon.`)
      else if (located < total) reasons.push(`Pouze ${located} z ${total} faktů má platné GPS souřadnice; ${total-located} se na mapu nevykreslí.`)
      if (reasons.length) rejected.push({ postal_code:String(row.postcode), city:row.city||'', reasons, facts_total:total, located_facts:located })
      else accepted += 1
    }
    return json({ country:'CZ', fetched:rows.length, accepted, rejected, pageCount:rows.length?1:0, pageSize:rows.length, factsTotal, locatedFacts, diagnosticsError:'' })
  } catch (error) { return errorResponse(error) }
}
