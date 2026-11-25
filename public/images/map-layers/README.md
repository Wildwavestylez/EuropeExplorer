# Europe Explorer — Map layer images

This folder is reserved for static artwork displayed at overview zoom levels (zoom 11 and below).

## Add images here

Place image files directly in this folder for now. The application does not load or display these files yet; this is only the asset location. The map-layer implementation will be connected separately.

Suggested filenames:

- `europe-overview.webp` — Europe-wide overview
- `country-de.webp` — Germany
- `country-cz.webp` — Czechia
- `region-de-bw.webp` — Baden-Württemberg
- `region-cz-jc.webp` — Jihočeský kraj

Use lowercase names, hyphens, and country/region codes where practical. Prefer optimized WebP or PNG files with transparent backgrounds when the artwork needs to sit on top of the map.

## Public asset URLs

Because this folder is inside Vite's `public` directory, files will be available from the site root using paths such as:

`/images/map-layers/europe-overview.webp`

No import is needed. Do not put secrets or private files here; everything in `public` is publicly served.

## Planned map levels

- Zoom 11 and below: static overview artwork/pins only; no live POI database requests.
- Zoom 12: live POIs with marker clustering.
- Zoom 13 and above: live POIs with marker clustering, preserving individual coordinates.
