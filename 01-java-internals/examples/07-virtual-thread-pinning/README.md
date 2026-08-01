# 07 — Virtual Thread Pinning Demo

## What this demonstrates

In Java 21, `synchronized` blocks cause virtual threads to *pin* their carrier thread. This means a virtual thread holding a `synchronized` lock blocks its carrier from running other virtual threads. JEP 491 in Java 24 fixed this for `synchronized`, but JNI pinning remains.

## Files

- `PinningDemo.java` — creates 1000 virtual threads that hold `synchronized` briefly.

## Run (Java 21)

```bash
cd 07-virtual-thread-pinning
javac --release 21 PinningDemo.java
java -XX:+EnableDynamicAgentLoading=false \
     -Djdk.tracePinnedThreads=full \
     PinningDemo
```

The `-Djdk.tracePinnedThreads=full` flag prints each pinning event with stack trace.

## Java 24+ behavior

With JEP 491, `synchronized` no longer pins. Try the same demo on Java 24 and observe no pinning warnings.

## When does pinning still occur (any JDK)?

1. JNI calls while holding a monitor.
2. `System` calls into native code (rare in Java 21+).
3. Some debugger operations.

## Production check

```bash
# Enable pinning trace at runtime:
jcmd <pid> VM.set_flag jdk.tracePinnedThreads full
```

Or via JFR event `jdk.VirtualThreadPinned`.