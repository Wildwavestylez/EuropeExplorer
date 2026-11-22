import { useCallback, useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// The map currently displays only countries with independent published data sources.
// Germany is intentionally paused until its migration to Neon is complete.
const NEON_DATABASE_URL = import.meta.env.VITE_NEON_DATABASE_URL || 'postgresql://travel_reader:7T_swaVG-dzyx_cxj_47upFddYwdVHzu4Y3TQcsiyBibJLKa@ep-floral-grass-bgpfzbe4-pooler.c-9.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require'
let neonSqlPromise = null

async function getNeonSql() {
  if (!NEON_DATABASE_URL) throw new Error('VITE_NEON_DATABASE_URL is not configured')
  if (!neonSqlPromise) neonSqlPromise = import('https://esm.sh/@neondatabase/serverless@1.2.1?bundle')
    .then(({ neon }) => neon(NEON_DATABASE_URL, { disableWarningInBrowsers: true }))
    .catch(error => { neonSqlPromise = null; throw error })
  return neonSqlPromise
}

const MAX_POINTS = 1000
const DATA_TILE_ZOOM = 6

async function getNeonViewportPoints(table, bounds, country) {
  const sql = await getNeonSql()
  const allPoints = []
  let offset = 0

  // Fetch every matching point in stable batches. MAX_POINTS is a page size,
  // never a total-result cap; this prevents large viewports from losing regions.
  while (true) {
    let rows
    if (table === 'czechia_cap_records') {
      rows = await sql`
        SELECT r.postcode, (COALESCE(r.record->'content',r.record))->>'city' AS city,
          fact->>'id' AS fact_id, fact->>'title' AS title,
          fact->>'category' AS category, fact->>'map_category' AS map_category,
          (fact->'location'->>'lat')::double precision AS lat,
          (fact->'location'->>'lon')::double precision AS lon
        FROM public.czechia_cap_records r
        CROSS JOIN LATERAL jsonb_array_elements(
          CASE WHEN jsonb_typeof(COALESCE(r.record->'content',r.record)->'facts')='array' THEN COALESCE(r.record->'content',r.record)->'facts' ELSE '[]'::jsonb END
        ) AS items(fact)
        WHERE r.workflow_status='published' AND r.content_version=5
          AND jsonb_typeof(fact->'location')='object'
          AND (fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (fact->'location'->>'lat')::double precision BETWEEN ${bounds.south} AND ${bounds.north}
          AND (fact->'location'->>'lon')::double precision BETWEEN ${bounds.west} AND ${bounds.east}
        ORDER BY r.postcode, fact->>'id'
        LIMIT ${MAX_POINTS} OFFSET ${offset}
      `
    } else if (table === 'italy_cap_records') {
      rows = await sql`
        SELECT r.postcode, (r.record)->>'city' AS city,
          fact->>'id' AS fact_id, fact->>'title' AS title,
          fact->>'category' AS category, fact->>'map_category' AS map_category,
          (fact->'location'->>'lat')::double precision AS lat,
          (fact->'location'->>'lon')::double precision AS lon
        FROM public.italy_cap_records r
        CROSS JOIN LATERAL jsonb_array_elements(
          CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END
        ) AS items(fact)
        WHERE r.workflow_status='published' AND r.record->>'status'='published'
          AND r.record->>'data_version'='5'
          AND jsonb_typeof(fact->'location')='object'
          AND (fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (fact->'location'->>'lat')::double precision BETWEEN ${bounds.south} AND ${bounds.north}
          AND (fact->'location'->>'lon')::double precision BETWEEN ${bounds.west} AND ${bounds.east}
        ORDER BY r.postcode, fact->>'id'
        LIMIT ${MAX_POINTS} OFFSET ${offset}
      `
    } else if (table === 'slovakia_cap_records') {
      rows = await sql`
        SELECT r.postcode, (r.record)->>'city' AS city,
          fact->>'id' AS fact_id, fact->>'title' AS title,
          fact->>'category' AS category, fact->>'map_category' AS map_category,
          (fact->'location'->>'lat')::double precision AS lat,
          (fact->'location'->>'lon')::double precision AS lon
        FROM public.slovakia_cap_records r
        CROSS JOIN LATERAL jsonb_array_elements(
          CASE WHEN jsonb_typeof(r.record->'facts')='array' THEN r.record->'facts' ELSE '[]'::jsonb END
        ) AS items(fact)
        WHERE r.workflow_status='published' AND r.record->>'status'='published'
          AND r.record->>'data_version'='5'
          AND jsonb_typeof(fact->'location')='object'
          AND (fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
          AND (fact->'location'->>'lat')::double precision BETWEEN ${bounds.south} AND ${bounds.north}
          AND (fact->'location'->>'lon')::double precision BETWEEN ${bounds.west} AND ${bounds.east}
        ORDER BY r.postcode, fact->>'id'
        LIMIT ${MAX_POINTS} OFFSET ${offset}
      `
    }

    allPoints.push(...rows.map(row => ({
      ...row,
      postcode: String(row.postcode),
      lat: Number(row.lat),
      lon: Number(row.lon),
      country_code: country,
      is_cluster: false,
    })).filter(point => Number.isFinite(point.lat) && Number.isFinite(point.lon)))

    if (rows.length < MAX_POINTS) break
    offset += MAX_POINTS
  }

  return allPoints
}

function makeMarker(point, zoom) {
  if (point.is_cluster) {
    return L.marker([point.lat, point.lon], {
      featureCount: Number(point.point_count) || 0,
      icon: L.divIcon({ className:'fact-cluster-icon', html:`<span class="fact-cluster-count">${point.point_count}</span>`, iconSize:[42,42], iconAnchor:[21,21] }),
      title:String(point.point_count),
    })
  }
  return L.marker([point.lat, point.lon], {
    icon:L.divIcon({ className:zoom>=13?'fact-pin-icon fact-pin-detailed':'fact-pin-icon', html:'<span class="fact-pin-dot"></span>', iconSize:[18,18], iconAnchor:[9,9] }),
    title:zoom>=13?(point.title||point.postal_code||''):'',
    riseOnHover:true,
  })
}

function longitudeToTileX(longitude, zoom) {
  return Math.max(0, Math.min(2 ** zoom - 1, Math.floor((longitude + 180) / 360 * 2 ** zoom)))
}
function latitudeToTileY(latitude, zoom) {
  const bounded=Math.max(-85.05112878,Math.min(85.05112878,latitude))
  const radians=bounded*Math.PI/180
  return Math.max(0,Math.min(2**zoom-1,Math.floor((1-Math.asinh(Math.tan(radians))/Math.PI)/2*2**zoom)))
}

export default function ViewportFactLayer({ onSelectFact, onSourceTiming, tileKeys=[] }) {
  const map=useMap()
  const loadedNeonTilesRef=useRef({CZ:new Set(),IT:new Set(),SK:new Set()})
  const inflightNeonTilesRef=useRef({CZ:new Set(),IT:new Set(),SK:new Set()})
  const pointCacheRef=useRef(new Map())
  const markerIdsRef=useRef(new Set())
  const tileCacheRef=useRef(new Map())
  const requestRef=useRef(null)
  const timerRef=useRef(null)
  const layerRef=useRef(null)
  const callbackRef=useRef(onSelectFact)
  const timingCallbackRef=useRef(onSourceTiming)
  callbackRef.current=onSelectFact
  timingCallbackRef.current=onSourceTiming

  const loadViewport=useCallback(async () => {
    const bounds=map.getBounds()
    const zoom=map.getZoom()
    const south=Math.max(-90,bounds.getSouth()), north=Math.min(90,bounds.getNorth())
    const west=Math.max(-180,bounds.getWest()), east=Math.min(180,bounds.getEast())
    const key=[south,west,north,east].map(v=>v.toFixed(3)).join(':')

    const controller=new AbortController()
    requestRef.current?.abort()
    requestRef.current=controller
    const independent=async (name, task) => {
      const startedAt=performance.now()
      try {
        const result=await task()
        if(!controller.signal.aborted) timingCallbackRef.current?.({
          source:name,
          milliseconds:Math.round((performance.now()-startedAt)*10)/10,
          points:Array.isArray(result)?result.length:0,
          viewport:key,
          status:'ok',
        })
        return result
      } catch(error) {
        if(!controller.signal.aborted) {
          timingCallbackRef.current?.({
            source:name,
            milliseconds:Math.round((performance.now()-startedAt)*10)/10,
            points:0,
            viewport:key,
            status:'error',
            error:String(error?.message||error),
          })
          console.error(`Europe Explorer ${name} source failed after ${Math.round(performance.now()-startedAt)} ms:`,error)
        }
        return []
      }
    }

    // Neon data is cached by fixed geographic tiles, not by the current
    // display viewport. A zoom change inside an already loaded tile makes no
    // database request. In-flight tile keys prevent overlapping requests.
    const getMissingNeonTiles = country => {
      const minX=longitudeToTileX(west,DATA_TILE_ZOOM), maxX=longitudeToTileX(east,DATA_TILE_ZOOM)
      const minY=latitudeToTileY(north,DATA_TILE_ZOOM), maxY=latitudeToTileY(south,DATA_TILE_ZOOM)
      const missing=[]
      for(let x=minX;x<=maxX;x++) for(let y=minY;y<=maxY;y++) {
        const tileKey=`${DATA_TILE_ZOOM}/${x}/${y}`
        if(!loadedNeonTilesRef.current[country].has(tileKey) && !inflightNeonTilesRef.current[country].has(tileKey)) {
          missing.push({key:tileKey,x,y})
          inflightNeonTilesRef.current[country].add(tileKey)
        }
      }
      return missing
    }
    const boundsForTiles = tiles => {
      const xs=tiles.map(tile=>tile.x), ys=tiles.map(tile=>tile.y)
      const minX=Math.min(...xs), maxX=Math.max(...xs), minY=Math.min(...ys), maxY=Math.max(...ys)
      const n=2**DATA_TILE_ZOOM
      const tileLon=x=>x/n*360-180
      const tileLat=y=>Math.atan(Math.sinh(Math.PI*(1-2*y/n)))*180/Math.PI
      return {west:tileLon(minX),east:tileLon(maxX+1),north:tileLat(minY),south:tileLat(maxY+1)}
    }
    const fetchNeonTiles = async (country, table, sourceName) => {
      const tiles=getMissingNeonTiles(country)
      if(!tiles.length) return []
      const startedAt=performance.now()
      const tileBounds=boundsForTiles(tiles)
      try {
        const points=await getNeonViewportPoints(table,tileBounds,country)
        tiles.forEach(tile=>loadedNeonTilesRef.current[country].add(tile.key))
        const fresh=[]
        points.forEach(point=>{
          const id=`${country}:${point.postcode}:${point.fact_id||point.title||point.lat+','+point.lon}`
          if(!pointCacheRef.current.has(id)) {
            pointCacheRef.current.set(id,point)
            fresh.push(point)
          }
        })
        if(layerRef.current) renderPoints(fresh,map.getZoom(),false)
        timingCallbackRef.current?.({
          source:sourceName,milliseconds:Math.round((performance.now()-startedAt)*10)/10,
          points:points.length,viewport:key,status:'ok',
        })
        return fresh
      } catch(error) {
        console.error(`Europe Explorer ${sourceName} source failed:`,error)
        timingCallbackRef.current?.({
          source:sourceName,milliseconds:Math.round((performance.now()-startedAt)*10)/10,
          points:0,viewport:key,status:'error',error:String(error?.message||error),
        })
        return []
      } finally {
        tiles.forEach(tile=>inflightNeonTilesRef.current[country].delete(tile.key))
      }
    }

    const czTask=fetchNeonTiles('CZ','czechia_cap_records','Czechia / Neon')
    const itTask=fetchNeonTiles('IT','italy_cap_records','Italy / Neon')

    const skTask=fetchNeonTiles('SK','slovakia_cap_records','Slovakia / Neon')

    // Keep existing markers. Leaflet MarkerCluster recalculates clusters on
    // zoom/pan; only genuinely new points are added to the layer.
    const allSourcesStartedAt=performance.now()
    const skPoints=await skTask
    if(!controller.signal.aborted) renderPoints(skPoints,map.getZoom(),false)
    await Promise.all([czTask,itTask])
    console.info('[Europe Explorer] map sources settled', {
      milliseconds:Math.round((performance.now()-allSourcesStartedAt)*10)/10,
      newPoints:skPoints.length,
      viewport:key,
    })
  },[map,tileKeys])

  function renderPoints(points,zoom,clear=true) {
    const layer=layerRef.current
    if(!layer) return
    if(clear) layer.clearLayers()
    points.forEach(point=>{
      if(!Number.isFinite(Number(point.lat))||!Number.isFinite(Number(point.lon))) return
      const markerId=point.is_cluster?null:`${point.country_code||'DE'}:${point.postcode||point.postal_code||''}:${point.fact_id||point.id||point.title||point.lat+','+point.lon}`
      if(markerId && markerIdsRef.current.has(markerId)) return
      if(markerId) markerIdsRef.current.add(markerId)
      const marker=makeMarker(point,zoom)
      if(!point.is_cluster) marker.on('click',()=>{
        const code=point.country_code||'DE'
        callbackRef.current?.({
          id:point.postal_id||point.id||`${code}:${point.postcode||point.postal_code||''}`,
          country_code:code,postal_code:point.postcode||point.postal_code,city:point.city,
        },{
          id:point.fact_id,title:point.title,category:point.category,
          map_category:point.map_category||point.category,location:{lat:Number(point.lat),lon:Number(point.lon)},
        })
      })
      layer.addLayer(marker)
    })
  }

  useEffect(()=>{
    const layer=L.markerClusterGroup({
      iconCreateFunction:cluster=>{
        const total=cluster.getAllChildMarkers().reduce((sum,marker)=>sum+(Number(marker.options.featureCount)||1),0)
        return L.divIcon({className:'fact-cluster-icon',html:'<span class="fact-cluster-count">'+total+'</span>',iconSize:[42,42],iconAnchor:[21,21]})
      },
      chunkedLoading:true,showCoverageOnHover:false,spiderfyOnMaxZoom:true,
      zoomToBoundsOnClick:true,maxClusterRadius:52,disableClusteringAtZoom:14,
    })
    layerRef.current=layer
    map.addLayer(layer)
    loadedNeonTilesRef.current={CZ:new Set(),IT:new Set(),SK:new Set()}
    inflightNeonTilesRef.current={CZ:new Set(),IT:new Set(),SK:new Set()}
    pointCacheRef.current.clear()
    markerIdsRef.current.clear()
    tileCacheRef.current.clear()
    const scheduleLoad=()=>{
      if(timerRef.current) window.clearTimeout(timerRef.current)
      requestRef.current?.abort()
      timerRef.current=window.setTimeout(()=>loadViewport(),220)
    }
    map.on('moveend',scheduleLoad)
    map.on('zoomend',scheduleLoad)
    scheduleLoad()
    return ()=>{
      map.off('moveend',scheduleLoad); map.off('zoomend',scheduleLoad)
      if(timerRef.current) window.clearTimeout(timerRef.current)
      requestRef.current?.abort()
      map.removeLayer(layer); layer.clearLayers(); layerRef.current=null
    }
  },[map,loadViewport])
  return null
}
