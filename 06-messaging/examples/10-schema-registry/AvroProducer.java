package com.example.kafka;

import io.confluent.kafka.serializers.KafkaAvroSerializer;
import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

/**
 * Avro producer using Confluent Schema Registry.
 */
public class AvroProducer {

    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class.getName());
        props.put("schema.registry.url", "http://localhost:8081");
        // Note: in real code, use a generated Order class via maven plugin.

        // Order order = new Order("o1", "c1", 99.99, "USD", Instant.now().toEpochMilli());
        // producer.send(new ProducerRecord<>("orders", order.getId(), order));

        System.out.println("Configure with your generated Avro class for full example.");
    }
}