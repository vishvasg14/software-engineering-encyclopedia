package com.example.cache;

import com.example.entity.User;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
public class UserCache {

    private final RedisTemplate<String, User> redisTemplate;

    public UserCache(RedisTemplate<String, User> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Optional<User> get(String id) {
        return Optional.ofNullable(redisTemplate.opsForValue().get("user:" + id));
    }

    public void put(String id, User user) {
        redisTemplate.opsForValue().set("user:" + id, user, Duration.ofMinutes(10));
    }

    public void evict(String id) {
        redisTemplate.delete("user:" + id);
    }
}