-- 14 — Connection pooling best practices

-- Configure for pooling-friendly behavior:

-- Don't use session-level features:
--   - SET (use ALTER ROLE or database settings)
--   - LISTEN/NOTIFY (limited support in transaction pooling)
--   - Temporary tables (use TEMP at function level or session-pooling mode)
--   - Advisory locks (only work in session-pooling mode)

-- For prepared statements in transaction-pooling mode, use
-- unnamed prepared statements (which PgBouncer handles natively).

-- Check PgBouncer stats
-- $ psql -h pgbouncer -p 6432 -U postgres pgbouncer
-- > SHOW POOLS;
-- > SHOW STATS;

-- In your application, set:
--   ?pgbouncer=true   (in JDBC)
--   ?statement_cache_size=0  (avoid stale plans across pooled connections)

-- Query to test connection pooling
SELECT current_setting('max_connections') AS max_conn;
SELECT count(*) FROM pg_stat_activity;

-- Cleanup
-- (nothing to clean up; just configuration)
SELECT 'See pgbouncer docs';