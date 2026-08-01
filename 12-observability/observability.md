# Observability (Prometheus, Grafana, OpenTelemetry)

> A comprehensive, production-grade treatment of the three pillars of observability — metrics, logs, traces — with OpenTelemetry as the unifying SDK, plus alerting, SLOs, and SRE practices.

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

**Observability** is the ability to understand a system's internal state from its external outputs. It is built on three pillars: **metrics** (numerical measurements), **logs** (discrete events), and **traces** (request paths through distributed systems). Modern observability is dominated by **Prometheus** (metrics), **Loki** (logs), **Tempo/Jaeger** (traces), and **OpenTelemetry** (the vendor-neutral instrumentation SDK).

This document treats all three pillars at production depth: the data models, query languages, storage backends, and operational practices. It also covers **SLOs** (Service Level Objectives) and **alerting** (Alertmanager, Grafana alerting) and **SRE practices** (blameless postmortems, error budgets).

**Scope.** This is not a tutorial. It assumes you can already read a Grafana dashboard. It focuses on **principles and patterns** that distinguish production observability from toy implementations.

**Version baselines.** Prometheus 2.50+, Grafana 10+, OpenTelemetry 1.x, Loki 3.x, Tempo 2.x.

## 2. Definition

The observability ecosystem uses overlapping terminology. Here's a precise taxonomy:

| Term | Type | Authoritative source |
|------|------|---------------------|
| **Observability** | A property of a system; ability to understand from outputs | C. Sridharan, "Distributed Systems Observability" |
| **Three pillars** | Metrics, logs, traces | Industry standard |
| **Metrics** | Numerical measurements aggregated over time | Prometheus |
| **Logs** | Discrete events with structured data | Loki / ELK |
| **Traces** | Request paths through distributed systems | Jaeger / Tempo |
| **Span** | Unit of work in a trace | OpenTelemetry |
| **Metric types** | Counter, Gauge, Histogram, Summary | Prometheus |
| **Service Level Indicator (SLI)** | Measurement of service quality | Google SRE |
| **Service Level Objective (SLO)** | Target value of an SLI | Google SRE |
| **Service Level Agreement (SLA)** | Contract with consequences (often financial) | Google SRE |
| **Error budget** | `1 - SLO`; capacity for failures | Google SRE |
| **RED method** | Rate, Errors, Duration | Tom Wilkie |
| **USE method** | Utilization, Saturation, Errors | Brendan Gregg |
| **Four Golden Signals** | Latency, Traffic, Errors, Saturation | Google SRE |
| **Cardinality** | Number of unique label combinations | Prometheus |
| **OpenTelemetry** | Vendor-neutral observability SDK | CNCF |
| **Span context** | Trace ID, Span ID propagated across services | OTel spec |
| **Baggage** | Key-value context propagation | W3C |

The standard observability stack:

```mermaid
graph TB
    subgraph "Application"
        App[App with OTel SDK]
    end
    subgraph "Collection"
        OTelCol[OTel Collector]
    end
    subgraph "Storage"
        Prom[Prometheus]
        Loki
        Tempo
    end
    subgraph "Presentation"
        Grafana
    end
    App -->|metrics| OTelCol
    App -->|traces| OTelCol
    App -->|logs| OTelCol
    OTelCol -->|remote_write| Prom
    OTelCol -->|logs| Loki
    OTelCol -->|traces| Tempo
    Prom --> Grafana
    Loki --> Grafana
    Tempo --> Grafana
```

## 3. Five Ws + One H

### What <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'What'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="What" title="Ask ChatGPT about this section">💬</a>

**Observability** is the ability to ask arbitrary questions about a system's state without shipping new code. It is built on **metrics** (aggregated numerical data), **logs** (discrete events), and **traces** (causally-related events across services).

### Why <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Why'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Why" title="Ask ChatGPT about this section">💬</a>

Distributed systems are complex; you can't reason about them from a single log line. Observability lets you understand the system from the outside, debug issues quickly, and verify SLOs.

### When <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'When'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="When" title="Ask ChatGPT about this section">💬</a>

The term "observability" entered mainstream engineering vocabulary around 2017-2018, popularized by Cindy Sridharan's book and the OpenTracing / OpenTelemetry projects.

### Where <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Where'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Where" title="Ask ChatGPT about this section">💬</a>

Every web-scale company. Netflix pioneered distributed tracing. Google developed Dapper (precursor to OpenTelemetry). Charity Majors and the Honeycomb team popularized the modern observability mindset.

### Who <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Who'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Who" title="Ask ChatGPT about this section">💬</a>

- **Cindy Sridharan:** "Distributed Systems Observability" (book).
- **Charity Majors:** Honeycomb; observability champion.
- **Brendan Gregg:** USE method, performance.
- **Google SRE team:** SLIs, SLOs, error budgets.
- **CNCF:** OpenTelemetry.

### How (one-paragraph preview) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'How%20(one-paragraph%20preview)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="How (one-paragraph preview)" title="Ask ChatGPT about this section">💬</a>

You instrument your application with a vendor-neutral SDK (OpenTelemetry). The SDK emits metrics, traces, and logs. A collector (OpenTelemetry Collector) receives them, batches them, and exports to backends (Prometheus, Loki, Tempo). Grafana queries these backends and provides dashboards. Alertmanager (for Prometheus) or Grafana alerting (for any datasource) generates alerts based on SLOs. On-call engineers respond via runbooks; SRE team conducts blameless postmortems.

## 4. History

### 4.1 Origins (2005-2015) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'4.1%20Origins%20(2005-2015)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="4.1 Origins (2005-2015)" title="Ask ChatGPT about this section">💬</a>

- **2005** — Google Dapper paper; the foundation of distributed tracing.
- **2010** — Twitter Zipkin open-sourced (inspired by Dapper).
- **2014** — OpenTracing API specification (CNCF).
- **2015** — Prometheus 1.0; CNCF graduated.

### 4.2 Standardization (2016-2021) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'4.2%20Standardization%20(2016-2021)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="4.2 Standardization (2016-2021)" title="Ask ChatGPT about this section">💬</a>

- **2016** — CNCF accepts OpenTracing.
- **2017** — Cindy Sridharan publishes "Distributed Systems Observability" (book).
- **2018** — W3C Trace Context becomes a Candidate Recommendation.
- **2019** — OpenTelemetry merges OpenTracing and OpenCensus; OTel 1.0 (Tracing) released.
- **2020** — Grafana acquires Loki (logs).
- **2021** — Grafana 8.0 with full observability stack (Loki, Tempo, Mimir).

### 4.3 Unified (2021-2026) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'4.3%20Unified%20(2021-2026)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="4.3 Unified (2021-2026)" title="Ask ChatGPT about this section">💬</a>

- **2021** — OTel 1.0 (Tracing) stable; CNCF graduated.
- **2022** — OTel metrics + logs spec stable.
- **2023** — OpenTelemetry as the de facto observability SDK.
- **2024** — eBPF-based observability (Cilium, Pixie, Beyla).
- **2025** — LLM observability; AI workloads.
- **2026** — Unified observability platforms.

```mermaid
timeline
    title Observability history
    2005 : Google Dapper paper
    2010 : Zipkin open-sourced
    2014 : OpenTracing
    2015 : Prometheus 1.0
    2019 : OpenTelemetry formed
    2021 : OTel Tracing 1.0
    2023 : OTel metrics + logs stable
    2026 : Unified platforms
```

## 5. Problem Statement

### 5.1 What observability solves <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'5.1%20What%20observability%20solves'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="5.1 What observability solves" title="Ask ChatGPT about this section">💬</a>

- **Debug complex distributed systems** — find the root cause across services.
- **Validate SLOs** — measure user-visible reliability.
- **Alert on real problems** — avoid alert fatigue.
- **Capacity planning** — see trends.
- **Performance debugging** — find hot paths.
- **Business analytics** — track KPIs.

### 5.2 What observability doesn't solve <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'5.2%20What%20observability%20doesn't%20solve'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="5.2 What observability doesn't solve" title="Ask ChatGPT about this section">💬</a>

- **Bugs in code** — debugging tools help.
- **Bugs in design** — observability surfaces symptoms.
- **Operational discipline** — SRE practices.
- **Cost** — observability is itself costly.

### 5.3 The cost of poor observability <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'5.3%20The%20cost%20of%20poor%20observability'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="5.3 The cost of poor observability" title="Ask ChatGPT about this section">💬</a>

- Mean time to detect (MTTD) is high.
- Mean time to resolve (MTTR) is high.
- Engineers page through dashboards for hours.
- Customer experience suffers.

## 6. Real-World Motivation

### 6.1 Netflix <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'6.1%20Netflix'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="6.1 Netflix" title="Ask ChatGPT about this section">💬</a>

Pioneered distributed tracing with Atlas; uses Spinnaker for deployment; runs Eureka, Hystrix, Ribbon for microservices observability.

### 6.2 Uber <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'6.2%20Uber'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="6.2 Uber" title="Ask ChatGPT about this section">💬</a>

Operates Jaeger at scale; built M3DB for metrics; uses OpenTracing.

### 6.3 Twitter <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'6.3%20Twitter'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="6.3 Twitter" title="Ask ChatGPT about this section">💬</a>

Open-sourced Zipkin; uses Prometheus at scale; built Vortex (metrics pipeline).

### 6.4 Google <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'6.4%20Google'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="6.4 Google" title="Ask ChatGPT about this section">💬</a>

Dapper (tracing), Monarch (metrics), Dremel (logs). Foundation for modern observability.

```mermaid
graph LR
    subgraph "Production motivations"
        A[Debugging] --> Drivers
        B[SLOs] --> Drivers
        C[Alerting] --> Drivers
        D[Performance] --> Drivers
    end
    Drivers --> Obs["Three pillars + OTel + SRE"]
```

---

## 7. Internal Working

### 7.1 The three pillars <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'7.1%20The%20three%20pillars'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="7.1 The three pillars" title="Ask ChatGPT about this section">💬</a>

```mermaid
graph TB
    App[Application]
    App -->|emits| Metrics[Metrics]
    App -->|emits| Logs
    App -->|emits| Traces

    Metrics --> Prom[Prometheus]
    Logs --> Loki
    Traces --> Tempo
    Prom --> Grafana
    Loki --> Grafana
    Tempo --> Grafana
```

### 7.2 Trace flow <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'7.2%20Trace%20flow'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="7.2 Trace flow" title="Ask ChatGPT about this section">💬</a>

```mermaid
sequenceDiagram
    participant Client
    participant A as Service A
    participant B as Service B
    participant C as Service C

    Client->>A: GET /api
    Note over A: span_id=A1
    A->>B: query
    Note over A,B: trace_id=T1
    B->>C: query
    Note over B,C: parent=A1
    C-->>B: result
    B-->>A: result
    A-->>Client: response
```

### 7.3 Subsystems <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'7.3%20Subsystems'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="7.3 Subsystems" title="Ask ChatGPT about this section">💬</a>

| Subsystem | Responsibility |
|-----------|---------------|
| **Application** | emits metrics, logs, traces |
| **SDK (OTel)** | instruments code, exports signals |
| **Collector** | receives, batches, exports to backends |
| **Storage backends** | Prometheus, Loki, Tempo, etc. |
| **Visualization** | Grafana, Kibana, etc. |
| **Alerting** | Alertmanager, Grafana alerting |
| **Storage** | long-term (Thanos, Mimir) |

---

## 8. Deep Dive

This section is the heart of the document.

### 8.1 The three pillars in detail <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.1%20The%20three%20pillars%20in%20detail'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.1 The three pillars in detail" title="Ask ChatGPT about this section">💬</a>

**Metrics:** aggregated numerical measurements. Counters, gauges, histograms, summaries. Efficient for storage; good for dashboards and alerting. **Logs:** discrete events with structured data. Good for debugging; expensive at scale. **Traces:** causally-related spans across services. Show request path; expensive but invaluable.

A mature observability platform has all three. Metrics for overview; logs for context; traces for path.

### 8.2 Prometheus data model <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.2%20Prometheus%20data%20model'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.2 Prometheus data model" title="Ask ChatGPT about this section">💬</a>

```promql
http_requests_total{method="GET", path="/api/users", status="200"} 1234
```

- **Metric name:** `http_requests_total`.
- **Labels:** `method`, `path`, `status` (key-value dimensions).
- **Value:** `1234`.
- **Timestamp:** (implicit; added at scrape time).

**Metric types:**

| Type | Description |
|------|-------------|
| **Counter** | monotonically increasing; reset on restart. `rate()` for per-sec. |
| **Gauge** | arbitrary value; can go up/down. |
| **Histogram** | observations in buckets; can compute quantiles. |
| **Summary** | like histogram; quantiles pre-computed. |

### 8.3 PromQL <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.3%20PromQL'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.3 PromQL" title="Ask ChatGPT about this section">💬</a>

PromQL is the Prometheus query language:

```promql
# Request rate per second, summed across instances
rate(http_requests_total[5m])

# Error rate as percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
  / sum(rate(http_requests_total[5m]))
  * 100

# p99 latency
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Top 5 endpoints by error rate
topk(5,
  sum by (path) (rate(http_requests_total{status=~"5.."}[5m]))
)
```

### 8.4 Recording rules <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.4%20Recording%20rules'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.4 Recording rules" title="Ask ChatGPT about this section">💬</a>

Pre-compute common queries:

```yaml
groups:
  - name: api
    interval: 30s
    rules:
      - record: api:request_rate:5m
        expr: sum by (path) (rate(http_requests_total[5m]))
      - record: api:error_rate:5m
        expr: sum by (path) (rate(http_requests_total{status=~"5.."}[5m]))
```

### 8.5 Alerting rules <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.5%20Alerting%20rules'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.5 Alerting rules" title="Ask ChatGPT about this section">💬</a>

```yaml
groups:
  - name: api
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
            / sum(rate(http_requests_total[5m]))
            > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Error rate above 5%"
          description: "Service {{ $labels.service }} has {{ $value | humanizePercentage }} error rate."
```

### 8.6 Prometheus architecture <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.6%20Prometheus%20architecture'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.6 Prometheus architecture" title="Ask ChatGPT about this section">💬</a>

```mermaid
graph TB
    subgraph "Targets"
        App1[App 1]
        App2[App 2]
        App3[App 3]
    end
    Prom[Prometheus Server]
    Prom -->|scrape| App1
    Prom -->|scrape| App2
    Prom -->|scrape| App3
    Prom --> TSDB[(TSDB)]
    Prom -->|alert| AM[Alertmanager]
    AM --> PD[PagerDuty]
    AM --> Slack
```

### 8.7 Grafana dashboards <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.7%20Grafana%20dashboards'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.7 Grafana dashboards" title="Ask ChatGPT about this section">💬</a>

Grafana queries multiple datasources and visualizes them.

**Example dashboard JSON:**

```json
{
    "title": "API Overview",
    "panels": [
        {
            "title": "Request rate",
            "type": "timeseries",
            "targets": [
                {
                    "expr": "sum(rate(http_requests_total[5m]))",
                    "datasource": "Prometheus"
                }
            ]
        },
        {
            "title": "Error rate",
            "type": "stat",
            "targets": [
                {
                    "expr": "sum(rate(http_requests_total{status=~'5..'}[5m])) / sum(rate(http_requests_total[5m])) * 100"
                }
            ]
        }
    ]
}
```

### 8.8 Loki <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.8%20Loki'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.8 Loki" title="Ask ChatGPT about this section">💬</a>

Loki is a log aggregation system by Grafana Labs, designed to be cost-effective.

**Architecture:**

```mermaid
graph TB
    Promtail[Promtail]
    Loki[Loki]
    Grafana[Grafana]
    S3[(Object Storage)]

    Promtail -->|push| Loki
    Loki -->|index| S3
    Loki -->|chunks| S3
    Grafana -->|LogQL| Loki
```

**Key features:**

- **Labels:** every log line has labels (job, instance, etc.).
- **LogQL:** query language for logs.
- **No full-text indexing** — only label indices; cheap.

**LogQL example:**

```logql
{job="myapp"} |= "error" | json | level=~"error|fatal"
```

### 8.9 Jaeger <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.9%20Jaeger'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.9 Jaeger" title="Ask ChatGPT about this section">💬</a>

Jaeger is Uber's distributed tracing system (CNCF graduated).

**Architecture:**

```mermaid
graph TB
    App[App with Jaeger client]
    Agent[Jaeger Agent]
    Collector[Jaeger Collector]
    Storage[Storage: ES/Cassandra/Kafka]
    Query[Jaeger Query]
    UI[Jaeger UI]

    App -->|UDP/Thrift| Agent
    Agent --> Collector
    Collector --> Storage
    Query --> Storage
    UI --> Query
```

**Features:**

- **Distributed context propagation.**
- **Sampling** (probabilistic, rate limiting, tail-based).
- **Storage backends:** Elasticsearch, Cassandra, Kafka.
- **Service map:** visualization of dependencies.

### 8.10 Tempo <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.10%20Tempo'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.10 Tempo" title="Ask ChatGPT about this section">💬</a>

Grafana Tempo is a cost-effective tracing backend.

- **Object storage only** (S3, GCS, Azure).
- **No indexing** — by trace ID.
- **Integrated with Grafana.**
- **Compatible with Jaeger, Zipkin, OTel.**

### 8.11 OpenTelemetry <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.11%20OpenTelemetry'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.11 OpenTelemetry" title="Ask ChatGPT about this section">💬</a>

OpenTelemetry is the vendor-neutral observability SDK.

**Languages:** Java, Python, Go, JavaScript, .NET, C++, Rust, PHP, Ruby, Swift, Erlang.

**Signals:** traces, metrics, logs, baggage.

**Components:**

- **API:** specification (interfaces).
- **SDK:** implementations.
- **Collector:** proxy for export.
- **OTLP:** wire protocol.

**Auto-instrumentation:**

```java
// Java agent
java -javaagent:opentelemetry-javaagent.jar \
    -Dotel.service.name=my-app \
    -jar my-app.jar
```

```python
# Python
from opentelemetry.instrumentation.auto_instrumentation import configure_tracer_provider
configure_tracer_provider()
```

### 8.12 OpenTelemetry Collector <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.12%20OpenTelemetry%20Collector'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.12 OpenTelemetry Collector" title="Ask ChatGPT about this section">💬</a>

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

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
  otlp/jaeger:
    endpoint: jaeger:4317

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [prometheus]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp/jaeger]
```

### 8.13 Alertmanager <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.13%20Alertmanager'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.13 Alertmanager" title="Ask ChatGPT about this section">💬</a>

Alertmanager routes Prometheus alerts:

- **Grouping:** by alert name and label.
- **Inhibition:** suppress alerts when other alerts fire.
- **Silences:** temporary mute.
- **Routing:** to receivers.

```yaml
route:
  receiver: 'team-a'
  group_by: [alertname, cluster]
  routes:
    - matchers:
        - severity="critical"
      receiver: 'pagerduty'
      continue: true
    - matchers:
        - severity="warning"
      receiver: 'slack'
```

### 8.14 SLOs and error budgets <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.14%20SLOs%20and%20error%20budgets'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.14 SLOs and error budgets" title="Ask ChatGPT about this section">💬</a>

**SLI (Service Level Indicator):** measurement.

**SLO (Service Level Objective):** target value.

**Error budget:** `1 - SLO`.

**Multi-window burn rate:**

```promql
# 1-hour burn rate
sum(rate(http_requests_total{status=~"5.."}[1h]))
  / sum(rate(http_requests_total[1h]))

# Alert if 1h burn rate > 14.4 (would exhaust monthly budget in 2 days)
```

**Google SRE multi-window approach:**

- Fast burn (1h window) — page now.
- Slow burn (6h, 24h, 72h windows) — warn.

### 8.15 eBPF observability <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.15%20eBPF%20observability'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.15 eBPF observability" title="Ask ChatGPT about this section">💬</a>

eBPF (extended Berkeley Packet Filter) is a Linux kernel technology for safe in-kernel programs.

**Tools:**

- **Cilium:** K8s networking + observability.
- **Hubble:** network observability (Cilium).
- **Pixie:** New Relic's eBPF-based K8s observability.
- **Grafana Beyla:** eBPF-based APM.

**Use cases:**

- Network observability.
- Process metrics without instrumentation.
- Security observability.

### 8.16 SRE practices <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.16%20SRE%20practices'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.16 SRE practices" title="Ask ChatGPT about this section">💬</a>

**On-call:**

- Rotation.
- Runbook per alert.
- Escalation policy.

**Postmortems:**

- Blameless.
- Focus on systems.
- Action items with owners.
- Time-boxed.

**Error budgets:**

- Drive innovation velocity.
- Don't go below zero.
- Review quarterly.

**Toil reduction:**

- Automate repetitive work.
- Measure toil.
- Cap at 50% of ops time.

### 8.17 Comparison: Prometheus vs Datadog vs New Relic <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.17%20Comparison%3A%20Prometheus%20vs%20Datadog%20vs%20New%20Relic'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.17 Comparison: Prometheus vs Datadog vs New Relic" title="Ask ChatGPT about this section">💬</a>

| Dimension | Prometheus | Datadog | New Relic |
|-----------|-----------|---------|-----------|
| **Hosting** | Self-hosted | SaaS | SaaS |
| **Cost** | Free (ops cost) | $$$ | $$$ |
| **Metrics** | Native | Native | Native |
| **Logs** | Loki separate | Native | Native |
| **Traces** | Tempo/Jaeger separate | Native (APM) | Native (APM) |
| **Auto-instrumentation** | OTel agents | Excellent | Excellent |
| **Lock-in** | None | Vendor | Vendor |
| **Best for** | Self-hosted, cost | Full observability | Full observability, ease |

### 8.18 Comparison: Loki vs ELK <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.18%20Comparison%3A%20Loki%20vs%20ELK'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.18 Comparison: Loki vs ELK" title="Ask ChatGPT about this section">💬</a>

| Dimension | Loki | ELK |
|-----------|------|-----|
| **Indexing** | Labels only | Full-text |
| **Storage** | Object store | Elasticsearch |
| **Query** | LogQL | KQL or Lucene |
| **Cost** | Low | High |
| **Best for** | Cost-effective log aggregation | Full-text search |

### 8.19 Comparison: Jaeger vs Tempo <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.19%20Comparison%3A%20Jaeger%20vs%20Tempo'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.19 Comparison: Jaeger vs Tempo" title="Ask ChatGPT about this section">💬</a>

| Dimension | Jaeger | Tempo |
|-----------|--------|-------|
| **Storage** | ES / Cassandra | Object store (S3, GCS) |
| **Indexing** | Service + operation | None (by trace ID) |
| **Query** | Service map + trace | Trace ID |
| **Cost** | Higher | Lower |
| **Best for** | Service map, operational debugging | Cost-effective, Grafana integration |

### 8.20 Decision matrix <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.20%20Decision%20matrix'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.20 Decision matrix" title="Ask ChatGPT about this section">💬</a>

| Workload | Recommended |
|----------|------------|
| Self-hosted, open source | Prometheus + Grafana + Loki + Tempo + OTel |
| Full managed, ease | Datadog or New Relic |
| Logs-heavy, search | ELK |
| Cost-sensitive | Prometheus stack |
| APM-style deep tracing | Jaeger |
| Cost-effective tracing | Tempo |
| Real-time stream processing | Kafka + ksqlDB |

### 8.21 Migration paths <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'8.21%20Migration%20paths'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="8.21 Migration paths" title="Ask ChatGPT about this section">💬</a>

- **Vendor observability → open source:** Export metrics via OTLP, run Prometheus + Grafana.
- **Logs only → full stack:** Add metrics, traces.
- **Self-hosted → managed:** Hybrid; keep sensitive workloads self-hosted.

---

## 9. Architecture

### 9.1 Reference observability stack <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'9.1%20Reference%20observability%20stack'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="9.1 Reference observability stack" title="Ask ChatGPT about this section">💬</a>

```mermaid
graph TB
    subgraph "Application"
        App[App with OTel SDK]
    end
    subgraph "Collection layer"
        OTelCol[OTel Collector]
    end
    subgraph "Storage layer"
        Prom[Prometheus]
        Loki
        Tempo
    end
    subgraph "Presentation"
        Grafana
    end
    subgraph "Alerting"
        AM[Alertmanager]
        PD[PagerDuty]
    end

    App -->|OTLP| OTelCol
    OTelCol --> Prom
    OTelCol --> Loki
    OTelCol --> Tempo
    Prom --> Grafana
    Loki --> Grafana
    Tempo --> Grafana
    Prom --> AM
    AM --> PD
```

### 9.2 Trace flow <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'9.2%20Trace%20flow'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="9.2 Trace flow" title="Ask ChatGPT about this section">💬</a>

```mermaid
sequenceDiagram
    participant U as User
    participant A as Frontend
    participant B as Backend
    participant C as Database

    U->>A: GET /api/orders
    Note over A: span trace_id=T1
    A->>B: query orders
    Note over A,B: parent_span_id=T1
    B->>C: SELECT
    Note over B,C: parent_span_id=T1.b
    C-->>B: rows
    B-->>A: orders
    A-->>U: response
```

## 10. Performance

### 10.1 Cardinality <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'10.1%20Cardinality'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="10.1 Cardinality" title="Ask ChatGPT about this section">💬</a>

**Cardinality** is the number of unique label combinations.

- Low cardinality: `method=GET|POST|PUT` (~10).
- Medium cardinality: `path=/api/users` (~1000).
- **High cardinality: `user_id=12345` (millions!).**
- **Never use unbounded labels** (user_id, request_id, email).

**Best practice:** Keep cardinality < 100K per metric.

### 10.2 Log volume <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'10.2%20Log%20volume'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="10.2 Log volume" title="Ask ChatGPT about this section">💬</a>

- 1 KB per line × 1M events/day = 1 GB/day.
- Costs add up fast.
- **Sample in production** (e.g., 1% of INFO logs, 100% of ERROR).
- **Aggregate to metrics** (e.g., error count).

### 10.3 Trace sampling <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'10.3%20Trace%20sampling'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="10.3 Trace sampling" title="Ask ChatGPT about this section">💬</a>

- **Head-based:** decide at start of trace.
- **Tail-based:** decide at end of trace; keep all errors.
- **Rate limiting:** N traces per second per service.
- **Probabilistic:** 1% sampling.

```yaml
# OTel Collector
processors:
  probabilistic_sampler:
    sampling_percentage: 1
```

### 10.4 Storage costs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'10.4%20Storage%20costs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="10.4 Storage costs" title="Ask ChatGPT about this section">💬</a>

- **Metrics:** ~1-3 bytes per sample.
- **Logs:** ~500 bytes per line.
- **Traces:** ~1-5 KB per span.

Plan: 1B spans/day × 3 KB = 3 TB/day. At S3 storage rates, ~$100/day.

## 11. Security

### 11.1 Authentication <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'11.1%20Authentication'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="11.1 Authentication" title="Ask ChatGPT about this section">💬</a>

- **Prometheus:** basic auth, bearer token; OIDC via proxy.
- **Grafana:** LDAP, OAuth, OIDC, SAML.
- **Loki:** basic auth, OIDC, OAuth.
- **Tempo:** OIDC.

### 11.2 PII in logs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'11.2%20PII%20in%20logs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="11.2 PII in logs" title="Ask ChatGPT about this section">💬</a>

- **Never log PII** (email, SSN, password, credit card).
- **Redact sensitive data** in the application.
- **Encrypt logs at rest.**
- **Limit access.**

### 11.3 Compliance <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'11.3%20Compliance'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="11.3 Compliance" title="Ask ChatGPT about this section">💬</a>

- **GDPR:** right to erasure; logs must be deletable.
- **HIPAA:** encryption, access controls.
- **PCI-DSS:** no cardholder data in logs.
- **SOC 2:** access logs, audit logs.

### 11.4 Network security <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'11.4%20Network%20security'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="11.4 Network security" title="Ask ChatGPT about this section">💬</a>

- **TLS everywhere.**
- **mTLS between services.**
- **Authentication for all observability backends.**
- **Network segmentation** (observability in private subnet).

### 11.5 Secure configuration checklist <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'11.5%20Secure%20configuration%20checklist'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="11.5 Secure configuration checklist" title="Ask ChatGPT about this section">💬</a>

- [ ] TLS enabled.
- [ ] Authentication required (no anonymous).
- [ ] Authorization least privilege.
- [ ] No PII in logs.
- [ ] Logs encrypted at rest.
- [ ] Access logs audit.
- [ ] Retention policies defined.

## 12. Production Engineering

### 12.1 Multi-cluster observability <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'12.1%20Multi-cluster%20observability'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="12.1 Multi-cluster observability" title="Ask ChatGPT about this section">💬</a>

```mermaid
graph TB
    Cluster1[Cluster 1<br/>us-east-1]
    Cluster2[Cluster 2<br/>eu-west-1]
    Thanos[Thanos / Mimir<br/>global view]

    Cluster1 --> Thanos
    Cluster2 --> Thanos
    Thanos --> Grafana
```

- **Thanos:** long-term storage; cross-cluster query.
- **Mimir:** multi-tenant; Prometheus-compatible.
- **Cortex:** deprecated in favor of Mimir.

### 12.2 Multi-tenant observability <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'12.2%20Multi-tenant%20observability'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="12.2 Multi-tenant observability" title="Ask ChatGPT about this section">💬</a>

- **Mimir / Cortex:** multi-tenant by design.
- **Per-team quotas.**
- **RBAC** on data access.

### 12.3 Cost optimization <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'12.3%20Cost%20optimization'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="12.3 Cost optimization" title="Ask ChatGPT about this section">💬</a>

- **Drop unused labels** (high cardinality).
- **Sample logs** (1% of INFO, 100% of ERROR).
- **Sample traces** (1% head + tail-based for errors).
- **Retention policies** (logs: 30d; metrics: 1y; traces: 7d).
- **Storage tiering** (hot vs cold).

### 12.4 Backup and DR <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'12.4%20Backup%20and%20DR'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="12.4 Backup and DR" title="Ask ChatGPT about this section">💬</a>

- **Grafana dashboards:** versioned in Git.
- **Recording rules:** versioned in Git.
- **Alertmanager config:** versioned in Git.
- **Prometheus TSDB:** snapshot to S3 (via Thanos).
- **Loki chunks:** in S3 (already).

### 12.5 Observability as code <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'12.5%20Observability%20as%20code'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="12.5 Observability as code" title="Ask ChatGPT about this section">💬</a>

- **Prometheus:** rules in YAML, version-controlled.
- **Grafana:** dashboards via API / Terraform provider.
- **Loki:** rules in YAML.
- **OTel Collector:** config in YAML.

## 13. Production Case Studies

### 13.1 Netflix <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'13.1%20Netflix'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="13.1 Netflix" title="Ask ChatGPT about this section">💬</a>

Pioneered distributed tracing with Atlas. Operates large observability stack for streaming platform.

### 13.2 Uber <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'13.2%20Uber'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="13.2 Uber" title="Ask ChatGPT about this section">💬</a>

Operates Jaeger at scale. Built M3DB (metrics DB). Uses OpenTracing since 2015.

### 13.3 Twitter <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'13.3%20Twitter'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="13.3 Twitter" title="Ask ChatGPT about this section">💬</a>

Built Zipkin (Jaeger ancestor). Uses Prometheus for metrics. Operates observability for high-traffic platform.

### 13.4 Spotify <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'13.4%20Spotify'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="13.4 Spotify" title="Ask ChatGPT about this section">💬</a>

Uses Prometheus + Grafana. Heavy use of SLOs for service reliability.

### 13.5 Datadog <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'13.5%20Datadog'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="13.5 Datadog" title="Ask ChatGPT about this section">💬</a>

Commercial SaaS observability platform. Pioneer in unified metrics, logs, traces. Major competitor in observability.

### 13.6 Grafana Labs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'13.6%20Grafana%20Labs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="13.6 Grafana Labs" title="Ask ChatGPT about this section">💬</a>

Open source observability stack: Grafana (viz), Loki (logs), Tempo (traces), Mimir (metrics), Pyroscope (profiling), Beyla (eBPF).

## 14. Code Examples

### 14.1 Basic: Prometheus query (PromQL) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'14.1%20Basic%3A%20Prometheus%20query%20(PromQL)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="14.1 Basic: Prometheus query (PromQL)" title="Ask ChatGPT about this section">💬</a>

```promql
# Request rate per service
sum by (service) (rate(http_requests_total[5m]))

# Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
  / sum(rate(http_requests_total[5m]))
  * 100

# p99 latency
histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))

# Memory usage by pod
sum by (pod) (
  container_memory_usage_bytes{namespace="production"}
)

# Kubernetes pod restart count
sum by (namespace, pod) (kube_pod_container_status_restarts_total)
```

### 14.2 Basic: Alertmanager rule <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'14.2%20Basic%3A%20Alertmanager%20rule'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="14.2 Basic: Alertmanager rule" title="Ask ChatGPT about this section">💬</a>

```yaml
# see 03-prometheus-alerting/
```

### 14.3 Basic: Grafana dashboard (JSON) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'14.3%20Basic%3A%20Grafana%20dashboard%20(JSON)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="14.3 Basic: Grafana dashboard (JSON)" title="Ask ChatGPT about this section">💬</a>

```json
{
    "title": "Production API",
    "schemaVersion": 39,
    "panels": [
        {
            "type": "timeseries",
            "title": "Request rate",
            "gridPos": {"x": 0, "y": 0, "w": 12, "h": 8},
            "targets": [
                {
                    "expr": "sum(rate(http_requests_total[5m]))",
                    "datasource": {"type": "prometheus", "uid": "prometheus"}
                }
            ]
        }
    ]
}
```

### 14.4 Basic: OpenTelemetry instrumentation (Go) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'14.4%20Basic%3A%20OpenTelemetry%20instrumentation%20(Go)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="14.4 Basic: OpenTelemetry instrumentation (Go)" title="Ask ChatGPT about this section">💬</a>

```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/sdk/trace"
    "go.opentelemetry.io/otel/sdk/resource"
    semconv "go.opentelemetry.io/otel/semconv/v1.21.0"
)

func setupTracer() (*trace.TracerProvider, error) {
    exporter, _ := otlptracegrpc.New(ctx, otlptracegrpc.WithEndpoint("localhost:4317"))
    tp := trace.NewTracerProvider(
        trace.WithBatcher(exporter),
        trace.WithResource(resource.NewWithAttributes(
            semconv.ServiceName("my-service"),
        )),
    )
    otel.SetTracerProvider(tp)
    return tp, nil
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
    ctx, span := otel.Tracer("my-service").Start(r.Context(), "handleRequest")
    defer span.End()
    // business logic
}
```

### 14.5 Basic: Loki LogQL <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'14.5%20Basic%3A%20Loki%20LogQL'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="14.5 Basic: Loki LogQL" title="Ask ChatGPT about this section">💬</a>

```logql
# All logs from my-app
{job="my-app"}

# Errors only
{job="my-app"} |= "error"

# Parsed JSON, errors only
{job="my-app"} | json | level="error"

# Rate of errors
sum(rate({job="my-app"} |= "error" [5m]))

# Compare to previous hour
sum(count_over_time({job="my-app"}[1h])) -
  sum(count_over_time({job="my-app"}[2h]))
```

### 14.6 Bad, anti-pattern, refactored, secure, performance-optimized examples <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'14.6%20Bad%2C%20anti-pattern%2C%20refactored%2C%20secure%2C%20performance-optimized%20examples'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="14.6 Bad, anti-pattern, refactored, secure, performance-optimized examples" title="Ask ChatGPT about this section">💬</a>

**Bad: high cardinality label**

```promql
http_requests_total{user_id="12345"} 1234
```

**Anti-pattern: no structure**

```text
# 2024-01-15 10:23:45 ERROR: User not found
```

**Refactored: structured logging**

```json
{"timestamp": "2024-01-15T10:23:45Z", "level": "error", "message": "User not found", "user_id": "u12345", "trace_id": "abc"}
```

**Secure: redact PII**

```python
logger.info("User action", extra={"user_id": user.id, "action": "login"})
# Never: logger.info(f"User {user.email} logged in with password {password}")
```

**Performance-optimized: bounded cardinality**

```promql
http_requests_total{method="GET", path="/api/users"} 1234
# Not: user_id, request_id, email
```

## 15. Common Mistakes

### 15.1 Beginner mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.1%20Beginner%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.1 Beginner mistakes" title="Ask ChatGPT about this section">💬</a>

- **High cardinality labels:** metrics explosion.
- **No structured logs:** impossible to query.
- **No trace propagation:** can't see request path.
- **Logging in hot path:** CPU and I/O.

### 15.2 Intermediate mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.2%20Intermediate%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.2 Intermediate mistakes" title="Ask ChatGPT about this section">💬</a>

- **No sampling:** all traces; storage cost.
- **Alert on everything:** alert fatigue.
- **No runbooks:** on-call doesn't know what to do.
- **No SLOs:** no target.
- **No log retention policy:** storage cost.

### 15.3 Senior mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.3%20Senior%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.3 Senior mistakes" title="Ask ChatGPT about this section">💬</a>

- **Vendor lock-in:** hard to migrate.
- **No observability budget:** cost overruns.
- **No blameless postmortems:** same incidents recur.
- **Manual dashboards:** drift.
- **No error budget consumption tracking:** "more reliable than SLO" kills innovation.

### 15.4 Production mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.4%20Production%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.4 Production mistakes" title="Ask ChatGPT about this section">💬</a>

- **Single point of failure:** observability down = can't debug.
- **Not testing observability:** alerts broken, no one notices.
- **No retention policy:** disk fills.
- **No SLI/SLO definition:** meaningless metrics.
- **No SLO review:** SLOs become unrealistic.

### 15.5 Migration mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.5%20Migration%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.5 Migration mistakes" title="Ask ChatGPT about this section">💬</a>

- **Big-bang migration:** high risk.
- **No data model:** metrics without labels are useless.
- **No retention strategy:** cost overrun.

### 15.6 Configuration mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.6%20Configuration%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.6 Configuration mistakes" title="Ask ChatGPT about this section">💬</a>

- **Prometheus without limits:** cardinality explosion.
- **Loki without limits:** disk full.
- **Grafana without auth:** data leak.

### 15.7 Security mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.7%20Security%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.7 Security mistakes" title="Ask ChatGPT about this section">💬</a>

- **PII in logs:** compliance violation.
- **No auth on observability:** data leak.
- **No encryption:** man-in-the-middle.

### 15.8 Performance mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.8%20Performance%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.8 Performance mistakes" title="Ask ChatGPT about this section">💬</a>

- **High cardinality:** query slowness; OOM.
- **No downsampling:** storage cost.
- **Synchronous instrumentation:** app slowdown.

### 15.9 Debugging mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.9%20Debugging%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.9 Debugging mistakes" title="Ask ChatGPT about this section">💬</a>

- **Restarting without logs:** lose state.
- **Only metrics, no traces:** can't see the path.
- **No correlation ID:** can't correlate logs/metrics/traces.

### 15.10 Deployment mistakes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'15.10%20Deployment%20mistakes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="15.10 Deployment mistakes" title="Ask ChatGPT about this section">💬</a>

- **No IaC for observability config:** drift.
- **No version control:** errors on git.

## 16. Debugging

### 16.1 Using traces <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'16.1%20Using%20traces'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="16.1 Using traces" title="Ask ChatGPT about this section">💬</a>

1. Get a trace ID from the user's request (response header, error message).
2. Search in Tempo / Jaeger: `trace=<id>`.
3. Look for the slowest span or error span.
4. Drill into the span's logs and metrics.

### 16.2 Using logs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'16.2%20Using%20logs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="16.2 Using logs" title="Ask ChatGPT about this section">💬</a>

1. Identify the service from the user's request.
2. Query Loki: `{service="X"} |~ "error"`.
3. Look for trace_id; pivot to trace.

### 16.3 Using metrics <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'16.3%20Using%20metrics'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="16.3 Using metrics" title="Ask ChatGPT about this section">💬</a>

1. Look at RED metrics for the service.
2. Check anomalies (latency, error rate, request rate).
3. Check dependencies (DB latency, downstream call rate).

### 16.4 Common debugging scenarios <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'16.4%20Common%20debugging%20scenarios'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="16.4 Common debugging scenarios" title="Ask ChatGPT about this section">💬</a>

- **High latency:** Check p99 latency, look at slow DB queries, GC pauses.
- **High error rate:** Look at error logs by status code, check recent deployments.
- **Service down:** Check pod status, recent restarts, network connectivity.
- **Memory leak:** Heap dump analysis; check old generation.

### 16.5 Production troubleshooting checklist <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'16.5%20Production%20troubleshooting%20checklist'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="16.5 Production troubleshooting checklist" title="Ask ChatGPT about this section">💬</a>

- [ ] Capture trace ID.
- [ ] Search logs by trace ID.
- [ ] Look at metrics around the time.
- [ ] Check recent deployments.
- [ ] Check upstream/downstream services.
- [ ] Engage on-call rotation.

## 17. Monitoring & Observability

### 17.1 Three pillars recap <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'17.1%20Three%20pillars%20recap'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="17.1 Three pillars recap" title="Ask ChatGPT about this section">💬</a>

- **Metrics:** Prometheus / Grafana Mimir.
- **Logs:** Loki / Elasticsearch.
- **Traces:** Tempo / Jaeger.

### 17.2 RED method (for services) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'17.2%20RED%20method%20(for%20services)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="17.2 RED method (for services)" title="Ask ChatGPT about this section">💬</a>

- **Rate** of requests.
- **Errors** (count or rate).
- **Duration** (latency).

### 17.3 USE method (for resources) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'17.3%20USE%20method%20(for%20resources)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="17.3 USE method (for resources)" title="Ask ChatGPT about this section">💬</a>

- **Utilization** (% time busy).
- **Saturation** (queue depth).
- **Errors** (event count).

### 17.4 Four Golden Signals (Google SRE) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'17.4%20Four%20Golden%20Signals%20(Google%20SRE)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="17.4 Four Golden Signals (Google SRE)" title="Ask ChatGPT about this section">💬</a>

- **Latency.**
- **Traffic.**
- **Errors.**
- **Saturation.**

### 17.5 Alerting <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'17.5%20Alerting'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="17.5 Alerting" title="Ask ChatGPT about this section">💬</a>

- **Symptom-based** (user-visible).
- **SLO-based** (with burn rate).
- **Page for critical; warn for warning.**

## 18. Best Practices

### 18.1 Industry best practices <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.1%20Industry%20best%20practices'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.1 Industry best practices" title="Ask ChatGPT about this section">💬</a>

- **Instrument with OpenTelemetry** (vendor-neutral).
- **Three pillars all in use.**
- **Structured logs** (JSON, with trace_id).
- **Bounded cardinality** (no user_id labels).
- **SLO-based alerting.**
- **Blameless postmortems.**
- **Runbooks for every alert.**
- **Observability as code** (versioned in Git).
- **Sampling** (head or tail-based).
- **Multi-tenant** (per team, per env).

### 18.2 Enterprise practices <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.2%20Enterprise%20practices'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.2 Enterprise practices" title="Ask ChatGPT about this section">💬</a>

- **Observability platform team.**
- **Standardize instrumentation library.**
- **SLO governance.**
- **Cost monitoring.**
- **Chaos engineering.**

### 18.3 Clean code <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.3%20Clean%20code'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.3 Clean code" title="Ask ChatGPT about this section">💬</a>

- **Structured logging only.**
- **No PII in logs.**
- **Propagate trace context** (OTel SDK does this).

### 18.4 Reliability <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.4%20Reliability'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.4 Reliability" title="Ask ChatGPT about this section">💬</a>

- **Redundant collectors.**
- **Long-term storage** (Thanos, Mimir).
- **Backup dashboards.**

### 18.5 Security <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.5%20Security'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.5 Security" title="Ask ChatGPT about this section">💬</a>

- **TLS everywhere.**
- **Auth on observability backends.**
- **No PII in logs.**
- **Encryption at rest.**

### 18.6 Performance <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.6%20Performance'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.6 Performance" title="Ask ChatGPT about this section">💬</a>

- **Bounded cardinality.**
- **Sampling.**
- **Drop unused labels.**
- **Retention policies.**

### 18.7 Cost <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.7%20Cost'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.7 Cost" title="Ask ChatGPT about this section">💬</a>

- **Sampled logs.**
- **Storage tiering.**
- **Right-size metrics.**

### 18.8 Deployment <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'18.8%20Deployment'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="18.8 Deployment" title="Ask ChatGPT about this section">💬</a>

- **Observability as code.**
- **Version controlled.**
- **CI/CD for dashboards.**

## 19. Anti-Patterns

### 19.1 High cardinality <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.1%20High%20cardinality'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.1 High cardinality" title="Ask ChatGPT about this section">💬</a>

```promql
http_requests_total{user_id="12345"} 1234  # millions of user_ids
```

**Fix:** Use a sample, or aggregate to session_id.

### 19.2 Unstructured logs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.2%20Unstructured%20logs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.2 Unstructured logs" title="Ask ChatGPT about this section">💬</a>

```text
"2024-01-15 10:23:45 INFO user logged in u12345"
```

**Fix:** Use JSON: `{"ts": ..., "level": "info", "msg": "user logged in", "user_id": "u12345"}`.

### 19.3 No trace propagation <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.3%20No%20trace%20propagation'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.3 No trace propagation" title="Ask ChatGPT about this section">💬</a>

Different services using different trace IDs.

**Fix:** Use OpenTelemetry SDK; propagates via W3C Trace Context.

### 19.4 Alert fatigue <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.4%20Alert%20fatigue'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.4 Alert fatigue" title="Ask ChatGPT about this section">💬</a>

```yaml
- alert: high_cpu
  expr: cpu_usage > 50  # not actionable
```

**Fix:** Alert on user-visible symptoms with SLO burn rate.

### 19.5 No labels <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.5%20No%20labels'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.5 No labels" title="Ask ChatGPT about this section">💬</a>

```promql
http_requests_total 1234  # no dimensions
```

**Fix:** Add labels for method, path, status.

### 19.6 Sampling incorrectly <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.6%20Sampling%20incorrectly'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.6 Sampling incorrectly" title="Ask ChatGPT about this section">💬</a>

- 100% sampling in production: storage cost.
- 0% sampling in production: no traces.

**Fix:** 1% head + 100% tail for errors.

### 19.7 Logs without trace ID <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.7%20Logs%20without%20trace%20ID'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.7 Logs without trace ID" title="Ask ChatGPT about this section">💬</a>

```json
{"timestamp": "...", "level": "error", "message": "..."}
```

**Fix:** Include trace_id and span_id in every log.

### 19.8 Dashboards without SLOs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'19.8%20Dashboards%20without%20SLOs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="19.8 Dashboards without SLOs" title="Ask ChatGPT about this section">💬</a>

Dashboard shows metrics, but no connection to business goals.

**Fix:** Every dashboard panel has an SLO context.

## 20. Edge Cases

### 20.1 Clock skew <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'20.1%20Clock%20skew'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="20.1 Clock skew" title="Ask ChatGPT about this section">💬</a>

Different servers have different times. Affects logs, traces.

**Mitigation:** NTP; monotonic clocks; logical clocks in OTel.

### 20.2 Missing data <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'20.2%20Missing%20data'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="20.2 Missing data" title="Ask ChatGPT about this section">💬</a>

Some services don't report metrics. Or gaps in time series.

**Mitigation:** `absent()` alerts; long-term storage handles gaps.

### 20.3 High cardinality explosion <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'20.3%20High%20cardinality%20explosion'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="20.3 High cardinality explosion" title="Ask ChatGPT about this section">💬</a>

A test deploy adds `test_id` label. Suddenly billions of unique combinations.

**Mitigation:** Cardinality limits; schema validation.

### 20.4 Cardinality drift <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'20.4%20Cardinality%20drift'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="20.4 Cardinality drift" title="Ask ChatGPT about this section">💬</a>

Slowly growing over time; eventually hits limits.

**Mitigation:** Periodic cardinality audits.

### 20.5 Storage costs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'20.5%20Storage%20costs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="20.5 Storage costs" title="Ask ChatGPT about this section">💬</a>

Logs grow unbounded; storage bill explodes.

**Mitigation:** Retention policies; sampling.

### 20.6 Log loss <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'20.6%20Log%20loss'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="20.6 Log loss" title="Ask ChatGPT about this section">💬</a>

Lost spans due to buffer overflow.

**Mitigation:** Persistent queue; backpressure; circuit breakers.

### 20.7 Provider outage <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'20.7%20Provider%20outage'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="20.7 Provider outage" title="Ask ChatGPT about this section">💬</a>

CloudWatch / Datadog / etc. is down.

**Mitigation:** Local observability backup; multi-provider strategy.

---

## 21. Comparisons

### 21.1 Prometheus vs Datadog vs New Relic <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'21.1%20Prometheus%20vs%20Datadog%20vs%20New%20Relic'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="21.1 Prometheus vs Datadog vs New Relic" title="Ask ChatGPT about this section">💬</a>

| Dimension | Prometheus | Datadog | New Relic |
|-----------|-----------|---------|-----------|
| **Hosting** | Self-hosted | SaaS | SaaS |
| **Cost** | Free (ops cost) | $$ | $$ |
| **Metrics** | Native | Native | Native |
| **Logs** | Loki separate | Native | Native |
| **Traces** | Tempo/Jaeger separate | Native (APM) | Native (APM) |
| **Profiling** | Pyroscope (add-on) | Continuous | Continuous |
| **Auto-instrumentation** | OTel agents | Excellent | Excellent |
| **Lock-in** | None | Vendor | Vendor |
| **Best for** | Self-hosted, cost | Full stack, ease | Full stack, ease |

### 21.2 Loki vs Elasticsearch <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'21.2%20Loki%20vs%20Elasticsearch'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="21.2 Loki vs Elasticsearch" title="Ask ChatGPT about this section">💬</a>

| Dimension | Loki | Elasticsearch |
|-----------|------|---------------|
| **Indexing** | Labels only | Full-text |
| **Storage** | Object store | Lucene segments |
| **Query** | LogQL | KQL or Lucene |
| **Cost** | Low | High |
| **Full-text search** | Limited | Excellent |
| **Best for** | Cost-effective, label-based | Full-text search, complex queries |

### 21.3 Jaeger vs Tempo <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'21.3%20Jaeger%20vs%20Tempo'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="21.3 Jaeger vs Tempo" title="Ask ChatGPT about this section">💬</a>

| Dimension | Jaeger | Tempo |
|-----------|--------|-------|
| **Storage** | ES / Cassandra | Object store (S3, GCS) |
| **Indexing** | Service + operation | None (by trace ID) |
| **Query** | Service map + trace ID | Trace ID only |
| **Service map** | Yes | No (use metrics) |
| **Cost** | Higher | Lower |
| **Best for** | Service map, ops debugging | Cost-effective, Grafana integration |

### 21.4 ELK vs Grafana stack <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'21.4%20ELK%20vs%20Grafana%20stack'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="21.4 ELK vs Grafana stack" title="Ask ChatGPT about this section">💬</a>

| Dimension | ELK | Grafana Stack |
|-----------|-----|---------------|
| **Logs** | Elasticsearch | Loki |
| **Metrics** | Limited | Prometheus / Mimir |
| **Traces** | APM in Elastic | Tempo / Jaeger |
| **Search** | Excellent | Limited (label-based) |
| **Cost** | High | Low |
| **Lock-in** | ELK stack | None (open) |
| **Best for** | Full-text search, existing Elastic | Open source, cost |

### 21.5 OpenTelemetry vs vendor SDKs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'21.5%20OpenTelemetry%20vs%20vendor%20SDKs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="21.5 OpenTelemetry vs vendor SDKs" title="Ask ChatGPT about this section">💬</a>

| Dimension | OTel | Vendor SDKs (Datadog, New Relic) |
|-----------|------|-------------------------------------|
| **Vendor neutral** | Yes | No |
| **Auto-instrumentation** | Good | Often better |
| **Backend** | Any | Vendor's |
| **Lock-in** | None | Vendor |
| **Best for** | Portability, future | Best vendor experience |

### 21.6 Decision matrix <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'21.6%20Decision%20matrix'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="21.6 Decision matrix" title="Ask ChatGPT about this section">💬</a>

| Workload | Recommended |
|----------|------------|
| Self-hosted, cost | Prometheus + Grafana + Loki + Tempo + OTel |
| Full managed, ease | Datadog or New Relic |
| Logs-heavy, search | ELK |
| Cost-sensitive logs | Loki |
| APM-style deep tracing | Jaeger or Datadog APM |
| Cost-effective tracing | Tempo |
| Multi-tenant SaaS | Mimir + Loki + Tempo + Grafana |
| Existing Elastic | ELK |

### 21.7 Migration paths <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'21.7%20Migration%20paths'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="21.7 Migration paths" title="Ask ChatGPT about this section">💬</a>

- **Vendor → open source:** Export OTLP, run Prometheus + Grafana.
- **Logs only → full stack:** Add metrics (Micrometer), traces (OTel).
- **Self-hosted → managed:** Hybrid; keep sensitive workloads.
- **OpenTracing → OpenTelemetry:** change imports; same concepts.

---

## 22. Interview Preparation

### 22.1 Beginner (0-1 years) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.1%20Beginner%20(0-1%20years)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.1 Beginner (0-1 years)" title="Ask ChatGPT about this section">💬</a>

**Q1: What are the three pillars of observability?**
**A:** Metrics (aggregated numerical measurements), logs (discrete events), and traces (causally-related spans across distributed systems).

**Q2: What is Prometheus?**
**A:** An open-source monitoring system with a dimensional data model, a query language (PromQL), and an alerting mechanism. Pulls metrics from targets via HTTP.

**Q3: What is Grafana?**
**A:** An open-source visualization and dashboarding tool that queries multiple datasources (Prometheus, Loki, Tempo, Elasticsearch) and displays them.

**Q4: What is a span?**
**A:** A unit of work in a distributed trace. Has a name, trace ID, span ID, parent span ID, attributes, events, and start/end times.

**Q5: What is structured logging?**
**A:** Logs in a structured format (JSON, Protobuf) rather than free-form text. Easier to query, filter, and analyze.

### 22.2 Junior (1-2 years) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.2%20Junior%20(1-2%20years)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.2 Junior (1-2 years)" title="Ask ChatGPT about this section">💬</a>

**Q6: What is the RED method?**
**A:** Rate (requests per second), Errors (count or rate), Duration (latency). For monitoring services.

**Q7: What is the difference between metrics and logs?**
**A:** Metrics are aggregated numerical data; good for dashboards and alerting. Logs are discrete events with structured data; good for debugging specific instances.

**Q8: What is OpenTelemetry?**
**A:** A vendor-neutral observability SDK and specification. Provides APIs and SDKs for traces, metrics, and logs across many languages.

**Q9: What is a service level indicator (SLI)?**
**A:** A measurement of service quality. E.g., request latency p99, error rate, throughput.

**Q10: What is a service level objective (SLO)?**
**A:** A target value of an SLI. E.g., 99.9% of requests succeed over 30 days.

### 22.3 Mid (2-4 years) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.3%20Mid%20(2-4%20years)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.3 Mid (2-4 years)" title="Ask ChatGPT about this section">💬</a>

**Q11: How do you implement distributed tracing?**
**A:** (1) Instrument with OTel SDK. (2) Each request gets trace ID. (3) Each service adds span. (4) Propagate trace context (W3C Trace Context). (5) Send spans to Jaeger/Tempo. (6) Query by trace ID in Grafana.

**Q12: How do you design a Grafana dashboard?**
**A:** (1) Top-level: user-visible (latency, error rate, request rate). (2) Drill-down: dependencies, resources. (3) Use variables for time range, environment, region. (4) Avoid high-cardinality queries. (5) Connect to SLOs.

**Q13: What is cardinality in Prometheus?**
**A:** The number of unique time series for a metric. `http_requests_total{method="GET", status="200"}` has 2 × 2 = 4 combinations; with `user_id` it could be millions. Keep cardinality bounded.

**Q14: How do you reduce alert fatigue?**
**A:** (1) Alert on user-visible symptoms, not causes. (2) SLO-based with multi-window burn rate. (3) Use inhibition to suppress dependent alerts. (4) Use silences for known events. (5) Tune thresholds; remove noisy alerts.

**Q15: What is the difference between push and pull metrics?**
**A:** Push: services send metrics to a collector (StatsD). Pull: collector scrapes /metrics endpoint (Prometheus). Pull is simpler; push is better for batch jobs and high-frequency metrics.

**Q16: How do you handle log volumes at scale?**
**A:** (1) Sample in production (1% of INFO, 100% of ERROR). (2) Aggregate to metrics. (3) Use Loki (label-based, not full-text). (4) Lifecycle / retention policies. (5) Tiered storage (hot vs cold).

### 22.4 Senior (4-6 years) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.4%20Senior%20(4-6%20years)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.4 Senior (4-6 years)" title="Ask ChatGPT about this section">💬</a>

**Q17: How do you implement SLO-based alerting?**
**A:** (1) Define SLIs and SLOs. (2) Compute error budget. (3) Use multi-window burn rate (e.g., 1h burn rate > 14.4x). (4) Page on fast burn, warn on slow burn. (5) Track burn rate over time.

**Q18: How do you design a tracing system for microservices?**
**A:** (1) Standardize on OTel SDK. (2) Auto-instrumentation where possible. (3) Sampling: head + tail-based. (4) Propagate context via W3C Trace Context. (5) Backend: Tempo (cost-effective) or Jaeger (service map). (6) Connect to logs by trace ID.

**Q19: How do you design a multi-tenant observability platform?**
**A:** (1) Use Mimir (metrics), Loki (logs), Tempo (traces) — all multi-tenant by design. (2) Per-team quotas. (3) RBAC on data access. (4) Per-tenant retention policies. (5) Self-service via provisioning.

**Q20: How do you handle observability cost at scale?**
**A:** (1) Cardinality limits. (2) Log sampling. (3) Trace sampling. (4) Retention policies. (5) Storage tiering (S3 for cold). (6) Compression. (7) Aggregated metrics vs raw logs.

**Q21: How do you debug a distributed incident?**
**A:** (1) Get trace ID from user report. (2) Find the slow / error span. (3) Look at logs by trace ID. (4) Look at metrics for the service. (5) Check recent deployments. (6) Check upstream / downstream. (7) Engage on-call. (8) Postmortem.

### 22.5 Lead (6-8 years) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.5%20Lead%20(6-8%20years)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.5 Lead (6-8 years)" title="Ask ChatGPT about this section">💬</a>

**Q22: How do you evaluate observability vendors?**
**A:** (1) Cost at your scale. (2) Coverage (metrics, logs, traces, profiling). (3) Lock-in (avoid where possible). (4) Onboarding time. (5) Reliability (SLA, multi-region). (6) Integration (PagerDuty, Slack, etc.).

**Q23: How do you implement observability as code?**
**A:** (1) Prometheus rules in YAML, version-controlled. (2) Grafana dashboards via provisioning API or Terraform. (3) Loki rules in YAML. (4) OTel Collector config in YAML. (5) CI/CD for dashboards and rules.

**Q24: How do you design a global observability platform?**
**A:** (1) Multi-region collectors. (2) Long-term storage (Thanos / Mimir / Cortex). (3) Federation (Prometheus federation; OTel Collector). (4) Single pane of glass (Grafana). (5) SLO-based alerting. (6) Per-region cost tracking.

### 22.6 Staff (8-12 years) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.6%20Staff%20(8-12%20years)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.6 Staff (8-12 years)" title="Ask ChatGPT about this section">💬</a>

**Q25: How do you evolve observability over years?**
**A:** (1) Start with managed (Datadog, New Relic). (2) Migrate to open source for cost (Prometheus, Grafana). (3) Add eBPF for deeper observability. (4) Add profiling (Pyroscope). (5) Add user experience monitoring (RUM). (6) Continuous improvement.

**Q26: How do you build an SRE practice?**
**A:** (1) Define SLOs first. (2) Use error budgets. (3) Blameless postmortems. (4) Toil reduction. (5) On-call rotation. (6) Runbooks. (7) Chaos engineering. (8) Continuous improvement culture.

### 22.7 Principal / Architect <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.7%20Principal%20%2F%20Architect'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.7 Principal / Architect" title="Ask ChatGPT about this section">💬</a>

**Q27: When would you choose not to instrument something?**
**A:** (1) Performance-critical hot path. (2) Already over-instrumented (overhead > value). (3) Doesn't matter to user. (4) Can be inferred from other signals.

**Q28: How do you measure observability maturity?**
**A:** Crawl: metrics only. Walk: logs and dashboards. Run: traces and SLOs. Fly: proactive, automated, custom instrumentation. Use the observability maturity model.

### 22.8 Scenario-based questions <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'22.8%20Scenario-based%20questions'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="22.8 Scenario-based questions" title="Ask ChatGPT about this section">💬</a>

**Scenario 1:** Service latency is 10x higher than normal. How do you debug?
**Answer:** (1) Check RED metrics (rate, errors, duration). (2) Look at recent deploys. (3) Check resource usage (CPU, memory, GC). (4) Check dependencies (DB latency, downstream services). (5) Look at traces for the slow path. (6) Check log errors. (7) Use continuous profiling (Pyroscope) if available.

**Scenario 2:** Prometheus storage is growing fast. How do you reduce it?
**Answer:** (1) Identify high-cardinality labels (`topk` by cardinality). (2) Drop unused metrics. (3) Add recording rules to pre-aggregate. (4) Use long-term storage (Thanos / Mimir) for older data. (5) Reduce retention.

**Scenario 3:** A service is dropping requests. Logs show nothing. How do you debug?
**Answer:** (1) Check metrics — is the service even receiving requests? (2) Check network — DNS, firewall, service mesh. (3) Check resource limits — is it being OOMKilled? (4) Check recent deploys. (5) Check upstream / downstream.

**Scenario 4:** SLO breach at 3 AM. On-call responds. How do they respond?
**Answer:** (1) Open runbook. (2) Check alerts for context. (3) Check recent changes. (4) Look at dashboards. (5) If user-visible, communicate via status page. (6) Mitigate (rollback, scale, fix). (7) After resolution, postmortem (blameless).

---

## 23. References

### 23.1 Official documentation <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'23.1%20Official%20documentation'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="23.1 Official documentation" title="Ask ChatGPT about this section">💬</a>

- **Prometheus:** <https://prometheus.io/docs/>
- **Grafana:** <https://grafana.com/docs/>
- **OpenTelemetry:** <https://opentelemetry.io/docs/>
- **Loki:** <https://grafana.com/oss/loki/>
- **Tempo:** <https://grafana.com/oss/tempo/>
- **Jaeger:** <https://www.jaegertracing.io/docs/>
- **Elastic Stack:** <https://www.elastic.co/guide/index.html>
- **Alertmanager:** <https://prometheus.io/docs/alerting/latest/alertmanager/>

### 23.2 Foundational papers <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'23.2%20Foundational%20papers'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="23.2 Foundational papers" title="Ask ChatGPT about this section">💬</a>

- **"Dapper, a Large-Scale Distributed Systems Tracing Infrastructure"** — Google (2010). The precursor to OpenTelemetry.
- **"SRE Book"** — Google (free online). <https://sre.google/sre-book/table-of-contents/>
- **"Observability Engineering"** — Majors, Hochstein, Miranda (O'Reilly).
- **"Distributed Systems Observability"** — Cindy Sridharan (O'Reilly). Free online.
- **"W3C Trace Context"** — W3C Recommendation. <https://www.w3.org/TR/trace-context/>

### 23.3 Books <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'23.3%20Books'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="23.3 Books" title="Ask ChatGPT about this section">💬</a>

- *Prometheus: Up & Running* — Brian Brazil (O'Reilly).
- *Observability Engineering* — Charity Majors, Lorin Hochstein, George Miranda (O'Reilly).
- *Site Reliability Engineering* — Betsy Beyer et al. (O'Reilly). Free online.
- *The Site Reliability Workbook* — Betsy Beyer et al. (O'Reilly). Free online.
- *Distributed Systems Observability* — Cindy Sridharan (O'Reilly). Free online.
- *Mastering OpenTelemetry* — (planned).
- *Database Reliability Engineering* — Laine Campbell, Charity Majors (O'Reilly).
- *Cloud FinOps* — J.R. Storment, Mike Fuller (O'Reilly).

### 23.4 Engineering blogs <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'23.4%20Engineering%20blogs'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="23.4 Engineering blogs" title="Ask ChatGPT about this section">💬</a>

- **Grafana Blog:** <https://grafana.com/blog/
- **OpenTelemetry Blog:** <https://opentelemetry.io/blog/
- **CNCF Blog:** <https://www.cncf.io/blog/
- **Increment Magazine:** <https://increment.com/
- **Brendan Gregg's blog:** <https://www.brendangregg.com/
- **Charity Majors' blog:** <https://charity.wtf/
- **Honeycomb blog:** <https://www.honeycomb.io/blog/

### 23.5 Tools <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'23.5%20Tools'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="23.5 Tools" title="Ask ChatGPT about this section">💬</a>

- **Prometheus:** <https://prometheus.io/>
- **Grafana:** <https://grafana.com/>
- **Loki / Tempo / Mimir / Pyroscope / Beyla / Faro / k6:** Grafana Labs.
- **OpenTelemetry:** <https://opentelemetry.io/>
- **Jaeger:** <https://www.jaegertracing.io/>
- **Elastic Stack:** <https://www.elastic.co/elastic-stack/
- **Thanos:** <https://thanos.io/>
- **Cortex:** <https://cortexmetrics.io/> (deprecated in favor of Mimir)
- **VictoriaMetrics:** <https://victoriametrics.com/>
- **InfluxDB:** <https://www.influxdata.com/>

### 23.6 Conferences <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'23.6%20Conferences'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="23.6 Conferences" title="Ask ChatGPT about this section">💬</a>

- **KubeCon + CloudNativeCon:** Observability track.
- **SREcon:** annual.
- **GrafanaCon:** annual.
- **PromCon:** annual.

### 23.7 Free online resources <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'23.7%20Free%20online%20resources'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="23.7 Free online resources" title="Ask ChatGPT about this section">💬</a>

- **Prometheus course:** <https://training.prometheus.io/>
- **Grafana tutorials:** <https://grafana.com/tutorials/>
- **OpenTelemetry bootcamp:** <https://opentelemetry.io/docs/bootcamp/
- **Google SRE Coursera:** <https://www.coursera.org/specializations/site-reliability-engineering>
- **Honeycomb Observability 101:** <https://www.honeycomb.io/blog/2017/12/observability-101-terminology-and-concepts/>

---

## Appendix A: PromQL Cheat Sheet

```promql
# Rate (per second over time window)
rate(metric[5m])

# Sum by label
sum by (label) (metric)

# Average
avg by (label) (metric)

# Top K
topk(5, metric)

# Quantile from histogram
histogram_quantile(0.99, rate(metric_bucket[5m]))

# Predicted value
predict_linear(metric[1h], 4*3600)

# Increase over time window
increase(metric[1h])

# Filter
metric{label="value"}

# Regex
metric{label=~"value.*"}

# Negative regex
metric{label!~"debug.*"}

# And / or
metric{a="1"} and metric{b="2"}
metric{a="1"} or metric{b="2"}

# Arithmetic
metric_a / metric_b
rate(metric[5m]) * 60  # per minute
```

## Appendix B: OpenTelemetry SDK Quick Start (Go)

```go
// see 11-opentelemetry-instrumentation/
```

## Appendix C: Glossary

| Term | Definition |
|------|-----------|
| **APM** | Application Performance Monitoring |
| **CDN** | Content Delivery Network |
| **DLQ** | Dead Letter Queue |
| **eBPF** | Extended Berkeley Packet Filter |
| **Grafana Mimir** | Multi-tenant Prometheus-compatible metrics |
| **Grafana Pyroscope** | Continuous profiling |
| **Grafana Faro** | Frontend observability |
| **InfluxDB** | Time-series database |
| **Jaeger** | Distributed tracing (Uber) |
| **Loki** | Log aggregation (Grafana) |
| **M3DB** | Metrics database (Uber) |
| **OTLP** | OpenTelemetry Line Protocol |
| **OpenTelemetry (OTel)** | Vendor-neutral observability SDK |
| **OpenTracing** | Predecessor to OpenTelemetry |
| **PII** | Personally Identifiable Information |
| **RED method** | Rate, Errors, Duration |
| **SLO** | Service Level Objective |
| **SLI** | Service Level Indicator |
| **SRE** | Site Reliability Engineering |
| **TSDB** | Time Series Database |
| **USE method** | Utilization, Saturation, Errors |
| **W3C** | World Wide Web Consortium |

---

*End of document. Total: 23 sections + 3 appendices.*

*Companion resources:*
- *Source: [`observability.md`](./observability.md)*
- *Prometheus: [`references/prometheus-docs.md`](./references/prometheus-docs.md)*
- *Grafana: [`references/grafana-docs.md`](./references/grafana-docs.md)*
- *OpenTelemetry: [`references/opentelemetry-docs.md`](./references/opentelemetry-docs.md)*
- *SRE books: [`references/sre-books.md`](./references/sre-books.md)*
- *Code examples: [`examples/`](./examples/) (14 observability examples)*