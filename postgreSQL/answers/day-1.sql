-- 1) ==========================================================================
SELECT
  class.relname     AS tablename,
  namespace.nspname AS schema,
  auth.rolname      AS owner
FROM pg_class class
  INNER JOIN pg_authid auth ON class.relowner = auth.OID
  INNER JOIN pg_namespace namespace ON class.relnamespace = namespace.oid
WHERE class.relkind = 'r'
  AND auth.rolname = 'sevenDatabases'
  AND namespace.nspname = 'public';
-- 2) ==========================================================================
SELECT country_name
FROM events
    JOIN venues v on events.venue_id = v.venue_id
    JOIN countries c on v.country_code = c.country_code
WHERE title LIKE '%LARP Club%';
-- 3) ==========================================================================
ALTER TABLE venues ADD COLUMN active boolean DEFAULT TRUE;
-- ==========================================================================
