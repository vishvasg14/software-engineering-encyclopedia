-- 11 — VACUUM and bloat

CREATE TABLE IF NOT EXISTS hot_table (
    id BIGSERIAL PRIMARY KEY,
    counter BIGINT NOT NULL DEFAULT 0
);

INSERT INTO hot_table (counter)
SELECT 0 FROM generate_series(1, 100000);

-- Generate bloat via many UPDATEs
DO $$
BEGIN
    FOR i IN 1..100 LOOP
        UPDATE hot_table SET counter = counter + 1;
    END LOOP;
END $$;

-- Show bloat
SELECT
    schemaname || '.' || tablename AS table_name,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
    n_live_tup,
    n_dead_tup,
    ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_pct
FROM pg_stat_user_tables
WHERE relname = 'hot_table';

-- Run VACUUM
VACUUM (VERBOSE, ANALYZE) hot_table;

-- Recheck
SELECT
    n_live_tup,
    n_dead_tup,
    ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_pct
FROM pg_stat_user_tables
WHERE relname = 'hot_table';

-- Configure autovacuum aggressively for hot tables
ALTER TABLE hot_table SET (
    autovacuum_vacuum_scale_factor = 0.02,
    autovacuum_analyze_scale_factor = 0.01
);

-- Cleanup
DROP TABLE hot_table;