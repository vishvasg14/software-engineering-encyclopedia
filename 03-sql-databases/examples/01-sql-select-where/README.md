# 01 — SELECT and WHERE

## What this demonstrates

Basic SELECT syntax, WHERE clause, ORDER BY, LIMIT.

## Run

```bash
docker compose up -d postgres
docker compose exec postgres psql -U postgres -d selfstudy -f 01-sql-select-where/basic.sql
```