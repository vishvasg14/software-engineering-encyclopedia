"""Redis transactions (Python)."""
import redis

r = redis.Redis(host="localhost", port=6379, decode_responses=True)


# MULTI / EXEC: atomic batch
def transfer(from_id: int, to_id: int, amount: int) -> bool:
    """Atomic transfer between two accounts."""
    pipe = r.pipeline()
    pipe.get(f"account:{from_id}:balance")
    pipe.get(f"account:{to_id}:balance")
    results = pipe.execute()
    from_balance = int(results[0] or 0)
    to_balance = int(results[1] or 0)
    if from_balance < amount:
        return False
    pipe = r.pipeline()
    pipe.decrby(f"account:{from_id}:balance", amount)
    pipe.incrby(f"account:{to_id}:balance", amount)
    pipe.execute()
    return True


# Set up accounts
r.set("account:1:balance", 100)
r.set("account:2:balance", 50)

print("Before transfer:", r.get("account:1:balance"), r.get("account:2:balance"))
result = transfer(1, 2, 30)
print(f"Transfer 30 from 1 to 2: {result}")
print("After transfer:", r.get("account:1:balance"), r.get("account:2:balance"))


# WATCH / MULTI / EXEC: optimistic locking
def increment_with_check(key: str) -> bool:
    """Atomically increment if value is a positive number."""
    with r.pipeline() as pipe:
        while True:
            try:
                pipe.watch(key)
                val = int(pipe.get(key) or 0)
                if val < 0:
                    pipe.unwatch()
                    return False
                pipe.multi()
                pipe.incr(key)
                pipe.execute()
                return True
            except redis.exceptions.WatchError:
                continue  # retry


r.set("counter", 0)
print(f"\nIncrement positive counter: {increment_with_check('counter')}")
print(f"Counter: {r.get('counter')}")
r.set("counter", -1)
print(f"Increment negative counter: {increment_with_check('counter')}")
print(f"Counter: {r.get('counter')}")

# Cleanup
r.delete("account:1:balance", "account:2:balance", "counter")
print("\nCleaned up")