# 04 — Reproducing a Safepoint-Induced Pause

## What this demonstrates

A thread in a tight loop with no back-edge safepoint poll will hold up stop-the-world operations. This is the source of "safepoint pauses" in production.

## Files

- `BadLoop.java` — the offending code.

## Run

```bash
cd 04-safepoint-pause
javac BadLoop.java
java -Xlog:safepoint=debug BadLoop
```

Expected output:

```
[0.123s][info][safepoint] Entering safepoint zone: VM_Operation
[0.123s][info][safepoint]         Wait for target thread to reach safepoint.
[2.456s][info][safepoint]         Thread "Thread-0" is stopped at 0x...
[2.456s][info][safepoint] Total time for which application threads were stopped: 2.333 seconds
```

The 2-second wait happens because `Math.sin` doesn't emit a safepoint poll; the loop never gives the JVM a chance to stop the thread.

## Production implications

- Avoid hot loops without back-edges or method calls.
- If you need numeric loops in hot paths, periodically call `Thread.onSpinWait()` or similar to give the JVM a chance to poll.

## Fix pattern

```java
long n = 0;
while (!Thread.currentThread().isInterrupted()) {
    double x = Math.sin(n++);
    sink = x;
    // Periodically yield to allow safepoint polling
    if ((n & 0xFFF) == 0) Thread.onSpinWait();
}
```