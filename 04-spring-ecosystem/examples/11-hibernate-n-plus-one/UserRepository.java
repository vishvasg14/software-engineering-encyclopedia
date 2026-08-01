package com.example.repository;

import com.example.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    // BAD: N+1 — fetches users, then 1 query per user for orders
    List<User> findAll();

    // GOOD: JOIN FETCH loads users and orders in one query
    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.orders")
    List<User> findAllWithOrdersFetch();

    // GOOD: @EntityGraph does the same declaratively
    @EntityGraph(attributePaths = {"orders"})
    @Query("SELECT u FROM User u")
    List<User> findAllWithOrdersGraph();

    // GOOD: batch fetching reduces N+1 to N/B + 1
    // (annotate the field with @BatchSize(N) in the entity)
}