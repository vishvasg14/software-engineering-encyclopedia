package com.example.service;

import com.example.repository.OrderRepository;
import com.example.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryRepository inventoryRepository;
    private final AuditService auditService;

    public OrderService(OrderRepository orderRepository,
                        InventoryRepository inventoryRepository,
                        AuditService auditService) {
        this.orderRepository = orderRepository;
        this.inventoryRepository = inventoryRepository;
        this.auditService = auditService;
    }

    // Default propagation: REQUIRED
    @Transactional
    public Order placeOrder(Order order) {
        inventoryRepository.reserve(order.getItems());
        Order saved = orderRepository.save(order);
        auditService.logOrderAttempt(saved);
        return saved;
    }

    // Independent transaction for audit
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOrderAttempt(Order order) {
        // committed even if outer rolls back
    }

    // Read-only optimization
    @Transactional(readOnly = true)
    public List<Order> findOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}

class AuditService {
    public void logOrderAttempt(Order order) { /* ... */ }
}

class Order {
    private java.util.List<String> items;
    public java.util.List<String> getItems() { return items; }
}

class OrderRepository {
    public Order save(Order o) { return o; }
    public java.util.List<Order> findByUserId(Long id) { return java.util.List.of(); }
}

class InventoryRepository {
    public void reserve(java.util.List<String> items) { /* ... */ }
}