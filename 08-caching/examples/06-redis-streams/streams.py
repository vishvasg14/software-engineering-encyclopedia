"""Redis Streams (Python)."""
import redis
import time
import threading

r = redis.Redis(host="localhost", port=6379, decode_responses=True)
STREAM = "events:user"
GROUP = "consumer-group-1"
CONSUMER = "consumer-1"

# Create stream and group
r.delete(STREAM)
r.xadd(STREAM, {"type": "init", "msg": "first"})
try:
    r.xgroup_create(STREAM, GROUP, id="0", mkstream=True)
except redis.exceptions.ResponseError:
    pass  # group already exists


# Producer
def producer():
    for i in range(20):
        r.xadd(STREAM, {"type": "click", "user": f"user-{i}", "url": "/home"})
        time.sleep(0.1)


# Consumer
def consumer():
    while True:
        # Read new messages
        msgs = r.xreadgroup(GROUP, CONSUMER, {STREAM: ">"}, count=5, block=1000)
        if not msgs:
            print(f"[{CONSUMER}] no new messages, sleeping...")
            time.sleep(1)
            continue
        for stream, entries in msgs:
            for msg_id, fields in entries:
                print(f"[{CONSUMER}] received: {msg_id} {fields}")
                # Process message...
                r.xack(STREAM, GROUP, msg_id)


# Run producer and consumer
threading.Thread(target=producer, daemon=True).start()
consumer()