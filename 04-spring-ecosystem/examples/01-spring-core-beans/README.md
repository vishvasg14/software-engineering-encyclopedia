# 01 — Spring Core Beans

Demonstrates basic bean definitions: `@Configuration`, `@Bean`, `@Component`, and dependency injection.

## Files

- `AppConfig.java` — `@Configuration` with `@Bean` methods.
- `UserService.java` — `@Service` (a `@Component` specialization).
- `App.java` — main entry point using `AnnotationConfigApplicationContext`.

## Run (without Spring Boot)

```java
public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
    UserService svc = ctx.getBean(UserService.class);
    svc.doWork();
}
```