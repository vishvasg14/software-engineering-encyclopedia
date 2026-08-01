-- 05 — CTEs and recursive queries

CREATE TABLE IF NOT EXISTS employees (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    manager_id BIGINT REFERENCES employees(id)
);

INSERT INTO employees (id, name, manager_id) VALUES
    (1, 'CEO', NULL),
    (2, 'CTO', 1),
    (3, 'CFO', 1),
    (4, 'Eng Director', 2),
    (5, 'Eng Manager', 4),
    (6, 'Engineer 1', 5),
    (7, 'Engineer 2', 5),
    (8, 'Finance Manager', 3)
ON CONFLICT DO NOTHING;
SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));

-- Simple CTE
WITH high_salary AS (
    SELECT * FROM employees WHERE id > 0
)
SELECT * FROM high_salary;

-- Recursive CTE: org chart starting from CEO
WITH RECURSIVE org_chart AS (
    -- base case
    SELECT id, name, manager_id, 0 AS depth, name::TEXT AS path
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    -- recursive case
    SELECT e.id, e.name, e.manager_id, oc.depth + 1,
           oc.path || ' > ' || e.name
    FROM employees e
    INNER JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY depth, name;

-- Recursive CTE: generate numbers 1..10
WITH RECURSIVE nums(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 10
)
SELECT * FROM nums;

-- Recursive CTE: graph reachability
CREATE TABLE IF NOT EXISTS nodes (id INT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS edges (from_id INT, to_id INT);
INSERT INTO nodes VALUES (1), (2), (3), (4), (5);
INSERT INTO edges VALUES (1, 2), (2, 3), (3, 4), (4, 5);

WITH RECURSIVE reach AS (
    SELECT 1 AS id, 1 AS hops
    UNION
    SELECT e.to_id, r.hops + 1
    FROM edges e
    JOIN reach r ON e.from_id = r.id
    WHERE r.hops < 10
)
SELECT * FROM reach ORDER BY hops;

-- Cleanup
DROP TABLE reach, edges, nodes, employees;