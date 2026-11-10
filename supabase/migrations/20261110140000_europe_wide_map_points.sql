-- Europe-wide viewport map points.
-- Keep the original RPC signature backward compatible while allowing NULL = all countries.
create or replace function public.get_explorer_map_points(
  p_country_code text,
  p_south double precision,
  p_west double precision,
  p_north double precision,
  p_east double precision,
  p_zoom integer,
  p_limit integer default 800
)
returns table(
  id bigint, postal_code text, city text, fact_id text, title text, category text,
  lat double precision, lon double precision, point_count integer, is_cluster boolean
)
language plpgsql
stable
set search_path to 'public'
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 800), 1), 1000);
  v_cell double precision;
begin
  if p_south is null or p_west is null or p_north is null or p_east is null
     or p_south < -90 or p_north > 90 or p_west < -180 or p_east > 180
     or p_south >= p_north or p_west >= p_east then
    return;
  end if;

  if p_zoom <= 7 then
    v_cell := case when p_zoom <= 4 then 3.0 when p_zoom <= 5 then 1.5 else 0.75 end;
    return query
    select null::bigint, null::text, null::text, null::text, null::text, null::text,
      avg(mp.lat), avg(mp.lon), count(*)::integer, true
    from public.explorer_map_points mp
    where (p_country_code is null or mp.country_code = upper(p_country_code))
      and mp.lat between p_south and p_north
      and mp.lon between p_west and p_east
    group by floor(mp.lat / v_cell), floor(mp.lon / v_cell)
    order by floor(mp.lat / v_cell), floor(mp.lon / v_cell)
    limit v_limit;
  else
    return query
    select mp.postal_id, mp.postal_code, mp.city, mp.fact_id, mp.title, mp.category,
      mp.lat, mp.lon, 1::integer, false
    from public.explorer_map_points mp
    where (p_country_code is null or mp.country_code = upper(p_country_code))
      and mp.lat between p_south and p_north
      and mp.lon between p_west and p_east
    order by mp.postal_code, mp.fact_id
    limit v_limit;
  end if;
end;
$function$;

-- New RPC exposes country_code for individual facts and loads all countries.
-- Aggregate clusters intentionally have NULL country_code because they can contain
-- facts from multiple countries.
create or replace function public.get_explorer_map_points_v2(
  p_south double precision,
  p_west double precision,
  p_north double precision,
  p_east double precision,
  p_zoom integer,
  p_limit integer default 800
)
returns table(
  id bigint, country_code text, postal_code text, city text, fact_id text,
  title text, category text, lat double precision, lon double precision,
  point_count integer, is_cluster boolean
)
language plpgsql
stable
set search_path to 'public'
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 800), 1), 1000);
  v_cell double precision;
begin
  if p_south is null or p_west is null or p_north is null or p_east is null
     or p_south < -90 or p_north > 90 or p_west < -180 or p_east > 180
     or p_south >= p_north or p_west >= p_east then
    return;
  end if;

  if p_zoom <= 7 then
    v_cell := case when p_zoom <= 4 then 3.0 when p_zoom <= 5 then 1.5 else 0.75 end;
    return query
    select null::bigint, null::text, null::text, null::text, null::text, null::text, null::text,
      avg(mp.lat), avg(mp.lon), count(*)::integer, true
    from public.explorer_map_points mp
    where mp.lat between p_south and p_north
      and mp.lon between p_west and p_east
    group by floor(mp.lat / v_cell), floor(mp.lon / v_cell)
    order by floor(mp.lat / v_cell), floor(mp.lon / v_cell)
    limit v_limit;
  else
    return query
    select mp.postal_id, mp.country_code, mp.postal_code, mp.city, mp.fact_id,
      mp.title, mp.category, mp.lat, mp.lon, 1::integer, false
    from public.explorer_map_points mp
    where mp.lat between p_south and p_north
      and mp.lon between p_west and p_east
    order by mp.postal_code, mp.fact_id
    limit v_limit;
  end if;
end;
$function$;

grant execute on function public.get_explorer_map_points_v2(
  double precision, double precision, double precision, double precision, integer, integer
) to anon, authenticated;
