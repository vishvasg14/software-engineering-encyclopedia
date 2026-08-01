# 03 — SQL & Databases

This chapter treats SQL fundamentals and PostgreSQL internals at the depth needed for production engineering: SQL language, the relational model, query planner internals, MVCC, indexes, transactions, replication, partitioning, and operational concerns.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [SQL & Databases](./sql-databases.md) | The flagship document: SQL + PostgreSQL deep + MySQL/MongoDB/Redis comparisons | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — JVM GC concepts (generational hypothesis, ZGC, G1) parallel PostgreSQL's MVCC and VACUUM. Helpful for understanding database internals through a familiar lens.
- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — most SQL consumers are JS/TS apps; ORMs and database clients live there.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Data JPA + Hibernate is the most common production ORM on top of PostgreSQL. Repository patterns, transactions, and query optimization rebuild on the fundamentals in this document.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — Frontends fetch SQL data via HTTP; pagination, optimistic updates, and caching strategies are common Angular/JS-TS patterns.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — CDC with Debezium reads from PG binlog/wal; change data capture is a common database-to-event-stream pattern.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — GraphQL N+1 problems tie directly to SQL; REST query parameters translate to SQL filters.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (SQL → Theory → MVCC → Planner → Indexes → Storage → WAL → Vacuum → Replication → Partitioning → Other DBs)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Basic SQL (SELECT, INSERT, UPDATE, DELETE, JOIN).
- Basic understanding of indexes.
- Familiarity with at least one RDBMS.

## Version Baselines

- **PostgreSQL:** 16+ (PG 17 features noted in passing).
- **SQL Standard:** ANSI SQL:2016 baseline; SQL:2023 features noted.
- **MySQL:** 8.0+.
- **MongoDB:** 6.0+.
- **Redis:** 7.0+.

## Folder Layout

```
03-sql-databases/
├── README.md                       # this file
├── sql-databases.md                # flagship document
├── diagrams/                       # Mermaid sources
├── examples/                       # 20 runnable SQL examples
│   ├── 01-sql-select-where/
│   ├── 02-joins-and-set-ops/
│   ├── 03-aggregates-group-by/
│   ├── 04-window-functions/
│   ├── 05-ctes-and-recursive/
│   ├── 06-transactions-isolation/
│   ├── 07-mvcc-snapshot/
│   ├── 08-explain-analyze/
│   ├── 09-indexes-btree-hash/
│   ├── 10-partial-expression-indexes/
│   ├── 11-vacuum-and-bloat/
│   ├── 12-wal-and-crash-recovery/
│   ├── 13-replication-streaming/
│   ├── 14-connection-pooling/
│   ├── 15-partitioning/
│   ├── 16-mysql-innodb/
│   ├── 17-mongodb-storage/
│   ├── 18-redis-data-structures/
│   ├── 19-cap-theorem/
│   └── 20-normalization/
└── references/                     # PG docs, SQL standard, papers
    ├── postgresql-docs.md
    ├── sql-standard.md
    ├── innodb.md
    ├── mongodb.md
    ├── redis.md
    └── papers.md
```

## Running the examples

The examples target PostgreSQL 16+. A `docker-compose.yml` is included in the examples directory for local execution:

```bash
cd 03-sql-databases/examples
docker compose up -d
docker compose exec postgres psql -U postgres -f 01-sql-select-where/basic.sql
```