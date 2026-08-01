# Apache Kafka Documentation Reference

The authoritative source for Apache Kafka is the official documentation. This file catalogs the Kafka documentation pages referenced in the Messaging document.

## Primary documentation

- **Apache Kafka Documentation:** <https://kafka.apache.org/documentation/>
- **Apache Kafka GitHub:** <https://github.com/apache/kafka>
- **Apache Kafka Improvement Proposals (KIPs):** <https://cwiki.apache.org/confluence/display/KAFKA/Kafka+Improvement+Proposals>
- **Confluent Documentation (commercial):** <https://docs.confluent.io/>
- **Kafka Clients (Java):** <https://kafka.apache.org/documentation/#api>
- **Kafka Streams:** <https://kafka.apache.org/documentation/streams/>
- **ksqlDB:** <https://docs.ksqldb.io/>
- **Schema Registry:** <https://docs.confluent.io/platform/current/schema-registry/index.html>
- **Kafka Connect:** <https://kafka.apache.org/documentation/#connect>

## Key sections referenced in this document

### Quick Start <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23quick-start%0A%0ASection%20title%3A%20Quick%20Start" target="_blank" rel="noopener" data-askgpt="Quick Start" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#quick-start" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23quick-start%0A%0ASection%20title%3A%20Quick%20Start" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23quick-start%0A%0ASection%20title%3A%20Quick%20Start" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Quick Start | <https://kafka.apache.org/quickstart> |
| Use Cases | <https://kafka.apache.org/uses> |
| Ecosystem | <https://kafka.apache.org/ecosystem> |

### Documentation <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23documentation%0A%0ASection%20title%3A%20Documentation" target="_blank" rel="noopener" data-askgpt="Documentation" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#documentation" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23documentation%0A%0ASection%20title%3A%20Documentation" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23documentation%0A%0ASection%20title%3A%20Documentation" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Introduction | <https://kafka.apache.org/documentation/#introduction> |
| Topics and Partitions | <https://kafka.apache.org/documentation/#intro_topics> |
| Producers | <https://kafka.apache.org/documentation/#intro_producers> |
| Consumers | <https://kafka.apache.org/documentation/#intro_consumers> |
| Guarantees | <https://kafka.apache.org/documentation/#intro_guarantees> |
| Replication | <https://kafka.apache.org/documentation/#intro_replication> |
| Log | <https://kafka.apache.org/documentation/#intro_log> |
| Distribution | <https://kafka.apache.org/documentation/#distribution_impl> |

### Design <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23design%0A%0ASection%20title%3A%20Design" target="_blank" rel="noopener" data-askgpt="Design" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#design" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23design%0A%0ASection%20title%3A%20Design" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23design%0A%0ASection%20title%3A%20Design" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Persistence | <https://kafka.apache.org/documentation/#design_persistence> |
| Efficiency | <https://kafka.apache.org/documentation/#design_efficiency> |
| Producer Load Balancing | <https://kafka.apache.org/documentation/#producer_load> |
| Async Send | <https://kafka.apache.org/documentation/#design_async_send> |
| Replication | <https://kafka.apache.org/documentation/#design_replication> |
| Leader Election | <https://kafka.apache.org/documentation/#leader_election> |
| In-Sync Replicas | <https://kafka.apache.org/documentation/#design_in_sync_replicas> |
| Producer Acks | <https://kafka.apache.org/documentation/#producer_acks> |
| Log Compaction | <https://kafka.apache.org/documentation/#compaction> |
| Quotas | <https://kafka.apache.org/documentation/#design_quotas> |

### Configuration <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" target="_blank" rel="noopener" data-askgpt="Configuration" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#configuration" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Broker Configs | <https://kafka.apache.org/documentation/#brokerconfigs> |
| Producer Configs | <https://kafka.apache.org/documentation/#producerconfigs> |
| Consumer Configs | <https://kafka.apache.org/documentation/#consumerconfigs> |
| Topic Configs | <https://kafka.apache.org/documentation/#topicconfigs> |
| Admin Client Configs | <https://kafka.apache.org/documentation/#adminclientconfigs> |

### Operations <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23operations%0A%0ASection%20title%3A%20Operations" target="_blank" rel="noopener" data-askgpt="Operations" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#operations" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23operations%0A%0ASection%20title%3A%20Operations" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23operations%0A%0ASection%20title%3A%20Operations" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Basic Operations | <https://kafka.apache.org/documentation/#basic_ops> |
| Adding and Removing Topics | <https://kafka.apache.org/documentation/#basic_ops_modify_topic> |
| Consumer Groups | <https://kafka.apache.org/documentation/#basic_ops_consumer_group> |
| Expanding Cluster | <https://kafka.apache.org/documentation/#basic_ops_cluster_expansion> |
| Datacenters | <https://kafka.apache.org/documentation/#datacenters> |
| Important Server Configs | <https://kafka.apache.org/documentation/#server_config> |
| Important Client Configs | <https://kafka.apache.org/documentation/#client_config> |
| Monitoring | <https://kafka.apache.org/documentation/#monitoring> |
| ZooKeeper | <https://kafka.apache.org/documentation/#zk> |

### Kafka Streams <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kafka-streams%0A%0ASection%20title%3A%20Kafka%20Streams" target="_blank" rel="noopener" data-askgpt="Kafka Streams" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#kafka-streams" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kafka-streams%0A%0ASection%20title%3A%20Kafka%20Streams" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kafka-streams%0A%0ASection%20title%3A%20Kafka%20Streams" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Streams Concepts | <https://kafka.apache.org/documentation/streams/> |
| Core Concepts | <https://kafka.apache.org/documentation/streams/core-concepts> |
| Architecture | <https://kafka.apache.org/documentation/streams/architecture> |
| KStream | <https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html#streams-concepts-KStream> |
| KTable | <https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html#streams-concepts-KTable> |
| GlobalKTable | <https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html#streams-concepts-GlobalKTable> |
| Interactive Queries | <https://kafka.apache.org/documentation/streams/developer-guide/interactive-queries.html> |
| Exactly-Once Semantics | <https://kafka.apache.org/documentation/streams/developer-guide/architecture.html#streams_architecture_eos> |
| State Stores | <https://kafka.apache.org/documentation/streams/developer-guide/architecture.html#streams_architecture_state> |
| Windowing | <https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html#streams-concepts-windowing> |
| Joins | <https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html#streams-concepts-joins> |

### Kafka Connect <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kafka-connect%0A%0ASection%20title%3A%20Kafka%20Connect" target="_blank" rel="noopener" data-askgpt="Kafka Connect" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#kafka-connect" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kafka-connect%0A%0ASection%20title%3A%20Kafka%20Connect" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kafka-connect%0A%0ASection%20title%3A%20Kafka%20Connect" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Connect Overview | <https://kafka.apache.org/documentation/#connect> |
| Connect User Guide | <https://docs.confluent.io/platform/current/connect/userguide.html> |
| Source Connectors | <https://docs.confluent.io/platform/current/connect/devguide.html> |
| Sink Connectors | <https://docs.confluent.io/platform/current/connect/devguide.html> |

### Security <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23security%0A%0ASection%20title%3A%20Security" target="_blank" rel="noopener" data-askgpt="Security" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#security" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23security%0A%0ASection%20title%3A%20Security" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23security%0A%0ASection%20title%3A%20Security" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Security Overview | <https://kafka.apache.org/documentation/#security> |
| Encryption | <https://kafka.apache.org/documentation/#security_ssl> |
| Authentication | <https://kafka.apache.org/documentation/#security_sasl> |
| Authorization | <https://kafka.apache.org/documentation/#security_authz> |

### KRaft <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kraft%0A%0ASection%20title%3A%20KRaft" target="_blank" rel="noopener" data-askgpt="KRaft" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-docs.md#kraft" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kraft%0A%0ASection%20title%3A%20KRaft" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-docs.md%23kraft%0A%0ASection%20title%3A%20KRaft" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| KRaft (KIP-500) | <https://kafka.apache.org/documentation/#kraft> |
| KRaft Design | <https://github.com/apache/kafka/blob/trunk/raft/README.md> |

## Kafka versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 0.7 | 2011 | Initial open-source release |
| 0.8 | 2012 | Replication |
| 0.9 | 2015 | Security, Kafka Connect, new consumer API |
| 0.10 | 2016 | Kafka Streams, message timestamps |
| 0.11 | 2017 | Exactly-once semantics (transactional API) |
| 1.0 | 2017 | Stable API |
| 1.1 | 2018 | Offsets replication, headers |
| 2.0 | 2019 | Java 8+, KIP-279, KIP-339 |
| 2.1 | 2019 | Schema Registry compatible |
| 2.2 | 2019 | TLS for inter-broker |
| 2.3 | 2020 | Improved consumer rebalance |
| 2.4 | 2020 | TLS 1.3, KIP-380 |
| 2.5 | 2020 | TLS for clients, KIP-411 |
| 2.6 | 2020 | KIP-465 |
| 2.7 | 2020 | Tiered storage preview |
| 2.8 | 2021 | KRaft preview |
| 3.0 | 2021 | KRaft production-ready, Java 8+ |
| 3.1 | 2022 | KRaft improvements |
| 3.2 | 2022 | Tiered storage production |
| 3.3 | 2023 | KRaft default |
| 3.4 | 2023 | KIP-848 (next-gen consumer rebalance) preview |
| 3.5 | 2024 | KIP-848 improvements |
| 3.6 | 2024 | Continued improvements |
| 3.7 | 2025 | Recent improvements |
| 3.8 | 2025 | Latest GA |
| 4.0 | 2026 | (development) |

## Kafka Improvement Proposals (KIPs) referenced

| KIP | Title |
|-----|-------|
| KIP-98 | Exactly-once Delivery and Transactional Messaging |
| KIP-129 | Connect improvements |
| KIP-345 | KIP-345: Static Membership |
| KIP-500 | Replace ZooKeeper with a Self-Managed Metadata Quorum (KRaft) |
| KIP-405 | Tiered Storage |
| KIP-429 | KRaft improvements |
| KIP-848 | The Next Generation of Kafka Consumer Rebalancing Protocol |
| KIP-848 | Next-gen consumer rebalance |

## Tools

- **Kafka CLI tools:** `kafka-server-start.sh`, `kafka-topics.sh`, `kafka-console-consumer.sh`, `kafka-consumer-groups.sh`, `kafka-consumer-perf-test.sh`.
- **Kafka Connect:** framework for source/sink connectors.
- **Schema Registry:** manage Avro/JSON/Protobuf schemas.
- **ksqlDB:** SQL engine for Kafka.
- **Kafka Streams:** stream processing library.
- **kcat (kafkacat):** command-line producer/consumer.
- **Kafka Exporter:** Prometheus metrics exporter.

## Related projects

- **Apache Kafka:** <https://kafka.apache.org/>
- **Confluent Platform:** <https://www.confluent.io/>
- **Strimzi (Kubernetes operator):** <https://strimzi.io/>
- **Apache Flink:** <https://flink.apache.org/>
- **Apache Beam:** <https://beam.apache.org/>

## Community

- **Apache Kafka Slack:** <https://kafka.apache.org/contact>
- **Mailing lists:** <https://kafka.apache.org/contact>
- **KIPs:** <https://cwiki.apache.org/confluence/display/KAFKA/Kafka+Improvement+Proposals>
- **Confluent Community:** <https://www.confluent.io/community/>

## Books

- *Kafka: The Definitive Guide* — Gwen Shapira, Todd Palino, Rajini Sivaram, Krit Petty (O'Reilly, 2nd edition 2022).
- *Effective Kafka* — Emil Koutanov (Leanpub).
- *Kafka Streams in Action* — Bill Bejeck (Manning).
- *Kafka in Action* — Dylan Scott (Manning).
- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly).