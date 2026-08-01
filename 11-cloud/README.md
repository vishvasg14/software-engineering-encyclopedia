# 11 — Cloud (AWS, Azure, GCP)

This chapter treats cloud computing patterns at production depth: compute, storage, networking, IAM, serverless, managed databases, managed Kafka, observability, cost optimization, and multi-cloud patterns. AWS examples, Azure and GCP comparisons.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Cloud (AWS, Azure, GCP)](./cloud.md) | The flagship document: cloud patterns, serverless, FinOps | 🚧 In progress |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — JVM heap tuning in cloud.
- [03 — SQL & Databases](../03-sql-databases/README.md) — Managed database services.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Boot on cloud.
- [06 — Messaging (Kafka, RabbitMQ, Pulsar)](../06-messaging/README.md) — Managed Kafka.
- [08 — Caching (Redis, Caffeine, Memcached)](../08-caching/README.md) — Managed cache (ElastiCache).
- [09 — System Design & Distributed Systems](../09-system-design/README.md) — Multi-cloud, microservices, serverless.
- [10 — DevOps (Docker, Kubernetes, Helm, Istio)](../10-devops/README.md) — Containers on cloud (EKS, AKS, GKE).

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (Compute → Storage → Networking → IAM → Serverless → Managed databases → Observability → Cost → Multi-cloud)
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
- Networking basics (TCP/IP, HTTP, DNS).
- All previous chapters.

## Version Baselines

- **AWS:** current (regions, services evolve constantly).
- **Azure:** current.
- **GCP:** current.

## Folder Layout

```
11-cloud/
├── README.md
├── cloud.md
├── diagrams/
├── examples/                       # 16 cloud examples
│   ├── 01-aws-iam-basics/
│   ├── 02-aws-vpc/
│   ├── 03-aws-s3/
│   ├── 04-aws-iam-roles/
│   ├── 05-aws-rds/
│   ├── 06-aws-dynamodb/
│   ├── 07-aws-lambda/
│   ├── 08-aws-api-gateway/
│   ├── 09-aws-sqs-sns/
│   ├── 10-aws-eventbridge/
│   ├── 11-aws-cloudfront/
│   ├── 12-aws-managed-kafka/
│   ├── 13-aws-cloudwatch/
│   ├── 14-azure-equivalents/
│   ├── 15-gcp-equivalents/
│   └── 16-multi-cloud/
└── references/
    ├── aws-docs.md
    ├── azure-docs.md
    └── gcp-docs.md
```