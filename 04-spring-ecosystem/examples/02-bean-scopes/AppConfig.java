package com.example.scopes;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.context.annotation.RequestScope;

@Configuration
public class AppConfig {

    // Default: singleton — same instance every time
    @Bean
    public Counter counter() {
        return new Counter();
    }

    // Prototype — new instance each time requested
    @Bean
    @Scope("prototype")
    public ShoppingCart shoppingCart() {
        return new ShoppingCart();
    }

    // Request scope (web-tier only)
    @Bean
    @RequestScope
    public RequestInfo requestInfo() {
        return new RequestInfo();
    }
}

class Counter {
    private int count = 0;
    public void increment() { count++; }
    public int getCount() { return count; }
}

class ShoppingCart {
    private final java.util.Map<String, Integer> items = new java.util.HashMap<>();
    public void add(String item, int qty) { items.merge(item, qty, Integer::sum); }
    public java.util.Map<String, Integer> getItems() { return items; }
}

class RequestInfo {
    private final String requestId = java.util.UUID.randomUUID().toString();
    public String getRequestId() { return requestId; }
}