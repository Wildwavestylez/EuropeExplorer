import { getSql, json, errorResponse } from './_lib/db.js'

const ALLOWED_SOURCES = new Set(['intro', 'places'])

export async function onRequestPost(context) {
  try {
    const body = await context.request.json()
    const term = String(body?.term || '').trim().replace(/\\s+/g, ' ').slice(0, 120)
    const source = ALLOWED_SOURCES.has(body?.source) ? body.source : 'intro'
    const language = /^[a-z]{2}$/.test(String(body?.language || '')) ? body.language : null

    if (!term || term.length < 2) return json({ ok: false }, 400)

    const sql = getSql(context, 'SEARCH_ANALYTICS_DATABASE_URL')
    await sql`
      INSERT INTO public.search_analytics (search_term, search_source, ui_language)
      VALUES (${term}, ${source}, ${language})
    `
    return json({ ok: true })
  } catch (error) {
    // Analytics must never interfere with the visitor's actual search.
    console.error('[Europe Explorer] search analytics write failed:', error?.message || error)
    return json({ ok: false }, 503)
  }
}
