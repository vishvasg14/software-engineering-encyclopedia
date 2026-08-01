// 09 — Caffeine eviction policies (Java)

package com.example.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Weigher;
import com.github.benmanes.caffeine.cache.RemovalCause;
import com.github.benmanes.caffeine.cache.removalListener;

import java.time.Duration;

public class EvictionExamples {

    public static void main(String[] args) {
        // Size-based eviction
        Cache<String, String> bySize = Caffeine.newBuilder()
            .maximumSize(1000)
            .build();

        // Weight-based eviction
        Cache<String, byte[]> byWeight = Caffeine.newBuilder()
            .maximumWeight(10_000_000)  // 10 MB
            .weigher((Weigher<String, byte[]>) (key, value) -> value.length)
            .build();

        // Time-based expiration
        Cache<String, String> expired = Caffeine.newBuilder()
            .expireAfterWrite(Duration.ofMinutes(10))   // expire 10 min after write
            .build();

        Cache<String, String> accessExpired = Caffeine.newBuilder()
            .expireAfterAccess(Duration.ofMinutes(5))    // expire 5 min after last read
            .build();

        // Refresh-ahead (async refresh before expiry)
        Cache<String, String> refreshed = Caffeine.newBuilder()
            .refreshAfterWrite(Duration.ofMinutes(5))   // async refresh
            .build(key -> "loaded-" + key);

        // Custom expiry
        Cache<String, String> customExpiry = Caffeine.newBuilder()
            .expireAfter(new com.github.benmanes.caffeine.cache.Expiry<String, String>() {
                @Override
                public long expireAfterCreate(String key, String value, long currentTime) {
                    return Duration.ofMinutes(10).toNanos();
                }
                @Override
                public long expireAfterUpdate(String key, String value, long currentTime, long currentDuration) {
                    return currentDuration;
                }
                @Override
                public long expireAfterRead(String key, String value, long currentTime, long currentDuration) {
                    return currentDuration;
                }
            })
            .build();

        // Removal listener for evictions
        Cache<String, String> withListener = Caffeine.newBuilder()
            .removalListener((key, value, cause) -> {
                System.out.println("Removed: " + key + " cause=" + cause);
            })
            .build();

        // Use it
        withListener.put("key1", "value1");
        withListener.invalidate("key1");  // triggers listener

        // Soft values (collected under memory pressure)
        Cache<String, byte[]> softCache = Caffeine.newBuilder()
            .softValues()
            .build();

        // Weak keys
        Cache<Object, String> weakKeyCache = Caffeine.newBuilder()
            .weakKeys()
            .build();
        Object key = new Object();
        weakKeyCache.put(key, "value");
        // When key is GC'd, entry is removed
        key = null;
        System.gc();
    }
}