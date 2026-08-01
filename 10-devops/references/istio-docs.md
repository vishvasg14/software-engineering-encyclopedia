# Istio Documentation Reference

The authoritative source for Istio is the official documentation. This file catalogs the Istio documentation pages referenced in the DevOps document.

## Primary documentation

- **Istio Documentation:** <https://istio.io/latest/docs/>
- **Istio GitHub:** <https://github.com/istio/istio>
- **Istio Blog:** <https://istio.io/latest/news/>

## Topics referenced in the document

### Concepts <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23concepts%0A%0ASection%20title%3A%20Concepts" target="_blank" rel="noopener" data-askgpt="Concepts" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/10-devops/references/istio-docs.md#concepts" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23concepts%0A%0ASection%20title%3A%20Concepts" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23concepts%0A%0ASection%20title%3A%20Concepts" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| What is Istio? | <https://istio.io/latest/docs/concepts/what-is-istio/> |
| Architecture | <https://istio.io/latest/docs/ops/deployment/architecture/> |
| Deployment models | <https://istio.io/latest/docs/ops/deployment/deployment-models/> |
| Sidecar injection | <https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/> |
| Ambient mesh | <https://istio.io/latest/docs/ambient/> |

### Traffic management <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23traffic-management%0A%0ASection%20title%3A%20Traffic%20management" target="_blank" rel="noopener" data-askgpt="Traffic management" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/10-devops/references/istio-docs.md#traffic-management" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23traffic-management%0A%0ASection%20title%3A%20Traffic%20management" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23traffic-management%0A%0ASection%20title%3A%20Traffic%20management" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| VirtualService | <https://istio.io/latest/docs/reference/config/networking/virtual-service/> |
| DestinationRule | <https://istio.io/latest/docs/reference/config/networking/destination-rule/> |
| Gateway | <https://istio.io/latest/docs/reference/config/networking/gateway/> |
| ServiceEntry | <https://istio.io/latest/docs/reference/config/networking/service-entry/> |
| Traffic splitting | <https://istio.io/latest/docs/concepts/traffic-management/> |
| Canary deployments | <https://istio.io/latest/docs/setup/upgrade/canary/> |

### Security <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23security%0A%0ASection%20title%3A%20Security" target="_blank" rel="noopener" data-askgpt="Security" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/10-devops/references/istio-docs.md#security" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23security%0A%0ASection%20title%3A%20Security" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23security%0A%0ASection%20title%3A%20Security" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| mTLS | <https://istio.io/latest/docs/concepts/security/> |
| PeerAuthentication | <https://istio.io/latest/docs/reference/config/security/peer_authentication/> |
| RequestAuthentication | <https://istio.io/latest/docs/reference/config/security/request_authentication/> |
| AuthorizationPolicy | <https://istio.io/latest/docs/reference/config/security/authorization_policy/> |
| JWT | <https://istio.io/latest/docs/concepts/security/#jwt> |

### Observability <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23observability%0A%0ASection%20title%3A%20Observability" target="_blank" rel="noopener" data-askgpt="Observability" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/10-devops/references/istio-docs.md#observability" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23observability%0A%0ASection%20title%3A%20Observability" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23observability%0A%0ASection%20title%3A%20Observability" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Telemetry | <https://istio.io/latest/docs/concepts/observability/> |
| Metrics | <https://istio.io/latest/docs/concepts/observability/#metrics> |
| Logs | <https://istio.io/latest/docs/concepts/observability/#logs> |
| Traces | <https://istio.io/latest/docs/concepts/observability/#traces> |
| Access logs | <https://istio.io/latest/docs/concepts/observability/#access-logs> |

### Configuration <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" target="_blank" rel="noopener" data-askgpt="Configuration" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/10-devops/references/istio-docs.md#configuration" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F10-devops%2Freferences%2Fistio-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" title="Ask ChatGPT about this section">💬</a>

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