public class BadLoop {
    static volatile double sink;

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            // No back-edge, no safepoint poll
            long n = 0;
            while (!Thread.currentThread().isInterrupted()) {
                double x = Math.sin(n++);
                sink = x;
            }
        });
        t.start();
        Thread.sleep(2000);
        System.out.println("Triggering GC...");
        long t0 = System.nanoTime();
        System.gc();
        long t1 = System.nanoTime();
        System.out.println("System.gc() took: " + (t1 - t0) / 1_000_000 + " ms");
        Thread.sleep(2000);
        t.interrupt();
    }
}