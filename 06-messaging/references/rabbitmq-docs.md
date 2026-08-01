# RabbitMQ Documentation Reference

The authoritative source for RabbitMQ is the official documentation. This file catalogs the RabbitMQ documentation pages referenced in the Messaging document.

## Primary documentation

- **RabbitMQ Documentation:** <https://www.rabbitmq.com/docs>
- **RabbitMQ GitHub:** <https://github.com/rabbitmq/rabbitmq-server>
- **AMQP 0-9-1 Specification:** <https://www.amqp.org/specification/0-9-1>
- **Erlang (RabbitMQ is built in):** <https://www.erlang.org/>

## Documentation structure

| Section | What it covers |
|---------|---------------|
| **Getting Started** | Installation, first queue |
| **Concepts** | Producers, consumers, queues, exchanges, bindings |
| **Tutorials** | Common patterns |
| **Server** | Configuration, ops |
| **Clients** | AMQP 0-9-1, AMQP 1.0, MQTT, STOMP |
| **Clustering** | Distributed deployment |
| **Production** | Deployment, monitoring |

## Key sections referenced in this document

### Concepts

| Topic | URL |
|-------|-----|
| Producers and Consumers | <https://www.rabbitmq.com/docs/producers-consumers> |
| Queues | <https://www.rabbitmq.com/docs/queues> |
| Exchanges | <https://www.rabbitmq.com/docs/exchanges> |
| Bindings | <https://www.rabbitmq.com/docs/bindings> |
| Routing | <https://www.rabbitmq.com/docs/routing> |
| Channels | <https://www.rabbitmq.com/docs/channels> |
| Virtual Hosts | <https://www.rabbitmq.com/docs/vhosts> |
| Connections | <https://www.rabbitmq.com/docs/connections> |

### Exchange types

| Exchange | URL |
|----------|-----|
| Direct | <https://www.rabbitmq.com/docs/exchanges#direct> |
| Fanout | <https://www.rabbitmq.com/docs/exchanges#fanout> |
| Topic | <https://www.rabbitmq.com/docs/exchanges#topic> |
| Headers | <https://www.rabbitmq.com/docs/exchanges#headers> |

### Patterns

| Topic | URL |
|-------|-----|
| Publish/Subscribe | <https://www.rabbitmq.com/tutorials/tutorial-three-python> |
| Routing | <https://www.rabbitmq.com/tutorials/tutorial-four-python> |
| Topics | <https://www.rabbitmq.com/tutorials/tutorial-five-python> |
| RPC | <https://www.rabbitmq.com/tutorials/tutorial-six-python> |
| Dead Letter Exchanges | <https://www.rabbitmq.com/docs/dlx> |
| Quorum Queues | <https://www.rabbitmq.com/docs/quorum-queues> |
| Streams | <https://www.rabbitmq.com/docs/streams> |

### Reliability

| Topic | URL |
|-------|-----|
| Publisher Confirms | <https://www.rabbitmq.com/docs/confirms> |
| Consumer Acknowledgements | <https://www.rabbitmq.com/docs/consumer-prefetch> |
| Acknowledgement Modes | <https://www.rabbitmq.com/docs/confirms#acknowledgement-modes> |
| Transactions | <https://www.rabbitmq.com/docs/confirms#txn> |
| Consumer Priority | <https://www.rabbitmq.com/docs/priority> |
| Persistence | <https://www.rabbitmq.com/docs/persistence-conf> |

### Operations

| Topic | URL |
|-------|-----|
| Configuration | <https://www.rabbitmq.com/docs/configuration> |
| Management Plugin | <https://www.rabbitmq.com/docs/management> |
| Monitoring | <https://www.rabbitmq.com/docs/monitoring> |
| Logging | <https://www.rabbitmq.com/docs/logging> |
| Cluster Formation | <https://www.rabbitmq.com/docs/cluster-formation> |
| High Availability | <https://www.rabbitmq.com/docs/ha> |
| Backup | <https://www.rabbitmq.com/docs/backup> |

### Security

| Topic | URL |
|-------|-----|
| Authentication | <https://www.rabbitmq.com/docs/authentication> |
| Authorization | <https://www.rabbitmq.com/docs/authorization> |
| TLS | <https://www.rabbitmq.com/docs/ssl> |
| LDAP | <https://www.rabbitmq.com/docs/ldap> |

### Clients

| Language | Client |
|----------|--------|
| Java | `com.rabbitmq:amqp-client` |
| Python | `pika` |
| Go | `amqp091-go` |
| Node.js | `amqplib` |
| .NET | `RabbitMQ.Client` |
| Ruby | `bunny` |
| Rust | `lapin` |

## RabbitMQ versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 1.0 | 2007 | Initial release |
| 2.0 | 2010 | Clustering |
| 3.0 | 2014 | Admin/monitoring |
| 3.5 | 2016 | Federation plugin |
| 3.6 | 2017 | Erlang 19 compatibility |
| 3.7 | 2018 | Erlang 21+ |
| 3.8 | 2019 | Quorum queues (preview) |
| 3.9 | 2020 | Streams preview |
| 3.10 | 2021 | Feature flags |
| 3.11 | 2022 | Stream filter/pipes |
| 3.12 | 2023 | Performance improvements |
| 3.13 | 2024 | OAuth 2.0 support |
| 4.0 | 2025 | Khepri (Raft-based metadata) |

## Books

- *RabbitMQ in Action* — Alvaro Videla, Jason Williams (Manning).
- *RabbitMQ in Depth* — Gavin Roy (Manning).
- *Enterprise Messaging with AMQP and RabbitMQ* — Peter Ledbrook (Packt).

## Tools

- **Management UI:** <http://localhost:15672> (default port).
- **rabbitmqadmin:** CLI for management.
- **rabbitmqctl:** Built-in CLI.
- **Prometheus exporter:** <https://github.com/kbudde/rabbitmq_exporter>
- **Cluster Operator for Kubernetes:** <https://www.rabbitmq.com/kubernetes/operator/operator-overview.html>