# 04 — Spring Ecosystem

This chapter treats Spring Framework, Spring Boot, and Spring Data JPA + Hibernate at production depth: IoC container, bean lifecycle, AOP, Spring Boot autoconfig, JPA repositories, transactions, and Spring Security.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Spring Ecosystem](./spring-ecosystem.md) | The flagship document: Spring Framework, Boot, Data JPA, Hibernate, Security | ✅ Complete |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — Spring runs on the JVM; AOP uses bytecode generation (CGLIB). GC and JIT directly affect Spring app behavior.
- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — Spring Boot Actuator exposes JSON consumed by JS/TS frontends; CORS handling matters here.
- [03 — SQL & Databases](../03-sql-databases/README.md) — Spring Data JPA sits on top of Hibernate, which sits on top of JDBC. Heavy cross-link for repository patterns, transactions, and query optimization.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — Angular ↔ Spring Boot is the most common enterprise fullstack. Mention in production case studies.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Spring Kafka, Spring Cloud Stream, and Spring AMQP integrate messaging brokers with Spring apps.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — Spring MVC REST, Spring for GraphQL, Spring WebFlux; gRPC-Java for gRPC servers.
- [08 — Caching (Redis, Caffeine, Memcached)](../08-caching/README.md) — Spring Cache abstraction; Caffeine + Spring Boot Starter; Redis integration via spring-data-redis.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Java 17+ syntax.
- Basic OOP.
- Annotation basics.
- Basic SQL (see 03-sql-databases).
- Familiarity with at least one Spring Boot project.

## Version Baselines

- **Spring Framework:** 6.1
- **Spring Boot:** 3.3 (Spring Boot 3.4 features noted in passing)
- **Java:** 17+
- **Hibernate ORM:** 6.x (Spring Boot 3.x default)
- **Jakarta EE:** 9+ namespace (Spring 6+ moved from `javax.*` to `jakarta.*`)

## Folder Layout

```
04-spring-ecosystem/
├── README.md
├── spring-ecosystem.md
├── diagrams/
├── examples/                       # 19 Spring Boot examples
│   ├── 01-spring-core-beans/
│   ├── 02-bean-scopes/
│   ├── 03-bean-lifecycle/
│   ├── 04-autowiring-qualifiers/
│   ├── 05-aop-aspects/
│   ├── 06-spring-boot-startup/
│   ├── 07-configuration-properties/
│   ├── 08-actuator/
│   ├── 09-spring-mvc-rest/
│   ├── 10-spring-data-jpa/
│   ├── 11-hibernate-n-plus-one/
│   ├── 12-transactions/
│   ├── 13-spring-security-jwt/
│   ├── 14-spring-data-redis/
│   ├── 15-spring-cloud-gateway/
│   ├── 16-spring-batch/
│   ├── 17-spring-test/
│   ├── 18-testcontainers/
│   └── 19-spring-profiles/
└── references/
    ├── spring-docs.md
    ├── spring-boot-docs.md
    ├── hibernate-docs.md
    ├── spring-security-docs.md
    └── books.md
```

## Running the examples

Each example directory contains:
- `pom.xml` — Maven project (Spring Boot 3.3.x parent)
- `src/main/java/...` — Java source
- `README.md` — what the example demonstrates and how to run

Build with:

```bash
cd examples/01-spring-core-beans
mvn spring-boot:run
```