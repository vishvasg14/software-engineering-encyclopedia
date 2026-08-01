import java.util.ArrayList;
import java.util.List;

public class LogGenerator {
    public static void main(String[] args) throws InterruptedException {
        // Warm up
        for (int i = 0; i < 1_000_000; i++) {
            Object o = new Object();
            if (o == null) System.out.print("");
        }

        // Generate GC events
        List<byte[]> keep = new ArrayList<>();
        for (int round = 0; round < 10; round++) {
            for (int i = 0; i < 10_000; i++) {
                byte[] buf = new byte[1024]; // 1 KB
                if (keep.size() < 100) keep.add(buf);
            }
            Thread.sleep(500);
        }

        System.out.println("Done. " + keep.size() + " objects kept.");
    }
}