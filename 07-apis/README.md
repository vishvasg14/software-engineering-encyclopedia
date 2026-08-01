# 07 — APIs (REST, GraphQL, gRPC, WebSocket)

This chapter treats the four primary API styles at production depth: REST, GraphQL, gRPC, and WebSocket. It explains design principles, when to use each, and cross-cutting concerns (auth, versioning, documentation).

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [APIs (REST, GraphQL, gRPC, WebSocket)](./apis.md) | The flagship document: REST, GraphQL, gRPC, WebSocket, OAuth2, OpenAPI | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — gRPC uses Netty for HTTP/2 framing on the JVM.
- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — GraphQL is JS-native; fetch/XHR for REST.
- [03 — SQL & Databases](../03-sql-databases/README.md) — GraphQL N+1 problems tie to SQL queries.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring MVC REST, Spring for GraphQL, Spring WebFlux.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — API consumption patterns; GraphQL clients (Apollo, urql).
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — WebSocket vs Kafka for events.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (REST → REST patterns → GraphQL → gRPC → WebSocket → HTTP/2/3 → Auth → Versioning → Documentation)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- HTTP basics (methods, status codes, headers).
- JSON.
- A programming language (TypeScript, Python, or Java).

## Version Baselines

- **HTTP/3:** RFC 9114 (current).
- **OpenAPI:** 3.1 (current).
- **GraphQL:** 2024 spec.
- **gRPC:** current protocol (HTTP/2-based).
- **OAuth 2.1:** current draft.

## Folder Layout

```
07-apis/
├── README.md
├── apis.md
├── diagrams/
├── examples/                       # 16 API examples
│   ├── 01-rest-basics/
│   ├── 02-rest-resource-design/
│   ├── 03-rest-versioning/
│   ├── 04-rest-error-handling/
│   ├── 05-rest-pagination/
│   ├── 06-openapi-spec/
│   ├── 07-graphql-schema/
│   ├── 08-graphql-resolvers/
│   ├── 09-graphql-subscriptions/
│   ├── 10-grpc-basics/
│   ├── 11-grpc-streaming/
│   ├── 12-grpc-error-handling/
│   ├── 13-websocket-basics/
│   ├── 14-websocket-reconnect/
│   ├── 15-server-sent-events/
│   └── 16-oauth2-jwt/
└── references/
    ├── http-specs.md
    ├── rest-guidelines.md
    ├── graphql-docs.md
    ├── grpc-docs.md
    └── openapi-docs.md
```