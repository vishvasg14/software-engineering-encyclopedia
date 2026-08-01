# 17 — V8 Bytecode Inspection

Demonstrates how to inspect V8 bytecode with `--print-bytecode`.

## Run

```bash
node --print-bytecode hot.js
```

Look for:
- `LdaSmi`, `Add`, `Return` — basic arithmetic.
- `CallStub`, `CallRuntime` — function calls.
- `JumpLoop` — loop headers.

V8 uses a register-based bytecode with an accumulator model.