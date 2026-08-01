# Kafka Streams Documentation Reference

The authoritative source for Kafka Streams is the official documentation. This file catalogs the Kafka Streams documentation pages referenced in the Messaging document.

## Primary documentation

- **Kafka Streams:** <https://kafka.apache.org/documentation/streams/>
- **Kafka Streams Javadoc:** <https://kafka.apache.org/30/javadoc/org/apache/kafka/streams/>
- **Kafka Streams GitHub:** <https://github.com/apache/kafka/tree/trunk/streams>

## Architecture

### Core concepts

| Concept | URL |
|---------|-----|
| Stream | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_kstream> |
| Table | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_ktable> |
| GlobalKTable | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_globalktable> |
| KGroupedStream | <https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html#streams-developer-guide-dsl-aggregating> |
| Time | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_time> |
| Window | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_windowing> |
| Join | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_joins> |
| State | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_stateful> |
| Time | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_time> |
| Processor API | <https://kafka.apache.org/documentation/streams/core-concepts#streams_concepts_processor_api> |

### Architecture

| Topic | URL |
|-------|-----|
| Overview | <https://kafka.apache.org/documentation/streams/architecture> |
| Topology | <https://kafka.apache.org/documentation/streams/architecture#streams_architecture_topology> |
| Stream Partitions and Tasks | <https://kafka.apache.org/documentation/streams/architecture#streams_architecture_tasks> |
| Threading Model | <https://kafka.apache.org/documentation/streams/architecture#streams_architecture_thread> |
| State Stores | <https://kafka.apache.org/documentation/streams/architecture#streams_architecture_state> |
| Fault Tolerance | <https://kafka.apache.org/documentation/streams/architecture#streams_architecture_recovery> |
| Exactly-Once Semantics | <https://kafka.apache.org/documentation/streams/architecture#streams_architecture_eos> |
| Interactive Queries | <https://kafka.apache.org/documentation/streams/architecture#streams_architecture_interactive_queries> |

### Developer Guide

| Topic | URL |
|-------|-----|
| Writing a Streams Application | <https://kafka.apache.org/documentation/streams/developer-guide/writing-streams-application> |
| Testing a Streams Application | <https://kafka.apache.org/documentation/streams/developer-guide/testing> |
| Configuring a Streams Application | <https://kafka.apache.org/documentation/streams/developer-guide/config-streams> |
| DSL API | <https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html> |
| Processor API | <https://kafka.apache.org/documentation/streams/developer-guide/processor-api.html> |
| Connect to Kafka | <https://kafka.apache.org/documentation/streams/developer-guide/connect> |
| Interactive Queries | <https://kafka.apache.org/documentation/streams/developer-guide/interactive-queries> |
| Memory Management | <https://kafka.apache.org/documentation/streams/developer-guide/memory-mgmt> |
| Running Streams Application | <https://kafka.apache.org/documentation/streams/developer-guide/running-app> |
| Schema Evolution | <https://kafka.apache.org/documentation/streams/developer-guide/serdes> |

### KStream DSL

| Method | Purpose |
|--------|---------|
| `filter` | Filter elements |
| `map` / `mapValues` | Transform |
| `flatMap` / `flatMapValues` | Flatten |
| `peek` | Side effect without transform |
| `branch` | Split into multiple streams |
| `merge` | Combine streams |
| `selectKey` | Re-key |
| `groupBy` / `groupByKey` | Group for aggregation |
| `count` / `reduce` / `aggregate` | Aggregations |
| `join` / `leftJoin` / `outerJoin` | Stream-Stream joins |
| `toTable` | KStream to KTable |
| `windowedBy` | Windowing |
| `to` / `toStream` | Output |

### KTable DSL

| Method | Purpose |
|--------|---------|
| `filter` | Filter entries |
| `mapValues` | Transform values |
| `join` / `leftJoin` / `outerJoin` | KTable-KTable joins |
| `groupBy` | Group |
| `count` / `reduce` / `aggregate` | Aggregations |
| `toStream` | KTable to KStream |

### Processor API

The Processor API is more complex but more flexible:

```java
public class MyProcessor implements Processor<String, String> {
    private KeyValueStore<String, Long> store;

    @Override
    public void init(ProcessorContext context) {
        store = context.getStateStore("my-store");
    }

    @Override
    public void process(String key, String value) {
        // business logic
    }

    @Override
    public void close() {
        // cleanup
    }
}
```

### State stores

| Store type | Use case |
|------------|----------|
| In-memory | Fast, but not persistent |
| RocksDB | Persistent, fast, larger |
| Custom | Implement `StateStore` |

### Exactly-once semantics (EOS)

Three patterns:

1. **Idempotent producer** — same message can be sent multiple times safely.
2. **Transactional API** — atomic writes across partitions.
3. **Read-process-write pattern** — atomic read + process + write + commit offsets.

```java
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, StreamsConfig.EXACTLY_ONCE_V2);
```

### Interactive queries

Expose state stores as queryable REST endpoints:

```java
ReadOnlyKeyValueStore<String, Long> store = streams.store("my-store", QueryableStoreTypes.keyValueStore());
String value = store.get(someKey);
```

### Configuration

| Config | Default | Purpose |
|--------|---------|---------|
| `application.id` | — | Required; consumer group ID |
| `bootstrap.servers` | — | Required; Kafka broker list |
| `default.key.serde` | — | Default key serde |
| `default.value.serde` | — | Default value serde |
| `num.stream.threads` | 1 | Stream processing threads |
| `state.dir` | /tmp | State store directory |
| `cache.max.bytes.buffering` | 10MB | Cache size |
| `commit.interval.ms` | 30000 | Offset commit interval |
| `processing.guarantee` | at_least_once | exactly_once_v2 for EOS |

## Books

- *Kafka Streams in Action* — Bill Bejeck (Manning).
- *Effective Kafka* — Emil Koutanov (Leanpub).
- *Kafka: The Definitive Guide* — Gwen Shapira et al. (O'Reilly).

## Tools

- **kafka-streams-test-utils** — test utilities.
- **TopologyTestDriver** — in-memory test driver.
- **Interactive Queries REST API** — built-in.