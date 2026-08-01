# 06 — Async/Await and the Event Loop

Demonstrates the order of execution: synchronous code, microtasks, macrotasks.

## Run

```bash
node event-loop.js
```

## Expected output

```
1
5
3
4
2
```

`setTimeout` (macrotask) runs after microtasks (`Promise.then`, `queueMicrotask`).