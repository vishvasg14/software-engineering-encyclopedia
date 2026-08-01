# ECMAScript Specification Reference

The authoritative source for the JavaScript language is the ECMAScript specification. This file catalogs the spec structure and key clauses referenced in the JavaScript & TypeScript document.

## Where to find the spec

- **Latest published specification:** <https://tc39.es/ecma262/>
- **Editorial draft (always-current):** <https://tc39.es/ecma262/>
- **PDF (current edition):** <https://ecma-international.org/publications/standards/Ecma-262.htm>
- **GitHub source:** <https://github.com/tc39/ecma262>
- **TC39 proposals catalog:** <https://github.com/tc39/proposals>

## Editions

| Edition | Year | Codename |
|---------|------|----------|
| ES1 | 1997 | First edition |
| ES2 | 1998 | Editorial changes |
| ES3 | 1999 | Regular expressions, try/catch |
| ES4 | (abandoned) | Never released |
| ES5 | 2009 | strict mode, JSON, Array methods |
| ES6 / ES2015 | 2015 | classes, modules, arrow fns, let/const, Promises, iterators |
| ES2016 | 2016 | `**` exponent, `Array.prototype.includes`, `**=` |
| ES2017 | 2017 | async/await, shared memory, `Object.values`, `Object.entries` |
| ES2018 | 2018 | rest/spread, async iteration, Promise.finally |
| ES2019 | 2019 | Array.flat, Object.fromEntries, optional catch binding |
| ES2020 | 2020 | optional chaining `?.`, nullish coalescing `??`, BigInt, dynamic import |
| ES2021 | 2021 | logical assignment operators, `String.replaceAll`, `Promise.any` |
| ES2022 | 2022 | top-level await, class fields, `Array.at`, error cause |
| ES2023 | 2023 | `Array.findLast`, `Array.findLastIndex`, `#private` in standard classes |
| ES2024 | 2024 | `Array.groupBy`, `Object.groupBy`, `Promise.withResolvers` |
| ES2025 | 2025 | Iterator helpers, `Set`/`Map` enhancements, `Promise.try` |

## Spec structure (current)

The ECMAScript specification has these top-level clauses:

| Clause | Title | What it covers |
|--------|-------|---------------|
| 1 | Scope | What the spec covers |
| 2 | Conformance | Requirements for conformant implementations |
| 3 | Normative References | External standards referenced |
| 4 | Overview | Introduction to language concepts |
| 5 | Notational Conventions | Grammars, algorithms, abstract operations |
| 6 | ECMAScript Data Types and Values | The value universe |
| 7 | Language Lexical Grammar | Tokens, identifiers, literals |
| 8 | Types | Number, String, Object, Symbol, etc. |
| 9 | Abstract Operations and Ordinary Objects | Internal algorithms |
| 10 | Ordinary and Exotic Objects | Object categories |
| 11 | Structured Data | Array, Map, Set, WeakMap, WeakSet |
| 12 | Control Abstraction Objects | Iterator, Promise, GeneratorFunction, AsyncGeneratorFunction |
| 13 | Execution Contexts, Lexical Environments, and Closure | **Core for understanding scope, closures, `this`** |
| 14 | Global Object | `globalThis`, built-ins |
| 15 | Control Flow | Statements, declarations |
| 16 | Tail Calls | Proper tail calls (TCO) |
| 17 | ECMAScript Functions and Classes | Function objects, classes |
| 18 | Scripts and Modules | `ScriptRecord`, `ModuleRecord`, `Source Text Module Record` |
| 19 | Errors | `Error`, `TypeError`, etc. |
| 20 | Numbers and Dates | Number, BigInt, Date, Math |
| 21 | Text Processing | String, RegExp |
| 22 | Indexed Collections | Array, TypedArray |
| 23 | Keyed Collections | Map, Set, WeakMap, WeakSet |
| 24 | Structured Data | JSON |
| 25 | Managing Memory | WeakRef, FinalizationRegistry |
| 26 | Control Abstraction Objects | Same as 12 (merged in current editions) |
| 27 | Reflection | Proxy, Reflect |
| 28 | Memory Model | The JS memory model |

## Key clauses referenced in this document

| Concept | Clause(s) |
|---------|-----------|
| Execution context | §13.1 |
| Lexical environment | §13.2 |
| The global environment | §13.3 |
| Declaration binding instantiation | §13.3.3 |
| Strict mode | §13.2.1 + Annex C |
| Closures | §13.2 (the binding object persists) |
| `this` binding (ResolveThisBinding) | §13.3.4.1 |
| Prototype chain | §10.3.1 (OrdinaryGetPrototypeOf) |
| Class definition evaluation | §17.7 |
| Generator objects | §15.6 |
| Promise abstract operations | §27.2 (Promise jobs, PromiseResolve, PromiseReaction) |
| Async functions | §15.8 |
| Module records | §18.2 |
| Iteration protocol | §27.1.5 (IteratorClose, etc.) |
| Strict mode | §Annex C |
| `WeakRef` | §26.1 |

## TC39 Process

Proposals go through 5 stages (0 → 4). Only Stage 4 becomes part of the standard.

- **Stage 0** — Strawman. Anyone can propose.
- **Stage 1** — Proposal. Has a champion, problem statement, high-level API.
- **Stage 2** — Draft. Initial spec text.
- **Stage 3** — Candidate. Refined spec text, expects implementation feedback.
- **Stage 4** — Finished. Two conformant implementations, included in next spec release.

## Notable Stage 3+ proposals

(These may have graduated to Stage 4 by the time you read this — check the catalog.)

- **Decorators** — class/method decorators (TC39 stage progressed over multiple years).
- **Records & Tuples** — immutable data structures.
- **Pattern Matching** — `match` expression.
- **Pipeline operator** — `|>` for chaining.
- **Temporal** — modern replacement for `Date`.
- **ShadowRealm** — isolated execution contexts.
- **Explicit Resource Management** — `using` declarations.

## Annexes

- **Annex B** — Additional ECMAScript Features for Web Browsers (legacy `HTMLWrapperComments`, `__proto__` in object literals, etc.)
- **Annex C** — Strict Mode
- **Annex D** — Corrections and Clarifications (no new features)

## Reading the spec

The spec uses a custom notation:

- **Bold `[[Brackets]]`** denote internal slots.
- **`%Symbol%`** denotes well-known symbols (e.g., `%Symbol.iterator%`).
- **`OrdinaryGet(...)`** etc. denote abstract operations.
- Algorithms use numbered steps.

A conformant implementation must implement all abstract operations correctly for observable behavior. Implementation details (how internal slots are stored, GC algorithm, parser internals) are intentionally unspecified.

## Historical note

ES4 was abandoned in 2008 after years of disagreement between Microsoft (favored JScript .NET direction) and Mozilla/Yahoo (favored ES3.1, which became ES5). ES5 shipped in 2009. ES6 (ES2015) was the next major release, delayed from 2013 to 2015. The decision to ship annual releases (instead of multi-year) was made around 2014.