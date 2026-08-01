# Software Engineering (SOLID, Patterns, Refactoring)

> A comprehensive, production-grade treatment of software engineering: SOLID principles, the Gang-of-Four design patterns, enterprise patterns (Repository, Unit of Work, Service Layer), refactoring, code smells, and Clean/Hexagonal architecture.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Definition](#2-definition)
3. [Five Ws + One H](#3-five-ws--one-h)
4. [History](#4-history)
5. [Problem Statement](#5-problem-statement)
6. [Real-World Motivation](#6-real-world-motivation)
7. [Internal Working](#7-internal-working)
8. [Deep Dive](#8-deep-dive)
9. [Architecture](#9-architecture)
10. [Performance](#10-performance)
11. [Security](#11-security)
12. [Production Engineering](#12-production-engineering)
13. [Production Case Studies](#13-production-case-studies)
14. [Code Examples](#14-code-examples)
15. [Common Mistakes](#15-common-mistakes)
16. [Debugging](#16-debugging)
17. [Monitoring & Observability](#17-monitoring--observability)
18. [Best Practices](#18-best-practices)
19. [Anti-Patterns](#19-anti-patterns)
20. [Edge Cases](#20-edge-cases)
21. [Comparisons](#21-comparisons)
22. [Interview Preparation](#22-interview-preparation)
23. [References](#23-references)

---

## 1. Overview

**Software engineering** is the disciplined application of engineering principles to the design, development, testing, and maintenance of software. This document treats software engineering at production depth across four pillars:

1. **SOLID principles** — five foundational object-oriented design principles introduced by Robert C. Martin.
2. **Gang-of-Four (GoF) design patterns** — the canonical 23 patterns from *Design Patterns: Elements of Reusable Object-Oriented Software* (Gamma, Helm, Johnson, Vlissides, 1994).
3. **Enterprise patterns** — Repository, Unit of Work, Service Layer, Active Record, Data Mapper, and the broader patterns catalogued by Martin Fowler in *Patterns of Enterprise Application Architecture* (2002).
4. **Refactoring** — the disciplined technique of restructuring code without changing its external behavior (Martin Fowler, *Refactoring*, 1999/2018), coupled with the code-smell catalog that drives refactoring decisions.

The document closes with **Clean Architecture**, **Hexagonal Architecture**, and **Onion Architecture** — three convergent architectural styles that operationalize SOLID and the Dependency Rule at the system level.

**Scope.** This is not a tutorial. It assumes you write object-oriented code. It focuses on the principles, trade-offs, and production consequences of applying (or failing to apply) these patterns.

**Version baselines.** GoF (1994), SOLID (Robert C. Martin, 2000s), Clean Architecture (Robert C. Martin, 2017), Fowler *Refactoring* 2nd ed. (2018), Fowler *Patterns of Enterprise Application Architecture* (2002).

---

## 2. Definition

The software-engineering vocabulary used in this document:

| Term | Type | Authoritative source |
|------|------|---------------------|
| **SOLID** | 5 principles (SRP, OCP, LSP, ISP, DIP) | Robert C. Martin, *Agile Software Development* (2003) |
| **Single Responsibility Principle (SRP)** | A class has one reason to change | Robert C. Martin |
| **Open/Closed Principle (OCP)** | Open for extension, closed for modification | Bertrand Meyer (1988); Martin popularised |
| **Liskov Substitution Principle (LSP)** | Subtypes substitutable for base types | Barbara Liskov (1987) |
| **Interface Segregation Principle (ISP)** | Many specific interfaces > one general | Robert C. Martin |
| **Dependency Inversion Principle (DIP)** | Depend on abstractions, not concretions | Robert C. Martin |
| **Design Pattern** | Reusable solution to a recurring problem | GoF (1994) |
| **Creational Pattern** | Pattern that deals with object creation | GoF |
| **Structural Pattern** | Pattern that deals with object composition | GoF |
| **Behavioral Pattern** | Pattern that deals with object responsibility | GoF |
| **Repository** | Mediates between domain and data mapping | Fowler, *PoEAA* (2002) |
| **Unit of Work** | Maintains a list of objects affected by a transaction | Fowler, *PoEAA* |
| **Service Layer** | Defines application's boundary and set of operations | Fowler, *PoEAA* |
| **Active Record** | Object wraps a row in a database table | Fowler, *PoEAA* |
| **Data Mapper** | Layer that moves data between objects and DB | Fowler, *PoEAA* |
| **Identity Map** | Ensures each object loaded once per transaction | Fowler, *PoEAA* |
| **Specification** | Boolean expression that can be combined | Fowler, *PoEAA* |
| **Query Object** | Object that represents a database query | Fowler, *PoEAA* |
| **Refactoring** | Restructuring without changing external behavior | Fowler, *Refactoring* |
| **Code smell** | Surface indication of deeper problem | Fowler |
| **Technical debt** | Cost of choosing easy solution today | Ward Cunningham (1992) |
| **Bounded Context** | Boundary within which a model applies | Eric Evans, *DDD* (2003) |
| **Aggregate** | Cluster of domain objects treated as one unit | Eric Evans, *DDD* |
| **Clean Architecture** | Layered architecture with dependency rule | Robert C. Martin (2012/2017) |
| **Hexagonal Architecture** | Ports and adapters | Alistair Cockburn (2005) |
| **Onion Architecture** | Dependency-inverted layers | Jeffrey Palermo (2008) |
| **YAGNI** | You Aren't Gonna Need It | Ron Jeffries (XP) |
| **DRY** | Don't Repeat Yourself | Andy Hunt, Dave Thomas (1999) |
| **KISS** | Keep It Simple, Stupid | U.S. Navy (1960s) |
| **Tell, Don't Ask** | Objects should command, not query | Alec Sharp |
| **Law of Demeter** | Only talk to immediate friends | Ian Holland (1987) |

The SOLID-and-patterns landscape:

```mermaid
graph TB
    subgraph "Principles"
        SOLID["SOLID<br/>5 OO design principles"]
        DRY["DRY"]
        KISS["KISS"]
        YAGNI["YAGNI"]
    end
    subgraph "Patterns"
        GoF["Gang of Four<br/>23 patterns"]
        PoEAA["Fowler PoEAA<br/>enterprise patterns"]
        DDD["Evans DDD<br/>domain patterns"]
    end
    subgraph "Practices"
        Refactoring["Refactoring<br/>+ smells catalog"]
        TDD["Test-Driven Dev"]
        Review["Code Review"]
    end
    SOLID --> GoF
    SOLID --> PoEAA
    SOLID --> DDD
    Refactoring --> GoF
    Refactoring --> PoEAA
    TDD --> Refactoring
```

---

## 3. Five Ws + One H

### What <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23what%0A%0ASection%20title%3A%20What' target='_blank' rel='noopener' data-askgpt='What' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#what' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23what%0A%0ASection%20title%3A%20What' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23what%0A%0ASection%20title%3A%20What' title='Ask ChatGPT about this section'>💬</a>

Software engineering is the disciplined study and practice of designing, building, testing, and maintaining software systems. The discipline combines **principles** (what good design looks like), **patterns** (reusable solutions to recurring problems), **practices** (how teams actually work), and **architecture** (the structural decisions that constrain the whole system).

### Why <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23why%0A%0ASection%20title%3A%20Why' target='_blank' rel='noopener' data-askgpt='Why' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#why' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23why%0A%0ASection%20title%3A%20Why' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23why%0A%0ASection%20title%3A%20Why' title='Ask ChatGPT about this section'>💬</a>

Software systems rot. Without discipline, codebases accumulate complexity, dependencies, and shortcuts until change becomes impossible. Patterns and principles are the load-bearing walls that prevent collapse. They are also the shared vocabulary that lets teams talk about design.

### When <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23when%0A%0ASection%20title%3A%20When' target='_blank' rel='noopener' data-askgpt='When' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#when' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23when%0A%0ASection%20title%3A%20When' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23when%0A%0ASection%20title%3A%20When' title='Ask ChatGPT about this section'>💬</a>

- **1968 — NATO Software Engineering Conference** coins the term "software engineering" in response to the "software crisis."
- **1987 — Liskov Substitution Principle** published by Barbara Liskov.
- **1988 — Open/Closed Principle** coined by Bertrand Meyer.
- **1992 — Design Patterns** book proposal by Gamma; first patterns documented.
- **1994 — *Design Patterns: Elements of Reusable Object-Oriented Software*** published (Gamma, Helm, Johnson, Vlissides — the "Gang of Four").
- **1999 — *Refactoring*** by Martin Fowler; first code-smell catalog.
- **2002 — *Patterns of Enterprise Application Architecture*** by Fowler.
- **2003 — *Domain-Driven Design*** by Eric Evans; Aggregate, Bounded Context.
- **2003 — SOLID** acronym popularized by Robert C. Martin (originally coined by Michael Feathers).
- **2005 — Hexagonal Architecture** by Alistair Cockburn.
- **2008 — Onion Architecture** by Jeffrey Palermo.
- **2012/2017 — Clean Architecture** by Robert C. Martin.

### Where <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23where%0A%0ASection%20title%3A%20Where' target='_blank' rel='noopener' data-askgpt='Where' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#where' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23where%0A%0ASection%20title%3A%20Where' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23where%0A%0ASection%20title%3A%20Where' title='Ask ChatGPT about this section'>💬</a>

Every software system, from embedded firmware to planet-scale distributed services. The vocabulary is universal; the application varies by language, scale, and domain.

### Who <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23who%0A%0ASection%20title%3A%20Who' target='_blank' rel='noopener' data-askgpt='Who' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#who' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23who%0A%0ASection%20title%3A%20Who' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23who%0A%0ASection%20title%3A%20Who' title='Ask ChatGPT about this section'>💬</a>

Engineers, architects, technical leads. Read by everyone who writes code or designs systems. Patterns are not the exclusive domain of senior engineers — they are tools every engineer should recognize.

### How <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23how%0A%0ASection%20title%3A%20How' target='_blank' rel='noopener' data-askgpt='How' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#how' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23how%0A%0ASection%20title%3A%20How' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23how%0A%0ASection%20title%3A%20How' title='Ask ChatGPT about this section'>💬</a>

**Apply principles to evaluate design.** When designing a class, ask the SOLID questions: one responsibility? extensible without modification? substitutable? interface minimal? abstractions concrete? When designing a system, ask the architectural questions: where do dependencies point? what is the innermost layer? how do outer layers communicate with inner? **Apply patterns to solve recurring problems** — but only when the problem matches the pattern's intent, never for its own sake. **Refactor continuously** to keep code aligned with principles as understanding evolves.

---

## 4. History

### 4.1 The software crisis (1968) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2341-the-software-crisis-1968%0A%0ASection%20title%3A%204.1%20The%20software%20crisis%20(1968)' target='_blank' rel='noopener' data-askgpt='4.1 The software crisis (1968)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#41-the-software-crisis-1968' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2341-the-software-crisis-1968%0A%0ASection%20title%3A%204.1%20The%20software%20crisis%20(1968)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2341-the-software-crisis-1968%0A%0ASection%20title%3A%204.1%20The%20software%20crisis%20(1968)' title='Ask ChatGPT about this section'>💬</a>

The 1968 NATO Software Engineering Conference in Garmisch, Germany, coined the term **software engineering** to address the "software crisis" — projects running over budget, behind schedule, and producing unreliable code. The conference called for disciplined practices analogous to civil engineering.

### 4.2 Structured programming and design (1970s–1980s) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2342-structured-programming-and-design-1970s1980s%0A%0ASection%20title%3A%204.2%20Structured%20programming%20and%20design%20(1970s%E2%80%931980s)' target='_blank' rel='noopener' data-askgpt='4.2 Structured programming and design (1970s–1980s)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#42-structured-programming-and-design-1970s1980s' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2342-structured-programming-and-design-1970s1980s%0A%0ASection%20title%3A%204.2%20Structured%20programming%20and%20design%20(1970s%E2%80%931980s)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2342-structured-programming-and-design-1970s1980s%0A%0ASection%20title%3A%204.2%20Structured%20programming%20and%20design%20(1970s%E2%80%931980s)' title='Ask ChatGPT about this section'>💬</a>

Edsger Dijkstra's *Notes on Structured Programming* (1970) established that programs should be constructed from a small set of control structures. The 1970s and 1980s saw the rise of structured analysis (DeMarco, Yourdon) and structured design (Constantine, Yourdon), which introduced concepts like coupling and cohesion that prefigured SOLID.

### 4.3 Object-orientation and the birth of patterns (1980s–1990s) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2343-object-orientation-and-the-birth-of-patterns-1980s1990s%0A%0ASection%20title%3A%204.3%20Object-orientation%20and%20the%20birth%20of%20patterns%20(1980s%E2%80%931990s)' target='_blank' rel='noopener' data-askgpt='4.3 Object-orientation and the birth of patterns (1980s–1990s)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#43-object-orientation-and-the-birth-of-patterns-1980s1990s' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2343-object-orientation-and-the-birth-of-patterns-1980s1990s%0A%0ASection%20title%3A%204.3%20Object-orientation%20and%20the%20birth%20of%20patterns%20(1980s%E2%80%931990s)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2343-object-orientation-and-the-birth-of-patterns-1980s1990s%0A%0ASection%20title%3A%204.3%20Object-orientation%20and%20the%20birth%20of%20patterns%20(1980s%E2%80%931990s)' title='Ask ChatGPT about this section'>💬</a>

Smalltalk (1980) and C++ (1985) brought object-orientation to the mainstream. The "Gang of Four" — Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides — began cataloging reusable OO patterns in the late 1980s. Their 1994 book codified 23 patterns organized into creational, structural, and behavioral categories.

### 4.4 SOLID and the agile turn (2000s) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2344-solid-and-the-agile-turn-2000s%0A%0ASection%20title%3A%204.4%20SOLID%20and%20the%20agile%20turn%20(2000s)' target='_blank' rel='noopener' data-askgpt='4.4 SOLID and the agile turn (2000s)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#44-solid-and-the-agile-turn-2000s' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2344-solid-and-the-agile-turn-2000s%0A%0ASection%20title%3A%204.4%20SOLID%20and%20the%20agile%20turn%20(2000s)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2344-solid-and-the-agile-turn-2000s%0A%0ASection%20title%3A%204.4%20SOLID%20and%20the%20agile%20turn%20(2000s)' title='Ask ChatGPT about this section'>💬</a>

Robert C. Martin consolidated decades of OO design wisdom into five principles, abbreviated by Michael Feathers as **SOLID**. *Agile Software Development: Principles, Patterns, and Practices* (2003) and later *Clean Code* (2008) and *Clean Architecture* (2017) extended these ideas into team practices and system architecture.

### 4.5 Enterprise patterns and DDD (2000s) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2345-enterprise-patterns-and-ddd-2000s%0A%0ASection%20title%3A%204.5%20Enterprise%20patterns%20and%20DDD%20(2000s)' target='_blank' rel='noopener' data-askgpt='4.5 Enterprise patterns and DDD (2000s)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#45-enterprise-patterns-and-ddd-2000s' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2345-enterprise-patterns-and-ddd-2000s%0A%0ASection%20title%3A%204.5%20Enterprise%20patterns%20and%20DDD%20(2000s)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2345-enterprise-patterns-and-ddd-2000s%0A%0ASection%20title%3A%204.5%20Enterprise%20patterns%20and%20DDD%20(2000s)' title='Ask ChatGPT about this section'>💬</a>

Martin Fowler's *Patterns of Enterprise Application Architecture* (2002) addressed the recurring problems of building business applications on relational databases. Eric Evans's *Domain-Driven Design* (2003) introduced the strategic patterns — Bounded Context, Context Map, Aggregate — that govern how large systems are decomposed.

### 4.6 The architectural turn (2010s) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2346-the-architectural-turn-2010s%0A%0ASection%20title%3A%204.6%20The%20architectural%20turn%20(2010s)' target='_blank' rel='noopener' data-askgpt='4.6 The architectural turn (2010s)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#46-the-architectural-turn-2010s' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2346-the-architectural-turn-2010s%0A%0ASection%20title%3A%204.6%20The%20architectural%20turn%20(2010s)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2346-the-architectural-turn-2010s%0A%0ASection%20title%3A%204.6%20The%20architectural%20turn%20(2010s)' title='Ask ChatGPT about this section'>💬</a>

The 2010s saw the convergence of Clean, Hexagonal, and Onion architectures. All three share a single principle — **the Dependency Rule** — and differ mainly in vocabulary and diagram conventions. Microservices, DevOps, and cloud-native architecture revived interest in patterns at the system level (circuit breaker, saga, outbox, CQRS, event sourcing).

---

## 5. Problem Statement

Software systems fail in characteristic ways. Without disciplined application of principles and patterns, every codebase accumulates the same pathologies:

### 5.1 Rigidity <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2351-rigidity%0A%0ASection%20title%3A%205.1%20Rigidity' target='_blank' rel='noopener' data-askgpt='5.1 Rigidity' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#51-rigidity' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2351-rigidity%0A%0ASection%20title%3A%205.1%20Rigidity' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2351-rigidity%0A%0ASection%20title%3A%205.1%20Rigidity' title='Ask ChatGPT about this section'>💬</a>

A change to one module cascades into changes throughout the system. Adding a feature requires touching dozens of files for reasons unrelated to the feature itself. The cost of change grows super-linearly over time.

### 5.2 Fragility <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2352-fragility%0A%0ASection%20title%3A%205.2%20Fragility' target='_blank' rel='noopener' data-askgpt='5.2 Fragility' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#52-fragility' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2352-fragility%0A%0ASection%20title%3A%205.2%20Fragility' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2352-fragility%0A%0ASection%20title%3A%205.2%20Fragility' title='Ask ChatGPT about this section'>💬</a>

Changes break unrelated parts of the system. A bug fix in module A causes failures in module Z, which has no apparent relationship to A. The system becomes a minefield where any change might detonate an unrelated component.

### 5.3 Immobility <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2353-immobility%0A%0ASection%20title%3A%205.3%20Immobility' target='_blank' rel='noopener' data-askgpt='5.3 Immobility' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#53-immobility' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2353-immobility%0A%0ASection%20title%3A%205.3%20Immobility' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2353-immobility%0A%0ASection%20title%3A%205.3%20Immobility' title='Ask ChatGPT about this section'>💬</a>

Code that should be reusable cannot be extracted. A component that would be useful in another system is entangled with so many domain-specific dependencies that extracting it is harder than rewriting it.

### 5.4 Viscosity <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2354-viscosity%0A%0ASection%20title%3A%205.4%20Viscosity' target='_blank' rel='noopener' data-askgpt='5.4 Viscosity' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#54-viscosity' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2354-viscosity%0A%0ASection%20title%3A%205.4%20Viscosity' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2354-viscosity%0A%0ASection%20title%3A%205.4%20Viscosity' title='Ask ChatGPT about this section'>💬</a>

Doing things right is harder than doing things wrong. The "design-preserving" path through the code is so convoluted that developers take hacks to make progress. Each hack makes the next hack more likely.

### 5.5 Needless complexity <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2355-needless-complexity%0A%0ASection%20title%3A%205.5%20Needless%20complexity' target='_blank' rel='noopener' data-askgpt='5.5 Needless complexity' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#55-needless-complexity' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2355-needless-complexity%0A%0ASection%20title%3A%205.5%20Needless%20complexity' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2355-needless-complexity%0A%0ASection%20title%3A%205.5%20Needless%20complexity' title='Ask ChatGPT about this section'>💬</a>

The system contains infrastructure for capabilities that aren't currently required. YAGNI violations accumulate. The code anticipates change that never comes, and the anticipated change never matches the actual change.

### 5.6 Needless repetition <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2356-needless-repetition%0A%0ASection%20title%3A%205.6%20Needless%20repetition' target='_blank' rel='noopener' data-askgpt='5.6 Needless repetition' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#56-needless-repetition' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2356-needless-repetition%0A%0ASection%20title%3A%205.6%20Needless%20repetition' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2356-needless-repetition%0A%0ASection%20title%3A%205.6%20Needless%20repetition' title='Ask ChatGPT about this section'>💬</a>

The same expression of a concept appears in multiple places. Changing the concept requires finding and changing every occurrence. Bugs that should be impossible (because they live in one place) appear in many places.

### 5.7 Opacity <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2357-opacity%0A%0ASection%20title%3A%205.7%20Opacity' target='_blank' rel='noopener' data-askgpt='5.7 Opacity' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#57-opacity' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2357-opacity%0A%0ASection%20title%3A%205.7%20Opacity' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2357-opacity%0A%0ASection%20title%3A%205.7%20Opacity' title='Ask ChatGPT about this section'>💬</a>

Code is hard to read and understand. The intent is obscured by convoluted control flow, cryptic names, and entangled responsibilities. New engineers take months to become productive.

These seven pathologies map directly to the principles that prevent them. Rigidity and fragility are the predictable consequence of violating OCP and DIP. Immobility follows from violating SRP. Viscosity is enabled by ISP violations and the absence of patterns that make the right thing easy. Needless complexity is YAGNI violation. Repetition is DRY violation. Opacity is the absence of the Tell-Don't-Ask principle and good naming.

---

## 6. Real-World Motivation

### 6.1 Amazon <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2361-amazon%0A%0ASection%20title%3A%206.1%20Amazon' target='_blank' rel='noopener' data-askgpt='6.1 Amazon' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#61-amazon' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2361-amazon%0A%0ASection%20title%3A%206.1%20Amazon' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2361-amazon%0A%0ASection%20title%3A%206.1%20Amazon' title='Ask ChatGPT about this section'>💬</a>

Amazon's shift from a monolithic application to service-oriented architecture (2001–2002) was driven by exactly the pathologies above. Jeff Bezos's famous API mandate ("all teams will henceforth expose their data and functionality through service interfaces") was an architectural-level application of DIP and ISP. The mandate enabled independent deployability and parallel team velocity.

### 6.2 Google <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2362-google%0A%0ASection%20title%3A%206.2%20Google' target='_blank' rel='noopener' data-askgpt='6.2 Google' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#62-google' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2362-google%0A%0ASection%20title%3A%206.2%20Google' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2362-google%0A%0ASection%20title%3A%206.2%20Google' title='Ask ChatGPT about this section'>💬</a>

Google's monorepo and strict code review culture operationalize the principle that code is read more than written. Their testing infrastructure enforces test coverage at scale; their style guides (especially the C++ style guide) are an attempt to enforce the patterns that prevent the pathologies.

### 6.3 Microsoft <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2363-microsoft%0A%0ASection%20title%3A%206.3%20Microsoft' target='_blank' rel='noopener' data-askgpt='6.3 Microsoft' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#63-microsoft' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2363-microsoft%0A%0ASection%20title%3A%206.3%20Microsoft' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2363-microsoft%0A%0ASection%20title%3A%206.3%20Microsoft' title='Ask ChatGPT about this section'>💬</a>

.NET, C#, and the .NET runtime are designed around patterns: dependency injection is built into the framework, ASP.NET Core's middleware pipeline is a chain-of-responsibility implementation, and Entity Framework is built on Unit of Work and Repository.

### 6.4 Netflix <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2364-netflix%0A%0ASection%20title%3A%206.4%20Netflix' target='_blank' rel='noopener' data-askgpt='6.4 Netflix' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#64-netflix' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2364-netflix%0A%0ASection%20title%3A%206.4%20Netflix' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2364-netflix%0A%0ASection%20title%3A%206.4%20Netflix' title='Ask ChatGPT about this section'>💬</a>

Netflix's Hystrix (now replaced by Resilience4j) was the production reference for the Circuit Breaker pattern at scale. Their migration from a monolithic DVD-rental system to a cloud-native microservices architecture is one of the most-studied applications of clean architecture and dependency inversion at scale.

### 6.5 Meta (Facebook) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2365-meta-facebook%0A%0ASection%20title%3A%206.5%20Meta%20(Facebook)' target='_blank' rel='noopener' data-askgpt='6.5 Meta (Facebook)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#65-meta-facebook' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2365-meta-facebook%0A%0ASection%20title%3A%206.5%20Meta%20(Facebook)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2365-meta-facebook%0A%0ASection%20title%3A%206.5%20Meta%20(Facebook)' title='Ask ChatGPT about this section'>💬</a>

Meta's "Move fast with stable infrastructure" culture combines YAGNI (move fast) with disciplined architectural patterns (stable infrastructure). Their HHVM, Hack language, and React are all attempts to provide patterns and primitives that prevent the pathologies at the language level.

### 6.6 Stripe <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2366-stripe%0A%0ASection%20title%3A%206.6%20Stripe' target='_blank' rel='noopener' data-askgpt='6.6 Stripe' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#66-stripe' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2366-stripe%0A%0ASection%20title%3A%206.6%20Stripe' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2366-stripe%0A%0ASection%20title%3A%206.6%20Stripe' title='Ask ChatGPT about this section'>💬</a>

Stripe's API design is a master class in Interface Segregation. Their API surface is decomposed into many small, focused resources (Charges, Customers, PaymentIntents, SetupIntents) rather than one large "Payment" interface. This permits evolution without breaking the world.

---

## 7. Internal Working

### 7.1 How principles interact <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2371-how-principles-interact%0A%0ASection%20title%3A%207.1%20How%20principles%20interact' target='_blank' rel='noopener' data-askgpt='7.1 How principles interact' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#71-how-principles-interact' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2371-how-principles-interact%0A%0ASection%20title%3A%207.1%20How%20principles%20interact' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2371-how-principles-interact%0A%0ASection%20title%3A%207.1%20How%20principles%20interact' title='Ask ChatGPT about this section'>💬</a>

Principles are not independent. They reinforce each other:

```mermaid
graph LR
    SRP["SRP<br/>one reason to change"]
    OCP["OCP<br/>extend, don't modify"]
    LSP["LSP<br/>subtype substitutable"]
    ISP["ISP<br/>small interfaces"]
    DIP["DIP<br/>depend on abstractions"]

    SRP -->|"enables"| OCP
    OCP -->|"requires"| LSP
    OCP -->|"enabled by"| ISP
    DIP -->|"requires"| ISP
    LSP -->|"requires"| DIP
```

- **SRP enables OCP.** A class with multiple responsibilities must be modified when any one responsibility changes. Splitting responsibilities (SRP) produces classes that can be extended independently (OCP).
- **OCP requires LSP.** Open-for-extension typically means "subclass and override." LSP ensures that the subclass behaves as the base class promises, so existing callers continue to work.
- **OCP is enabled by ISP.** If a class depends on a fat interface, extending behavior requires modifying the interface (violating OCP). Small interfaces can be composed without modification.
- **DIP requires ISP.** Dependency inversion means depending on abstractions. Useful abstractions are small and focused (ISP), so high-level modules depend only on what they need.
- **LSP requires DIP.** Substitutability is testable only when the abstraction is stable (DIP). Without DIP, the "base type" is concrete and LSP violations are hard to detect.

### 7.2 How patterns relate to principles <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2372-how-patterns-relate-to-principles%0A%0ASection%20title%3A%207.2%20How%20patterns%20relate%20to%20principles' target='_blank' rel='noopener' data-askgpt='7.2 How patterns relate to principles' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#72-how-patterns-relate-to-principles' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2372-how-patterns-relate-to-principles%0A%0ASection%20title%3A%207.2%20How%20patterns%20relate%20to%20principles' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2372-how-patterns-relate-to-principles%0A%0ASection%20title%3A%207.2%20How%20patterns%20relate%20to%20principles' title='Ask ChatGPT about this section'>💬</a>

Patterns are not principles; they are solutions. Each pattern embodies several principles:

| Pattern | Primary principle | Secondary principles |
|---------|------------------|---------------------|
| **Strategy** | OCP | DIP, ISP |
| **Decorator** | OCP | DIP |
| **Factory Method** | DIP | OCP |
| **Abstract Factory** | DIP | OCP, ISP |
| **Observer** | DIP | ISP |
| **Template Method** | OCP | LSP |
| **Composite** | OCP | DIP |
| **Adapter** | DIP | ISP |
| **Facade** | ISP | SRP |
| **Proxy** | OCP | DIP |
| **Repository** | DIP, ISP | SRP |
| **Unit of Work** | SRP | DIP |
| **Service Layer** | SRP, DIP | ISP |

### 7.3 How refactoring operates <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2373-how-refactoring-operates%0A%0ASection%20title%3A%207.3%20How%20refactoring%20operates' target='_blank' rel='noopener' data-askgpt='7.3 How refactoring operates' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#73-how-refactoring-operates' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2373-how-refactoring-operates%0A%0ASection%20title%3A%207.3%20How%20refactoring%20operates' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2373-how-refactoring-operates%0A%0ASection%20title%3A%207.3%20How%20refactoring%20operates' title='Ask ChatGPT about this section'>💬</a>

Refactoring is a process, not an event. The discipline:

```mermaid
graph LR
    A["1. Identify smell"] --> B["2. Write failing test<br/>(if not present)"]
    B --> C["3. Apply refactoring<br/>(mechanical)"]
    C --> D["4. Run tests"]
    D -->|"pass"| E["5. Commit"]
    D -->|"fail"| C
    E --> F["6. Continue"]
```

The key discipline: **separate refactoring from feature work**. A "refactor + add feature" change is two changes in one commit, and when tests fail, you cannot tell which change broke things.

### 7.4 Architecture layering <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2374-architecture-layering%0A%0ASection%20title%3A%207.4%20Architecture%20layering' target='_blank' rel='noopener' data-askgpt='7.4 Architecture layering' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#74-architecture-layering' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2374-architecture-layering%0A%0ASection%20title%3A%207.4%20Architecture%20layering' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2374-architecture-layering%0A%0ASection%20title%3A%207.4%20Architecture%20layering' title='Ask ChatGPT about this section'>💬</a>

Architectural patterns (Clean, Hexagonal, Onion) share the same internal structure:

```mermaid
graph TB
    subgraph "Dependency direction (inward)"
        F["Frameworks & Drivers<br/>(DB, web, UI)"]
        I["Interface Adapters<br/>(controllers, gateways)"]
        U["Use Cases<br/>(application logic)"]
        E["Entities<br/>(enterprise business rules)"]
    end
    F --> I
    I --> U
    U --> E
```

The Dependency Rule: source code dependencies point only inward. Inner circles know nothing about outer circles. Control flow can go either direction; dependency only goes inward.

---

## 8. Deep Dive

### 8.1 SOLID principles <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2381-solid-principles%0A%0ASection%20title%3A%208.1%20SOLID%20principles' target='_blank' rel='noopener' data-askgpt='8.1 SOLID principles' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#81-solid-principles' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2381-solid-principles%0A%0ASection%20title%3A%208.1%20SOLID%20principles' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2381-solid-principles%0A%0ASection%20title%3A%208.1%20SOLID%20principles' title='Ask ChatGPT about this section'>💬</a>

#### 8.1.1 Single Responsibility Principle (SRP)

> *A class should have only one reason to change.*

A "reason to change" is a stakeholder, an actor, or a concern. A `User` class that handles persistence, email, and reporting has three reasons to change (the DB schema, the email service, and the report format). When the report format changes, the persistence layer shouldn't be at risk.

```java
// VIOLATION
class User {
    private String name;
    private String email;

    void save() { /* JDBC */ }                        // persistence concern
    void sendWelcomeEmail() { /* SMTP */ }            // messaging concern
    String generateReport() { /* template */ }        // reporting concern
}

// COMPLIANT
class User {
    private final String name;
    private final String email;
    // ...
}

class UserRepository { void save(User u) { /* ... */ } }
class WelcomeEmailSender { void send(User u) { /* ... */ } }
class UserReportGenerator { String generate(User u) { /* ... */ } }
```

**Operational test.** Can you describe what the class does in one sentence without "and"? If not, split it.

#### 8.1.2 Open/Closed Principle (OCP)

> *Software entities should be open for extension, closed for modification.*

Adding new behavior should not require modifying existing tested code. The classic mechanisms: inheritance, polymorphism, strategy, decorator.

```java
// Strategy enables extension without modification
interface PricingStrategy { BigDecimal price(Order o); }

class StandardPricing implements PricingStrategy {
    public BigDecimal price(Order o) { /* ... */ }
}

class DiscountPricing implements PricingStrategy {
    public BigDecimal price(Order o) { /* ... */ }
}

// Adding a new pricing scheme requires adding a new class,
// not modifying the OrderProcessor
class OrderProcessor {
    private final PricingStrategy strategy;
    OrderProcessor(PricingStrategy s) { this.strategy = s; }
    BigDecimal total(Order o) { return strategy.price(o); }
}
```

**Operational test.** When you add a feature, how many existing files must you modify? If the answer is "more than one unrelated file," OCP is being violated somewhere.

#### 8.1.3 Liskov Substitution Principle (LSP)

> *Subtypes must be substitutable for their base types.*

A subclass must honor the contracts of its base class — preconditions, postconditions, and invariants. The classic violation: `Square extends Rectangle` where `Square.setWidth` and `Square.setHeight` mutate both dimensions, violating the base's invariant that width and height are independent.

```java
// VIOLATION
class Rectangle {
    protected int width, height;
    public void setWidth(int w) { width = w; }
    public void setHeight(int h) { height = h; }
    public int area() { return width * height; }
}
class Square extends Rectangle {
    @Override public void setWidth(int w) { width = w; height = w; }
    @Override public void setHeight(int h) { width = h; height = h; }
}

// Client code that depends on Rectangle's invariant breaks:
Rectangle r = new Square();
r.setWidth(5);
r.setHeight(3);
assert r.area() == 15;  // FAILS — area is 9

// COMPLIANT: shape an abstract Shape, with Rectangle and Square as siblings
abstract class Shape { abstract int area(); }
class Rectangle extends Shape { /* ... */ }
class Square extends Shape { /* ... */ }
```

**Behavioral subtyping.** The rules: (1) contravariant parameters — a subclass may accept broader parameter types; (2) covariant return types — a subclass may return narrower types; (3) invariants of the base must be preserved; (4) postconditions of the base must be honored; (5) preconditions of the base must not be strengthened.

#### 8.1.4 Interface Segregation Principle (ISP)

> *Clients should not be forced to depend on methods they do not use.*

Many small, role-specific interfaces are better than one general-purpose interface. The "fat interface" anti-pattern: an interface with many methods that clients selectively ignore. Implementing it forces them to write no-op or throw-stub implementations.

```java
// VIOLATION
interface Worker { void work(); void eat(); void sleep(); }
class Robot implements Worker {
    public void work() { /* ... */ }
    public void eat() { throw new UnsupportedOperationException(); }
    public void sleep() { throw new UnsupportedOperationException(); }
}

// COMPLIANT
interface Workable { void work(); }
interface Feedable { void eat(); }
interface Sleepable { void sleep(); }
class Robot implements Workable { /* ... */ }
class Human implements Workable, Feedable, Sleepable { /* ... */ }
```

**Operational test.** When a class implements an interface, are all methods meaningful? If any method is a stub, the interface is too large.

#### 8.1.5 Dependency Inversion Principle (DIP)

> *High-level modules should not depend on low-level modules. Both should depend on abstractions.*

This is the principle that makes the others testable. Without DIP, classes are bound to concrete implementations; with DIP, they depend on abstractions that can be substituted at test time or configuration time.

```java
// VIOLATION
class OrderService {
    private final PostgresOrderRepository repo = new PostgresOrderRepository();
    void place(Order o) { repo.save(o); }
}

// COMPLIANT
interface OrderRepository { void save(Order o); }
class OrderService {
    private final OrderRepository repo;
    OrderService(OrderRepository repo) { this.repo = repo; }
    void place(Order o) { repo.save(o); }
}
// Composition root wires the concrete implementation
class AppConfig {
    OrderRepository orderRepository() { return new PostgresOrderRepository(); }
    OrderService orderService() { return new OrderService(orderRepository()); }
}
```

**The "new" keyword is a glue smell.** Every `new` of a concrete class creates a hard dependency. In production code, `new` should appear only at composition roots (main methods, DI containers, factories).

### 8.2 Gang of Four patterns (23 patterns) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2382-gang-of-four-patterns-23-patterns%0A%0ASection%20title%3A%208.2%20Gang%20of%20Four%20patterns%20(23%20patterns)' target='_blank' rel='noopener' data-askgpt='8.2 Gang of Four patterns (23 patterns)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#82-gang-of-four-patterns-23-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2382-gang-of-four-patterns-23-patterns%0A%0ASection%20title%3A%208.2%20Gang%20of%20Four%20patterns%20(23%20patterns)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2382-gang-of-four-patterns-23-patterns%0A%0ASection%20title%3A%208.2%20Gang%20of%20Four%20patterns%20(23%20patterns)' title='Ask ChatGPT about this section'>💬</a>

The GoF book organizes 23 patterns into three categories. Each pattern has a structure, a problem it solves, a solution, and consequences. Here is a production-grade summary.

#### 8.2.1 Creational patterns

| Pattern | Intent | When to use |
|---------|--------|-------------|
| **Abstract Factory** | Provide an interface for creating families of related objects without specifying concrete classes | When a system must be independent of how its products are created |
| **Builder** | Separate the construction of a complex object from its representation | When construction involves many steps or optional components |
| **Factory Method** | Define an interface for creating an object, but let subclasses decide which class to instantiate | When a class cannot anticipate the class of objects it must create |
| **Prototype** | Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype | When creation is more expensive than cloning |
| **Singleton** | Ensure a class has only one instance and provide a global point of access | When exactly one instance is needed (config, caches — though Singleton is itself controversial) |

#### 8.2.2 Structural patterns

| Pattern | Intent |
|---------|--------|
| **Adapter** | Convert the interface of a class into another interface clients expect |
| **Bridge** | Decouple an abstraction from its implementation so the two can vary independently |
| **Composite** | Compose objects into tree structures to represent part-whole hierarchies |
| **Decorator** | Attach additional responsibilities to an object dynamically |
| **Facade** | Provide a unified interface to a set of interfaces in a subsystem |
| **Flyweight** | Use sharing to support large numbers of fine-grained objects efficiently |
| **Proxy** | Provide a surrogate or placeholder for another object to control access |

#### 8.2.3 Behavioral patterns

| Pattern | Intent |
|---------|--------|
| **Chain of Responsibility** | Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle it |
| **Command** | Encapsulate a request as an object, thereby parameterizing clients with different requests |
| **Interpreter** | Given a language, define a representation for its grammar along with an interpreter |
| **Iterator** | Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation |
| **Mediator** | Define an object that encapsulates how a set of objects interact |
| **Memento** | Without violating encapsulation, capture and externalize an object's internal state |
| **Observer** | Define a one-to-many dependency between objects so that when one object changes state, all dependents are notified |
| **State** | Allow an object to alter its behavior when its internal state changes |
| **Strategy** | Define a family of algorithms, encapsulate each one, and make them interchangeable |
| **Template Method** | Define the skeleton of an algorithm in an operation, deferring some steps to subclasses |
| **Visitor** | Represent an operation to be performed on the elements of an object structure |

### 8.3 Enterprise patterns (Fowler) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2383-enterprise-patterns-fowler%0A%0ASection%20title%3A%208.3%20Enterprise%20patterns%20(Fowler)' target='_blank' rel='noopener' data-askgpt='8.3 Enterprise patterns (Fowler)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#83-enterprise-patterns-fowler' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2383-enterprise-patterns-fowler%0A%0ASection%20title%3A%208.3%20Enterprise%20patterns%20(Fowler)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2383-enterprise-patterns-fowler%0A%0ASection%20title%3A%208.3%20Enterprise%20patterns%20(Fowler)' title='Ask ChatGPT about this section'>💬</a>

#### 8.3.1 Repository

> *Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.*

A Repository encapsulates the persistence concern behind a domain-shaped interface. Domain code talks to `OrderRepository`, not to JDBC. The Repository implementation can be swapped (JDBC, JPA, in-memory) without changing domain code.

```java
interface OrderRepository {
    Optional<Order> findById(OrderId id);
    List<Order> findByCustomer(CustomerId customerId);
    void save(Order order);
    void delete(OrderId id);
}

class JpaOrderRepository implements OrderRepository {
    private final EntityManager em;
    // implementation
}
```

#### 8.3.2 Unit of Work

> *Maintains a list of objects affected by a business transaction and coordinates the writing out of changes and resolution of concurrency problems.*

A Unit of Work tracks every object loaded or created during a transaction and commits all changes at the end. Hibernate's `Session` and JPA's `EntityManager` are Unit-of-Work implementations.

```java
interface UnitOfWork {
    void registerNew(Object entity);
    void registerDirty(Object entity);
    void registerRemoved(Object entity);
    void commit();
    void rollback();
}
```

#### 8.3.3 Service Layer

> *Defines an application's boundary and its set of operations from the perspective of interfacing client layers.*

A Service Layer encapsulates business use cases. The application exposes services to the UI; the services orchestrate entities and repositories.

```java
interface OrderService {
    OrderId placeOrder(PlaceOrderCommand cmd);
    void cancelOrder(CancelOrderCommand cmd);
}
```

#### 8.3.4 Active Record vs Data Mapper

- **Active Record:** the object wraps a row in a database table; it knows how to save and load itself. Examples: Ruby on Rails' ActiveRecord, Laravel's Eloquent.
- **Data Mapper:** a separate layer moves data between objects and the database; the objects don't know they are persisted. Examples: Hibernate (default), MyBatis.

Active Record is simpler and faster to build. Data Mapper is more decoupled and easier to test in isolation. For complex domains, Data Mapper wins. For CRUD apps, Active Record wins.

#### 8.3.5 Identity Map

> *Ensures that each object is loaded only once per transaction.*

A `Map<Key, Entity>` keyed by primary key. Every find returns the same instance. Prevents the "same row, two objects" bug where stale data in one instance contradicts fresh data in another.

#### 8.3.6 Specification

> *Boolean expression that can be combined.*

Encapsulates business rules as composable predicates. Useful for dynamic queries ("find orders matching any of: customer=Alice, total>1000, status=pending"):

```java
interface Specification<T> {
    boolean isSatisfiedBy(T candidate);
    Specification<T> and(Specification<T> other);
}
```

### 8.4 Refactoring catalog <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2384-refactoring-catalog%0A%0ASection%20title%3A%208.4%20Refactoring%20catalog' target='_blank' rel='noopener' data-askgpt='8.4 Refactoring catalog' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#84-refactoring-catalog' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2384-refactoring-catalog%0A%0ASection%20title%3A%208.4%20Refactoring%20catalog' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2384-refactoring-catalog%0A%0ASection%20title%3A%208.4%20Refactoring%20catalog' title='Ask ChatGPT about this section'>💬</a>

#### 8.4.1 Composing methods

The heart of refactoring: long methods are the most common smell. The cure is to extract fragments into named methods.

| Refactoring | Action |
|-------------|--------|
| **Extract Method** | Turn a fragment into a method with a name that conveys its purpose |
| **Inline Method** | Put the method body into its caller when the method is no longer needed |
| **Extract Variable** | Turn an expression into a named variable |
| **Replace Temp with Query** | Turn a temp into a method call |
| **Inline Temp** | Replace a temp with its value |
| **Split Temporary Variable** | Make each temp do one thing |
| **Remove Assignments to Parameters** | Use a local variable instead |
| **Replace Method with Method Object** | Turn a long method into its own object |
| **Substitute Algorithm** | Replace a complex algorithm with a simpler one |

#### 8.4.2 Moving features

| Refactoring | Action |
|-------------|--------|
| **Move Method** | Move a method to the class that uses it most |
| **Move Field** | Move a field to the class that uses it most |
| **Extract Class** | Split a class that does two things into two classes |
| **Inline Class** | Move all features into another class |
| **Hide Delegate** | Encapsulate a delegation |

#### 8.4.3 Organizing data

| Refactoring | Action |
|-------------|--------|
| **Replace Magic Number with Symbolic Constant** | Name the constant |
| **Encapsulate Field** | Make fields private with accessors |
| **Encapsulate Collection** | Hide the collection behind add/remove |
| **Replace Type Code with Class** | Create a class for the type |
| **Replace Type Code with Subclasses** | When behavior varies |
| **Replace Type Code with State/Strategy** | When state affects behavior |
| **Replace Array with Object** | When an array represents a record |

#### 8.4.4 Simplifying conditional logic

| Refactoring | Action |
|-------------|--------|
| **Decompose Conditional** | Extract methods from `if`/`else` |
| **Consolidate Conditional Expression** | Combine `if`s with same result |
| **Replace Nested Conditional with Guard Clauses** | Flatten deep nesting |
| **Replace Conditional with Polymorphism** | When branches vary by type |
| **Introduce Null Object** | Replace null checks with a NullObject |
| **Introduce Assertion** | Make assumptions explicit |

### 8.5 Code smells catalog <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2385-code-smells-catalog%0A%0ASection%20title%3A%208.5%20Code%20smells%20catalog' target='_blank' rel='noopener' data-askgpt='8.5 Code smells catalog' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#85-code-smells-catalog' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2385-code-smells-catalog%0A%0ASection%20title%3A%208.5%20Code%20smells%20catalog' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2385-code-smells-catalog%0A%0ASection%20title%3A%208.5%20Code%20smells%20catalog' title='Ask ChatGPT about this section'>💬</a>

Code smells are surface indications of deeper problems. The Fowler taxonomy has 22 smells in 5 categories.

#### 8.5.1 Bloaters (code that has grown too large)

| Smell | Symptom | Typical cure |
|-------|---------|--------------|
| **Long Method** | Method body > 10 lines | Extract Method |
| **Large Class** | Class with many fields and methods | Extract Class |
| **Primitive Obsession** | Using primitives instead of small objects (Money, PhoneNumber, Email) | Replace Primitive with Object |
| **Long Parameter List** | Method with > 3 parameters | Introduce Parameter Object |
| **Data Clumps** | Same group of fields appears together | Extract Class, Preserve Whole Object |
| **Switch Statement** | Type code with switch (smell if polymorphism is better) | Replace Conditional with Polymorphism |

#### 8.5.2 Object-Orientation Abusers

| Smell | Symptom | Cure |
|-------|---------|------|
| **Switch Statement** | (See above) | Replace Conditional with Polymorphism |
| **Temporary Field** | Field set only in certain circumstances | Extract Class or null the field |
| **Refused Bequest** | Subclass uses only some inherited methods | Replace Inheritance with Delegation |
| **Alternative Classes with Different Interfaces** | Two classes that do the same thing with different method names | Rename Method, Move Method |

#### 8.5.3 Change Preventers

| Smell | Symptom | Cure |
|-------|---------|------|
| **Divergent Change** | One class changes for many reasons | Extract Class |
| **Shotgun Surgery** | One change requires modifying many classes | Move Method, Move Field |
| **Parallel Inheritance Hierarchies** | Creating a subclass of one forces creating a subclass of another | Move Method, Move Field |

#### 8.5.4 Dispensables

| Smell | Cure |
|-------|------|
| **Comments** (excessive) | Extract Method with a name that conveys intent |
| **Duplicate Code** | Extract Method, Pull Up Method, Form Template Method |
| **Lazy Class** | Collapse Hierarchy, Inline Class |
| **Data Class** | Encapsulate Field, Encapsulate Collection |
| **Dead Code** | Delete it |
| **Speculative Generality** | Collapse Hierarchy, Inline Class, Remove Parameter |

#### 8.5.5 Couplers

| Smell | Symptom | Cure |
|-------|---------|------|
| **Feature Envy** | Method uses more features of another class than its own | Move Method |
| **Inappropriate Intimacy** | Classes know too much about each other | Move Method, Extract Class, Hide Delegate |
| **Message Chains** | a.b().c().d() | Hide Delegate |
| **Middle Man** | Class exists only to delegate | Remove Middle Man, Inline Method |

### 8.6 Clean Architecture <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2386-clean-architecture%0A%0ASection%20title%3A%208.6%20Clean%20Architecture' target='_blank' rel='noopener' data-askgpt='8.6 Clean Architecture' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#86-clean-architecture' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2386-clean-architecture%0A%0ASection%20title%3A%208.6%20Clean%20Architecture' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2386-clean-architecture%0A%0ASection%20title%3A%208.6%20Clean%20Architecture' title='Ask ChatGPT about this section'>💬</a>

The Clean Architecture is Robert C. Martin's unification of the inward-pointing-dependency idea across Hexagonal, Onion, and his own earlier work.

#### 8.6.1 The four layers

| Layer | Contains | Knows about |
|-------|----------|-------------|
| **Entities** | Enterprise business rules, the most stable code | Nothing else |
| **Use Cases** | Application-specific business rules | Entities |
| **Interface Adapters** | Controllers, gateways, presenters | Use Cases, Entities |
| **Frameworks & Drivers** | DB, web framework, UI | Interface Adapters |

The Dependency Rule: source code dependencies point only inward. Nothing in an inner circle knows anything about an outer circle.

#### 8.6.2 Uncle Bob's rules

1. **Independent of frameworks.** The architecture doesn't depend on any framework.
2. **Testable.** The business rules can be tested without UI, DB, or web server.
3. **Independent of UI.** The UI can change without changing the business rules.
4. **Independent of database.** You can swap Oracle for Mongo without changing business rules.
5. **Independent of any external agency.** Business rules know nothing about the outside world.

#### 8.6.3 Crossing boundaries

How does control flow cross the boundary inward? Through interfaces. The presenter calls a use case through an interface defined in the use-case layer; the implementation lives in the interface-adapter layer.

```java
// Use case defines the input port
interface PlaceOrderInputPort {
    OrderId execute(PlaceOrderCommand cmd);
}

// Use case implementation lives in the use-case layer
class PlaceOrderUseCase implements PlaceOrderInputPort {
    private final OrderRepository repo;       // interface defined in entity/use-case layer
    private final PaymentGateway payment;     // output port
    public OrderId execute(PlaceOrderCommand cmd) { /* ... */ }
}

// Output port interface (also in use-case layer)
interface PaymentGateway {
    PaymentResult charge(OrderId id, Money amount);
}

// Adapter implements the output port in the outer layer
class StripePaymentGateway implements PaymentGateway { /* ... */ }
```

This is **Dependency Inversion applied at the architectural level**. The high-level policy (use case) defines the interface; the low-level mechanism (Stripe adapter) implements it.

### 8.7 Hexagonal Architecture (Ports & Adapters) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2387-hexagonal-architecture-ports-adapters%0A%0ASection%20title%3A%208.7%20Hexagonal%20Architecture%20(Ports%20%26%20Adapters)' target='_blank' rel='noopener' data-askgpt='8.7 Hexagonal Architecture (Ports & Adapters)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#87-hexagonal-architecture-ports-adapters' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2387-hexagonal-architecture-ports-adapters%0A%0ASection%20title%3A%208.7%20Hexagonal%20Architecture%20(Ports%20%26%20Adapters)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2387-hexagonal-architecture-ports-adapters%0A%0ASection%20title%3A%208.7%20Hexagonal%20Architecture%20(Ports%20%26%20Adapters)' title='Ask ChatGPT about this section'>💬</a>

Alistair Cockburn, 2005. The application has a single conceptual "inside" — the business logic. The "outside" is everything that interacts with it: databases, UIs, message queues, external services. The boundary is crossed through **ports** (interfaces defined inside) and **adapters** (implementations outside).

| Concept | Equivalent in Clean |
|---------|---------------------|
| Application | Use Cases + Entities |
| Port | Repository / Gateway interface |
| Adapter | Repository / Gateway implementation |
| Driving side | UI / API consumers (left side) |
| Driven side | DB, queues, external services (right side) |

### 8.8 Onion Architecture <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2388-onion-architecture%0A%0ASection%20title%3A%208.8%20Onion%20Architecture' target='_blank' rel='noopener' data-askgpt='8.8 Onion Architecture' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#88-onion-architecture' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2388-onion-architecture%0A%0ASection%20title%3A%208.8%20Onion%20Architecture' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2388-onion-architecture%0A%0ASection%20title%3A%208.8%20Onion%20Architecture' title='Ask ChatGPT about this section'>💬</a>

Jeffrey Palermo, 2008. The same idea with more explicit layering:

- **Domain Model** (innermost): entities, value objects, domain services.
- **Domain Services**: encapsulate business logic that doesn't fit in one entity.
- **Application Services**: orchestrate use cases; depend on domain layer.
- **Infrastructure**: persistence, messaging, external integrations.

---

## 9. Architecture

### 9.1 Layered architecture vs Clean/Hexagonal/Onion <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2391-layered-architecture-vs-cleanhexagonalonion%0A%0ASection%20title%3A%209.1%20Layered%20architecture%20vs%20Clean%2FHexagonal%2FOnion' target='_blank' rel='noopener' data-askgpt='9.1 Layered architecture vs Clean/Hexagonal/Onion' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#91-layered-architecture-vs-cleanhexagonalonion' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2391-layered-architecture-vs-cleanhexagonalonion%0A%0ASection%20title%3A%209.1%20Layered%20architecture%20vs%20Clean%2FHexagonal%2FOnion' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2391-layered-architecture-vs-cleanhexagonalonion%0A%0ASection%20title%3A%209.1%20Layered%20architecture%20vs%20Clean%2FHexagonal%2FOnion' title='Ask ChatGPT about this section'>💬</a>

Traditional **layered architecture** (Presentation → Business → Persistence → Database) is the most common but also the most abused. The failure mode: dependencies flow downward in theory but creep upward in practice, because the persistence layer calls into the business layer for "convenience," and the business layer reaches into the presentation layer for "just one thing."

Clean/Hexagonal/Onion fix this with the Dependency Rule. The compromise: package structure must enforce the rule (using tools like ArchUnit in Java, dependency-cruiser in JavaScript).

### 9.2 Bounded Contexts and microservices <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2392-bounded-contexts-and-microservices%0A%0ASection%20title%3A%209.2%20Bounded%20Contexts%20and%20microservices' target='_blank' rel='noopener' data-askgpt='9.2 Bounded Contexts and microservices' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#92-bounded-contexts-and-microservices' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2392-bounded-contexts-and-microservices%0A%0ASection%20title%3A%209.2%20Bounded%20Contexts%20and%20microservices' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2392-bounded-contexts-and-microservices%0A%0ASection%20title%3A%209.2%20Bounded%20Contexts%20and%20microservices' title='Ask ChatGPT about this section'>💬</a>

Eric Evans's Bounded Context is the boundary within which a domain model is consistent. Above that boundary, the same word may mean different things ("Account" in billing ≠ "Account" in support). Microservices are one realization of Bounded Contexts at the deployment level. The Clean Architecture applies *within* each Bounded Context.

### 9.3 Event-driven architecture <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2393-event-driven-architecture%0A%0ASection%20title%3A%209.3%20Event-driven%20architecture' target='_blank' rel='noopener' data-askgpt='9.3 Event-driven architecture' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#93-event-driven-architecture' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2393-event-driven-architecture%0A%0ASection%20title%3A%209.3%20Event-driven%20architecture' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%2393-event-driven-architecture%0A%0ASection%20title%3A%209.3%20Event-driven%20architecture' title='Ask ChatGPT about this section'>💬</a>

When the use case produces a domain event, that event can be consumed by other contexts. Event-driven architectures enable loose coupling at the system level: the producer doesn't know who consumes. Common patterns: Outbox (transactional event publishing), Saga (long-running business process), CQRS (separating read and write models), Event Sourcing (storing events as the source of truth).

---

## 10. Performance

Patterns affect performance in subtle ways:

- **Flyweight** reduces memory by sharing state. Critical for large object counts (rendering thousands of UI elements, character glyphs in a document editor).
- **Decorator** adds behavior without subclassing; in tight loops, the layer of indirection matters. JIT can usually inline, but in interpreted languages (Python, Ruby) it can cost 20-50%.
- **Observer** scales poorly with thousands of subscribers. Mutating the subscriber list during notification is O(n²) without care.
- **Proxy** with remote invocation (gRPC stub, HTTP client) is orders of magnitude slower than direct method call. Cache aggressively.
- **Repository** adds an abstraction over the data layer; in hot paths the indirection may matter. Profile before optimizing.

The **performance anti-pattern**: applying patterns speculatively because "they might be needed." YAGNI applies to performance too. Measure first.

---

## 11. Security

### 11.1 Security implications of patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23111-security-implications-of-patterns%0A%0ASection%20title%3A%2011.1%20Security%20implications%20of%20patterns' target='_blank' rel='noopener' data-askgpt='11.1 Security implications of patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#111-security-implications-of-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23111-security-implications-of-patterns%0A%0ASection%20title%3A%2011.1%20Security%20implications%20of%20patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23111-security-implications-of-patterns%0A%0ASection%20title%3A%2011.1%20Security%20implications%20of%20patterns' title='Ask ChatGPT about this section'>💬</a>

- **Singleton** holding credentials: a single global point of compromise. Prefer dependency injection with named instances.
- **Observer** with insecure subjects: a compromised publisher can push malicious state. Validate at the subject.
- **Proxy** that fails open: a proxy returning a default-allow response on backend failure is a security bug. Always fail closed.
- **Decorator** that wraps a security check: if the wrapper can be bypassed (e.g., by calling the wrapped object directly), the security boundary is illusory.
- **Repository** preventing SQL injection: the Repository is the natural place to centralize parameter binding. Never construct SQL via string concatenation.

### 11.2 Security implications of SOLID <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23112-security-implications-of-solid%0A%0ASection%20title%3A%2011.2%20Security%20implications%20of%20SOLID' target='_blank' rel='noopener' data-askgpt='11.2 Security implications of SOLID' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#112-security-implications-of-solid' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23112-security-implications-of-solid%0A%0ASection%20title%3A%2011.2%20Security%20implications%20of%20SOLID' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23112-security-implications-of-solid%0A%0ASection%20title%3A%2011.2%20Security%20implications%20of%20SOLID' title='Ask ChatGPT about this section'>💬</a>

- **DIP** enables testing security-critical code with deterministic mocks — invaluable.
- **SRP** means a security review can focus on one concern at a time.
- **OCP** allows extending security policies without modifying existing code (the Open/Closed principle is why security patches can be backported).
- **LSP** violations in security-critical subclasses can be exploited (subclass overrides a permission check).
- **ISP** prevents "fat interfaces" that force classes to implement security methods they don't need.

---

## 12. Production Engineering

### 12.1 Refactoring legacy code <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23121-refactoring-legacy-code%0A%0ASection%20title%3A%2012.1%20Refactoring%20legacy%20code' target='_blank' rel='noopener' data-askgpt='12.1 Refactoring legacy code' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#121-refactoring-legacy-code' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23121-refactoring-legacy-code%0A%0ASection%20title%3A%2012.1%20Refactoring%20legacy%20code' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23121-refactoring-legacy-code%0A%0ASection%20title%3A%2012.1%20Refactoring%20legacy%20code' title='Ask ChatGPT about this section'>💬</a>

Michael Feathers' *Working Effectively with Legacy Code* defines legacy code as "code without tests." The refactoring workflow for legacy systems:

1. **Identify seams** — places where you can intercept behavior without editing the code (parameter passing, virtual methods, callback hooks, polymorphism).
2. **Break dependencies** — at each seam, introduce an interface and inject a fake.
3. **Write characterization tests** — tests that pin down current behavior (right or wrong) before changing it.
4. **Refactor in small steps** — extract methods, move fields, rename — running tests after each step.
5. **Add new tests** — once the code is testable, add behavior tests.

### 12.2 Code review for SOLID violations <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23122-code-review-for-solid-violations%0A%0ASection%20title%3A%2012.2%20Code%20review%20for%20SOLID%20violations' target='_blank' rel='noopener' data-askgpt='12.2 Code review for SOLID violations' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#122-code-review-for-solid-violations' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23122-code-review-for-solid-violations%0A%0ASection%20title%3A%2012.2%20Code%20review%20for%20SOLID%20violations' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23122-code-review-for-solid-violations%0A%0ASection%20title%3A%2012.2%20Code%20review%20for%20SOLID%20violations' title='Ask ChatGPT about this section'>💬</a>

A code review checklist:

- **SRP:** Does each class do one thing? If you say "and," it doesn't.
- **OCP:** To add this feature, how many existing files did you have to modify? More than one is a smell.
- **LSP:** Does the subclass honor the base's contracts? Especially: preconditions, postconditions, invariants.
- **ISP:** Does the implementation stub out any interface methods?
- **DIP:** Does this class `new` up a concrete dependency? Is the dependency injected?

### 12.3 Dependency injection in practice <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23123-dependency-injection-in-practice%0A%0ASection%20title%3A%2012.3%20Dependency%20injection%20in%20practice' target='_blank' rel='noopener' data-askgpt='12.3 Dependency injection in practice' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#123-dependency-injection-in-practice' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23123-dependency-injection-in-practice%0A%0ASection%20title%3A%2012.3%20Dependency%20injection%20in%20practice' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23123-dependency-injection-in-practice%0A%0ASection%20title%3A%2012.3%20Dependency%20injection%20in%20practice' title='Ask ChatGPT about this section'>💬</a>

Three styles:

| Style | Container | Pros | Cons |
|-------|-----------|------|------|
| **Constructor injection** | Manual or DI container (Spring, Guice, Dagger) | Explicit, testable, immutable | Verbose for many dependencies |
| **Field/Setter injection** | DI container | Convenient | Hides dependencies, harder to test |
| **Service Locator** | Static registry | Easy to add new dependencies | Hides dependencies, runtime errors |

Production default: **constructor injection**. Reserve service locator for legacy integration where you can't change constructors.

### 12.4 Applying patterns in a microservices world <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23124-applying-patterns-in-a-microservices-world%0A%0ASection%20title%3A%2012.4%20Applying%20patterns%20in%20a%20microservices%20world' target='_blank' rel='noopener' data-askgpt='12.4 Applying patterns in a microservices world' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#124-applying-patterns-in-a-microservices-world' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23124-applying-patterns-in-a-microservices-world%0A%0ASection%20title%3A%2012.4%20Applying%20patterns%20in%20a%20microservices%20world' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23124-applying-patterns-in-a-microservices-world%0A%0ASection%20title%3A%2012.4%20Applying%20patterns%20in%20a%20microservices%20world' title='Ask ChatGPT about this section'>💬</a>

| Pattern | Where it applies |
|---------|----------------|
| **Service Layer** | Becomes the API layer of a microservice |
| **Repository** | Becomes the data access layer; one Repository per aggregate |
| **Unit of Work** | Replaced by database transaction or saga |
| **Saga** | Distributed transaction replacement |
| **Circuit Breaker** | Wraps external service calls |
| **Bulkhead** | Isolates thread pools per external service |
| **Outbox** | Transactional event publishing |
| **CQRS** | Separate read and write stores |
| **Event Sourcing** | Source of truth is events, not state |
| **Strangler Fig** | Incremental migration from monolith |

---

## 13. Production Case Studies

### 13.1 Amazon: API mandate <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23131-amazon-api-mandate%0A%0ASection%20title%3A%2013.1%20Amazon%3A%20API%20mandate' target='_blank' rel='noopener' data-askgpt='13.1 Amazon: API mandate' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#131-amazon-api-mandate' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23131-amazon-api-mandate%0A%0ASection%20title%3A%2013.1%20Amazon%3A%20API%20mandate' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23131-amazon-api-mandate%0A%0ASection%20title%3A%2013.1%20Amazon%3A%20API%20mandate' title='Ask ChatGPT about this section'>💬</a>

In 2002, Bezos circulated the API mandate: "All teams will henceforth expose their data and functionality through service interfaces." Teams that didn't comply would be fired. The mandate enforced DIP at the company level: any team's functionality was accessible only through an interface, never through direct calls. The result: independent deployability, parallel team velocity, and the architecture that supported the AWS era.

### 13.2 Netflix: Chaos and resilience patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23132-netflix-chaos-and-resilience-patterns%0A%0ASection%20title%3A%2013.2%20Netflix%3A%20Chaos%20and%20resilience%20patterns' target='_blank' rel='noopener' data-askgpt='13.2 Netflix: Chaos and resilience patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#132-netflix-chaos-and-resilience-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23132-netflix-chaos-and-resilience-patterns%0A%0ASection%20title%3A%2013.2%20Netflix%3A%20Chaos%20and%20resilience%20patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23132-netflix-chaos-and-resilience-patterns%0A%0ASection%20title%3A%2013.2%20Netflix%3A%20Chaos%20and%20resilience%20patterns' title='Ask ChatGPT about this section'>💬</a>

Netflix's migration to AWS (2008–2010) drove the development of the **circuit breaker** pattern (Hystrix, 2012), **bulkhead** isolation, and chaos engineering (Chaos Monkey, 2011). The patterns operate at the integration level: when one downstream service is unhealthy, the calling service fails fast, isolates its impact via a separate thread pool, and degrades gracefully.

### 13.3 Shopify: Modular monolith <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23133-shopify-modular-monolith%0A%0ASection%20title%3A%2013.3%20Shopify%3A%20Modular%20monolith' target='_blank' rel='noopener' data-askgpt='13.3 Shopify: Modular monolith' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#133-shopify-modular-monolith' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23133-shopify-modular-monolith%0A%0ASection%20title%3A%2013.3%20Shopify%3A%20Modular%20monolith' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23133-shopify-modular-monolith%0A%0ASection%20title%3A%2013.3%20Shopify%3A%20Modular%20monolith' title='Ask ChatGPT about this section'>💬</a>

Shopify runs a modular monolith with explicit module boundaries enforced by a "polaris" gem that uses Ruby's module system to declare each module's allowed dependencies. Violations are CI failures. The approach is Clean Architecture applied to a Rails app: the application has internal modules with enforced dependency direction.

### 13.4 Basecamp: DHH's "vanilla Rails" anti-case <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23134-basecamp-dhhs-vanilla-rails-anti-case%0A%0ASection%20title%3A%2013.4%20Basecamp%3A%20DHH's%20%22vanilla%20Rails%22%20anti-case' target='_blank' rel='noopener' data-askgpt='13.4 Basecamp: DHH&#39;s "vanilla Rails" anti-case' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#134-basecamp-dhhs-vanilla-rails-anti-case' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23134-basecamp-dhhs-vanilla-rails-anti-case%0A%0ASection%20title%3A%2013.4%20Basecamp%3A%20DHH's%20%22vanilla%20Rails%22%20anti-case' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23134-basecamp-dhhs-vanilla-rails-anti-case%0A%0ASection%20title%3A%2013.4%20Basecamp%3A%20DHH's%20%22vanilla%20Rails%22%20anti-case' title='Ask ChatGPT about this section'>💬</a>

DHH (Rails creator) famously argued against microservices and complex architecture, favoring "vanilla Rails" with Active Record. This is a legitimate choice for small teams and CRUD-heavy applications. The anti-pattern is applying this style to a complex domain with many aggregate boundaries — the monolith becomes a ball of mud.

---

## 14. Code Examples

The complete code for this chapter lives in `examples/`. Each example directory contains a single Java (or other-language) file demonstrating one pattern or principle in production form.

| # | Example | Pattern / Principle |
|---|---------|---------------------|
| 01 | `solid-principles` | All five SOLID principles in one domain |
| 02 | `design-patterns-gof` | Strategy, Observer, Decorator, Factory |
| 03 | `enterprise-patterns` | Repository, Unit of Work, Service Layer |
| 04 | `repository-pattern` | Repository with in-memory and JDBC variants |
| 05 | `microservices-patterns` | API Gateway, Service Registry, Circuit Breaker, Bulkhead |
| 06 | `event-driven-architecture` | Domain events, event publisher, async handlers |
| 07 | `cqrs-event-sourcing` | Command/Query separation, event store |
| 08 | `saga-pattern` | Orchestration-based saga for distributed transaction |
| 09 | `outbox-pattern` | Transactional outbox for reliable event publishing |
| 10 | `circuit-breaker` | Resilience4j-style circuit breaker |
| 11 | `bulkhead` | Thread-pool isolation |
| 12 | `strangler-fig` | Incremental migration from monolith to new service |
| 13 | `clean-architecture` | Layered architecture with dependency rule |
| 14 | `hexagonal` | Ports and adapters |

---

## 15. Common Mistakes

### 15.1 SOLID misapplications <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23151-solid-misapplications%0A%0ASection%20title%3A%2015.1%20SOLID%20misapplications' target='_blank' rel='noopener' data-askgpt='15.1 SOLID misapplications' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#151-solid-misapplications' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23151-solid-misapplications%0A%0ASection%20title%3A%2015.1%20SOLID%20misapplications' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23151-solid-misapplications%0A%0ASection%20title%3A%2015.1%20SOLID%20misapplications' title='Ask ChatGPT about this section'>💬</a>

| Mistake | Why it's wrong |
|---------|---------------|
| **SRP as "do one thing"** without "one reason to change" | SRP is about *actors*, not operations. A class doing three operations can still have SRP if one actor drives all changes. |
| **OCP via deep inheritance** | Inheritance is the heaviest OCP mechanism. Prefer composition (Strategy, Decorator) for most cases. |
| **LSP violations "harmonized"** with covariant returns | Compensating for a violated contract by adding casts or checks is still a violation. |
| **ISP by splitting every interface** | Sometimes a fat interface is the right abstraction. ISP says "don't force clients to depend on what they don't use" — not "minimize interface size." |
| **DIP as DI alone** | Dependency injection is the *mechanism*; abstraction is the *principle*. You can use DI and still violate DIP by depending on concrete classes that happen to be injected. |

### 15.2 Pattern misapplications <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23152-pattern-misapplications%0A%0ASection%20title%3A%2015.2%20Pattern%20misapplications' target='_blank' rel='noopener' data-askgpt='15.2 Pattern misapplications' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#152-pattern-misapplications' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23152-pattern-misapplications%0A%0ASection%20title%3A%2015.2%20Pattern%20misapplications' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23152-pattern-misapplications%0A%0ASection%20title%3A%2015.2%20Pattern%20misapplications' title='Ask ChatGPT about this section'>💬</a>

| Mistake | Why it's wrong |
|---------|---------------|
| **Singleton for everything** | "There should be only one" is rarely true at the application level. Most singletons should be dependencies injected with a defined lifecycle. |
| **Factory Method without polymorphism** | A factory that produces a single concrete type is overhead with no benefit. |
| **Observer for synchronous communication** | Observer is for one-to-many notification. For direct service calls, just call. |
| **Strategy for two strategies** | A strategy with one implementation is YAGNI. Add the abstraction when the second strategy appears. |
| **Decorator at three levels** | Three layers of decoration is hard to follow. Prefer composition over decoration chains. |
| **Adapter when both sides are yours** | Adapter is for adapting a third-party interface you don't control. If you control both, change one. |

### 15.3 Refactoring mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23153-refactoring-mistakes%0A%0ASection%20title%3A%2015.3%20Refactoring%20mistakes' target='_blank' rel='noopener' data-askgpt='15.3 Refactoring mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#153-refactoring-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23153-refactoring-mistakes%0A%0ASection%20title%3A%2015.3%20Refactoring%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23153-refactoring-mistakes%0A%0ASection%20title%3A%2015.3%20Refactoring%20mistakes' title='Ask ChatGPT about this section'>💬</a>

| Mistake | Why it's wrong |
|---------|---------------|
| **Refactoring without tests** | Without tests, you cannot verify "no behavior change." You're flying blind. |
| **Refactoring + feature in one commit** | When tests fail, you can't tell which change broke things. Two commits: refactor, then feature. |
| **Big-bang refactor** | "Rewrite it from scratch" rarely works. Refactor incrementally, keeping the system working at every step. |
| **Premature abstraction** | Extract Method after the third duplication. The Rule of Three. |
| **Refactoring performance hot path without measuring** | Some patterns add indirection that matters. Measure before optimizing. |

---

## 16. Debugging

### 16.1 Symptom → root cause <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23161-symptom-root-cause%0A%0ASection%20title%3A%2016.1%20Symptom%20%E2%86%92%20root%20cause' target='_blank' rel='noopener' data-askgpt='16.1 Symptom → root cause' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#161-symptom-root-cause' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23161-symptom-root-cause%0A%0ASection%20title%3A%2016.1%20Symptom%20%E2%86%92%20root%20cause' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23161-symptom-root-cause%0A%0ASection%20title%3A%2016.1%20Symptom%20%E2%86%92%20root%20cause' title='Ask ChatGPT about this section'>💬</a>

Patterns interact in subtle ways. Common failure modes:

| Symptom | Likely cause |
|---------|-------------|
| **NullPointerException** when using Dependency Injection | Missing binding; or the binding is provided but a dependent isn't |
| **StackOverflowError** in Observer notification | Observer chain with cycles; missing termination condition |
| **Race condition** in Singleton initialization | Double-checked locking with non-volatile field; use class-level lazy holder |
| **Memory leak** with Decorator chains | Decorators retain references; clean up explicitly |
| **Wrong strategy used at runtime** | DI container ambiguity; multiple bindings for the same interface |
| **Tests pass in isolation but fail together** | Shared mutable state (Singleton) leaking between tests |

### 16.2 Tools <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23162-tools%0A%0ASection%20title%3A%2016.2%20Tools' target='_blank' rel='noopener' data-askgpt='16.2 Tools' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#162-tools' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23162-tools%0A%0ASection%20title%3A%2016.2%20Tools' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23162-tools%0A%0ASection%20title%3A%2016.2%20Tools' title='Ask ChatGPT about this section'>💬</a>

- **IDE refactoring features** (IntelliJ, VSCode): mechanical refactorings like Rename, Extract Method, Move Class are safer than hand edits.
- **jscodeshift** (JavaScript), **clang-tidy** (C++), **ErrorProne** (Java): automated refactoring at scale.
- **ArchUnit** (Java): enforce architectural rules (e.g., "controllers cannot depend on repositories directly").
- **PIT** (Java), **Stryker** (JavaScript): mutation testing to verify your tests catch refactoring-introduced regressions.

---

## 17. Monitoring & Observability

Patterns and observability intersect in three ways:

1. **DI containers** emit metrics: bean creation time, dependency graph depth, scope activations.
2. **Circuit breakers** emit state transitions (CLOSED → OPEN → HALF_OPEN): the primary observability signal for resilience.
3. **Outbox** monitors lag between committed events and published events: lag is the operational health metric.

Recommended metrics:

- `dependency_injection.bindings_total{interface, implementation}` — count of resolved dependencies.
- `circuit_breaker.state{breaker, service}` — gauge with states CLOSED/OPEN/HALF_OPEN.
- `outbox.lag_seconds{topic}` — gauge of event publish delay.
- `repository.query_duration_seconds{repository, operation}` — histogram of repository calls.

---

## 18. Best Practices

### 18.1 Naming conventions for patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23181-naming-conventions-for-patterns%0A%0ASection%20title%3A%2018.1%20Naming%20conventions%20for%20patterns' target='_blank' rel='noopener' data-askgpt='18.1 Naming conventions for patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#181-naming-conventions-for-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23181-naming-conventions-for-patterns%0A%0ASection%20title%3A%2018.1%20Naming%20conventions%20for%20patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23181-naming-conventions-for-patterns%0A%0ASection%20title%3A%2018.1%20Naming%20conventions%20for%20patterns' title='Ask ChatGPT about this section'>💬</a>

The pattern names should appear in the code:

- A `Repository<Order>` is named `OrderRepository`.
- A `Strategy` for pricing is named `PricingStrategy`.
- A `Decorator` for compression is named `CompressingInputStream`.

This makes the code self-documenting. New engineers can see "this is a Strategy" without reading documentation.

### 18.2 Composition roots <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23182-composition-roots%0A%0ASection%20title%3A%2018.2%20Composition%20roots' target='_blank' rel='noopener' data-askgpt='18.2 Composition roots' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#182-composition-roots' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23182-composition-roots%0A%0ASection%20title%3A%2018.2%20Composition%20roots' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23182-composition-roots%0A%0ASection%20title%3A%2018.2%20Composition%20roots' title='Ask ChatGPT about this section'>💬</a>

A composition root is the place where the application wires its dependencies. In a typical Java app: `main()`. In Spring: `@Configuration` classes. In a function-as-a-service: the handler factory.

**Best practice: one composition root per application.** Scattered `new` calls in business code are a smell.

### 18.3 Package by feature, not by layer <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23183-package-by-feature-not-by-layer%0A%0ASection%20title%3A%2018.3%20Package%20by%20feature%2C%20not%20by%20layer' target='_blank' rel='noopener' data-askgpt='18.3 Package by feature, not by layer' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#183-package-by-feature-not-by-layer' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23183-package-by-feature-not-by-layer%0A%0ASection%20title%3A%2018.3%20Package%20by%20feature%2C%20not%20by%20layer' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23183-package-by-feature-not-by-layer%0A%0ASection%20title%3A%2018.3%20Package%20by%20feature%2C%20not%20by%20layer' title='Ask ChatGPT about this section'>💬</a>

The traditional "package by layer" structure (`controllers/`, `services/`, `repositories/`) couples unrelated features together. Package by feature (`order/`, `customer/`, `payment/`) groups all classes for one feature, enabling clean module boundaries.

### 18.4 When NOT to apply a pattern <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23184-when-not-to-apply-a-pattern%0A%0ASection%20title%3A%2018.4%20When%20NOT%20to%20apply%20a%20pattern' target='_blank' rel='noopener' data-askgpt='18.4 When NOT to apply a pattern' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#184-when-not-to-apply-a-pattern' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23184-when-not-to-apply-a-pattern%0A%0ASection%20title%3A%2018.4%20When%20NOT%20to%20apply%20a%20pattern' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23184-when-not-to-apply-a-pattern%0A%0ASection%20title%3A%2018.4%20When%20NOT%20to%20apply%20a%20pattern' title='Ask ChatGPT about this section'>💬</a>

- **Don't apply a pattern until you have the second instance.** Rule of Three for abstractions.
- **Don't apply Singleton for stateless services** — use a single bean in the DI container.
- **Don't apply Observer for synchronous flows** — direct method calls are clearer.
- **Don't apply Decorator for orthogonal concerns** — AOP (aspect-oriented programming) is sometimes better.
- **Don't apply Repository over Active Record** if Active Record already exists and fits.

### 18.5 Pattern languages <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23185-pattern-languages%0A%0ASection%20title%3A%2018.5%20Pattern%20languages' target='_blank' rel='noopener' data-askgpt='18.5 Pattern languages' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#185-pattern-languages' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23185-pattern-languages%0A%0ASection%20title%3A%2018.5%20Pattern%20languages' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23185-pattern-languages%0A%0ASection%20title%3A%2018.5%20Pattern%20languages' title='Ask ChatGPT about this section'>💬</a>

A "pattern language" (Christopher Alexander, 1977; applied to software by GoF) is a collection of patterns that work together. Don't apply patterns in isolation — they form systems.

Examples of pattern languages:

- **Web presentation:** MVC, MVP, MVVM.
- **Persistence:** Repository, Unit of Work, Identity Map, Lazy Loading.
- **Distribution:** Service Layer, Saga, Outbox, CQRS, Event Sourcing.
- **Resilience:** Circuit Breaker, Bulkhead, Retry, Timeout.

---

## 19. Anti-Patterns

### 19.1 Architecture anti-patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23191-architecture-anti-patterns%0A%0ASection%20title%3A%2019.1%20Architecture%20anti-patterns' target='_blank' rel='noopener' data-askgpt='19.1 Architecture anti-patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#191-architecture-anti-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23191-architecture-anti-patterns%0A%0ASection%20title%3A%2019.1%20Architecture%20anti-patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23191-architecture-anti-patterns%0A%0ASection%20title%3A%2019.1%20Architecture%20anti-patterns' title='Ask ChatGPT about this section'>💬</a>

| Anti-pattern | Description | Cure |
|--------------|-------------|------|
| **Big Ball of Mud** | No discernible architecture | Establish module boundaries; enforce dependency rules |
| **Lasagna Code** | Too many layers, each thin | Consolidate layers; remove indirection |
| **Spaghetti Code** | Tangled control flow, no structure | Apply SOLID and patterns; refactor incrementally |
| **Stovepipe** | Each subsystem built in isolation, no shared abstractions | Identify shared kernels; introduce common patterns |
| **Vendor Lock-in by Architecture** | Architecture assumes a specific framework | Apply Dependency Inversion; framework as detail |
| **Distributed Monolith** | Microservices with shared database and tight coupling | Apply Bounded Contexts; one service owns its data |

### 19.2 Design anti-patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23192-design-anti-patterns%0A%0ASection%20title%3A%2019.2%20Design%20anti-patterns' target='_blank' rel='noopener' data-askgpt='19.2 Design anti-patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#192-design-anti-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23192-design-anti-patterns%0A%0ASection%20title%3A%2019.2%20Design%20anti-patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23192-design-anti-patterns%0A%0ASection%20title%3A%2019.2%20Design%20anti-patterns' title='Ask ChatGPT about this section'>💬</a>

| Anti-pattern | Description |
|--------------|-------------|
| **God Object** | One class knows everything and does everything |
| **Object Orgy** | Many objects with no clear responsibilities |
| **Poltergeist** | Classes that exist only to invoke one method on another class |
| **Sequential Coupling** | Method A must be called before Method B (state machine in disguise) |
| **Yo-Yo Problem** | Class hierarchy so deep you scroll up and down to understand |

### 19.3 Anti-patterns named by Fowler <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23193-anti-patterns-named-by-fowler%0A%0ASection%20title%3A%2019.3%20Anti-patterns%20named%20by%20Fowler' target='_blank' rel='noopener' data-askgpt='19.3 Anti-patterns named by Fowler' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#193-anti-patterns-named-by-fowler' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23193-anti-patterns-named-by-fowler%0A%0ASection%20title%3A%2019.3%20Anti-patterns%20named%20by%20Fowler' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23193-anti-patterns-named-by-fowler%0A%0ASection%20title%3A%2019.3%20Anti-patterns%20named%20by%20Fowler' title='Ask ChatGPT about this section'>💬</a>

| Anti-pattern | Description |
|--------------|-------------|
| **Anemic Domain Model** | Domain objects are pure data; behavior lives in services |
| **Transaction Script** | Each use case is a single procedure that hits the DB directly |
| **Table Module** | A single class that handles the business logic for all rows of a table |
| **Service Locator** (used wrongly) | Hidden dependencies through a static registry |

---

## 20. Edge Cases

### 20.1 SRP and tightly-coupled subdomains <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23201-srp-and-tightly-coupled-subdomains%0A%0ASection%20title%3A%2020.1%20SRP%20and%20tightly-coupled%20subdomains' target='_blank' rel='noopener' data-askgpt='20.1 SRP and tightly-coupled subdomains' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#201-srp-and-tightly-coupled-subdomains' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23201-srp-and-tightly-coupled-subdomains%0A%0ASection%20title%3A%2020.1%20SRP%20and%20tightly-coupled%20subdomains' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23201-srp-and-tightly-coupled-subdomains%0A%0ASection%20title%3A%2020.1%20SRP%20and%20tightly-coupled%20subdomains' title='Ask ChatGPT about this section'>💬</a>

In a tightly-coupled subdomain (e.g., financial calculations in trading), separating responsibilities into multiple classes can fragment understanding. Some classes are better off cohesive, even if they "do two things" by the strict SRP reading. The fix: use Actor-based reasoning. If both responsibilities change for the same actor, they can be in the same class.

### 20.2 LSP and design-by-contract <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23202-lsp-and-design-by-contract%0A%0ASection%20title%3A%2020.2%20LSP%20and%20design-by-contract' target='_blank' rel='noopener' data-askgpt='20.2 LSP and design-by-contract' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#202-lsp-and-design-by-contract' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23202-lsp-and-design-by-contract%0A%0ASection%20title%3A%2020.2%20LSP%20and%20design-by-contract' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23202-lsp-and-design-by-contract%0A%0ASection%20title%3A%2020.2%20LSP%20and%20design-by-contract' title='Ask ChatGPT about this section'>💬</a>

Barbara Liskov's original formulation assumes formal contracts (preconditions, postconditions, invariants). Most languages don't enforce them. The practical LSP test: write tests for the base class, run them against subclasses; if they fail, LSP is violated.

### 20.3 DIP and frameworks <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23203-dip-and-frameworks%0A%0ASection%20title%3A%2020.3%20DIP%20and%20frameworks' target='_blank' rel='noopener' data-askgpt='20.3 DIP and frameworks' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#203-dip-and-frameworks' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23203-dip-and-frameworks%0A%0ASection%20title%3A%2020.3%20DIP%20and%20frameworks' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23203-dip-and-frameworks%0A%0ASection%20title%3A%2020.3%20DIP%20and%20frameworks' title='Ask ChatGPT about this section'>💬</a>

Frameworks (Spring, Django, Rails) often pull concrete dependencies into the high-level code via inheritance (controllers extend framework classes). The cure: framework as a library, not a parent class. Or: isolate framework-specific code in the outermost layer (Frameworks & Drivers in Clean).

### 20.4 Repository and aggregate boundaries <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23204-repository-and-aggregate-boundaries%0A%0ASection%20title%3A%2020.4%20Repository%20and%20aggregate%20boundaries' target='_blank' rel='noopener' data-askgpt='20.4 Repository and aggregate boundaries' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#204-repository-and-aggregate-boundaries' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23204-repository-and-aggregate-boundaries%0A%0ASection%20title%3A%2020.4%20Repository%20and%20aggregate%20boundaries' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23204-repository-and-aggregate-boundaries%0A%0ASection%20title%3A%2020.4%20Repository%20and%20aggregate%20boundaries' title='Ask ChatGPT about this section'>💬</a>

A Repository should be per Aggregate (DDD), not per Entity. The aggregate is the unit of consistency; its Repository should provide find/save for the whole aggregate. Trying to update child entities independently violates aggregate boundaries and creates consistency bugs.

### 20.5 Saga compensation and eventual consistency <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23205-saga-compensation-and-eventual-consistency%0A%0ASection%20title%3A%2020.5%20Saga%20compensation%20and%20eventual%20consistency' target='_blank' rel='noopener' data-askgpt='20.5 Saga compensation and eventual consistency' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#205-saga-compensation-and-eventual-consistency' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23205-saga-compensation-and-eventual-consistency%0A%0ASection%20title%3A%2020.5%20Saga%20compensation%20and%20eventual%20consistency' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23205-saga-compensation-and-eventual-consistency%0A%0ASection%20title%3A%2020.5%20Saga%20compensation%20and%20eventual%20consistency' title='Ask ChatGPT about this section'>💬</a>

A saga's compensating actions may themselves fail. Production sagas must be idempotent, retry-safe, and observable. The Saga log (event-sourced) is the operational source of truth.

### 20.6 Circuit breaker timing <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23206-circuit-breaker-timing%0A%0ASection%20title%3A%2020.6%20Circuit%20breaker%20timing' target='_blank' rel='noopener' data-askgpt='20.6 Circuit breaker timing' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#206-circuit-breaker-timing' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23206-circuit-breaker-timing%0A%0ASection%20title%3A%2020.6%20Circuit%20breaker%20timing' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23206-circuit-breaker-timing%0A%0ASection%20title%3A%2020.6%20Circuit%20breaker%20timing' title='Ask ChatGPT about this section'>💬</a>

A circuit breaker that opens too aggressively causes cascading failures. A circuit breaker that opens too slowly allows every caller to time out. The parameters (failure threshold, sleep window, half-open trial count) require empirical tuning.

---

## 21. Comparisons

### 21.1 SOLID principles vs GRASP <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23211-solid-principles-vs-grasp%0A%0ASection%20title%3A%2021.1%20SOLID%20principles%20vs%20GRASP' target='_blank' rel='noopener' data-askgpt='21.1 SOLID principles vs GRASP' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#211-solid-principles-vs-grasp' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23211-solid-principles-vs-grasp%0A%0ASection%20title%3A%2021.1%20SOLID%20principles%20vs%20GRASP' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23211-solid-principles-vs-grasp%0A%0ASection%20title%3A%2021.1%20SOLID%20principles%20vs%20GRASP' title='Ask ChatGPT about this section'>💬</a>

**GRASP** (General Responsibility Assignment Software Patterns, Craig Larman, 1997) is a related set of patterns:

| GRASP pattern | Equivalent |
|---------------|------------|
| **Information Expert** | Tell, Don't Ask; SRP |
| **Creator** | Factory Method |
| **Controller** | Façade |
| **Low Coupling** | DIP, ISP |
| **High Cohesion** | SRP |
| **Polymorphism** | OCP, Strategy, State |
| **Pure Fabrication** | SRP (extract service) |
| **Indirection** | Adapter, Facade, Proxy |
| **Protected Variations** | OCP, DIP |

### 21.2 Architectural styles <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23212-architectural-styles%0A%0ASection%20title%3A%2021.2%20Architectural%20styles' target='_blank' rel='noopener' data-askgpt='21.2 Architectural styles' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#212-architectural-styles' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23212-architectural-styles%0A%0ASection%20title%3A%2021.2%20Architectural%20styles' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23212-architectural-styles%0A%0ASection%20title%3A%2021.2%20Architectural%20styles' title='Ask ChatGPT about this section'>💬</a>

| Architecture | Focus | Layers | Dependency rule |
|--------------|-------|--------|-----------------|
| **Clean Architecture** | Dependency rule | Entities, Use Cases, Interface Adapters, Frameworks | Inward |
| **Hexagonal (Ports & Adapters)** | Application core isolation | Application, Ports, Adapters | Inward |
| **Onion** | Domain-centric | Domain Model, Domain Services, Application Services, Infrastructure | Inward |
| **Layered (traditional)** | Technical layers | UI, Business, Persistence, DB | Often violated |
| **Microservices** | Independent deployability | Service per Bounded Context | Each service applies inward rule |

### 21.3 Persistence patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23213-persistence-patterns%0A%0ASection%20title%3A%2021.3%20Persistence%20patterns' target='_blank' rel='noopener' data-askgpt='21.3 Persistence patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#213-persistence-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23213-persistence-patterns%0A%0ASection%20title%3A%2021.3%20Persistence%20patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23213-persistence-patterns%0A%0ASection%20title%3A%2021.3%20Persistence%20patterns' title='Ask ChatGPT about this section'>💬</a>

| Pattern | When to use |
|---------|-------------|
| **Active Record** | Simple CRUD apps, Rails-style |
| **Data Mapper** | Complex domains with rich behavior |
| **Repository** | When domain logic shouldn't know about persistence |
| **DAO (Data Access Object)** | Lower-level; tightly coupled to DB |
| **Query Object** | Dynamic queries built programmatically |

### 21.4 Distribution patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23214-distribution-patterns%0A%0ASection%20title%3A%2021.4%20Distribution%20patterns' target='_blank' rel='noopener' data-askgpt='21.4 Distribution patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#214-distribution-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23214-distribution-patterns%0A%0ASection%20title%3A%2021.4%20Distribution%20patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23214-distribution-patterns%0A%0ASection%20title%3A%2021.4%20Distribution%20patterns' title='Ask ChatGPT about this section'>💬</a>

| Pattern | Solves |
|---------|--------|
| **API Gateway** | Single entry point for many services |
| **Service Registry / Discovery** | Service location |
| **Circuit Breaker** | Cascading failure prevention |
| **Bulkhead** | Resource isolation |
| **Saga** | Distributed transaction |
| **Outbox** | Reliable event publishing |
| **CQRS** | Read/write optimization |
| **Event Sourcing** | Audit + temporal queries |
| **Service Mesh** | Cross-cutting concerns offloaded |
| **Strangler Fig** | Incremental migration |

---

## 22. Interview Preparation

### 22.1 Core questions <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23221-core-questions%0A%0ASection%20title%3A%2022.1%20Core%20questions' target='_blank' rel='noopener' data-askgpt='22.1 Core questions' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#221-core-questions' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23221-core-questions%0A%0ASection%20title%3A%2022.1%20Core%20questions' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23221-core-questions%0A%0ASection%20title%3A%2022.1%20Core%20questions' title='Ask ChatGPT about this section'>💬</a>

**Q1. What are the SOLID principles?**

Five object-oriented design principles by Robert C. Martin: Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes substitutable), Interface Segregation (many small interfaces), Dependency Inversion (depend on abstractions).

**Q2. When would you violate SOLID?**

When the cost of the abstraction exceeds the benefit. Concrete examples:

- **SRP:** a tiny class that's only ever used in one place; splitting it adds navigation overhead.
- **OCP:** an internal implementation that's never extended; the abstraction is overhead.
- **LSP:** design-by-contract is rarely enforced, and informal LSP "violations" are often pragmatic.
- **ISP:** a generic utility class used in many contexts.
- **DIP:** a one-shot script or a proof-of-concept.

**Q3. Singleton vs static class?**

Singleton is an instance of an object; can implement interfaces, can be passed as a parameter, can be subclassed, can have a lifecycle. Static class is just a namespace. Singleton is the right choice when you need object-like behavior; static class is fine for pure utility functions.

**Q4. Strategy vs State?**

Both encapsulate behavior in separate classes. State has transitions; the context changes state explicitly. Strategy is selected by the client (or by configuration); it doesn't change. The two are often interchangeable in code; the difference is intent.

**Q5. How do you refactor legacy code?**

Michael Feathers' workflow: (1) identify seams (places to inject test fakes), (2) break dependencies by introducing interfaces at seams, (3) write characterization tests that pin down current behavior, (4) refactor in small steps running tests after each, (5) add behavior tests once testable.

**Q6. Active Record vs Data Mapper?**

Active Record: object wraps a row, knows how to persist itself. Data Mapper: separate layer maps objects to DB, objects don't know they're persisted. Active Record is simpler; Data Mapper is more decoupled. For complex domains with rich behavior, Data Mapper. For CRUD apps, Active Record.

**Q7. What's the difference between Repository and DAO?**

A DAO is a low-level data access abstraction, often 1:1 with a table. A Repository is a higher-level abstraction, often 1:1 with an aggregate. Repositories speak in domain terms; DAOs speak in DB terms.

**Q8. Why is the Dependency Rule important in Clean Architecture?**

It enables the business logic to be independent of frameworks, databases, and UIs. The inner circles know nothing about the outer; the outer depends on the inner via interfaces (DIP). The result: the business logic is testable without infrastructure, swappable across frameworks, and durable across technology changes.

### 22.2 System design questions <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23222-system-design-questions%0A%0ASection%20title%3A%2022.2%20System%20design%20questions' target='_blank' rel='noopener' data-askgpt='22.2 System design questions' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#222-system-design-questions' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23222-system-design-questions%0A%0ASection%20title%3A%2022.2%20System%20design%20questions' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23222-system-design-questions%0A%0ASection%20title%3A%2022.2%20System%20design%20questions' title='Ask ChatGPT about this section'>💬</a>

**Q9. How would you decompose a monolith into microservices?**

- Identify Bounded Contexts (DDD); each becomes a candidate service.
- Extract seams: identify shared data and shared code.
- Use the Strangler Fig pattern: route 1% of traffic to the new service, validate, increase.
- For shared data: split the database (each service owns its data); use events for cross-service consistency.
- For shared code: extract to a shared library or, better, duplicate and let services diverge.

**Q10. How do you handle distributed transactions?**

There are no distributed transactions. The options:

- **Two-phase commit (XA):** expensive, brittle, scales poorly. Avoid.
- **Saga:** a sequence of local transactions with compensating actions. Eventual consistency.
- **Outbox + event-driven:** each service publishes events transactionally; consumers process idempotently.
- **Single-writer / single-database:** avoid the problem by keeping the data in one place.

**Q11. How do you ensure reliability of event publishing?**

The Outbox pattern. The business transaction writes both the state change and an outbox row in the same database transaction. A separate process polls the outbox and publishes to the message broker. Idempotency on the consumer side handles duplicates.

### 22.3 Behavioral questions <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23223-behavioral-questions%0A%0ASection%20title%3A%2022.3%20Behavioral%20questions' target='_blank' rel='noopener' data-askgpt='22.3 Behavioral questions' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#223-behavioral-questions' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23223-behavioral-questions%0A%0ASection%20title%3A%2022.3%20Behavioral%20questions' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23223-behavioral-questions%0A%0ASection%20title%3A%2022.3%20Behavioral%20questions' title='Ask ChatGPT about this section'>💬</a>

**Q12. Tell me about a time you had to refactor a system.**

Structure: situation, the smell you noticed, the pattern you applied (or didn't), the risk you managed, the outcome, what you'd do differently.

**Q13. How do you balance YAGNI against future flexibility?**

YAGNI is a heuristic, not a law. When the cost of adding an abstraction later is much higher than the cost of adding it now, do it now. When the cost is roughly equal, defer. The Rule of Three: extract abstraction at the third occurrence.

---

## 23. References

### 23.1 Foundational books <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23231-foundational-books%0A%0ASection%20title%3A%2023.1%20Foundational%20books' target='_blank' rel='noopener' data-askgpt='23.1 Foundational books' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#231-foundational-books' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23231-foundational-books%0A%0ASection%20title%3A%2023.1%20Foundational%20books' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23231-foundational-books%0A%0ASection%20title%3A%2023.1%20Foundational%20books' title='Ask ChatGPT about this section'>💬</a>

- *Design Patterns: Elements of Reusable Object-Oriented Software* — Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides (Gang of Four). Addison-Wesley, 1994. ISBN 0-201-63361-2.
- *Refactoring: Improving the Design of Existing Code* — Martin Fowler (1st ed. 1999, 2nd ed. 2018 with Kent Beck). Addison-Wesley.
- *Patterns of Enterprise Application Architecture* — Martin Fowler. Addison-Wesley, 2002. ISBN 0-321-12742-4.
- *Domain-Driven Design: Tackling Complexity in the Heart of Software* — Eric Evans. Addison-Wesley, 2003. ISBN 0-321-12521-9.
- *Clean Code: A Handbook of Agile Software Craftsmanship* — Robert C. Martin. Prentice Hall, 2008. ISBN 0-13-235088-2.
- *Clean Architecture: A Craftsman's Guide to Software Structure and Design* — Robert C. Martin. Prentice Hall, 2017. ISBN 0-13-449416-4.
- *Agile Software Development: Principles, Patterns, and Practices* — Robert C. Martin. Prentice Hall, 2003. ISBN 0-13-597444-5.
- *Working Effectively with Legacy Code* — Michael Feathers. Prentice Hall, 2004. ISBN 0-13-117705-2.

### 23.2 Online references <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23232-online-references%0A%0ASection%20title%3A%2023.2%20Online%20references' target='_blank' rel='noopener' data-askgpt='23.2 Online references' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#232-online-references' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23232-online-references%0A%0ASection%20title%3A%2023.2%20Online%20references' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23232-online-references%0A%0ASection%20title%3A%2023.2%20Online%20references' title='Ask ChatGPT about this section'>💬</a>

- **Refactoring.Guru:** <https://refactoring.guru/design-patterns>
- **SourceMaking:** <https://sourcemaking.com/design_patterns>
- **Martin Fowler's site:** <https://martinfowler.com/>
- **Robert C. Martin's blog:** <https://blog.cleancoder.com/>
- **The Clean Architecture (blog post):** <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
- **Hexagonal Architecture (Alistair Cockburn):** <https://alistair.cockburn.us/hexagonal-architecture/>
- **Onion Architecture (Jeffrey Palermo):** <https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/>

### 23.3 Specifications and standards <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23233-specifications-and-standards%0A%0ASection%20title%3A%2023.3%20Specifications%20and%20standards' target='_blank' rel='noopener' data-askgpt='23.3 Specifications and standards' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#233-specifications-and-standards' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23233-specifications-and-standards%0A%0ASection%20title%3A%2023.3%20Specifications%20and%20standards' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23233-specifications-and-standards%0A%0ASection%20title%3A%2023.3%20Specifications%20and%20standards' title='Ask ChatGPT about this section'>💬</a>

- **Unified Modeling Language (UML):** OMG, current standard for pattern diagrams.
- **POSA (Pattern-Oriented Software Architecture):** Buschmann, Meunier, Rohnert, Sommerlad, Stal. Wiley.

### 23.4 Related chapters <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23234-related-chapters%0A%0ASection%20title%3A%2023.4%20Related%20chapters' target='_blank' rel='noopener' data-askgpt='23.4 Related chapters' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#234-related-chapters' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23234-related-chapters%0A%0ASection%20title%3A%2023.4%20Related%20chapters' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23234-related-chapters%0A%0ASection%20title%3A%2023.4%20Related%20chapters' title='Ask ChatGPT about this section'>💬</a>

- [01 — Java Internals](../01-java-internals/README.md) — Implementation patterns in Java.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring's patterns (DI, MVC, AOP).
- [09 — System Design & Distributed Systems](../09-system-design/README.md) — Distributed patterns.
- [14 — Testing (Unit, Integration, Contract, Chaos)](../14-testing/README.md) — Test patterns; refactoring for testability.
- [15 — Git & Versioning](../15-git/README.md) — Workflow supporting good code.

### 23.5 Folder references <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23235-folder-references%0A%0ASection%20title%3A%2023.5%20Folder%20references' target='_blank' rel='noopener' data-askgpt='23.5 Folder references' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/software-engineering.md#235-folder-references' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23235-folder-references%0A%0ASection%20title%3A%2023.5%20Folder%20references' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Fsoftware-engineering.md%23235-folder-references%0A%0ASection%20title%3A%2023.5%20Folder%20references' title='Ask ChatGPT about this section'>💬</a>

- [Design Patterns Reference](./references/design-patterns.md) — Quick reference of GoF + modern patterns.
- [Clean Architecture Reference](./references/clean-architecture.md) — SOLID + Clean Architecture details.
- [Refactoring Reference](./references/refactoring.md) — Fowler's catalog summarized.