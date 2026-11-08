# Europe Explorer

A Europe-wide discovery map powered by the shared Supabase postal-code dataset.

## Stack
- React + Vite
- Leaflet + OpenStreetMap
- Supabase (read-only public client)

## Data rules
- The public application queries only records with `status = published`.
- The first enabled datasets are Germany (DE) and Czechia (CZ).
- Map markers currently represent postal-area coordinates. Individual attractions will receive their own map pins when verified attraction coordinates are available in the published records.
- No service-role credentials are used in the browser.

## Development
```bash
npm install
npm run dev
```

## Deployment
GitHub Actions builds the Vite app and deploys it to GitHub Pages on every push to `main`.
The repository Pages setting must use **GitHub Actions** as its build and deployment source.

Public URL: https://wildwavestylez.github.io/EuropeExplorer/
