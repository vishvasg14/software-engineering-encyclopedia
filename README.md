# Self-Study — The Software Engineering Knowledge Repository

> **Mission:** Build the most comprehensive, accurate, production-grade software engineering knowledge repository ever created as a free public learning resource.

This repository teaches software engineering from **absolute beginner** to **Staff/Principal Engineer** level. Every document answers not only *How*, but also *What*, *Why*, *When*, *Where*, *Who*, and *How*. Every topic covers internals, production use, debugging, monitoring, security, performance, anti-patterns, and trade-offs.

## Repository Philosophy

- **Not** a cheat sheet.
- **Not** interview notes.
- **Not** a blog.
- **Yes** a complete engineering encyclopedia.

Someone should be able to learn everything necessary to become an exceptional software engineer from this repository.

## Quality Standards

- Accuracy over speed. Never hallucinate APIs, flags, JEP numbers, or specifications.
- Prefer official sources: official documentation → specifications → RFCs → language specs → vendor docs → engineering blogs from technology creators.
- Internal architecture must be explained, not just surface-level usage.
- Production examples over toy examples.
- No placeholders, no "Coming Soon", no "TODO".

## Table of Contents

| # | Domain | Status |
|---|--------|--------|
| 01 | [Java Internals](./01-java-internals/README.md) | ✅ Complete |
| 02 | [JavaScript & TypeScript](./02-javascript-typescript/README.md) | ✅ Complete |
| 03 | [SQL & Databases](./03-sql-databases/README.md) | ✅ Complete |
| 04 | [Spring Ecosystem](./04-spring-ecosystem/README.md) | ✅ Complete |
| 05 | [Frontend (Angular, Signals, RxJS)](./05-frontend/README.md) | ✅ Complete |
| 06 | [Messaging (Kafka, RabbitMQ, Pulsar)](./06-messaging/README.md) | ✅ Complete |
| 07 | [APIs (REST, GraphQL, gRPC, WebSocket)](./07-apis/README.md) | ✅ Complete |
| 08 | [Caching (Redis, Caffeine, Memcached)](./08-caching/README.md) | ✅ Complete |
| 09 | [System Design & Distributed Systems](./09-system-design/README.md) | ✅ Complete |
| 10 | [DevOps (Docker, Kubernetes, Helm, Istio)](./10-devops/README.md) | ✅ Complete |
| 11 | [Cloud (AWS, Azure, GCP)](./11-cloud/README.md) | ✅ Complete |
| 12 | [Observability (Prometheus, Grafana, OpenTelemetry)](./12-observability/README.md) | ✅ Complete |
| 13 | [Security (OWASP, OAuth2, JWT, Encryption)](./13-security/README.md) | ✅ Complete |
| 14 | [Testing (Unit, Integration, Contract, Chaos)](./14-testing/README.md) | ✅ Complete |
| 15 | [Git & Versioning](./15-git/README.md) | ✅ Complete |
| 16 | [Software Engineering (SOLID, Patterns, Refactoring)](./16-software-engineering/README.md) | ✅ Complete |

## Document Template

Every topic follows the same structure (see [master template spec](./docs/superpowers/specs/2026-07-26-jvm-internals-flagship-design.md) for the JVM flagship document that anchors the template):

1. Overview
2. Definition
3. Five Ws + How
4. History
5. Problem Statement
6. Real-World Motivation
7. Internal Working
8. Deep Dive
9. Architecture
10. Performance
11. Security
12. Production Engineering
13. Production Case Studies
14. Code Examples
15. Common Mistakes
16. Debugging
17. Monitoring & Observability
18. Best Practices
19. Anti-Patterns
20. Edge Cases
21. Comparisons
22. Interview Preparation
23. References

## Cross-Linking

Topics link to one another liberally. Java internals reference Spring, which references databases, which reference messaging — the knowledge graph mirrors how engineers actually navigate a stack.

## Contributing

This is an evolving project. Each topic is produced topic-by-topic in full depth rather than skimming the surface. A topic isn't marked complete until the entire template is filled, every JEP/spec/flag is verified, and every code example compiles on its target runtime.