package com.example.rabbitmq;

import com.rabbitmq.client.*;

import java.nio.charset.StandardCharsets;

/**
 * Demonstrates RabbitMQ exchange types.
 */
public class RabbitMQExchanges {

    private static final String HOST = "localhost";

    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(HOST);
        try (Connection conn = factory.newConnection(); Channel ch = conn.createChannel()) {

            // DIRECT: routes by exact routing key
            ch.exchangeDeclare("direct-demo", BuiltinExchangeType.DIRECT);
            ch.queueDeclare("direct-q1", false, false, false, null);
            ch.queueBind("direct-q1", "direct-demo", "error");
            ch.basicPublish("direct-demo", "error", null, "err msg".getBytes());

            // FANOUT: broadcasts to all bound queues
            ch.exchangeDeclare("fanout-demo", BuiltinExchangeType.FANOUT);
            ch.queueDeclare("fanout-q1", false, false, false, null);
            ch.queueDeclare("fanout-q2", false, false, false, null);
            ch.queueBind("fanout-q1", "fanout-demo", "");
            ch.queueBind("fanout-q2", "fanout-demo", "");
            ch.basicPublish("fanout-demo", "", null, "broadcast".getBytes());

            // TOPIC: routes by pattern
            ch.exchangeDeclare("topic-demo", BuiltinExchangeType.TOPIC);
            ch.queueDeclare("topic-q1", false, false, false, null);
            ch.queueBind("topic-q1", "topic-demo", "orders.*.created");
            ch.basicPublish("topic-demo", "orders.us.created", null, "msg".getBytes());

            // HEADERS: routes based on header values
            ch.exchangeDeclare("headers-demo", BuiltinExchangeType.HEADERS);
            ch.queueDeclare("headers-q1", false, false, false, null);
            ch.queueBind("headers-q1", "headers-demo", "", new HashMap<String, Object>() {{
                put("x-match", "all");
                put("format", "json");
            }});

            System.out.println("All exchange types demonstrated.");
        }
    }
}