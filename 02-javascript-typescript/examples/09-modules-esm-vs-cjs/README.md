# 09 — Modules: ESM vs CJS

Demonstrates both module systems.

## Run

```bash
# ESM
node --experimental-vm-modules esm-main.mjs
# or just:
node esm-main.mjs

# CJS
node cjs-main.cjs
```

## Files

- `math.mjs` — ESM module (note: Node ESM requires `.mjs` or `"type": "module"` in package.json).
- `math.cjs` — CJS module.
- `esm-main.mjs` — ESM consumer.
- `cjs-main.cjs` — CJS consumer.
- `package.json` — package marker.