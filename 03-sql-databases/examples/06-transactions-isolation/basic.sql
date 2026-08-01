-- 06 — Transactions and isolation levels

CREATE TABLE IF NOT EXISTS accounts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    balance NUMERIC(10,2) NOT NULL CHECK (balance >= 0)
);

INSERT INTO accounts (name, balance) VALUES ('Alice', 1000), ('Bob', 1000) ON CONFLICT DO NOTHING;

-- Basic transaction (READ COMMITTED, default)
BEGIN;
    UPDATE accounts SET balance = balance - 100 WHERE name = 'Alice';
    UPDATE accounts SET balance = balance + 100 WHERE name = 'Bob';
    -- COMMIT or ROLLBACK
COMMIT;

-- Savepoint
BEGIN;
    UPDATE accounts SET balance = balance - 50 WHERE name = 'Alice';
    SAVEPOINT sp1;
    UPDATE accounts SET balance = balance - 9999 WHERE name = 'Alice';
    -- this would violate CHECK; rollback to savepoint
    ROLLBACK TO sp1;
    -- balance is now 950, not -9049
COMMIT;

-- REPEATABLE READ snapshot
BEGIN ISOLATION LEVEL REPEATABLE READ;
    SELECT * FROM accounts WHERE name = 'Alice';  -- sees balance at this snapshot
    -- another tx commits changes; we don't see them in this transaction
    -- SELECT ... would still see 950
COMMIT;

-- SERIALIZABLE (SSI) — detects write skew
BEGIN ISOLATION LEVEL SERIALIZABLE;
    SELECT * FROM accounts WHERE balance > 0;  -- pattern that could cause conflict
    UPDATE accounts SET balance = balance + 100 WHERE name = 'Alice';
    UPDATE accounts SET balance = balance - 100 WHERE name = 'Bob';
    -- if another tx does conflicting reads/updates, one of us will fail with:
    -- ERROR: could not serialize access due to read/write dependencies
COMMIT;

-- Cleanup
DROP TABLE accounts;