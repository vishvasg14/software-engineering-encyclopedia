// 13 — Distributed lock (TypeScript with Redis-like API)

import { v4 as uuidv4 } from 'uuid';

interface RedisLike {
    set(key: string, value: string, mode: 'NX', expiryMs: number): Promise<'OK' | null>;
    eval(script: string, keys: string[], args: string[]): Promise<number>;
    del(key: string): Promise<void>;
}

const redis: RedisLike = /* inject real Redis client */;

const RELEASE_SCRIPT = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
    else
        return 0
    end
`;

class DistributedLock {
    constructor(private redis: RedisLike) {}

    async acquire(resource: string, ttlMs: number): Promise<string | null> {
        const token = uuidv4();
        const result = await this.redis.set(`lock:${resource}`, token, 'NX', ttlMs);
        if (result === 'OK') return token;
        return null;
    }

    async release(resource: string, token: string): Promise<boolean> {
        const result = await this.redis.eval(
            RELEASE_SCRIPT,
            [`lock:${resource}`],
            [token]
        );
        return result === 1;
    }

    async withLock<T>(resource: string, ttlMs: number, fn: () => Promise<T>): Promise<T | null> {
        const token = await this.acquire(resource, ttlMs);
        if (!token) return null;
        try {
            return await fn();
        } finally {
            await this.release(resource, token);
        }
    }
}

// === Use ===
const lock = new DistributedLock(redis);

async function criticalSection() {
    console.log('Inside critical section');
    return 'result';
}

const result = await lock.withLock('order-processing', 5000, criticalSection);
if (result) {
    console.log('Got lock, result:', result);
} else {
    console.log('Could not acquire lock');
}