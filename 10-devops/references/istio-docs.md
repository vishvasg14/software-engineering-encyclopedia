# Istio Documentation Reference

The authoritative source for Istio is the official documentation. This file catalogs the Istio documentation pages referenced in the DevOps document.

## Primary documentation

- **Istio Documentation:** <https://istio.io/latest/docs/>
- **Istio GitHub:** <https://github.com/istio/istio>
- **Istio Blog:** <https://istio.io/latest/news/>

## Topics referenced in the document

### Concepts <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Concepts'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Concepts" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| What is Istio? | <https://istio.io/latest/docs/concepts/what-is-istio/> |
| Architecture | <https://istio.io/latest/docs/ops/deployment/architecture/> |
| Deployment models | <https://istio.io/latest/docs/ops/deployment/deployment-models/> |
| Sidecar injection | <https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/> |
| Ambient mesh | <https://istio.io/latest/docs/ambient/> |

### Traffic management <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Traffic%20management'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Traffic management" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| VirtualService | <https://istio.io/latest/docs/reference/config/networking/virtual-service/> |
| DestinationRule | <https://istio.io/latest/docs/reference/config/networking/destination-rule/> |
| Gateway | <https://istio.io/latest/docs/reference/config/networking/gateway/> |
| ServiceEntry | <https://istio.io/latest/docs/reference/config/networking/service-entry/> |
| Traffic splitting | <https://istio.io/latest/docs/concepts/traffic-management/> |
| Canary deployments | <https://istio.io/latest/docs/setup/upgrade/canary/> |

### Security <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Security'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Security" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| mTLS | <https://istio.io/latest/docs/concepts/security/> |
| PeerAuthentication | <https://istio.io/latest/docs/reference/config/security/peer_authentication/> |
| RequestAuthentication | <https://istio.io/latest/docs/reference/config/security/request_authentication/> |
| AuthorizationPolicy | <https://istio.io/latest/docs/reference/config/security/authorization_policy/> |
| JWT | <https://istio.io/latest/docs/concepts/security/#jwt> |

### Observability <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Observability'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Observability" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Telemetry | <https://istio.io/latest/docs/concepts/observability/> |
| Metrics | <https://istio.io/latest/docs/concepts/observability/#metrics> |
| Logs | <https://istio.io/latest/docs/concepts/observability/#logs> |
| Traces | <https://istio.io/latest/docs/concepts/observability/#traces> |
| Access logs | <https://istio.io/latest/docs/concepts/observability/#access-logs> |

### Configuration <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Configuration'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Configuration" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| VirtualService | <https://istio.io/latest/docs/reference/config/networking/virtual-service/> |
| DestinationRule | <https://istio.io/latest/docs/reference/config/networking/destination-rule/> |
| Gateway | <https://istio.io/latest/docs/reference/config/networking/gateway/> |
| ServiceEntry | <https://istio.io/latest/docs/reference/config/networking/service-entry/> |
| Sidecar | <https://istio.io/latest/docs/reference/config/networking/sidecar/> |

## Install

```bash
# Download Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*/

# Install with default profile
istioctl install --set profile=demo -y

# Enable sidecar injection in default namespace
kubectl label namespace default istio-injection=enabled
```

## Sample VirtualService

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
    - reviews
  http:
    - match:
        - headers:
            end-user:
              exact: jason
      route:
        - destination:
            host: reviews
            subset: v2
    - route:
        - destination:
            host: reviews
            subset: v1
```

## Sample DestinationRule

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: reviews
spec:
  host: reviews
  trafficPolicy:
    connectionPool:
      http:
        h2UpgradePolicy: UPGRADE
      tcp:
        maxConnections: 100
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
```

## Versions

| Version | Year | Notable |
|---------|------|---------|
| 1.0 | 2018 | First major version |
| 1.5 | 2020 | Stable APIs |
| 1.10 | 2021 | WASM extensions |
| 1.15 | 2022 | Ambient mesh preview |
| 1.18 | 2023 | Ambient beta |
| 1.20 | 2024 | Ambient GA |
| 1.21 | 2024 | Continued improvements |
| 1.22 | 2025 | Latest |

## Books

- *Istio in Action* — Christian Posta, Rinor Maloku (Manning).
- *Learning Istio* — https://www.istio.io/ (official docs are the canonical reference).

## Tools

- **istioctl:** official CLI.
- **Kiali:** service mesh observability UI.
- **Jaeger:** distributed tracing.
- **Prometheus:** metrics collection.
- **Grafana:** dashboards.
- **Envoy:** data plane (used internally).

## Alternatives

- **Linkerd:** CNCF graduated; Rust-based proxy.
- **Consul Connect:** HashiCorp service mesh.
- **AWS App Mesh:** AWS-specific.
- **Cilium:** eBPF-based service mesh.