# Influential Messaging Papers

This file catalogs the foundational papers and engineering documents that inform the Messaging document.

## Foundational papers

### Distributed logs and systems <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Distributed%20logs%20and%20systems'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Distributed logs and systems" title="Ask ChatGPT about this section">💬</a>

- **"Kafka: A Distributed Messaging System for Log Processing"** — LinkedIn engineering blog (2011).
- **"How Kafka is Tested"** — Apache Kafka wiki.
- **"The Log: What every software engineer should know about real-time data's unifying abstraction"** — Jay Kreps (LinkedIn, 2013).
  - The "log" as a unifying abstraction for distributed systems.
  - <https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying>

### Consensus <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Consensus'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Consensus" title="Ask ChatGPT about this section">💬</a>

- **"Paxos Made Simple"** — Leslie Lamport (2001).
  - The canonical Paxos paper.
- **"In Search of an Understandable Consensus Algorithm"** — Diego Ongaro, John Ousterhout (USENIX ATC 2014).
  - The Raft paper.
  - <https://raft.github.io/raft.pdf>
- **"Zab: High-performance broadcast for primary-backup systems"** — Flavio P. Junqueira, Benjamin C. Reed, Benjamin Serafino (2011).
  - The consensus algorithm used by ZooKeeper (Kafka's legacy metadata store).

### Stream processing <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Stream%20processing'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Stream processing" title="Ask ChatGPT about this section">💬</a>

- **"The 8 Requirements of Real-Time Stream Processing"** — Tyler Akidau (Google, 2015).
  - Stream processing fundamentals.
- **"Streaming 101: The World Beyond Batch"** — Tyler Akidau (2018).
  - Beam/streaming fundamentals.
- **"The Dataflow Model: A Practical Approach to Balancing Correctness, Latency, and Cost in Massive-Scale, Unbounded, Out-of-Order Data Processing"** — Akidau et al. (VLDB 2015).
- **"MillWheel: Fault-Tolerant Stream Processing at Internet Scale"** — Akidau et al. (VLDB 2013).
  - Google stream processing.
- **"Kafka Streams: A Stream Processing Framework for Apache Kafka"** — Wang et al. (KSQL white paper).

### Distributed transactions <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Distributed%20transactions'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Distributed transactions" title="Ask ChatGPT about this section">💬</a>

- **"Exactly-Once Semantics in Kafka"** — KIP-98.
- **"Chandy-Lamport Distributed Snapshots"** — K. Chandy, L. Lamport (1985).
  - The basis for Kafka's exactly-once semantics via streaming snapshots.

### RabbitMQ and AMQP <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'RabbitMQ%20and%20AMQP'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="RabbitMQ and AMQP" title="Ask ChatGPT about this section">💬</a>

- **"AMQP 0-9-1 Specification"** — AMQP working group.
- **"RabbitMQ in Action"** — Alvaro Videla, Jason Williams (Manning).

### CDC and outbox <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'CDC%20and%20outbox'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="CDC and outbox" title="Ask ChatGPT about this section">💬</a>

- **"Outbox Pattern"** — Chris Richardson (Microservices.io).
- **"Debezium: A Log-Based Change Data Capture Platform"** — Debezium documentation.
- **"Transactional Outbox Pattern"** — Microsoft patterns catalog.

### Other foundational <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Other%20foundational'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Other foundational" title="Ask ChatGPT about this section">💬</a>

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