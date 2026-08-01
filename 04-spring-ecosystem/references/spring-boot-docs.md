# Spring Boot Documentation Reference

The authoritative source for Spring Boot is the official documentation. This file catalogs the Spring Boot documentation pages referenced in the Spring Ecosystem document.

## Primary documentation

- **Spring Boot 3.3.x:** <https://docs.spring.io/spring-boot/docs/3.3.x/reference/htmlsingle/>
- **Spring Boot current:** <https://docs.spring.io/spring-boot/reference/>
- **Spring Boot API:** <https://docs.spring.io/spring-boot/docs/current/api/>
- **Spring Boot source:** <https://github.com/spring-projects/spring-boot>
- **Spring Initializr:** <https://start.spring.io/>
- **Spring Boot CLI:** <https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#cli>

## Documentation structure

| Section | What it covers |
|---------|---------------|
| **Legal** | License info |
| **Getting Help** | Community resources |
| **Documentation Overview** | About the docs, new features |
| **Getting Started** | Introduction, system requirements, installation, first app |
| **Upgrading** | From earlier versions |
| **Using Spring Boot** | Build systems (Maven, Gradle), structuring code, configuration |
| **Spring Boot Features** | SpringApplication, external config, profiles, logging, JSON, web |
| **Web** | Servlet, Reactive, embedded containers, graceful shutdown |
| **Data** | SQL, NOSQL, Data repositories |
| **Messaging** | JMS, AMQP, Kafka |
| **IO** | Caching, Quartz, Mail, Validation, REST clients |
| **Container Images** | Efficient container images, buildpacks, layers |
| **Production-ready Features** | Actuator, monitoring, deployment |
| **Deploying Spring Boot Apps** | Cloud deployment, OS services |
| **CLI** | Command-line interface |
| **Build Tool Plugins** | Maven, Gradle plugin reference |
| **"How-to" Guides** | Application development, configuration, deployment |
| **Configuration Metadata** | Annotation processors, configuration metadata |

## Key sections referenced in this document

### Getting Started

| Topic | URL path |
|-------|----------|
| Spring Boot introduction | <https://docs.spring.io/spring-boot/reference/using/index.html> |
| System requirements | <https://docs.spring.io/spring-boot/reference/using/system-requirements.html> |
| Installing Spring Boot | <https://docs.spring.io/spring-boot/reference/using/installing.html> |
| First Spring Boot app | <https://docs.spring.io/spring-boot/reference/using/getting-started.html> |

### Auto-configuration

| Topic | URL path |
|-------|----------|
| Auto-configuration | <https://docs.spring.io/spring-boot/reference/using/auto-configuration.html> |
| Auto-configuration classes | <https://docs.spring.io/spring-boot/docs/3.3.x/reference/htmlsingle/#features.spring-application.autoconfiguration> |
| Disabling auto-configuration | <https://docs.spring.io/spring-boot/reference/using/auto-configuration.html#using.auto-configuration.disabling-specific> |
| Custom auto-configuration | <https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html> |

### Spring Boot features

| Topic | URL path |
|-------|----------|
| SpringApplication | <https://docs.spring.io/spring-boot/reference/features/spring-application.html> |
| Externalized configuration | <https://docs.spring.io/spring-boot/reference/features/external-config.html> |
| Profiles | <https://docs.spring.io/spring-boot/reference/features/profiles.html> |
| Logging | <https://docs.spring.io/spring-boot/reference/features/logging.html> |
| JSON | <https://docs.spring.io/spring-boot/reference/features/json.html> |
| Task execution and scheduling | <https://docs.spring.io/spring-boot/reference/features/task-execution-and-scheduling.html> |
| Testing | <https://docs.spring.io/spring-boot/reference/features/testing.html> |
| Developing with Spring Boot | <https://docs.spring.io/spring-boot/reference/features/developing-web-applications.html> |

### Web

| Topic | URL path |
|-------|----------|
| Embedded containers | <https://docs.spring.io/spring-boot/reference/web/servlet.html> |
| HTTP clients | <https://docs.spring.io/spring-boot/reference/io/rest-client.html> |
| WebSocket | <https://docs.spring.io/spring-boot/reference/web/websocket.html> |
| WebFlux | <https://docs.spring.io/spring-boot/reference/web/reactive.html> |
| Graceful shutdown | <https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html> |

### Data

| Topic | URL path |
|-------|----------|
| SQL databases | <https://docs.spring.io/spring-boot/reference/data/sql.html> |
| DataSource | <https://docs.spring.io/spring-boot/reference/data/sql.html#data.sql.datasource> |
| HikariCP | <https://docs.spring.io/spring-boot/reference/data/sql.html#data.sql.datasource.connection-pool> |
| JPA / Hibernate | <https://docs.spring.io/spring-boot/reference/data/sql.html#data.sql.jpa-and-spring-data> |
| Redis | <https://docs.spring.io/spring-boot/reference/data/nosql.html> |
| MongoDB | <https://docs.spring.io/spring-boot/reference/data/nosql.html> |
| Spring Data Repositories | <https://docs.spring.io/spring-boot/reference/data/sql.html#data.sql.repositories> |

### Production-ready

| Topic | URL path |
|-------|----------|
| Actuator | <https://docs.spring.io/spring-boot/reference/actuator/index.html> |
| Health | <https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints.health> |
| Metrics | <https://docs.spring.io/spring-boot/reference/actuator/metrics.html> |
| Loggers | <https://docs.spring.io/spring-boot/reference/actuator/loggers.html> |
| Info | <https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints.info> |
| Environment | <https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints.env> |
| HTTP | <https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints.exposing> |
| Observability | <https://docs.spring.io/spring-boot/reference/actuator/observability.html> |

### Configuration

| Topic | URL path |
|-------|----------|
| Configuration metadata | <https://docs.spring.io/spring-boot/reference/configurationmetadata.html> |
| Conditional annotations | <https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html#features.developing-auto-configuration.condition-annotations> |
| Type-safe configuration | <https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties> |

### Deployment

| Topic | URL path |
|-------|----------|
| Efficient container images | <https://docs.spring.io/spring-boot/reference/containerimages/index.html> |
| Cloud Native Buildpacks | <https://docs.spring.io/spring-boot/reference/containerimages/buildpacks.html> |
| Dockerfiles | <https://docs.spring.io/spring-boot/reference/containerimages/dockerfiles.html> |

## Spring Boot versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 1.0 | 2014 | Initial release |
| 1.2 | 2015 | `@EntityScan` |
| 1.3 | 2015 | Caching abstraction |
| 1.4 | 2016 | `@ConditionalOnProperty` improvements |
| 1.5 | 2017 | Actuator rewrite, Kotlin support |
| 2.0 | 2018 | Spring Framework 5, WebFlux, Java 8 baseline |
| 2.1 | 2018 | JUnit 5, `data-jpa` improvements |
| 2.2 | 2019 | JUnit 5 default, `@ConfigurationProperties` scanning |
| 2.3 | 2020 | Graceful shutdown, Docker/Buildpacks support |
| 2.4 | 2020 | Configuration files rework (`spring.config.import`) |
| 2.5 | 2021 | Structured logging, `Dockerfile` improvements |
| 2.6 | 2021 | `spring.config.imports` mandatory |
| 2.7 | 2022 | Last 2.x (Java 8+ baseline) |
| 3.0 | 2022 | Java 17+, Jakarta EE 9 (jakarta.*) |
| 3.1 | 2023 | `springdoc-openapi`, problem-details |
| 3.2 | 2023 | `@ConfigurationProperties` scan |
| 3.3 | 2024 | CDS support, virtual threads (Spring 6.1) |
| 3.4 | 2024 | Latest (Spring 6.2) |

## Spring Boot starters (`spring-boot-starter-*`)

| Starter | Purpose |
|---------|---------|
| `spring-boot-starter-web` | Spring MVC + embedded Tomcat |
| `spring-boot-starter-webflux` | Spring WebFlux + embedded Netty |
| `spring-boot-starter-data-jpa` | Spring Data JPA + Hibernate |
| `spring-boot-starter-data-redis` | Spring Data Redis |
| `spring-boot-starter-data-mongodb` | Spring Data MongoDB |
| `spring-boot-starter-security` | Spring Security |
| `spring-boot-starter-actuator` | Actuator endpoints |
| `spring-boot-starter-test` | JUnit, Mockito, AssertJ, Spring Test |
| `spring-boot-starter-validation` | Hibernate Validator (Jakarta Bean Validation) |
| `spring-boot-starter-mail` | JavaMail |
| `spring-boot-starter-cache` | Spring caching abstraction |
| `spring-boot-starter-amqp` | RabbitMQ |
| `spring-boot-starter-graphql` | GraphQL |
| `spring-boot-starter-thymeleaf` | Thymeleaf templates |
| `spring-boot-starter-quartz` | Quartz scheduling |
| `spring-boot-starter-websocket` | WebSocket |
| `spring-boot-starter-groovy-templates` | Groovy templates |
| `spring-boot-starter-batch` | Spring Batch |
| `spring-boot-starter-integration` | Spring Integration |
| `spring-boot-starter-reactor-netty` | Reactor Netty |
| `spring-boot-starter-aop` | Spring AOP + AspectJ |

## Actuator endpoints

| Endpoint | Purpose |
|----------|---------|
| `/actuator/health` | Application health |
| `/actuator/info` | App info |
| `/actuator/metrics` | Metrics |
| `/actuator/metrics/{name}` | Specific metric |
| `/actuator/env` | Environment properties |
| `/actuator/loggers` | Logging config |
| `/actuator/loggers/{name}` | Specific logger |
| `/actuator/beans` | Bean list |
| `/actuator/mappings` | URL mappings |
| `/actuator/conditions` | Auto-configuration conditions |
| `/actuator/configprops` | Configuration properties |
| `/actuator/threaddump` | Thread dump |
| `/actuator/heapdump` | Heap dump |
| `/actuator/prometheus` | Prometheus-format metrics |
| `/actuator/scheduledtasks` | Scheduled tasks |
| `/actuator/startup` | Startup steps |

## Spring Boot CLI

The CLI provides a `spring` command for running scripts and managing projects:

```bash
spring init my-app --dependencies=web,data-jpa,security
spring run app.groovy
spring --version
```

## Tools

- **Spring Initializr:** <https://start.spring.io/>
- **Spring Boot Dashboard** (IntelliJ IDEA plugin).
- **Spring Boot DevTools:** Auto-restart on file changes.
- **Cloud Native Buildpacks:** <https://buildpacks.io/>
- **Spring Tools (Eclipse):** <https://spring.io/tools>

## Books

- *Spring Boot in Action* — Craig Walls (Manning).
- *Spring Boot: Up and Running* — Mark Heckler (O'Reilly).
- *Learning Spring Boot 3* — Greg L. Turnquist (O'Reilly).
- *Spring Boot 3.0 Cookbook* — Felip Miguel Puig (Packt).
- *Pro Spring Boot 3* — Felipe Gutierrez (Apress).