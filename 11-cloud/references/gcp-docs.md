# GCP Documentation Reference

The authoritative source for GCP is the official documentation. This file catalogs the GCP documentation pages referenced in the Cloud document.

## Primary documentation

- **GCP Documentation:** <https://cloud.google.com/docs/
- **GCP Console:** <https://console.cloud.google.com/
- **GCP Architecture Center:** <https://cloud.google.com/architecture/
- **Google Cloud Well-Architected:** (private to Google employees; community equivalents exist).
- **Google GitHub:** <https://github.com/google-cloud-platform/

## Key services referenced in the document

### Compute <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Compute'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Compute" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Compute Engine** | EC2 | <https://cloud.google.com/compute/ |
| **Cloud Functions** | Lambda | <https://cloud.google.com/functions/ |
| **Cloud Run** | Fargate | <https://cloud.google.com/run/ |
| **GKE** | EKS | <https://cloud.google.com/kubernetes-engine/ |
| **App Engine** | Elastic Beanstalk | <https://cloud.google.com/appengine/ |
| **Batch** | AWS Batch | <https://cloud.google.com/batch/ |

### Storage <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Storage'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Storage" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Cloud Storage (GCS)** | S3 | <https://cloud.google.com/storage/ |
| **Persistent Disk** | EBS | <https://cloud.google.com/compute/docs/disks/ |
| **Filestore** | EFS | <https://cloud.google.com/filestore/ |
| **Archive Storage** | Glacier | <https://cloud.google.com/storage/archiving/ |

### Database <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Database'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Database" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Cloud SQL** | RDS | <https://cloud.google.com/sql/ |
| **Spanner** | Aurora | <https://cloud.google.com/spanner/ |
| **Firestore** | DynamoDB | <https://cloud.google.com/firestore/ |
| **Bigtable** | (no direct equivalent) | <https://cloud.google.com/bigtable/ |
| **Memorystore** | ElastiCache | <https://cloud.google.com/memorystore/ |
| **AlloyDB** | RDS Aurora | <https://cloud.google.com/alloydb/ |

### Networking <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Networking'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Networking" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **VPC** | VPC | <https://cloud.google.com/vpc/ |
| **Cloud Load Balancing** | ELB | <https://cloud.google.com/load-balancing/ |
| **Cloud CDN** | CloudFront | <https://cloud.google.com/cdn/ |
| **Cloud DNS** | Route 53 | <https://cloud.google.com/dns/ |
| **Cloud Interconnect** | Direct Connect | <https://cloud.google.com/interconnect/ |
| **Cloud Router** | Transit Gateway | <https://cloud.google.com/network-connectivity/docs/concepts/network-overview> |
| **Private Service Connect** | PrivateLink | <https://cloud.google.com/private-service-connect/ |

### Security <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Security'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Security" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Cloud IAM** | IAM | <https://cloud.google.com/iam/ |
| **Cloud KMS** | KMS | <https://cloud.google.com/kms/ |
| **Secret Manager** | Secrets Manager | <https://cloud.google.com/secret-manager/ |
| **Identity-Aware Proxy** | (no equivalent) | <https://cloud.google.com/iap/ |
| **Security Command Center** | GuardDuty | <https://cloud.google.com/security-command-center/ |
| **Cloud Armor** | Shield / WAF | <https://cloud.google.com/armor/ |
| **Identity Platform** | Cognito | <https://cloud.google.com/identity-platform/ |

### Messaging <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Messaging'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Messaging" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Pub/Sub** | SNS / SQS | <https://cloud.google.com/pubsub/ |
| **Eventarc** | EventBridge | <https://cloud.google.com/eventarc/ |
| **Cloud Tasks** | SQS | <https://cloud.google.com/tasks/ |
| **Confluent Cloud** | MSK | <https://cloud.google.com/architecture/stream-messaging-with-confluent-kafka |

### API <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'API'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="API" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **API Gateway** | API Gateway | <https://cloud.google.com/api-gateway/ |
| **Apigee** | Apigee | <https://cloud.google.com/apigee/ |
| **Cloud Endpoints** | (legacy) | <https://cloud.google.com/endpoints/ |

### Observability <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Observability'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Observability" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **Cloud Monitoring** | CloudWatch | <https://cloud.google.com/monitoring/ |
| **Cloud Logging** | CloudWatch Logs | <https://cloud.google.com/logging/ |
| **Cloud Trace** | X-Ray | <https://cloud.google.com/trace/ |
| **Cloud Profiler** | (no equivalent) | <https://cloud.google.com/profiler/ |
| **Cloud Debugger** | (no equivalent) | <https://cloud.google.com/debugger/ |

### Serverless <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Serverless'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Serverless" title="Ask ChatGPT about this section">💬</a>

| Service | URL |
|---------|-----|
| **Cloud Functions** | <https://cloud.google.com/functions/ |
| **Cloud Run** | <https://cloud.google.com/run/ |
| **Workflows** | <https://cloud.google.com/workflows/ |
| **Eventarc** | <https://cloud.google.com/eventarc/ |

### Containers <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Containers'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Containers" title="Ask ChatGPT about this section">💬</a>

| Service | AWS equivalent | URL |
|---------|----------------|-----|
| **GKE** | EKS | <https://cloud.google.com/kubernetes-engine/ |
| **Cloud Run** | Fargate | <https://cloud.google.com/run/ |
| **Artifact Registry** | ECR | <https://cloud.google.com/artifact-registry/ |

### Cost management <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Cost%20management'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Cost management" title="Ask ChatGPT about this section">💬</a>

| Service | URL |
|---------|-----|
| **Billing** | <https://cloud.google.com/billing/ |
| **Pricing Calculator** | <https://cloud.google.com/products/calculator/ |
| **Committed Use Discounts (CUDs)** | (within Compute docs) |
| **Sustained Use Discounts** | (automatic) |

## Regions

- **40+ regions** globally.
- **Availability Zones** in most regions.
- **Special regions:** US (multi-regions), EU (multi-regions), China.

## Pricing

- **Pay-as-you-go.**
- **Sustained Use Discounts (SUDs):** automatic for Compute Engine; up to 30% discount.
- **Committed Use Discounts (CUDs):** 1 or 3 year commit; up to 57% discount.
- **Spot VMs** (preemptible): up to 90% discount; can be preempted.
- **Committed Use Discounts for GKE and other services.**

## Tools

- **gcloud CLI:** <https://cloud.google.com/sdk/gcloud/
- **Cloud Console:** web UI.
- **Deployment Manager:** declarative templates (YAML/Jinja).
- **Terraform** (GCP provider).
- **Pulumi.**
- **Cloud Shell:** browser-based terminal.

## Community

- **Google Cloud Community:** <https://www.googlecloudcommunity.com/
- **r/googlecloud:** Reddit.
- **Stack Overflow:** google-cloud-platform tag.

## Books

- *Google Cloud Platform in Action* — JJ Geewax (Manning).
- *Official Google Cloud Certified Professional Cloud Architect Study Guide* — Dan Sullivan.
- *Architecting Google Cloud Solutions* — Victor Dantas.