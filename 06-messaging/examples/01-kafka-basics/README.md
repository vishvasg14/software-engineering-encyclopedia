# 01 — Kafka Basics

Demonstrates the fundamental Kafka concepts: topics, partitions, producers, consumers, consumer groups.

## Files

- `ProducerExample.java` — basic producer.
- `ConsumerExample.java` — basic consumer.

## Run

```bash
# Start Kafka (using a local broker or docker-compose)
docker compose up -d kafka

# Run producer
mvn exec:java -Dexec.mainClass="com.example.kafka.ProducerExample"

# Run consumer
mvn exec:java -Dexec.mainClass="com.example.kafka.ConsumerExample"
```