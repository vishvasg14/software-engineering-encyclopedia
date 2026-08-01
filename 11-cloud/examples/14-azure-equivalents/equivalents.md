# 14 — Azure equivalents to AWS patterns

| AWS | Azure | Use |
|-----|-------|-----|
| EC2 | Virtual Machines | IaaS compute |
| Lambda | Functions | Serverless functions |
| ECS / EKS | Container Instances / AKS | Containers / Kubernetes |
| Fargate | Container Apps | Serverless containers |
| S3 | Blob Storage | Object storage |
| EBS | Disk Storage | Block storage |
| RDS | Azure SQL | Managed RDBMS |
| Aurora | Azure Database for PostgreSQL | High-perf Postgres |
| DynamoDB | Cosmos DB | Managed NoSQL |
| ElastiCache | Cache for Redis | In-memory cache |
| SQS | Service Bus / Storage Queues | Message queues |
| SNS | Event Grid / Service Bus Topics | Pub/sub |
| EventBridge | Event Grid | Event bus |
| MSK | Event Hubs for Kafka | Managed Kafka |
| API Gateway | API Management | API gateway |
| CloudFront | Front Door / CDN | CDN |
| Route 53 | Azure DNS | DNS |
| IAM | Microsoft Entra ID | Identity |
| KMS | Key Vault | Key management |
| Secrets Manager | Key Vault | Secret management |
| CloudWatch | Azure Monitor | Monitoring |
| X-Ray | Application Insights | Tracing |
| CloudTrail | Activity Log | Audit logs |
| Config | Azure Policy | Config |
| VPC | Virtual Network (VNet) | Isolated network |
| Transit Gateway | Virtual WAN | Hub for many networks |
| Direct Connect | ExpressRoute | Dedicated connection |
| PrivateLink | Private Link | Private service access |

## Multi-cloud considerations

- **Azure AD** (now **Microsoft Entra ID**) is the identity layer; integrates with on-prem AD.
- **Hybrid Benefit** — use existing Windows Server licenses.
- **Cost optimization** — Azure Hybrid Benefit, Reserved Instances, Savings Plan.
- **Compliance** — Azure Compliance Manager; SOC 2, ISO 27001, HIPAA, FedRAMP.