// 11 — Cache-aside pattern (Java)

package com.example.app;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final Cache<Long, User> cache;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.cache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(Duration.ofMinutes(5))
            .build();
    }

    public User findById(Long id) {
        // 1. Check cache
        User cached = cache.getIfPresent(id);
        if (cached != null) {
            return cached;
        }
        // 2. Cache miss: hit DB
        User user = userRepository.findById(id).orElseThrow();
        // 3. Populate cache
        cache.put(id, user);
        return user;
    }

    public User updateUser(User user) {
        User updated = userRepository.save(user);
        // 4. Invalidate cache (cache-aside pattern)
        cache.invalidate(user.getId());
        return updated;
    }
}

record User(Long id, String name) {}
interface UserRepository {
    java.util.Optional<User> findById(Long id);
    User save(User u);
}