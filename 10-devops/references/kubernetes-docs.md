# Kubernetes Documentation Reference

The authoritative source for Kubernetes is the official documentation. This file catalogs the Kubernetes documentation pages referenced in the DevOps document.

## Primary documentation

- **Kubernetes Documentation:** <https://kubernetes.io/docs/>
- **Kubernetes GitHub:** <https://github.com/kubernetes/kubernetes>
- **Kubernetes Blog:** <https://kubernetes.io/blog/>
- **Kubernetes Slack:** <https://slack.k8s.io/>
- **Kubernetes Forum:** <https://discuss.kubernetes.io/>

## Topics referenced in the document

### Concepts

| Topic | URL |
|-------|-----|
| Overview | <https://kubernetes.io/docs/concepts/overview/> |
| Cluster architecture | <https://kubernetes.io/docs/concepts/architecture/> |
| Containers | <https://kubernetes.io/docs/concepts/containers/> |
| Workloads | <https://kubernetes.io/docs/concepts/workloads/> |
| Services | <https://kubernetes.io/docs/concepts/services-networking/service/> |
| Storage | <https://kubernetes.io/docs/concepts/storage/> |
| Configuration | <https://kubernetes.io/docs/concepts/configuration/> |
| Security | <https://kubernetes.io/docs/concepts/security/> |
| Policies | <https://kubernetes.io/docs/concepts/policy/> |
| Scheduling | <https://kubernetes.io/docs/concepts/scheduling-eviction/> |

### Workload resources

| Resource | URL |
|----------|-----|
| Pods | <https://kubernetes.io/docs/concepts/workloads/pods/> |
| Deployments | <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/> |
| StatefulSets | <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/> |
| DaemonSets | <https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/> |
| Jobs | <https://kubernetes.io/docs/concepts/workloads/controllers/job/> |
| CronJobs | <https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/> |
| ReplicaSets | <https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/> |

### Networking

| Topic | URL |
|-------|-----|
| Services | <https://kubernetes.io/docs/concepts/services-networking/service/> |
| Ingress | <https://kubernetes.io/docs/concepts/services-networking/ingress/> |
| NetworkPolicies | <https://kubernetes.io/docs/concepts/services-networking/network-policies/> |
| DNS | <https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/> |
| CNI | <https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/> |

### Storage

| Topic | URL |
|-------|-----|
| Volumes | <https://kubernetes.io/docs/concepts/storage/volumes/> |
| PersistentVolumes | <https://kubernetes.io/docs/concepts/storage/persistent-volumes/> |
| StorageClasses | <https://kubernetes.io/docs/concepts/storage/storage-classes/> |
| CSI | <https://kubernetes.io/docs/concepts/storage/csi/> |

### Configuration

| Topic | URL |
|-------|-----|
| ConfigMaps | <https://kubernetes.io/docs/concepts/configuration/configmap/> |
| Secrets | <https://kubernetes.io/docs/concepts/configuration/secret/> |
| Resource Quotas | <https://kubernetes.io/docs/concepts/policy/resource-quotas/> |

### Security

| Topic | URL |
|-------|-----|
| RBAC | <https://kubernetes.io/docs/reference/access-authn-authz/rbac/> |
| ServiceAccounts | <https://kubernetes.io/docs/concepts/security/service-accounts/> |
| Pod Security Standards | <https://kubernetes.io/docs/concepts/security/pod-security-standards/> |
| Network Policies | <https://kubernetes.io/docs/concepts/services-networking/network-policies/> |

### Tasks

| Topic | URL |
|-------|-----|
| kubectl | <https://kubernetes.io/docs/reference/kubectl/> |
| kubectl apply | <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-apply/> |
| kubectl get | <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-get/> |
| kubectl logs | <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-logs/> |
| kubectl exec | <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-exec/> |
| kubectl debug | <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-debug/> |

## API reference

| Group | URL |
|-------|-----|
| Core API | <https://kubernetes.io/docs/reference/kubernetes-api/> |
| Apps | <https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.30/#apps-v1> |
| Batch | <https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.30/#batch-v1> |
| Networking | <https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.30/#networking-v1> |
| Storage | <https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.30/#storage-v1> |

## kubectl cheat sheet

```bash
# Get resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get all

# Describe resource
kubectl describe pod <name>

# Logs
kubectl logs <pod>
kubectl logs -f <pod>
kubectl logs <pod> --previous

# Execute command
kubectl exec -it <pod> -- bash

# Apply manifests
kubectl apply -f deployment.yaml

# Delete
kubectl delete -f deployment.yaml
kubectl delete pod <name>

# Debug
kubectl debug -it <pod> --image=busybox

# Port forward
kubectl port-forward <pod> 8080:80

# Cluster info
kubectl cluster-info
kubectl get nodes
kubectl top nodes
```

## Versions

| Version | Year | Notable |
|---------|------|---------|
| 1.0 | 2015 | First production-ready |
| 1.6 | 2017 | RBAC, etcd v3 |
| 1.13 | 2018 | CoreDNS, kubeadm HA |
| 1.16 | 2019 | CRDs v1 |
| 1.18 | 2020 | Server-side apply beta |
| 1.20 | 2020 | Dockershim deprecation |
| 1.22 | 2021 | Dockershim removed |
| 1.24 | 2022 | Beta APIs stable |
| 1.27 | 2023 | Sidecar GA |
| 1.29 | 2024 | Sidecar improvements |
| 1.30 | 2025 | Continued improvements |
| 1.31 | 2025 | Latest stable |

## Books

- *Kubernetes Patterns* — Bilgin Ibryam, Roland Huß (O'Reilly). Free online.
- *Kubernetes Up and Running* — Brendan Burns, Joe Beda, Kelsey Hightower (O'Reilly).
- *Cloud Native DevOps with Kubernetes* — John Arundel, Justin Domingus (O'Reilly).
- *Production Kubernetes* — Josh Rosso, Rich Lander, Alexander Brand, John Harris (O'Reilly).
- *Kubernetes for Developers* — William Denniss (Manning).
- *Programming Kubernetes* — Michael Hausenblas, Stefan Schimanski (O'Reilly).

## Certified distributions

- **Google GKE:** <https://cloud.google.com/kubernetes-engine>
- **AWS EKS:** <https://aws.amazon.com/eks/>
- **Azure AKS:** <https://azure.microsoft.com/en-us/services/kubernetes-service/>
- **Red Hat OpenShift:** <https://www.redhat.com/en/technologies/cloud-computing/openshift>
- **VMware Tanzu:** <https://tanzu.vmware.com/>

## Tools

- **kubectl:** official CLI.
- **kubectx/kubens:** switch context/namespace.
- **k9s:** terminal UI.
- **lens:** desktop UI.
- **Helm:** package manager (separate doc).
- **ArgoCD:** GitOps (separate section).
- **Skaffold:** iterative dev.
- **Tilt:** dev workflow.
- **Kustomize:** declarative config (Helm alternative).