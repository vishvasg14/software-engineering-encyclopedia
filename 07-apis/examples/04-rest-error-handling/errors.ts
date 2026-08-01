// 04 — RFC 7807 Problem Details error handling

import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

// Problem type registry
const PROBLEM_BASE = 'https://example.com/problems';

interface Problem {
    type: string;
    title: string;
    status: number;
    detail?: string;
    instance?: string;
    [extension: string]: unknown;
}

function problem(req: Request, status: number, type: string, title: string, detail?: string, extras?: Record<string, unknown>): Problem {
    const p: Problem = {
        type: `${PROBLEM_BASE}/${type}`,
        title,
        status,
        instance: req.originalUrl,
        ...extras,
    };
    if (detail) p.detail = detail;
    return p;
}

// Handlers
app.get('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = { id: req.params.id, name: 'Alice', email: 'alice@example.com' };
        if (user.id === '999') {
            throw new Error('User not found');
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Custom Problem 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next();
    res.status(404)
        .type('application/problem+json')
        .json(problem(req, 404, 'not-found', 'Resource not found'));
});

// Generic error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    if (err.message === 'User not found') {
        res.status(404)
            .type('application/problem+json')
            .json(problem(req, 404, 'user-not-found', 'User not found'));
        return;
    }
    res.status(500)
        .type('application/problem+json')
        .json(problem(req, 500, 'internal-error', 'Internal server error'));
});

app.listen(3000, () => console.log('Error handling demo on :3000'));