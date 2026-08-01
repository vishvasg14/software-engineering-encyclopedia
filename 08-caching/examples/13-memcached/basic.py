"""Memcached basics (Python)."""
import pymemcache

# Single server
client = pymemcache.Client(("localhost", 11211))

# Set with TTL (in seconds)
client.set("user:1", "Alice", expire=60)

# Get
value = client.get("user:1")
print(f"Value: {value}")

# Increment counter
client.set("counter", 0)
client.incr("counter", 1)
client.incr("counter", 1)
print(f"Counter: {client.get('counter')}")

# Add (only if not exists)
result = client.add("user:1", "Bob")
print(f"Add to existing key: {result}")  # False

result = client.add("user:2", "Bob")
print(f"Add to new key: {result}")  # True

# CAS (compare-and-swap)
client.set("cas-key", "value1", expire=60)
result = client.cas("cas-key", b"value2", b"value1")
print(f"CAS result: {result}")

# Hash-like storage
client.set("hash:1:name", "Alice")
client.set("hash:1:email", "alice@example.com")
name = client.get("hash:1:name")
email = client.get("hash:1:email")
print(f"Hash: {name} {email}")

# Multi-server setup
client = pymemcache.HashClient([
    ("server1", 11211),
    ("server2", 11211),
    ("server3", 11211),
])

# Operations are distributed via consistent hashing
client.set("distributed-key", "value")
print(f"Distributed value: {client.get('distributed-key')}")

# Cleanup
client.delete("user:1", "user:2", "counter", "cas-key", "hash:1:name", "hash:1:email", "distributed-key")
print("Cleaned up")