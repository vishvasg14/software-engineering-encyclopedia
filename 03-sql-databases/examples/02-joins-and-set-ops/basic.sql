-- 02 — Joins and set operations

CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id),
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS suppliers (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO customers (name) VALUES ('Alice'), ('Bob'), ('Carol'), ('Dan') ON CONFLICT DO NOTHING;
INSERT INTO orders (customer_id, amount) VALUES
    (1, 50.00), (1, 75.00), (2, 100.00), (3, 25.00)
ON CONFLICT DO NOTHING;
INSERT INTO suppliers (name) VALUES ('Alice'), ('Eve') ON CONFLICT DO NOTHING;

-- INNER JOIN — only matching rows
SELECT c.name AS customer, COUNT(o.id) AS orders, COALESCE(SUM(o.amount), 0) AS total
FROM customers c
INNER JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY total DESC;

-- LEFT JOIN — all customers, with 0 for those with no orders
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY c.name;

-- Set operations
SELECT name FROM customers UNION SELECT name FROM suppliers;             -- dedup
SELECT name FROM customers UNION ALL SELECT name FROM suppliers;         -- preserve dupes
SELECT name FROM customers INTERSECT SELECT name FROM suppliers;
SELECT name FROM customers EXCEPT SELECT name FROM suppliers;

-- Cleanup
DROP TABLE orders, customers, suppliers;