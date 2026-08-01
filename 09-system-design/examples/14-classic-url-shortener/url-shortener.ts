// 14 — URL shortener: full system design (TypeScript)

import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

// === Storage layer ===
const db = new Pool({ /* ... */ });
const redis = createClient({ /* ... */ });
await redis.connect();

// === Schema ===
// CREATE TABLE urls (
//   short_code VARCHAR(10) PRIMARY KEY,
//   long_url TEXT NOT NULL,
//   user_id UUID,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   expires_at TIMESTAMPTZ
// );

// === Base62 encoding ===
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeBase62(num: bigint): string {
    let result = '';
    while (num > 0n) {
        result = BASE62[Number(num % 62n)] + result;
        num /= 62n;
    }
    return result.padStart(6, '0');
}

function decodeBase62(str: string): bigint {
    let result = 0n;
    for (const char of str) result = result * 62n + BigInt(BASE62.indexOf(char));
    return result;
}

// === Snowflake-like ID generator ===
class IdGenerator {
    private counter = 0n;
    private epoch = 1735603200000n;  // 2025-01-01
    private machineId = 1n;

    next(): bigint {
        const now = BigInt(Date.now()) - this.epoch;
        // 41 bits timestamp | 10 bits machine | 12 bits counter
        return (now << 22n) | (this.machineId << 12n) | (this.counter++ & 0xFFFn);
    }
}

const idGen = new IdGenerator();

// === Create short URL ===
app.post('/api/shorten', async (req: Request, res: Response) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl required' });
    }

    const id = idGen.next();
    const shortCode = encodeBase62(id);

    await db.query(
        'INSERT INTO urls (short_code, long_url) VALUES ($1, $2)',
        [shortCode, longUrl]
    );

    // Cache for fast lookups
    await redis.set(`url:${shortCode}`, longUrl, { EX: 60 * 60 });

    res.json({ shortCode, longUrl });
});

// === Redirect to long URL ===
app.get('/:shortCode', async (req: Request, res: Response) => {
    const { shortCode } = req.params;

    // 1. Check cache
    const cached = await redis.get(`url:${shortCode}`);
    if (cached) {
        return res.redirect(301, cached);
    }

    // 2. Fall back to DB
    const result = await db.query(
        'SELECT long_url FROM urls WHERE short_code = $1',
        [shortCode]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'not found' });
    }

    const longUrl = result.rows[0].long_url;
    await redis.set(`url:${shortCode}`, longUrl, { EX: 60 * 60 });
    res.redirect(301, longUrl);
});

// === Analytics ===
app.get('/api/stats/:shortCode', async (req: Request, res: Response) => {
    const clicks = await redis.get(`clicks:${req.params.shortCode}`);
    res.json({ shortCode: req.params.shortCode, clicks: clicks ?? 0 });
});

// === Concerns for production ===
// - Hash collisions: use 7+ chars, validate URL
// - Hot URLs: cache in CDN, in-memory L1
// - Analytics: separate event stream (Kafka)
// - Expiration: scheduled job
// - Abuse: rate limiting, fraud detection

app.listen(3000);