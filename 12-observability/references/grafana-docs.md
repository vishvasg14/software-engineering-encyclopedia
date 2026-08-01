# Grafana Documentation Reference

The authoritative source for Grafana is the official documentation. This file catalogs the Grafana documentation pages referenced in the Observability document.

## Primary documentation

- **Grafana Documentation:** <https://grafana.com/docs/
- **Grafana GitHub:** <https://github.com/grafana/grafana/
- **Grafana Tutorials:** <https://grafana.com/tutorials/
- **Grafana Community:** <https://community.grafana.com/
- **Grafana Labs:** <https://grafana.com/

## Topics referenced in the document

| Topic | URL |
|-------|-----|
| Getting started | <https://grafana.com/docs/grafana/latest/getting-started/ |
| Dashboards | <https://grafana.com/docs/grafana/latest/dashboards/ |
| Panels | <https://grafana.com/docs/grafana/latest/panels/ |
| Variables | <https://grafana.com/docs/grafana/latest/dashboards/variables/ |
| Transformations | <https://grafana.com/docs/grafana/latest/panels/transformations/ |
| Alerting | <https://grafana.com/docs/grafana/latest/alerting/ |
| Datasources | <https://grafana.com/docs/grafana/latest/datasources/ |
| Plugins | <https://grafana.com/docs/grafana/latest/plugins/ |
| Provisioning | <https://grafana.com/docs/grafana/latest/administration/provisioning/ |
| Permissions | <https://grafana.com/docs/grafana/latest/administration/roles-and-permissions/ |
| API | <https://grafana.com/docs/grafana/latest/developers/http_api/ |

## Datasources

| Datasource | Purpose |
|-----------|---------|
| **Prometheus** | metrics |
| **Loki** | logs |
| **Tempo** | traces |
| **Jaeger** | traces (legacy) |
| **Elasticsearch** | logs (ELK) |
| **InfluxDB** | metrics |
| **CloudWatch** | AWS metrics |
| **Azure Monitor** | Azure metrics |
| **Stackdriver** | GCP metrics |
| **MySQL / PostgreSQL** | SQL |
| **TestData** | mock data |

## Panel types

| Panel | Use |
|-------|-----|
| **Time series** | metrics over time |
| **Stat** | single number |
| **Gauge** | value with thresholds |
| **Bar chart** | comparison |
| **Histogram** | distribution |
| **Heatmap** | density over time |
| **Pie chart** | proportions |
| **Table** | tabular data |
| **Logs** | log streams |
| **Trace** | distributed trace |
| **Node graph** | service dependencies |

## Variables

Variables allow dashboards to be parameterized. Types:

- **Query:** from a datasource.
- **Custom:** user-defined.
- **Text box:** free-form input.
- **Interval:** time range.
- **Data source:** switch datasource.
- **Constant:** fixed value.
- **Custom all:** composite.

## Alerting

Grafana has built-in alerting (since 9.0):

- **Alert rules** — PromQL or Loki queries.
- **Contact points** — Slack, PagerDuty, webhook, etc.
- **Notification policies** — label matchers route alerts.
- **Silences** — temporary mute.
- **Groups** — organize related alerts.

## Transformations

- **Reduce:** aggregate values.
- **Filter by name / value:** include/exclude.
- **Group by:** multi-series.
- **Sort by:** order series.
- **Calculate field:** new fields.
- **Join fields:** combine series.
- **Time series to rows / Rows to time series:** reshape.
- **Partition by values:** split.

## Provisioning

- **File provisioning:** dashboards, datasources, alert rules in YAML.
- **API provisioning:** create via Grafana HTTP API.
- **Terraform provider:** manage via Terraform.

## Versions

| Version | Year | Notable |
|---------|------|---------|
| 7.0 | 2021 | Transformations |
| 8.0 | 2022 | Alerting v2 |
| 9.0 | 2023 | New alerting UI |
| 10.0 | 2024 | Dashboards v2 |
| 11.0 | 2024 | Drilldown |
| 12.0 | 2025 | Latest |

## Tools and integrations

- **Grafana Loki:** logs.
- **Grafana Tempo:** traces.
- **Grafana Mimir:** metrics (multi-tenant Prometheus-compatible).
- **Grafana Pyroscope:** continuous profiling.
- **Grafana Beyla:** eBPF auto-instrumentation.
- **Grafana Faro:** frontend observability.

## Community plugins

- **Grafana Marketplace:** <https://grafana.com/grafana/plugins/>
- 600+ datasources.
- Panels: Stat, Time series, Bar, Heatmap, etc.
- Integrations: Slack, PagerDuty, etc.

## Books

- *Grafana 10.x: Up and Running* — (planned).
- Grafana official docs are the canonical reference.

## Free online resources

- **Grafana Tutorials:** <https://grafana.com/tutorials/>
- **Grafana Community:** <https://community.grafana.com/>
- **Playground:** <https://play.grafana.org/>