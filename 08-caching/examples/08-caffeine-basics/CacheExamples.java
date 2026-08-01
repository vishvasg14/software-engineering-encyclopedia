// 08 — Caffeine basics (Java)

package com.example.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.github.benmanes.caffeine.cache.stats.CacheStats;

import java.time.Duration;

public class CacheExamples {

    public static void main(String[] args) {
        // Basic cache
        Cache<String, User> cache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(Duration.ofMinutes(5))
            .build();

        // Manual put
        cache.put("user:1", new User("1", "Alice"));
        User user = cache.getIfPresent("user:1");

        // Get with loader (function called on miss)
        user = cache.get("user:2", key -> {
            // load from database
            return new User("2", "Bob");
        });

        // Loading cache (auto-load on miss)
        LoadingCache<String, User> loadingCache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(Duration.ofMinutes(5))
            .build(key -> {
                // loader function
                return new User(key, "Loaded-" + key);
            });

        User user3 = loadingCache.get("3");  // auto-loads

        // Cache with statistics
        Cache<String, User> statsCache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .recordStats()
            .build();

        // Run some operations
        for (int i = 0; i < 1000; i++) {
            statsCache.get("key-" + (i % 100), k -> new User(k, k));
        }

        CacheStats stats = statsCache.stats();
        System.out.println("Hit rate: " + stats.hitRate());
        System.out.println("Hits: " + stats.hitCount());
        System.out.println("Misses: " + stats.missCount());
        System.out.println("Evictions: " + stats.evictionCount());

        // Invalidate
        cache.invalidate("user:1");
        cache.invalidateAll();
    }

    record User(String id, String name) {}
}