# 02 — JavaScript & TypeScript

This chapter treats JavaScript and TypeScript at the depth needed to confidently reason about production code: ECMAScript semantics, prototypal inheritance, async mechanics, the event loop, garbage collection, and the TypeScript type system.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [JavaScript & TypeScript](./javascript-typescript.md) | The flagship document: language semantics, async, prototypes, event loop, GC, TS type system | ✅ Complete |

## Related chapters

- [01 — Java Internals](../01-java-internals/README.md) — JVM's GC, JIT, and concurrency model parallels V8/SpiderMonkey/JSC. Helpful when reasoning about engine behavior.
- [03 — SQL & Databases](../03-sql-databases/README.md) — Most production apps persist to a database; SQL/JSONB features interact with TypeScript-typed models via ORMs.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Boot backends serve JSON consumed by JS/TS apps; CORS, content negotiation, and Spring Security policies are configured to play well with TS clients.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — Angular is TypeScript-first and builds on TypeScript concepts (interfaces, generics, conditional types) heavily.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- JavaScript syntax (variables, functions, arrays, objects, basic async/await).
- Some browser or Node.js development experience.
- Basic TypeScript types.

## ECMAScript Baseline

This document targets ECMAScript 2024 (ES15) as the modern baseline. ES2015 (ES6) is treated as the historical inflection point. TypeScript 5.6 is the TS baseline.

## Folder Layout

```
02-javascript-typescript/
├── README.md                   # this file
├── javascript-typescript.md    # the flagship document
├── diagrams/                   # Mermaid diagram sources
├── examples/                   # runnable JS/TS snippets
│   ├── 01-es-vs-ts-basics/
│   ├── 02-closures-and-scope/
│   ├── 03-this-binding/
│   ├── 04-prototypal-inheritance/
│   ├── 05-classes-and-inheritance/
│   ├── 06-async-await-event-loop/
│   ├── 07-promises-and-microtasks/
│   ├── 08-generators-and-iterators/
│   ├── 09-modules-esm-vs-cjs/
│   ├── 10-ts-narrowing-and-control-flow/
│   ├── 11-ts-generics-conditional/
│   ├── 12-ts-template-literal-types/
│   ├── 13-ts-declaration-files/
│   ├── 14-tsconfig-production/
│   ├── 15-prototype-pollution/
│   ├── 16-memory-leak-heapdump/
│   ├── 17-v8-bytecode/
│   └── 18-node-worker-threads/
└── references/                 # ECMAScript, TS, MDN, engines
    ├── ecmascript-spec.md
    ├── typescript-handbook.md
    ├── mdn-links.md
    └── engines.md
```