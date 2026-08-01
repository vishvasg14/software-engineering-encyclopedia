-- 10 — Partial and expression indexes

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (email, name, active)
SELECT 'user' || n || '@example.com',
       'User ' || n,
       n % 5 != 0  -- ~80% active
FROM generate_series(1, 10000) AS n;

-- Partial index: only active users (much smaller, faster for the common query)
CREATE INDEX users_active_email_idx ON users (email) WHERE active;

-- Expression index for case-insensitive email lookup
CREATE INDEX users_lower_email_idx ON users (lower(email));

-- Composite expression index
CREATE INDEX users_lower_email_active_idx ON users (lower(email), active);

-- Verify usage
EXPLAIN SELECT * FROM users WHERE email = 'user100@example.com' AND active;
EXPLAIN SELECT * FROM users WHERE lower(email) = 'user100@example.com';

-- Cleanup
DROP TABLE users;