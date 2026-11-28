# City Landing Content Standard — Europe Explorer

**Status:** Initial editorial standard  
**Scope:** Public, indexable city landing pages that introduce a destination and lead visitors into the Europe Explorer interactive map.  
**Languages:** Czech (cs), German (de), English (en), Spanish (es), French (fr), Italian (it), Dutch (nl).

## 1. Purpose

A city landing page is a short editorial entry point into Europe Explorer, not a second tourism catalogue and not a representation of the internal data model.

Its job is to:
1. help search engines understand the destination and the page's relevance;
2. give visitors an immediate, compelling reason to explore the city;
3. explain briefly what Europe Explorer adds beyond a conventional map;
4. move the visitor into the interactive map, focused on the destination.

The page must look and feel like part of Europe Explorer. Reuse the product's visual identity, typography, colors, logo, spacing principles, and button treatment.

## 2. Non-negotiable content rules

- Never expose postal codes, postcode numbers, postal-area segmentation, database record identifiers, or internal data structures in public city-page copy.
- Do not organize visitor-facing content by postal area.
- Do not turn the landing page into a long list of attractions or a dump of database facts.
- Select only a small number of genuinely significant, verified city characteristics for the hook.
- Do not repeat the same invitation or the city name unnecessarily across the headline, supporting text, and CTA.
- Do not imply that Europe Explorer is Google Maps or merely a directions/map provider. Its value is discovering places, local highlights, stories, and less obvious points of interest.
- Do not invent historical claims, superlatives, opening information, or attractions. Verify editorial facts against reliable sources and published project data before publishing.

## 3. Required page structure

Each localized city page follows this sequence:

### A. SEO title

Purpose: communicate the destination and its strongest relevant distinction in search results.

Guidance:
- Include the canonical city name.
- Add a concise, genuinely distinctive descriptor where useful.
- Keep it natural; avoid keyword stuffing and repetitive phrases such as 'things to do', 'sights', and 'what to visit' all in one title.
- Localize the wording naturally for the target language.

### B. H1

Purpose: clearly identify the destination to the visitor.

Guidance:
- Use the city name as the H1.
- Do not force SEO keywords into the H1 if they make it unnatural.

### C. Introductory hook

Purpose: make the visitor interested in the city.

Guidance:
- Usually 1–2 concise sentences.
- Lead with a distinctive and verifiable fact: foundation, historical role, unique urban character, landmark, landscape, or cultural identity.
- Mention only a few representative highlights, not a catalogue.
- The hook should be specific to the city; generic copy that could describe any European city is not acceptable.

### D. Product-support sentence

Purpose: explain what the visitor can discover through Europe Explorer.

Guidance:
- One short sentence.
- Explain the range of discoveries: well-known landmarks as well as local stories, interesting places, and less-discovered highlights.
- Do not repeat the hook or simply say that the city is 'on the map'.

### E. Primary CTA

Purpose: take the visitor into the interactive Europe Explorer map.

Canonical Czech CTA: **Prozkoumat město**

Guidance:
- Use a short, active verb phrase.
- The CTA must clearly describe the action within Europe Explorer, not suggest opening a generic map service.
- Avoid repeating the words 'objevit/objevte' or 'město' in both the support sentence and button without a clear reason.
- Keep the primary CTA consistent across cities and localize it naturally.

## 4. Recommended Czech wording pattern

This is a structural example, not approved final copy for every destination:

- **SEO title:** České Budějovice – královské město s bohatou historií
- **H1:** České Budějovice
- **Hook:** České Budějovice založil roku 1265 český král Přemysl Otakar II. Dnes lákají historickým centrem, Černou věží, Samsonovou kašnou a příběhy, které stojí za poznání.
- **Product-support sentence:** Poznejte známá místa i méně objevené zajímavosti města prostřednictvím Europe Exploreru.
- **CTA:** Prozkoumat město

The exact wording must be fact-checked and refined before publication.

## 5. CTA localization baseline

Use these as the initial standard equivalents. A native-quality review may adjust grammar or tone, but should preserve the same intent: actively explore this city inside Europe Explorer.

| Language | Code | Primary CTA |
|---|---|---|
| Czech | cs | Prozkoumat město |
| German | de | Stadt erkunden |
| English | en | Explore the city |
| Spanish | es | Explorar la ciudad |
| French | fr | Explorer la ville |
| Italian | it | Esplora la città |
| Dutch | nl | Verken de stad |

Do not translate word-for-word where that would sound unnatural. Keep the CTA short and action-oriented.

## 6. Localization requirements

Every city page must have a complete localized version in all seven supported languages:
- cs — Czech
- de — German
- en — English
- es — Spanish
- fr — French
- it — Italian
- nl — Dutch

For every language, localize:
- SEO title;
- meta description;
- H1 and visible hook;
- product-support sentence;
- CTA;
- Open Graph title and description;
- structured-data description where applicable;
- accessible labels and image alt text where applicable.

Localization is editorial, not mechanical translation. Preserve factual accuracy, local naming conventions, natural phrasing, and the intended emotional effect.

## 7. SEO and technical requirements

- Each language version must have its own stable, indexable URL.
- Each page must declare the correct HTML lang attribute.
- Provide a self-referencing canonical URL for each localized page.
- Add reciprocal hreflang links for all available language versions, including an appropriate x-default where the routing strategy supports it.
- Localize title, meta description, Open Graph metadata, and structured data.
- Use appropriate destination structured data (normally City / Place where supported by verified facts).
- Include the page in the XML sitemap only when it is live and returns a successful indexable response.
- The primary CTA must link to the Europe Explorer application with a validated deep link that sets the correct country, destination coordinates, zoom level, and interface language.
- The application deep-link parameters are `view=map`, `country`, `lat`, `lon`, `zoom`, and `lang`. The app validates supported countries and coordinates and clamps zoom to its supported range.
- **Map framing standard:** do not default to a whole-city overview. Choose a meaningful visitor-facing focal point (normally the historic centre or principal landmark) and frame the map so visitors can immediately recognize the key place while also seeing nearby streets and secondary highlights. Avoid both extremes: a city-wide view that makes visitors hunt for the attractions, and a close-up that shows only one square or monument.
- Use zoom **17** as the current reference baseline for the České Budějovice-style historic-centre view. This is a starting point, not a universal fixed zoom: choose the nearest suitable level for each destination based on its street layout, landmark spacing, and the amount of surrounding context needed. Always verify the actual rendered view in the app.
- The app must preserve the deep-link centre and zoom after initial load. Later component updates must not reset the map to a generic city or country overview.

The reference URL pattern is `/{lang}/places/{country-slug}/{city-slug}` (for example, `/cs/places/czechia/ceske-budejovice`). Use the same pattern consistently for future destinations. The legacy unlocalized České Budějovice URL redirects to the Czech version.

## 8. Visual and UX requirements

- The landing page must look like a native Europe Explorer experience, not a disconnected microsite.
- Reuse the app's brand system rather than introducing a separate visual language.
- Keep the page focused and lightweight: destination identity, hook, one short product explanation, one primary CTA.
- Use a destination-relevant hero image only when its source and usage rights are suitable.
- The primary CTA must be visually prominent and must open the destination-focused interactive map.
- The initial map view should show the destination's most useful visitor-facing area, with enough surrounding streets and nearby highlights to provide orientation.
- Do not add postal-code lists, internal-area maps, database metadata, or large attraction catalogues.

## 9. Editorial quality checklist

Before publishing a city page, verify:

- [ ] The hook contains at least one distinctive, reliable, city-specific fact.
- [ ] The most important visitor-facing highlights are prioritized over arbitrary database order.
- [ ] No postal codes or internal data structures are visible.
- [ ] The hook, support sentence, and CTA each have a distinct purpose and do not repeat one another.
- [ ] The product-support sentence explains what Europe Explorer offers beyond a generic map.
- [ ] The CTA leads to the correct city and language in the actual application.
- [ ] The map opens at a useful visitor-facing focal point, not a whole-city overview or an excessively tight single-landmark crop.
- [ ] The map keeps its intended centre and zoom after the app finishes loading and subsequent UI updates occur.
- [ ] The chosen zoom is checked visually on mobile and desktop; zoom 17 is the České Budějovice reference baseline, not an automatic value for every city.
- [ ] All seven localized versions are complete and naturally written.
- [ ] Metadata, canonical URLs, hreflang, structured data, and sitemap entries are correct.
- [ ] The page visually matches Europe Explorer.

## 10. Reference implementation: České Budějovice

České Budějovice is the first city-page implementation and should be used to validate this standard. Its public page should be reduced to the structure in section 3. The existing long attraction-card listing is not the target experience.

The internal postal-area records may continue to power map discoveries behind the scenes. They must remain invisible as a concept in the city landing-page experience.


## 11. Implemented reference baseline

The first reference implementation is available in all seven languages at `/{lang}/places/czechia/ceske-budejovice`. It uses the Europe Explorer dark/navy and amber visual identity, localized metadata and page copy, language switching, canonical and reciprocal hreflang links, City structured data, and a CTA deep link centered on the historic city centre. The old unlocalized route redirects to the Czech page. All seven URLs are included in the XML sitemap.


## 12. Map framing reference: České Budějovice

The approved reference framing is the historic centre around Samson Fountain and Přemysl Otakar II Square, at approximately **48.97456, 14.47428**, with **zoom 17**. The intended composition includes the square and fountain as the immediate focal point, while retaining nearby streets and surrounding historic-centre landmarks such as the Black Tower in the broader visible context where the viewport permits.

This is the visual standard to follow for future city landing pages: **landmark-centred, neighbourhood-aware**. Visitors should understand where to begin exploring without needing prior knowledge of the city. For each new destination, select and verify its own focal coordinates and zoom rather than blindly copying České Budějovice coordinates or assuming zoom 17 fits every city.
