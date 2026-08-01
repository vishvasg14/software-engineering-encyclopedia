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

### Signals <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23signals%0A%0ASection%20title%3A%20Signals' target='_blank' rel='noopener' data-askgpt='Signals' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/12-observability/references/opentelemetry-docs.md#signals' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23signals%0A%0ASection%20title%3A%20Signals' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23signals%0A%0ASection%20title%3A%20Signals' title='Ask ChatGPT about this section'>💬</a>

- **Trace:** distributed request path.
- **Span:** unit of work.
- **Metric:** numeric measurement.
- **Log:** discrete event.
- **Baggage:** key-value context propagation.

### Span attributes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23span-attributes%0A%0ASection%20title%3A%20Span%20attributes' target='_blank' rel='noopener' data-askgpt='Span attributes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/12-observability/references/opentelemetry-docs.md#span-attributes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23span-attributes%0A%0ASection%20title%3A%20Span%20attributes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23span-attributes%0A%0ASection%20title%3A%20Span%20attributes' title='Ask ChatGPT about this section'>💬</a>

- **Span kind:** CLIENT, SERVER, PRODUCER, CONSUMER, INTERNAL.
- **Span status:** UNSET, OK, ERROR.
- **Attributes:** key-value metadata.
- **Events:** timestamped annotations.
- **Links:** related spans across services.

### Context propagation <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23context-propagation%0A%0ASection%20title%3A%20Context%20propagation' target='_blank' rel='noopener' data-askgpt='Context propagation' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/12-observability/references/opentelemetry-docs.md#context-propagation' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23context-propagation%0A%0ASection%20title%3A%20Context%20propagation' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23context-propagation%0A%0ASection%20title%3A%20Context%20propagation' title='Ask ChatGPT about this section'>💬</a>

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

### Receivers <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23receivers%0A%0ASection%20title%3A%20Receivers' target='_blank' rel='noopener' data-askgpt='Receivers' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/12-observability/references/opentelemetry-docs.md#receivers' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23receivers%0A%0ASection%20title%3A%20Receivers' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23receivers%0A%0ASection%20title%3A%20Receivers' title='Ask ChatGPT about this section'>💬</a>

- OTLP (gRPC, HTTP).
- Prometheus.
- Jaeger.
- Zipkin.
- Kafka.
- Fluentd.
- File logs.

### Processors <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23processors%0A%0ASection%20title%3A%20Processors' target='_blank' rel='noopener' data-askgpt='Processors' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/12-observability/references/opentelemetry-docs.md#processors' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23processors%0A%0ASection%20title%3A%20Processors' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23processors%0A%0ASection%20title%3A%20Processors' title='Ask ChatGPT about this section'>💬</a>

- batch
- memory_limiter
- attributes
- resource
- span
- tail_sampling
- probabilistic_sampler
- filter

### Exporters <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23exporters%0A%0ASection%20title%3A%20Exporters' target='_blank' rel='noopener' data-askgpt='Exporters' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/12-observability/references/opentelemetry-docs.md#exporters' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23exporters%0A%0ASection%20title%3A%20Exporters' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23exporters%0A%0ASection%20title%3A%20Exporters' title='Ask ChatGPT about this section'>💬</a>

- OTLP
- Prometheus
- Jaeger
- Zipkin
- Loki
- Elasticsearch
- Kafka
- File
- Logging

### Extensions <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23extensions%0A%0ASection%20title%3A%20Extensions' target='_blank' rel='noopener' data-askgpt='Extensions' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/12-observability/references/opentelemetry-docs.md#extensions' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23extensions%0A%0ASection%20title%3A%20Extensions' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F12-observability%2Freferences%2Fopentelemetry-docs.md%23extensions%0A%0ASection%20title%3A%20Extensions' title='Ask ChatGPT about this section'>💬</a>

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