# Design Patterns Reference

The canonical reference for design patterns is the Gang of Four (GoF) book and the Refactoring.Guru website.

## Primary reference

- **GoF book:** *Design Patterns: Elements of Reusable Object-Oriented Software* (1994).
- **Refactoring.Guru:** <https://refactoring.guru/design-patterns>
- **SourceMaking:** <https://sourcemaking.com/design_patterns
- **Wikipedia:** <https://en.wikipedia.org/wiki/Design_Patterns

## GoF Pattern Categories

### Creational (5 patterns) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23creational-5-patterns%0A%0ASection%20title%3A%20Creational%20(5%20patterns)' target='_blank' rel='noopener' data-askgpt='Creational (5 patterns)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#creational-5-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23creational-5-patterns%0A%0ASection%20title%3A%20Creational%20(5%20patterns)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23creational-5-patterns%0A%0ASection%20title%3A%20Creational%20(5%20patterns)' title='Ask ChatGPT about this section'>💬</a>

Deal with object creation mechanisms.

| Pattern | Purpose | When to use |
|---------|---------|-------------|
| **Singleton** | One instance | Config, caches, logging |
| **Factory Method** | Subclass decides which class to instantiate | When a class can't anticipate the type it must create |
| **Abstract Factory** | Families of related objects | When you need to create families of related objects |
| **Builder** | Construct complex objects step by step | When constructor has many parameters |
| **Prototype** | Clone an existing object | When creation is expensive |

### Structural (7 patterns) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23structural-7-patterns%0A%0ASection%20title%3A%20Structural%20(7%20patterns)' target='_blank' rel='noopener' data-askgpt='Structural (7 patterns)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#structural-7-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23structural-7-patterns%0A%0ASection%20title%3A%20Structural%20(7%20patterns)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23structural-7-patterns%0A%0ASection%20title%3A%20Structural%20(7%20patterns)' title='Ask ChatGPT about this section'>💬</a>

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

### Behavioral (11 patterns) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23behavioral-11-patterns%0A%0ASection%20title%3A%20Behavioral%20(11%20patterns)' target='_blank' rel='noopener' data-askgpt='Behavioral (11 patterns)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#behavioral-11-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23behavioral-11-patterns%0A%0ASection%20title%3A%20Behavioral%20(11%20patterns)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23behavioral-11-patterns%0A%0ASection%20title%3A%20Behavioral%20(11%20patterns)' title='Ask ChatGPT about this section'>💬</a>

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

### Microservices patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23microservices-patterns%0A%0ASection%20title%3A%20Microservices%20patterns' target='_blank' rel='noopener' data-askgpt='Microservices patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#microservices-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23microservices-patterns%0A%0ASection%20title%3A%20Microservices%20patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23microservices-patterns%0A%0ASection%20title%3A%20Microservices%20patterns' title='Ask ChatGPT about this section'>💬</a>

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

### Cloud-native patterns <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23cloud-native-patterns%0A%0ASection%20title%3A%20Cloud-native%20patterns' target='_blank' rel='noopener' data-askgpt='Cloud-native patterns' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#cloud-native-patterns' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23cloud-native-patterns%0A%0ASection%20title%3A%20Cloud-native%20patterns' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23cloud-native-patterns%0A%0ASection%20title%3A%20Cloud-native%20patterns' title='Ask ChatGPT about this section'>💬</a>

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

### Enterprise application patterns (Fowler) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23enterprise-application-patterns-fowler%0A%0ASection%20title%3A%20Enterprise%20application%20patterns%20(Fowler)' target='_blank' rel='noopener' data-askgpt='Enterprise application patterns (Fowler)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#enterprise-application-patterns-fowler' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23enterprise-application-patterns-fowler%0A%0ASection%20title%3A%20Enterprise%20application%20patterns%20(Fowler)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23enterprise-application-patterns-fowler%0A%0ASection%20title%3A%20Enterprise%20application%20patterns%20(Fowler)' title='Ask ChatGPT about this section'>💬</a>

- Repository
- Unit of Work
- Service Layer
- Active Record
- Data Mapper
- Identity Map
- Lazy Loading
- Query Object
- Specification

### Domain-Driven Design patterns (Evans/Vernon) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23domain-driven-design-patterns-evansvernon%0A%0ASection%20title%3A%20Domain-Driven%20Design%20patterns%20(Evans%2FVernon)' target='_blank' rel='noopener' data-askgpt='Domain-Driven Design patterns (Evans/Vernon)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#domain-driven-design-patterns-evansvernon' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23domain-driven-design-patterns-evansvernon%0A%0ASection%20title%3A%20Domain-Driven%20Design%20patterns%20(Evans%2FVernon)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23domain-driven-design-patterns-evansvernon%0A%0ASection%20title%3A%20Domain-Driven%20Design%20patterns%20(Evans%2FVernon)' title='Ask ChatGPT about this section'>💬</a>

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

### Singleton <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23singleton%0A%0ASection%20title%3A%20Singleton' target='_blank' rel='noopener' data-askgpt='Singleton' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#singleton' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23singleton%0A%0ASection%20title%3A%20Singleton' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23singleton%0A%0ASection%20title%3A%20Singleton' title='Ask ChatGPT about this section'>💬</a>

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

### Factory Method <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23factory-method%0A%0ASection%20title%3A%20Factory%20Method' target='_blank' rel='noopener' data-askgpt='Factory Method' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#factory-method' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23factory-method%0A%0ASection%20title%3A%20Factory%20Method' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23factory-method%0A%0ASection%20title%3A%20Factory%20Method' title='Ask ChatGPT about this section'>💬</a>

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

### Observer <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23observer%0A%0ASection%20title%3A%20Observer' target='_blank' rel='noopener' data-askgpt='Observer' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#observer' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23observer%0A%0ASection%20title%3A%20Observer' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23observer%0A%0ASection%20title%3A%20Observer' title='Ask ChatGPT about this section'>💬</a>

```java
interface Observer { void update(Event e); }
class Subject {
    List<Observer> obs = new ArrayList<>();
    void attach(Observer o) { obs.add(o); }
    void notifyAll(Event e) { for (var o : obs) o.update(e); }
}
```

### Strategy <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23strategy%0A%0ASection%20title%3A%20Strategy' target='_blank' rel='noopener' data-askgpt='Strategy' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#strategy' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23strategy%0A%0ASection%20title%3A%20Strategy' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23strategy%0A%0ASection%20title%3A%20Strategy' title='Ask ChatGPT about this section'>💬</a>

```java
interface Strategy { int doOperation(int a, int b); }
class Add implements Strategy { int doOperation(int a, int b) { return a + b; } }
class Sub implements Strategy { int doOperation(int a, int b) { return a - b; } }
class Context { Strategy s; Context(Strategy s) { this.s = s; } int exec(int a, int b) { return s.doOperation(a, b); } }
```

### Decorator <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23decorator%0A%0ASection%20title%3A%20Decorator' target='_blank' rel='noopener' data-askgpt='Decorator' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/design-patterns.md#decorator' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23decorator%0A%0ASection%20title%3A%20Decorator' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fdesign-patterns.md%23decorator%0A%0ASection%20title%3A%20Decorator' title='Ask ChatGPT about this section'>💬</a>

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
