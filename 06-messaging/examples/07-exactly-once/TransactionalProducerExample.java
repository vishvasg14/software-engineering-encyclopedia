package com.example.kafka;

import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * Read-process-write pattern with exactly-once semantics.
 *
 * Reads from "input" topic, processes, writes to "output" topic
 * + commits consumer offsets atomically.
 */
public class TransactionalProducerExample {

    public static void main(String[] args) {
        // Producer: transactional
        Properties producerProps = new Properties();
        producerProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        producerProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        producerProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        producerProps.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        producerProps.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "my-tx-id-1");
        producerProps.put(ProducerConfig.ACKS_CONFIG, "all");

        // Consumer: read-committed
        Properties consumerProps = new Properties();
        consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, "my-group");
        consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        consumerProps.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        consumerProps.put(ConsumerConfig.ISOLATION_LEVEL_CONFIG, "read_committed");

        try (KafkaProducer<String, String> producer = new KafkaProducer<>(producerProps);
             KafkaConsumer<String, String> consumer = new KafkaConsumer<>(consumerProps)) {

            producer.initTransactions();
            consumer.subscribe(List.of("input"));

            while (true) {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
                if (records.isEmpty()) continue;

                producer.beginTransaction();
                for (ConsumerRecord<String, String> record : records) {
                    // Process: simple uppercase
                    String processed = record.value().toUpperCase();
                    producer.send(new ProducerRecord<>("output", record.key(), processed));
                }

                // Send offsets to transaction
                Map<TopicPartition, OffsetAndMetadata> offsets = new HashMap<>();
                for (TopicPartition partition : records.partitions()) {
                    long offset = records.records(partition).get(records.records(partition).size() - 1).offset();
                    offsets.put(partition, new OffsetAndMetadata(offset + 1));
                }
                producer.sendOffsetsToTransaction(offsets, consumer.groupMetadata());
                producer.commitTransaction();
            }
        }
    }
}