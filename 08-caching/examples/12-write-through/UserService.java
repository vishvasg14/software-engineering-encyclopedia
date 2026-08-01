// 12 — Write-through pattern (Java)

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
        return cache.get(id, userRepository::findById);
    }

    public User save(User user) {
        // Write-through: update DB and cache atomically
        User saved = userRepository.save(user);
        cache.put(saved.getId(), saved);
        return saved;
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
        cache.invalidate(id);
    }
}

record User(Long id, String name) {}
interface UserRepository {
    java.util.Optional<User> findById(Long id);
    User save(User u);
    void deleteById(Long id);
}