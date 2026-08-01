import java.util.ArrayList;
import java.util.List;

public class LoadGenerator {
    public static void main(String[] args) throws InterruptedException {
        long durationMs = 30_000;
        long start = System.currentTimeMillis();
        long allocCount = 0;
        while (System.currentTimeMillis() - start < durationMs) {
            // Allocate many small objects in TLAB
            List<Integer> list = new ArrayList<>(1000);
            for (int i = 0; i < 1000; i++) {
                list.add(i);
            }
            // Force one outside-TLAB allocation (large)
            if (allocCount % 100 == 0) {
                byte[] big = new byte[1024 * 1024]; // 1 MB
            }
            allocCount++;
            Thread.sleep(1);
        }
        System.out.println("Allocations: " + allocCount);
    }
}