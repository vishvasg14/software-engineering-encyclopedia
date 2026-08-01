# Testcontainers Documentation Reference

The authoritative source for Testcontainers is the official documentation. This file catalogs the Testcontainers documentation pages referenced in the Testing document.

## Primary documentation

- **Testcontainers:** <https://testcontainers.com/>
- **Testcontainers Java:** <https://java.testcontainers.org/>
- **Testcontainers Node.js:** <https://node.testcontainers.org/>
- **Testcontainers Python:** <https://python.testcontainers.org/>
- **Testcontainers Go:** <https://golang.testcontainers.org/>
- **Testcontainers .NET:** <https://dotnet.testcontainers.org/>
- **Testcontainers Rust:** <https://rust.testcontainers.org/>

## Core concept

Testcontainers is a library that provides throwaway instances of databases, message brokers, web browsers, or any Docker container for testing. It works by running a Docker container, exposing its ports, and cleaning up after the test.

## Key features

| Feature | Description |
|---------|-------------|
| **Generic containers** | Run any Docker image |
| **Module libraries** | Pre-configured for popular services |
| **Reusable containers** | Share between tests |
| **Wait strategies** | TCP, HTTP, log, command |
| **Network access** | Expose ports |
| **Volume mounts** | Persistent test data |
| **Lifecycle** | With, before, after, stop |

## Java example

```java
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
class UserRepositoryTest {
    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("test")
            .withUsername("test")
            .withPassword("test");

    @Test
    void testUser() {
        String jdbcUrl = postgres.getJdbcUrl();
        // use jdbcUrl in your test
    }
}
```

## Module libraries

| Module | Purpose |
|--------|---------|
| `postgresql` | PostgreSQL container |
| `mysql` | MySQL container |
| `mongodb` | MongoDB container |
| `redis` | Redis container |
| `kafka` | Kafka container |
| `rabbitmq` | RabbitMQ container |
| `elasticsearch` | Elasticsearch container |
| `nginx` | nginx container |
| `localstack` | AWS services local |
| `k3s` | Local k8s |

## Generic container

```java
GenericContainer<?> redis = new GenericContainer<>("redis:7-alpine")
    .withExposedPorts(6379)
    .withEnv("REDIS_PASSWORD", "test");

redis.start();
int port = redis.getMappedPort(6379);
// connect to localhost:port
redis.stop();
```

## Wait strategies

```java
// Wait for log message
new GenericContainer("...")
    .waitingFor(Wait.forLogMessage(".*ready to accept connections.*\\n"))
    .start();

// Wait for HTTP endpoint
.waitingFor(Wait.forHttp("/health"))

// Wait for TCP port
.waitingFor(Wait.forListeningPort())
```

## Reusable containers with @Testcontainers

```java
@Testcontainers
class IntegrationTest {
    @Container
    static GenericContainer<?> redis = new GenericContainer<>("redis:7")
        .withReuse(true);  // share between test classes
}
```

## Docker Compose

```java
@Container
static DockerComposeContainer<?> env = new DockerComposeContainer(
    new File("docker-compose.yml"))
    .withExposedServices("api", 80)
    .withLocalCompose(true);
```

## Python example

```python
from testcontainers.postgres import PostgresContainer

with PostgresContainer("postgres:16-alpine") as pg:
    conn_str = pg.get_connection_url()
    # run tests
```

## Node.js example

```typescript
import { PostgreSqlContainer } from "@testcontainers/postgresql";

const container = await new PostgreSqlContainer("postgres:16-alpine").start();
const url = container.getConnectionUri();
// run tests
await container.stop();
```

## Reusable vs not

- **Reusable:** faster (don't recreate each test); set `withReuse(true)`.
- **Not reusable:** fresh state; slower but cleaner.

## Wait for log

```java
.waitingFor(
    Wait.forLogMessage(".*started.*")
        .withStartupTimeout(Duration.ofMinutes(2))
)
```

## Network

```java
// Get mapped port (host -> container)
int mappedPort = container.getMappedPort(6379);

// Get host
String host = container.getHost();
```

## Volumes

```java
.withClasspathResourceMapping("data.sql", "/docker-entrypoint-initdb.d/init.sql", BindMode.READ_ONLY)
```

## Lifecycle callbacks

```java
new GenericContainer<>("...")
    .withCreateContainerCmdModifier(cmd -> ...)
    .withCopyToContainer(Transferable.of("local.txt"), "/tmp/remote.txt")
    .withLogConsumer(outputFrame -> log.info(outputFrame.getUtf8String()))
```

## Best practices

- **Use specific image tags** (`postgres:16-alpine` not `latest`).
- **Reuse containers** for speed.
- **Use wait strategies** not sleeps.
- **Clean up** with try-with-resources or `@Testcontainers`.
- **Parallel tests** with `withReuse` plus per-class containers.
- **In CI,** use a Docker-enabled runner (e.g., GitHub Actions with `ubuntu-latest`).

## Common patterns

### Database per test class <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Database%20per%20test%20class'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Database per test class" title="Ask ChatGPT about this section">💬</a>

```java
@Testcontainers
class UserTest {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");
    // fresh DB per test class
}
```

### Shared database across classes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Shared%20database%20across%20classes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Shared database across classes" title="Ask ChatGPT about this section">💬</a>

```java
@Testcontainers(parallel = true)
class IntegrationTestBase {
    @Container
    static PostgreSQLContainer<?> SHARED_DB = new PostgreSQLContainer<>("postgres:16-alpine")
        .withReuse(true);
}
```

### Multiple containers <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Multiple%20containers'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Multiple containers" title="Ask ChatGPT about this section">💬</a>

```java
@Container
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

@Container
static GenericContainer<?> redis = new GenericContainer<>("redis:7")
    .withExposedPorts(6379);
```

## CI integration

```yaml
# GitHub Actions
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      docker:
        image: docker:dind
    steps:
      - uses: actions/checkout@v4
      - run: ./mvnw test
```

## Docker-out-of-docker

Testcontainers requires Docker. In CI:

- Use runners with Docker (GitHub Actions, GitLab, CircleCI).
- For DinD, use `docker:dind` service.
- For Kubernetes CI, use Kaniko or buildah.

## Tools

- Testcontainers Cloud: cloud-hosted containers for CI.
- AtomicJar: commercial Testcontainers enhancement.
- LocalStack: AWS services local.