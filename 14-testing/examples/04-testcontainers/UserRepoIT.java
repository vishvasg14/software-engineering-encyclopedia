// 04 — Testcontainers (Java)

import org.junit.jupiter.api.*;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
class UserRepoIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
        .withDatabaseName("test")
        .withUsername("test")
        .withPassword("test")
        .waitingFor(Wait.forListeningPort())
        .withStartupTimeout(Duration.ofMinutes(2));

    @Container
    static GenericContainer<?> redis = new GenericContainer<>(DockerImageName.parse("redis:7-alpine"))
        .withExposedPorts(6379)
        .waitingFor(Wait.forListeningPort());

    @Test
    void postgresIsRunning() {
        assertTrue(postgres.isRunning());
        assertEquals(5432, postgres.getMappedPort(5432));
    }

    @Test
    void canConnectAndQueryPostgres() throws Exception {
        try (Connection conn = DriverManager.getConnection(
                postgres.getJdbcUrl(), postgres.getUsername(), postgres.getPassword());
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT 1 + 1 AS result")) {
            assertTrue(rs.next());
            assertEquals(2, rs.getInt("result"));
        }
    }

    @Test
    void redisIsRunning() {
        assertTrue(redis.isRunning());
    }

    @Test
    void schemaMigrationWorks() throws Exception {
        try (Connection conn = DriverManager.getConnection(
                postgres.getJdbcUrl(), postgres.getUsername(), postgres.getPassword());
             Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100))");
            stmt.execute("INSERT INTO users (id, name) VALUES (1, 'Alice')");
            ResultSet rs = stmt.executeQuery("SELECT name FROM users WHERE id = 1");
            assertTrue(rs.next());
            assertEquals("Alice", rs.getString("name"));
        }
    }

    @Test
    void multipleContainersCompose() {
        // Test that uses both DB and cache
        String jdbcUrl = postgres.getJdbcUrl();
        Integer redisPort = redis.getMappedPort(6379);
        assertNotNull(jdbcUrl);
        assertNotNull(redisPort);
    }
}