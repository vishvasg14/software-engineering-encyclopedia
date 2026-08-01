// 12 — Idempotency keys (TypeScript)

import { v4 as uuidv4 } from 'uuid';

interface CachedResult<T> {
    status: number;
    body: T;
    timestamp: number;
}

class IdempotencyStore {
    private results = new Map<string, CachedResult<unknown>>();

    get<T>(key: string): CachedResult<T> | undefined {
        const cached = this.results.get(key);
        if (!cached) return undefined;
        if (Date.now() - cached.timestamp > 24 * 60 * 60 * 1000) {
            this.results.delete(key);  // expire after 24h
            return undefined;
        }
        return cached as CachedResult<T>;
    }

    put<T>(key: string, status: number, body: T) {
        this.results.set(key, { status, body, timestamp: Date.now() });
    }
}

const store = new IdempotencyStore();

// === Middleware ===
async function idempotencyMiddleware(req: any, res: any, next: () => Promise<void>) {
    const key = req.headers['idempotency-key'];
    if (!key) {
        res.status(400).json({ error: 'Idempotency-Key required' });
        return;
    }

    // Check cache
    const cached = store.get(key);
    if (cached) {
        console.log(`Returning cached result for ${key}`);
        res.status(cached.status).json(cached.body);
        return;
    }

    // Capture result and store
    res.on('finish', () => {
        if (res.statusCode < 500) {
            store.put(key, res.statusCode, res.body);
        }
    });

    await next();
}

// === Usage ===
async function createPayment(req: any, res: any) {
    const paymentId = uuidv4();
    res.json({ paymentId, status: 'created', amount: req.body.amount });
}

import express from 'express';
const app = express();
app.use(express.json());
app.post('/payments', idempotencyMiddleware, createPayment);
app.listen(3000);