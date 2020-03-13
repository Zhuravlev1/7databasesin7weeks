-- 1) ==========================================================================
CREATE RULE delete_venue AS
  ON DELETE TO venues DO INSTEAD
  UPDATE venues SET active = false WHERE venue_id = OLD.venue_id;
-- 2) ==========================================================================
SELECT * FROM crosstab(
    'SELECT extract(year from starts) as year,
  extract(month from starts) as month, count(*)
  FROM events
  GROUP BY year, month',
  'SELECT * FROM generate_series(1, 12);'
) AS (
  year int,
  jan int, feb int, mar int, apr int, may int, jun int,
  jul int, aug int, sep int, oct int, nov int, dec int
) ORDER BY YEAR;
-- 3) ==========================================================================
SELECT * FROM crosstab(
    'SELECT extract(week from starts) AS week, extract(dow from starts) AS dow, count(*) FROM events GROUP BY week, dow ORDER BY week, dow;',
    'SELECT * FROM generate_series(0,6)'
) AS (
    week int, Sun int, Mon int, Tue int, Wed int, Thu int, Fri int, Sat int
) ORDER BY week;
