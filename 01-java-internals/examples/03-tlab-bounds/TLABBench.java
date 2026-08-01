public class TLABBench {
    static class Holder {
        long a, b, c, d, e, f, g, h;
    }

    public static void main(String[] args) throws InterruptedException {
        long durationMs = 5_000;
        long start = System.currentTimeMillis();
        long count = 0;
        while (System.currentTimeMillis() - start < durationMs) {
            for (int i = 0; i < 10_000; i++) {
                Holder h = new Holder();
                if (h.a == Long.MAX_VALUE) System.out.print("");
            }
            count += 10_000;
        }
        System.out.println("Allocated " + count + " objects in " + durationMs + "ms");
    }
}