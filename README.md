# Europe Explorer

A Europe-wide discovery map powered by the shared Supabase postal-code dataset.

## Stack
- React + Vite
- Leaflet + OpenStreetMap with marker clustering
- Supabase (read-only public client)

## Data rules
- The application queries only records with `status = published`.
- Records are checked against the applicable country JSON Schema and V3 structural rules before display.
- Every fact with valid `location.lat` and `location.lon` coordinates is shown as an individual map pin.
- Nearby fact pins are grouped into clusters when zoomed out.
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

