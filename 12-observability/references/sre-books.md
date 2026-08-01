# SRE Books Reference

This file catalogs the books on Site Reliability Engineering (SRE) and observability that the Observability document draws from.

## SRE books

- *Site Reliability Engineering* — Betsy Beyer, Chris Jones, Jennifer Petoff, Niall Murphy (O'Reilly). **The SRE book.** Free online at <https://sre.google/sre-book/table-of-contents/>.
- *The Site Reliability Workbook* — Betsy Beyer et al. (O'Reilly). Free online at <https://sre.google/workbook/table-of-contents/>.
- *Observability Engineering* — Charity Majors, Lorin Hochstein, George Miranda (O'Reilly). Free online.
- *Seeking SRE* — David N. Blank-Edelman (O'Reilly).
- *Building Secure & Reliable Systems* — Betsy Beyer, Max Saltonstall, Paul Blankinship, Piotr Lewandowski, Anne Bertuch (O'Reilly). Free online.
- *Google SRE Resources:** <https://sre.google/>

## Observability books

- *Observability Engineering* — Charity Majors et al. (O'Reilly).
- *Distributed Systems Observability* — Cindy Sridharan (O'Reilly). Free online.
- *Mastering Observability* — (planned).
- *Real World SRE* — Nat Welch (packt).

## Related books

- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly). Free online.
- *Cloud FinOps* — J.R. Storment, Mike Fuller (O'Reilly).
- *Database Reliability Engineering* — Laine Campbell, Charity Majors (O'Reilly).
- *Production-Ready Microservices* — Susan Fowler (O'Reilly). Free online.

## SRE principles

- **Service Level Objectives (SLOs):** target reliability.
- **Error budgets:** inverse of unreliability.
- **Eliminating toil:** automate repetitive work.
- **Postmortem culture:** blameless; learn from incidents.
- **Blameless postmortems:** Google practice.
- **Error budgets:** drive innovation velocity.

## SRE resources

- **Google SRE book:** <https://sre.google/sre-book/table-of-contents/>
- **Google SRE workbook:** <https://sre.google/workbook/table-of-contents/>
- **USENIX SREcon:** annual conference.
- **SREcon EMEA, Asia.**
- **Increment magazine:** <https://increment.com/>
- **r/sre:** Reddit community.
- **SRE Weekly newsletter:** <https://sreweekly.com/>

## Incident response

- **NIST IR framework:** <https://csrc.nist.gov/publications/detail/sp/800-61/rev-3/final>
- **PagerDuty IR guide:** <https://response.pagerduty.com/>
- **Atlassian IR:** <https://www.atlassian.com/incident-management/handbook/**

## Error budgets

- **Definition:** `1 - SLO`.
- **Burn rate:** rate at which the error budget is being consumed.
- **Multi-window:** SLOs evaluated over multiple windows.
- **Google SRE workbook:** chapter on SLO engineering.

## Observability maturity model

- **Crawl:** basic metrics.
- **Walk:** dashboards, alerting.
- **Run:** SLOs, distributed tracing.
- **Fly:** proactive, automated remediation.

## Books that touch observability

- *Designing Data-Intensive Applications* — Martin Kleppmann.
- *Clean Architecture* — Robert C. Martin.
- *Release It!* — Michael T. Nygard.
- *The Phoenix Project* — Gene Kim et al.

## Tools mentioned in SRE books

- **Prometheus:** metrics.
- **Grafana:** dashboards.
- **Loki / Elasticsearch:** logs.
- **Jaeger / Tempo:** traces.
- **PagerDuty / Opsgenie:** incident response.
- **StatusPage:** communication.
- **Chaos Monkey / Litmus / Gremlin:** chaos engineering.
- **Cortex / Thanos / Mimir:** long-term storage.

## Concepts in depth

- **RED method** (Rate, Errors, Duration) — Tom Wilkie.
- **USE method** (Utilization, Saturation, Errors) — Brendan Gregg.
- **Four Golden Signals** — Google SRE.
- **Distributed tracing fundamentals** — OpenTracing book.
- **SLI, SLO, SLA** — Google SRE.

## SRE best practices

- **Define SLOs first.** What is the user-visible reliability?
- **Use error budgets** to drive innovation velocity.
- **Alert on symptoms** (latency, error rate), not causes.
- **Runbooks** for every alert.
- **Blameless postmortems** — focus on systems, not people.
- **Chaos engineering** — test failure modes.
- **Automate toil** — but not at the cost of more toil.
- **Cap ops work** — 50% ops, 50% project work.

## SRE books recommended reading order

1. *Site Reliability Engineering* (Google, free).
2. *The Site Reliability Workbook* (Google, free).
3. *Observability Engineering* (Majors et al.).
4. *Seeking SRE* (Blank-Edelman).
5. *Real World SRE* (Welch).

## SRE-related conferences

- **USENIX SREcon:** annual.
- **SREcon EMEA, Asia.**
- **KubeCon + CloudNativeCon.**

## Free online courses

- **Google SRE Coursera specialization:** <https://www.coursera.org/specializations/site-reliability-engineering>
- **Linux Foundation SRE courses.**

## SRE community

- **r/sre:** Reddit.
- **SREcon Discord.**
- **SRE Weekly newsletter:** <https://sreweekly.com/>