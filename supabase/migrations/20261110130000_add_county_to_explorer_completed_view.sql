-- Expose the authoritative county field in the completed Explorer metadata view.
-- Keep district separate: it represents a Stadtteil/Ortsteil, not a Landkreis.
create or replace view public.postal_codes_explorer_completed as
WITH schema_def AS (
  SELECT explorer_validation_schemas.schema::json AS schema
  FROM explorer_validation_schemas
  WHERE explorer_validation_schemas.country_code = 'DE'
    AND explorer_validation_schemas.schema_version = 'V3.1'
), eligible AS (
  SELECT pc_1.id
  FROM postal_codes pc_1
  CROSS JOIN schema_def sd
  WHERE pc_1.status = 'published'
    AND pc_1.country_code = 'DE'
    AND cardinality(jsonschema_validation_errors(sd.schema, pc_1.content::json)) = 0
    AND jsonb_typeof(pc_1.content -> 'facts') = 'array'
    AND jsonb_array_length(pc_1.content -> 'facts') > 0
    AND NOT EXISTS (
      SELECT 1
      FROM jsonb_array_elements(pc_1.content -> 'facts') base_fact(fact)
      WHERE jsonb_typeof(base_fact.fact -> 'location') IS DISTINCT FROM 'object'
         OR NOT base_fact.fact ? 'location'
    )
    AND NOT EXISTS (
      SELECT 1
      FROM unnest(ARRAY['cs','de','en','es','fr','it']) language(code)
      WHERE jsonb_typeof((pc_1.content -> 'translations') -> language.code -> 'facts') IS DISTINCT FROM 'array'
         OR jsonb_array_length((pc_1.content -> 'translations') -> language.code -> 'facts')
            IS DISTINCT FROM jsonb_array_length(pc_1.content -> 'facts')
         OR EXISTS (
           SELECT 1
           FROM jsonb_array_elements(pc_1.content -> 'facts') WITH ORDINALITY b(fact, ord)
           FULL JOIN jsonb_array_elements(
             CASE
               WHEN jsonb_typeof((pc_1.content -> 'translations') -> language.code -> 'facts') = 'array'
               THEN (pc_1.content -> 'translations') -> language.code -> 'facts'
               ELSE '[]'::jsonb
             END
           ) WITH ORDINALITY t(fact, ord) USING (ord)
           WHERE b.ord IS NULL OR t.ord IS NULL
              OR (b.fact ->> 'id') IS DISTINCT FROM (t.fact ->> 'id')
         )
    )
)
SELECT pc.id,
       pc.country_code,
       pc.postal_code,
       pc.city,
       pc.municipality,
       pc.district,
       pc.region,
       pc.latitude,
       pc.longitude,
       pc.content ->> 'county' AS county
FROM postal_codes pc
JOIN eligible e ON e.id = pc.id;
