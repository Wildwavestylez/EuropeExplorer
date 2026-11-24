import { getSql, json, errorResponse, isValidCountry } from './_lib/db.js'
function numberParam(params, key, min, max) {
  const value = Number(params.get(key))
  return Number.isFinite(value) && value >= min && value <= max ? value : null
}
export async function onRequestGet(context) {
  try {
    const params = new URL(context.request.url).searchParams
    const country = String(params.get('country') || '').toUpperCase()
    if (country === 'DE') return json({ country, points: [], published: false })
    if (!isValidCountry(country)) return json({ error: 'Unsupported country.' }, 400)
    const south=numberParam(params,'south',-90,90), west=numberParam(params,'west',-180,180)
    const north=numberParam(params,'north',-90,90), east=numberParam(params,'east',-180,180)
    const offset=numberParam(params,'offset',0,1000000)
    if ([south,west,north,east,offset].some(v=>v===null) || south>north || west>east) return json({error:'Invalid viewport bounds or offset.'},400)
    const sql=getSql(context), limit=1000
    let rows
    if (country==='CZ') rows=await sql`
      SELECT r.postcode,content.c->>'city' AS city,f->>'id' AS fact_id,f->>'title' AS title,
      f->>'category' AS category,f->>'map_category' AS map_category,
      (f->'location'->>'lat')::double precision AS lat,(f->'location'->>'lon')::double precision AS lon
      FROM public.czechia_cap_records r
      CROSS JOIN LATERAL (SELECT COALESCE(r.record->'content',r.record) AS c) content
      CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(content.c->'facts')='array' THEN content.c->'facts' ELSE '[]'::jsonb END) facts(f)
      WHERE r.workflow_status='published' AND r.content_version=5 AND jsonb_typeof(f->'location')='object'
      AND (f->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$' AND (f->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
      AND (f->'location'->>'lat')::double precision BETWEEN ${south} AND ${north}
      AND (f->'location'->>'lon')::double precision BETWEEN ${west} AND ${east}
      ORDER BY r.postcode,f->>'id' LIMIT ${limit} OFFSET ${offset}
    `
    else if (country==='IT') rows=await sql`
      SELECT r.postcode,r.record->>'city' AS city,f->>'id' AS fact_id,f->>'title' AS title,
      f->>'category' AS category,f->>'map_category' AS map_category,
      (f->'location'->>'lat')::double precision AS lat,(f->'location'->>'lon')::double precision AS lon
      FROM public.italy_cap_records r
      CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END) facts(f)
      WHERE r.workflow_status='published' AND r.record->>'status'='published' AND r.record->>'data_version'='5'
      AND jsonb_typeof(f->'location')='object' AND (f->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
      AND (f->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
      AND (f->'location'->>'lat')::double precision BETWEEN ${south} AND ${north}
      AND (f->'location'->>'lon')::double precision BETWEEN ${west} AND ${east}
      ORDER BY r.postcode,f->>'id' LIMIT ${limit} OFFSET ${offset}
    `
    else rows=await sql`
      SELECT r.postcode,r.record->>'city' AS city,f->>'id' AS fact_id,f->>'title' AS title,
      f->>'category' AS category,f->>'map_category' AS map_category,
      (f->'location'->>'lat')::double precision AS lat,(f->'location'->>'lon')::double precision AS lon
      FROM public.slovakia_cap_records r
      CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END) facts(f)
      WHERE r.workflow_status='published' AND r.record->>'status'='published' AND r.record->>'data_version'='5'
      AND jsonb_typeof(f->'location')='object' AND (f->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
      AND (f->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
      AND (f->'location'->>'lat')::double precision BETWEEN ${south} AND ${north}
      AND (f->'location'->>'lon')::double precision BETWEEN ${west} AND ${east}
      ORDER BY r.postcode,f->>'id' LIMIT ${limit} OFFSET ${offset}
    `
    const points=rows.map(row=>({...row,postcode:String(row.postcode),lat:Number(row.lat),lon:Number(row.lon),country_code:country,is_cluster:false}))
    return json({country,points,offset,pageSize:limit,hasMore:rows.length===limit})
  } catch(error) { return errorResponse(error) }
}
