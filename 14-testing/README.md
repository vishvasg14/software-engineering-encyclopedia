# 14 — Testing (Unit, Integration, Contract, Chaos)

This chapter treats software testing at production depth: the test pyramid, test doubles, integration testing with Testcontainers, contract testing with Pact, end-to-end testing, performance testing, mutation testing, and chaos engineering.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Testing (Unit, Integration, Contract, Chaos)](./testing.md) | The flagship document: test pyramid, mocking, Testcontainers, Pact, chaos | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — JVM startup; test speed.
- [03 — SQL & Databases](../03-sql-databases/README.md) — Testcontainers, integration tests.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Test, MockMvc.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — Cypress, Playwright, Jest.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — API contract testing, Pact.
- [10 — DevOps (Docker, Kubernetes, Helm, Istio)](../10-devops/README.md) — CI test pipeline; test gates.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (Pyramid → FIRST → Doubles → Mocking → Integration → Contract → E2E → Performance → Mutation → Chaos)
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
- Familiarity with unit tests.

## Version Baselines

- **JUnit:** 5.x.
- **Mockito:** 5.x.
- **Testcontainers:** 2.x.
- **Pact:** 4.x.
- **Cypress:** 13+.
- **Playwright:** 1.x.
- **k6:** latest.

## Folder Layout

```
14-testing/
├── README.md
├── testing.md
├── diagrams/
├── examples/                       # 14 testing examples
│   ├── 01-test-pyramid/
│   ├── 02-junit-basics/
│   ├── 03-mockito/
│   ├── 04-testcontainers/
│   ├── 05-spring-tests/
│   ├── 06-pytest/
│   ├── 07-jasmine/
│   ├── 08-pact-contract/
│   ├── 09-cypress-e2e/
│   ├── 10-playwright/
│   ├── 11-k6-load-testing/
│   ├── 12-mutation-testing/
│   ├── 13-chaos-monkey/
│   └── 14-litmus/
└── references/
    ├── junit-docs.md
    ├── pytest-docs.md
    ├── testcontainers-docs.md
    └── pact-docs.md
```