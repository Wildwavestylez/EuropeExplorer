import { useCallback, useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { supabase } from '../lib/supabase'

// Neon is the target source for every country's published V5 records.
// Until the remaining country migrations are complete, DE and SK stay on
// their existing sources but are merged into this same map cluster.
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
const CACHE_LIMIT = 24
const SLOVAKIA_TILES_URL = 'https://raw.githubusercontent.com/Wildwavestylez/travel/main/data/slovakia/explorer_tiles/'

async function getNeonViewportPoints(table, bounds, country) {
  const sql = await getNeonSql()
  if (table === 'czechia_cap_records') {
    const rows = await sql`
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
      LIMIT 1000
    `
    return rows.map(row => ({...row, postcode:String(row.postcode), lat:Number(row.lat), lon:Number(row.lon), country_code:country, is_cluster:false}))
      .filter(point => Number.isFinite(point.lat) && Number.isFinite(point.lon))
  }
  const rows = await sql`
    SELECT r.postcode, (COALESCE(r.record->'content',r.record))->>'city' AS city,
      fact->>'id' AS fact_id, fact->>'title' AS title,
      fact->>'category' AS category, fact->>'map_category' AS map_category,
      (fact->'location'->>'lat')::double precision AS lat,
      (fact->'location'->>'lon')::double precision AS lon
    FROM public.italy_cap_records r
    CROSS JOIN LATERAL jsonb_array_elements(
      CASE WHEN jsonb_typeof(COALESCE(r.record->'content',r.record)->'facts')='array' THEN COALESCE(r.record->'content',r.record)->'facts' ELSE '[]'::jsonb END
    ) AS items(fact)
    WHERE r.workflow_status='published' AND r.record->>'status'='published'
      AND r.record->>'data_version'='5'
      AND jsonb_typeof(fact->'location')='object'
      AND (fact->'location'->>'lat') ~ '^-?[0-9]+([.][0-9]+)?$'
      AND (fact->'location'->>'lon') ~ '^-?[0-9]+([.][0-9]+)?$'
      AND (fact->'location'->>'lat')::double precision BETWEEN ${bounds.south} AND ${bounds.north}
      AND (fact->'location'->>'lon')::double precision BETWEEN ${bounds.west} AND ${bounds.east}
    LIMIT 1000
  `
  return rows.map(row => ({...row, postcode:String(row.postcode), lat:Number(row.lat), lon:Number(row.lon), country_code:country, is_cluster:false}))
    .filter(point => Number.isFinite(point.lat) && Number.isFinite(point.lon))
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
  const cacheRef=useRef(new Map())
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
    const key=[zoom,south,west,north,east].map(v=>v.toFixed(3)).join(':')
    const cached=cacheRef.current.get(key)
    if (cached) { renderPoints(cached, zoom); return }

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

    const deTask=independent('Germany / Supabase',async()=>{
      const {data,error}=await supabase.rpc('get_explorer_map_points_v2',{
        p_south:south,p_west:west,p_north:north,p_east:east,p_zoom:zoom,p_limit:MAX_POINTS,
      }).abortSignal(controller.signal)
      if(error) throw error
      return (data||[]).map(point=>({...point,country_code:point.country_code||'DE',is_cluster:Boolean(point.is_cluster)}))
    })

    const czTask=independent('Czechia / Neon',()=>getNeonViewportPoints('czechia_cap_records',{south,west,north,east},'CZ'))
    const itTask=independent('Italy / Neon',()=>getNeonViewportPoints('italy_cap_records',{south,west,north,east},'IT'))

    const skTask=independent('Slovakia / published tiles',async()=>{
      if(!tileKeys.length) return []
      const tileZoom=Math.min(8,Math.max(4,Math.floor(zoom)-2))
      const minX=longitudeToTileX(west,tileZoom), maxX=longitudeToTileX(east,tileZoom)
      const minY=latitudeToTileY(north,tileZoom), maxY=latitudeToTileY(south,tileZoom)
      const available=new Set(tileKeys), requested=[]
      for(let x=minX;x<=maxX;x++) for(let y=minY;y<=maxY;y++) {
        const tileKey=`${tileZoom}/${x}/${y}`
        if(available.has(tileKey)) requested.push(tileKey)
      }
      const loaded=await Promise.all(requested.map(async tileKey=>{
        if(tileCacheRef.current.has(tileKey)) return tileCacheRef.current.get(tileKey)
        const response=await fetch(SLOVAKIA_TILES_URL+tileKey+'.json',{signal:controller.signal,headers:{Accept:'application/json'},cache:'default'})
        if(!response.ok) throw new Error(`Slovak map tile ${tileKey} returned HTTP ${response.status}`)
        const tilePoints=await response.json()
        if(!Array.isArray(tilePoints)) throw new Error(`Slovak map tile ${tileKey} has an invalid structure`)
        tileCacheRef.current.set(tileKey,tilePoints)
        if(tileCacheRef.current.size>48) tileCacheRef.current.delete(tileCacheRef.current.keys().next().value)
        return tilePoints
      }))
      return loaded.flat().filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&p.lat>=south&&p.lat<=north&&p.lon>=west&&p.lon<=east)
        .map(p=>({...p,country_code:'SK',is_cluster:false}))
    })

    // Render each country's pins as soon as its source finishes.
    // This avoids blocking every marker behind the slowest country source.
    renderPoints([],zoom)
    const collected=[]
    const allSourcesStartedAt=performance.now()
    await Promise.all([deTask,czTask,itTask,skTask].map(async task=>{
      const points=await task
      if(controller.signal.aborted) return
      collected.push(...points)
      renderPoints(points,zoom,false)
    }))
    if(controller.signal.aborted) return
    console.info('[Europe Explorer] all map sources settled', {
      milliseconds:Math.round((performance.now()-allSourcesStartedAt)*10)/10,
      points:collected.length,
      viewport:key,
    })
    cacheRef.current.set(key,collected)
    if(cacheRef.current.size>CACHE_LIMIT) cacheRef.current.delete(cacheRef.current.keys().next().value)
  },[map,tileKeys])

  function renderPoints(points,zoom,clear=true) {
    const layer=layerRef.current
    if(!layer) return
    if(clear) layer.clearLayers()
    points.forEach(point=>{
      if(!Number.isFinite(Number(point.lat))||!Number.isFinite(Number(point.lon))) return
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
    cacheRef.current.clear()
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
