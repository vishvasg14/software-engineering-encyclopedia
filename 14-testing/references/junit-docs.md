# JUnit Documentation Reference

The authoritative source for JUnit is the official documentation. This file catalogs the JUnit documentation pages referenced in the Testing document.

## Primary documentation

- **JUnit 5:** <https://junit.org/junit5/>
- **JUnit 5 User Guide:** <https://junit.org/junit5/docs/current/user-guide/>
- **JUnit 5 GitHub:** <https://github.com/junit-team/junit5>
- **JUnit 4:** <https://junit.org/junit4/>

## Key features in JUnit 5

| Feature | Description |
|---------|-------------|
| **@Test** | Marks method as a test |
| **@DisplayName** | Human-readable test name |
| **@BeforeEach / @AfterEach** | Setup / teardown per test |
| **@BeforeAll / @AfterAll** | Setup / teardown per class |
| **@Disabled** | Skip a test |
| **@Tag** | Group tests |
| **@Nested** | Nested test classes |
| **@ParameterizedTest** | Parameterized tests |
| **@TestFactory** | Dynamic tests |
| **Assertions** | `assertEquals`, `assertTrue`, `assertThrows`, etc. |
| **Assumptions** | `assumeTrue`, `assumeFalse` |
| **DI in tests** | `@TestInstance`, `@RegisterExtension` |

## Lifecycle annotations

```java
@BeforeAll      // Once before all tests in class
@BeforeEach     // Before each test
@AfterEach      // After each test
@AfterAll       // Once after all tests in class
@Test           // Marks method as a test
@Disabled       // Skip this test
```

## Assertions

```java
// Simple assertions
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(value);
assertNotNull(value);
assertSame(expected, actual);
assertNotSame(unexpected, actual);
assertThrows(IllegalArgumentException.class, () -> service.foo());

// Group assertions
assertAll(
    () -> assertEquals(1, user.getId()),
    () -> assertEquals("Alice", user.getName())
);

// Exception assertions
assertThrows(RuntimeException.class, () -> service.method());
assertDoesNotThrow(() -> service.method());
```

## Parameterized tests

```java
@ParameterizedTest
@ValueSource(ints = {1, 2, 3, 4, 5})
void testPositiveNumbers(int n) {
    assertTrue(n > 0);
}

@ParameterizedTest
@CsvSource({
    "1, 1, 2",
    "2, 3, 5",
    "10, 20, 30"
})
void testAddition(int a, int b, int expected) {
    assertEquals(expected, a + b);
}

@ParameterizedTest
@MethodSource("testCases")
void testWithMethodSource(int input, int expected) {
    assertEquals(expected, process(input));
}

static Stream<Arguments> testCases() {
    return Stream.of(
        Arguments.of(1, 1),
        Arguments.of(2, 4)
    );
}
```

## Conditional test execution

```java
@EnabledOnOs(OS.LINUX)
@DisabledOnOs(OS.WINDOWS)
@Test
void testLinuxOnly() { ... }

@EnabledIfEnvironmentVariable(named = "CI", matches = "true")
@Test
void testOnlyInCI() { ... }
```

## Nested tests

```java
@DisplayName("User service")
class UserServiceTest {

    @Nested
    @DisplayName("createUser")
    class CreateUserTests {
        @Test void createsWithValidData() { ... }
        @Test void failsOnInvalidEmail() { ... }
    }

    @Nested
    @DisplayName("deleteUser")
    class DeleteUserTests {
        @Test void deletesExistingUser() { ... }
    }
}
```

## Test execution order

JUnit 5 default order:

1. `@BeforeAll` (once).
2. For each test: `@BeforeEach` → `@Test` → `@AfterEach`.
3. `@AfterAll` (once).

Deterministic but not predictable (use `@Order` for explicit order).

## Test instance lifecycle

```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)  // one instance per class
@TestInstance(TestInstance.Lifecycle.PER_METHOD)  // one per method (default)
```

## Extensions

- `SpringExtension` (Spring Test).
- `MockitoExtension` (Mockito).
- `TestcontainersExtension` (Testcontainers).
- `RestAssuredExtension`.

```java
@ExtendWith(MockitoExtension.class)
class MyTest {
    @Mock private Dependency dep;

    @Test
    void testSomething() {
        when(dep.method()).thenReturn("value");
    }
}
```

## AssertJ

Fluent assertions (recommended):

```java
import static org.assertj.core.api.Assertions.*;

assertThat(user.getName()).isEqualTo("Alice");
assertThat(users).hasSize(3).extracting(User::getName).contains("Alice", "Bob");
assertThatThrownBy(() -> service.process()).isInstanceOf(IllegalArgumentException.class);
```

## JUnit 5 architecture

```
JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage
- Platform: test engine API
- Jupiter: new programming model
- Vintage: JUnit 4 compatibility
```

## Maven / Gradle

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
```

## Tools

- **Maven Surefire Plugin:** runs tests during `mvn test`.
- **Gradle Test Task:** runs `gradle test`.
- **Gradle Test Reports:** HTML reports.
- **IntelliJ IDEA:** built-in test runner.
- **Eclipse:** built-in.
- **VS Code:** Test Explorer.