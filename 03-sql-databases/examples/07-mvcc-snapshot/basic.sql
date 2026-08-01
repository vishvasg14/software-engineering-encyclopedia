-- 07 — MVCC: inspecting xmin/xmax/ctid

CREATE TABLE IF NOT EXISTS accounts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    balance NUMERIC(10,2) NOT NULL
);

-- Initial insert
INSERT INTO accounts (name, balance) VALUES ('Alice', 1000);

-- Inspect version info
SELECT
    xmin AS inserted_by_xid,
    xmax AS deleted_by_xid,
    ctid AS physical_location,
    id,
    name,
    balance
FROM accounts;

-- Trigger a version chain (UPDATE creates new tuple)
BEGIN;
    UPDATE accounts SET balance = balance + 1 WHERE id = 1;
    SELECT xmin, xmax, ctid, balance FROM accounts;
COMMIT;

-- After commit, the new tuple is visible
SELECT xmin, xmax, ctid, balance FROM accounts;

-- pg_stat_user_tables shows dead tuples (visible until VACUUM)
SELECT n_live_tup, n_dead_tup
FROM pg_stat_user_tables
WHERE relname = 'accounts';

-- Manual VACUUM reclaims space
VACUUM accounts;

SELECT n_live_tup, n_dead_tup
FROM pg_stat_user_tables
WHERE relname = 'accounts';

-- Cleanup
DROP TABLE accounts;