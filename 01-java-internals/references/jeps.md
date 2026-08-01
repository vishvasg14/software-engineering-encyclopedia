# JEP Index — Java 8 through 21

This file catalogs the JEPs (JDK Enhancement Proposals) referenced in the JVM Internals document. JEPs are the formal design documents for changes to the JDK; they live at <https://openjdk.org/jeps/>.

## Java 8 (LTS) — March 2014

| JEP | Title | Relevance |
|-----|-------|-----------|
| 119 | Lambda Expressions | Language feature driving `invokedynamic` use |
| 126 | Compact Numeric Literal Improvements | — |
| 174 | Nashorn JavaScript Engine | Replaced by GraalJS later |

## Java 9 — September 2017

| JEP | Title | Relevance |
|-----|-------|-----------|
| 261 | Module System | Introduced strong encapsulation |
| 260 | Encapsulate Most Internal APIs | Sun.misc.Unsafe still accessible |
| 222 | jshell: The Java Shell | REPL for the JVM |
| 248 | Make G1 the Default Garbage Collector | G1 becomes default; CMS deprecated |
| 295 | Ahead-of-Time Compilation | jaotc (later removed in 17) |

## Java 10 — March 2018

| JEP | Title | Relevance |
|-----|-------|-----------|
| 307 | Parallel Full GC for G1 | G1 full-GC went parallel |
| 310 | Application Class-Data Sharing | Class data sharing across JVMs |

## Java 11 (LTS) — September 2018

| JEP | Title | Relevance |
|-----|-------|-----------|
| 318 | Epsilon: A No-Op Garbage Collector | Reference GC for ultra-low-latency testing |
| 333 | ZGC: A Scalable Low-Latency Garbage Collector (Experimental) | First appearance of ZGC |
| 330 | Launch Single-File Source-Code Programs | — |
| 321 | HTTP Client (Standard) | Replaced legacy HttpURLConnection |
| 320 | Remove the Java EE and CORBA Modules | — |

## Java 12 — March 2019

| JEP | Title | Relevance |
|-----|-------|-----------|
| 189 | Shenandoah: A Low-Pause-Time Garbage Collector (Experimental) | First appearance of Shenandoah |
| 344 | Abortable Mixed Collections for G1 | G1 can abort mixed collections if they overrun pause target |
| 346 | Promptly Return Unused Committed Memory from G1 | G1 returns memory to OS when idle |

## Java 13 — September 2019

| JEP | Title | Relevance |
|-----|-------|-----------|
| 350 | Dynamic CDS Archives | AppCDS dynamic archive generation |
| 351 | ZGC: Uncommit Unused Memory | ZGC memory uncommit |

## Java 14 — March 2020

| JEP | Title | Relevance |
|-----|-------|-----------|
| 345 | NUMA-Aware Memory Allocation for G1 | G1 NUMA-aware allocation |
| 363 | Remove the Concurrent Mark Sweep (CMS) Garbage Collector | CMS removed |
| 364 | ZGC on macOS | ZGC ported to macOS |
| 365 | ZGC on Windows | ZGC ported to Windows |
| 367 | Remove the Pack200 Tools and API | — |
| 368 | Text Blocks (Second Preview) | — |
| 359 | Records (Preview) | — |

## Java 15 — September 2020

| JEP | Title | Relevance |
|-----|-------|-----------|
| 377 | ZGC: A Scalable Low-Latency Garbage Collector | ZGC graduated to productive |
| 379 | Shenandoah: A Low-Pause-Time Garbage Collector | Shenandoah graduated to productive |
| 381 | Remove the Solaris and SPARC Ports | — |

## Java 16 — March 2021

| JEP | Title | Relevance |
|-----|-------|-----------|
| 376 | Strongly Encapsulate JDK Internals by Default | Strong encapsulation enforced; `--illegal-access=permit` removed |
| 387 | Pattern Matching for instanceof (Second Preview) | — |
| 395 | Records | Final |

## Java 17 (LTS) — September 2021

| JEP | Title | Relevance |
|-----|-------|-----------|
| 411 | Deprecate the Security Manager for Removal | SecurityManager deprecation begins |
| 412 | Foreign Function & Memory API (Incubator) | Panama FFM incubator |
| 356 | Enhanced Pseudo-Random Number Generators | — |
| 403 | Strongly Encapsulate JDK Internals | Confirmed |

## Java 18 — March 2022

| JEP | Title | Relevance |
|-----|-------|-----------|
| 400 | UTF-8 by Default | — |
| 408 | Simple Web Server | — |
| 413 | Code Snippets in Java API Documentation | — |

## Java 19 — September 2022

| JEP | Title | Relevance |
|-----|-------|-----------|
| 425 | Virtual Threads (Preview) | Project Loom first preview |
| 426 | Vector API (Fourth Incubator) | — |
| 428 | Structured Concurrency (Incubator) | Loom companion |

## Java 20 — March 2023

| JEP | Title | Relevance |
|-----|-------|-----------|
| 429 | Scoped Values (Incubator) | Loom companion |
| 436 | Virtual Threads (Second Preview) | — |

## Java 21 (LTS) — September 2023

| JEP | Title | Relevance |
|-----|-------|-----------|
| 439 | Generational ZGC | ZGC becomes generational |
| 444 | Virtual Threads | Virtual threads finalized |
| 451 | Prepare to Disallow Dynamic Loading of Agents | JVMTI agent loading tightened |
| 452 | Pattern Matching for switch | — |
| 440 | Record Patterns | Final |
| 441 | Pattern Matching for switch | Final |
| 431 | Sequenced Collections | — |

## Java 22 — March 2024

| JEP | Title | Relevance |
|-----|-------|-----------|
| 447 | Statements before super(...) | — |
| 454 | Foreign Function & Memory API | Final FFM API |
| 459 | String Templates (Second Preview) | — |
| 461 | Stream Gatherers (Preview) | — |
| 463 | Implicitly Declared Classes and Instance Main Methods (Second Preview) | — |

## Java 23 — September 2024

| JEP | Title | Relevance |
|-----|-------|-----------|
| 466 | Class-File API (Preview) | Parsing/generating class files |
| 469 | Vector API (Seventh Incubator) | — |
| 471 | ZGC: Generational Mode by Default | ZGC default switched to generational |

## Java 24 — March 2025

| JEP | Title | Relevance |
|-----|-------|-----------|
| 478 | Derived Records (Preview) | — |
| 482 | Flexibly Constructor Bodies (Second Preview) | — |
| 485 | Stream Gatherers (Second Preview) | — |
| 487 | Scoped Values (Second Preview) | — |
| 491 | Synchronize Virtual Threads without Pinning | Fixes synchronized pinning case |

## Java 25 — September 2025

| JEP | Title | Relevance |
|-----|-------|-----------|
| 502 | Stable Values (Preview) | — |
| 505 | Structured Concurrency (Fifth Preview) | — |
| 506 | Scoped Values (Final) | Final |

---

## Notes

- JEP numbers are stable identifiers; once assigned, they don't change.
- A JEP status of "Proposed to Target", "Targeted", "Completed", "Withdrawn", or "Closed / Delivered" can be tracked on the official JEP page.
- The JEP process replaced the older JSR process for language changes that don't require an ECJ vote.