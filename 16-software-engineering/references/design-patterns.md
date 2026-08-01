# Design Patterns Reference

The canonical reference for design patterns is the Gang of Four (GoF) book and the Refactoring.Guru website.

## Primary reference

- **GoF book:** *Design Patterns: Elements of Reusable Object-Oriented Software* (1994).
- **Refactoring.Guru:** <https://refactoring.guru/design-patterns>
- **SourceMaking:** <https://sourcemaking.com/design_patterns
- **Wikipedia:** <https://en.wikipedia.org/wiki/Design_Patterns

## GoF Pattern Categories

### Creational (5 patterns) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Creational%20(5%20patterns)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Creational (5 patterns)" title="Ask ChatGPT about this section">💬</a>

Deal with object creation mechanisms.

| Pattern | Purpose | When to use |
|---------|---------|-------------|
| **Singleton** | One instance | Config, caches, logging |
| **Factory Method** | Subclass decides which class to instantiate | When a class can't anticipate the type it must create |
| **Abstract Factory** | Families of related objects | When you need to create families of related objects |
| **Builder** | Construct complex objects step by step | When constructor has many parameters |
| **Prototype** | Clone an existing object | When creation is expensive |

### Structural (7 patterns) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Structural%20(7%20patterns)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Structural (7 patterns)" title="Ask ChatGPT about this section">💬</a>

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

### Behavioral (11 patterns) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Behavioral%20(11%20patterns)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Behavioral (11 patterns)" title="Ask ChatGPT about this section">💬</a>

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

### Microservices patterns <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Microservices%20patterns'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Microservices patterns" title="Ask ChatGPT about this section">💬</a>

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

### Cloud-native patterns <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Cloud-native%20patterns'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Cloud-native patterns" title="Ask ChatGPT about this section">💬</a>

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

### Enterprise application patterns (Fowler) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Enterprise%20application%20patterns%20(Fowler)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Enterprise application patterns (Fowler)" title="Ask ChatGPT about this section">💬</a>

- Repository
- Unit of Work
- Service Layer
- Active Record
- Data Mapper
- Identity Map
- Lazy Loading
- Query Object
- Specification

### Domain-Driven Design patterns (Evans/Vernon) <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Domain-Driven%20Design%20patterns%20(Evans%2FVernon)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Domain-Driven Design patterns (Evans/Vernon)" title="Ask ChatGPT about this section">💬</a>

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

### Singleton <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Singleton'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Singleton" title="Ask ChatGPT about this section">💬</a>

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

### Factory Method <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Factory%20Method'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Factory Method" title="Ask ChatGPT about this section">💬</a>

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

### Observer <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Observer'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Observer" title="Ask ChatGPT about this section">💬</a>

```java
interface Observer { void update(Event e); }
class Subject {
    List<Observer> obs = new ArrayList<>();
    void attach(Observer o) { obs.add(o); }
    void notifyAll(Event e) { for (var o : obs) o.update(e); }
}
```

### Strategy <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Strategy'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Strategy" title="Ask ChatGPT about this section">💬</a>

```java
interface Strategy { int doOperation(int a, int b); }
class Add implements Strategy { int doOperation(int a, int b) { return a + b; } }
class Sub implements Strategy { int doOperation(int a, int b) { return a - b; } }
class Context { Strategy s; Context(Strategy s) { this.s = s; } int exec(int a, int b) { return s.doOperation(a, b); } }
```

### Decorator <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Decorator'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Decorator" title="Ask ChatGPT about this section">💬</a>

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
