# 10 — DevOps (Docker, Kubernetes, Helm, Istio)

This chapter treats Docker, Kubernetes, Helm, Istio, GitOps, deployment strategies, and observability at production depth: containerization, orchestration, packaging, service mesh, GitOps.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [DevOps (Docker, Kubernetes, Helm, Istio)](./devops.md) | The flagship document: Docker, K8s, Helm, Istio, GitOps | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — JVM heap/GC tuning in containers.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Boot containerization.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Strimzi operator in K8s.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — API gateway in K8s (Ingress, Istio).
- [08 — Caching (Redis, Caffeine, Memcached)](../08-caching/README.md) — Redis operator.
- [09 — System Design & Distributed Systems](../09-system-design/README.md) — Microservices, service mesh, deployment strategies.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (Docker → K8s → Helm → Istio → Deployment strategies → GitOps)
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
- Basic networking (TCP, HTTP, DNS).
- All previous chapters.

## Version Baselines

- **Docker:** 25+ (current).
- **Kubernetes:** 1.29+ (current).
- **Helm:** 3.x.
- **Istio:** 1.21+.
- **ArgoCD:** 2.10+.

## Folder Layout

```
10-devops/
├── README.md
├── devops.md
├── diagrams/
├── examples/                       # 16 DevOps examples
│   ├── 01-docker-basics/
│   ├── 02-dockerfile-best-practices/
│   ├── 03-multi-stage-builds/
│   ├── 04-docker-compose/
│   ├── 05-kubernetes-pods/
│   ├── 06-kubernetes-deployments/
│   ├── 07-kubernetes-services/
│   ├── 08-kubernetes-ingress/
│   ├── 09-kubernetes-config-secrets/
│   ├── 10-kubernetes-rbac/
│   ├── 11-kubernetes-storage/
│   ├── 12-helm-basics/
│   ├── 13-helm-charts/
│   ├── 14-istio-service-mesh/
│   ├── 15-argocd-gitops/
│   └── 16-deployment-strategies/
└── references/
    ├── docker-docs.md
    ├── kubernetes-docs.md
    ├── helm-docs.md
    └── istio-docs.md
```