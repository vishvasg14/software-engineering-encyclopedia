# SQL Standard Reference

The SQL standard is published by ISO/IEC as ISO/IEC 9075. This file catalogs the SQL standard editions, structure, and references used in the SQL & Databases document.

## Editions

| Year | Name | Notable additions |
|------|------|------------------|
| 1986 | SQL-86 / SQL-87 | First standard (ANSI X3.135-1986, ISO 9075:1987) |
| 1989 | SQL-89 | Integrity constraints, minor refinements |
| 1992 | SQL-92 (SQL2) | Major rewrite; new types, JOIN syntax, subqueries, set operations |
| 1999 | SQL:1999 (SQL3) | Object-relational features, recursive queries, OLAP, regular expressions, Java in DB |
| 2003 | SQL:2003 | XML, sequences, identity columns, window functions, MERGE |
| 2006 | SQL:2006 | XML Publish (XQuery), integration with SQL/XML |
| 2008 | SQL:2008 | Triggers, ORDER BY in subqueries |
| 2011 | SQL:2011 | Temporal features (time periods), pipelined DML |
| 2016 | SQL:2016 | JSON (JSONPath, JSON_TABLE), polymorphic table functions |
| 2019 | SQL:2019 | Multidimensional arrays, JavaScript Object Notation |
| 2023 | SQL:2023 | Property graph queries (SQL/PGQ), new JSON features, `LIKE_REGEX` improvements |

## Where to find the standard

The SQL standard is **not free** — it's a commercial document. Approximate cost: $250+ USD per edition.

- **ISO catalog:** <https://www.iso.org/standard/76583.html> (latest)
- **ANSI catalog:** <https://webstore.ansi.org/>

## Free alternatives

- **SQL-92 draft (PostgreSQL mirror):** <https://www.postgresql.org/docs/current/sql-syntax.html>
- **SQL:2016 draft mirror (Whitemarsh):** <https://drafts.sqlsm.org/sql-standard-2016-12/>
- **SQL standard wiki:** <https://wiki.postgresql.org/wiki/SQL_standard_support>

## Standard structure

The SQL standard is organized in multiple parts:

| Part | Title |
|------|-------|
| 1 | Framework (logical architecture, terminology) |
| 2 | Foundation (data model, syntax, queries) |
| 3 | Call-Level Interface (SQL/CLI) |
| 4 | Persistent Stored Modules (SQL/PSM) |
| 5 | Host Language Bindings (SQL/Bindings) |
| 6 | Object Language Bindings (SQL/OLB) |
| 7 | Information and Definition Schema |
| 8 | SQL/XML |
| 9 | SQL/Management of External Data (SQL/MED) |
| 10 | SQL/Object Language Bindings |
| 11 | SQL/Schemata |
| 12 | SQL/Replication |
| 13 | SQL/JRT (Java Routines and Types) |
| 14 | SQL/XML |
| 15 | SQL/MDA (Multi-Dimensional Arrays) |
| 16 | SQL/PGQ (Property Graph Queries) — SQL:2023 |

## Key concepts in the standard

### Data types

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23data-types%0A%0ASection%20title%3A%20Data%20types' target='_blank' rel='noopener' data-askgpt='Data types' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#data-types' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23data-types%0A%0ASection%20title%3A%20Data%20types' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23data-types%0A%0ASection%20title%3A%20Data%20types' title='Ask ChatGPT about this section'>💬</a>
- **CHARACTER VARYING / VARCHAR** — variable-length string.
- **CHARACTER / CHAR** — fixed-length string (padded with spaces).
- **NUMERIC** / **DECIMAL** — exact decimal.
- **INTEGER**, **SMALLINT**, **BIGINT** — exact integers.
- **FLOAT**, **REAL**, **DOUBLE PRECISION** — approximate.
- **DATE**, **TIME**, **TIMESTAMP**, **INTERVAL** — temporal.
- **BOOLEAN** — truth value.
- **BLOB**, **CLOB**, **NCLOB** — large objects.

### Statements

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23statements%0A%0ASection%20title%3A%20Statements' target='_blank' rel='noopener' data-askgpt='Statements' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#statements' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23statements%0A%0ASection%20title%3A%20Statements' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23statements%0A%0ASection%20title%3A%20Statements' title='Ask ChatGPT about this section'>💬</a>
- **SELECT** (with optional `INTO` for embedded SQL).
- **INSERT**, **UPDATE**, **DELETE**, **MERGE** (since SQL:2003).
- **CREATE**, **ALTER**, **DROP** (DDL).
- **GRANT**, **REVOKE** (DCL).
- **COMMIT**, **ROLLBACK** (TCL).
- **CALL** — invoke a stored procedure (SQL/PSM).

### Clauses

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23clauses%0A%0ASection%20title%3A%20Clauses' target='_blank' rel='noopener' data-askgpt='Clauses' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#clauses' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23clauses%0A%0ASection%20title%3A%20Clauses' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23clauses%0A%0ASection%20title%3A%20Clauses' title='Ask ChatGPT about this section'>💬</a>
- **FROM** — source tables, subqueries, joins.
- **WHERE** — row filter.
- **GROUP BY** — aggregate grouping.
- **HAVING** — aggregate filter.
- **ORDER BY** — sort.
- **LIMIT / OFFSET** (non-standard; most dialects).
- **FETCH FIRST n ROWS ONLY** (SQL:2008 standard).
- **WITH** — CTEs (SQL:1999).
- **WINDOW** — window function definitions (SQL:2003).

### Predicates

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23predicates%0A%0ASection%20title%3A%20Predicates' target='_blank' rel='noopener' data-askgpt='Predicates' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#predicates' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23predicates%0A%0ASection%20title%3A%20Predicates' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23predicates%0A%0ASection%20title%3A%20Predicates' title='Ask ChatGPT about this section'>💬</a>
- **Comparison:** `=`, `<>`, `<`, `>`, `<=`, `>=`.
- **Logical:** `AND`, `OR`, `NOT`.
- **NULL tests:** `IS NULL`, `IS NOT NULL`.
- **Range:** `BETWEEN`.
- **Set membership:** `IN`, `NOT IN`.
- **Existence:** `EXISTS`.
- **Quantified:** `= ANY`, `<> ALL`.
- **Pattern matching:** `LIKE`, `SIMILAR TO` (SQL:1999), `REGEX` (SQL:2023).

### Set operations

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23set-operations%0A%0ASection%20title%3A%20Set%20operations' target='_blank' rel='noopener' data-askgpt='Set operations' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#set-operations' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23set-operations%0A%0ASection%20title%3A%20Set%20operations' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23set-operations%0A%0ASection%20title%3A%20Set%20operations' title='Ask ChatGPT about this section'>💬</a>
- **UNION** — set union (deduplicates).
- **UNION ALL** — bag union (preserves duplicates).
- **INTERSECT**, **EXCEPT** (a.k.a. `MINUS` in Oracle).

### Joins

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23joins%0A%0ASection%20title%3A%20Joins' target='_blank' rel='noopener' data-askgpt='Joins' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#joins' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23joins%0A%0ASection%20title%3A%20Joins' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23joins%0A%0ASection%20title%3A%20Joins' title='Ask ChatGPT about this section'>💬</a>
- **INNER JOIN**
- **LEFT OUTER JOIN**, **RIGHT OUTER JOIN**, **FULL OUTER JOIN**
- **NATURAL JOIN**
- **CROSS JOIN**
- **LATERAL** (SQL:2003+, most implementations)

### Subqueries

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23subqueries%0A%0ASection%20title%3A%20Subqueries' target='_blank' rel='noopener' data-askgpt='Subqueries' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#subqueries' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23subqueries%0A%0ASection%20title%3A%20Subqueries' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23subqueries%0A%0ASection%20title%3A%20Subqueries' title='Ask ChatGPT about this section'>💬</a>
- **Scalar subqueries** (single value).
- **Row subqueries** (single row).
- **Table subqueries** (multi-row).
- **Correlated subqueries** (reference outer query).
- **IN, EXISTS, ANY, ALL** — subquery predicates.

### Common Table Expressions (CTEs)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23common-table-expressions-ctes%0A%0ASection%20title%3A%20Common%20Table%20Expressions%20(CTEs)' target='_blank' rel='noopener' data-askgpt='Common Table Expressions (CTEs)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#common-table-expressions-ctes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23common-table-expressions-ctes%0A%0ASection%20title%3A%20Common%20Table%20Expressions%20(CTEs)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23common-table-expressions-ctes%0A%0ASection%20title%3A%20Common%20Table%20Expressions%20(CTEs)' title='Ask ChatGPT about this section'>💬</a>
```sql
WITH cte_name AS (
    SELECT ...
)
SELECT ... FROM cte_name;
```

### Recursive CTEs

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23recursive-ctes%0A%0ASection%20title%3A%20Recursive%20CTEs' target='_blank' rel='noopener' data-askgpt='Recursive CTEs' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#recursive-ctes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23recursive-ctes%0A%0ASection%20title%3A%20Recursive%20CTEs' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23recursive-ctes%0A%0ASection%20title%3A%20Recursive%20CTEs' title='Ask ChatGPT about this section'>💬</a>
```sql
WITH RECURSIVE t(n) AS (
    VALUES (1)
    UNION ALL
    SELECT n + 1 FROM t WHERE n < 100
)
SELECT * FROM t;
```

### Window functions (SQL:2003)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23window-functions-sql2003%0A%0ASection%20title%3A%20Window%20functions%20(SQL%3A2003)' target='_blank' rel='noopener' data-askgpt='Window functions (SQL:2003)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#window-functions-sql2003' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23window-functions-sql2003%0A%0ASection%20title%3A%20Window%20functions%20(SQL%3A2003)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23window-functions-sql2003%0A%0ASection%20title%3A%20Window%20functions%20(SQL%3A2003)' title='Ask ChatGPT about this section'>💬</a>
```sql
SELECT
    name,
    salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank,
    LAG(salary) OVER (ORDER BY hired) AS prev_salary
FROM employees;
```

### Isolation levels (SQL:1999)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23isolation-levels-sql1999%0A%0ASection%20title%3A%20Isolation%20levels%20(SQL%3A1999)' target='_blank' rel='noopener' data-askgpt='Isolation levels (SQL:1999)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#isolation-levels-sql1999' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23isolation-levels-sql1999%0A%0ASection%20title%3A%20Isolation%20levels%20(SQL%3A1999)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23isolation-levels-sql1999%0A%0ASection%20title%3A%20Isolation%20levels%20(SQL%3A1999)' title='Ask ChatGPT about this section'>💬</a>
- `READ UNCOMMITTED`
- `READ COMMITTED`
- `REPEATABLE READ`
- `SERIALIZABLE`

The standard also defines three phenomena:

- **Dirty read** — read uncommitted data.
- **Non-repeatable read** — same query returns different data within a transaction.
- **Phantom read** — query returns rows that didn't exist before (or fewer).

### SQL/PSM (Persistent Stored Modules)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23sqlpsm-persistent-stored-modules%0A%0ASection%20title%3A%20SQL%2FPSM%20(Persistent%20Stored%20Modules)' target='_blank' rel='noopener' data-askgpt='SQL/PSM (Persistent Stored Modules)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/sql-standard.md#sqlpsm-persistent-stored-modules' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23sqlpsm-persistent-stored-modules%0A%0ASection%20title%3A%20SQL%2FPSM%20(Persistent%20Stored%20Modules)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fsql-standard.md%23sqlpsm-persistent-stored-modules%0A%0ASection%20title%3A%20SQL%2FPSM%20(Persistent%20Stored%20Modules)' title='Ask ChatGPT about this section'>💬</a>
Procedural language for stored procedures:

```sql
CREATE PROCEDURE foo()
BEGIN
    DECLARE x INTEGER;
    SET x = 1;
END;
```

## PostgreSQL compliance

PostgreSQL is largely SQL-compliant. Notable features PostgreSQL implements well:

- SQL:2003 window functions ✓
- SQL:2003 MERGE ✓ (since PG 15)
- SQL:2011 temporal features partial ✓ (PERIODs since PG 14)
- SQL:2016 JSON ✓ (JSONB since PG 9.4)
- SQL:2023 PGQ ✗ (no property graph yet)

Notable gaps:

- `FETCH FIRST` and `OFFSET` syntax added in PG 16; older versions used `LIMIT/OFFSET`.
- `MATCH PARTIAL` foreign key constraints not implemented.

## Dialect differences

| Feature | PostgreSQL | MySQL | SQL Server | Oracle |
|---------|-----------|-------|-----------|--------|
| `LIMIT/OFFSET` | Yes | Yes | No (TOP) | Yes (FETCH FIRST) |
| `AUTO_INCREMENT` | `SERIAL` / `GENERATED` | `AUTO_INCREMENT` | `IDENTITY` | `SEQUENCE` |
| `BOOLEAN` | Yes | Alias for `TINYINT` | `BIT` | `NUMBER(1)` |
| `||` concat | Yes | Yes (with mode) | `+` | Yes |
| `::` cast | Yes | No (`CAST()`) | No | No |
| Recursive CTEs | Yes | Yes | Yes | Yes |
| Window functions | Yes | Yes | Yes | Yes |
| `MERGE` | Yes (15+) | Yes | Yes | Yes (long time) |
| `RETURNING` (INSERT/UPDATE/DELETE) | Yes | No | No (OUTPUT) | No |

## Books and learning resources

- *SQL: The Complete Reference* — James Groff, Paul Weinberg, Andy Oppel (McGraw-Hill).
- *SQL Performance Explained* — Markus Winand (covers standard features; vendor-neutral).
- *Use The Index, Luke!* — Markus Winand (free online) — the canonical resource on indexing.
- *SQL Antipatterns* — Bill Karwin (Pragmatic Programmers).
- *Database Design for Mere Mortals* — Hernandez (Addison-Wesley).