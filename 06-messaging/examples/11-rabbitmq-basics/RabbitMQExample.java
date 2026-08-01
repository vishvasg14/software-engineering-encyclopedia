package com.example.rabbitmq;

import com.rabbitmq.client.*;

import java.nio.charset.StandardCharsets;

/**
 * RabbitMQ producer and consumer using AMQP.
 */
public class RabbitMQExample {

    private static final String QUEUE_NAME = "my-queue";

    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        factory.setUsername("guest");
        factory.setPassword("guest");

        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {

            // Declare queue (idempotent)
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

            // Publish
            String message = "Hello, RabbitMQ!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println("Sent: " + message);

            // Consume
            DeliverCallback callback = (consumerTag, delivery) -> {
                String body = new String(delivery.getBody(), StandardCharsets.UTF_8);
                System.out.println("Received: " + body);
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            };
            channel.basicConsume(QUEUE_NAME, false, callback, consumerTag -> {});
        }
    }
}