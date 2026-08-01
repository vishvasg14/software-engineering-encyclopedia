# Design Patterns Reference

The canonical reference for design patterns is the Gang of Four (GoF) book and the Refactoring.Guru website.

## Primary reference

- **GoF book:** *Design Patterns: Elements of Reusable Object-Oriented Software* (1994).
- **Refactoring.Guru:** <https://refactoring.guru/design-patterns>
- **SourceMaking:** <https://sourcemaking.com/design_patterns
- **Wikipedia:** <https://en.wikipedia.org/wiki/Design_Patterns

## GoF Pattern Categories

### Creational (5 patterns)

Deal with object creation mechanisms.

| Pattern | Purpose | When to use |
|---------|---------|-------------|
| **Singleton** | One instance | Config, caches, logging |
| **Factory Method** | Subclass decides which class to instantiate | When a class can't anticipate the type it must create |
| **Abstract Factory** | Families of related objects | When you need to create families of related objects |
| **Builder** | Construct complex objects step by step | When constructor has many parameters |
| **Prototype** | Clone an existing object | When creation is expensive |

### Structural (7 patterns)

Deal with object composition.

| Pattern | Purpose |
|---------|---------|
| **Adapter** | Convert interface of a class to another |
| **Bridge** | Decouple abstraction from implementation |
| **Composite** | Tree structure of objects |
| **Decorator** | Add behavior dynamically |
| **Facade** | Simplified interface to a complex subsystem |
| **Flyweight** | Share state across many objects |
| **Proxy** | Placeholder for another object |

### Behavioral (11 patterns)

Deal with object collaboration and responsibility.

| Pattern | Purpose |
|---------|---------|
| **Chain of Responsibility** | Pass request along chain of handlers |
| **Command** | Encapsulate request as object |
| **Interpreter** | Implement language grammar |
| **Iterator** | Sequential access to elements |
| **Mediator** | Centralize complex communication |
| **Memento** | Capture and restore object state |
| **Observer** | Notify dependents of state changes |
| **State** | Alter behavior when state changes |
| **Strategy** | Encapsulate interchangeable algorithms |
| **Template Method** | Define skeleton, defer steps to subclass |
| **Visitor** | Add new operations without changing classes |

## Modern patterns (post-GoF)

### Microservices patterns

- API Gateway
- Service Registry / Discovery (Consul, Eureka)
- Circuit Breaker (Hystrix, Resilience4j)
- Bulkhead
- Saga (orchestration and choreography)
- CQRS
- Event Sourcing
- Outbox
- Service Mesh (Istio, Linkerd)
- Sidecar / Ambassador
- Backend for Frontend (BFF)

### Cloud-native patterns

- Health Check
- Distributed Tracing
- Distributed Logging
- Application Metrics
- Audit Logging
- Distributed Configuration
- Leader Election
- Distributed Lock
- Cache-Aside
- Health Endpoint Monitoring

### Enterprise application patterns (Fowler)

- Repository
- Unit of Work
- Service Layer
- Active Record
- Data Mapper
- Identity Map
- Lazy Loading
- Query Object
- Specification

### Domain-Driven Design patterns (Evans/Vernon)

- Aggregate
- Entity
- Value Object
- Repository
- Domain Service
- Application Service
- Bounded Context
- Context Map
- Domain Event
- Saga (process manager)

## Pattern examples

### Singleton

```java
public class Config {
    private static Config instance;
    private Config() {}
    public static synchronized Config getInstance() {
        if (instance == null) instance = new Config();
        return instance;
    }
}
```

### Factory Method

```java
abstract class Dialog {
    abstract Button createButton();
    void render() {
        Button ok = createButton();
        ok.onClick(() -> System.out.println("OK"));
        ok.render();
    }
}
class WindowsDialog extends Dialog {
    Button createButton() { return new WindowsButton(); }
}
```

### Observer

```java
interface Observer { void update(Event e); }
class Subject {
    List<Observer> obs = new ArrayList<>();
    void attach(Observer o) { obs.add(o); }
    void notifyAll(Event e) { for (var o : obs) o.update(e); }
}
```

### Strategy

```java
interface Strategy { int doOperation(int a, int b); }
class Add implements Strategy { int doOperation(int a, int b) { return a + b; } }
class Sub implements Strategy { int doOperation(int a, int b) { return a - b; } }
class Context { Strategy s; Context(Strategy s) { this.s = s; } int exec(int a, int b) { return s.doOperation(a, b); } }
```

### Decorator

```java
interface Component { String operation(); }
class ConcreteComponent implements Component { public String operation() { return "Hello"; } }
class Decorator implements Component {
    Component c;
    Decorator(Component c) { this.c = c; }
    public String operation() { return c.operation() + " World"; }
}
```

## Online resources

- **Refactoring.Guru:** <https://refactoring.guru/design-patterns>
- **SourceMaking:** <https://sourcemaking.com/design_patterns>
- **Java Design Patterns (journaldev):** <https://www.journaldev.com/1534/java-design-patterns
- **Spring Framework Design Patterns:** <https://docs.spring.io/spring-framework/docs/current/reference/core.html
