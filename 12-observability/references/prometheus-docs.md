# Prometheus Documentation Reference

The authoritative source for Prometheus is the official documentation. This file catalogs the Prometheus documentation pages referenced in the Observability document.

## Primary documentation

- **Prometheus Documentation:** <https://prometheus.io/docs/>
- **Prometheus GitHub:** <https://github.com/prometheus/prometheus>
- **Prometheus Community:** <https://prometheus.io/community/>
- **CNCF Prometheus:** <https://www.cncf.io/projects/prometheus/>

## Topics referenced in the document

| Topic | URL |
|-------|-----|
| Getting started | <https://prometheus.io/docs/prometheus/latest/getting_started/ |
| Concepts | <https://prometheus.io/docs/concepts/> |
| Data model | <https://prometheus.io/docs/concepts/data_model/> |
| Metric types | <https://prometheus.io/docs/concepts/metric_types/> |
| Job and instance | <https://prometheus.io/docs/concepts/jobs_instances/ |
| Storage | <https://prometheus.io/docs/prometheus/latest/storage/ |
| PromQL | <https://prometheus.io/docs/prometheus/latest/querying/basics/ |
| Recording rules | <https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/ |
| Alerting rules | <https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/ |
| HTTP API | <https://prometheus.io/docs/prometheus/latest/querying/api/ |
| Federation | <https://prometheus.io/docs/prometheus/latest/federation/ |
| Remote write | <https://prometheus.io/docs/prometheus/latest/configuration/remote_write/ |
| Remote read | <https://prometheus.io/docs/prometheus/latest/configuration/remote_read/ |
| Service discovery | <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#<configuration-file> |
| Exporters | <https://prometheus.io/docs/instrumenting/exporters/ |
| Client libraries | <https://prometheus.io/docs/instrumenting/clientlibs/ |
| Exposition formats | <https://prometheus.io/docs/instrumenting/exposition_formats/ |

## PromQL reference

| Function | Purpose |
|----------|---------|
| `rate()` | per-second rate over a counter |
| `irate()` | instant rate |
| `increase()` | total increase over time range |
| `sum()` | sum across labels |
| `avg()` | average across labels |
| `max()` / `min()` | max/min values |
| `histogram_quantile()` | quantile from histogram |
| `topk()` / `bottomk()` | top/bottom K series |
| `absent()` | missing metric detection |
| `predict_linear()` | linear extrapolation |

## Metric types

| Type | Description |
|------|-------------|
| **Counter** | monotonically increasing; reset on restart |
| **Gauge** | arbitrary value; can go up/down |
| **Histogram** | observations in buckets; counts and sum |
| **Summary** | like histogram but with quantiles pre-computed |
| **Untyped** | legacy; 0.0.4 format only |

## Best practices

- Use Counter for things that only increase.
- Use Gauge for things that go up and down.
- Use Histogram for latency / size distributions.
- Add labels for dimensions (but not high-cardinality!).
- Name with `<namespace>_<subsystem>_<measurement>`.

## Exporters

| Exporter | Purpose |
|----------|---------|
| `node_exporter` | host metrics (CPU, memory, disk) |
| `kube-state-metrics` | K8s object metrics |
| `blackbox_exporter` | probing (HTTP, TCP, ICMP) |
| `mysqld_exporter` | MySQL metrics |
| `redis_exporter` | Redis metrics |
| `kafka_exporter` | Kafka metrics |
| `nginx-prometheus-exporter` | Nginx metrics |
| `rabbitmq_exporter` | RabbitMQ metrics |

## Storage

- **Local:** TSDB on disk; configurable retention.
- **Remote write:** Thanos, Cortex, Mimir, VictoriaMetrics.
- **S3 / GCS / Azure Blob:** experimental; via remote storage adapters.

## Alertmanager

- **Grouping:** by alert and label.
- **Inhibition:** suppress alerts when other alerts fire.
- **Silences:** temporary mute.
- **Routing:** to receivers (PagerDuty, Slack, email, webhook).
- **Templates:** customizable.

## Versions

| Version | Year | Notable |
|---------|------|---------|
| 1.0 | 2016 | First major |
| 2.0 | 2017 | New query engine |
| 2.20 | 2021 | New features |
| 2.40 | 2022 | Remote write improvements |
| 2.50 | 2024 | Continued improvements |
| 2.55 | 2025 | Recent |

## Related projects

- **Thanos:** long-term storage, global view.
- **Cortex:** multi-tenant, long-term storage (deprecated in favor of Mimir).
- **Grafana Mimir:** CNCF graduated; scalable multi-tenant.
- **VictoriaMetrics:** high-performance, lower resource use.
- **PromQL-compatible query engines.**

## Tools

- **PromQL:** query language.
- **Alertmanager:** routing alerts.
- **Pushgateway:** for batch jobs.
- **Exporters:** metric producers.
- **Recording rules:** pre-computed aggregates.

## Books

- *Prometheus: Up & Running* — Brian Brazil (O'Reilly). The official book.