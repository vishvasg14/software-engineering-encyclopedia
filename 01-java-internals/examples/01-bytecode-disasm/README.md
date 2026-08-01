# 01 — Bytecode Disassembly

## What this demonstrates

How to inspect bytecode for a simple Java class using `javap -c -v`.

## Files

- `Hello.java` — a trivial program with a tight loop.

## Run

```bash
cd 01-bytecode-disasm
javac -g Hello.java
javap -c -p -v Hello.class
```

## What to look for

- The `Code` attribute shows bytecode instructions with operand stack effects.
- `LocalVariableTable` shows local variable names (requires `-g`).
- `LineNumberTable` shows which source line each instruction corresponds to.
- Compare with C2 output: `java -XX:+UnlockDiagnosticVMOptions -XX:+PrintAssembly -XX:CompileCommand=print,*Hello.main Hello` (requires `hsdis` library).