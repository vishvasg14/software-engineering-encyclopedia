// 02 — JUnit 5 basics (Java)

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Calculator tests")
class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @Test
    @DisplayName("adds two positive numbers")
    void addsTwoPositives() {
        assertEquals(5, calculator.add(2, 3));
    }

    @Test
    @DisplayName("adds two negative numbers")
    void addsTwoNegatives() {
        assertEquals(-5, calculator.add(-2, -3));
    }

    @Test
    @DisplayName("divide by zero throws")
    void divideByZeroThrows() {
        assertThrows(ArithmeticException.class, () -> calculator.divide(1, 0));
    }

    @ParameterizedTest
    @DisplayName("multiplying by zero gives zero")
    @ValueSource(ints = {0, 1, 2, 100, -1, Integer.MAX_VALUE})
    void multiplyByZero(int value) {
        assertEquals(0, calculator.multiply(value, 0));
    }

    @Test
    @Disabled("bug fix in progress")
    void disabledTest() {
        // won't run
    }

    @TestFactory
    @DisplayName("dynamic test factory")
    Iterable<DynamicNode> dynamicTests() {
        return java.util.Arrays.asList(
            dynamicTest("first dynamic", () -> assertEquals(1, 1)),
            dynamicTest("second dynamic", () -> assertEquals(2, 2))
        );
    }
}

class Calculator {
    public int add(int a, int b) { return a + b; }
    public int multiply(int a, int b) { return a * b; }
    public int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }
}