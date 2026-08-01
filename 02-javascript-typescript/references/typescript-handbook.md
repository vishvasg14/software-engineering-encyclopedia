# TypeScript Handbook & Documentation Reference

This file catalogs the official TypeScript documentation resources referenced in the JavaScript & TypeScript document.

## Primary documentation

- **TypeScript Handbook:** <https://www.typescriptlang.org/docs/handbook/intro.html>
- **TSConfig reference:** <https://www.typescriptlang.org/tsconfig>
- **Compiler options:** <https://www.typescriptlang.org/docs/handbook/compiler-options.html>
- **TypeScript release notes:** <https://github.com/microsoft/TypeScript/releases>
- **TypeScript source:** <https://github.com/microsoft/TypeScript>
- **TypeScript Playground:** <https://www.typescriptlang.org/play>

## Handbook structure

| Section | Topics |
|---------|--------|
| **The Basics** | Static types, type annotations, type inference |
| **Everyday Types** | Primitives, arrays, tuples, objects, unions, intersections |
| **Narrowing** | Type guards, `typeof`, `instanceof`, discriminated unions |
| **More on Functions** | Function types, overloads, `this` typing, rest parameters |
| **Object Types** | Interfaces, type aliases, generics, keyof |
| **Classes** | Class types, `implements`, abstract, access modifiers |
| **Generics** | Generic functions, classes, constraints, defaults |
| **Keyof Type Operator** | `keyof T`, indexed access types |
| **Typeof Type Operator** | `typeof x` as a type |
| **Indexed Access Types** | `T[K]`, `T['a' \| 'b']` |
| **Conditional Types** | `T extends U ? X : Y` |
| **Mapped Types** | `{ [K in keyof T]: ... }` |
| **Template Literal Types** | `` `${T}-${U}` `` |
| **Classes (deep)** | Generics in classes, `this` types, decorators |
| **Modules** | `import`/`export`, namespaces, ambient modules |
| **Type Manipulation** | Utility types (Awaited, Partial, Required, etc.) |
| **Declaration Files** | `.d.ts`, `declare`, `DefinitelyTyped` |
| **Iterators and Generators** | TS-level support for iteration |
| **JSX / TSX** | Type-checking JSX |
| **Decorators** | Class and method decorators |
| **Mixins** | Mixin patterns |
| **Type Compatibility** | Structural typing rules |
| **Type Inference** | How TS infers types |
| **Symbol Type** | `symbol` and well-known symbols |
| **Iteration** | `for...of`, spread on iterables |
| **Generators** | Function generators in TS |
| **TS in 5 minutes** | Quick start |
| **TS for JavaScript Programmers** | JS → TS migration guide |
| **TS for OOP Programmers** | Class-based perspective |
| **TS for Functional Programmers** | FP perspective |

## tsconfig.json options (organized by category)

### Language and compiler behavior <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Language%20and%20compiler%20behavior'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Language and compiler behavior" title="Ask ChatGPT about this section">💬</a>

- `target` — ECMAScript target version.
- `module` — Module system (`CommonJS`, `ESNext`, `Node16`, etc.).
- `moduleResolution` — Resolution algorithm (`node`, `bundler`, `Node16`, etc.).
- `lib` — Type definitions to include (e.g., `["ES2024", "DOM"]`).
- `jsx` — JSX transform (`react`, `react-jsx`, `preserve`).
- `allowJs` — Allow `.js` files to be type-checked.
- `checkJs` — Type-check JS files.
- `noEmit` — Don't emit JS (type-check only).
- `isolatedModules` — Each file must be transpilable in isolation (Babel, esbuild compatible).

### Type checking strictness <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Type%20checking%20strictness'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Type checking strictness" title="Ask ChatGPT about this section">💬</a>

- `strict` — Enables all strict checks.
- `noImplicitAny` — Forbid implicit `any`.
- `strictNullChecks` — `null`/`undefined` are distinct from `T`.
- `strictFunctionTypes` — Function parameter bivariance for methods, contravariance for function types.
- `strictBindCallApply` — Type-check `bind`/`call`/`apply`.
- `strictPropertyInitialization` — Class fields must be initialized.
- `noImplicitThis` — Forbid implicit `any` for `this`.
- `alwaysStrict` — Emit `"use strict"` (default with strict).
- `useUnknownInCatchVariables` — `catch (e)` has type `unknown` not `any` (default in TS 4.4+).
- `exactOptionalPropertyTypes` — `T | undefined` differs from optional `T?`.
- `noUncheckedIndexedAccess` — Add `| undefined` to indexed access.
- `noImplicitOverride` — Require `override` keyword.

### Module resolution <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Module%20resolution'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Module resolution" title="Ask ChatGPT about this section">💬</a>

- `baseUrl` — Base directory for module resolution.
- `paths` — Path aliases.
- `rootDirs` — Multiple roots merged.
- `typeRoots` — Where to find type definitions.
- `types` — Which `@types/*` packages to include.

### Emit <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Emit'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Emit" title="Ask ChatGPT about this section">💬</a>

- `outDir` — Output directory.
- `outFile` — Single-file output (for AMD/System).
- `removeComments` — Strip comments from output.
- `sourceMap` — Emit source maps.
- `declaration` — Emit `.d.ts` files.
- `declarationMap` — Emit declaration source maps.
- `importHelpers` — Import `__extends` from `tslib`.
- `newLine` — Output newline character.

### Output format <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Output%20format'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Output format" title="Ask ChatGPT about this section">💬</a>

- `removeComments`, `preserveConstEnums`, `downlevelIteration`.

### Project references <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Project%20references'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Project references" title="Ask ChatGPT about this section">💬</a>

- `composite` — Project can be referenced by other projects.
- `tsBuildInfoFile` — Build info cache location.

## Compiler API

- **Programmatic API:** <https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API>
- **Language Service API:** <https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API>
- **Compiler internals walkthrough:** <https://github.com/microsoft/TypeScript/blob/main/src/compiler/README.md>

## DefinitelyTyped

- **Repository:** <https://github.com/DefinitelyTyped/DefinitelyTyped>
- **How to contribute:** <https://github.com/DefinitelyTyped/DefinitelyTyped#how-can-i-contribute>
- **Convention:** Type definitions for npm packages live in `@types/*` packages on npm.

## Tools

- **tsc** — the compiler.
- **tsserver** — language server, used by IDEs.
- **tsc-watch** (community) — file watcher.
- **ts-node** — JIT TS execution for Node.
- **tsx** — modern ts-node alternative.
- **esbuild** — fast transpiler.
- **swc** — Rust-based transpiler.
- **Biome** — single tool for lint + format.
- **dprint** — code formatter.

## TypeScript release highlights

| Version | Year | Highlights |
|---------|------|-----------|
| 1.0 | 2014 | First public release |
| 2.0 | 2016 | Non-nullable types, control flow analysis |
| 3.0 | 2018 | Project references, rest in tuples |
| 4.0 | 2020 | Variadic tuple types, labeled tuples |
| 4.4 | 2021 | Control flow analysis of aliased conditions, `Symbol` type |
| 4.9 | 2022 | `satisfies` operator, `undefined` narrowing in catch |
| 5.0 | 2023 | Decorators (TC39 Stage 3), `const` type parameters |
| 5.2 | 2023 | `using` and explicit resource management |
| 5.4 | 2024 | `NoInfer<T>`, `Object.groupBy`/`Array.groupBy` types |
| 5.5 | 2024 | Inferred type predicates, `Awaited` improvements |
| 5.6 | 2025 | Iterator helpers, `Object.assign` improvements, `disallowImportingTsExtensions` |
| 5.7 | 2025 | Variadic kind checking, `noUncheckedSideEffectImports` |
| 5.8 | 2026 | (assuming) |

## Books and authoritative learning material

- *Effective TypeScript* — Dan Vanderkam (O'Reilly, 2024 2nd ed).
- *Programming TypeScript* — Boris Cherny (O'Reilly).
- *TypeScript Quickly* — Anton Spilsbury, Yakov Fain (Manning).
- *TypeScript 5+ in Action* — modern, multi-author.
- *Deep Dive into TypeScript* — Basarat Ali Syed (free online).

## Type-level programming resources

- *Type-Level TypeScript* — <https://type-level-typescript.com>
- *TS Playground with examples* — <https://www.typescriptlang.org/play>
- *Total TypeScript* — <https://www.totaltypescript.com>

## Migration guides

- *Migrating from JavaScript* — official handbook section.
- *Migrating from Flow* — community guide.
- *Migration to ESM* — community guide for `type: "module"` in package.json.