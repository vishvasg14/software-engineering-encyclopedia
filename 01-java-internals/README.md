# 01 — Java Internals

This chapter treats the Java Virtual Machine as the canonical "deep internals" topic. Engineers who finish this chapter should be able to:

- Read a GC log and identify the collector, pause source, and likely remediation.
- Reason about JIT warmup, tiered compilation, and code-cache pressure.
- Diagnose safepoint-induced latency spikes.
- Choose between G1, ZGC, Parallel, and Shenandoah with justified reasoning.
- Explain Java Memory Model happens-before to a peer.
- Configure JVM flags for a containerized production deployment correctly.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [JVM Internals](./jvm-internals.md) | The flagship document: OpenJDK HotSpot from bytecode to ZGC to virtual threads | ✅ Complete |

## Related chapters

- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — language-side internals; V8's tiered JIT parallels HotSpot's.
- [03 — SQL & Databases](../03-sql-databases/README.md) — PostgreSQL runs primarily on C, but the engine-architecture concepts (GC, JIT, concurrency) cross-reference naturally.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring runs on the JVM; AOP uses CGLIB bytecode generation. GC and JIT directly affect Spring app behavior.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — Angular doesn't run on the JVM, but server-side rendering uses Node.js. Brief mention.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Kafka and other JVM-based brokers run on the JVM; cross-link to JVM GC and JIT.

## Learning Path

The document is structured to be read linearly, but each section cross-links to related material. Suggested order for first-time readers:

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation (build context)
3. Internal Working → Deep Dive (the meat)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Java syntax and OOP basics.
- Basic concurrency (`synchronized`, `volatile`, `Thread`).
- Basic Linux command line (`top`, `vmstat`, `iostat`).

## Java Version Baseline

This document targets **Java 21** as the modern LTS baseline, with reference to Java 11 as the previous LTS. Java 8 is treated as the historical baseline. Features in Java 25+ are noted in passing when relevant but don't restructure the document.

## Folder Layout

```
01-java-internals/
├── README.md           # this file
├── jvm-internals.md    # the flagship document
├── diagrams/           # Mermaid diagram sources
├── examples/           # runnable Java 21 snippets referenced from the doc
└── references/         # JEP index, paper list, OpenJDK wiki links
```