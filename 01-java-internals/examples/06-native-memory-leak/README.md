# 06 — Native Memory Leak with NIO

## What this demonstrates

How `ByteBuffer.allocateDirect` allocates native memory outside the heap. Without explicit cleanup, references are required for the GC to release it via the `Cleaner` mechanism.

## Files

- `Leak.java` — the leaky version.
- `Fixed.java` — uses a `Cleaner` (the modern approach; pre-Java-9 used `DirectByteBuffer.Deallocator`).

## Run

```bash
cd 06-native-memory-leak
javac Leak.java Fixed.java

# Run the leaky version, watching native memory with NMT:
java -XX:NativeMemoryTracking=detail -XX:+UnlockDiagnosticVMOptions \
     -XX:+PrintNMTStatistics Leak
# In another terminal, while it's running:
jcmd <pid> VM.native_memory summary

# Run the fixed version:
java -XX:NativeMemoryTracking=detail Fixed
```

## Diagnostic flow

```bash
# Find the PID
jps

# See native memory usage
jcmd <pid> VM.native_memory summary

# Baseline, do work, then diff
jcmd <pid> VM.native_memory baseline
# ... do work ...
jcmd <pid> VM.native_memory summary.diff
```

If native memory grows without bound, look for:

- Direct `ByteBuffer.allocateDirect` calls without cleanup.
- JNI libraries leaking.
- Compression libraries (LZ4, zstd) leaking.
- Netty `PooledByteBufAllocator` configuration.