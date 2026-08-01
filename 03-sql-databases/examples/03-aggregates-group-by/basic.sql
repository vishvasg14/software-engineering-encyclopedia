-- 03 — Aggregates and GROUP BY

CREATE TABLE IF NOT EXISTS employees (
    id BIGSERIAL PRIMARY KEY,
    department TEXT NOT NULL,
    name TEXT NOT NULL,
    salary NUMERIC(10,2) NOT NULL,
    hire_date DATE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO employees (department, name, salary, hire_date) VALUES
    ('Eng', 'Alice', 120000, '2020-01-15', TRUE),
    ('Eng', 'Bob', 130000, '2019-05-20', TRUE),
    ('Eng', 'Carol', 110000, '2021-03-10', TRUE),
    ('Eng', 'Dan', 90000, '2022-08-01', FALSE),
    ('Sales', 'Eve', 95000, '2020-06-15', TRUE),
    ('Sales', 'Frank', 105000, '2019-11-30', TRUE),
    ('Sales', 'Grace', 85000, '2021-04-22', TRUE),
    ('HR', 'Heidi', 75000, '2020-02-10', TRUE)
ON CONFLICT DO NOTHING;

-- Aggregates per department
SELECT
    department,
    COUNT(*) AS headcount,
    ROUND(AVG(salary)::numeric, 2) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary,
    SUM(salary) AS total_salary
FROM employees
WHERE active = TRUE
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY avg_salary DESC;

-- FILTER (PG extension)
SELECT
    department,
    COUNT(*) FILTER (WHERE active) AS active_count,
    COUNT(*) FILTER (WHERE NOT active) AS inactive_count
FROM employees
GROUP BY department;

-- Ordered-set aggregates (PG)
SELECT
    department,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary,
    PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary_disc
FROM employees
GROUP BY department;

-- Cleanup
DROP TABLE employees;