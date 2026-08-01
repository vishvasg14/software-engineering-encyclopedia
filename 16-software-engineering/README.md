# 16 — Software Engineering (SOLID, Patterns, Refactoring)

This chapter treats software engineering at production depth: SOLID principles, GoF design patterns, enterprise patterns (repository, unit of work, saga), and refactoring patterns.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Software Engineering (SOLID, Patterns, Refactoring)](./software-engineering.md) | The flagship document: SOLID, GoF, enterprise patterns, refactoring | ✅ Complete |

## Related chapters

- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring patterns.
- [09 — System Design & Distributed Systems](../09-system-design/README.md) — Distributed patterns.
- [14 — Testing (Unit, Integration, Contract, Chaos)](../14-testing/README.md) — Test patterns; refactoring for testability.
- [15 — Git & Versioning](../15-git/README.md) — Workflow supporting good code.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (SOLID → GoF → Enterprise → Refactoring → Code Smells)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Programming in at least one language.
- Basic OOP.

## Version Baselines

- GoF patterns: classic (1994).
- SOLID: Robert C. Martin (2000s).
- Clean Architecture: Robert C. Martin (2017).

## Folder Layout

```
16-software-engineering/
├── README.md
├── software-engineering.md
├── diagrams/
├── examples/                       # 14 SE examples
│   ├── 01-solid-principles/
│   ├── 02-design-patterns-gof/
│   ├── 03-enterprise-patterns/
│   ├── 04-repository-pattern/
│   ├── 05-microservices-patterns/
│   ├── 06-event-driven-architecture/
│   ├── 07-cqrs-event-sourcing/
│   ├── 08-saga-pattern/
│   ├── 09-outbox-pattern/
│   ├── 10-circuit-breaker/
│   ├── 11-bulkhead/
│   ├── 12-strangler-fig/
│   ├── 13-clean-architecture/
│   └── 14-hexagonal/
└── references/
    ├── clean-architecture.md
    ├── refactoring.md
    └── design-patterns.md
```
