-- Synchronize the Supabase DE V3.1 validator with the canonical TRAVEL map-category contract.
-- Every fact must carry exactly one map_category from the shared 17-value taxonomy.

UPDATE public.explorer_validation_schemas
SET schema = jsonb_set(
  jsonb_set(
    jsonb_set(
      schema,
      '{$defs,fact,required}',
      (schema #> '{$defs,fact,required}') || '["map_category"]'::jsonb,
      true
    ),
    '{$defs,fact,properties,map_category,enum}',
    '["castle","religious_site","historical_monument","architecture","historic_city","museum","archaeological_site","nature","viewpoint_landscape","park_garden","technical_heritage","cultural_site","visitor_attraction","local_culture","science_site","personality","sports_venue"]'::jsonb,
    true
  ),
  '{$defs,fact,properties,map_category,description}',
  '"Single primary map category for the specific subject of this fact. Required for every fact. Use personality for facts whose primary subject is a specific person, regardless of the physical site used for the map location."'::jsonb,
  true
),
updated_at = now()
WHERE country_code = 'DE'
  AND schema_version = 'V3.1';

-- Remove the legacy-optional wording so the registry describes the enforced contract.
UPDATE public.explorer_validation_schemas
SET schema = jsonb_set(
  schema,
  '{$comment}',
  '"CONTENT STANDARD V3.1: every fact must include exactly one map_category from the shared 17-value TRAVEL taxonomy. This is mandatory for all records; no legacy fallback to editorial category is permitted. personality identifies person-centred facts independently of their physical pin location."'::jsonb,
  true
),
updated_at = now()
WHERE country_code = 'DE'
  AND schema_version = 'V3.1';
