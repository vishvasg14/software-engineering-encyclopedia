-- 09 — Indexes: B-tree and Hash

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (email, name)
SELECT
    'user' || n || '@example.com',
    'User ' || n
FROM generate_series(1, 10000) AS n;

-- Default B-tree on primary key (already exists)
\d users

-- B-tree on email
CREATE INDEX users_email_idx ON users (email);

-- Composite index (column order matters!)
CREATE INDEX users_created_name_idx ON users (created_at, name);

-- Hash index (rare; usually no advantage over B-tree for equality)
CREATE INDEX users_email_hash_idx ON users USING hash (email);

-- Verify planner uses indexes
EXPLAIN SELECT * FROM users WHERE email = 'user5000@example.com';
EXPLAIN SELECT * FROM users WHERE created_at >= NOW() - INTERVAL '1 day' ORDER BY created_at, name;

-- Cleanup
DROP TABLE users;