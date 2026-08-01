-- 04 — Window functions

CREATE TABLE IF NOT EXISTS employees (
    id BIGSERIAL PRIMARY KEY,
    department TEXT NOT NULL,
    name TEXT NOT NULL,
    salary NUMERIC(10,2) NOT NULL,
    hire_date DATE NOT NULL
);

INSERT INTO employees (department, name, salary, hire_date) VALUES
    ('Eng', 'Alice', 120000, '2020-01-15'),
    ('Eng', 'Bob', 130000, '2019-05-20'),
    ('Eng', 'Carol', 110000, '2021-03-10'),
    ('Eng', 'Dan', 90000, '2022-08-01'),
    ('Sales', 'Eve', 95000, '2020-06-15'),
    ('Sales', 'Frank', 105000, '2019-11-30')
ON CONFLICT DO NOTHING;

-- RANK and DENSE_RANK within department
SELECT
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_gaps,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_no_gaps,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num
FROM employees;

-- Running totals and LAG/LEAD
SELECT
    name,
    hire_date,
    salary,
    SUM(salary) OVER (PARTITION BY department ORDER BY hire_date) AS running_total,
    LAG(salary) OVER (PARTITION BY department ORDER BY hire_date) AS prev_salary,
    LEAD(salary) OVER (PARTITION BY department ORDER BY hire_date) AS next_salary
FROM employees;

-- First/Last within a window
SELECT DISTINCT
    department,
    FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS highest_paid,
    LAST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_paid
FROM employees;

-- Cleanup
DROP TABLE employees;