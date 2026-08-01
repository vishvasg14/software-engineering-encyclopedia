// 14 — CDN-style caching (Express + TypeScript)

import express, { Request, Response } from 'express';

const app = express();

// Static assets — long cache, immutable
app.get('/static/*', (req: Request, res: Response) => {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.sendFile(`public/${req.path}`);
});

// HTML pages — short cache, with revalidation
app.get('/', (req: Request, res: Response) => {
    res.set('Cache-Control', 'public, max-age=60, must-revalidate');
    res.set('Vary', 'Accept-Encoding');
    res.render('index');
});

// API responses — different cache strategies
app.get('/api/public/products', (req: Request, res: Response) => {
    res.set('Cache-Control', 'public, max-age=300');  // 5 minutes
    res.set('Vary', 'Accept-Encoding, Accept');
    res.json(/* products */);
});

app.get('/api/user/profile', (req: Request, res: Response) => {
    res.set('Cache-Control', 'private, no-cache');  // user-specific
    res.json(/* user profile */);
});

app.get('/api/feed', (req: Request, res: Response) => {
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.set('Vary', 'Authorization, Accept-Encoding');
    res.json(/* feed */);
});

// Negative caching: cache 404s briefly
app.get('/api/lookup/:id', (req: Request, res: Response) => {
    const exists = false; // check
    if (!exists) {
        res.set('Cache-Control', 'public, max-age=30');
        return res.status(404).json({ error: 'not found' });
    }
    res.json(/* result */);
});

// Surrogate-Control: CDN-specific
app.get('/api/*', (req: Request, res: Response) => {
    res.set('Surrogate-Control', 'max-age=300');
    res.set('Cache-Control', 'public, max-age=60');
    // CDN revalidates every 60s, but origin says "you can keep for 300s"
    res.json(/* data */);
});

// ETag-based caching
app.get('/resource/:id', (req: Request, res: Response, next) => {
    const etag = `"${computeETag(req.params.id)}"`;
    if (req.header('If-None-Match') === etag) {
        return res.status(304).end();
    }
    res.set('ETag', etag);
    res.set('Cache-Control', 'public, max-age=3600');
    res.json(/* data */);
});

function computeETag(id: string): string {
    return `v1-${id}`;
}

app.listen(3000, () => console.log('CDN-style caching on :3000'));