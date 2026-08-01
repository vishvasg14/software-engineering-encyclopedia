# Influential Papers and Engineering Documents

This file lists the research papers, engineering write-ups, and foundational documents that the JVM Internals document references or builds upon. Where a paper is freely available, the link is provided.

## Foundational Papers

### The Java Memory Model <a class="askgpt-btn" data-askgpt="The Java Memory Model" title="Ask ChatGPT about this section">💬</a>

- **"The Java Memory Model"** — Jeremy Manson, William Pugh, Sarita Adve. *POPL 2005.*
  - The canonical description of JSR-133, the JMM that replaced the broken initial Java memory model.
  - <http://www.cs.umd.edu/~pugh/java/memoryModel/>

- **"JSR-133: Java Memory Model and Thread Specification"** — Pugh, Boehm, Lea, Manson.
  - The specification document itself.
  - <https://www.cs.umd.edu/~pugh/java/memoryModel/jsr-133.pdf>

### Garbage Collection <a class="askgpt-btn" data-askgpt="Garbage Collection" title="Ask ChatGPT about this section">💬</a>

- **"Uniprocessor Garbage Collection Techniques"** — Wilson, Johnstone, Neely, Boles. *IWMM 1995.*
  - The classic survey of GC algorithms; many of the classifications used today come from this paper.
  - <https://www.cs.utah.edu/~wilson/pdf/gcs-survey.pdf>

- **"Garbage-First Garbage Collector"** — Click, Hellerstein, Tene. *ISMM 2004 / SIGPLAN 2004.*
  - The original G1 paper. Defines region-based heap, remembered sets, SATB marking.
  - Note: this is the academic publication, not the G1 that shipped in Java 7; the shipped implementation evolved significantly.

- **"A Generational Mostly-Concurrent Garbage Collector"** — Detlefs, Flood, Heller, Printezis. *ISMM 2002.*
  - Early work on concurrent collectors that informed ZGC's design.

- **"C4: The Continuously Concurrent Compacting Collector"** — Tene, Iyengar, Wolf. *ISMM 2011.*
  - The Azul C4 paper that informed many of ZGC's design choices (load barriers, colored pointers).

- **"Shenandoah: An open-source concurrent compacting garbage collector for the JVM"** — Lidin, Tumanov, Knight. *Oracle Labs / Red Hat, 2014-2017 whitepaper series.*
  - Brooks-style forwarding pointers, concurrent compaction.

- **"Pauseless GC: A New Generation of Concurrent Garbage Collection"** — Click, Hellerstein, Tene. *VEE 2005.*
  - Earlier work on pauseless GC.

- **"A Concurrent, Non-blocking, Lock-Free Garbage Collector Using Load-Compare-And-Swap"** — Click, Tene, Wolf. *OOPSLA 2002.*
  - Concurrent GC primitives.

## JIT Compilation

- **"A Brief History of Just-In-Time"** — Click, Paleczny. *ACM SIGPLAN 1995.*
  - Discusses the trade-offs of interpretation vs. JIT vs. AOT.

- **"Optimizations of a HotSpot Client Compiler for a Server-side Workload"** — Ottoni. *CGO 2012 (Google).*
  - Real-world C1 tuning for server workloads.

- **"Profile-Guided Optimization in HotSpot"** — Cutler, Wen, Qian, Wang. *Oracle engineering blog.*

## Type Safety and Bytecode Verification

- **"The Java Virtual Machine Specification"** — Lindholm, Yellin, Bracha, Buckley. *Current edition tracks the latest LTS.*
  - The JVM Spec defines the abstract machine, bytecode instruction set, verification rules, and class-file format.
  - <https://docs.oracle.com/javase/specs/jvms/>

- **"The Java Language Specification"** — Gosling, Joy, Steele, Bracha, Buckley.
  - <https://docs.oracle.com/javase/specs/jls/>

## Class File Format

- **JVMS Chapter 4: The class File Format** — definitive structure of `.class` files.

## Locking and Concurrency

- **"The Art of Multiprocessor Programming"** — Herlihy, Shavit. *2008 (revised 2020).*
  - The textbook on lock-free data structures, memory barriers, and the theoretical underpinning of the JMM.

- **"Biased Locking in HotSpot"** — Russell, Detlefs. *2006 (internal Sun/Oracle whitepaper).*

## Virtual Threads (Loom)

- **"JEP 444: Virtual Threads"** — official JEP.
- **"Project Loom"** — official project page: <https://openjdk.org/projects/loom/>
- **"Continuations and Tail Calls"** — various academic references on delimited continuations.

## OpenJDK Engineering Documentation

- **HotSpot internals wiki**: <https://wiki.openjdk.org/display/HotSpot/Main>
- **Garbage Collector guides**: <https://docs.oracle.com/en/java/javase/21/gctuning/>
- **JFR event reference**: <https://docs.oracle.com/en/java/javase/21/jfapi/>

## Engineering Blogs (Industry)

- **Twitter Engineering (now X Engineering) blog**: GC tuning posts, including the "Garbage Collection Tuning for Large-Scale JVMs" series.
- **Meta Engineering blog**: ZGC migration write-ups, JVM efficiency work.
- **LinkedIn Engineering blog**: GC log analysis, JVM tooling.
- **Azul Systems blog**: C4, Zing, pauseless GC history.
- **Red Hat Developer blog**: Shenandoah updates.
- **OpenJDK mail archives**: <https://mail.openjdk.org/>

## Books

- *Java Performance: In-Depth Advice for Tuning and Programming Java 8, 11, and Beyond* — Charlie Hunt, John Mony. *2nd edition covers up to Java 11.*
- *Optimizing Java* — Benjamin Evans, James Gough, Chris Newland.
- *Java Concurrency in Practice* — Goetz, Peierls, Bloch, Bowbeer, Holmes, Lea. *2006; covers Java 5/6 concurrency deeply.*
- *The Garbage Collection Handbook* — Jones, Hosking, Moss. *2016 (2nd ed).* The canonical GC reference.
- *Inside the Java 2 Virtual Machine* — Bill Venners. *Older but covers classloading, verifier, and bytecode at depth.*
- *Inside the JVM* (in Japanese, translated) — various.

## Class File Disassembly

- `javap -c -v` — the standard tool for inspecting bytecode.
- ASM (OW2): <https://asm.ow2.io/>
- javap manual: <https://docs.oracle.com/en/java/javase/21/docs/specs/man/javap.html>