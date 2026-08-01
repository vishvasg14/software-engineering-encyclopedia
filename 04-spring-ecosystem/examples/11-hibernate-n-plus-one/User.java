package com.example.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // BatchSize reduces N+1: loads N lazy collections in 1 query
    @OneToMany(mappedBy = "user")
    @BatchSize(50)
    private List<Order> orders = new ArrayList<>();

    public Long getId() { return id; }
    public String getName() { return name; }
    public List<Order> getOrders() { return orders; }
}