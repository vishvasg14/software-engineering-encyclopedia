# Apache Pulsar Documentation Reference

The authoritative source for Apache Pulsar is the official documentation. This file catalogs the Pulsar documentation pages referenced in the Messaging document.

## Primary documentation

- **Apache Pulsar Documentation:** <https://pulsar.apache.org/docs/>
- **Apache Pulsar GitHub:** <https://github.com/apache/pulsar>
- **Pulsar Schema:** <https://pulsar.apache.org/docs/schema-overview/>
- **Pulsar Functions:** <https://pulsar.apache.org/docs/functions-overview/>

## Architecture

### Components <a class="askgpt-btn" data-askgpt="Components" title="Ask ChatGPT about this section">💬</a>

| Component | Purpose |
|-----------|---------|
| **Broker** | Stateless component handling produce/consume |
| **BookKeeper** | Persistent storage (segmented log) |
| **ZooKeeper** | Metadata coordination (legacy) |
| **BookKeeper Metadata** | Coordination for BookKeeper |
| **Pulsar Proxy** | Gateway for client connections |

### Concepts <a class="askgpt-btn" data-askgpt="Concepts" title="Ask ChatGPT about this section">💬</a>

| Concept | URL |
|---------|-----|
| Architecture | <https://pulsar.apache.org/docs/concepts-architecture/> |
| Producers | <https://pulsar.apache.org/docs/concepts-clients/#producer> |
| Consumers | <https://pulsar.apache.org/docs/concepts-clients/#consumer> |
| Topics | <https://pulsar.apache.org/docs/concepts-clients/#topics> |
| Subscriptions | <https://pulsar.apache.org/docs/concepts-clients/#subscriptions> |
| Messages | <https://pulsar.apache.org/docs/concepts-clients/#messages> |
| Acknowledgment | <https://pulsar.apache.org/docs/concepts-clients/#acknowledgement> |
| Retention | <https://pulsar.apache.org/docs/concepts-clients/#retention> |
| TTL | <https://pulsar.apache.org/docs/concepts-clients/#time-to-live-ttl> |
| Partitioned Topics | <https://pulsar.apache.org/docs/concepts-clients/#partitioned-topics> |
| Non-Persistent Topics | <https://pulsar.apache.org/docs/concepts-clients/#non-persistent-topics> |
| Multi Tenancy | <https://pulsar.apache.org/docs/concepts-multi-tenancy/> |
| Geo-Replication | <https://pulsar.apache.org/docs/administration-geo/> |
| Tiered Storage | <https://pulsar.apache.org/docs/tiered-storage-overview/> |

### Subscription types <a class="askgpt-btn" data-askgpt="Subscription types" title="Ask ChatGPT about this section">💬</a>

| Type | URL |
|------|-----|
| Exclusive | <https://pulsar.apache.org/docs/concepts-messaging/#exclusive> |
| Failover | <https://pulsar.apache.org/docs/concepts-messaging/#failover> |
| Shared | <https://pulsar.apache.org/docs/concepts-messaging/#shared> |
| Key_Shared | <https://pulsar.apache.org/docs/concepts-messaging/#key_shared> |

### Pulsar Functions <a class="askgpt-btn" data-askgpt="Pulsar Functions" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Overview | <https://pulsar.apache.org/docs/functions-overview/> |
| Function API | <https://pulsar.apache.org/docs/functions-api/> |
| Deployment | <https://pulsar.apache.org/docs/functions-deploy/> |
| Word Count Example | <https://pulsar.apache.org/docs/function-word-count/> |
| State Store | <https://pulsar.apache.org/docs/functions-state-store/> |
| Windowing | <https://pulsar.apache.org/docs/functions-windowing/> |

### Pulsar IO <a class="askgpt-btn" data-askgpt="Pulsar IO" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Overview | <https://pulsar.apache.org/docs/io-overview/> |
| Source Connectors | <https://pulsar.apache.org/docs/io-connectors/> |
| Sink Connectors | <https://pulsar.apache.org/docs/io-connectors/> |
| Kafka Source | <https://pulsar.apache.org/docs/io-kafka-source/> |
| Kafka Sink | <https://pulsar.apache.org/docs/io-kafka-sink/> |
| JDBC Source | <https://pulsar.apache.org/docs/io-jdbc-source/> |
| Debezium Source | <https://pulsar.apache.org/docs/io-debezium-source/> |

### Schema <a class="askgpt-btn" data-askgpt="Schema" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Schema Overview | <https://pulsar.apache.org/docs/schema-overview/> |
| Avro | <https://pulsar.apache.org/docs/schema-avro/> |
| JSON | <https://pulsar.apache.org/docs/schema-json/> |
| Protobuf | <https://pulsar.apache.org/docs/schema-protobuf/> |
| Schema Evolution | <https://pulsar.apache.org/docs/schema-evolution-compatibility/> |

### Operations <a class="askgpt-btn" data-askgpt="Operations" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Cluster Setup | <https://pulsar.apache.org/docs/deploy-kubernetes/> |
| Helm Chart | <https://github.com/apache/pulsar-helm-chart> |
| Monitoring | <https://pulsar.apache.org/docs/deploy-monitoring/> |
| Authentication | <https://pulsar.apache.org/docs/security-overview/> |
| Authorization | <https://pulsar.apache.org/docs/security-authorization/> |
| TLS | <https://pulsar.apache.org/docs/security-tls/> |

## Pulsar vs Kafka

| Feature | Pulsar | Kafka |
|---------|--------|-------|
| Architecture | Segmented (broker + BookKeeper) | Coupled (broker + filesystem) |
| Storage | BookKeeper (separate) | Local filesystem |
| Multitenancy | First-class | Limited |
| Geo-replication | Built-in | Mirrored Maker / Confluent |
| Functions | Built-in | Kafka Streams |
| Tiered storage | Built-in | KIP-405 |
| Schema registry | Built-in | Separate (Confluent) |
| Throughput | Millions msg/s | Millions msg/s |
| Latency | Low | Low |
| Maturity | Growing | Production-proven |

## Pulsar versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 2.0 | 2018 | Schema registry, Functions |
| 2.4 | 2019 | Key_Shared subscription |
| 2.5 | 2019 | Tiered storage (preview) |
| 2.6 | 2020 | AWS Lambda sink, state store |
| 2.7 | 2020 | Topic-level policies |
| 2.8 | 2021 | Transactions |
| 2.9 | 2021 | Key_shared batch index |
| 2.10 | 2022 | TableView, Negative acknowledgment |
| 2.11 | 2022 | PIP-152 |
| 3.0 | 2023 | Major rewrite |
| 3.1 | 2024 | Performance improvements |
| 3.2 | 2024 | Stability improvements |
| 3.3 | 2025 | Recent improvements |

## Books

- *Mastering Apache Pulsar* — Scalablyted (Leanpub).
- *Pulsar in Action* — Manning (forthcoming).

## Community

- **Pulsar Slack:** <https://apache-pulsar.slack.com/>
- **Mailing lists:** <https://pulsar.apache.org/contact/>
- **Twitter:** @apache_pulsar