-- 08 — Reading EXPLAIN ANALYZE

CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generate sample data
INSERT INTO orders (user_id, amount)
SELECT
    (random() * 100)::BIGINT + 1 AS user_id,
    (random() * 1000)::NUMERIC(10,2) AS amount
FROM generate_series(1, 100000);

-- Without index: seq scan
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE user_id = 50;

-- Add an index
CREATE INDEX orders_user_id_idx ON orders (user_id);
ANALYZE orders;

-- Now index scan
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE user_id = 50;

-- Join with different strategies
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.id, COUNT(o.id)
FROM orders o
JOIN (SELECT generate_series(1, 100) AS id) u ON u.id = o.user_id
GROUP BY u.id;

-- Cleanup
DROP TABLE orders;