# Spring Framework Documentation Reference

The authoritative source for Spring Framework is the official documentation. This file catalogs the Spring Framework documentation pages referenced in the Spring Ecosystem document.

## Primary documentation

- **Spring Framework 6.1.x:** <https://docs.spring.io/spring-framework/docs/6.1.x/reference/html/>
- **Spring Framework current:** <https://docs.spring.io/spring-framework/reference/>
- **Spring Framework Javadoc:** <https://docs.spring.io/spring-framework/docs/current/javadoc-api/>
- **Spring Framework source:** <https://github.com/spring-projects/spring-framework>
- **Spring GitHub organization:** <https://github.com/spring-projects>

## Documentation structure

| Section | What it covers |
|---------|---------------|
| **Core** | IoC container, Events, Resources, i18n, Validation, Data Binding, SpEL |
| **Testing** | Introduction to Spring Testing, Unit Testing, Integration Testing, JDBC Testing |
| **Data Access** | Transactions, DAO Support, JDBC, R2DBC, Marshalling XML |
| **Web Servlet** | Spring MVC, WebSocket, SockJS, STOMP, REST Clients |
| **Web Reactive** | WebFlux, Reactive Streams, Reactor, WebClient, RSocket |
| **WebSocket** | WebSocket support, both reactive and servlet |
| **Integration** | Messaging, JMS, JMX, Email, Tasks and Scheduling, Cache, JTA |
| **Languages** | Kotlin, GraalVM Native Image |

## Key sections referenced in this document

### Core Technologies

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23core-technologies%0A%0ASection%20title%3A%20Core%20Technologies' target='_blank' rel='noopener' data-askgpt='Core Technologies' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/04-spring-ecosystem/references/spring-docs.md#core-technologies' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23core-technologies%0A%0ASection%20title%3A%20Core%20Technologies' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23core-technologies%0A%0ASection%20title%3A%20Core%20Technologies' title='Ask ChatGPT about this section'>💬</a>
| Topic | URL path |
|-------|----------|
| IoC Container | <https://docs.spring.io/spring-framework/reference/core/beans.html> |
| Classpath scanning, managed components | <https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html> |
| Bean scopes | <https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html> |
| Bean lifecycle | <https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html> |
| BeanFactoryPostProcessor | <https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html> |
| Bean PostProcessors | <https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html#beans-factory-extension-bpp> |
| Annotation-based container configuration | <https://docs.spring.io/spring-framework/reference/core/annotation-based-configuration.html> |
| JSR-330 (javax.inject) | <https://docs.spring.io/spring-framework/reference/core/standard-annotations.html> |
| Java-based configuration | <https://docs.spring.io/spring-framework/reference/core/java-config.html> |
| Environment abstraction | <https://docs.spring.io/spring-framework/reference/core/environment.html> |
| ApplicationContext | <https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html> |
| Resource loading | <https://docs.spring.io/spring-framework/reference/core/resources.html> |
| Validation | <https://docs.spring.io/spring-framework/reference/core/validation.html> |
| SpEL | <https://docs.spring.io/spring-framework/reference/core/expressions.html> |
| AOP | <https://docs.spring.io/spring-framework/reference/core/aop.html> |
| AOP Proxies | <https://docs.spring.io/spring-framework/reference/core/aop/proxying.html> |
| Spring AOP vs AspectJ | <https://docs.spring.io/spring-framework/reference/core/aop/ataspectj.html> |
| Null-safety | <https://docs.spring.io/spring-framework/reference/core/Null-safety.html> |
| Data Buffers and Codecs | <https://docs.spring.io/spring-framework/reference/core/databuffer-codec.html> |

### Testing

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23testing%0A%0ASection%20title%3A%20Testing' target='_blank' rel='noopener' data-askgpt='Testing' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/04-spring-ecosystem/references/spring-docs.md#testing' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23testing%0A%0ASection%20title%3A%20Testing' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23testing%0A%0ASection%20title%3A%20Testing' title='Ask ChatGPT about this section'>💬</a>
| Topic | URL path |
|-------|----------|
| Testing introduction | <https://docs.spring.io/spring-framework/reference/testing.html> |
| Unit Testing | <https://docs.spring.io/spring-framework/reference/testing/unit-testing.html> |
| Integration Testing | <https://docs.spring.io/spring-framework/reference/testing/integration-testing.html> |
| JDBC Testing | <https://docs.spring.io/spring-framework/reference/testing/testcontext-framework.html> |

### Data Access

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23data-access%0A%0ASection%20title%3A%20Data%20Access' target='_blank' rel='noopener' data-askgpt='Data Access' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/04-spring-ecosystem/references/spring-docs.md#data-access' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23data-access%0A%0ASection%20title%3A%20Data%20Access' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23data-access%0A%0ASection%20title%3A%20Data%20Access' title='Ask ChatGPT about this section'>💬</a>
| Topic | URL path |
|-------|----------|
| Transaction management | <https://docs.spring.io/spring-framework/reference/data-access/transaction.html> |
| DAO support | <https://docs.spring.io/spring-framework/reference/data-access/dao.html> |
| JDBC | <https://docs.spring.io/spring-framework/reference/data-access/jdbc.html> |
| R2DBC | <https://docs.spring.io/spring-framework/reference/data-access/r2dbc.html> |

### Web Servlet

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23web-servlet%0A%0ASection%20title%3A%20Web%20Servlet' target='_blank' rel='noopener' data-askgpt='Web Servlet' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/04-spring-ecosystem/references/spring-docs.md#web-servlet' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23web-servlet%0A%0ASection%20title%3A%20Web%20Servlet' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23web-servlet%0A%0ASection%20title%3A%20Web%20Servlet' title='Ask ChatGPT about this section'>💬</a>
| Topic | URL path |
|-------|----------|
| Spring MVC | <https://docs.spring.io/spring-framework/reference/web/servlet.html> |
| DispatcherServlet | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc.html> |
| Annotated controllers | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc/ann-controller.html> |
| Request mapping | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc/mvc-controller.html> |
| Exception handling | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc/ann-exceptions.html> |
| Validation | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc/ann-validation.html> |
| Filters | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc/filters.html> |
| CORS | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc/cors.html> |
| Interceptors | <https://docs.spring.io/spring-framework/reference/web/servlet/mvc/ann-interceptors.html> |
| View technologies | <https://docs.spring.io/spring-framework/reference/web/servlet/view.html> |
| HTTP clients | <https://docs.spring.io/spring-framework/reference/web/spring-webflux.html#webflux-client> |

### Web Reactive

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23web-reactive%0A%0ASection%20title%3A%20Web%20Reactive' target='_blank' rel='noopener' data-askgpt='Web Reactive' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/04-spring-ecosystem/references/spring-docs.md#web-reactive' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23web-reactive%0A%0ASection%20title%3A%20Web%20Reactive' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23web-reactive%0A%0ASection%20title%3A%20Web%20Reactive' title='Ask ChatGPT about this section'>💬</a>
| Topic | URL path |
|-------|----------|
| WebFlux | <https://docs.spring.io/spring-framework/reference/web-reactive.html> |
| Reactive Core | <https://docs.spring.io/spring-framework/reference/web-reactive/reactive-core.html> |
| DispatcherHandler | <https://docs.spring.io/spring-framework/reference/web-reactive/dispatcher-handler.html> |
| Annotated controllers | <https://docs.spring.io/spring-framework/reference/web-reactive/controller.html> |

### Integration

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23integration%0A%0ASection%20title%3A%20Integration' target='_blank' rel='noopener' data-askgpt='Integration' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/04-spring-ecosystem/references/spring-docs.md#integration' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23integration%0A%0ASection%20title%3A%20Integration' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23integration%0A%0ASection%20title%3A%20Integration' title='Ask ChatGPT about this section'>💬</a>
| Topic | URL path |
|-------|----------|
| Caching | <https://docs.spring.io/spring-framework/reference/integration/cache.html> |
| Task Execution and Scheduling | <https://docs.spring.io/spring-framework/reference/integration/scheduling.html> |
| JMS | <https://docs.spring.io/spring-framework/reference/integration/jms.html> |
| Email | <https://docs.spring.io/spring-framework/reference/integration/email.html> |

### Languages

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23languages%0A%0ASection%20title%3A%20Languages' target='_blank' rel='noopener' data-askgpt='Languages' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/04-spring-ecosystem/references/spring-docs.md#languages' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23languages%0A%0ASection%20title%3A%20Languages' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F04-spring-ecosystem%2Freferences%2Fspring-docs.md%23languages%0A%0ASection%20title%3A%20Languages' title='Ask ChatGPT about this section'>💬</a>
| Topic | URL path |
|-------|----------|
| Kotlin | <https://docs.spring.io/spring-framework/reference/languages/kotlin.html> |
| GraalVM Native Image | <https://docs.spring.io/spring-framework/reference/languages/native-image.html> |

## Spring Framework versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 1.0 | 2004 | Initial release |
| 2.0 | 2006 | XML namespaces, AspectJ integration |
| 2.5 | 2007 | Annotation-driven configuration |
| 3.0 | 2009 | Java 5+, `@Configuration`, SpEL |
| 3.1 | 2011 | `@Profile`, `@Cacheable` |
| 3.2 | 2012 | Spring MVC improvements, `@ControllerAdvice` |
| 4.0 | 2013 | Spring Boot 1.0 dependency |
| 4.2 | 2015 | `@EventListener` |
| 4.3 | 2016 | Java 8 baseline, `@RestController` |
| 5.0 | 2017 | Spring Boot 2.0; reactive stack (WebFlux); Java 8 baseline |
| 5.1 | 2018 | JSR-305 tolerance |
| 5.2 | 2019 | RSocket; concurrent execution with `@ConfigurationProperties` |
| 5.3 | 2020 | Last javax namespace for some APIs |
| 6.0 | 2022 | Java 17+ baseline, Jakarta EE 9 (jakarta.* namespace) |
| 6.1 | 2023 | Virtual threads support, JdbcClient API |
| 6.2 | 2024 | RestClient fluent API refinements |

## Source code organization

Top-level directories in `spring-framework`:

| Source path | What it contains |
|-------------|------------------|
| `spring-core` | Core utilities, SpEL |
| `spring-beans` | Bean factory, DI |
| `spring-context` | ApplicationContext, events |
| `spring-aop` | AOP framework |
| `spring-expression` | SpEL |
| `spring-jdbc` | JdbcTemplate, NamedParameterJdbcTemplate |
| `spring-tx` | Transaction management |
| `spring-orm` | JPA, Hibernate integration |
| `spring-web` | Web MVC (servlet) |
| `spring-webflux` | Reactive web |
| `spring-webmvc` | Spring MVC |
| `spring-messaging` | Messaging abstractions |
| `spring-websocket` | WebSocket support |

## Spring projects (GitHub organization)

- **Spring Framework:** <https://github.com/spring-projects/spring-framework>
- **Spring Boot:** <https://github.com/spring-projects/spring-boot>
- **Spring Data:** <https://github.com/spring-projects/spring-data>
- **Spring Cloud:** <https://github.com/spring-projects/spring-cloud>
- **Spring Security:** <https://github.com/spring-projects/spring-security>
- **Spring Integration:** <https://github.com/spring-projects/spring-integration>
- **Spring Batch:** <https://github.com/spring-projects/spring-batch>
- **Spring AI:** <https://github.com/spring-projects/spring-ai>
- **Spring Authorization Server:** <https://github.com/spring-projects/spring-authorization-server>

## Reference guides

- **Spring Guides:** <https://spring.io/guides>
- **Spring Tutorials:** <https://spring.io/tutorials>
- **Baeldung Spring:** <https://www.baeldung.com/spring>
- **Spring in Action (online):** <https://livebook.manning.com/book/spring-in-action-sixth-edition/>

## Community

- **Spring Forums:** <https://github.com/spring-projects/spring-framework/discussions>
- **Stack Overflow:** <https://stackoverflow.com/questions/tagged/spring>
- **Spring Blog:** <https://spring.io/blog>
- **YouTube:** <https://www.youtube.com/@SpringSourceDev>