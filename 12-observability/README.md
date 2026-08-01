# 12 — Observability (Prometheus, Grafana, OpenTelemetry)

This chapter treats the three pillars of observability at production depth: metrics (Prometheus), logs (Loki, ELK), traces (Jaeger, Tempo), with OpenTelemetry as the unifying SDK, plus alerting and SRE practices.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Observability (Prometheus, Grafana, OpenTelemetry)](./observability.md) | The flagship document: three pillars, alerting, SRE | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — JVM metrics in Prometheus.
- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — Browser-side observability.
- [03 — SQL & Databases](../03-sql-databases/README.md) — DB metrics, slow query logs.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Boot Actuator, Micrometer.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Consumer lag metrics.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — API RED metrics.
- [08 — Caching (Redis, Caffeine, Memcached)](../08-caching/README.md) — Cache hit rate.
- [09 — System Design & Distributed Systems](../09-system-design/README.md) — Distributed tracing.
- [10 — DevOps (Docker, Kubernetes, Helm, Istio)](../10-devops/README.md) — K8s observability.
- [11 — Cloud (AWS, Azure, GCP)](../11-cloud/README.md) — CloudWatch, Azure Monitor, Cloud Monitoring.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (Metrics → Logs → Traces → OpenTelemetry → Alerting → SLOs)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Linux basics.
- Container basics.
- Basic distributed systems.
- All previous chapters.

## Version Baselines

- **Prometheus:** 2.50+.
- **Grafana:** 10+.
- **OpenTelemetry:** 1.x.
- **Loki:** 3.x.
- **Jaeger:** 1.x.
- **Tempo:** 2.x.

## Folder Layout

```
12-observability/
├── README.md
├── observability.md
├── diagrams/
├── examples/                       # 14 observability examples
│   ├── 01-prometheus-basics/
│   ├── 02-prometheus-querying/
│   ├── 03-prometheus-alerting/
│   ├── 04-grafana-dashboards/
│   ├── 05-grafana-alerting/
│   ├── 06-loki-basics/
│   ├── 07-loki-logql/
│   ├── 08-elasticsearch-logs/
│   ├── 09-jaeger-tracing/
│   ├── 10-tempo-tracing/
│   ├── 11-opentelemetry-instrumentation/
│   ├── 12-opentelemetry-collector/
│   ├── 13-slo-error-budget/
│   └── 14-incident-response/
└── references/
    ├── prometheus-docs.md
    ├── grafana-docs.md
    ├── opentelemetry-docs.md
    └── sre-books.md
```