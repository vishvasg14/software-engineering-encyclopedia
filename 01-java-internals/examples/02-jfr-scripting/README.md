# 02 — JFR Scripting for Allocation Hotspots

## What this demonstrates

A JFR configuration file that captures allocation events and GC pauses with low overhead.

## Files

- `AllocationHotspots.jfc` — JFR configuration.
- `LoadGenerator.java` — produces allocations to fill the recording.

## Run

```bash
cd 02-jfr-scripting
javac LoadGenerator.java
java -XX:StartFlightRecording=filename=alloc.jfr,settings=AllocationHotspots.jfc LoadGenerator
```

Open `alloc.jfr` in JDK Mission Control. Inspect:

- **Memory** tab → **Allocations by Class**
- **JVM Internals** tab → **GC Pauses**

## Production tuning

For continuous profiling, omit the duration to record indefinitely:

```bash
java -XX:StartFlightRecording=maxsize=2G,disk=true,filename=/var/log/app.jfr ...
```