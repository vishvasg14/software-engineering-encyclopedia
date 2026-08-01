# "Designing Data-Intensive Applications" (DDIA) Reference

The single most important book for system design and distributed systems is *Designing Data-Intensive Applications* by Martin Kleppmann. This file catalogs the chapters and key concepts referenced in the System Design document.

## Book info

- **Title:** Designing Data-Intensive Applications
- **Author:** Martin Kleppmann
- **Publisher:** O'Reilly, 2017
- **Free online:** <https://dataintensive.net/>
- **GitHub:** <https://github.com/ept/ddia-bibliography>

## Chapters referenced in this document

### Part I: Foundations of Data Systems <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Part%20I%3A%20Foundations%20of%20Data%20Systems'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Part I: Foundations of Data Systems" title="Ask ChatGPT about this section">💬</a>

| Chapter | Title | URL |
|---------|-------|-----|
| 1 | Reliable, Scalable, and Maintainable Applications | <https://dataintensive.net/#chapter_1> |
| 2 | Data Models and Query Languages | <https://dataintensive.net/#chapter_2> |
| 3 | Storage and Retrieval | <https://dataintensive.net/#chapter_3> |
| 4 | Encoding and Evolution | <https://dataintensive.net/#chapter_4> |

### Part II: Distributed Data <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Part%20II%3A%20Distributed%20Data'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Part II: Distributed Data" title="Ask ChatGPT about this section">💬</a>

| Chapter | Title | URL |
|---------|-------|-----|
| 5 | Replication | <https://dataintensive.net/#chapter_5> |
| 6 | Partitioning | <https://dataintensive.net/#chapter_6> |
| 7 | Transactions | <https://dataintensive.net/#chapter_7> |
| 8 | The Trouble with Distributed Systems | <https://dataintensive.net/#chapter_8> |
| 9 | Consistency and Consensus | <https://dataintensive.net/#chapter_9> |

### Part III: Derived Data <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Part%20III%3A%20Derived%20Data'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Part III: Derived Data" title="Ask ChatGPT about this section">💬</a>

| Chapter | Title | URL |
|---------|-------|-----|
| 10 | Batch Processing | <https://dataintensive.net/#chapter_10> |
| 11 | Stream Processing | <https://dataintensive.net/#chapter_11> |
| 12 | The Future of Data Systems | <https://dataintensive.net/#chapter_12> |

## Key concepts

### Chapter 1 — Foundations <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Chapter%201%20%E2%80%94%20Foundations'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Chapter 1 — Foundations" title="Ask ChatGPT about this section">💬</a>

- **Reliable:** System continues to work correctly even in the face of adversity.
- **Scalable:** Reasonable ways of dealing with growth.
- **Maintainable:** Many people can work on it productively.

### Chapter 5 — Replication <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Chapter%205%20%E2%80%94%20Replication'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Chapter 5 — Replication" title="Ask ChatGPT about this section">💬</a>

- **Single-leader replication:** All writes go to leader; followers replicate. Read from followers.
- **Multi-leader replication:** Multiple leaders accept writes; conflict resolution.
- **Leaderless replication:** Any node accepts writes; quorum reads/writes.

### Chapter 7 — Transactions <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Chapter%207%20%E2%80%94%20Transactions'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Chapter 7 — Transactions" title="Ask ChatGPT about this section">💬</a>

- **ACID:** Atomicity, Consistency, Isolation, Durability.
- **Isolation levels:** Read uncommitted, Read committed, Repeatable read, Serializable.
- **Two-phase locking (2PL):** Pessimistic concurrency.
- **Snapshot isolation (MVCC):** Multi-version concurrency control.

### Chapter 8 — The Trouble with Distributed Systems <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Chapter%208%20%E2%80%94%20The%20Trouble%20with%20Distributed%20Systems'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Chapter 8 — The Trouble with Distributed Systems" title="Ask ChatGPT about this section">💬</a>

- **Networks are unreliable:** Packets lost, delayed, reordered.
- **Clocks are unreliable:** Clock skew across machines.
- **Processes can pause:** GC, paging, network delays.

### Chapter 9 — Consistency and Consensus <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Chapter%209%20%E2%80%94%20Consistency%20and%20Consensus'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Chapter 9 — Consistency and Consensus" title="Ask ChatGPT about this section">💬</a>

- **Linearizability:** Reads see the most recent write.
- **Causal consistency:** Causally-related ops are seen in order.
- **Eventual consistency:** All replicas converge eventually.
- **Consensus:** Agreement among nodes (Paxos, Raft, Zab).

### Chapter 11 — Stream Processing <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Chapter%2011%20%E2%80%94%20Stream%20Processing'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Chapter 11 — Stream Processing" title="Ask ChatGPT about this section">💬</a>

- **Event streams:** Kafka, Pulsar.
- **Stream processing:** Kafka Streams, Flink.
- **Event sourcing:** State derived from event log.

## Related papers

- **CAP theorem:** Gilbert, Lynch (2002).
- **PACELC:** Daniel Abadi (2010).
- **Paxos:** Lamport (1998).
- **Raft:** Ongaro, Ousterhout (2014).
- **Spanner:** Corbett et al. (2012).
- **Dynamo:** DeCandia et al. (2007).

## Quotes that capture system design

> "There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton

> "First, do the simplest thing that could possibly work. Then evolve it as needed." — Advice from many sources

> "If you can't measure it, you can't improve it." — Peter Drucker

## Online resources

- **The morning paper** (Adrian Colyer): <https://blog.acolyer.org/> — academic paper summaries.
- **High Scalability:** <http://highscalability.com/> — case studies of large systems.
- **InfoQ:** <https://www.infoq.com/> — talks and articles.
- **InfoQ eMag:** Distributed systems content.