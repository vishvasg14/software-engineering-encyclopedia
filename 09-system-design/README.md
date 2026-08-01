# 09 — System Design & Distributed Systems

This chapter treats architecture styles, system design patterns, distributed systems theory, and classic interview problems at production depth: CQRS, event-driven, saga, outbox, microservices, Raft, CAP, DDD.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [System Design & Distributed Systems](./system-design.md) | The flagship document: patterns, theory, classic problems | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — Threads, GC; relevant to async systems.
- [03 — SQL & Databases](../03-sql-databases/README.md) — ACID, distributed transactions.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Cloud microservices.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Event-driven backbone.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — Service-to-service APIs.
- [08 — Caching (Redis, Caffeine, Memcached)](../08-caching/README.md) — Distributed cache patterns.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (CAP → Raft → Architecture styles → DDD → Patterns → Classic problems)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- All previous chapters (especially APIs, Messaging, Caching, SQL).
- Java or similar language.
- Basic distributed systems awareness.

## Version Baselines

- **Raft:** Ongaro, Ousterhout (2014 paper, still current).
- **CAP theorem:** Brewer (2000), Gilbert-Lynch (2002).
- **DDD:** Evans (2003 book), updated vocabulary.
- **CQRS:** Young (CQS), Fowler (CQRS).
- **Microservices:** Lewis, Fowler (2014).

## Folder Layout

```
09-system-design/
├── README.md
├── system-design.md
├── diagrams/
├── examples/                       # 16 system design examples
│   ├── 01-cqrs/
│   ├── 02-event-driven/
│   ├── 03-saga/
│   ├── 04-outbox-pattern/
│   ├── 05-microservices-migration/
│   ├── 06-modular-monolith/
│   ├── 07-ddd-bounded-contexts/
│   ├── 08-clean-architecture/
│   ├── 09-hexagonal-architecture/
│   ├── 10-onion-architecture/
│   ├── 11-rate-limiter/
│   ├── 12-idempotency/
│   ├── 13-distributed-lock/
│   ├── 14-classic-url-shortener/
│   ├── 15-classic-twitter-timeline/
│   └── 16-classic-message-queue/
└── references/
    ├── ddia-book.md
    ├── raft-paper.md
    └── system-design-books.md
```