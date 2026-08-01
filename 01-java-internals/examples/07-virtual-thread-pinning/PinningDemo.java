import java.time.Duration;

public class PinningDemo {
    public static void main(String[] args) throws Exception {
        long start = System.nanoTime();

        // Launch many virtual threads that each hold synchronized briefly.
        // In Java 21, this pins the carrier thread.
        Thread[] threads = new Thread[1000];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = Thread.startVirtualThread(() -> {
                synchronized (PinningDemo.class) {
                    try {
                        Thread.sleep(Duration.ofMillis(10));
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
        }
        for (Thread t : threads) t.join();

        long elapsedMs = (System.nanoTime() - start) / 1_000_000;
        System.out.println("Done in " + elapsedMs + " ms");

        // Check JFR for jdk.VirtualThreadPinned events
        // Run with -Djdk.tracePinnedThreads=full to see pinning in real time.
    }
}