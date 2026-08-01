# 16 — Memory Leak Detection via Heap Snapshot

Demonstrates a common memory leak pattern (event listener not removed) and how to detect it with a heap snapshot.

## Run

```bash
node --inspect leak.js
# Open chrome://inspect, connect to the Node process
# Take heap snapshots before and after the leak accumulates
```

For a one-shot capture:

```bash
node --expose-gc leak.js
```