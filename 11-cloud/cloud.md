# Cloud (AWS, Azure, GCP)

> A comprehensive, production-grade treatment of cloud computing patterns — from compute and storage to serverless and FinOps, with AWS examples and Azure/GCP comparisons.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Definition](#2-definition)
3. [Five Ws + One H](#3-five-ws--one-h)
4. [History](#4-history)
5. [Problem Statement](#5-problem-statement)
6. [Real-World Motivation](#6-real-world-motivation)
7. [Internal Working](#7-internal-working)
8. [Deep Dive](#8-deep-dive)
9. [Architecture](#9-architecture)
10. [Performance](#10-performance)
11. [Security](#11-security)
12. [Production Engineering](#12-production-engineering)
13. [Production Case Studies](#13-production-case-studies)
14. [Code Examples](#14-code-examples)
15. [Common Mistakes](#15-common-mistakes)
16. [Debugging](#16-debugging)
17. [Monitoring & Observability](#17-monitoring--observability)
18. [Best Practices](#18-best-practices)
19. [Anti-Patterns](#19-anti-patterns)
20. [Edge Cases](#20-edge-cases)
21. [Comparisons](#21-comparisons)
22. [Interview Preparation](#22-interview-preparation)
23. [References](#23-references)

---

## 1. Overview

**Cloud computing** delivers on-demand computing services over the internet — servers, storage, databases, networking, software, analytics, and intelligence. The three dominant public cloud providers are **AWS** (Amazon Web Services, launched 2006), **Azure** (Microsoft, launched 2010), and **GCP** (Google Cloud Platform, launched 2008).

This document treats cloud computing patterns at production depth: compute (VMs, containers, serverless), storage (object, block, file), networking (VPC, subnets, security groups), IAM, serverless, managed databases, managed Kafka, observability, cost optimization, and multi-cloud patterns.

**Scope.** This is not a tutorial. It assumes you have used cloud services. It focuses on **patterns and trade-offs** that distinguish production-grade deployments from toy ones.

**Version baselines.** As of 2026; services evolve constantly. Anchor to "principles" rather than specific service SKUs.

## 2. Definition

The cloud ecosystem uses overlapping terminology. Here's a precise taxonomy:

| Term | Type | Authoritative source |
|------|------|---------------------|
| **IaaS** | Infrastructure as a Service | Cloud provider docs |
| **PaaS** | Platform as a Service | Cloud provider docs |
| **SaaS** | Software as a Service | Cloud provider docs |
| **FaaS** | Function as a Service (serverless) | Cloud provider docs |
| **Region** | Isolated geographic area | All clouds |
| **AZ (Availability Zone)** | Independent data center within a region | All clouds |
| **VPC (Virtual Private Cloud)** | Isolated network in the cloud | AWS / VNet in Azure / VPC in GCP |
| **IAM** | Identity and Access Management | All clouds |
| **EBS / Persistent Disk** | Block storage attached to a VM | AWS / GCP |
| **S3 / Blob / GCS** | Object storage | All clouds |
| **RDS / Cloud SQL / Azure SQL** | Managed relational database | All clouds |
| **DynamoDB / Cosmos DB / Firestore** | Managed NoSQL | All clouds |
| **Lambda / Functions / Cloud Run** | Serverless compute | All clouds |
| **API Gateway** | Managed API proxy | All clouds |
| **CDN** | Content Delivery Network | All clouds |
| **FinOps** | Financial Operations practice | Community |
| **VPC Peering** | Direct connection between VPCs | All clouds |
| **Transit Gateway** | Hub for many VPC connections | AWS / Virtual WAN in Azure / Cloud Router in GCP |

The standard reference architecture:

```mermaid
graph TB
    subgraph "Edge"
        CDN
        WAF
    end
    subgraph "Region"
        LB[Load Balancer]
        subgraph "VPC"
            PublicSubnet[Public Subnet]
            PrivateSubnet[Private Subnet]
        end
        S3[Object Storage]
        RDS[(Managed DB)]
        Lambda[Serverless]
    end
    CDN --> LB
    WAF --> LB
    LB --> PublicSubnet
    PublicSubnet --> PrivateSubnet
    PrivateSubnet --> RDS
    Lambda --> RDS
    Lambda --> S3
```

## 3. Five Ws + One H

### What

**Cloud computing** is on-demand delivery of IT resources via the internet with pay-as-you-go pricing. **AWS**, **Azure**, and **GCP** are the three dominant providers, each offering 200+ services.

### Why

Cloud replaces capital expenditure (CapEx) with operational expenditure (OpEx). Instead of buying servers and provisioning data centers, you rent compute, storage, and services on demand. This allows elasticity, global reach, and faster time-to-market.

### When

AWS (2006), GCP (2008), Azure (2010) all emerged in the late 2000s/early 2010s. They matured through the 2010s. By 2026, they are the de facto standard for new application deployment.

### Where

Every web-scale company uses cloud. Netflix, Spotify, Airbnb run on AWS. Most enterprises use Azure (Microsoft-heavy) or AWS. Many startups use GCP for its data and ML capabilities.

### Who

- **AWS:** Amazon (Andy Jassy led the early years; now CEO of Amazon).
- **Azure:** Microsoft (Satya Nadella era; key Azure leadership).
- **GCP:** Google (originally App Engine, then expanded under Diane Greene and Thomas Kurian).

### How (one-paragraph preview)

A team writes an application, packages it in a container or zip, and deploys to a cloud-managed service (EKS/AKS/GKE, Lambda/Functions/Cloud Run, EC2/VM, etc.). The cloud provides networking (VPC), storage (S3/Blob/GCS), databases (RDS/Cloud SQL/Azure SQL, DynamoDB/Cosmos/Firestore), messaging (SQS/Service Bus/Pub-Sub), monitoring (CloudWatch/Monitor/Cloud Monitoring), and security (IAM, KMS). The team pays for what they use, scales on demand, and benefits from the cloud provider's global infrastructure.

## 4. History

### 4.1 Origins (2006-2010)

- **2002** — Amazon Web Services launched internally (SQS first).
- **2006** — AWS public launch (SQS, S3, EC2).
- **2008** — Google App Engine (PaaS) launched.
- **2008** — Google releases the Bigtable paper; spawns HBase, Cassandra, etc.
- **2010** — Microsoft Azure launched (Feb 2010, as Windows Azure).
- **2010** — Google App Engine, AWS Marketplace.

### 4.2 The growth era (2010-2015)

- **2010-2013** — EKS / GKE / AKS precursors (EC2 Container Service 2013).
- **2014** — AWS Lambda launched (serverless). GCP released managed services.
- **2014** — Azure Resource Manager (ARM) templates.
- **2015** — Google Kubernetes Engine (GKE) generally available.
- **2015** — Azure Functions (preview). AWS EFS, AWS Lambda.
- **2015** — AWS re:Invent establishes "Lambda" and "Aurora" as household names.

### 4.3 The maturity era (2015-2020)

- **2016** — GCP becomes more competitive. AWS expands regions.
- **2017** — Amazon EKS announced. Azure Kubernetes Service (AKS) preview.
- **2018** — AWS Lambda Layers. GCP releases BigQuery, BigQuery Omni.
- **2019** — AWS Fargate GA. Azure Arc announced.
- **2020** — Azure ARM templates mature. Cloud adoption accelerates due to COVID-19.

### 4.4 The cloud-native era (2020-2026)

- **2020** — Massive growth in managed Kubernetes (EKS, AKS, GKE).
- **2021** — Cloud cost optimization (FinOps) becomes critical.
- **2022** — Cloud sustainability focus. Serverless adoption grows.
- **2023** — Generative AI workloads drive new GPU services.
- **2024** — LLM gateways, vector databases, GPU-as-a-service.
- **2025** — Multi-cloud mature. eBPF data planes.
- **2026** — AI-first clouds.

```mermaid
timeline
    title Cloud history
    2006 : AWS public launch
    2008 : Google App Engine
    2010 : Azure launch
    2014 : AWS Lambda (serverless)
    2015 : GKE GA
    2017 : EKS announced
    2018 : Cloud-native matures
    2023 : AI workloads
    2026 : Multi-cloud mature
```

## 5. Problem Statement

### 5.1 What cloud solves

- **Capital expense** — pay as you go.
- **Capacity planning** — scale on demand.
- **Geographic reach** — global regions.
- **Time to market** — managed services.
- **Operational overhead** — provider handles the undifferentiated heavy lifting.

### 5.2 What cloud doesn't solve

- **Application architecture** — that's where system design helps.
- **Code quality** — that's where engineering practices help.
- **Cost if not managed** — FinOps discipline required.
- **Vendor lock-in** — multi-cloud mitigates but adds complexity.

### 5.3 The cost of unmanaged cloud

Unmanaged cloud can be MORE expensive than on-premises if not properly governed. FinOps discipline is critical.

## 6. Real-World Motivation

### 6.1 Netflix

Migrated to AWS in 2008-2017. Operates hundreds of thousands of EC2 instances. Pioneered chaos engineering. Heavy use of Spot instances for cost.

### 6.2 Spotify

Migrated to GCP. Uses BigQuery for analytics. Migrated to microservices on K8s.

### 6.3 Airbnb

Migrated from on-prem to AWS. Heavy use of RDS, S3, ECS.

### 6.4 Capital One

Banking on AWS. Heavy compliance. Strict IAM.

### 6.5 Pinterest

Uses AWS. Recommends system design at scale. Multi-region.

```mermaid
graph LR
    subgraph "Production motivations"
        A[Elasticity] --> Drivers
        B[Cost] --> Drivers
        C[Speed] --> Drivers
        D[Scale] --> Drivers
    end
    Drivers --> Cloud["Cloud-native = managed services + best practices"]
```

---

## 7. Internal Working

### 7.1 Global infrastructure

```mermaid
graph TB
    subgraph "Region US-East-1"
        AZa[AZ a]
        AZb[AZ b]
        AZc[AZ c]
    end
    subgraph "Region EU-West-1"
        AZd[AZ d]
        AZe[AZ e]
        AZf[AZ f]
    end
    AZa --- AZb
    AZb --- AZc
    AZa --- AZc
    AZd --- AZe
    AZe --- AZf
    AZd --- AZf
```

Each region has 2-6 availability zones. AZs are independent data centers within a region.

### 7.2 Request flow

```mermaid
sequenceDiagram
    participant U as User
    participant CDN
    participant LB as Load Balancer
    participant App as Application
    participant DB

    U->>CDN: HTTPS request
    CDN->>LB: cache miss
    LB->>App: forward
    App->>DB: query
    DB-->>App: result
    App-->>LB: response
    LB-->>CDN: response
    CDN-->>U: response
```

### 7.3 Subsystems

| Subsystem | Responsibility |
|-----------|---------------|
| **Edge** | CDN, WAF, DDoS protection |
| **Networking** | VPC, subnets, gateways |
| **Compute** | VM, containers, serverless |
| **Storage** | Object, block, file, archival |
| **Database** | RDBMS, NoSQL, key-value |
| **Messaging** | Queues, pub/sub, streaming |
| **IAM** | Authn, authz |
| **Observability** | Metrics, logs, traces |
| **Cost management** | Cost Explorer, budgets, alerts |

---

## 8. Deep Dive

This section is the heart of the document.

### 8.1 Compute

| Service | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **VM (IaaS)** | EC2 | Virtual Machines | Compute Engine |
| **Containers (CaaS)** | ECS, EKS | Container Instances, AKS | Cloud Run, GKE |
| **Functions (FaaS)** | Lambda | Functions | Cloud Functions |
| **App platform (PaaS)** | Elastic Beanstalk | App Service | App Engine |

### 8.2 EC2 / VM deep

**Instance types** (AWS; similar in Azure/GCP):

- **General purpose:** t4g, m6i (balanced).
- **Compute optimized:** c6i (CPU-bound).
- **Memory optimized:** r6i (memory-bound).
- **Storage optimized:** i4i (high disk IO).
- **GPU:** p4d, g5 (ML).
- **ARM:** t4g, c7g (Graviton, better price/performance).

**Pricing models:**

- **On-Demand:** pay per hour/second.
- **Reserved:** 1- or 3-year commit; up to 75% discount.
- **Savings Plans:** flexible commit (compute); up to 72% discount.
- **Spot:** up to 90% discount; can be reclaimed with 2-min notice.
- **Dedicated Hosts:** full host for compliance.

**Spot fleets:** mix of instance types and prices; great for fault-tolerant workloads.

### 8.3 Storage

| Type | AWS | Azure | GCP |
|------|-----|-------|-----|
| **Object** | S3 | Blob Storage | Cloud Storage |
| **Block** | EBS | Disk Storage | Persistent Disk |
| **File** | EFS | Files | Filestore |
| **Archive** | Glacier | Archive Storage | Archive Storage |

**S3 deep:**

- **Buckets** — global namespace.
- **Storage classes:** Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier, Glacier Deep Archive.
- **Lifecycle policies** — transition objects between classes.
- **Versioning** — keep multiple versions.
- **Replication** — cross-region, same-region.
- **Pre-signed URLs** — time-limited access.
- **Event notifications** — S3 -> SNS / Lambda.

### 8.4 Networking

**VPC** — isolated network in the cloud.

```mermaid
graph TB
    subgraph "VPC 10.0.0.0/16"
        subgraph "Public Subnet 10.0.1.0/24"
            IGW[Internet Gateway]
            NAT[NAT Gateway]
        end
        subgraph "Private Subnet 10.0.2.0/24"
            App1[App Server]
            DB1[(Database)]
        end
    end
    IGW --> App1
    App1 --> NAT
    App1 --> DB1
```

**Components:**

- **Subnet** — range of IPs within VPC.
- **Internet Gateway** — public subnet to internet.
- **NAT Gateway** — private subnet to internet (outbound only).
- **Route Table** — controls traffic flow.
- **Security Group** — instance-level firewall.
- **NACL** — subnet-level firewall.
- **VPC Peering** — direct connection between VPCs.
- **Transit Gateway** — hub for many VPCs.
- **PrivateLink** — private access to services.

### 8.5 IAM

**Components:**

- **User** — individual identity.
- **Group** — collection of users.
- **Role** — set of permissions; assumable by principals.
- **Policy** — JSON document with permissions.
- **Resource** — what the policy applies to.

**Policy example:**

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::my-bucket/*"
        }
    ]
}
```

**IAM best practices:**

- Least privilege.
- Use roles, not users.
- Enable MFA.
- Rotate access keys.
- Use ServiceAccounts for applications.

### 8.6 Serverless

**Lambda (AWS) deep:**

```typescript
// index.mjs
export const handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    // process
    return { statusCode: 200 };
};
```

**Cold starts:**

- First request after idle: 100ms-1s.
- Subsequent (warm): single-digit ms.
- Mitigation: Provisioned Concurrency (AWS), min-instances.

**Lambda limits:**

- Memory: 128 MB - 10 GB.
- Timeout: 15 min max.
- Package size: 250 MB unzipped.
- Concurrent executions: 1000 (default; can increase).

**Lambda patterns:**

- API backend (API Gateway + Lambda).
- Event processing (S3 events, DynamoDB streams).
- Scheduled tasks (EventBridge + Lambda).
- Glue for microservices (Lambda + Step Functions).

### 8.7 Managed databases

| Type | AWS | Azure | GCP |
|------|-----|-------|-----|
| **RDBMS** | RDS / Aurora | Azure SQL | Cloud SQL / AlloyDB |
| **Distributed SQL** | Aurora | Cosmos DB | Spanner |
| **NoSQL key-value** | DynamoDB | Cosmos DB | Firestore / Bigtable |
| **In-memory cache** | ElastiCache | Cache for Redis | Memorystore |
| **Graph** | Neptune | (Cosmos DB Gremlin) | (no managed) |
| **Ledger** | QLDB | (preview) | (no managed) |

**DynamoDB deep:**

- **Tables, items, attributes.**
- **Partition key** — determines partitioning.
- **GSI (Global Secondary Index)** — alternative key.
- **Capacity modes:** on-demand or provisioned.
- **DAX** — in-memory cache.
- **Streams** — change data capture.
- **TTL** — auto-delete.

### 8.8 Managed Kafka

| Service | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **Managed Kafka** | MSK (Amazon Managed Streaming for Apache Kafka) | Event Hubs for Kafka | Confluent Cloud (partner) |
| **Hosted Kafka** | MSK Serverless | Event Hubs Premium | Confluent Cloud |

**AWS MSK deep:**

- **Cluster:** multiple brokers (Kafka brokers).
- **Brokers:** Kafka processes.
- **Topics, partitions, replication factor.**
- **Storage:** EBS volumes.
- **Monitoring:** CloudWatch metrics.

### 8.9 Observability

| Service | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **Metrics** | CloudWatch | Azure Monitor | Cloud Monitoring |
| **Logs** | CloudWatch Logs | Log Analytics | Cloud Logging |
| **Traces** | X-Ray | Application Insights | Cloud Trace |
| **Audit** | CloudTrail | Activity Log | Cloud Audit Logs |
| **Alerts** | CloudWatch Alarms | Azure Alerts | Cloud Alerting |

**X-Ray deep:**

- Service map of distributed app.
- Trace each request end-to-end.
- Annotations and metadata.
- Sampling rules.

### 8.10 CDN

**CloudFront (AWS) deep:**

- **Distributions** — configuration for CDN.
- **Origins** — S3, ALB, EC2, custom.
- **Cache behaviors** — path patterns to cache.
- **TTL** — cache expiration.
- **Signed URLs** — restricted access.
- **Lambda@Edge** — run code at edge.

### 8.11 Cost optimization (FinOps)

**Principles:**

1. **Visibility** — know what you spend.
2. **Optimization** — reduce waste.
3. **Operation** — continuous improvement.

**Tactics:**

- **Right-sizing:** match instance types to workload.
- **Reserved Instances / Savings Plans:** commit for discounts.
- **Spot instances:** fault-tolerant workloads.
- **Auto-scaling:** scale down when not needed.
- **Lifecycle policies:** move old data to cheaper storage.
- **Tagging:** know who/what/why.
- **S3 Intelligent-Tiering:** automatic tier transitions.
- **Schedule non-prod:** stop dev outside business hours.
- **Cost allocation tags:** attribute spend to teams/products.

**AWS Cost Explorer** — visualize spend; identify trends.

### 8.12 Multi-cloud patterns

```mermaid
graph TB
    subgraph "AWS"
        S31[S3]
        RDS1[RDS]
    end
    subgraph "Azure"
        S32[Blob]
        RDS2[Azure SQL]
    end
    subgraph "GCP"
        S33[GCS]
        RDS3[Cloud SQL]
    end
    App1[App 1] --> S31
    App1 --> RDS1
    App2[App 2] --> S32
    App2 --> RDS2
    App3[App 3] --> S33
    App3 --> RDS3
    App1 -.replicates.-> S32
    App1 -.replicates.-> S33
```

**Multi-cloud reasons:**

- Vendor lock-in avoidance.
- Best-of-breed services.
- Geographic requirements.
- Regulatory.

**Multi-cloud challenges:**

- Operational complexity.
- Data consistency.
- Cost (data egress).
- Networking.

**Patterns:**

- **Active-active:** traffic in multiple regions.
- **Active-passive:** primary region with backup.
- **Backup-and-restore:** data replicated for DR.
- **Data lake:** centralized data in one cloud, compute in multiple.

### 8.13 AWS vs Azure vs GCP for each service

| Service | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **VM** | EC2 (most mature) | Virtual Machines (integrated with AD) | Compute Engine (best price/performance) |
| **K8s** | EKS | AKS (best integration) | GKE (most mature, leader) |
| **Object storage** | S3 (most features) | Blob (integrated) | GCS (consistent) |
| **RDBMS** | RDS / Aurora | Azure SQL (SQL Server) | Cloud SQL (Postgres/MySQL) |
| **NoSQL** | DynamoDB | Cosmos DB | Firestore / Bigtable |
| **Functions** | Lambda (most features) | Functions (integrated) | Cloud Functions / Cloud Run |
| **CDN** | CloudFront | Front Door / CDN | Cloud CDN |
| **DNS** | Route 53 (most features) | Azure DNS | Cloud DNS |
| **Managed Kafka** | MSK | Event Hubs for Kafka | Confluent Cloud |

### 8.14 Disaster recovery

**RTO (Recovery Time Objective)** — how long to recover.
**RPO (Recovery Point Objective)** — how much data loss.

**Strategies:**

| Strategy | RTO | RPO | Cost |
|----------|-----|-----|------|
| Backup/restore | Hours | Hours | Low |
- Pilot light | 10s of min | Minutes | Medium
- Warm standby | Minutes | Seconds | High
- Multi-site active/active | Seconds | None | Highest

**AWS DR services:**

- **S3 cross-region replication** — data.
- **RDS read replicas** — failover target.
- **Route 53** — DNS failover.
- **CloudEndure** — block-level replication.

---

## 9. Architecture

### 9.1 Three-tier web application

```mermaid
graph TB
    subgraph "Edge"
        CDN
        WAF
    end
    subgraph "Public tier"
        LB[Load Balancer]
    end
    subgraph "App tier (private)"
        App1[App Server 1]
        App2[App Server 2]
        App3[App Server 3]
    end
    subgraph "Data tier (private)"
        Primary[(RDS Primary)]
        Replica[(RDS Replica)]
    end
    CDN --> WAF
    WAF --> LB
    LB --> App1
    LB --> App2
    LB --> App3
    App1 --> Primary
    App2 --> Primary
    App3 --> Primary
    Primary -.replication.-> Replica
```

### 9.2 Serverless API backend

```mermaid
graph TB
    Client
    APIGW[API Gateway]
    Lambda1[Lambda 1]
    Lambda2[Lambda 2]
    SQS[SQS Queue]
    Lambda3[Lambda 3]
    DDB[(DynamoDB)]
    S3[S3]

    Client --> APIGW
    APIGW --> Lambda1
    APIGW --> Lambda2
    Lambda1 --> DDB
    Lambda2 --> SQS
    SQS --> Lambda3
    Lambda3 --> S3
```

### 9.3 Multi-cloud DR

```mermaid
graph TB
    Primary["Primary Region<br/>(us-east-1)"]
    Secondary["Secondary Region<br/>(us-west-2)"]
    Route53[Route 53 DNS Failover]

    Primary --> Route53
    Route53 --> Secondary
```

## 10. Performance

### 10.1 Latency budgets

| Hop | Budget |
|-----|--------|
| Client → CDN edge | 30ms |
| CDN → Origin | 100ms |
| Load balancer | 5ms |
| Application logic | 20ms |
| Database | 20ms |
| Cache | 1ms |
| **Total p99** | **~200ms** |

### 10.2 Throughput optimization

- **CDN:** offload static content.
- **Cache:** L1 in-JVM, L2 Redis, L3 CDN.
- **Async:** non-blocking I/O.
- **Connection pooling:** reuse connections.
- **Compression:** gzip, brotli.

### 10.3 Auto-scaling

- **Reactive:** CPU, memory, request count.
- **Predictive:** schedule-based (e.g., business hours).
- **Custom metrics:** queue depth, latency.

**HPA (Horizontal Pod Autoscaler):**

```yaml
minReplicas: 2
maxReplicas: 100
metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

**Cluster Autoscaler** — adds nodes when pods can't be scheduled.

**Scheduled scaling** — predictable load (e.g., business hours).

## 11. Security

### 11.1 Shared responsibility model

| Layer | Cloud | You |
|------|-------|-----|
| Physical security | ✓ | |
| Network infrastructure | ✓ | |
- Hypervisor / host OS
- Service
- Operating system
- Patches
- Application
- Data
- Access

### 11.2 Defense in depth

```mermaid
graph TB
    Edge[Edge security: WAF, DDoS, CDN]
    Net[Network: VPC, security groups, NACLs]
    Host[Host: OS patching, hardening]
    App[Application: secure coding, input validation]
    Data[Data: encryption at rest, access control]
    Edge --> Net
    Net --> Host
    Host --> App
    App --> Data
```

### 11.3 IAM best practices

- **Least privilege.**
- **MFA on all human users.**
- **Roles, not users.**
- **Service accounts for applications.**
- **No long-lived access keys** (use IAM Roles Anywhere, Workload Identity).
- **Audit with CloudTrail / Azure Activity Log / Cloud Audit Logs.**

### 11.4 Encryption

- **In transit:** TLS 1.3.
- **At rest:** KMS / Key Vault / Cloud KMS.
- **Application-level:** application-managed keys (envelope encryption).

### 11.5 Network security

- **VPC isolation.**
- **Security groups / NSGs / firewall rules** (least privilege).
- **Network segmentation** (public, private, data tiers).
- **WAF** for HTTP attacks.
- **DDoS protection** (CloudFront, Shield, Cloud Armor).

### 11.6 Compliance frameworks

- **SOC 2** (Service Organization Control).
- **PCI-DSS** (Payment Card Industry).
- **HIPAA** (Health Insurance Portability and Accountability Act).
- **GDPR** (General Data Protection Regulation).
- **ISO 27001.**

Each cloud has compliance programs with shared responsibility.

## 12. Production Engineering

### 12.1 Multi-region deployment

```mermaid
graph LR
    Route53[Route 53]
    US["us-east-1<br/>(active)"]
    EU["eu-west-1<br/>(active)"]

    Route53 --> US
    Route53 --> EU
    US -.replication.-> EU
    EU -.replication.-> US
```

- **Active-active:** traffic in both regions; cross-region replication.
- **Active-passive:** primary region; failover.
- **Backup-restore:** periodic snapshots to other region.

### 12.2 Observability

- **Metrics:** CloudWatch / Azure Monitor / Cloud Monitoring.
- **Logs:** CloudWatch Logs / Log Analytics / Cloud Logging.
- **Traces:** X-Ray / Application Insights / Cloud Trace.
- **Logs -> metrics:** embed metric in logs.
- **Dashboards:** Grafana / CloudWatch Dashboards.

### 12.3 Incident management

- **On-call rotation.**
- **Runbook per service.**
- **Escalation policy.**
- **Postmortem culture** (blameless).
- **Status page** (statuspage.io, Atlassian Statuspage).

### 12.4 Cost monitoring

- **Cost anomaly detection** (AWS Cost Anomaly Detection).
- **Budgets** with alerts.
- **Cost allocation tags** (team, env, project).
- **Reserved capacity** planning.
- **Anomaly review** monthly.

### 12.5 Compliance

- **Audit logs** (CloudTrail).
- **Config rules** (AWS Config).
- **Policy as code** (IAM, SCP).
- **Regular audits** (SOC 2).
- **Penetration testing.**

## 13. Production Case Studies

### 13.1 Netflix

Migrated to AWS in 2008-2017. Uses hundreds of thousands of EC2 instances. Heavy use of Spot instances. Pioneered chaos engineering with Chaos Monkey.

### 13.2 Spotify

Migrated to GCP. Uses BigQuery for analytics. Migrated microservices to GKE.

### 13.3 Airbnb

Migrated to AWS. Heavy use of RDS, S3, ECS. Built Airflow (workflow).

### 13.4 Capital One

Banking on AWS. Heavy compliance. Strict IAM and encryption.

### 13.5 Slack

Runs on AWS. Multi-region. Heavy use of S3, DynamoDB, Lambda.

### 13.6 GitHub

GitHub Actions on Azure. Code in Azure DevOps. Some services in Azure, some on-prem.

## 14. Code Examples

### 14.1 Basic: S3 operation (Python boto3)

```python
import boto3

s3 = boto3.client('s3')
s3.put_object(Bucket='my-bucket', Key='file.txt', Body=b'hello')
obj = s3.get_object(Bucket='my-bucket', Key='file.txt')
print(obj['Body'].read())
```

### 14.2 Basic: Lambda function (Node.js)

```javascript
// see 07-aws-lambda/
```

### 14.3 Basic: IAM policy (least privilege)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowS3Read",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::my-bucket",
                "arn:aws:s3:::my-bucket/*"
            ]
        }
    ]
}
```

### 14.4 Basic: Terraform snippet

```hcl
# see 16-multi-cloud/
```

### 14.5 Bad, anti-pattern, refactored, secure examples

**Bad: public S3 bucket**

```json
{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-secrets-bucket/*"
}
```

**Anti-pattern: hardcoded access keys**

```python
# NEVER do this
AWS_ACCESS_KEY_ID = "AKIA..."
AWS_SECRET_ACCESS_KEY = "..."
```

**Refactored: IAM role (preferred)**

Use IAM roles for EC2 / Lambda / EKS. No long-lived keys.

**Secure: encryption at rest**

```python
import boto3
s3 = boto3.client('s3')
s3.put_object(
    Bucket='my-bucket',
    Key='secret.txt',
    Body=b'hello',
    ServerSideEncryption='aws:kms',
    SSEKMSKeyId='alias/my-key'
)
```

## 15. Common Mistakes

### 15.1 Beginner mistakes

- **No cost monitoring:** cloud bill shock.
- **Public S3 buckets:** data leaks.
- **No tagging:** can't attribute cost.
- **Over-provisioned:** wasting money.
- **No backups:** data loss.

### 15.2 Intermediate mistakes

- **IAM too permissive:** security risk.
- **No auto-scaling:** wasted capacity.
- **No multi-AZ:** single point of failure.
- **No cost optimization:** paying retail.
- **Tight cloud coupling:** lock-in.

### 15.3 Senior mistakes

- **No DR plan:** data loss.
- **No chaos testing:** discover problems at customer impact.
- **No FinOps culture:** cost overruns.
- **No compliance monitoring:** audit failures.
- **No architecture review:** technical debt.

### 15.4 Production mistakes

- **Single region:** no HA.
- **No monitoring:** discover problems at customer impact.
- **No runbook:** on-call doesn't know what to do.
- **No cost anomaly detection:** bill shock.
- **No backup:** data loss.

### 15.5 Migration mistakes

- **Big-bang migration:** all at once; high risk.
- **Lift-and-shift without optimization:** no benefit.
- **No cost projection:** unexpected bill.
- **No skill assessment:** team doesn't know cloud.

### 15.6 Configuration mistakes

- **Overly permissive security groups:** SSH open to world.
- **Public S3:** data leaks.
- **IAM user with `*:*`:** security risk.
- **No encryption at rest:** compliance failure.

### 15.7 Security mistakes

- **Long-lived access keys:** credential leakage.
- **No MFA:** compromised passwords = full access.
- **IAM user instead of role:** no rotation; hard to scope.
- **Secrets in code:** git history leaks.

### 15.8 Performance mistakes

- **No CDN:** high origin load.
- **No caching:** DB overload.
- **Over-provisioned:** waste.
- **Single region:** high latency for global users.

### 15.9 Debugging mistakes

- **No CloudWatch logs:** can't debug.
- **No X-Ray traces:** can't trace requests.
- **No correlation IDs:** can't correlate logs.

### 15.10 Deployment mistakes

- **Manual console deployments:** no audit trail.
- **No IaC:** drift.
- **No CI/CD:** manual errors.

## 16. Debugging

### 16.1 CloudWatch Logs Insights

```sql
fields @timestamp, @message
| filter @message like /error/
| stats count() by bin(5m)
```

### 16.2 X-Ray traces

```bash
# Get trace
aws xray get-trace-summaries --start-time 2024-01-01T00:00:00Z
```

### 16.3 SSH / SSM Session Manager

```bash
# SSM Session Manager (no SSH keys)
aws ssm start-session --target i-0123456789
```

### 16.4 Lambda debugging

```bash
# Tail logs
aws logs tail /aws/lambda/my-function --follow

# Get config
aws lambda get-function-configuration --function-name my-function

# Invoke locally
sam local invoke
```

### 16.5 Production troubleshooting checklist

- [ ] Capture CloudWatch logs.
- [ ] Capture X-Ray trace.
- [ ] Check IAM permissions.
- [ ] Check VPC / security group / NACL.
- [ ] Check service quotas.
- [ ] Check cost anomalies.
- [ ] Engage on-call rotation.

## 17. Monitoring & Observability

### 17.1 Three pillars

- **Metrics:** CloudWatch.
- **Logs:** CloudWatch Logs.
- **Traces:** X-Ray.

### 17.2 CloudWatch metrics

- `CPUUtilization` (EC2).
- `DatabaseConnections` (RDS).
- `ConsumedReadCapacityUnits` (DynamoDB).
- `Invocations` (Lambda).
- `5xxErrors` (API Gateway).

### 17.3 CloudWatch alarms

```yaml
# CloudWatch alarm via Terraform
Threshold: 80
ComparisonOperator: GreaterThanThreshold
EvaluationPeriods: 2
MetricName: CPUUtilization
Namespace: AWS/EC2
Statistic: Average
```

### 17.4 X-Ray

- **Service map** — visual graph of services.
- **Trace timeline** — per-request detail.
- **Annotations** — searchable metadata.
- **Sampling rules** — control cost.

### 17.5 Cost monitoring

- **AWS Cost Anomaly Detection** — alerts on unusual spend.
- **AWS Budgets** — alerts when threshold exceeded.
- **Cost Explorer** — visualize spend.
- **Cost allocation tags** — attribute to teams.

## 18. Best Practices

### 18.1 Industry best practices

- **12-factor app:** stateless, config in env, log streams, etc.
- **Infrastructure as Code:** Terraform, CloudFormation, Bicep.
- **Immutable infrastructure:** replace, don't modify.
- **IAM least privilege.**
- **Encryption everywhere** (in transit, at rest).
- **Multi-AZ deployment.**
- **Backup everything.**
- **Tag everything.**
- **Monitor costs.**
- **Chaos engineering.**
- **Runbooks.**
- **DR drills.**

### 18.2 Enterprise practices

- **Multi-account** (AWS Organizations / GCP folders / Azure management groups).
- **Identity federation** (SAML, OIDC).
- **Service control policies** (SCPs).
- **Centralized logging.**
- **Compliance monitoring.**

### 18.3 Clean code

- **12-factor app.**
- **Stateless services.**
- **Idempotent operations.**
- **Observable (metrics, logs, traces).**

### 18.4 Reliability

- **Multi-AZ deployment.**
- **Auto-scaling.**
- **Backups.**
- **Multi-region for HA.**
- **Chaos engineering.**

### 18.5 Security

- **IAM least privilege.**
- **MFA.**
- **Encryption everywhere.**
- **VPC isolation.**
- **WAF / Shield.**
- **Audit logs.**

### 18.6 Performance

- **CDN for static.**
- **Caching layers.**
- **Right-sizing.**
- **Auto-scaling.**

### 18.7 Cost

- **Tag everything.**
- **Right-size.**
- **Use Spot / Preemptible.**
- **Reserved capacity for steady-state.**
- **Lifecycle policies.**
- **Cost anomaly alerts.**

### 18.8 Deployment

- **CI/CD** with GitOps.
- **Canary** for safe rollouts.
- **Feature flags.**
- **Multi-region.**

## 19. Anti-Patterns

### 19.1 Public S3 buckets

Exposing data to the world. Common data leaks.

**Fix:** Block public access at account level; use pre-signed URLs.

### 19.2 Hardcoded credentials

In code, in env files, in CI variables. Eventually leaked.

**Fix:** IAM roles; Secrets Manager; short-lived credentials.

### 19.3 No tags

Can't attribute cost, find resources, audit.

**Fix:** Mandatory tag policy via SCP / Azure Policy / Org Policy.

### 19.4 Over-provisioning

Larger instances than needed. Waste.

**Fix:** Right-sizing; auto-scaling; spot instances.

### 19.5 Single region

No HA. Region failure = outage.

**Fix:** Multi-region; Route 53 failover.

### 19.6 No backup

RDS snapshot off; S3 versioning off. Data loss.

**Fix:** Enable backups; cross-region replication; tested restore.

### 19.7 Direct SSH to production

No audit; no MFA; no IP restriction.

**Fix:** SSM Session Manager; MFA; IP allowlist.

### 19.8 No cost monitoring

Bill shock.

**Fix:** Cost anomaly detection; budgets; daily review.

## 20. Edge Cases

### 20.1 Region failure

Entire region down.

**Mitigation:** Multi-region; cross-region replication; Route 53 failover.

### 20.2 AZ failure

One AZ down.

**Mitigation:** Multi-AZ; load balancer; auto-scaling group spans AZs.

### 20.3 Throttling

API rate limits hit.

**Mitigation:** Exponential backoff; circuit breakers; request quotas.

### 20.4 Account compromise

Credentials leaked.

**Mitigation:** MFA; access analyzer; SCPs; CloudTrail alerts.

### 20.5 Service limits

Service quota exceeded.

**Mitigation:** Request quota increase; usage plans; monitoring.

### 20.6 Cost spike

Crypto miner or runaway process.

**Mitigation:** Cost anomaly detection; budget alerts; SCPs limiting regions.

### 20.7 DDoS attack

Sustained attack.

**Mitigation:** Shield Standard / Advanced; CloudFront; WAF rate limiting.

---

## 21. Comparisons

### 21.1 AWS vs Azure vs GCP (service-by-service)

| Service | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **VM** | EC2 (broadest) | VMs (best AD integration) | Compute Engine (best price/perf) |
| **K8s** | EKS | AKS (best integrated) | GKE (most mature) |
| **Object storage** | S3 (most features) | Blob (integrated) | GCS (consistent) |
| **Block storage** | EBS (best) | Disks (good) | Persistent Disk (good) |
| **RDBMS** | Aurora (best MySQL/Postgres) | Azure SQL (SQL Server) | Cloud SQL / AlloyDB (Postgres) |
| **NoSQL** | DynamoDB (proven) | Cosmos DB (multi-model) | Firestore (serverless) |
| **Distributed SQL** | Aurora Limitless | Cosmos DB | Spanner (strongest) |
| **Functions** | Lambda (most features) | Functions (integrated) | Cloud Functions (limited) |
| **Serverless containers** | Fargate | Container Apps | Cloud Run (simplest) |
| **API gateway** | API Gateway | APIM | API Gateway / Apigee |
| **CDN** | CloudFront | Front Door / CDN | Cloud CDN |
| **DNS** | Route 53 (most features) | Azure DNS | Cloud DNS |
| **CDN for video** | CloudFront + MediaConvert | Media Services | Transcoder API |
| **Managed Kafka** | MSK | Event Hubs Premium | Confluent Cloud (partner) |
| **Search** | OpenSearch (managed) | Cognitive Search | Vertex AI Search |
| **Block storage perf** | io2 (best) | Ultra Disk | Extreme PD |
| **Cold archive** | Glacier Deep Archive | Archive Storage | Archive Storage |
| **Cost optimization** | Cost Explorer | Cost Management | Billing |
| **AI/ML** | Bedrock / SageMaker | Azure OpenAI / Azure ML | Vertex AI |

### 21.2 Pricing model comparison

| Cloud | Pricing philosophy | Free tier |
|-------|-------------------|-----------|
| **AWS** | Pay-as-you-go; Spot up to 90% off; Reserved up to 75% off; Savings Plans up to 72% off | 12 months + always-free |
| **Azure** | Pay-as-you-go; Spot up to 90% off; Reserved up to 72% off; Savings Plan up to 65% off; Hybrid Benefit | 12 months + always-free |
| **GCP** | Pay-as-you-go; Spot (preemptible) up to 90% off; Committed Use Discounts up to 57% off; automatic Sustained Use Discounts up to 30% off | 12 months + always-free |

### 21.3 Decision matrix

| Workload | Recommended cloud |
|----------|------------------|
| AWS-heavy investment | AWS |
| Microsoft ecosystem | Azure |
| Data analytics / ML | GCP |
| Multi-cloud (deliberate) | Mix |
| Simple web app | Any (cost / latency comparison) |
| Regulated (HIPAA, FedRAMP) | All have programs; pick the most mature |
| Specific service need (e.g., Lambda) | AWS |
| AD-integrated (Windows) | Azure |
| BigQuery | GCP |

### 21.4 Migration paths

- **On-premises → AWS:** AWS Migration Hub + Application Migration Service.
- **On-premises → Azure:** Azure Migrate.
- **On-premises → GCP:** Migrate to Virtual Machines.
- **AWS → Azure / GCP:** application-level; data export/import.
- **Multi-cloud:** cloud-agnostic infra (Terraform, Kubernetes).

---

## 22. Interview Preparation

### 22.1 Beginner (0-1 years)

**Q1: What is cloud computing?**
**A:** On-demand delivery of IT resources (servers, storage, databases, networking, software) over the internet with pay-as-you-go pricing.

**Q2: What are the three main public cloud providers?**
**A:** AWS (Amazon), Azure (Microsoft), GCP (Google).

**Q3: What is a region?**
**A:** An isolated geographic area where the cloud provider has data centers. Examples: AWS us-east-1 (Virginia), Azure East US, GCP us-central1 (Iowa).

**Q4: What is an Availability Zone?**
**A:** An independent data center within a region. Multiple AZs per region for high availability.

**Q5: What is EC2?**
**A:** Elastic Compute Cloud — AWS's virtual machine service. Provides resizable compute capacity in the cloud.

### 22.2 Junior (1-2 years)

**Q6: What is S3?**
**A:** Simple Storage Service — AWS's object storage service. Stores files (objects) in buckets. 11 9s of durability.

**Q7: What is IAM?**
**A:** Identity and Access Management — controls who can do what in your cloud account. Users, groups, roles, policies.

**Q8: What is a VPC?**
**A:** Virtual Private Cloud — an isolated network in the cloud. You control IP ranges, subnets, route tables, gateways.

**Q9: What is Lambda?**
**A:** AWS's serverless compute service. Run code without provisioning servers. Pay per invocation and duration.

**Q10: What is the shared responsibility model?**
**A:** Cloud provider secures the cloud itself (data centers, network, hypervisor); you secure what's in the cloud (OS, app, data, access).

### 22.3 Mid (2-4 years)

**Q11: How do you design a highly available web app on AWS?**
**A:** (1) Multi-AZ: ALB across 2-3 AZs. (2) Auto Scaling Group spanning AZs. (3) RDS Multi-AZ or Aurora with replicas. (4) S3 with versioning. (5) CloudFront CDN. (6) Route 53 with health checks. (7) Multi-region for DR.

**Q12: How do you reduce cloud costs?**
**A:** (1) Right-sizing instances. (2) Reserved Instances or Savings Plans for steady-state. (3) Spot for fault-tolerant. (4) Auto-scaling. (5) S3 lifecycle policies. (6) Tag everything. (7) Cost anomaly alerts. (8) Schedule non-prod off.

**Q13: What is a cold start?**
**A:** When a Lambda function is invoked for the first time or after idle, the runtime initializes. Adds latency (100ms-1s). Mitigation: Provisioned Concurrency, min-instances.

**Q14: How do you implement serverless authentication?**
**A:** (1) API Gateway with Cognito authorizer. (2) Lambda authorizer for custom logic. (3) JWT tokens issued by Cognito. (4) Validate on every request. (5) Refresh tokens for long sessions.

**Q15: How do you handle secrets in cloud?**
**A:** (1) Secrets Manager (AWS) / Key Vault (Azure) / Secret Manager (GCP). (2) Never in code. (3) IAM roles for access. (4) Rotation. (5) Audit with CloudTrail.

**Q16: What is the difference between S3 and EBS?**
**A:** S3: object storage (files, blobs). EBS: block storage attached to a single EC2. S3 is shared, accessible from anywhere; EBS is local to one instance.

### 22.4 Senior (4-6 years)

**Q17: How do you design a multi-region active-active system?**
**A:** (1) Multi-region deployment. (2) Route 53 with latency-based or geolocation routing. (3) Cross-region data replication (S3, DynamoDB Global Tables, RDS read replicas). (4) Stateless services. (5) Conflict resolution for writes (last-writer-wins, CRDTs). (6) DR runbooks.

**Q18: How do you implement zero-downtime deployments on cloud?**
**A:** (1) Blue-green: two environments, switch traffic. (2) Canary: gradual traffic shift. (3) Rolling update: gradual replacement. (4) Health checks (ELB target group). (5) Pre-stop hook for graceful shutdown. (6) Database migrations backward-compatible first.

**Q19: How do you implement FinOps discipline?**
**A:** (1) Tag everything (team, env, project). (2) Cost anomaly detection. (3) Budgets with alerts. (4) Reserved capacity for steady-state. (5) Right-sizing. (6) Auto-scaling. (7) Cost reports per team. (8) Culture: cost is everyone's responsibility.

**Q20: How do you implement cross-account access?**
**A:** (1) IAM role trust policies. (2) Cross-account roles (e.g., `arn:aws:iam::ACCOUNT:role/ROLE`). (3) Resource-based policies. (4) AWS Organizations SCPs for boundaries. (5) Centralized logging via CloudTrail / CloudWatch cross-account.

**Q21: How do you implement hybrid cloud?**
**A:** (1) VPN or Direct Connect (AWS) / ExpressRoute (Azure) / Cloud Interconnect (GCP) for network. (2) Active Directory federation. (3) Consistent tooling (Terraform). (4) Data sync. (5) DR planning.

### 22.5 Lead (6-8 years)

**Q22: How do you evaluate cloud provider migration?**
**A:** (1) Workload inventory. (2) TCO analysis (compute, storage, network, support, training). (3) Service comparison (feature parity). (4) Compliance requirements. (5) Migration strategy (lift-and-shift, replatform, refactor). (6) Pilot before full migration.

**Q23: How do you implement multi-cloud DR?**
**A:** (1) Cross-region replication (S3 CRR, DynamoDB Global Tables). (2) Database replication (RDS cross-region, Aurora Global Database). (3) Infrastructure as Code (Terraform). (4) DNS failover (Route 53). (5) Tested failover runbooks. (6) RTO/RPO targets.

**Q24: How do you implement secure multi-tenant SaaS?**
**A:** (1) Account per tenant or strong tenant isolation. (2) Per-tenant IAM roles. (3) Per-tenant encryption keys (KMS). (4) Quotas per tenant. (5) Audit logs per tenant. (6) Tenant-aware monitoring.

### 22.6 Staff (8-12 years)

**Q25: How do you build a global cloud platform?**
**A:** (1) Multi-account strategy. (2) Centralized identity (IAM Identity Center / Entra ID / Cloud Identity). (3) Network topology (Transit Gateway / Virtual WAN / Cloud Router). (4) Service catalog (Service Catalog / Azure Managed Apps). (5) Self-service via CI/CD. (6) Cost allocation. (7) Compliance monitoring.

**Q26: How do you evolve cloud architecture over years?**
**A:** (1) Start with managed services. (2) Move to containers (EKS / AKS / GKE). (3) Serverless for variable workloads. (4) Service mesh for cross-cutting concerns. (5) Multi-region for HA. (6) Multi-cloud for risk diversification.

### 22.7 Principal / Architect

**Q27: When would you choose NOT to move to cloud?**
**A:** (1) Strict data sovereignty (some countries). (2) Compliance forbids. (3) Existing mainframe investment. (4) Latency-critical (e.g., HFT). (5) Cost analysis shows on-prem cheaper.

**Q28: How do you evaluate FinOps maturity?**
**A:** Crawl: visibility (cost reports, tags). Walk: optimization (rightsizing, commitments). Run: continuous (FinOps culture, automation, policy as code). Use the FinOps framework stages.

### 22.8 Scenario-based questions

**Scenario 1:** AWS bill jumped 5x overnight. What do you do?
**Answer:** (1) Check Cost Anomaly Detection. (2) Look at usage by service. (3) Check for crypto mining (compromised credentials). (4) Identify runaway processes (e.g., over-scaling, leaked dev environment). (5) Stop the bleeding. (6) Investigate root cause. (7) Implement prevention.

**Scenario 2:** A region is down. How do you failover?
**Answer:** (1) Route 53 health checks detect failure. (2) DNS failover to secondary region. (3) Services in secondary region scale up. (4) Database replicas in secondary (read or promoted to writer). (5) Communicate via status page. (6) Once primary recovers, decide: failback or stay.

**Scenario 3:** Lambda function fails intermittently. How do you debug?
**Answer:** (1) Check CloudWatch Logs. (2) Look for OOM, timeout, or unhandled exception. (3) Check X-Ray traces. (4) Reproduce locally (SAM CLI). (5) Add logging. (6) Check for race conditions or resource leaks.

**Scenario 4:** A service is slow in production but fast in staging. How do you debug?
**Answer:** (1) Compare configurations (instance types, scaling, dependencies). (2) Check throttling or quotas. (3) Check network latency (cross-AZ, cross-region). (4) Check database performance (RDS Performance Insights). (5) Check cold starts. (6) Check for noisy neighbors. (7) Compare X-Ray traces.

---

## 23. References

### 23.1 Official documentation

- **AWS:** <https://docs.aws.amazon.com/>
- **Azure:** <https://learn.microsoft.com/azure/
- **GCP:** <https://cloud.google.com/docs/
- **AWS Well-Architected:** <https://aws.amazon.com/architecture/well-architected/
- **Azure Architecture Center:** <https://learn.microsoft.com/azure/architecture/
- **GCP Architecture Center:** <https://cloud.google.com/architecture/

### 23.2 Foundational papers

- **"Above the Clouds: A Berkeley View of Cloud Computing"** — UC Berkeley RAD Lab (2009).
- **"The Datacenter as a Computer"** — Luiz André Barroso, Urs Hölzle (Google).
- **"MapReduce: Simplified Data Processing on Large Clusters"** — Dean, Ghemawat (Google, 2004).
- **"Dynamo: Amazon's Highly Available Key-value Store"** — DeCandia et al. (2007).
- **"The Google File System"** — Ghemawat et al. (2003).
- **"Spanner: Google's Globally-Distributed Database"** — Corbett et al. (2012).
- **"Borg, Omega, and Kubernetes"** — Burns, Grant, Oppenheimer, Brewer (2016).

### 23.3 Books

- *Cloud FinOps* — J.R. Storment, Mike Fuller (O'Reilly).
- *AWS Well-Architected in Practice* — Michael O. Frizzado, Dylan Barrell (Packt).
- *Cloud Native Architectures* — Tom Laszewski, Kamal Arora, Erik Farr, Piyum Zonooz.
- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly). Free online.
- *AWS Certified Solutions Architect Official Study Guide* — Joe Baron et al.
- *Azure for Architects* — Jack Lee, Michelle Lerouge Bustamante (Packt).
- *Google Cloud Platform in Action* — JJ Geewax (Manning).

### 23.4 Engineering blogs

- **AWS News Blog:** <https://aws.amazon.com/blogs/aws/
- **Azure Blog:** <https://azure.microsoft.com/en-us/blog/
- **Google Cloud Blog:** <https://cloud.google.com/blog/
- **Netflix Tech Blog:** <https://netflixtechblog.com/>
- **Spotify Engineering:** <https://engineering.atspotify.com/
- **Airbnb Engineering:** <https://medium.com/airbnb-engineering
- **Slack Engineering:** <https://slack.engineering/
- **GitHub Engineering:** <https://github.blog/engineering/

### 23.5 Tools

- **AWS CLI:** <https://aws.amazon.com/cli/
- **Azure CLI:** <https://learn.microsoft.com/cli/azure/
- **gcloud CLI:** <https://cloud.google.com/sdk/gcloud/
- **AWS CDK:** <https://aws.amazon.com/cdk/
- **Terraform:** <https://www.terraform.io/
- **Pulumi:** <https://www.pulumi.com/
- **Bicep:** (Azure-specific) <https://learn.microsoft.com/azure/azure-resource-manager/bicep/
- **kubectl:** covered in DevOps doc.
- **Helm:** covered in DevOps doc.

### 23.6 Conferences

- **AWS re:Invent:** <https://reinvent.awsevents.com/
- **Microsoft Ignite:** <https://ignite.microsoft.com/
- **Google Cloud Next:** <https://cloud.withgoogle.com/next/
- **KubeCon + CloudNativeCon:** (see DevOps doc).

### 23.7 Free online resources

- **AWS Skill Builder:** <https://aws.amazon.com/training/
- **Microsoft Learn:** <https://learn.microsoft.com/
- **Google Cloud Skills Boost:** <https://www.cloudskillsboost.google/
- **AWS Well-Architected Labs:** <https://wellarchitectedlabs.com/
- **FinOps Framework:** <https://www.finops.org/

---

## Appendix A: AWS Service Quick Reference (as of 2026)

| Category | Service | Use |
|----------|---------|-----|
| Compute | EC2 | Virtual machines |
| Compute | Lambda | Serverless functions |
| Compute | ECS / EKS | Containers / Kubernetes |
| Compute | Fargate | Serverless containers |
| Storage | S3 | Object storage |
| Storage | EBS | Block storage |
| Storage | EFS / FSx | File storage |
| Storage | S3 Glacier | Cold archive |
| Database | RDS | Managed relational |
| Database | Aurora | High-perf relational |
| Database | DynamoDB | Managed NoSQL key-value |
| Database | ElastiCache | In-memory cache |
| Database | Neptune | Graph database |
| Database | Redshift | Data warehouse |
| Messaging | SQS | Queues |
| Messaging | SNS | Pub/sub |
| Messaging | EventBridge | Event bus |
| Messaging | MSK | Managed Kafka |
| Networking | VPC | Isolated network |
| Networking | Route 53 | DNS |
| Networking | CloudFront | CDN |
| Networking | ELB | Load balancer |
| Networking | Direct Connect | Dedicated connection |
| Security | IAM | Auth and authz |
| Security | KMS | Key management |
| Security | Secrets Manager | Secret storage |
| Security | WAF | Web application firewall |
| Security | Shield | DDoS protection |
| Observability | CloudWatch | Metrics and logs |
| Observability | X-Ray | Distributed tracing |
| Observability | CloudTrail | Audit logs |

## Appendix B: Common Cloud Architecture Patterns

| Pattern | Description |
|---------|-------------|
| Three-tier | Edge → App → DB tiers |
| Microservices | Many small services, own data |
| Event-driven | Services emit events; subscribers react |
| Serverless API | API Gateway + Lambda + DynamoDB |
| CQRS | Separate write and read models |
| Saga | Distributed transactions via orchestration |
| Outbox | Atomic event publication via DB |
| Strangler fig | Gradually replace monolith |
| Bulkhead | Isolate failures by resource |
| Circuit breaker | Fail fast on dependent failures |
| Cache-aside | App checks cache; on miss, hits DB |
| Write-through | Cache writes to DB synchronously |
| Saga | Distributed transactions |

## Appendix C: Glossary

| Term | Definition |
|------|-----------|
| **ACL** | Access Control List |
| **ALB** | Application Load Balancer |
| **ARM** | Azure Resource Manager |
| **AZ** | Availability Zone |
| **BGP** | Border Gateway Protocol |
| **CDN** | Content Delivery Network |
| **CNI** | Cloud Native Computing Foundation (or Container Network Interface) |
| **CWPP** | Cloud Workload Protection Platform |
| **EBS** | Elastic Block Store |
| **EFS** | Elastic File System |
| **FaaS** | Function as a Service |
| **FinOps** | Financial Operations |
| **HPC** | High-Performance Computing |
| **IaaS** | Infrastructure as a Service |
| **MFA** | Multi-Factor Authentication |
| **NLB** | Network Load Balancer |
| **NACL** | Network Access Control List (AWS) |
| **NSG** | Network Security Group (Azure) |
| **OT** | Operational Technology |
| **PaaS** | Platform as a Service |
| **RTO** | Recovery Time Objective |
| **RPO** | Recovery Point Objective |
| **SaaS** | Software as a Service |
| **SCP** | Service Control Policy (AWS) |
| **SLB** | Server Load Balancer |
| **SLR** | Snapshot Lifecycle Rule (AWS) |
| **SNI** | Server Name Indication |
| **VPC** | Virtual Private Cloud |
| **VPN** | Virtual Private Network |
| **WAF** | Web Application Firewall |
| **XR** | Extended Reality |

---

*End of document. Total: 23 sections + 3 appendices.*

*Companion resources:*
- *Source: [`cloud.md`](./cloud.md)*
- *AWS: [`references/aws-docs.md`](./references/aws-docs.md)*
- *Azure: [`references/azure-docs.md`](./references/azure-docs.md)*
- *GCP: [`references/gcp-docs.md`](./references/gcp-docs.md)*
- *Code examples: [`examples/`](./examples/) (16 cloud examples)*