-- 12 — WAL and crash recovery basics

-- Inspect WAL configuration
SHOW wal_level;
SHOW archive_mode;
SHOW max_wal_size;
SHOW min_wal_size;

-- Current WAL location
SELECT pg_current_wal_lsn();

-- Force a checkpoint (flushes dirty pages)
CHECKPOINT;

-- Insert data — generates WAL
CREATE TABLE IF NOT EXISTS demo (id INT);
INSERT INTO demo VALUES (1), (2), (3);
SELECT pg_current_wal_lsn();

-- Check WAL activity
SELECT
    pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), '0/0')) AS total_wal_generated;

-- Cleanup
DROP TABLE demo;