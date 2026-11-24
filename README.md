# Europe Explorer

A Europe-wide discovery map backed by published postal-area records in Neon.

## Stack
- React + Vite
- Leaflet + OpenStreetMap with marker clustering
- Cloudflare Pages Functions for the public data API
- Neon Postgres for published V5 data
- Supabase remains the working environment for German and Czech content creation and audit; it is not queried by the public Explorer.

## Data lifecycle
- The public app reads only through `/api/*` endpoints.
- The API uses the encrypted Cloudflare Pages secret `DATABASE_URL`; database credentials are never sent to the browser.
- Only records with `workflow_status = published` and the country's applicable V5 marker are returned.
- Germany remains unavailable in the public app until audited records are migrated to Neon.
- Czechia currently uses `content_version = 5`; Italy and Slovakia use the V5 marker inside their JSON records. These existing rules are deliberately preserved until a separately planned schema migration.

## Cloudflare Pages
- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Add encrypted environment variable / secret: `DATABASE_URL` (Neon connection string)
- Pages Functions are in `functions/` and expose:
  - `GET /api/places?country=CZ|IT|SK`
  - `GET /api/place?country=CZ|IT|SK&postcode=12345`
  - `GET /api/viewport?country=CZ|IT|SK&south=...&west=...&north=...&east=...&offset=0`

Germany is intentionally omitted from the API allowlist until its published Neon table and audited migration are ready.

## Development
```bash
npm install
npm run dev
npm run build
```

The API requires the Cloudflare Pages Functions runtime and the encrypted `DATABASE_URL` secret. GitHub Actions currently validates the Vite build only; it does not deploy this API-dependent frontend to GitHub Pages.
