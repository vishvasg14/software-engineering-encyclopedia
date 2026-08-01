// 03 — REST versioning strategies

import express, { Request, Response } from 'express';

const app = express();

// Strategy 1: URI versioning (most common, visible, easy)
app.get('/v1/users', (req: Request, res: Response) => {
    res.json({ version: 'v1', users: [] });
});

app.get('/v2/users', (req: Request, res: Response) => {
    res.json({
        version: 'v2',
        data: [],
        pagination: { offset: 0, limit: 20, total: 0 },
    });
});

// Strategy 2: Header versioning (clean URLs)
app.get('/users', (req: Request, res: Response) => {
    const version = req.header('Accept-Version') || 'v1';

    if (version === 'v1') {
        return res.json({ version: 'v1', users: [] });
    }
    if (version === 'v2') {
        return res.json({
            version: 'v2',
            data: [],
            pagination: { offset: 0, limit: 20, total: 0 },
        });
    }
    res.status(400).json({
        type: 'https://example.com/problems/version-not-supported',
        title: 'API version not supported',
        status: 400,
        supported: ['v1', 'v2'],
    });
});

// Strategy 3: Media type versioning
app.get('/users-via-media-type', (req: Request, res: Response) => {
    const accept = req.header('Accept') || '';
    if (accept.includes('application/vnd.myapi.v1+json')) {
        return res.json({ version: 'v1', users: [] });
    }
    if (accept.includes('application/vnd.myapi.v2+json')) {
        return res.json({
            version: 'v2',
            data: [],
            pagination: { offset: 0, limit: 20, total: 0 },
        });
    }
    res.status(406).json({ error: 'Not Acceptable' });
});

// Sunsetting old versions
app.use((req: Request, res: Response, next) => {
    // Once v1 is sunset, redirect to v2
    if (req.path.startsWith('/v1/')) {
        res.set('Deprecation', 'true');
        res.set('Sunset', 'Sat, 31 Dec 2024 23:59:59 GMT');
        res.set('Link', '</v2' + req.path.slice(3) + '>; rel="successor-version"');
    }
    next();
});

app.listen(3000, () => console.log('Versioning demo on :3000'));