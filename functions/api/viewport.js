import { getSql, json, errorResponse, isValidCountry } from './_lib/db.js'

function numberParam(params, key, min, max, integer = false) {
  const raw = params.get(key)
  if (raw === null || raw.trim() === '') return null
  const value = Number(raw)
  if (!Number.isFinite(value) || value < min || value > max) return null
  if (integer && !Number.isInteger(value)) return null
  return value
}

function snapBounds(south, west, north, east, step = 0.05) {
  // Expand to stable geographic cells so nearby visitors share the same edge cache.
  const floorTo = value => Math.floor(value / step) * step
  const ceilTo = value => Math.ceil(value / step) * step
  return {
    south: Math.max(-90, Number(floorTo(south).toFixed(2))),
    west: Math.max(-180, Number(floorTo(west).toFixed(2))),
    north: Math.min(90, Number(ceilTo(north).toFixed(2))),
    east: Math.min(180, Number(ceilTo(east).toFixed(2))),
  }
}
function cellSizeForZoom(zoom) {
  if (zoom <= 7) return 0.35
  if (zoom <= 9) return 0.12
  if (zoom <= 11) return 0.04
  return 0
}

export async function onRequestGet(context) {
  try {
    const params = new URL(context.request.url).searchParams
    const country = String(params.get('country') || '').toUpperCase()
    if (country === 'DE') return json({ country, points: [], published: false })
    if (!isValidCountry(country)) return json({ error: 'Unsupported country.' }, 400)

    const south = numberParam(params, 'south', -90, 90)
    const west = numberParam(params, 'west', -180, 180)
    const north = numberParam(params, 'north', -90, 90)
    const east = numberParam(params, 'east', -180, 180)
    const offset = numberParam(params, 'offset', 0, 1000000, true)
    const zoom = numberParam(params, 'zoom', 0, 22, true)
    if ([south, west, north, east, offset, zoom].some(v => v === null) || south > north || west > east) {
      return json({ error: 'Invalid viewport bounds, zoom or offset.' }, 400)
    }

    const stableBounds = snapBounds(south, west, north, east)
    const queryBounds = { south: stableBounds.south, west: stableBounds.west, north: stableBounds.north, east: stableBounds.east }
    const cacheUrl = new URL(context.request.url)
    cacheUrl.pathname = '/__ee_internal_cache__/viewport'
    cacheUrl.search = ''
    cacheUrl.searchParams.set('country', country)
    cacheUrl.searchParams.set('south', String(queryBounds.south))
    cacheUrl.searchParams.set('west', String(queryBounds.west))
    cacheUrl.searchParams.set('north', String(queryBounds.north))
    cacheUrl.searchParams.set('east', String(queryBounds.east))
    cacheUrl.searchParams.set('offset', String(offset))
    cacheUrl.searchParams.set('zoom', String(zoom))
    const cacheRequest = new Request(cacheUrl.toString(), { method: 'GET' })
    const edgeCache = typeof caches !== 'undefined' ? caches.default : null

    if (edgeCache) {
      try {
        const cached = await edgeCache.match(cacheRequest)
        if (cached) {
          const headers = new Headers(cached.headers)
          headers.set('x-ee-cache', 'HIT')
          return new Response(cached.body, { status: cached.status, headers })
        }
      } catch (cacheError) {
        console.warn('[Europe Explorer] viewport cache read failed:', cacheError?.message || cacheError)
      }
    }

    const cellSize = cellSizeForZoom(zoom)
    const aggregate = cellSize > 0
    const sql = getSql(context)
    const limit = 1000
    let rows

    // At low and medium zoom, return one representative fact per geographic
    // grid cell. Window functions retain a real fact as the representative
    // and attach the total number of facts represented by that cell.
    if (country === 'CZ') rows = await sql`
      WITH raw AS (
        SELECT r.postcode, content.c->>'city' AS city, f->>'id' AS fact_id,
          f->>'title' AS title, f->>'category' AS category, f->>'map_category' AS map_category,
          (f->'location'->>'lat')::double precision AS lat,
          (f->'location'->>'lon')::double precision AS lon
        FROM public.czechia_cap_records r
        CROSS JOIN LATERAL (SELECT COALESCE(r.record->'content', r.record) AS c) content
        CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(content.c->'facts')='array' THEN content.c->'facts' ELSE '[]'::jsonb END) facts(f)
        WHERE r.workflow_status='published' AND r.content_version=5 AND jsonb_typeof(f->'location')='object'
          AND (f->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lat')::double precision BETWEEN ${queryBounds.south} AND ${queryBounds.north}
          AND (f->'location'->>'lon')::double precision BETWEEN ${queryBounds.west} AND ${queryBounds.east}
      ), bucketed AS (
        SELECT *, CASE WHEN ${cellSize} > 0
          THEN floor(lat / ${cellSize})::text || ':' || floor(lon / ${cellSize})::text
          ELSE postcode || ':' || COALESCE(fact_id, title, lat::text || ':' || lon::text) END AS bucket
        FROM raw
      ), ranked AS (
        SELECT *, COUNT(*) OVER (PARTITION BY bucket) AS feature_count,
          ROW_NUMBER() OVER (PARTITION BY bucket ORDER BY postcode, fact_id) AS row_num
        FROM bucketed
      )
      SELECT bucket, postcode, city, fact_id, title, category, map_category, lat, lon, feature_count
      FROM ranked WHERE row_num=1 ORDER BY bucket LIMIT ${limit} OFFSET ${offset}
    `
    else if (country === 'IT') rows = await sql`
      WITH raw AS (
        SELECT r.postcode, r.record->>'city' AS city, f->>'id' AS fact_id,
          f->>'title' AS title, f->>'category' AS category, f->>'map_category' AS map_category,
          (f->'location'->>'lat')::double precision AS lat,
          (f->'location'->>'lon')::double precision AS lon
        FROM public.italy_cap_records r
        CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END) facts(f)
        WHERE r.workflow_status='published' AND r.record->>'status'='published' AND r.record->>'data_version'='5'
          AND jsonb_typeof(f->'location')='object'
          AND (f->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lat')::double precision BETWEEN ${queryBounds.south} AND ${queryBounds.north}
          AND (f->'location'->>'lon')::double precision BETWEEN ${queryBounds.west} AND ${queryBounds.east}
      ), bucketed AS (
        SELECT *, CASE WHEN ${cellSize} > 0
          THEN floor(lat / ${cellSize})::text || ':' || floor(lon / ${cellSize})::text
          ELSE postcode || ':' || COALESCE(fact_id, title, lat::text || ':' || lon::text) END AS bucket
        FROM raw
      ), ranked AS (
        SELECT *, COUNT(*) OVER (PARTITION BY bucket) AS feature_count,
          ROW_NUMBER() OVER (PARTITION BY bucket ORDER BY postcode, fact_id) AS row_num
        FROM bucketed
      )
      SELECT bucket, postcode, city, fact_id, title, category, map_category, lat, lon, feature_count
      FROM ranked WHERE row_num=1 ORDER BY bucket LIMIT ${limit} OFFSET ${offset}
    `
    else rows = await sql`
      WITH raw AS (
        SELECT r.postcode, r.record->>'city' AS city, f->>'id' AS fact_id,
          f->>'title' AS title, f->>'category' AS category, f->>'map_category' AS map_category,
          (f->'location'->>'lat')::double precision AS lat,
          (f->'location'->>'lon')::double precision AS lon
        FROM public.slovakia_cap_records r
        CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END) facts(f)
        WHERE r.workflow_status='published' AND r.record->>'status'='published' AND r.record->>'data_version'='5'
          AND jsonb_typeof(f->'location')='object'
          AND (f->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (f->'location'->>'lat')::double precision BETWEEN ${queryBounds.south} AND ${queryBounds.north}
          AND (f->'location'->>'lon')::double precision BETWEEN ${queryBounds.west} AND ${queryBounds.east}
      ), bucketed AS (
        SELECT *, CASE WHEN ${cellSize} > 0
          THEN floor(lat / ${cellSize})::text || ':' || floor(lon / ${cellSize})::text
          ELSE postcode || ':' || COALESCE(fact_id, title, lat::text || ':' || lon::text) END AS bucket
        FROM raw
      ), ranked AS (
        SELECT *, COUNT(*) OVER (PARTITION BY bucket) AS feature_count,
          ROW_NUMBER() OVER (PARTITION BY bucket ORDER BY postcode, fact_id) AS row_num
        FROM bucketed
      )
      SELECT bucket, postcode, city, fact_id, title, category, map_category, lat, lon, feature_count
      FROM ranked WHERE row_num=1 ORDER BY bucket LIMIT ${limit} OFFSET ${offset}
    `

    const points = rows.map(row => ({
      ...row,
      postcode: String(row.postcode),
      lat: Number(row.lat),
      lon: Number(row.lon),
      feature_count: Number(row.feature_count) || 1,
      country_code: country,
      is_cluster: aggregate,
    }))
    const response = json({
      country, points, offset, pageSize: limit,
      hasMore: rows.length === limit,
      aggregation: aggregate ? 'grid' : 'individual',
      cellSize: aggregate ? cellSize : null,
    })
    const responseHeaders = new Headers(response.headers)
    responseHeaders.set('cache-control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600')
    responseHeaders.set('x-ee-cache', 'MISS')
    const cacheableResponse = new Response(response.body, { status: response.status, headers: responseHeaders })
    if (edgeCache) {
      try {
        await edgeCache.put(cacheRequest, cacheableResponse.clone())
      } catch (cacheError) {
        console.warn('[Europe Explorer] viewport cache write failed:', cacheError?.message || cacheError)
      }
    }
    return cacheableResponse
  } catch (error) {
    return errorResponse(error, context.request, 'viewport')
  }
}
