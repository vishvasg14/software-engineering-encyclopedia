import java.lang.ref.Cleaner;
import java.nio.ByteBuffer;

public class Fixed {
    private static final Cleaner CLEANER = Cleaner.create();

    static class BufferHolder implements Runnable {
        private final long address;
        private final int capacity;

        BufferHolder(long address, int capacity) {
            this.address = address;
            this.capacity = capacity;
        }

        @Override
        public void run() {
            // In real code, call Unsafe.freeMemory(address) here
            System.out.println("Cleaner: freeing " + capacity + " bytes at 0x"
                    + Long.toHexString(address));
        }
    }

    public static ByteBuffer alloc(int size) {
        ByteBuffer buf = ByteBuffer.allocateDirect(size);
        CLEANER.register(buf, new BufferHolder(0L, size));
        return buf;
    }

    public static void main(String[] args) throws Exception {
        for (int i = 0; i < 10; i++) {
            ByteBuffer buf = alloc(1024 * 1024);
            // buf becomes unreachable at end of loop iteration
        }
        System.gc();
        Thread.sleep(100);
        System.gc();
        System.out.println("Done. Cleaners should have run.");
    }
}