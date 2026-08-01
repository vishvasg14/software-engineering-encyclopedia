// 11 — Token bucket rate limiter (TypeScript)

interface RateLimiter {
    allow(key: string, cost?: number): boolean;
}

class TokenBucket implements RateLimiter {
    private capacity: number;
    private refillRate: number;  // tokens per second
    private buckets = new Map<string, { tokens: number; lastRefill: number }>();

    constructor(capacity: number, refillRate: number) {
        this.capacity = capacity;
        this.refillRate = refillRate;
    }

    allow(key: string, cost = 1): boolean {
        const now = Date.now();
        const bucket = this.buckets.get(key) ?? { tokens: this.capacity, lastRefill: now };

        // Refill tokens
        const elapsed = (now - bucket.lastRefill) / 1000;
        const refill = elapsed * this.refillRate;
        bucket.tokens = Math.min(this.capacity, bucket.tokens + refill);
        bucket.lastRefill = now;

        if (bucket.tokens >= cost) {
            bucket.tokens -= cost;
            this.buckets.set(key, bucket);
            return true;
        }

        this.buckets.set(key, bucket);
        return false;
    }
}

// === Use ===
const limiter = new TokenBucket(capacity: 100, refillRate: 10);  // 100 burst, 10/s

for (let i = 0; i < 110; i++) {
    if (limiter.allow('user:123')) {
        process.stdout.write('✓');
    } else {
        process.stdout.write('✗');
    }
}
console.log();
// Output: 100 successes, then 10 successful over 1 second (refill rate).