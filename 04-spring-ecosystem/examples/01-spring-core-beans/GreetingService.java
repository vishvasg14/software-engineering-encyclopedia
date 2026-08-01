package com.example.demo;

public class GreetingService {
    private final String greeting;
    public GreetingService(String greeting) { this.greeting = greeting; }
    public String greet(String name) { return greeting + ", " + name; }
}