# JVM Internals — Flagship Document Design

**Date:** 2026-07-26
**Status:** Approved (pending user review of this written spec)
**Author:** Claude (brainstorming → writing-plans → implementation pipeline)

---

## 1. Purpose

Produce the first publication-grade document in the **Self-Study Software Engineering Repository**: a comprehensive treatment of OpenJDK HotSpot internals. This document establishes the quality bar and document template for the entire repository. Future topics (PostgreSQL, Kafka, Kubernetes, etc.) will reuse the same template.

---

## 2. Goals

- Treat the JVM as the canonical "deep internals" topic. Engineers who finish this document should be able to:
  - Read a GC log and identify the collector, pause source, and likely remediation.
  - Reason about JIT warmup, tiered compilation, and code-cache pressure.
  - Diagnose safepoint-induced latency spikes.
  - Choose between G1, ZGC, Parallel, and Shenandoah with justified reasoning.
  - Explain Java Memory Model happens-before to a peer.
  - Configure JVM flags for a containerized production deployment correctly.
- Cover the full template defined by the master prompt (Overview, Five Ws, History, Problem Statement, Real-World Motivation, Internal Working, Deep Dive, Architecture, Performance, Security, Production Engineering, Production Case Studies, Code Examples, Common Mistakes, Debugging, Monitoring & Observability, Best Practices, Anti-Patterns, Edge Cases, Comparisons, Interview Prep, References).
- Demonstrate production rigor: real-world case studies (Twitter, Meta, LinkedIn, HFT), real flags, real failure modes.
- Length: 15–25K words, 15–25 Mermaid diagrams, all sections completed with no placeholders.

---

## 3. Non-Goals

- Cover JVMs other than OpenJDK HotSpot in depth (OpenJ9, GraalVM, Azul Prime get only a comparison section).
- Cover native image / GraalVM AOT compilation in depth (future document).
- Cover pre-Java 8 internals exhaustively (Java 8 is the historical baseline; Java 11 is the modern baseline; deep coverage from Java 11 through 21).
- Cover language-level Java syntax, generics semantics, lambdas as user features (these belong in a separate Java language document).

---

## 4. Scope & Audience

- **Audience:** Mid-level engineers (2–5 years) who can write Java but have never opened OpenJDK source or read a GC log closely.
- **Prerequisites (assumed, briefly reviewed):** Java syntax, basic OOP, basic concurrency (`synchronized`, `volatile`), basic Linux (`top`, `vmstat`).
- **Java version baseline:** Java 21 (current LTS as of 2026-07-26). Where Java 25 features matter (e.g., further JVM improvements), note them. Older versions are referenced when explaining evolution.

---

## 5. Document Structure

### 5.1 Repository Layout

```
self-study/
├── README.md                            # repo landing, philosophy, table of contents
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-07-26-jvm-internals-flagship-design.md
├── 01-java-internals/
│   ├── README.md                        # chapter overview, learning path, prerequisites
│   ├── jvm-internals.md                 # ← THE flagship document
│   ├── diagrams/                        # all .mmd sources (mermaid)
│   │   ├── 01-jvm-subsystem-map.mmd
│   │   ├── 02-classloader-delegation.mmd
│   │   ├── 03-bytecode-execution.mmd
│   │   ├── 04-tiered-compilation.mmd
│   │   ├── 05-g1-regions.mmd
│   │   ├── 06-zgc-phases.mmd
│   │   ├── 07-memory-layout.mmd
│   │   ├── 08-safepoint-lifecycle.mmd
│   │   ├── 09-jmm-happens-before.mmd
│   │   ├── 10-invokedynamic-bootstrap.mmd
│   │   ├── 11-virtual-thread-m-n.mmd
│   │   ├── 12-jfr-architecture.mmd
│   │   ├── 13-jit-inlining.mmd
│   │   ├── 14-tlab-allocation.mmd
│   │   ├── 15-biased-locking-states.mmd
│   │   ├── 16-gc-decision-tree.mmd
│   │   ├── 17-production-deploy-flow.mmd
│   │   ├── 18-heap-sizing-math.mmd
│   │   └── 19-container-awareness.mmd
│   ├── examples/                        # runnable Java 21 snippets
│   │   ├── 01-bytecode-disasm/
│   │   ├── 02-jfr-scripting/
│   │   ├── 03-tlab-bounds/
│   │   ├── 04-safepoint-pause/
│   │   ├── 05-gc-log-analysis/
│   │   ├── 06-native-memory-leak/
│   │   └── 07-virtual-thread-pinning/
│   └── references/                      # JEPs, papers, OpenJDK wiki
│       ├── jeps.md
│       ├── papers.md
│       └── openjdk-wiki-links.md
```

### 5.2 Document Section Order

Mapped to the master prompt's template:

1. **Overview** — one-paragraph elevator, one-paragraph scope.
2. **Definition** — what the JVM is as a spec (JVM Specification, JLS, JVMTI) vs an implementation (HotSpot). Distinguish spec from implementation.
3. **Five Ws + One H** — formal treatment of What/Why/When/Where/Who/How.
4. **History** — Sun → Oracle → OpenJDK fork timeline; major version inflection points (1.2 JIT, 5 generics, 8 lambdas, 9 modules, 14 records, 17 sealed, 21 virtual threads).
5. **Problem Statement** — what problem the JVM solves (portability, safety, late binding, GC). Why C/C++ weren't sufficient for the target workload.
6. **Real-World Motivation** — Twitter fleet (GC tuning at scale), Meta ZGC rollout, LinkedIn's services, latency-critical HFT JVMs, game servers.
7. **Internal Working** — high-level: source → bytecode → classloader → interpreter → JIT → GC → runtime services → OS.
8. **Deep Dive** — the heart:
   - Bytecode instruction set and the constant pool.
   - The interpreter (template interpreter, dispatch tables).
   - Tiered compilation (C1, C2, profile-guided optimization).
   - JIT intrinsics, inlining, escape analysis, lock coarsening, on-stack replacement.
   - Classloading: bootstrap / platform / application loaders; parent delegation; unloading; module layers.
   - Garbage collection: roots, marking, tri-color invariant, SATB vs incremental-update, card tables, remembered sets.
   - Collectors: Serial, Parallel, CMS (historical), G1 (default), ZGC (concurrent, generational since 21), Shenandoah.
   - Memory layout: heap, young/old generation, metaspace, code cache, thread stacks, native memory.
   - Safepoints: when, where, bias toward VM operations; how to measure (JFR `vmop` events).
   - Synchronization: biased locking → light-weight locking → inflated; lock coarsening; biased locking revocation cost.
   - Compressed oops, compressed class pointers, zero-based compressed references.
   - Java Memory Model: happens-before, volatile semantics, final fields, the JSR-133 fixes.
   - `invokedynamic`: bootstrap methods, `MethodHandle`, lambda metafactories.
   - Virtual threads: M:N scheduling, carrier threads, continuation stack pinning cases.
9. **Architecture** — HotSpot subsystem map: Runtime, Compiler (C1/C2), GC (G1/ZGC modules), Serviceability (JFR, JMX, JVMTI).
10. **Performance** — allocation rate, TLAB, JIT warmup curves, GC pause budgets, code-cache pressure, huge pages, transparent huge pages, NUMA, large pages, container CPU quotas.
11. **Security** — strong encapsulation (JDK 17+), SecurityManager deprecation, JVMTI attack surface, native code risks (JNI), deserialization, classpath/trust boundaries.
12. **Production Engineering** — JVM ergonomics, container awareness flags, JFR vs JMX, common flag catalog, heap-sizing math, GC choice decision matrix, warmup strategies.
13. **Production Case Studies** — Twitter's G1 tuning saga, Meta's ZGC migration, LinkedIn's GC log analysis pipeline, a quant trading firm's latency budget work, an online game's stop-the-world incident.
14. **Code Examples** — disassembly with `javap`, a JFR script for "where are my allocations", reproducing a safepoint-induced pause, a virtual-thread pinning demo, reproducing a native memory leak via NIO.
15. **Common Mistakes** — relying on finalizers, setting `Xms == Xmx` blindly, ignoring safepoints, running with `-Xss` too low, mixing G1 and Parallel flags.
16. **Debugging** — `hs_err` files, core dumps, JFR recordings, async-profiler flame graphs, GC log analysis walkthrough, NMT (Native Memory Tracking).
17. **Monitoring & Observability** — JFR event catalog (focus on `jdk.GC*`, `jdk.Compiler*`, `jdk.ThreadStart`, `jdk.Safepoint*`, `jdk.CPUInformation`), JMX vs JFR, Micrometer JVM metrics, OpenTelemetry JVM semantic conventions.
18. **Best Practices** — flag hygiene, choosing a collector, warmup strategies, container CPU/heap sizing, logging config.
19. **Anti-Patterns** — `MaxHeapSize=64g` cargo culting, using CMS on modern JDKs, mixing ergonomics, setting code cache too small.
20. **Edge Cases** — metaspace OOM, code cache flush, JNI crashes, container CPU quota vs JIT compiler threads, huge pages disabled by the kernel, NUMA effects.
21. **Comparisons** — HotSpot vs OpenJ9 vs GraalVM vs Azul Prime; G1 vs ZGC vs Shenandoah vs Parallel; tiered vs AOT.
22. **Interview Prep** — questions at beginner, junior, mid, senior, staff, principal, architect levels, with model answers.
23. **References** — JEP index (Java 8 → 21), OpenJDK wiki, influential papers (Garbage-First, pauseless GC, JMM fixes), official docs (JVM Spec, JLS).

---

## 6. Writing Style

- Clear, professional English. Explain every acronym on first use.
- Inline citations to JEP numbers, paper titles, OpenJDK wiki pages.
- Mermaid diagrams for: subsystem map, sequence flows, memory layouts, GC regions, safepoint lifecycle, decision trees, deployment flows.
- Tables for: collector comparison, flag catalog, JIT tier thresholds, JFR event categories.
- Code blocks in Java 21 unless explicitly demonstrating legacy behavior.
- Production-grade prose: explain "why" not just "what".

---

## 7. Quality Gates (before declaring done)

- [ ] Every template section is present and complete. No "TODO", "TBD", or "Coming Soon".
- [ ] All JEP numbers verified against the official JEP index at openjdk.org.
- [ ] All flag names verified against `java -XX:+PrintFlagsFinal -version` on Java 21.
- [ ] All code examples compile on Java 21 (with `jshell` or `javac --release 21`).
- [ ] All diagrams render correctly in Mermaid (validated by GitHub render).
- [ ] All external links resolve (HTTP 200).
- [ ] All citations in References section.
- [ ] Internal consistency: numbers match across sections (e.g., tier thresholds in Deep Dive match Best Practices).
- [ ] Length: 15–25K words, 15–25 Mermaid diagrams.

---

## 8. Workflow

1. Write spec doc → self-review → user review.
2. After approval, set up folder structure (Task #4).
3. Draft the document in 5 parts (Foundations, Internals, Engineering, Operations, Context).
4. Deliver each part as a completed unit; no placeholders between parts.
5. Add diagrams and runnable code examples.
6. Final validation pass: cross-check JEPs, flags, compile code, render diagrams.

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Java 25 ships features between drafts that supersede content | Note feature as "since Java 25" in passing; don't restructure around it |
| OpenJDK internals change between releases | Reference the OpenJDK wiki and source file paths rather than quoting code verbatim |
| Mermaid syntax errors | Test each diagram by including it in a small GitHub gist before committing |
| Flag drift across JDK versions | Anchor every flag to the version where it was introduced or removed |
| Document becomes too long | Split off specialist deep-dives into sibling docs (future work, not now) |

---

## 10. Out of Scope (for future docs)

- Detailed treatment of OpenJ9, GraalVM, or Azul Prime.
- Native image (GraalVM SubstrateVM, AOT compilation).
- Project Leyden, ahead-of-time class loading.
- Java 25+ features beyond brief mentions.
- Polyglot JVM languages (Scala, Kotlin) — these are language-level, not JVM-internals.