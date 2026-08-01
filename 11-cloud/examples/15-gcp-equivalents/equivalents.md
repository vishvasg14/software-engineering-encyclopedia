# 15 — GCP equivalents to AWS patterns

| AWS | GCP | Use |
|-----|-----|-----|
| EC2 | Compute Engine | IaaS compute |
| Lambda | Cloud Functions | Serverless functions |
| ECS / EKS | Cloud Run / GKE | Containers / Kubernetes |
| Fargate | Cloud Run | Serverless containers |
| S3 | Cloud Storage (GCS) | Object storage |
| EBS | Persistent Disk | Block storage |
| RDS | Cloud SQL | Managed RDBMS |
| Aurora | Cloud Spanner | Distributed SQL |
| DynamoDB | Firestore / Bigtable | NoSQL |
| ElastiCache | Memorystore | In-memory cache |
| SQS | Cloud Tasks / Pub/Sub | Message queues |
| SNS | Pub/Sub | Pub/sub |
| EventBridge | Eventarc | Event bus |
| MSK | Confluent Cloud (partner) | Managed Kafka |
| API Gateway | API Gateway / Apigee | API gateway |
| CloudFront | Cloud CDN | CDN |
| Route 53 | Cloud DNS | DNS |
| IAM | Cloud IAM | Identity |
| KMS | Cloud KMS | Key management |
| Secrets Manager | Secret Manager | Secret management |
| CloudWatch | Cloud Monitoring | Monitoring |
| X-Ray | Cloud Trace | Tracing |
| CloudTrail | Cloud Audit Logs | Audit logs |
| Config | Config Connector / Org Policy | Config |
| VPC | VPC | Isolated network |
| Transit Gateway | Cloud Router | Hub for many networks |
| Direct Connect | Cloud Interconnect | Dedicated connection |
| PrivateLink | Private Service Connect | Private service access |

## GCP-specific strengths

- **BigQuery** — industry-leading serverless data warehouse.
- **Spanner** — globally-distributed relational database (5 9s).
- **Vertex AI** — ML platform.
- **Sustained Use Discounts** — automatic for Compute Engine; up to 30% off.
- **BigQuery Omni** — multi-cloud analytics.
- **Carbon-neutral** since 2007.

## Multi-cloud considerations

- **BigQuery Omni** for multi-cloud analytics.
- **Anthos** for multi-cloud K8s (GKE + on-prem + other clouds).
- **Cloud Interconnect** for dedicated connections.