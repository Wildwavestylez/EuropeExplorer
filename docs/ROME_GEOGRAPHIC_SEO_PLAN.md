# Rome — geographic and SEO research plan

**Status:** First implementation committed; live deployment and rendered map framing still require verification.  
**Scope:** Public Rome hub plus five geographically coherent visitor areas.  
**Locales:** cs, de, en, es, fr, it, nl.

## Research basis

1. Turismo Roma's official tourist map (2026) places the Colosseum, Roman Forum/Capitoline area, Trevi Fountain, Pantheon, Spanish Steps, St Peter's Square, Castel Sant'Angelo, Piazza Navona, Galleria Borghese, Piazza del Popolo, Circus Maximus, Lateran Basilica and other principal sites on one city map. It also labels the districts and neighbourhoods on either side of the Tiber.
   - https://www.turismoroma.it/sites/default/files/Mappa_Roma_2026_strappo_giugno_2026_2.pdf
2. Turismo Roma's official neighbourhood guide groups attractions into visitor areas including:
   - Campidoglio – Piazza Venezia
   - Tridente
   - Pantheon – Navona – Campo de' Fiori
   - Colosseo – Fori – Palatino
   - Aventino – Terme di Caracalla – Circo Massimo
   - Trastevere – Isola Tiberina – Testaccio
   - Vaticano – Gianicolo – Prati
   - Via Appia Antica – San Giovanni in Laterano
   - https://www.turismoroma.it/it/quartieri
3. ENIT's May 2024 tourism search infographic reports March 2024 Google search volumes for Italian attractions: Colosseum 2.524m, Pantheon 1.863m, Trevi Fountain 1.511m, Piazza Navona 673k, Galleria Borghese 540k and St Peter's Basilica 222k. These are historical monthly figures for that specific period, not current monthly estimates.
   - https://www.enit.it/storage/202405/20240524121605_tdh_infografica_aprile_def.pdf
4. A 2026 spatial-dynamics study consulted Google Trends to compare relative search interest and confirmed the Colosseum as the strongest reference attraction in its comparison; its top-ranked list also highlights Pantheon, Roman Forum, Piazza Navona, Trevi Fountain, Vatican Museums, St Peter's Basilica, Villa Borghese and other sites. Google Trends values are relative, not absolute search counts.
   - https://www.mdpi.com/2073-445x/15/1/77
5. Italia.it describes Rome's historic centre as a broad area and recommends prioritising rather than attempting to see everything in one visit.
   - https://www.italia.it/en/lazio/rome/things-to-do/rome-the-eternal-city

## Geographic information architecture

The divisions below are visitor-facing geographic clusters, not administrative or postal divisions. They are intentionally broad enough to group nearby places and keep visitors oriented.

| Public area page | Main places grouped | Map focus |
|---|---|---|
| Ancient Rome | Colosseum, Roman Forum, Palatine, Imperial Fora, Capitoline area, Circus Maximus | 41.8902, 12.4922 · zoom 16 |
| Historic Centre | Pantheon, Piazza Navona, Trevi Fountain, Campo de' Fiori | 41.8986, 12.4769 · zoom 16 |
| Vatican | St Peter's Square and Basilica, Vatican Museums, Sistine Chapel; Castel Sant'Angelo is a nearby Tiber-side connection | 41.9022, 12.4539 · zoom 16 |
| Trastevere | Trastevere lanes, Santa Maria in Trastevere, Tiber Island / Gianicolo approaches | 41.8897, 12.4692 · zoom 16 |
| Northern Rome & Villa Borghese | Spanish Steps, Piazza del Popolo, Via del Corso, Villa Borghese and Galleria Borghese | 41.9090, 12.4795 · zoom 15 |

The official tourist map also identifies further worthwhile clusters for a later expansion: Aventino–Caracalla–Circus Maximus, Testaccio, San Giovanni–Lateran, Appia Antica, Esquilino–Monti and EUR. They are not discarded; they are held for a second content pass so the initial navigation does not become an unmanageable catalogue.

## Search-intent interpretation

The ENIT data supports prioritising the Colosseum, Pantheon, Trevi Fountain and Piazza Navona. Galleria Borghese also has meaningful search demand. Vatican sites and the Spanish Steps remain essential because official tourism maps and destination guides consistently identify them as principal visitor destinations.

The numbers above must not be presented as current keyword volumes. For future city research, compare:
- Google Trends by target country and language (relative interest and seasonality);
- Google Keyword Planner (volume ranges, where an account provides them);
- Google autocomplete (query phrasing and related intent);
- Search Console after the pages have accumulated impressions.

## Implementation

- City hub: `/{lang}/places/italy/rome`
- Area pages: `/{lang}/places/italy/rome/{area}`
- All seven language versions are included for the hub and five area pages.
- Each page has one primary CTA immediately after its introductory hook and links to a map deep link using country `IT`.
- The hub links to all five area pages; each area page links back to the Rome hub.
- The XML sitemap contains 42 Rome URLs (6 pages × 7 languages).

## Verification limitations

The source files and sitemap were committed to the repository. The public URLs could not be fetched through the available page verifier at the time of this audit, so successful Cloudflare Pages deployment, HTTP status, rendered mobile layout and actual map centre/zoom remain unverified. Do not describe those as tested until checked in a browser.
