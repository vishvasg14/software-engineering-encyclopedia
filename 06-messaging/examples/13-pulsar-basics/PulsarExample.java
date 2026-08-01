package com.example.pulsar;

import org.apache.pulsar.client.api.*;

/**
 * Pulsar producer and consumer.
 */
public class PulsarExample {

    public static void main(String[] args) throws Exception {
        try (PulsarClient client = PulsarClient.builder()
                .serviceUrl("pulsar://localhost:6650")
                .build()) {

            // Producer
            Producer<String> producer = client.newProducer(Schema.STRING)
                .topic("my-topic")
                .create();
            producer.send("Hello, Pulsar!");
            producer.close();

            // Consumer
            Consumer<String> consumer = client.newConsumer(Schema.STRING)
                .topic("my-topic")
                .subscriptionName("my-subscription")
                .subscriptionType(SubscriptionType.Exclusive)
                .subscribe();

            while (true) {
                Message<String> msg = consumer.receive();
                System.out.println("Received: " + msg.getValue());
                consumer.acknowledge(msg);
            }
        }
    }
}