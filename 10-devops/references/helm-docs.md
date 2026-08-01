# Helm Documentation Reference

The authoritative source for Helm is the official documentation. This file catalogs the Helm documentation pages referenced in the DevOps document.

## Primary documentation

- **Helm Documentation:** <https://helm.sh/docs/>
- **Helm GitHub:** <https://github.com/helm/helm>
- **Artifact Hub (charts):** <https://artifacthub.io/>
- **Helm Hub (legacy):** <https://hub.helm.sh/>

## Topics referenced in the document

| Topic | URL |
|-------|-----|
| Introduction | <https://helm.sh/docs/intro/> |
| Quick start | <https://helm.sh/docs/intro/quickstart/> |
| Installing Helm | <https://helm.sh/docs/intro/install/> |
| Charts | <https://helm.sh/docs/topics/charts/> |
| Chart.yaml | <https://helm.sh/docs/topics/charts/#the-chart-yaml-file> |
| Values | <https://helm.sh/docs/topics/charts/#values> |
| Templates | <https://helm.sh/docs/chart_template_guide/> |
| Built-in objects | <https://helm.sh/docs/chart_template_guide/builtin_objects/> |
| Functions and pipelines | <https://helm.sh/docs/chart_template_guide/functions_and_pipelines/> |
| Hooks | <https://helm.sh/docs/topics/charts_hooks/> |
| Chart dependencies | <https://helm.sh/docs/topics/charts/#managing-dependencies-with-the-dependencies-field> |
| Helm install | <https://helm.sh/docs/helm/helm_install/> |
| Helm upgrade | <https://helm.sh/docs/helm/helm_upgrade/> |
| Helm rollback | <https://helm.sh/docs/helm/helm_rollback/> |
| Helm uninstall | <https://helm.sh/docs/helm/helm_uninstall/> |
| Helm registry login | <https://helm.sh/docs/helm/helm_registry_login/> |
| Helm repo | <https://helm.sh/docs/helm/helm_repo/> |
| Helm push | <https://helm.sh/docs/helm/helm_push/> |
| Helm template | <https://helm.sh/docs/helm/helm_template/> |
| Helm lint | <https://helm.sh/docs/helm/helm_lint/> |
| Helm show | <https://helm.sh/docs/helm/helm_show/> |
| Plugins | <https://helm.sh/docs/topics/plugins/> |
| Provenance and signing | <https://helm.sh/docs/topics/provenance/> |

## Chart structure

```
mychart/
├── Chart.yaml          # chart metadata
├── values.yaml         # default values
├── charts/             # sub-charts
├── templates/          # template files
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── _helpers.tpl
├── files/              # static files
├── tests/              # helm-unittest tests
├── .helmignore         # ignore patterns
└── README.md
```

## Chart.yaml

```yaml
apiVersion: v2
name: mychart
description: A Helm chart for my app
type: application
version: 1.0.0
appVersion: "1.0.0"
home: https://example.com
sources:
  - https://github.com/example/mychart
maintainers:
  - name: Maintainer
    email: maintainer@example.com
keywords:
  - app
dependencies:
  - name: postgresql
    version: "12.1.0"
    repository: "https://charts.bitnami.com/bitnami"
```

## values.yaml

```yaml
replicaCount: 3
image:
  repository: myorg/myapp
  tag: "1.0.0"
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  port: 80
ingress:
  enabled: false
  className: nginx
  hosts:
    - host: example.com
      paths:
        - path: /
          pathType: Prefix
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

## Template example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
  labels:
    {{- include "mychart.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "mychart.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "mychart.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 80
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

## Common functions

- `default "value"` — default value.
- `quote value` — quote a string.
- `upper value` / `lower value` — case conversion.
- `b64enc` / `b64dec` — base64.
- `sha256sum` — SHA-256.
- `nindent N` — new line + indent.
- `toYaml .Values.foo` — render as YAML.
- `tpl` — render template.

## Lifecycle hooks

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    "helm.sh/hook": pre-install
    "helm.sh/hook-weight": "-5"
spec:
  containers:
    - name: db-migration
      image: migrator
```

Available hooks: `pre-install`, `post-install`, `pre-delete`, `post-delete`, `pre-upgrade`, `post-upgrade`, `test`.

## Versions

| Version | Year | Notable |
|---------|------|---------|
| 2.0 | 2016 | First major version after Tiller removal in Helm 3 |
| 3.0 | 2019 | No Tiller; client-only |
| 3.8 | 2022 | OCI registry support |
| 3.13 | 2023 | Continued improvements |
| 3.14 | 2024 | OCI improvements |
| 3.15 | 2025 | Latest |

## Books

- *Learn Helm* — Andrew Block, Austin Dewey (Packt).
- *Helm in Action** (Manning, planned).
- Helm official docs are the canonical reference.

## Tools

- **Helm:** the tool itself.
- **helm-diff:** diff between releases.
- **helm-secrets:** encrypted secrets in values.
- **helmfile:** declarative spec.
- **argocd-image-updater:** automate image updates.

## Alternatives

- **Kustomize:** template-free; patches.
- **Jsonnet:** data templating language.
- **cdk8s:** TypeScript/Python-based.