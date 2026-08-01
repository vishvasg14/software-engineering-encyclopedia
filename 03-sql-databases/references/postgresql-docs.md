# PostgreSQL Documentation Reference

The authoritative source for PostgreSQL is the official documentation. This file catalogs the canonical PostgreSQL documentation pages referenced in the SQL & Databases document.

## Primary documentation

- **PostgreSQL 16 Documentation:** <https://www.postgresql.org/docs/16/>
- **PostgreSQL 17 Documentation:** <https://www.postgresql.org/docs/17/>
- **PostgreSQL Wiki:** <https://wiki.postgresql.org/>
- **PostgreSQL source:** <https://github.com/postgres/postgres>
- **Mailing lists:** <https://www.postgresql.org/list/>
- **Planet PostgreSQL (aggregated blogs):** <https://planet.postgresql.org/>

## Documentation structure

| Section | What it covers |
|---------|---------------|
| **Preface** | What's in the docs, conventions |
| **Tutorial** | Getting started |
| **SQL Language** | Data types, functions, operators, queries, concurrency control |
| **Server Administration** | Installation, configuration, server control, users, databases, maintenance, backup, monitoring |
| **Client Interfaces** | libpq, ECPG, large objects |
| **Server Programming** | Extensions, triggers, rules, procedural languages (PL/pgSQL, PL/Python, etc.) |
| **Reference** | SQL commands, system catalogs, views, information functions, system administration functions, utilities, catalogs |
| **Internals** | **Physical storage, query planning, system catalogs, frontend/backend protocol, catalog tables, planner statistics, executor, index access methods, GIN, BRIN, hash, B-tree** |
| **Appendixes** | PostgreSQL error codes, information schema, locale support, GNU licenses |

## Key sections referenced in this document

| Topic | URL path |
|-------|----------|
| Architecture overview | <https://www.postgresql.org/docs/16/overview.html> |
| MVCC | <https://www.postgresql.org/docs/16/mvcc.html> |
| Transaction isolation | <https://www.postgresql.org/docs/16/transaction-iso.html> |
| SQL syntax | <https://www.postgresql.org/docs/16/sql-syntax.html> |
| SELECT statement | <https://www.postgresql.org/docs/16/sql-select.html> |
| EXPLAIN | <https://www.postgresql.org/docs/16/sql-explain.html> |
| Performance tips | <https://www.postgresql.org/docs/16/performance-tips.html> |
| Indexes | <https://www.postgresql.org/docs/16/indexes.html> |
| Index types | <https://www.postgresql.org/docs/16/indexes-types.html> |
| Full text search | <https://www.postgresql.org/docs/16/textsearch.html> |
| Concurrency control | <https://www.postgresql.org/docs/16/explicit-locking.html> |
| WAL | <https://www.postgresql.org/docs/16/wal.html> |
| Continuous archiving | <https://www.postgresql.org/docs/16/continuous-archiving.html> |
| Backup and restore | <https://www.postgresql.org/docs/16/backup.html> |
| High availability | <https://www.postgresql.org/docs/16/high-availability.html> |
| Streaming replication | <https://www.postgresql.org/docs/16/warm-standby.html> |
| Logical replication | <https://www.postgresql.org/docs/16/logical-replication.html> |
| Partitioning | <https://www.postgresql.org/docs/16/ddl-partitioning.html> |
| Statistics | <https://www.postgresql.org/docs/16/planner-stats.html> |
| Autovacuum | <https://www.postgresql.org/docs/16/routine-vacuuming.html> |
| Monitoring stats | <https://www.postgresql.org/docs/16/monitoring-stats.html> |
| pg_stat_activity | <https://www.postgresql.org/docs/16/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY> |
| pg_stat_statements | <https://www.postgresql.org/docs/16/pgstatstatements.html> |
| Lock management | <https://www.postgresql.org/docs/16/explicit-locking.html> |
| Row security | <https://www.postgresql.org/docs/16/ddl-rowsecurity.html> |
| Server configuration | <https://www.postgresql.org/docs/16/runtime-config.html> |
| Physical storage | <https://www.postgresql.org/docs/16/storage.html> |
| TOAST | <https://www.postgresql.org/docs/16/storage-toast.html> |
| Free space map | <https://www.postgresql.org/docs/16/storage-fsm.html> |
| Visibility map | <https://www.postgresql.org/docs/16/storage-vm.html> |
| B-tree internals | <https://www.postgresql.org/docs/16/btree-implementation.html> |
| GiST | <https://www.postgresql.org/docs/16/gist.html> |
| SP-GiST | <https://www.postgresql.org/docs/16/spgist.html> |
| GIN | <https://www.postgresql.org/docs/16/gin.html> |
| BRIN | <https://www.postgresql.org/docs/16/brin.html> |

## PostgreSQL internals wiki (older but still useful)

- **PostgreSQL Internals Through Pictures:** <https://momjian.us/main/writings/pgsql/internalpics.pdf> (Bruce Momjian)
- **PostgreSQL Query Planner:** <https://www.postgresql.org/docs/16/planner-optimizer.html>
- **System catalogs:** <https://www.postgresql.org/docs/16/catalogs.html>

## Release notes

- **PostgreSQL 16:** <https://www.postgresql.org/docs/release/16.0/>
- **PostgreSQL 17:** <https://www.postgresql.org/docs/release/17.0/>
- **PostgreSQL 18 (in development as of 2026):** <https://www.postgresql.org/developer/roadmap/>

## Major version highlights

| Version | Year | Notable additions |
|---------|------|-------------------|
| 7.4 | 2003 | Native Windows port |
| 8.0 | 2005 | Native Windows, savepoints, tablespaces, point-in-time recovery |
| 8.3 | 2008 | HOT updates, full text search |
| 8.4 | 2009 | Window functions, CTEs, recursive queries |
| 9.0 | 2010 | Streaming replication, hot standby |
| 9.1 | 2011 | Synchronous replication, unlogged tables, foreign data wrappers |
| 9.2 | 2012 | Cascading replication, JSON type, index-only scans |
| 9.3 | 2013 | Materialized views, updatable views, foreign tables |
| 9.4 | 2014 | JSONB, logical decoding |
| 9.5 | 2016 | UPSERT (ON CONFLICT), row-level security, BRIN indexes |
| 9.6 | 2016 | Parallel sequential scan, parallel join, synchronous replication improvements |
| 10 | 2017 | Logical replication, declarative partitioning, native partitioning, SCRAM auth |
| 11 | 2018 | JIT compilation (for expressions), stored procedures (`CALL`), partitioning improvements |
| 12 | 2019 | Pluggable table storage (heap vs other engines), generated columns SQL syntax |
| 13 | 2020 | B-tree deduplication, incremental sorting, parallel vacuum |
| 14 | 2021 | Multirange types, stored procedures output, faster pipelined queries |
| 15 | 2022 | MERGE statement (SQL standard), `MERGE` is finally here, ICU as default collation |
| 16 | 2023 | Logical replication of schema, ICU by default, more parallelism |
| 17 | 2024 | `MERGE` with `RETURNING`, `NOT NULL` constraints with `NOT ENFORCED`, JSON_TABLE, enhanced logical replication |
| 18 | 2026 | (development in progress) |

## Tools and ecosystem

- **psql** — interactive terminal.
- **pg_dump / pg_restore** — backup and restore.
- **pg_basebackup** — base backup for replication.
- **pg_isready** — readiness check.
- **pg_config** — build info.
- **pgAdmin** — GUI admin tool.
- **pgBadger** — log analyzer.
- **pg_stat_statements** — query statistics extension.
- **auto_explain** — log slow queries automatically.
- **pgaudit** — audit logging.
- **pgcrypto** — cryptographic functions.
- **PostGIS** — geospatial extension.
- **pg_trgm, pg_bigm** — trigram fuzzy matching.
- **Patroni** — high availability orchestration.
- **PgBouncer** — connection pooler.
- **pg_dump, pgBackRest, WAL-G** — backup tools.
- **pgwatch2, pgDash** — monitoring.
- **pg_repack** — online table reorganization.

## Books

- *PostgreSQL: Up and Running* — Regina Obe, Leo Hsu (O'Reilly).
- *PostgreSQL: The Comprehensive Guide* — Korry Douglas (Sams).
- *PostgreSQL 16 Administration Cookbook** — Gianni Ciolli, Boriss Mejias (Packt).
- *Mastering PostgreSQL 16* — Hans-Jürgen Schönig (Packt).
- *Database Internals* — Alex Petrov (No Starch Press) — covers storage engines and distributed systems.
- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly) — the canonical reference for data systems.

## Mailing list archives

- **pgsql-hackers:** <https://www.postgresql.org/list/pgsql-hackers/> — development discussion.
- **pgsql-performance:** <https://www.postgresql.org/list/pgsql-performance/> — performance tuning.
- **pgsql-general:** <https://www.postgresql.org/list/pgsql-general/> — general discussion.

## Conferences

- **PGCon:** <https://www.pgcon.org/>
- **PostgresConf:** <https://postgresconf.org/>
- **PostgreSQL Europe:** <https://2016.pgconf.eu/>