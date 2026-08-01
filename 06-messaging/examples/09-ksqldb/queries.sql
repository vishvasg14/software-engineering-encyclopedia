-- 09 — ksqlDB queries

-- Create a stream from a Kafka topic
CREATE STREAM orders (
    id BIGINT,
    customer_id BIGINT,
    amount DOUBLE,
    created_at TIMESTAMP
) WITH (
    KAFKA_TOPIC = 'orders',
    VALUE_FORMAT = 'JSON',
    TIMESTAMP = 'created_at'
);

-- Filter and project
CREATE STREAM large_orders AS
    SELECT id, customer_id, amount
    FROM orders
    WHERE amount > 1000;

-- Aggregate per customer
CREATE TABLE customer_totals AS
    SELECT customer_id,
           COUNT(*) AS order_count,
           SUM(amount) AS total_amount,
           AVG(amount) AS avg_amount
    FROM orders
    WINDOW TUMBLING (SIZE 1 HOUR)
    GROUP BY customer_id;

-- Query: top customers by total
SELECT customer_id, total_amount
FROM customer_totals
WHERE rowkey IS NOT NULL
ORDER BY total_amount DESC
LIMIT 10;

-- Join with reference data
CREATE TABLE customers (
    id BIGINT PRIMARY KEY,
    name VARCHAR,
    email VARCHAR
) WITH (
    KAFKA_TOPIC = 'customers',
    VALUE_FORMAT = 'JSON'
);

CREATE STREAM orders_with_customers AS
    SELECT o.id, o.amount, c.name, c.email
    FROM orders o
    LEFT JOIN customers c
        ON o.customer_id = c.id;