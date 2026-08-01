-- 01 — Basic SELECT and WHERE

-- Sample data
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (name, email, active) VALUES
    ('Alice', 'alice@example.com', TRUE),
    ('Bob', 'bob@example.com', TRUE),
    ('Carol', 'carol@example.com', FALSE),
    ('Dave', 'dave@example.com', TRUE)
ON CONFLICT DO NOTHING;

-- Basic SELECT with WHERE and ORDER BY
SELECT id, name, email
FROM users
WHERE active = TRUE
ORDER BY created_at DESC
LIMIT 10;

-- Comparison operators
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id > 2;
SELECT * FROM users WHERE name LIKE 'A%';           -- prefix match (uses index)
SELECT * FROM users WHERE email ILIKE '%@example%'; -- case-insensitive substring
SELECT * FROM users WHERE active IS TRUE;           -- IS TRUE (proper boolean check)

-- NULL handling
SELECT * FROM users WHERE email IS NOT NULL;
SELECT * FROM users WHERE email IS NULL;

-- BETWEEN
SELECT * FROM users WHERE id BETWEEN 1 AND 3;

-- IN
SELECT * FROM users WHERE id IN (1, 3);

-- Cleanup
DROP TABLE users;