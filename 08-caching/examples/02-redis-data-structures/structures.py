"""Redis data structures (Python)."""
import redis
import time

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

# Hash: object storage
print("=== Hash ===")
r.hset("user:1", mapping={
    "name": "Alice",
    "email": "alice@example.com",
    "age": "30",
    "active": "true"
})
print(f"  Get: {r.hget('user:1', 'name')}")
print(f"  Get all: {r.hgetall('user:1')}")
r.hincrby("user:1", "age", 1)
print(f"  After hincrby age: {r.hget('user:1', 'age')}")

# List: queue, recent activity
print("\n=== List ===")
r.delete("queue")
r.lpush("queue", "task1", "task2", "task3")
print(f"  Queue: {r.lrange('queue', 0, -1)}")
task = r.brpop("queue", timeout=1)
print(f"  BRPOP: {task}")

# Set: unique items
print("\n=== Set ===")
r.delete("followers:user:1")
r.sadd("followers:user:1", "alice", "bob", "carol", "alice")  # 'alice' dedup
print(f"  Followers: {r.smembers('followers:user:1')}")
print(f"  Count: {r.scard('followers:user:1')}")

# Sorted set: leaderboard
print("\n=== Sorted Set ===")
r.delete("leaderboard:game:1")
r.zadd("leaderboard:game:1", {"alice": 1500, "bob": 1200, "carol": 1800, "dave": 950})
print(f"  Top 3: {r.zrevrange('leaderboard:game:1', 0, 2, withscores=True)}")
r.zincrby("leaderboard:game:1", 100, "dave")
print(f"  After +100 to dave: {r.zscore('leaderboard:game:1', 'dave')}")

# Stream: append-only log
print("\n=== Stream ===")
r.delete("events:user:1")
r.xadd("events:user:1", {"type": "click", "url": "/home"})
r.xadd("events:user:1", {"type": "view", "url": "/about"})
print(f"  Stream length: {r.xlen('events:user:1')}")
print(f"  Entries: {r.xrange('events:user:1', '-', '+')}")

# HyperLogLog: distinct count (approximate)
print("\n=== HyperLogLog ===")
r.delete("visitors:daily")
for i in range(10000):
    r.pfadd("visitors:daily", f"user-{i}")
print(f"  Distinct count (approx): {r.pfcount('visitors:daily')}")
print(f"  Memory: tiny (~12 KB)")

# Cleanup
for key in ["user:1", "queue", "followers:user:1", "leaderboard:game:1",
            "events:user:1", "visitors:daily"]:
    r.delete(key)
print("\nCleaned up")