-- 20 — Normalization

-- Unnormalized (1NF violation: multiple products per row)
DROP TABLE IF EXISTS orders_unnorm;
CREATE TABLE orders_unnorm (
    order_id INT,
    customer TEXT,
    products TEXT  -- comma-separated, violates 1NF
);
INSERT INTO orders_unnorm VALUES
    (1, 'Alice', 'Book,Pen'),
    (2, 'Bob', 'Notebook');

-- 1NF: split products into separate rows
DROP TABLE IF EXISTS orders_1nf;
CREATE TABLE orders_1nf (
    order_id INT,
    customer TEXT,
    product TEXT
);
INSERT INTO orders_1nf VALUES
    (1, 'Alice', 'Book'),
    (1, 'Alice', 'Pen'),
    (2, 'Bob', 'Notebook');

-- 2NF: separate customers from orders (no partial dependency)
DROP TABLE IF EXISTS customers, orders_2nf CASCADE;
CREATE TABLE customers (
    customer_id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE orders_2nf (
    order_id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(customer_id),
    product TEXT NOT NULL
);
INSERT INTO customers (name) VALUES ('Alice'), ('Bob');
INSERT INTO orders_2nf (customer_id, product) VALUES
    (1, 'Book'),
    (1, 'Pen'),
    (2, 'Notebook');

-- 3NF: ensure non-key attributes don't depend on other non-key attributes
DROP TABLE IF EXISTS employees_normalized CASCADE;
CREATE TABLE departments (
    dept_id BIGSERIAL PRIMARY KEY,
    dept_name TEXT NOT NULL,
    location TEXT  -- depends only on dept_id (the key)
);
CREATE TABLE employees_normalized (
    emp_id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    dept_id BIGINT NOT NULL REFERENCES departments(dept_id)
);
INSERT INTO departments (dept_name, location) VALUES ('Eng', 'Building A'), ('Sales', 'Building B');
INSERT INTO employees_normalized (name, dept_id) VALUES
    ('Alice', 1), ('Bob', 1), ('Carol', 2);

-- Denormalization example: trade-off for read performance
DROP TABLE IF EXISTS employees_denorm;
CREATE TABLE employees_denorm (
    emp_id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    dept_name TEXT NOT NULL,  -- duplicated
    dept_location TEXT        -- duplicated
);
INSERT INTO employees_denorm (name, dept_name, dept_location) VALUES
    ('Alice', 'Eng', 'Building A'),
    ('Bob', 'Eng', 'Building A'),
    ('Carol', 'Sales', 'Building B');

-- Trade-off: reads are fast (no JOIN), but updates must propagate.

-- Cleanup
DROP TABLE IF EXISTS orders_unnorm, orders_1nf, customers, orders_2nf,
    departments, employees_normalized, employees_denorm;