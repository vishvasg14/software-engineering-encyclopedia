// 13 — Chaos Monkey for Spring Boot (Java)

import com.code_intelligence.jazzer.api.FuzzedDataProvider;
import com.code_intelligence.jazzer.junit.FuzzTest;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.HashMap;
import java.util.Map;

public class ChaosDemo {

    private final Map<String, String> data = new HashMap<>();
    private final AtomicInteger requests = new AtomicInteger(0);

    public String get(String key) {
        requests.incrementAndGet();
        return data.get(key);
    }

    public void put(String key, String value) {
        requests.incrementAndGet();
        data.put(key, value);
    }

    public int getRequestCount() {
        return requests.get();
    }

    @FuzzTest
    void fuzzGet(FuzzedDataProvider data) {
        String key = data.consumeString(100);
        String result = get(key);
        assert result == null || result instanceof String;
    }
}

// Add Chaos Monkey to Spring Boot project:
// <dependency>
//     <groupId>io.github.softwaremagico</groupId>
//     <artifactId>kubernetes-chaos-test-framework</artifactId>
//     <version>1.0.0</version>
//     <scope>test</scope>
// </dependency>

// Chaos Monkey Spring Boot example:
// @Configuration
// public class ChaosConfig {
//     @Bean
//     public LatencyAssassin latencyAssassin() {
//         LatencyAssassin assassin = new LatencyAssassin();
//         assassin.setLatency(0.1);
//         assassin.setEnabled(true);
//         return assassin;
//     }
// }

// Litmus (Kubernetes) example:
// apiVersion: litmuschaos.io/v1alpha1
// kind: ChaosEngine

// Game day: monthly; run chaos in staging first