package com.example.kafka;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;
import java.util.concurrent.ExecutionException;

/**
 * Demonstrates partition key strategies.
 *
 * - Good key: orderId (high cardinality, well-distributed)
 * - Bad key: country (low cardinality, hot partitions)
 * - Good composite: userId + random salt (distributes load)
 */
public class PartitionKeyExample {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.ACKS_CONFIG, "all");

        try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {
            // Good: order ID
            for (int i = 0; i < 1000; i++) {
                String orderId = "order-" + i;
                producer.send(new ProducerRecord<>("events", orderId, "data"));
            }

            // Bad: country (low cardinality)
            for (int country : new String[]{"US", "UK", "DE"}) {
                // All "US" goes to one partition → hot partition
                producer.send(new ProducerRecord<>("events", country, "data"));
            }

            // Better: country + random salt
            for (int i = 0; i < 1000; i++) {
                String country = "US";
                String saltedKey = country + "-" + (int) (Math.random() * 100);
                producer.send(new ProducerRecord<>("events", saltedKey, "data"));
            }

            producer.flush();
        }
    }
}