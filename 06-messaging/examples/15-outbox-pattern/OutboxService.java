package com.example.outbox;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Outbox pattern: write events to outbox table in same transaction
 * as business write. Separate poller publishes to Kafka.
 */
@Service
public class OutboxService {

    private final OutboxRepository outboxRepository;
    private final KafkaTemplate<String, String> kafka;

    public OutboxService(OutboxRepository outboxRepository, KafkaTemplate<String, String> kafka) {
        this.outboxRepository = outboxRepository;
        this.kafka = kafka;
    }

    // Business logic: write to DB and outbox atomically
    @Transactional
    public Order createOrder(Order order) {
        orderRepository.save(order);
        OutboxEvent event = new OutboxEvent(
            UUID.randomUUID(),
            "Order",
            order.getId(),
            "OrderCreated",
            toJson(order),
            Instant.now(),
            false
        );
        outboxRepository.save(event);
        return order;
    }

    // Poller: publishes unpublished events to Kafka
    @Scheduled(fixedDelay = 1000)
    public void publishPending() {
        List<OutboxEvent> pending = outboxRepository.findByPublishedFalse();
        for (OutboxEvent event : pending) {
            try {
                kafka.send("domain-events", event.getAggregateId(), event.getPayload()).get();
                event.setPublished(true);
                outboxRepository.save(event);
            } catch (Exception e) {
                // log; will retry next iteration
            }
        }
    }

    private String toJson(Order order) {
        // Use Jackson or similar
        return "{}";
    }
}

// Stub entities
class Order {
    public String getId() { return "id"; }
}
interface OrderRepository { Order save(Order o); }
interface OutboxRepository {
    OutboxEvent save(OutboxEvent e);
    List<OutboxEvent> findByPublishedFalse();
}
class OutboxEvent {
    public OutboxEvent(UUID id, String t, String aid, String et, String p, Instant ts, boolean pub) {}
    public String getAggregateId() { return ""; }
    public String getPayload() { return ""; }
    public void setPublished(boolean b) {}
}