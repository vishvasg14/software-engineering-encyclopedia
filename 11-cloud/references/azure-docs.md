# Azure Documentation Reference

The authoritative source for Azure is the official documentation. This file catalogs the Azure documentation pages referenced in the Cloud document.

## Primary documentation

- **Azure Documentation:** <https://learn.microsoft.com/azure/
- **Azure Portal:** <https://portal.azure.com/
- **Azure Architecture Center:** <https://learn.microsoft.com/azure/architecture/
- **Azure Well-Architected Framework:** <https://learn.microsoft.com/azure/architecture/framework/
- **Azure GitHub:** <https://github.com/Azure/

## Key services referenced in the document

### Compute

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Virtual Machines** | EC2 | <https://learn.microsoft.com/azure/virtual-machines/ |
| **Azure Functions** | Lambda | <https://learn.microsoft.com/azure/azure-functions/ |
| **Container Instances** | ECS/Fargate | <https://learn.microsoft.com/azure/container-instances/ |
| **Container Apps** | App Runner / Fargate | <https://learn.microsoft.com/azure/container-apps/ |
| **AKS** | EKS | <https://learn.microsoft.com/azure/aks/ |
| **App Service** | Elastic Beanstalk | <https://learn.microsoft.com/azure/app-service/ |
| **Batch** | AWS Batch | <https://learn.microsoft.com/azure/batch/ |

### Storage

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Blob Storage** | S3 | <https://learn.microsoft.com/azure/storage/blobs/ |
| **Files** | EFS | <https://learn.microsoft.com/azure/storage/files/ |
| **Queue Storage** | SQS | <https://learn.microsoft.com/azure/storage/queues/ |
| **Table Storage** | DynamoDB | <https://learn.microsoft.com/azure/storage/tables/ |
| **Disk Storage** | EBS | <https://learn.microsoft.com/azure/storage/disks/ |
| **Archive Storage** | Glacier | <https://learn.microsoft.com/azure/storage/blobs/access-tiers-overview/ |

### Database

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Azure SQL** | RDS / Aurora | <https://learn.microsoft.com/azure/azure-sql/ |
| **Cosmos DB** | DynamoDB | <https://learn.microsoft.com/azure/cosmos-db/ |
| **Azure Database for PostgreSQL** | RDS | <https://learn.microsoft.com/azure/postgresql/ |
| **Azure Database for MySQL** | RDS | <https://learn.microsoft.com/azure/mysql/ |
| **Azure Cache for Redis** | ElastiCache | <https://learn.microsoft.com/azure/azure-cache-for-redis/ |
| **Azure Synapse** | Redshift | <https://learn.microsoft.com/azure/synapse-analytics/ |

### Networking

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Virtual Network (VNet)** | VPC | <https://learn.microsoft.com/azure/virtual-network/ |
| **Azure Load Balancer** | ELB | <https://learn.microsoft.com/azure/load-balancer/ |
| **Application Gateway** | ALB | <https://learn.microsoft.com/azure/application-gateway/ |
| **Azure Front Door** | CloudFront | <https://learn.microsoft.com/azure/frontdoor/ |
| **Azure CDN** | CloudFront | <https://learn.microsoft.com/azure/cdn/ |
| **ExpressRoute** | Direct Connect | <https://learn.microsoft.com/azure/expressroute/ |
| **Virtual WAN** | Transit Gateway | <https://learn.microsoft.com/azure/virtual-wan/ |
| **Private Link** | PrivateLink | <https://learn.microsoft.com/azure/private-link/ |
| **Azure DNS** | Route 53 | <https://learn.microsoft.com/azure/dns/ |

### Security

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Microsoft Entra ID** | IAM / Cognito | <https://learn.microsoft.com/entra/identity/ |
| **Azure RBAC** | IAM | <https://learn.microsoft.com/azure/role-based-access-control/ |
| **Key Vault** | KMS / Secrets Manager | <https://learn.microsoft.com/azure/key-vault/ |
| **Azure AD B2C** | Cognito | <https://learn.microsoft.com/azure/active-directory-b2c/ |
| **Defender for Cloud** | GuardDuty | <https://learn.microsoft.com/azure/defender-for-cloud/ |
| **DDoS Protection** | Shield | <https://learn.microsoft.com/azure/ddos-protection/ |
| **WAF** | WAF | <https://learn.microsoft.com/azure/web-application-firewall/ |

### Messaging

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Service Bus** | SQS/SNS | <https://learn.microsoft.com/azure/service-bus/ |
| **Event Grid** | EventBridge | <https://learn.microsoft.com/azure/event-grid/ |
| **Event Hubs** | Kinesis | <https://learn.microsoft.com/azure/event-hubs/ |
| **Storage Queues** | SQS | <https://learn.microsoft.com/azure/storage/queues/ |
| **Service Bus for Kafka** | MSK | <https://learn.microsoft.com/azure/service-bus-messaging/service-bus-for-kafka-overview/ |

### API

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **API Management** | API Gateway | <https://learn.microsoft.com/azure/api-management/ |
| **App Gateway** | ALB | <https://learn.microsoft.com/azure/application-gateway/ |

### Observability

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Azure Monitor** | CloudWatch | <https://learn.microsoft.com/azure/azure-monitor/ |
| **Log Analytics** | CloudWatch Logs | <https://learn.microsoft.com/azure/azure-monitor/logs/ |
| **Application Insights** | X-Ray | <https://learn.microsoft.com/azure/azure-monitor/app-insights/ |
| **Azure Activity Log** | CloudTrail | <https://learn.microsoft.com/azure/azure-monitor/essentials/activity-log/ |
| **Azure Advisor** | Trusted Advisor | <https://learn.microsoft.com/azure/advisor/ |

### Cost management

| Service | URL |
|---------|-----|
| **Cost Management + Billing** | <https://learn.microsoft.com/azure/cost-management-billing/ |
| **Pricing Calculator** | <https://azure.microsoft.com/pricing/calculator/ |
| **Reserved Instances** | (within Cost Management) |
| **Savings Plan** | (within Cost Management) |
| **Azure Hybrid Benefit** | <https://learn.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit/ |

## Regions

- **60+ regions** globally.
- **Availability Zones** in 30+ regions.
- **Special regions:** China (operated by 21Vianet), US Gov, DoD.

## Pricing

- **Pay-as-you-go.**
- **Reserved Instances** (1 or 3 years).
- **Savings Plan for Compute** (1 or 3 years).
- **Spot VMs** (up to 90% discount; can be evicted).
- **Azure Hybrid Benefit** (use existing Windows Server licenses).

## Tools

- **Azure CLI:** <https://learn.microsoft.com/cli/azure/
- **Azure PowerShell.**
- **Azure Portal:** web UI.
- **Bicep:** declarative IaC.
- **ARM templates:** JSON-based IaC.
- **Terraform** (Azure provider).
- **Pulumi.**

## Community

- **Microsoft Q&A:** <https://learn.microsoft.com/answers/
- **Azure Tech Community:** <https://techcommunity.microsoft.com/category/azure/
- **Azure GitHub Discussions.**

## Books

- *Azure for Architects* — Jack Lee, Michelle Lerouge Bustamante (Packt).
- *Microsoft Azure Architect Technologies: Exam Guide AZ-303* — Sjoukje Zaal.
- *Azure Cloud Native Architecture Map** — Eldert Grefhorst, Tom Kerkhove.