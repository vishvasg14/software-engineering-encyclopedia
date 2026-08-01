"""Redis basics (Python)."""
import redis

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

# Strings
r.set("user:1:name", "Alice", ex=60)  # 60-second TTL
name = r.get("user:1:name")
print(f"Name: {name}")

# Atomic counter
r.set("counter", 0)
r.incr("counter")
r.incr("counter")
r.incrby("counter", 10)
print(f"Counter: {r.get('counter')}")

# TTL operations
r.set("temp", "data", ex=10)
ttl = r.ttl("temp")
print(f"TTL: {ttl} seconds")

# Multiple operations (pipelining)
pipe = r.pipeline()
pipe.set("k1", "v1")
pipe.set("k2", "v2")
pipe.get("k1")
pipe.get("k2")
results = pipe.execute()
print(f"Pipeline results: {results}")

# Hash
r.hset("user:1", mapping={"name": "Alice", "email": "alice@example.com"})
print(f"User: {r.hgetall('user:1')}")

# List
r.lpush("recent:activity", "alice:click", "alice:view", "alice:login")
print(f"Recent: {r.lrange('recent:activity', 0, 2)}")

# Set
r.sadd("tags:article:1", "tech", "redis", "cache")
print(f"Tags: {r.smembers('tags:article:1')}")

# Cleanup
for key in r.scan_iter("user:*"):
    r.delete(key)
for key in r.scan_iter("k*"):
    r.delete(key)
r.delete("counter", "temp", "recent:activity", "tags:article:1")
print("Cleaned up")