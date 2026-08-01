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

### Concepts <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23concepts%0A%0ASection%20title%3A%20Concepts' target='_blank' rel='noopener' data-askgpt='Concepts' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/rabbitmq-docs.md#concepts' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23concepts%0A%0ASection%20title%3A%20Concepts' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23concepts%0A%0ASection%20title%3A%20Concepts' title='Ask ChatGPT about this section'>💬</a>

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

### Exchange types <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23exchange-types%0A%0ASection%20title%3A%20Exchange%20types' target='_blank' rel='noopener' data-askgpt='Exchange types' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/rabbitmq-docs.md#exchange-types' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23exchange-types%0A%0ASection%20title%3A%20Exchange%20types' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23exchange-types%0A%0ASection%20title%3A%20Exchange%20types' title='Ask ChatGPT about this section'>💬</a>

| Exchange | URL |
|----------|-----|
| Direct | <https://www.rabbitmq.com/docs/exchanges#direct> |
| Fanout | <https://www.rabbitmq.com/docs/exchanges#fanout> |
| Topic | <https://www.rabbitmq.com/docs/exchanges#topic> |
| Headers | <https://www.rabbitmq.com/docs/exchanges#headers> |

### Patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23patterns%0A%0ASection%20title%3A%20Patterns' target='_blank' rel='noopener' data-askgpt='Patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/rabbitmq-docs.md#patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23patterns%0A%0ASection%20title%3A%20Patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23patterns%0A%0ASection%20title%3A%20Patterns' title='Ask ChatGPT about this section'>💬</a>

| Topic | URL |
|-------|-----|
| Publish/Subscribe | <https://www.rabbitmq.com/tutorials/tutorial-three-python> |
| Routing | <https://www.rabbitmq.com/tutorials/tutorial-four-python> |
| Topics | <https://www.rabbitmq.com/tutorials/tutorial-five-python> |
| RPC | <https://www.rabbitmq.com/tutorials/tutorial-six-python> |
| Dead Letter Exchanges | <https://www.rabbitmq.com/docs/dlx> |
| Quorum Queues | <https://www.rabbitmq.com/docs/quorum-queues> |
| Streams | <https://www.rabbitmq.com/docs/streams> |

### Reliability <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23reliability%0A%0ASection%20title%3A%20Reliability' target='_blank' rel='noopener' data-askgpt='Reliability' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/rabbitmq-docs.md#reliability' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23reliability%0A%0ASection%20title%3A%20Reliability' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23reliability%0A%0ASection%20title%3A%20Reliability' title='Ask ChatGPT about this section'>💬</a>

| Topic | URL |
|-------|-----|
| Publisher Confirms | <https://www.rabbitmq.com/docs/confirms> |
| Consumer Acknowledgements | <https://www.rabbitmq.com/docs/consumer-prefetch> |
| Acknowledgement Modes | <https://www.rabbitmq.com/docs/confirms#acknowledgement-modes> |
| Transactions | <https://www.rabbitmq.com/docs/confirms#txn> |
| Consumer Priority | <https://www.rabbitmq.com/docs/priority> |
| Persistence | <https://www.rabbitmq.com/docs/persistence-conf> |

### Operations <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23operations%0A%0ASection%20title%3A%20Operations' target='_blank' rel='noopener' data-askgpt='Operations' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/rabbitmq-docs.md#operations' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23operations%0A%0ASection%20title%3A%20Operations' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23operations%0A%0ASection%20title%3A%20Operations' title='Ask ChatGPT about this section'>💬</a>

| Topic | URL |
|-------|-----|
| Configuration | <https://www.rabbitmq.com/docs/configuration> |
| Management Plugin | <https://www.rabbitmq.com/docs/management> |
| Monitoring | <https://www.rabbitmq.com/docs/monitoring> |
| Logging | <https://www.rabbitmq.com/docs/logging> |
| Cluster Formation | <https://www.rabbitmq.com/docs/cluster-formation> |
| High Availability | <https://www.rabbitmq.com/docs/ha> |
| Backup | <https://www.rabbitmq.com/docs/backup> |

### Security <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23security%0A%0ASection%20title%3A%20Security' target='_blank' rel='noopener' data-askgpt='Security' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/rabbitmq-docs.md#security' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23security%0A%0ASection%20title%3A%20Security' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23security%0A%0ASection%20title%3A%20Security' title='Ask ChatGPT about this section'>💬</a>

| Topic | URL |
|-------|-----|
| Authentication | <https://www.rabbitmq.com/docs/authentication> |
| Authorization | <https://www.rabbitmq.com/docs/authorization> |
| TLS | <https://www.rabbitmq.com/docs/ssl> |
| LDAP | <https://www.rabbitmq.com/docs/ldap> |

### Clients <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23clients%0A%0ASection%20title%3A%20Clients' target='_blank' rel='noopener' data-askgpt='Clients' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/rabbitmq-docs.md#clients' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23clients%0A%0ASection%20title%3A%20Clients' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Frabbitmq-docs.md%23clients%0A%0ASection%20title%3A%20Clients' title='Ask ChatGPT about this section'>💬</a>

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