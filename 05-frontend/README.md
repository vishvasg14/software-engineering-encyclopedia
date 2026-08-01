# 05 — Frontend (Angular, Signals, RxJS)

This chapter treats Angular, Signals, and RxJS at production depth: change detection, DI, components, Signals vs RxJS, HTTP, Router, Forms, testing, and how Angular compares to React, Vue, and Svelte.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Frontend (Angular, Signals, RxJS)](./frontend.md) | The flagship document: Angular internals, Signals, RxJS, comparisons | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — Angular doesn't run on the JVM, but SSR (Angular Universal) sometimes does. Brief mention.
- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — Angular is TypeScript-first. This document assumes you know TypeScript deeply.
- [03 — SQL & Databases](../03-sql-databases/README.md) — Frontends query databases via HTTP; cross-link when discussing data patterns.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Angular ↔ Spring Boot is the most common enterprise fullstack. Mention in production case studies.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Event-driven UIs consume Kafka events via WebSocket/SSE; Angular patterns for streaming data.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — Angular HTTP clients, GraphQL clients (Apollo, urql), WebSocket for real-time UI updates.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (components → DI → change detection → Signals → RxJS → HTTP → Router → Forms → testing → comparisons)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- TypeScript fluency (interfaces, generics, conditional types).
- Modern JavaScript (ES2024+).
- Basic HTML/CSS.
- Familiarity with at least one frontend framework.

## Version Baselines

- **Angular:** 16 through 18 (current LTS as of 2026).
- **TypeScript:** 5+.
- **RxJS:** 7.x.

## Folder Layout

```
05-frontend/
├── README.md
├── frontend.md
├── diagrams/
├── examples/                       # 18 Angular examples
│   ├── 01-angular-bootstrap/
│   ├── 02-components/
│   ├── 03-templates/
│   ├── 04-directives-pipes/
│   ├── 05-services-di/
│   ├── 06-rxjs-observables/
│   ├── 07-rxjs-operators/
│   ├── 08-signals-basics/
│   ├── 09-signals-advanced/
│   ├── 10-signals-rxjs-interop/
│   ├── 11-change-detection/
│   ├── 12-forms-template-driven/
│   ├── 13-forms-reactive/
│   ├── 14-routing/
│   ├── 15-http-client/
│   ├── 16-testing/
│   ├── 17-standalone-vs-modules/
│   └── 18-performance/
└── references/
    ├── angular-docs.md
    ├── rxjs-docs.md
    ├── signals.md
    └── books.md
```