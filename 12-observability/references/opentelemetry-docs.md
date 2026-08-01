# OpenTelemetry Documentation Reference

The authoritative source for OpenTelemetry is the official documentation. This file catalogs the OpenTelemetry documentation pages referenced in the Observability document.

## Primary documentation

- **OpenTelemetry Documentation:** <https://opentelemetry.io/docs/
- **OpenTelemetry GitHub:** <https://github.com/open-telemetry/
- **OpenTelemetry Specification:** <https://github.com/open-telemetry/opentelemetry-specification/
- **CNCF OpenTelemetry:** <https://www.cncf.io/projects/opentelemetry/

## Topics referenced in the document

| Topic | URL |
|-------|-----|
| What is OpenTelemetry? | <https://opentelemetry.io/docs/concepts/what-is-opentelemetry/ |
| Getting started | <https://opentelemetry.io/docs/getting-started/ |
| Concepts | <https://opentelemetry.io/docs/concepts/ |
| Instrumentation | <https://opentelemetry.io/docs/concepts/instrumentation/ |
| Signals | <https://opentelemetry.io/docs/concepts/signals/ |
| Traces | <https://opentelemetry.io/docs/concepts/signals/traces/ |
| Metrics | <https://opentelemetry.io/docs/concepts/signals/metrics/ |
| Logs | <https://opentelemetry.io/docs/concepts/signals/logs/ |
| Baggage | <https://opentelemetry.io/docs/concepts/signals/baggage/ |
| Context propagation | <https://opentelemetry.io/docs/concepts/context-propagation/ |
| Sampling | <https://opentelemetry.io/docs/concepts/sampling/ |
| Specification | <https://github.com/open-telemetry/opentelemetry-specification/ |
| Collector | <https://opentelemetry.io/docs/collector/ |
| SDKs | <https://opentelemetry.io/docs/languages/ |

## Languages

| Language | Status | Library |
|----------|--------|---------|
| Java | Stable | opentelemetry-java |
| Python | Stable | opentelemetry-python |
| Go | Stable | opentelemetry-go |
| JavaScript (Node.js, browser) | Stable | opentelemetry-js |
| .NET | Stable | opentelemetry-dotnet |
| Go | Stable | opentelemetry-go |
| Rust | Beta | opentelemetry-rust |
| C++ | Stable | opentelemetry-cpp |
| PHP | Beta | opentelemetry-php |
| Ruby | Beta | opentelemetry-ruby |
| Swift | Beta | opentelemetry-swift |
| Erlang/Elixir | Contrib | opentelemetry-erlang |

## Concepts

### Signals

- **Trace:** distributed request path.
- **Span:** unit of work.
- **Metric:** numeric measurement.
- **Log:** discrete event.
- **Baggage:** key-value context propagation.

### Span attributes

- **Span kind:** CLIENT, SERVER, PRODUCER, CONSUMER, INTERNAL.
- **Span status:** UNSET, OK, ERROR.
- **Attributes:** key-value metadata.
- **Events:** timestamped annotations.
- **Links:** related spans across services.

### Context propagation

- **W3C Trace Context:** standard for trace IDs.
- **W3C Baggage:** standard for key-value context.
- **B3:** Zipkin-style propagation.
- **Jaeger:** Jaeger-style propagation.
- **Custom:** user-defined.

## Collector

The OpenTelemetry Collector is a vendor-agnostic proxy:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 5s
  memory_limiter:
    check_interval: 1s
    limit_mib: 512

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
  otlp/jaeger:
    endpoint: jaeger:4317
    tls:
      insecure: true

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [prometheus]
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlp/jaeger]
```

### Receivers

- OTLP (gRPC, HTTP).
- Prometheus.
- Jaeger.
- Zipkin.
- Kafka.
- Fluentd.
- File logs.

### Processors

- batch
- memory_limiter
- attributes
- resource
- span
- tail_sampling
- probabilistic_sampler
- filter

### Exporters

- OTLP
- Prometheus
- Jaeger
- Zipkin
- Loki
- Elasticsearch
- Kafka
- File
- Logging

### Extensions

- health_check
- pprof
- zpages
- bearertokenauth
- oauth2client

## Auto-instrumentation

OpenTelemetry provides zero-code instrumentation for many libraries:

- **Java:** opentelemetry-javaagent.
- **Python:** opentelemetry-instrument.
- **Node.js:** @opentelemetry/auto-instrumentations-node.
- **.NET:** OpenTelemetry.Instrumentation.AutoInstrumentation.

## Versions

| Version | Year | Notable |
|---------|------|---------|
| 1.0 (Tracing) | 2021 | Stable tracing spec |
| 1.0 (Metrics, Logs) | 2022-2024 | Stable metrics and logs |
| 1.30+ | 2024-2026 | Continued improvements |

## Tools and integrations

- **Collector:** <https://github.com/open-telemetry/opentelemetry-collector>
- **Operator:** <https://github.com/open-telemetry/opentelemetry-operator>
- **Demo:** <https://github.com/open-telemetry/opentelemetry-demo>
- **Registry:** <https://opentelemetry.io/ecosystem/registry/

## Vendors supporting OpenTelemetry

- AWS (X-Ray)
- Google Cloud (Cloud Trace)
- Azure (Application Insights)
- Datadog
- New Relic
- Dynatrace
- Splunk
- Lightstep
- Honeycomb
- Grafana (Tempo)
- Jaeger
- Elastic

## Books

- *Mastering OpenTelemetry* — (planned).
- OTel docs are the canonical reference.

## Free online resources

- **OpenTelemetry Bootcamp:** <https://opentelemetry.io/docs/bootcamp/
- **OpenTelemetry Demo:** <https://github.com/open-telemetry/opentelemetry-demo>