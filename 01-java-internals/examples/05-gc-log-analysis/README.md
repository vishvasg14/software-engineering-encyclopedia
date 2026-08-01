# 05 — GC Log Analysis Walkthrough

## What this demonstrates

How to read unified JVM logging output and identify common patterns.

## Files

- `LogGenerator.java` — produces a workload that triggers several GC events.
- `sample-gc.log` — sample output for offline analysis.

## Generating a GC log

```bash
java -Xlog:gc*,safepoint:file=gc.log:time,uptime,level,tags:filecount=5,filesize=10M LogGenerator
```

Open `gc.log` in GCViewer (<https://github.com/chewiebug/GCViewer>) or upload to gceasy.io for analysis.

## Sample log entries

```
[0.123s][info][gc] Using G1
[2.345s][info][gc] GC(0) Pause Young (Normal) (G1 Evacuation Pause) 24M->8M(256M) 12.345ms
[10.567s][info][gc] GC(1) Pause Young (Concurrent Start) (G1 Humongous Allocation) 64M->32M(256M) 8.901ms
[15.789s][info][gc] GC(2) Pause Young (Prepare Mixed) (G1 Evacuation Pause) 96M->64M(256M) 25.678ms
[20.123s][info][gc] GC(3) Pause Mixed (G1 Evacuation Pause) 192M->128M(256M) 45.678ms
```

## What to look for

- **Pause duration** — `12.345ms` is the wall-clock pause. Look for outliers.
- **Before/after heap** — `24M->8M(256M)` means 24MB used before, 8MB after, 256MB total.
- **Cause** — `(Normal)`, `(Concurrent Start)`, `(G1 Humongous Allocation)`, `(Mixed)`.
- **Safepoint correlation** — pair with `-Xlog:safepoint` to see how long threads waited.