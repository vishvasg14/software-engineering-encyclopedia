package com.example.kafka;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

/**
 * Producer with TLS + SASL/SCRAM authentication.
 */
public class SecureProducerExample {

    public static void main(String[] args) throws Exception {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");

        // TLS
        props.put("security.protocol", "SASL_SSL");
        props.put("ssl.truststore.location", "/etc/kafka/client.truststore.jks");
        props.put("ssl.truststore.password", System.getenv("TRUSTSTORE_PASSWORD"));

        // SASL/SCRAM
        props.put("sasl.mechanism", "SCRAM-SHA-512");
        props.put("sasl.jaas.config",
            "org.apache.kafka.common.security.scram.ScramLoginModule required " +
            "username=\"alice\" password=\"" + System.getenv("KAFKA_PASSWORD") + "\";");

        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);

        try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {
            producer.send(new ProducerRecord<>("orders", "key", "value")).get();
        }
    }
}