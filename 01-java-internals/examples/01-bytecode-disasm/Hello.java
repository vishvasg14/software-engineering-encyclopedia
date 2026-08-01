public class Hello {
    public static void main(String[] args) {
        long start = System.nanoTime();
        int sum = 0;
        for (int i = 0; i < 1_000_000; i++) {
            sum += i;
        }
        long elapsed = System.nanoTime() - start;
        System.out.println("sum=" + sum + " elapsed=" + elapsed);
    }
}