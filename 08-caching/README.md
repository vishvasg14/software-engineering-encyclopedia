# 08 — Caching (Redis, Caffeine, Memcached)

This chapter treats Redis (deep), Caffeine (deep, in-JVM caching), and Memcached (brief) at production depth. It explains caching patterns, eviction algorithms, invalidation strategies, and CDN.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Caching (Redis, Caffeine, Memcached)](./caching.md) | The flagship document: Redis, Caffeine, patterns, CDN | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — Caffeine runs on the JVM; memory management matters.
- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — Browser HTTP caching, service workers.
- [03 — SQL & Databases](../03-sql-databases/README.md) — Query result caching; Redis as a DB alternative (limited).
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Cache abstraction; Caffeine + Spring Boot Starter.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Cache invalidation via events.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — HTTP caching headers; CDN.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (Redis → Caffeine → Memcached → patterns → CDN)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Java (for Caffeine examples).
- Basic distributed systems.
- Basic Spring (for Spring Cache integration).
- Familiarity with at least one caching library.

## Version Baselines

- **Redis:** 7+ (current LTS).
- **Caffeine:** 3.x (latest Java client).
- **Memcached:** 1.6+.
- **Spring Boot:** 3.3 (for Spring Cache integration).

## Folder Layout

```
08-caching/
├── README.md
├── caching.md
├── diagrams/
├── examples/                       # 14 caching examples
│   ├── 01-redis-basics/
│   ├── 02-redis-data-structures/
│   ├── 03-redis-persistence/
│   ├── 04-redis-replication/
│   ├── 05-redis-cluster/
│   ├── 06-redis-streams/
│   ├── 07-redis-transactions/
│   ├── 08-caffeine-basics/
│   ├── 09-caffeine-eviction/
│   ├── 10-caffeine-spring/
│   ├── 11-cache-aside/
│   ├── 12-write-through/
│   ├── 13-memcached/
│   └── 14-cdn-basics/
└── references/
    ├── redis-docs.md
    ├── caffeine-docs.md
    └── memcached-docs.md
```