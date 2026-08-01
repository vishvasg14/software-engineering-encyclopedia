# Redis Documentation Reference

The authoritative source for Redis is the Redis project and Redis Labs. This file catalogs the Redis documentation pages referenced in the Caching document.

## Primary documentation

- **Redis Documentation:** <https://redis.io/docs/>
- **Redis GitHub:** <https://github.com/redis/redis>
- **Redis Source:** <https://github.com/redis/redis/tree/unstable>
- **Redis University:** <https://university.redis.io/>
- **Redis Labs Blog:** <https://redis.com/blog/>

## Topics referenced in the document

### Getting started <a class="askgpt-btn" data-askgpt="Getting started" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Quick start | <https://redis.io/docs/getting-started/> |
| Installation | <https://redis.io/docs/getting-started/installation/> |

### Data types <a class="askgpt-btn" data-askgpt="Data types" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Strings | <https://redis.io/docs/data-types/strings/> |
| Lists | <https://redis.io/docs/data-types/lists/> |
| Sets | <https://redis.io/docs/data-types/sets/> |
| Sorted sets | <https://redis.io/docs/data-types/sorted-sets/> |
| Hashes | <https://redis.io/docs/data-types/hashes/> |
| Streams | <https://redis.io/docs/data-types/streams/> |
| Bitmaps | <https://redis.io/docs/data-types/bitmaps/> |
| HyperLogLogs | <https://redis.io/docs/data-types/hyperloglogs/> |
| Geospatial | <https://redis.io/docs/data-types/geospatial/> |

### Commands <a class="askgpt-btn" data-askgpt="Commands" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Key commands | <https://redis.io/commands/keys/> |
| String commands | <https://redis.io/commands/strings/> |
| List commands | <https://redis.io/commands/lists/> |
| Sorted set commands | <https://redis.io/commands/sorted-set/> |
| Stream commands | <https://redis.io/commands/streams/> |
| Pub/Sub | <https://redis.io/docs/develop/pubsub/> |
| Transactions | <https://redis.io/docs/interact/transactions/> |
| Lua scripting | <https://redis.io/docs/interact/programmability/> |
| Streams intro | <https://redis.io/docs/data-types/streams/> |
| Consumer groups | <https://redis.io/docs/data-types/streams/#consumer-groups> |

### Persistence <a class="askgpt-btn" data-askgpt="Persistence" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| RDB persistence | <https://redis.io/docs/management/persistence/> |
| AOF persistence | <https://redis.io/docs/management/persistence/> |
| Persistence trade-offs | <https://redis.io/docs/management/persistence/> |

### Replication and HA <a class="askgpt-btn" data-askgpt="Replication and HA" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Replication | <https://redis.io/docs/management/replication/> |
| Sentinel | <https://redis.io/docs/management/sentinel/> |
| Cluster | <https://redis.io/docs/management/scaling/> |
| Cluster tutorial | <https://redis.io/docs/management/scaling/> |

### Operations <a class="askgpt-btn" data-askgpt="Operations" title="Ask ChatGPT about this section">💬</a>

| Topic | URL |
|-------|-----|
| Configuration | <https://redis.io/docs/management/config-files/> |
| Memory optimization | <https://redis.io/docs/management/optimization/> |
| Latency monitoring | <https://redis.io/docs/management/latency/> |
| Security | <https://redis.io/docs/management/security/> |
| ACL | <https://redis.io/docs/management/access-control/> |
| TLS | <https://redis.io/docs/management/security/> |

### Clients <a class="askgpt-btn" data-askgpt="Clients" title="Ask ChatGPT about this section">💬</a>

| Language | Client |
|----------|--------|
| Java | Jedis, Lettuce (used by Spring Data Redis), Redisson |
| Python | redis-py |
| Node.js | ioredis, node-redis |
| Go | go-redis |
| C# | StackExchange.Redis |

## Redis versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 1.0 | 2009 | Initial release |
| 2.0 | 2010 | Replication |
| 2.6 | 2012 | Lua scripting |
| 2.8 | 2013 | Cluster (preview) |
| 3.0 | 2015 | Cluster (GA), GEO commands |
| 3.2 | 2016 | Streams (preview), LFU eviction |
| 4.0 | 2017 | Modules |
| 5.0 | 2018 | Streams (GA) |
| 6.0 | 2020 | ACL, RESP3 |
| 6.2 | 2021 | Client-side caching |
| 7.0 | 2023 | Functions, ACLv2 |
| 7.2 | 2024 | More functions, AUTO* in RedisJSON |
| 7.4 | 2025 | Continued improvements |

## Books

- *Redis in Action* — Josiah Carlson (Manning).
- *Redis Cookbook* — Tiago Macedo, Fred Oliveira (O'Reilly).
- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly). Free online.
- *High Performance MySQL* — Schwartz et al. (O'Reilly) — has Redis comparison.

## Community

- **Redis Discord:** <https://discord.gg/redis>
- **Redis Forum:** <https://github.com/redis/redis/discussions>
- **RedisConf:** Annual conference.