package com.example.autowire;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AppConfig {

    @Bean
    public PaymentGateway stripeGateway() {
        return new PaymentGateway("stripe");
    }

    @Bean
    public PaymentGateway paypalGateway() {
        return new PaymentGateway("paypal");
    }

    // Primary bean — chosen when no qualifier
    @Bean
    @Primary
    public NotificationService emailService() {
        return new NotificationService("email");
    }

    @Bean
    public NotificationService smsService() {
        return new NotificationService("sms");
    }
}

class PaymentGateway {
    private final String name;
    public PaymentGateway(String name) { this.name = name; }
    public String getName() { return name; }
}

class NotificationService {
    private final String type;
    public NotificationService(String type) { this.type = type; }
    public String getType() { return type; }
}

class OrderService {
    private final PaymentGateway payment;
    private final NotificationService notification;

    // Constructor injection — preferred
    public OrderService(PaymentGateway payment, NotificationService notification) {
        this.payment = payment;
        this.notification = notification;
    }
}