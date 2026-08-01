package com.example.kafka;

import org.apache.kafka.clients.admin.*;

import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * Demonstrate Kafka topic creation with replication.
 */
public class ReplicationSetup {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        Properties props = new Properties();
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");

        try (Admin admin = Admin.create(props)) {
            // Create topic with replication factor 3
            NewTopic orders = new NewTopic("orders", 3, (short) 3);
            Map<String, String> configs = new HashMap<>();
            configs.put("min.insync.replicas", "2");
            configs.put("retention.ms", "604800000");  // 7 days
            orders.configs(configs);
            admin.createTopics(List.of(orders)).all().get();
            System.out.println("Created topic 'orders' with RF=3, min.insync.replicas=2");

            // Describe
            DescribeTopicsResult desc = admin.describeTopics(List.of("orders"));
            desc.topicNameValues().get("orders").get().partitions().forEach(p ->
                System.out.printf("Partition %d: leader=%d, replicas=%s, isr=%s%n",
                    p.partition(),
                    p.leader().id(),
                    p.replicas().stream().map(n -> n.id()).toList(),
                    p.isr().stream().map(n -> n.id()).toList()));
        }
    }
}