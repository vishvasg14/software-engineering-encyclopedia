# Caffeine Documentation Reference

The authoritative source for Caffeine is the GitHub project and the user guide. This file catalogs the Caffeine documentation pages referenced in the Caching document.

## Primary documentation

- **Caffeine GitHub:** <https://github.com/ben-manes/caffeine>
- **Caffeine wiki:** <https://github.com/ben-manes/caffeine/wiki>
- **Caffeine Javadoc:** <https://www.javadoc.io/doc/com.github.ben-manes.caffeine/caffeine>
- **Caffeine user guide:** <https://github.com/ben-manes/caffeine/wiki/User-guide>

## Topics referenced in the document

| Topic | Wiki Page |
|-------|-----------|
| **User Guide** | <https://github.com/ben-manes/caffeine/wiki/User-guide> |
| **Loading cache** | <https://github.com/ben-manes/caffeine/wiki/Loading-cache> |
| **Async loading** | <https://github.com/ben-manes/caffeine/wiki/Async-loading> |
| **Eviction** | <https://github.com/ben-manes/caffeine/wiki/Eviction> |
| **Expiration** | <https://github.com/ben-manes/caffeine/wiki/Expiration> |
| **Refresh** | <https://github.com/ben-manes/caffeine/wiki/Refresh> |
| **Statistics** | <https://github.com/ben-manes/caffeine/wiki/Statistics> |
| **Population** | <https://github.com/ben-manes/caffeine/wiki/Population> |
| **Benchmarks** | <https://github.com/ben-manes/caffeine/wiki/Benchmarks> |

## Core API

### Basic cache <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Basic%20cache'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Basic cache" title="Ask ChatGPT about this section">💬</a>

```java
Cache<Key, Graph> cache = Caffeine.newBuilder()
    .maximumSize(10_000)
    .expireAfterWrite(Duration.ofMinutes(5))
    .build();

// Manual cache
Cache<Key, Graph> cache = Caffeine.newBuilder().build();
cache.put(key, value);
Graph value = cache.get(key, k -> createExpensiveGraph(k));
cache.invalidate(key);
```

### Loading cache <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Loading%20cache'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Loading cache" title="Ask ChatGPT about this section">💬</a>

```java
LoadingCache<Key, Graph> cache = Caffeine.newBuilder()
    .maximumSize(10_000)
    .expireAfterWrite(Duration.ofMinutes(5))
    .build(key -> createExpensiveGraph(key));

// Synchronous get-or-load
Graph value = cache.get(key);
```

### Async loading <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Async%20loading'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Async loading" title="Ask ChatGPT about this section">💬</a>

```java
AsyncCache<Key, Graph> cache = Caffeine.newBuilder()
    .maximumSize(10_000)
    .buildAsync();

// Non-blocking get
CompletableFuture<Graph> future = cache.get(key, k -> createExpensiveGraph(k));
```

## Configuration options

### Size-based <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Size-based'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Size-based" title="Ask ChatGPT about this section">💬</a>

| Option | Description |
|--------|-------------|
| `maximumSize(long)` | Max entries (rejects when full) |
| `maximumWeight(long)` | Max weight |
| `weigher(Weigher)` | Custom weight function |
| `weakKeys()`, `weakValues()` | Use weak references |
| `softValues()` | Use soft references |

### Time-based <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Time-based'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Time-based" title="Ask ChatGPT about this section">💬</a>

| Option | Description |
|--------|-------------|
| `expireAfterWrite(Duration)` | Expire after write |
| `expireAfterAccess(Duration)` | Expire after read or write |
| `expireAfter(Expiry)` | Custom expiry policy |
| `refreshAfterWrite(Duration)` | Async refresh before expiry |
| `refreshAfterAccess(Duration)` | Async refresh after read |

### Population <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Population'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Population" title="Ask ChatGPT about this section">💬</a>

| Option | Description |
|--------|-------------|
| `initialCapacity(int)` | Initial capacity |
| `maximumSize(long)` | Max size |
| `weakKeys()`, `weakValues()` | Weak references |
| `softValues()` | Soft references |
| `recordStats()` | Enable statistics |

### Eviction <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Eviction'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Eviction" title="Ask ChatGPT about this section">💬</a>

| Option | Description |
|--------|-------------|
| `removalListener(RemovalListener)` | Listen to eviction events |
| `evictionListener(EvictionListener)` | Listen to evictions only |

### Other <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Other'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Other" title="Ask ChatGPT about this section">💬</a>

| Option | Description |
|--------|-------------|
| `recordStats()` | Enable stats |
| `scheduler(Executor)` | Custom scheduler for expirations |
| `executor(Executor)` | Custom executor for async |

## Statistics

```java
Cache<Key, Graph> cache = Caffeine.newBuilder()
    .recordStats()
    .build();

CacheStats stats = cache.stats();
stats.hitCount();
stats.missCount();
stats.loadCount();
stats.evictionCount();
stats.hitRate();
```

## Spring Boot integration

- **Spring Boot reference:** <https://docs.spring.io/spring-boot/docs/current/reference/html/io.html#io.caching>
- **Spring Cache abstraction:** <https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#cache>
- **Caffeine Spring Boot Starter:** Add `caffeine` dependency; configure via `spring.cache.cache-names` and `spring.cache.caffeine.spec`.

```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CaffeineCacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager();
        manager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(Duration.ofMinutes(5)));
        return manager;
    }
}

@Service
public class UserService {

    @Cacheable("users")
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}
```

## Versions

| Version | Year | Java baseline |
|---------|------|---------------|
| 2.x | 2016 | Java 6+ |
| 3.0 | 2021 | Java 11+ |
| 3.1 | 2022 | Java 11+ |
| 3.2 | 2025 | Java 17+ (recommended) |

## Maven dependency

```xml
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
    <version>3.2.0</version>
</dependency>
```

## Books and resources

- *Caffeine wiki* — covers all options.
- *Designing Data-Intensive Applications* — Martin Kleppmann.
- *Java Performance: The Definitive Guide* — covers in-memory caching.