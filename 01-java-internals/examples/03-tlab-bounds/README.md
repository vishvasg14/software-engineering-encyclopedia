# 03 — TLAB Boundaries

## What this demonstrates

How TLAB allocation works in practice and how to observe TLAB refills.

## Files

- `TLABBench.java` — measures allocation rate and observes TLAB refills via JFR.

## Run

```bash
cd 03-tlab-bounds
javac TLABBench.java
java -XX:+UseTLAB -XX:+PrintTLAB TLABBench
```

## What to look for

The `-XX:+PrintTLAB` flag prints:

```
TLAB: avg: 17.000: 83.000 1.000 1.000
TLAB: gc thread: 0.000 0.000 0 0 0
TLAB: thread: 0x00007f8b3800c000 [id: 12345] desired_size: 1024KB slow allocs: 0
  refills: 1 max: 32768KB alloc: 0.00000000GB refills: 1 waste: 0.0%
TLAB: ...
```

This shows:

- `desired_size` — the current TLAB size for the thread.
- `refills` — how many times the TLAB was refilled (allocations crossed TLAB boundary).
- `slow allocs` — allocations that went through the slow path (large objects or out-of-TLAB).
- `waste` — percentage of TLAB space wasted at refill.

## Tuning

- `-XX:TLABSize=N` — initial TLAB size.
- `-XX:MinTLABSize=N`, `-XX:TLABRefillWasteFraction=N` — HotSpot's adaptive TLAB sizing.