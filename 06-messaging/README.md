# 06 — Messaging (Kafka, RabbitMQ, Pulsar)

This chapter treats Apache Kafka (deep), with comparison coverage of RabbitMQ and Apache Pulsar. It explains brokers, partitions, replication, exactly-once semantics, Kafka Streams, and operational concerns.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Messaging (Kafka, RabbitMQ, Pulsar)](./messaging.md) | The flagship document: Kafka internals, RabbitMQ/Pulsar comparisons, messaging patterns | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — Kafka runs on the JVM; cross-link to JVM GC and JIT.
- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — Kafka clients in JS (kafkajs).
- [03 — SQL & Databases](../03-sql-databases/README.md) — CDC with Debezium reads from PG binlog/wal.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Kafka, Spring Cloud Stream, Spring AMQP.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — Event-driven UIs consume Kafka events via WebSocket/SSE.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (Kafka architecture → producers → consumers → replication → KRaft → exactly-once → Streams → RabbitMQ → Pulsar → patterns)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Java or similar language.
- Basic Linux command line.
- Distributed systems awareness (basic).
- Familiarity with at least one message broker.

## Version Baselines

- **Apache Kafka:** 3.x (KRaft mode default since 3.3).
- **RabbitMQ:** 3.13+.
- **Apache Pulsar:** 3.x.

## Folder Layout

```
06-messaging/
├── README.md
├── messaging.md
├── diagrams/
├── examples/                       # 18 messaging examples
│   ├── 01-kafka-basics/
│   ├── 02-kafka-producers/
│   ├── 03-kafka-consumers/
│   ├── 04-partitions-keys/
│   ├── 05-replication-isr/
│   ├── 06-kraft-controller/
│   ├── 07-exactly-once/
│   ├── 08-kafka-streams/
│   ├── 09-ksqldb/
│   ├── 10-schema-registry/
│   ├── 11-rabbitmq-basics/
│   ├── 12-rabbitmq-exchanges/
│   ├── 13-pulsar-basics/
│   ├── 14-pulsar-functions/
│   ├── 15-outbox-pattern/
│   ├── 16-cdc-debezium/
│   ├── 17-monitoring/
│   └── 18-security/
└── references/
    ├── kafka-docs.md
    ├── kafka-streams-docs.md
    ├── rabbitmq-docs.md
    ├── pulsar-docs.md
    └── papers.md
```

## Running the examples

Each example directory contains:
- `README.md` — what the example demonstrates and how to run.
- `*.java` — Java code using kafka-clients 3.x.

Most examples are conceptual. For running real Kafka code, use `docker compose` (not included in this chapter) with `confluentinc/cp-kafka` or `apache/kafka` images.