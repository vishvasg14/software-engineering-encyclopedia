package com.example.service;

import org.springframework.stereotype.Service;

@Service
public class MyService {
    public String doWork(String input) {
        return "processed: " + input;
    }
}