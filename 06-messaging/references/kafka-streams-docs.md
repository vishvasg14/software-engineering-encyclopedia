# Kafka Streams Documentation Reference

The authoritative source for Kafka Streams is the official documentation. This file catalogs the Kafka Streams documentation pages referenced in the Messaging document.

## Primary documentation

- **Kafka Streams:** <https://kafka.apache.org/documentation/streams/>
- **Kafka Streams Javadoc:** <https://kafka.apache.org/30/javadoc/org/apache/kafka/streams/>
- **Kafka Streams GitHub:** <https://github.com/apache/kafka/tree/trunk/streams>

## Architecture

### Core concepts <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23core-concepts%0A%0ASection%20title%3A%20Core%20concepts" target="_blank" rel="noopener" data-askgpt="Core concepts" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#core-concepts" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23core-concepts%0A%0ASection%20title%3A%20Core%20concepts" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23core-concepts%0A%0ASection%20title%3A%20Core%20concepts" title="Ask ChatGPT about this section">💬</a>

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

### Architecture <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23architecture%0A%0ASection%20title%3A%20Architecture" target="_blank" rel="noopener" data-askgpt="Architecture" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#architecture" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23architecture%0A%0ASection%20title%3A%20Architecture" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23architecture%0A%0ASection%20title%3A%20Architecture" title="Ask ChatGPT about this section">💬</a>

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

### Developer Guide <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23developer-guide%0A%0ASection%20title%3A%20Developer%20Guide" target="_blank" rel="noopener" data-askgpt="Developer Guide" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#developer-guide" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23developer-guide%0A%0ASection%20title%3A%20Developer%20Guide" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23developer-guide%0A%0ASection%20title%3A%20Developer%20Guide" title="Ask ChatGPT about this section">💬</a>

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

### KStream DSL <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23kstream-dsl%0A%0ASection%20title%3A%20KStream%20DSL" target="_blank" rel="noopener" data-askgpt="KStream DSL" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#kstream-dsl" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23kstream-dsl%0A%0ASection%20title%3A%20KStream%20DSL" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23kstream-dsl%0A%0ASection%20title%3A%20KStream%20DSL" title="Ask ChatGPT about this section">💬</a>

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

### KTable DSL <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23ktable-dsl%0A%0ASection%20title%3A%20KTable%20DSL" target="_blank" rel="noopener" data-askgpt="KTable DSL" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#ktable-dsl" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23ktable-dsl%0A%0ASection%20title%3A%20KTable%20DSL" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23ktable-dsl%0A%0ASection%20title%3A%20KTable%20DSL" title="Ask ChatGPT about this section">💬</a>

| Method | Purpose |
|--------|---------|
| `filter` | Filter entries |
| `mapValues` | Transform values |
| `join` / `leftJoin` / `outerJoin` | KTable-KTable joins |
| `groupBy` | Group |
| `count` / `reduce` / `aggregate` | Aggregations |
| `toStream` | KTable to KStream |

### Processor API <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23processor-api%0A%0ASection%20title%3A%20Processor%20API" target="_blank" rel="noopener" data-askgpt="Processor API" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#processor-api" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23processor-api%0A%0ASection%20title%3A%20Processor%20API" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23processor-api%0A%0ASection%20title%3A%20Processor%20API" title="Ask ChatGPT about this section">💬</a>

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

### State stores <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23state-stores%0A%0ASection%20title%3A%20State%20stores" target="_blank" rel="noopener" data-askgpt="State stores" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#state-stores" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23state-stores%0A%0ASection%20title%3A%20State%20stores" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23state-stores%0A%0ASection%20title%3A%20State%20stores" title="Ask ChatGPT about this section">💬</a>

| Store type | Use case |
|------------|----------|
| In-memory | Fast, but not persistent |
| RocksDB | Persistent, fast, larger |
| Custom | Implement `StateStore` |

### Exactly-once semantics (EOS) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23exactly-once-semantics-eos%0A%0ASection%20title%3A%20Exactly-once%20semantics%20(EOS)" target="_blank" rel="noopener" data-askgpt="Exactly-once semantics (EOS)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#exactly-once-semantics-eos" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23exactly-once-semantics-eos%0A%0ASection%20title%3A%20Exactly-once%20semantics%20(EOS)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23exactly-once-semantics-eos%0A%0ASection%20title%3A%20Exactly-once%20semantics%20(EOS)" title="Ask ChatGPT about this section">💬</a>

Three patterns:

1. **Idempotent producer** — same message can be sent multiple times safely.
2. **Transactional API** — atomic writes across partitions.
3. **Read-process-write pattern** — atomic read + process + write + commit offsets.

```java
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, StreamsConfig.EXACTLY_ONCE_V2);
```

### Interactive queries <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23interactive-queries%0A%0ASection%20title%3A%20Interactive%20queries" target="_blank" rel="noopener" data-askgpt="Interactive queries" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#interactive-queries" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23interactive-queries%0A%0ASection%20title%3A%20Interactive%20queries" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23interactive-queries%0A%0ASection%20title%3A%20Interactive%20queries" title="Ask ChatGPT about this section">💬</a>

Expose state stores as queryable REST endpoints:

```java
ReadOnlyKeyValueStore<String, Long> store = streams.store("my-store", QueryableStoreTypes.keyValueStore());
String value = store.get(someKey);
```

### Configuration <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" target="_blank" rel="noopener" data-askgpt="Configuration" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/06-messaging/references/kafka-streams-docs.md#configuration" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F06-messaging%2Freferences%2Fkafka-streams-docs.md%23configuration%0A%0ASection%20title%3A%20Configuration" title="Ask ChatGPT about this section">💬</a>

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