import java.nio.ByteBuffer;

public class Leak {
    public static void main(String[] args) throws Exception {
        // Without reference cleaner, direct buffers leak.
        for (int i = 0; i < 100_000; i++) {
            ByteBuffer.allocateDirect(1024 * 1024); // 1 MB
        }
        // Use NMT to see the leak: -XX:NativeMemoryTracking=detail
        System.out.println("Done allocating. Check native memory.");
    }
}