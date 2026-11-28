export async function onRequestPost(context) {
  try {
    const request = context.request
    const origin = request.headers.get('Origin')
    if (origin && new URL(origin).origin !== new URL(request.url).origin) {
      return new Response(JSON.stringify({ ok: false }), { status: 403 })
    }
    if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
      return new Response(JSON.stringify({ ok: false }), { status: 415 })
    }

    const body = await request.json()
    const term = String(body?.term || '').trim().replace(/\s+/g, ' ').slice(0, 120)
    if (term.length < 2) return new Response(JSON.stringify({ ok: false }), { status: 400 })

    const db = context.env.REPORTS_DB
    if (!db) throw new Error('REPORTS_DB D1 binding is not configured')

    await db.prepare('INSERT INTO search_analytics (search_term) VALUES (?)').bind(term).run()

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    })
  } catch (error) {
    console.error(JSON.stringify({
      service: 'europe-explorer-api',
      operation: 'search-analytics-write',
      errorName: error?.name || 'Error',
      errorMessage: error?.message || String(error),
    }))
    return new Response(JSON.stringify({ ok: false }), {
      status: 503,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    })
  }
}
