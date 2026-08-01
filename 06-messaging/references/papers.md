# Influential Messaging Papers

This file catalogs the foundational papers and engineering documents that inform the Messaging document.

## Foundational papers

### Distributed logs and systems

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23distributed-logs-and-systems%0A%0ASection%20title%3A%20Distributed%20logs%20and%20systems' target='_blank' rel='noopener' data-askgpt='Distributed logs and systems' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/papers.md#distributed-logs-and-systems' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23distributed-logs-and-systems%0A%0ASection%20title%3A%20Distributed%20logs%20and%20systems' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23distributed-logs-and-systems%0A%0ASection%20title%3A%20Distributed%20logs%20and%20systems' title='Ask ChatGPT about this section'>💬</a>
- **"Kafka: A Distributed Messaging System for Log Processing"** — LinkedIn engineering blog (2011).
- **"How Kafka is Tested"** — Apache Kafka wiki.
- **"The Log: What every software engineer should know about real-time data's unifying abstraction"** — Jay Kreps (LinkedIn, 2013).
  - The "log" as a unifying abstraction for distributed systems.
  - <https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying>

### Consensus

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23consensus%0A%0ASection%20title%3A%20Consensus' target='_blank' rel='noopener' data-askgpt='Consensus' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/papers.md#consensus' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23consensus%0A%0ASection%20title%3A%20Consensus' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23consensus%0A%0ASection%20title%3A%20Consensus' title='Ask ChatGPT about this section'>💬</a>
- **"Paxos Made Simple"** — Leslie Lamport (2001).
  - The canonical Paxos paper.
- **"In Search of an Understandable Consensus Algorithm"** — Diego Ongaro, John Ousterhout (USENIX ATC 2014).
  - The Raft paper.
  - <https://raft.github.io/raft.pdf>
- **"Zab: High-performance broadcast for primary-backup systems"** — Flavio P. Junqueira, Benjamin C. Reed, Benjamin Serafino (2011).
  - The consensus algorithm used by ZooKeeper (Kafka's legacy metadata store).

### Stream processing

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23stream-processing%0A%0ASection%20title%3A%20Stream%20processing' target='_blank' rel='noopener' data-askgpt='Stream processing' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/papers.md#stream-processing' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23stream-processing%0A%0ASection%20title%3A%20Stream%20processing' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23stream-processing%0A%0ASection%20title%3A%20Stream%20processing' title='Ask ChatGPT about this section'>💬</a>
- **"The 8 Requirements of Real-Time Stream Processing"** — Tyler Akidau (Google, 2015).
  - Stream processing fundamentals.
- **"Streaming 101: The World Beyond Batch"** — Tyler Akidau (2018).
  - Beam/streaming fundamentals.
- **"The Dataflow Model: A Practical Approach to Balancing Correctness, Latency, and Cost in Massive-Scale, Unbounded, Out-of-Order Data Processing"** — Akidau et al. (VLDB 2015).
- **"MillWheel: Fault-Tolerant Stream Processing at Internet Scale"** — Akidau et al. (VLDB 2013).
  - Google stream processing.
- **"Kafka Streams: A Stream Processing Framework for Apache Kafka"** — Wang et al. (KSQL white paper).

### Distributed transactions

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23distributed-transactions%0A%0ASection%20title%3A%20Distributed%20transactions' target='_blank' rel='noopener' data-askgpt='Distributed transactions' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/papers.md#distributed-transactions' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23distributed-transactions%0A%0ASection%20title%3A%20Distributed%20transactions' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23distributed-transactions%0A%0ASection%20title%3A%20Distributed%20transactions' title='Ask ChatGPT about this section'>💬</a>
- **"Exactly-Once Semantics in Kafka"** — KIP-98.
- **"Chandy-Lamport Distributed Snapshots"** — K. Chandy, L. Lamport (1985).
  - The basis for Kafka's exactly-once semantics via streaming snapshots.

### RabbitMQ and AMQP

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23rabbitmq-and-amqp%0A%0ASection%20title%3A%20RabbitMQ%20and%20AMQP' target='_blank' rel='noopener' data-askgpt='RabbitMQ and AMQP' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/papers.md#rabbitmq-and-amqp' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23rabbitmq-and-amqp%0A%0ASection%20title%3A%20RabbitMQ%20and%20AMQP' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23rabbitmq-and-amqp%0A%0ASection%20title%3A%20RabbitMQ%20and%20AMQP' title='Ask ChatGPT about this section'>💬</a>
- **"AMQP 0-9-1 Specification"** — AMQP working group.
- **"RabbitMQ in Action"** — Alvaro Videla, Jason Williams (Manning).

### CDC and outbox

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23cdc-and-outbox%0A%0ASection%20title%3A%20CDC%20and%20outbox' target='_blank' rel='noopener' data-askgpt='CDC and outbox' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/papers.md#cdc-and-outbox' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23cdc-and-outbox%0A%0ASection%20title%3A%20CDC%20and%20outbox' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23cdc-and-outbox%0A%0ASection%20title%3A%20CDC%20and%20outbox' title='Ask ChatGPT about this section'>💬</a>
- **"Outbox Pattern"** — Chris Richardson (Microservices.io).
- **"Debezium: A Log-Based Change Data Capture Platform"** — Debezium documentation.
- **"Transactional Outbox Pattern"** — Microsoft patterns catalog.

### Other foundational

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23other-foundational%0A%0ASection%20title%3A%20Other%20foundational' target='_blank' rel='noopener' data-askgpt='Other foundational' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/papers.md#other-foundational' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23other-foundational%0A%0ASection%20title%3A%20Other%20foundational' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fpapers.md%23other-foundational%0A%0ASection%20title%3A%20Other%20foundational' title='Ask ChatGPT about this section'>💬</a>
- **"Time, Clocks, and the Ordering of Events in a Distributed System"** — Leslie Lamport (1978).
  - The foundational paper on distributed systems ordering.
- **"Bigtable: A Distributed Storage System for Structured Data"** — Fay Chang et al. (Google, 2006).
- **"Dynamo: Amazon's Highly Available Key-value Store"** — DeCandia et al. (SOSP 2007).
- **"Kafka: A Distributed Messaging System for Log Processing"** — LinkedIn (2011).
- **"Pulsar: Distributed pub/sub messaging system"** — Yahoo (originally open-sourced 2016).

## Industry engineering blogs

- **Kreps on Kafka:** <https://www.confluent.io/blog/>
- **Uber Engineering:** <https://www.uber.com/blog/engineering/>
- **Netflix Tech Blog:** <https://netflixtechblog.com/>
- **LinkedIn Engineering:** <https://engineering.linkedin.com/>
- **Stripe Engineering:** <https://stripe.com/blog/engineering>
- **Confluent Blog:** <https://www.confluent.io/blog/>
- **Cloudflare Blog:** <https://blog.cloudflare.com/>
- **Discord Engineering:** <https://discord.com/blog/tag/engineering>
- **Yahoo Engineering:** <https://yahooeng.tumblr.com/>

## Books

- *Kafka: The Definitive Guide* — Gwen Shapira, Todd Palino, Rajini Sivaram, Krit Petty (O'Reilly).
- *Effective Kafka* — Emil Koutanov (Leanpub).
- *Kafka Streams in Action* — Bill Bejeck (Manning).
- *Kafka in Action* — Dylan Scott (Manning).
- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly).
- *RabbitMQ in Action* — Alvaro Videla, Jason Williams (Manning).
- *RabbitMQ in Depth* — Gavin Roy (Manning).
- *Enterprise Messaging with AMQP and RabbitMQ* — Peter Ledbrook (Packt).
- *Mastering Apache Pulsar* — Scalablyted (Leanpub).

## Tools

- **Kcat (kafkacat):** Command-line tool for Kafka.
- **Kafka Tool:** GUI for inspecting Kafka.
- **RabbitMQ Management UI:** <http://localhost:15672>
- **Pulsar Manager:** <https://github.com/apache/pulsar-manager>
- **Lenses:** <https://lenses.io/>
- **Conduktor:** <https://www.conduktor.io/>
- **Strimzi:** Kubernetes operator for Kafka.

## Conference talks

- **"Kafka Summit"** — annual Kafka conference.
- **"KubeCon"** — stream processing talks.
- **"QCon"** — messaging systems.
- **"StrangeLoop"** — distributed systems.

## Free online courses

- **Confluent Developer:** <https://developer.confluent.io/>
- **Apache Kafka Fundamentals:** <https://www.confluent.io/training/>