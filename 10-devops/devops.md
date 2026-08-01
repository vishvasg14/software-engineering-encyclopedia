# DevOps (Docker, Kubernetes, Helm, Istio)

> A comprehensive, production-grade treatment of Docker, Kubernetes, Helm, Istio, GitOps, deployment strategies, and observability — from containers to service mesh.

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

**DevOps** is the practice of combining software development (Dev) and IT operations (Ops) to shorten the systems development life cycle. Modern DevOps is built on **containerization** (Docker), **orchestration** (Kubernetes), **packaging** (Helm), and **service mesh** (Istio) — the four primary technologies this document covers.

This document treats **Docker** (containers and images), **Kubernetes** (workload orchestration), **Helm** (Kubernetes package manager), and **Istio** (service mesh) at production depth. It also covers **GitOps** (ArgoCD, Flux), **deployment strategies** (blue-green, canary, rolling, A/B, feature flags), and basic **observability** (Prometheus, Grafana, OpenTelemetry).

**Scope.** This is not a tutorial. It assumes you can already write a Dockerfile and run `kubectl`. It focuses on **production-grade patterns**: image optimization, workload design, networking, storage, security, deployment strategies, and operational concerns.

**Version baselines.** Docker 25+, Kubernetes 1.29+, Helm 3.x, Istio 1.21+, ArgoCD 2.10+.

## 2. Definition

The DevOps ecosystem uses overlapping terminology. Here's a precise taxonomy:

| Term | Type | Authoritative source |
|------|------|---------------------|
| **Container** | A standardized unit of software (image + runtime) | OCI |
| **Image** | A read-only template for containers | OCI |
| **Docker** | A container runtime and toolchain | docker.com |
| **OCI** | Open Container Initiative — image and runtime spec | opencontainers.org |
| **Containerd** | A container runtime (used by Docker and K8s) | containerd.io |
| **Kubernetes** | Container orchestration platform | kubernetes.io |
| **Pod** | The smallest deployable unit in K8s | K8s |
| **Deployment** | Manages a ReplicaSet of pods | K8s |
| **Service** | A stable network endpoint for a set of pods | K8s |
| **Ingress** | HTTP routing from outside the cluster | K8s |
| **Helm** | Package manager for K8s | helm.sh |
| **Chart** | A Helm package | helm.sh |
| **Istio** | A service mesh (mTLS, traffic management, observability) | istio.io |
| **Sidecar** | A container that runs alongside the main container | K8s / Istio pattern |
| **Service mesh** | Infrastructure for service-to-service communication | istio.io |
| **GitOps** | Declarative deployment from Git as the source of truth | open-gitops.dev |
| **ArgoCD** | GitOps continuous delivery tool for K8s | argoproj.github.io |
| **Blue-green** | Deployment with two environments, switch traffic | Deployment pattern |
| **Canary** | Deployment with gradual traffic shift | Deployment pattern |
| **Rolling** | Deployment with gradual replacement | Deployment pattern |
| **Feature flag** | Runtime toggle of features without redeployment | Deployment pattern |
| **HPA** | Horizontal Pod Autoscaler | K8s |
| **VPA** | Vertical Pod Autoscaler | K8s |
| **CRD** | Custom Resource Definition | K8s |
| **Operator** | A K8s controller that manages a custom resource | K8s pattern |
| **mTLS** | Mutual TLS — both sides authenticate | TLS |
| **CDN** | Content Delivery Network | — |

The standard reference architecture:

```mermaid
graph TB
    subgraph "Source"
        Git[Git Repo]
    end
    subgraph "CI/CD"
        CI[Build & Test]
        Registry[Container Registry]
    end
    subgraph "Cluster"
        Argo[ArgoCD]
        subgraph "K8s Cluster"
            Pod1[Pod]
            Pod2[Pod]
            Pod3[Pod]
            Istio[Istio Sidecar]
        end
    end
    Git --> CI
    CI --> Registry
    Registry --> Argo
    Argo --> Pod1
    Argo --> Pod2
    Argo --> Pod3
    Pod1 -.-> Istio
```

## 3. Five Ws + One H

### What

**Docker** is a container runtime. **Kubernetes** is a container orchestrator. **Helm** is a package manager for Kubernetes. **Istio** is a service mesh for service-to-service communication. Together, they form the foundation of cloud-native deployment.

### Why

Containers provide consistent environments across dev, test, and prod. Orchestrators manage container lifecycles at scale. Package managers standardize deployments. Service meshes add cross-cutting concerns (mTLS, observability, traffic management) without app changes.

### When

Docker (2013) introduced containers for the masses. Kubernetes (2014) was open-sourced by Google. Helm (2015) was created to template K8s manifests. Istio (2017) was created at Lyft. Now they're the de facto standard for cloud-native deployment.

### Where

Every web-scale company runs containers in production. Kubernetes is the standard orchestrator. Istio is increasingly adopted for service mesh.

### Who

- **Solomon Hykes:** Docker (2013).
- **Google:** Kubernetes (2014), open-sourced from Borg.
- **Deis Labs:** Helm (2015).
- **Lyft:** Envoy proxy (2014), Istio (2017) with IBM and Google.
- **Red Hat:** OpenShift.
- **CNCF:** hosts Kubernetes, Istio, ArgoCD, Prometheus, etcd.

### How (one-paragraph preview)

A developer writes code, packages it in a Docker image (multi-stage build for small size), pushes it to a container registry. CI builds, tests, and updates the image tag. GitOps (ArgoCD) watches the Git repository and syncs the cluster to match. Kubernetes schedules pods on nodes; pods are wrapped in Deployments for self-healing. Services provide stable network identities. Istio's sidecar proxies handle mTLS, retries, and observability. The developer never SSHes into a server; they update Git.

## 4. History

### 4.1 Origins (2000-2013)

- **2000s** — Physical servers; bare metal provisioning; long lead times.
- **2006** — Amazon EC2 launches cloud VMs; virtualization era.
- **2008** — LXC (Linux Containers) merged into kernel; cgroups mature.
- **2013** — Docker 1.0; containers become accessible.

### 4.2 The container era (2013-2015)

- **2013** — Docker announces at PyCon.
- **2014** — Docker Compose, Docker Hub. Kubernetes 0.x released by Google.
- **2015** — OCI (Open Container Initiative) founded. Kubernetes 1.0. CNCF founded.

### 4.3 The Kubernetes era (2015-2020)

- **2015** — Helm 1.0; K8s 1.0.
- **2016** — Helm 2; CNCF adopts K8s.
- **2017** — Istio 0.1; K8s 1.6 (RBAC stable).
- **2018** — Istio 1.0; Helm 3.0 (Tiller removed); K8s 1.10.
- **2019** — K8s 1.13 (CoreDNS default); Knative.

### 4.4 The cloud-native era (2020-2026)

- **2020** — K8s 1.18 (server-side apply); Istio 1.6.
- **2021** — ArgoCD matures; eBPF emerges.
- **2022** — K8s 1.24 (Dockershim removed); Istio 1.13.
- **2023** — K8s 1.27 (sidecar GA); Istio ambient beta.
- **2024** — Istio ambient GA; service mesh standard.
- **2025** — eBPF-based data planes mature.
- **2026** — WebAssembly (Wasm) in service mesh.

```mermaid
timeline
    title DevOps history
    2013 : Docker 1.0
    2014 : Kubernetes 0.x (Google)
    2015 : K8s 1.0, Helm 1.0
    2017 : Istio 0.1
    2018 : Istio 1.0, Helm 3 (no Tiller)
    2020 : Server-side apply (K8s)
    2022 : K8s 1.24 (Dockershim removed)
    2024 : Istio ambient GA
```

## 5. Problem Statement

### 5.1 What DevOps solves

- **"Works on my machine"** — containers ensure consistency.
- **Slow deployments** — CI/CD, blue-green, canary.
- **Manual operations** — automation, GitOps.
- **Inconsistency across environments** — Infrastructure as Code.
- **Scaling** — Kubernetes auto-scaling.
- **Service-to-service complexity** — service mesh.

### 5.2 What DevOps doesn't solve

- **Application architecture** — that's where system design helps.
- **Code quality** — that's where engineering practices help.
- **Business logic** — that's where DDD helps.

### 5.3 The cost of distributed systems

Kubernetes and service mesh add operational complexity. Smaller teams should consider managed services (EKS, GKE, AKS) or simpler abstractions (render.com, Fly.io).

## 6. Real-World Motivation

### 6.1 Google

The original Kubernetes author. GKE runs millions of containers. Borg (predecessor) inspired Kubernetes.

### 6.2 Netflix

Runs on AWS EKS. Microservices on K8s with extensive CI/CD.

### 6.3 Spotify

Migrated to K8s. Built their own operator (Backstage). Open-sourced many tools.

### 6.4 Airbnb

Runs K8s at scale. Built infrastructure-as-code (AirbnbClone).

### 6.5 Capital One

Banking on K8s. Heavy compliance requirements.

### 6.6 GitHub

GitHub Actions for CI. GitOps workflows for deployments.

```mermaid
graph LR
    subgraph "Production motivations"
        A[Consistency] --> Drivers
        B[Speed] --> Drivers
        C[Scale] --> Drivers
        D[Reliability] --> Drivers
    end
    Drivers --> DevOps["Containerization + Orchestration = cloud-native"]
```

---

## 7. Internal Working

### 7.1 The deployment pipeline

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git
    participant CI as CI/CD
    participant Reg as Registry
    participant Argo as ArgoCD
    participant K8s

    Dev->>Git: git push
    Git->>CI: trigger build
    CI->>CI: build, test
    CI->>Reg: docker push image:tag
    CI->>Git: update manifest (new tag)
    Git->>Argo: webhook / poll
    Argo->>K8s: kubectl apply
    K8s->>K8s: schedule pods
```

### 7.2 Subsystems that participate

| Subsystem | Responsibility |
|-----------|---------------|
| **Git** | Source of truth for code and manifests |
| **CI/CD** | Build, test, push image |
| **Registry** | Store container images |
| **GitOps** | Sync cluster to Git |
| **K8s control plane** | API server, scheduler, etcd |
| **K8s worker nodes** | kubelet, kube-proxy, container runtime |
| **Service mesh** | mTLS, traffic management, observability |
| **Observability** | Metrics, logs, traces |

### 7.3 K8s control plane

```mermaid
graph TB
    KubeAPI[API Server]
    Scheduler[Scheduler]
    ControllerManager[Controller Manager]
    Etcd[etcd]
    CloudController[Cloud Controller Manager]

    KubeAPI --> Etcd
    KubeAPI --> Scheduler
    KubeAPI --> ControllerManager
    CloudController --> KubeAPI
```

---

## 8. Deep Dive

This section is the heart of the document.

### 8.1 Docker

A Docker image is a **layered, immutable filesystem**. Layers are stacked:

```mermaid
graph TB
    Base[Base layer: Ubuntu 22.04]
    Pkg[apt install dependencies]
    Code[COPY application code]
    Cmd[CMD run app]

    Base --> Pkg
    Pkg --> Code
    Code --> Cmd
```

Each instruction in a Dockerfile creates a layer. Layers are cached; only changed layers are rebuilt.

**Dockerfile best practices:**

- **Multi-stage builds:** separate build and runtime.
- **Small base images:** `alpine` or `distroless`.
- **Layer caching:** order instructions from least-changed to most-changed.
- **`.dockerignore`:** exclude irrelevant files.
- **Non-root user:** `USER appuser`.
- **Specific tags:** avoid `latest` in production.
- **Combine RUN:** `RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*`.

### 8.2 Multi-stage builds

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

Multi-stage builds keep the runtime image small (no build tools).

### 8.3 Kubernetes architecture

**Control plane** (manages the cluster):

- **API Server (`kube-apiserver`):** the front-end; the only component that talks to etcd.
- **etcd:** distributed key-value store; stores all cluster state.
- **Scheduler (`kube-scheduler`):** assigns pods to nodes.
- **Controller Manager (`kube-controller-manager`):** runs controllers (Deployment, ReplicaSet, etc.).
- **Cloud Controller Manager:** cloud-provider-specific logic.

**Worker nodes** (run pods):

- **kubelet:** agent; ensures pods are running.
- **kube-proxy:** maintains network rules.
- **Container runtime:** containerd or CRI-O.

### 8.4 Pod lifecycle

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Running: scheduled
    Running --> Succeeded: exit 0
    Running --> Failed: exit non-0
    Running --> Unknown: lost contact
    Pending --> Waiting: image pull
    Waiting --> Pending: image pulled
    Running --> Terminating: deleted
    Terminating --> [*]
```

Phases:
- **Pending:** scheduled, not yet running.
- **Running:** at least one container is up.
- **Succeeded:** all containers exited 0.
- **Failed:** at least one container exited non-0.
- **Unknown:** state cannot be obtained.
- **Waiting:** container waiting (e.g., image pull).

### 8.5 Workload resources

| Resource | Use |
|----------|-----|
| **Pod** | Smallest unit; ephemeral |
| **Deployment** | Manages ReplicaSet of pods; rolling updates |
| **StatefulSet** | Stable identity (databases, queues) |
| **DaemonSet** | One pod per node (logging, monitoring) |
| **Job** | Run to completion |
| **CronJob** | Scheduled run |

### 8.6 Services

A Service provides a stable network endpoint for a set of pods:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP  # or NodePort, LoadBalancer
```

**Service types:**
- **ClusterIP:** internal only.
- **NodePort:** exposed on each node's port.
- **LoadBalancer:** cloud-provider load balancer.
- **ExternalName:** DNS-only.

### 8.7 Ingress

Routes HTTP/HTTPS from outside the cluster to services:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  ingressClassName: nginx
  rules:
    - host: example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
```

### 8.8 ConfigMaps and Secrets

- **ConfigMap:** non-sensitive configuration as key-value pairs.
- **Secret:** sensitive data (passwords, tokens); base64-encoded (not encrypted at rest unless etcd is encrypted).

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: postgres://db:5432
  LOG_LEVEL: info
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
stringData:
  DATABASE_PASSWORD: my-secret-password
```

### 8.9 Storage

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes: [ReadWriteOnce]
  resources:
    requests:
      storage: 10Gi
  storageClassName: gp3  # AWS EBS GP3
```

**Storage classes:** provisioner-backed (AWS EBS, GCE PD, Azure Disk, NFS, Ceph).

**StatefulSets** give stable network identity (per-pod DNS) for databases.

### 8.10 RBAC

**Role** (namespace-scoped) or **ClusterRole** (cluster-scoped) defines permissions. **RoleBinding** or **ClusterRoleBinding** grants them to subjects (users, groups, ServiceAccounts).

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: my-namespace
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: my-namespace
  name: read-pods
subjects:
  - kind: User
    name: jane
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### 8.11 Helm

Helm templates K8s manifests with values-driven substitution:

```yaml
# values.yaml
replicas: 3
image: myapp:1.0.0
```

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: {{ .Values.replicas }}
  template:
    spec:
      containers:
        - name: myapp
          image: {{ .Values.image }}
```

**Commands:**
- `helm install release chart` — install.
- `helm upgrade release chart` — upgrade.
- `helm rollback release revision` — rollback.
- `helm uninstall release` — remove.

**Charts:** packaged templates (`Chart.yaml` + `values.yaml` + `templates/`).
**OCI registry support:** Helm 3.8+ can store charts in OCI registries.

### 8.12 Istio service mesh

Istio deploys an **Envoy sidecar proxy** alongside each service. The control plane (istiod) configures proxies.

```mermaid
graph TB
    subgraph "Service A pod"
        AppA[App container]
        SidecarA[Istio sidecar (Envoy)]
    end
    subgraph "Service B pod"
        AppB[App container]
        SidecarB[Istio sidecar (Envoy)]
    end
    AppA <--> SidecarA
    SidecarA <--> SidecarB
    SidecarB <--> AppB
```

**Features:**
- **mTLS:** automatic between sidecars.
- **Traffic management:** VirtualService (routing), DestinationRule (load balancing).
- **Observability:** metrics, traces, logs (via sidecar).
- **Security:** AuthorizationPolicy.

**VirtualService example:**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: my-app
spec:
  hosts: [my-app]
  http:
    - match:
        - uri:
            prefix: /v1
      route:
        - destination:
            host: my-app
            subset: v1
      timeout: 30s
    - route:
        - destination:
            host: my-app
            subset: v2
```

### 8.13 Deployment strategies

| Strategy | Downtime | Rollback | Resource |
|----------|----------|----------|----------|
| **Recreate** | Yes | N/A | 1x |
| **Rolling** | No | Slow | 1.25x |
| **Blue-green** | No | Instant | 2x |
| **Canary** | No | Fast | 1.05-1.5x |
| **A/B** | No | Fast | 1.5x |
| **Shadow** | No | N/A | 1.05x |

**Canary in Istio:**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: my-app
spec:
  hosts: [my-app]
  http:
    - route:
        - destination:
            host: my-app
            subset: v1
          weight: 95
        - destination:
            host: my-app
            subset: v2
          weight: 5  # 5% to canary
```

### 8.14 GitOps (ArgoCD)

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/my-app-config
    targetRevision: main
    path: helm/my-app
  destination:
    server: https://kubernetes.default.svc
    namespace: my-app
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      CreateNamespace: true
```

**ArgoCD features:**
- Pulls Git, applies manifests, compares with cluster.
- Auto-sync; drift detection.
- Rollback via UI.
- Multi-cluster, multi-tenant.

**Sync waves:** order application creation.

### 8.15 Observability

The three pillars:

- **Metrics:** Prometheus scrapes `/metrics` endpoints.
- **Logs:** collected by Promtail, Fluentd, or Vector; stored in Loki, Elasticsearch.
- **Traces:** OpenTelemetry SDK; backend in Jaeger or Tempo.

**RED method:**
- **Rate** of requests.
- **Errors.**
- **Duration** (latency).

**USE method** (for resources):
- **Utilization** (CPU, memory).
- **Saturation** (queue depth).
- **Errors.**

### 8.16 Production patterns

- **Image signing:** Sigstore cosign.
- **Image scanning:** Trivy, Snyk.
- **Policy enforcement:** OPA / Kyverno.
- **Service mesh:** Istio for mTLS, observability.
- **GitOps:** ArgoCD for declarative deployments.
- **Progressive delivery:** Argo Rollouts, Flagger.

### 8.17 HPA and VPA

**Horizontal Pod Autoscaler (HPA):** scale pod count based on CPU, memory, custom metrics.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

**Vertical Pod Autoscaler (VPA):** adjusts pod resource requests/limits.

**Cluster Autoscaler:** adds/removes nodes.

### 8.18 Networking

```mermaid
graph TB
    Internet
    LB[Cloud Load Balancer]
    Ingress[Istio Ingress Gateway]
    S1[Service A]
    S2[Service B]
    Internet --> LB
    LB --> Ingress
    Ingress --> S1
    Ingress --> S2
```

- **Pod network:** flat (no NAT between pods in a cluster).
- **CNI:** Container Network Interface (Calico, Cilium, Flannel).
- **Service mesh:** Istio adds sidecar proxies.
- **NetworkPolicy:** firewall rules for pods.

### 8.19 Probes

Three types of probes:

- **livenessProbe:** is the container alive? If fails, restart container.
- **readinessProbe:** is the container ready to serve traffic? If fails, remove from Service.
- **startupProbe:** is the container started? Disables other probes until startup succeeds.

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  periodSeconds: 5
```

### 8.20 ConfigMap and Secret as volumes

```yaml
volumes:
  - name: config
    configMap:
      name: app-config
  - name: secrets
    secret:
      secretName: app-secret
containers:
  - volumeMounts:
      - name: config
        mountPath: /etc/config
      - name: secrets
        mountPath: /etc/secrets
```

---

## 9. Architecture

### 9.1 Production K8s cluster

```mermaid
graph TB
    subgraph "Control plane"
        API1[API Server 1]
        API2[API Server 2]
        API3[API Server 3]
        Etcd1[etcd 1]
        Etcd2[etcd 2]
        Etcd3[etcd 3]
    end
    subgraph "Worker nodes"
        N1[Node 1]
        N2[Node 2]
        N3[Node 3]
    end
    API1 --> Etcd1
    API2 --> Etcd2
    API3 --> Etcd3
    API1 -.-> N1
    API2 -.-> N2
    API3 -.-> N3
```

### 9.2 GitOps flow

```mermaid
graph TB
    Dev[Developer]
    Git[(Git repo)]
    CI[CI: build & test]
    Registry[(Container registry)]
    Argo[ArgoCD]
    K8s[Kubernetes cluster]
    Prometheus[Prometheus]
    Grafana[Grafana]

    Dev ->|git push| Git
    Git -> CI
    CI -> Registry
    CI -> Git
    Git ->|poll| Argo
    Registry -> K8s
    Argo ->|apply manifests| K8s
    K8s -> Prometheus
    Prometheus -> Grafana
```

### 9.3 Service mesh with Istio

```mermaid
graph TB
    subgraph "Pod"
        App[App container]
        Sidecar[Istio sidecar]
    end
    subgraph "Istio control plane (istiod)"
        Pilot[Pilot: config]
        Citadel[Citadel: mTLS]
        Galley[Galley: validation]
        Mixer[Telemeter: telemetry]
    end
    App <-->|mTLS| Sidecar
    Sidecar <-->|xDS| Pilot
    Citadel -.-> Sidecar
```

## 10. Performance

### 10.1 Image size

- **Alpine base:** ~5 MB.
- **Distroless:** ~2 MB.
- **Multi-stage:** strip build tools.
- **Layer caching:** order from least-changed to most-changed.

**Image size goal:** under 200 MB for typical web app.

### 10.2 Startup time

- **JVM:** Spring Boot 3 + CDS (~1s).
- **Native image:** GraalVM Native (50-100ms).
- **Container warmup:** reuse containers in dev.

### 10.3 Network

- **HTTP/2 in ingress:** reduced latency.
- **gRPC for service-to-service:** smaller payloads.
- **Connection pooling:** avoid connection churn.
- **Compression:** reduce bytes.

### 10.4 Resource limits

Set requests and limits for every container:

```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

- **requests:** scheduling basis; what the pod is guaranteed.
- **limits:** hard cap; OOMKill if exceeded.

### 10.5 HPA tuning

- Set appropriate metrics (CPU, memory, custom).
- Set min/max replicas.
- Use `behavior` to stabilize scaling:

```yaml
behavior:
  scaleDown:
    stabilizationWindowSeconds: 300
  scaleUp:
    stabilizationWindowSeconds: 60
```

## 11. Security

### 11.1 Container security

- **Image scanning:** Trivy, Snyk.
- **Distroless images:** no shell, no package manager.
- **Non-root user:** `USER appuser`.
- **Read-only root filesystem:** `readOnlyRootFilesystem: true`.
- **Drop capabilities:** `securityContext.capabilities.drop: [ALL]`.
- **No privileged containers:** `privileged: false` (default).

### 11.2 K8s security

- **RBAC:** least privilege.
- **Network Policies:** pod-to-pod firewall.
- **Pod Security Standards:** enforce baseline/restricted.
- **Secrets in etcd:** encryption at rest.
- **Image pull secrets:** private registry auth.
- **Service Account tokens:** short-lived.

### 11.3 Supply chain security

- **SLSA framework:** supply chain levels.
- **Sigstore cosign:** image signing and verification.
- **SBOM:** software bill of materials.
- **Image attestation:** provenance.

### 11.4 Service mesh security

- **mTLS:** automatic between sidecars.
- **AuthorizationPolicy:** access control.
- **JWT validation:** at the gateway.

### 11.5 Secure configuration checklist

- [ ] Images scanned for vulnerabilities.
- [ ] Images signed (cosign).
- [ ] Containers run as non-root.
- [ ] RBAC least privilege.
- [ ] Network Policies applied.
- [ ] Pod Security Standards "restricted" enforced.
- [ ] Secrets externalized (Vault).
- [ ] mTLS via service mesh.
- [ ] No privileged containers.
- [ ] Read-only root filesystem where possible.

## 12. Production Engineering

### 12.1 Multi-cluster

- **Cluster federation:** K8s Federation (v2) for cross-cluster.
- **GitOps per cluster:** ArgoCD Applications per cluster.
- **Service mesh federation:** Istio multi-primary.
- **Disaster recovery:** backup etcd, restore.

### 12.2 Observability

- **Metrics:** Prometheus + Grafana.
- **Logs:** Promtail + Loki or Fluentd + Elasticsearch.
- **Traces:** OpenTelemetry + Jaeger or Tempo.
- **Alerts:** Alertmanager + PagerDuty / Slack.

### 12.3 Capacity planning

- **Resource requests:** HPA tuning.
- **Node count:** based on requests sum + headroom.
- **Storage:** based on retention and growth.
- **Network:** based on bandwidth estimates.

### 12.4 CI/CD

- **GitHub Actions:** build, test, push image.
- **GitLab CI:** same with .gitlab-ci.yml.
- **BuildKit:** efficient Docker builds.
- **Argo Workflows:** Kubernetes-native workflows.
- **Argo CD:** GitOps deployments.
- **Argo Rollouts:** progressive delivery.

### 12.5 Disaster recovery

- **Backup etcd:** regular snapshots to S3.
- **Backup persistent volumes:** Velero.
- **Multi-region:** cluster federation.
- **RTO / RPO:** define targets; test recovery.

### 12.6 Cost optimization

- **Right-size nodes:** don't over-provision.
- **Spot instances:** for stateless workloads.
- **Cluster autoscaler:** add nodes on demand.
- **Bin-packing:** efficient scheduling.
- **Spot / preemptible:** for non-critical workloads.

## 13. Production Case Studies

### 13.1 Google

The original Kubernetes author. Runs GKE for many internal services. Pioneered Borg (predecessor to K8s).

### 13.2 Netflix

Migrated from monolithic Java to microservices on AWS EKS. Heavily uses Istio for service mesh, mTLS, traffic management.

### 13.3 Spotify

Migrated to K8s. Built Backstage (developer portal). Open-sourced many tools (Kubeflow, Argo).

### 13.4 Airbnb

Migrated to K8s for internal services. Built Airflow (workflow) and other tools.

### 13.5 Capital One

Runs banking on K8s. Heavy compliance. Uses Istio for mTLS.

### 13.6 GitHub

GitHub Actions for CI. ArgoCD for K8s deployments. Container images signed with cosign.

## 14. Code Examples

### 14.1 Basic: Dockerfile (multi-stage)

```dockerfile
# see 03-multi-stage-builds/
```

### 14.2 Basic: K8s manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: myorg/my-app:1.0.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
```

### 14.3 Basic: Helm chart

```yaml
# see 13-helm-charts/
```

### 14.4 Basic: Istio VirtualService

```yaml
# see 14-istio-service-mesh/
```

### 14.5 Bad, anti-pattern, refactored, secure examples

**Bad: running as root**

```dockerfile
FROM node:20-alpine
# No USER directive; runs as root
CMD ["node", "app.js"]
```

**Anti-pattern: missing resource limits**

```yaml
# Pod without resources
spec:
  containers:
    - name: app
      image: myapp:1.0.0
      # No resources specified
```

**Refactored: explicit limits + non-root**

```dockerfile
FROM node:20-alpine
USER node
CMD ["node", "app.js"]
```

```yaml
spec:
  containers:
    - name: app
      image: myapp:1.0.0
      resources:
        requests: { cpu: 100m, memory: 128Mi }
        limits: { cpu: 500m, memory: 512Mi }
      securityContext:
        runAsNonRoot: true
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
```

**Secure: image scanning + signing**

```bash
trivy image myapp:1.0.0
cosign sign --key cosign.key myapp:1.0.0
cosign verify --key cosign.pub myapp:1.0.0
```

## 15. Common Mistakes

### 15.1 Beginner mistakes

- **Running as root:** security risk.
- **No resource limits:** noisy neighbor; OOM.
- **No health checks:** Kubernetes can't detect failure.
- **Latest tag:** non-reproducible builds.
- **No .dockerignore:** large images, cache misses.

### 15.2 Intermediate mistakes

- **No probes:** failures go undetected.
- **No horizontal scaling:** single-pod single point.
- **Sidecar sprawl:** too many sidecars (each consumes resources).
- **Manual `kubectl apply`:** no GitOps; no audit trail.
- **No resource requests:** scheduler makes poor decisions.

### 15.3 Senior mistakes

- **Tightly coupled deployments:** microservices that deploy together.
- **Shared database between services:** defeats the point.
- **No rollback strategy:** deployments can't be undone.
- **No chaos testing:** discover problems at launch.

### 15.4 Production mistakes

- **Single cluster, single region:** no HA.
- **No backup of etcd:** cluster state loss = disaster.
- **No monitoring:** discover problems at customer impact.
- **No alert escalation:** pages go to /dev/null.
- **No runbook:** on-call doesn't know what to do.

### 15.5 Migration mistakes

- **Big-bang migration:** all at once; high risk.
- **Lift-and-shift VMs to K8s:** missing the point of containers.
- **No operator strategy:** managing complex apps via kubectl.

### 15.6 Configuration mistakes

- **CPU limits without ` Guaranteed`:** throttling.
- **Memory limits too low:** OOMKill.
- **No `startupProbe`:** slow-starting apps marked unhealthy.
- **Wrong `imagePullPolicy`:** `Always` for prod, `IfNotPresent` for dev.

### 15.7 Security mistakes

- **Privileged containers:** full host access.
- **Root user:** security risk.
- **Host network:** bypasses network policies.
- **No read-only root FS:** mutable attack surface.

### 15.8 Performance mistakes

- **Large images:** slow pulls.
- **Many layers:** slow builds.
- **No resource limits:** noisy neighbor.
- **HPA too aggressive:** thrash.

### 15.9 Debugging mistakes

- **Restarting without logs:** lose state.
- **kubectl logs only:** miss metrics.
- **No distributed tracing:** can't correlate.

### 15.10 Deployment mistakes

- **No canary:** full rollout.
- **No health checks:** K8s doesn't know status.
- **No graceful shutdown:** drop in-flight requests.

## 16. Debugging

### 16.1 kubectl commands

```bash
# Get resources
kubectl get pods
kubectl describe pod <name>
kubectl logs <pod>
kubectl exec -it <pod> -- bash

# Debug
kubectl debug -it <pod> --image=busybox
kubectl port-forward <pod> 8080:80
kubectl top pods
kubectl get events --sort-by=.lastTimestamp
```

### 16.2 Ephemeral containers

```bash
# Add ephemeral container for debugging without restart
kubectl debug -it <pod> --image=busybox --target=<container>
```

### 16.3 kubectl debug

```bash
# Copy pod and modify for debugging
kubectl debug <pod> --copy-to=<new-pod> --image=<debug-image>
```

### 16.4 Common debugging scenarios

- **Pod stuck Pending:** check events, scheduler decisions.
- **CrashLoopBackOff:** check logs, last exit code.
- **OOMKilled:** increase memory limits.
- **ImagePullBackOff:** check image name, registry auth.
- **Evicted:** check node disk/memory pressure.

### 16.5 Production troubleshooting checklist

- [ ] Capture pod status, events, logs.
- [ ] Check resource usage (CPU, memory).
- [ ] Check recent deployments.
- [ ] Check service health.
- [ ] Check upstream/downstream service.
- [ ] Check etcd health.
- [ ] Engage on-call rotation.

## 17. Monitoring & Observability

### 17.1 Three pillars

- **Metrics:** Prometheus scrapes `/metrics`.
- **Logs:** Promtail → Loki.
- **Traces:** OpenTelemetry → Jaeger/Tempo.

### 17.2 K8s-specific metrics

- `kube_pod_info` — pod metadata.
- `kube_pod_status_phase` — pod phase.
- `kube_deployment_status_replicas` — replica counts.
- `kube_node_info` — node metadata.
- `container_cpu_usage_seconds_total` — container CPU.
- `container_memory_usage_bytes` — container memory.

### 17.3 Istio metrics

- `istio_requests_total` — request count.
- `istio_request_duration_milliseconds` — latency.
- `istio_request_bytes` — request size.
- `tcp_bytes_sent` / `tcp_bytes_received` — network.

### 17.4 Prometheus + Grafana

```yaml
# prometheus.yml
scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
```

### 17.5 Alerts

- `KubePodCrashLooping` — pod crashes repeatedly.
- `KubePodNotReady` — pod not ready for >15 min.
- `KubeDeploymentReplicasMismatch` — replica count off.
- `KubeContainerWaiting` — container waiting >1 hr.

## 18. Best Practices

### 18.1 Industry best practices

- **Immutable images:** same image for dev/test/prod.
- **Declarative deployments:** GitOps; no manual `kubectl apply`.
- **12-factor app:** stateless processes, config in env, log streams, etc.
- **Liveness and readiness probes:** every container.
- **Resource requests and limits:** every container.
- **Run as non-root:** every container.
- **Read-only root FS:** where possible.
- **No `latest` tag:** use specific versions.
- **Multi-stage builds:** small runtime images.
- **Image scanning:** Trivy in CI.
- **Image signing:** cosign.
- **Service mesh:** mTLS, observability.
- **GitOps:** ArgoCD for declarative deployments.
- **Observability:** metrics, logs, traces.
- **Chaos engineering:** test failure modes.
- **Runbooks:** for on-call.
- **DR drills:** test recovery.

### 18.2 Enterprise practices

- **Multi-cluster:** for HA and region.
- **Policy enforcement:** OPA / Kyverno.
- **Image registry:** private registry (Harbor, ECR).
- **Vulnerability scanning:** in CI.
- **SBOM:** for compliance.
- **Audit logging:** for compliance.

### 18.3 Clean code

- **Single responsibility:** one container per service.
- **Stateless:** no in-container state.
- **Idempotent:** restart-safe.
- **Observable:** expose metrics, logs, traces.

### 18.4 Reliability

- **Multi-AZ deployment.**
- **PodDisruptionBudget.**
- **Anti-affinity rules.**
- **HPA + Cluster Autoscaler.**
- **Graceful shutdown.**

### 18.5 Security

- **Image scanning and signing.**
- **Non-root users.**
- **Pod Security Standards "restricted".**
- **Network Policies.**
- **RBAC least privilege.**
- **mTLS via service mesh.**

### 18.6 Performance

- **Right-size CPU/memory.**
- **HPA based on real metrics.**
- **Connection pooling.**
- **CDN for static.**
- **Caching layers.**

### 18.7 Testing

- **Unit tests.**
- **Integration tests** (testcontainers).
- **E2E tests** (Kind, GKE test cluster).
- **Load tests** (k6, Gatling).
- **Chaos tests** (Litmus, Gremlin).

### 18.8 Deployment

- **GitOps** (ArgoCD).
- **Canary** for safe rollouts.
- **Feature flags** for launches.
- **Rollback** tested.

## 19. Anti-Patterns

### 19.1 Pod as VM

Treating pods as long-lived virtual machines. Defeats the purpose.

**Fix:** Stateless services; graceful shutdown; restarts.

### 19.2 Sidecar sprawl

Too many sidecars per pod (e.g., 10+ sidecars). Each consumes resources.

**Fix:** Consolidate sidecars; use Istio ambient mode (no sidecars).

### 19.3 Shared volumes

Multiple pods sharing a volume. Race conditions; data corruption.

**Fix:** Per-pod volumes; use StatefulSets for stateful apps.

### 19.4 Manual `kubectl apply`

No GitOps; no audit trail; no rollback.

**Fix:** GitOps (ArgoCD); all changes via Git.

### 19.5 Running as root

Container runs as UID 0. Security risk.

**Fix:** `USER 1000` in Dockerfile; `runAsNonRoot: true` in securityContext.

### 19.6 Liveness probe pointing to wrong endpoint

Liveness probe pointing to a slow endpoint causes restarts.

**Fix:** Liveness probe to a fast `/healthz`; readiness probe to a thorough check.

### 19.7 `latest` tag in production

Non-reproducible builds. "Works today" ≠ "works tomorrow".

**Fix:** Use specific tags; pin digests in production.

## 20. Edge Cases

### 20.1 Clock skew

Nodes have different times. Affects TLS, log correlation.

**Mitigation:** NTP; monotonic clocks; logical clocks.

### 20.2 OOMKilled

Container exceeded memory limit. Kernel kills it.

**Mitigation:** Set higher memory limit; fix memory leak; use JVM heap limits.

### 20.3 Evicted

Node under resource pressure. Pods evicted.

**Mitigation:** Set PodDisruptionBudget; ensure scheduling headroom.

### 20.4 ImagePullBackOff

Image not found or registry auth failed.

**Mitigation:** Check image name, image pull secrets, registry status.

### 20.5 etcd loss

Cluster state lost if etcd fails. Disaster.

**Mitigation:** etcd backups to S3; multi-node etcd cluster; tested restore.

### 20.6 Network partition

Some pods can't reach others. Cascading failures.

**Mitigation:** Network policies; circuit breakers; retries with backoff.

### 20.7 DNS resolution failure

Service discovery fails. Cascade.

**Mitigation:** CoreDNS HA; nodelocal DNS cache; retry.

---

## 21. Comparisons

### 21.1 Docker vs Podman

| Dimension | Docker | Podman |
|-----------|--------|--------|
| Architecture | Daemon (dockerd) | Daemonless |
| Root | Required by default | Rootless by default |
| Systemd integration | Strong | Strong |
| Compose | docker-compose | podman-compose |
| Compatibility | OCI | OCI + Docker |
| Best for | Default in industry | Rootless, systemd-friendly |

### 21.2 Kubernetes vs Nomad

| Dimension | Kubernetes | Nomad |
|-----------|-----------|-------|
| Architecture | Declarative | Declarative |
| Complexity | High | Low |
| Ecosystem | Massive | Smaller |
| Storage | Built-in CSI | External |
| Service mesh | Istio, Linkerd | Consul Connect |
| Best for | Cloud-native, complex | Simpler workloads |

### 21.3 Helm vs Kustomize

| Dimension | Helm | Kustomize |
|-----------|------|-----------|
| Approach | Templates with substitution | Patches |
| Tiller | Removed (Helm 3) | None |
| Learning curve | Medium | Medium |
| Logic | Full programming language | Limited |
| Best for | Templated multi-env | Simple env overlays |

### 21.4 Istio vs Linkerd

| Dimension | Istio | Linkerd |
|-----------|-------|---------|
| Data plane | Envoy (C++) | Linkerd2-proxy (Rust) |
| Maturity | Very mature | Mature |
| Performance | Good | Excellent (lower latency) |
| Resource use | Higher | Lower |
| Features | Comprehensive | Focused |
| Best for | Full-featured mesh | Performance-focused mesh |

### 21.5 GitOps tools

| Tool | Strength |
|------|----------|
| **ArgoCD** | Most popular; K8s-native UI |
| **Flux** | Lightweight; GitOps Toolkit |
| **Jenkins X** | CI + CD combined |
| **Spinnaker** | Multi-cloud; mature |
| **Atlantis** | Terraform-focused |

### 21.6 CI/CD tools

| Tool | Strength |
|------|----------|
| **GitHub Actions** | Tight GitHub integration |
| **GitLab CI** | Self-hosted option |
| **CircleCI** | Fast builds |
| **Jenkins** | Most mature |
| **Buildkite** | Hybrid model |
| **Drone** | Container-native |

### 21.7 Container registries

| Registry | Type | Notes |
|----------|------|-------|
| **Docker Hub** | Public + private | Default |
| **GitHub Container Registry** | Public + private | Tight GH integration |
| **AWS ECR** | Private | AWS-native |
| **GCP Artifact Registry** | Private | GCP-native |
| **Azure Container Registry** | Private | Azure-native |
| **Harbor** | Self-hosted | Open source, CNCF graduated |
| **Quay** | Self-hosted + public | Red Hat, security-focused |

### 21.8 Decision matrix

| Workload | Recommended |
|----------|------------|
| Standard web service | Docker + K8s + Helm |
| Multi-cluster | K8s + ArgoCD |
| Service-to-service mTLS | Istio |
| Cost-sensitive | Spot instances + autoscaling |
| Legacy VMs | Migrate to containers (lift-and-shift, then refactor) |
| Compliance-heavy | Private registry, signed images, policy enforcement |

### 21.9 Migration paths

- **VM → Containers:** lift-and-shift via Docker, then refactor.
- **Compose → K8s:** kompose tool for conversion.
- **Manual → GitOps:** migrate to ArgoCD; declare in Git.
- **K8s 1.x → 1.30:** version-upgrade via kubeadm.

---

## 22. Interview Preparation

### 22.1 Beginner (0-1 years)

**Q1: What is Docker?**
**A:** A container runtime that packages applications with their dependencies into standardized units (images) that run consistently across environments.

**Q2: What is Kubernetes?**
**A:** An open-source container orchestrator that automates deployment, scaling, and management of containerized applications.

**Q3: What is a container?**
**A:** A standardized, portable unit of software that includes the application and its dependencies, isolated from the host.

**Q4: What is a Pod?**
**A:** The smallest deployable unit in Kubernetes; one or more containers that share network and storage.

**Q5: What is a Deployment?**
**A:** A K8s resource that manages a ReplicaSet of pods with rolling updates.

### 22.2 Junior (1-2 years)

**Q6: What is the difference between Docker and a VM?**
**A:** VMs virtualize hardware; each has its own kernel. Containers virtualize the OS; share the host kernel. Containers are smaller, faster to start, and more portable.

**Q7: What is a multi-stage build?**
**A:** A Dockerfile pattern with multiple `FROM` statements. The first stages build the app; later stages copy the artifacts into a smaller runtime image.

**Q8: What is a Service in K8s?**
**A:** A stable network endpoint for a set of pods. Provides load balancing and service discovery within the cluster.

**Q9: What is the difference between a Deployment and a StatefulSet?**
**A:** Deployment: stateless pods with random names. StatefulSet: stateful pods with stable network identity and persistent storage.

**Q10: What is a ConfigMap?**
**A:** A K8s resource for non-sensitive configuration data, accessible as files or env vars by pods.

### 22.3 Mid (2-4 years)

**Q11: How do you deploy a service to K8s?**
**A:** (1) Build Docker image. (2) Push to registry. (3) Write K8s manifest (Deployment, Service). (4) Apply via `kubectl apply` or ArgoCD. (5) Verify with `kubectl get`. (6) Monitor.

**Q12: What is a liveness probe vs readiness probe?**
**A:** Liveness: is the container alive? If fails, restart. Readiness: is the container ready to serve traffic? If fails, remove from Service endpoints.

**Q13: How do you scale a K8s application?**
**A:** (1) HPA based on CPU/memory/custom metrics. (2) Set min/max replicas. (3) Use `behavior` to stabilize. (4) Test load.

**Q14: What is a Helm chart?**
**A:** A package of pre-configured K8s resources that can be parameterized via values.yaml. Templates allow reuse across environments.

**Q15: How do you implement a canary deployment in K8s?**
**A:** (1) Deploy new version alongside old. (2) Use Istio VirtualService with traffic weights (e.g., 95% old, 5% new). (3) Monitor metrics. (4) Gradually shift weight. (5) Cut over fully.

**Q16: What is GitOps?**
**A:** A deployment pattern where Git is the source of truth for both application code and infrastructure config. Tools like ArgoCD sync the cluster to match Git.

### 22.4 Senior (4-6 years)

**Q17: How do you operate a production K8s cluster?**
**A:** (1) Multi-AZ, multi-node control plane. (2) etcd backups to S3. (3) ArgoCD for declarative deployments. (4) Prometheus + Grafana + Alertmanager. (5) Jaeger for tracing. (6) Chaos engineering. (7) DR drills.

**Q18: How do you debug a K8s deployment?**
**A:** (1) `kubectl get pods` to check status. (2) `kubectl describe pod` for events. (3) `kubectl logs` for container logs. (4) `kubectl exec` to enter. (5) `kubectl debug` for ephemeral containers. (6) Distributed tracing.

**Q19: How do you manage secrets in K8s?**
**A:** (1) External secrets manager (Vault, AWS Secrets Manager). (2) Sync to K8s Secrets via operator. (3) Mount as env vars or files. (4) Never commit to Git. (5) Rotate regularly.

**Q20: How do you implement zero-downtime deployments?**
**A:** (1) Rolling update (default in Deployment). (2) Health checks (readiness probe). (3) Pre-stop hook for graceful shutdown. (4) PodDisruptionBudget. (5) Sufficient replicas (3+ for zero-downtime).

**Q21: How do you handle multi-tenancy in K8s?**
**A:** (1) Namespace per tenant. (2) RBAC per namespace. (3) ResourceQuotas per namespace. (4) NetworkPolicies for isolation. (5) Separate ingress per tenant.

### 22.5 Lead (6-8 years)

**Q22: How do you migrate from VMs to K8s?**
**A:** (1) Inventory apps. (2) Containerize (start with stateless). (3) Deploy to dev K8s. (4) Add observability. (5) Test canary. (6) Migrate production (one app at a time). (7) Decommission VMs.

**Q23: How do you handle stateful workloads in K8s?**
**A:** (1) StatefulSets for stable identity. (2) PersistentVolumes for storage. (3) Headless services for stable DNS. (4) Operators for stateful apps (Postgres operator, Redis operator). (5) Backups.

**Q24: How do you design a multi-cluster K8s setup?**
**A:** (1) Per-region clusters for HA. (2) Cluster API for lifecycle. (3) ArgoCD for GitOps. (4) Istio multi-primary for service mesh. (5) DNS-based service discovery across clusters. (6) Data replication at the app layer.

### 22.6 Staff (8-12 years)

**Q25: How do you evaluate GitOps vs traditional CI/CD?**
**A:** GitOps wins for declarative infra and K8s; ensures Git is source of truth. Traditional CI/CD wins for build pipelines. Most teams use both: CI builds images, GitOps deploys.

**Q26: How do you operate K8s at hyperscale?**
**A:** (1) Multi-cluster federation. (2) Cluster API for lifecycle. (3) Operators for app lifecycle. (4) Hierarchical namespaces. (5) Custom controllers for domain-specific concerns. (6) Massive automation.

### 22.7 Principal / Architect

**Q27: When would you choose NOT to use K8s?**
**A:** (1) Single application, small team. (2) Strict latency requirements (no sidecar overhead). (3) Compliance forbids containers. (4) Existing mainframe investment. (5) Pure serverless workloads.

**Q28: How do you evolve a K8s architecture over years?**
**A:** (1) Start simple. (2) Add observability. (3) Add automation (ArgoCD). (4) Add service mesh (Istio) when needed. (5) Add multi-cluster when needed. (6) Avoid premature complexity.

### 22.8 Scenario-based questions

**Scenario 1:** A pod is in CrashLoopBackOff. How do you debug?
**Answer:** (1) `kubectl describe pod` for events. (2) `kubectl logs <pod> --previous` for previous container logs. (3) Check liveness probe — if pointing to slow endpoint, fix. (4) Check OOM — increase memory. (5) Check image — verify image pull. (6) Common: missing env var, config, or DB.

**Scenario 2:** Traffic spike. Pods not scaling fast enough.
**Answer:** (1) Check HPA — is it enabled? (2) Check metrics — is CPU at threshold? (3) Check min replicas. (4) Check Cluster Autoscaler — are nodes available? (5) Consider pre-scheduled surge capacity.

**Scenario 3:** Deploy rolled out. Users report errors.
**Answer:** (1) Check error rate. (2) Compare new vs old version. (3) Check logs for differences. (4) Roll back via ArgoCD or `kubectl rollout undo`. (5) Investigate root cause. (6) Re-deploy fix.

**Scenario 4:** Service A can't reach Service B. Network issue?
**Answer:** (1) `kubectl get pods -A` — are both running? (2) `kubectl get svc` — services exist? (3) `kubectl get endpoints` — pods bound? (4) `kubectl exec` — DNS resolves? (5) NetworkPolicy blocking? (6) Service mesh (Istio) blocking?

---

## 23. References

### 23.1 Official documentation

- **Docker:** <https://docs.docker.com/>
- **Kubernetes:** <https://kubernetes.io/docs/>
- **Helm:** <https://helm.sh/docs/>
- **Istio:** <https://istio.io/latest/docs/>
- **ArgoCD:** <https://argo-cd.readthedocs.io/>
- **Prometheus:** <https://prometheus.io/docs/>
- **CNCF:** <https://www.cncf.io/>

### 23.2 Specifications

- **OCI Image Spec:** <https://github.com/opencontainers/image-spec>
- **OCI Runtime Spec:** <https://github.com/opencontainers/runtime-spec>
- **OCI Distribution Spec:** <https://github.com/opencontainers/distribution-spec>
- **CNI (Container Network Interface):** <https://github.com/containernetworking/cni>
- **CSI (Container Storage Interface):** <https://github.com/container-storage-interface/spec>
- **CRI (Container Runtime Interface):** <https://kubernetes.io/docs/concepts/architecture/cri/>

### 23.3 Foundational papers

- **"Large-scale cluster management at Google with Borg"** — Abhishek Verma et al. (2015). The Borg paper that inspired Kubernetes.
- **"Resilient OS-level service deployment in highly volatile clouds"** — University of Chicago (HotCloud 2010).
- **"Taming the Kubernetes Beast"** — Brendan Burns (SIGMOD 2019).

### 23.4 Books

- *Kubernetes Patterns* — Bilgin Ibryam, Roland Huß (O'Reilly). Free online.
- *Kubernetes Up and Running* — Brendan Burns, Joe Beda, Kelsey Hightower (O'Reilly).
- *Cloud Native DevOps with Kubernetes* — John Arundel, Justin Domingus (O'Reilly). Free online.
- *Production Kubernetes* — Josh Rosso et al. (O'Reilly).
- *Docker Deep Dive* — Nigel Poulton (Pluralsight).
- *Istio in Action* — Christian Posta, Rinor Maloku (Manning).
- *GitOps and Kubernetes* — Billy Yuen, Jesse Suen, Alex Mattson, Ryan Kehoe (Manning).
- *Learning Helm* — Andrew Block, Austin Dewey (O'Reilly).

### 23.5 Engineering blogs

- **CNCF Blog:** <https://www.cncf.io/blog/>
- **Kubernetes Blog:** <https://kubernetes.io/blog/>
- **Docker Blog:** <https://www.docker.com/blog/>
- **Netflix Tech Blog:** <https://netflixtechblog.com/>
- **Spotify Engineering:** <https://engineering.atspotify.com/>
- **GitHub Engineering:** <https://github.blog/engineering/>
- **AWS Containers:** <https://aws.amazon.com/blogs/containers/>

### 23.6 Tools

- **Docker Desktop:** <https://www.docker.com/products/docker-desktop/>
- **Rancher Desktop:** <https://rancherdesktop.io/>
- **Kind:** local K8s for testing.
- **Minikube:** local K8s.
- **Lens:** K8s IDE.
- **k9s:** terminal UI.
- **Skaffold:** iterative dev.
- **Tilt:** dev workflow.
- **ArgoCD:** GitOps.
- **Flux:** GitOps.
- **Argo Rollouts:** progressive delivery.
- **Flagger:** progressive delivery.
- **Trivy:** vulnerability scanning.
- **Snyk:** vulnerability scanning.
- **cosign:** image signing.
- **Kyverno:** policy enforcement.
- **OPA:** policy enforcement.
- **Cilium:** eBPF networking.
- **Linkerd:** alternative service mesh.

### 23.7 Conferences

- **KubeCon + CloudNativeCon:** <https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/>
- **DockerCon:** <https://www.docker.com/dockercon/>
- **IstioCon.**
- **GitOpsCon.**

### 23.8 Free online resources

- **Kubernetes the Hard Way:** <https://github.com/kelseyhightower/kubernetes-the-hard-way>
- **Learn Kubernetes Basics:** <https://kubernetes.io/docs/tutorials/kubernetes-basics/>
- **Docker Getting Started:** <https://docs.docker.com/get-started/>
- **Helm Quickstart:** <https://helm.sh/docs/intro/quickstart/>
- **Istio Getting Started:** <https://istio.io/latest/docs/setup/getting-started/>
- **ArgoCD Getting Started:** <https://argo-cd.readthedocs.io/en/stable/getting_started/>

---

## Appendix A: Dockerfile Best Practices Cheat Sheet

| Rule | Example |
|------|---------|
| Pin base image | `FROM node:20.11-alpine` |
| Use multi-stage | `FROM node:20-alpine AS build` then `FROM nginx:alpine` |
| Copy deps first | `COPY package*.json .` then `RUN npm ci` then `COPY . .` |
| Run as non-root | `RUN adduser -D appuser && USER appuser` |
| Set workdir | `WORKDIR /app` |
| Combine RUN | `RUN apt-get update && apt-get install -y` |
| Clean up | `rm -rf /var/lib/apt/lists/*` |
| Use `.dockerignore` | exclude `node_modules`, `.git`, `*.md` |
| Expose ports | `EXPOSE 8080` |
| Healthcheck | `HEALTHCHECK CMD curl -f http://localhost:8080/healthz` |
| Specific tags | `node:20.11-alpine` not `latest` |
| Pin digests (prod) | `node:20.11-alpine@sha256:...` |

## Appendix B: kubectl Cheat Sheet

```bash
# Cluster
kubectl cluster-info
kubectl get nodes
kubectl top nodes

# Workloads
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get ingress
kubectl get all -A

# Describe
kubectl describe pod <name>
kubectl describe node <name>

# Logs
kubectl logs <pod>
kubectl logs -f <pod>
kubectl logs <pod> --previous
kubectl logs -l app=my-app --tail=100

# Execute
kubectl exec -it <pod> -- bash
kubectl exec -it <pod> -- env

# Apply / Delete
kubectl apply -f manifest.yaml
kubectl delete -f manifest.yaml
kubectl delete pod <name>

# Scale
kubectl scale deployment my-app --replicas=5

# Rollout
kubectl rollout status deployment my-app
kubectl rollout undo deployment my-app
kubectl rollout history deployment my-app

# Debug
kubectl debug -it <pod> --image=busybox
kubectl port-forward <pod> 8080:80

# Resources
kubectl get pods -A
kubectl top pods
kubectl describe resource <name>
```

## Appendix C: Glossary

| Term | Definition |
|------|-----------|
| **AC** | Admission Controller |
| **AOT** | Ahead-of-Time (compilation) |
| **CRD** | Custom Resource Definition |
| **CRI** | Container Runtime Interface |
| **CSI** | Container Storage Interface |
| **CNI** | Container Network Interface |
| **CNCF** | Cloud Native Computing Foundation |
| **CVE** | Common Vulnerabilities and Exposures |
| **DRA** | Dynamic Resource Allocation (K8s) |
| **EKS** | Elastic Kubernetes Service (AWS) |
| **GKE** | Google Kubernetes Engine |
| **HPA** | Horizontal Pod Autoscaler |
| **K8s** | Kubernetes |
| **OCI** | Open Container Initiative |
| **OOM** | Out of Memory |
| **OPA** | Open Policy Agent |
| **OTel** | OpenTelemetry |
| **PVC** | Persistent Volume Claim |
| **PV** | Persistent Volume |
| **RBAC** | Role-Based Access Control |
| **SA** | Service Account |
| **SBOM** | Software Bill of Materials |
| **SLSA** | Supply chain Levels for Software Artifacts |
| **SPIFFE** | Secure Production Identity Framework for Everyone |
| **VPA** | Vertical Pod Autoscaler |

---

*End of document. Total: 23 sections + 3 appendices.*

*Companion resources:*
- *Source: [`devops.md`](./devops.md)*
- *Docker: [`references/docker-docs.md`](./references/docker-docs.md)*
- *Kubernetes: [`references/kubernetes-docs.md`](./references/kubernetes-docs.md)*
- *Helm: [`references/helm-docs.md`](./references/helm-docs.md)*
- *Istio: [`references/istio-docs.md`](./references/istio-docs.md)*
- *Code examples: [`examples/`](./examples/) (16 DevOps examples)*