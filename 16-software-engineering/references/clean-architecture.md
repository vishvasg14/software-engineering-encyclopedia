# Clean Architecture Reference

The canonical reference for Clean Architecture is Robert C. Martin's book and website.

## Primary reference

- **Clean Architecture book:** <https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164>
- **Robert C. Martin site:** <https://blog.cleancoder.com/>
- **The Clean Architecture (blog post):** <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
- **Clean Architecture cheat sheet:** <https://github.com/cheatsheetseries/cheatsheets/blob/master/architecture/clean-architecture.md

## Key concepts

- **Dependency Rule:** source code dependencies can only point inward toward higher-level policies.
- **Entities:** enterprise business rules; the most stable code.
- **Use cases:** application-specific business rules.
- **Interface adapters:** controllers, gateways, presenters.
- **Frameworks and drivers:** the outermost layer (DBs, web frameworks).
- **Dependency Inversion:** the dependency direction is independent of control flow.

## The dependency rule

```
[Frameworks and Drivers] --> [Interface Adapters] --> [Use Cases] --> [Entities]
       (outermost)               (next)               (next)        (innermost)
```

The inner circle knows nothing about the outer circle. The outer circle depends on the inner circle.

## SOLID principles

- **S**ingle Responsibility: a class has one reason to change.
- **O**pen/Closed: open for extension, closed for modification.
- **L**iskov Substitution: subtypes are substitutable for base types.
- **I**nterface Segregation: clients shouldn't depend on methods they don't use.
- **D**ependency Inversion: depend on abstractions, not concretions.

## Uncle Bob's clean architecture rules

1. **Independent of frameworks:** the architecture doesn't depend on any framework.
2. **Testable:** the business rules can be tested without UI, DB, or web server.
3. **Independent of UI:** the UI can change without changing the business rules.
4. **Independent of database:** you can swap Oracle for Mongo without changing the business rules.
5. **Independent of any external agency:** the business rules know nothing about the outside world.

## SOLID in depth

### Single Responsibility Principle (SRP) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23single-responsibility-principle-srp%0A%0ASection%20title%3A%20Single%20Responsibility%20Principle%20(SRP)" target="_blank" rel="noopener" data-askgpt="Single Responsibility Principle (SRP)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/clean-architecture.md#single-responsibility-principle-srp" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23single-responsibility-principle-srp%0A%0ASection%20title%3A%20Single%20Responsibility%20Principle%20(SRP)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23single-responsibility-principle-srp%0A%0ASection%20title%3A%20Single%20Responsibility%20Principle%20(SRP)" title="Ask ChatGPT about this section">💬</a>

A class should have only one reason to change. If a class has multiple responsibilities, changes in one responsibility affect others.

```java
// Bad
class User {
    void saveToDatabase() { ... }   // persistence
    void sendEmail() { ... }          // communication
    void generateReport() { ... }      // reporting
}

// Good
class User {
    String name;
    String email;
}

class UserRepository {
    void save(User user) { ... }
}

class EmailService {
    void sendWelcomeEmail(User user) { ... }
}

class ReportGenerator {
    void generate(User user) { ... }
}
```

### Open/Closed Principle (OCP) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23openclosed-principle-ocp%0A%0ASection%20title%3A%20Open%2FClosed%20Principle%20(OCP)" target="_blank" rel="noopener" data-askgpt="Open/Closed Principle (OCP)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/clean-architecture.md#openclosed-principle-ocp" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23openclosed-principle-ocp%0A%0ASection%20title%3A%20Open%2FClosed%20Principle%20(OCP)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23openclosed-principle-ocp%0A%0ASection%20title%3A%20Open%2FClosed%20Principle%20(OCP)" title="Ask ChatGPT about this section">💬</a>

Software entities should be open for extension, closed for modification.

```java
// Use abstract base class or interface
abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;
    double area() { return Math.PI * radius * radius; }
}

class Square extends Shape {
    double side;
    double area() { return side * side; }
}
```

### Liskov Substitution Principle (LSP) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23liskov-substitution-principle-lsp%0A%0ASection%20title%3A%20Liskov%20Substitution%20Principle%20(LSP)" target="_blank" rel="noopener" data-askgpt="Liskov Substitution Principle (LSP)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/clean-architecture.md#liskov-substitution-principle-lsp" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23liskov-substitution-principle-lsp%0A%0ASection%20title%3A%20Liskov%20Substitution%20Principle%20(LSP)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23liskov-substitution-principle-lsp%0A%0ASection%20title%3A%20Liskov%20Substitution%20Principle%20(LSP)" title="Ask ChatGPT about this section">💬</a>

Subtypes must be substitutable for base types.

```java
// Bad: Square extends Rectangle but breaks behavior
class Rectangle {
    void setWidth(double w) { width = w; }
    void setHeight(double h) { height = h; }
}
class Square extends Rectangle {
    void setWidth(double w) { setWidth(w); setHeight(w); }
    void setHeight(double h) { setWidth(h); setHeight(h); }
}
```

### Interface Segregation Principle (ISP) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23interface-segregation-principle-isp%0A%0ASection%20title%3A%20Interface%20Segregation%20Principle%20(ISP)" target="_blank" rel="noopener" data-askgpt="Interface Segregation Principle (ISP)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/clean-architecture.md#interface-segregation-principle-isp" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23interface-segregation-principle-isp%0A%0ASection%20title%3A%20Interface%20Segregation%20Principle%20(ISP)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23interface-segregation-principle-isp%0A%0ASection%20title%3A%20Interface%20Segregation%20Principle%20(ISP)" title="Ask ChatGPT about this section">💬</a>

Clients should not be forced to depend on methods they do not use.

```java
// Bad
interface Worker {
    void work();
    void eat();
}
class Robot implements Worker {
    void work() { ... }
    void eat() { throw new UnsupportedOperationException(); }  // bad!
}

// Good
interface Workable { void work(); }
interface Feedable { void eat(); }
class Robot implements Workable { void work() { ... } }
class Human implements Workable, Feedable {
    void work() { ... }
    void eat() { ... }
}
```

### Dependency Inversion Principle (DIP) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23dependency-inversion-principle-dip%0A%0ASection%20title%3A%20Dependency%20Inversion%20Principle%20(DIP)" target="_blank" rel="noopener" data-askgpt="Dependency Inversion Principle (DIP)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/16-software-engineering/references/clean-architecture.md#dependency-inversion-principle-dip" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23dependency-inversion-principle-dip%0A%0ASection%20title%3A%20Dependency%20Inversion%20Principle%20(DIP)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F16-software-engineering%2Freferences%2Fclean-architecture.md%23dependency-inversion-principle-dip%0A%0ASection%20title%3A%20Dependency%20Inversion%20Principle%20(DIP)" title="Ask ChatGPT about this section">💬</a>

High-level modules should not depend on low-level modules. Both should depend on abstractions.

```java
// High-level module
class OrderService {
    private final OrderRepository repository;  // abstraction

    OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    void placeOrder(Order order) {
        repository.save(order);
    }
}

// Low-level module
interface OrderRepository {
    void save(Order order);
}

class PostgresOrderRepository implements OrderRepository {
    void save(Order order) { ... }
}
```

## Clean architecture vs other architectures

| Architecture | Focus | Layers |
|-------------|-------|--------|
| **Clean Architecture** | Dependency rule | Entities, Use Cases, Interface Adapters, Frameworks |
| **Hexagonal** (Ports & Adapters) | Same idea | Domain, Application, Ports, Adapters |
| **Onion** | Same idea | Domain Model, Domain Services, Application Services, Infrastructure |

All three have the same core principle: dependencies point inward.

## Books

- *Clean Architecture* — Robert C. Martin (Prentice Hall).
- *Agile Software Development: Principles, Patterns, and Practices* — Robert C. Martin.
- *Design Patterns* — Gang of Four (creational, structural, behavioral).
- *Patterns of Enterprise Application Architecture* — Martin Fowler.
- *Domain-Driven Design* — Eric Evans.
