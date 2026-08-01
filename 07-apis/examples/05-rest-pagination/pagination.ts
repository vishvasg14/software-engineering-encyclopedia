// 05 — REST pagination patterns

import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface User {
    id: string;
    name: string;
    email: string;
    active: boolean;
    createdAt: Date;
}

const users: User[] = Array.from({ length: 1000 }, (_, i) => ({
    id: String(i + 1),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    active: i % 4 !== 0,
    createdAt: new Date(2024, 0, 1 + (i % 365)),
}));

// Cursor-based pagination
interface CursorPage {
    data: User[];
    nextCursor: string | null;
}

function encodeCursor(user: User): string {
    return Buffer.from(`${user.createdAt.toISOString()},${user.id}`).toString('base64url');
}

function decodeCursor(cursor: string): { ts: string; id: string } | null {
    try {
        const decoded = Buffer.from(cursor, 'base64url').toString();
        const [ts, id] = decoded.split(',');
        return { ts, id };
    } catch {
        return null;
    }
}

app.get('/users', (req: Request, res: Response) => {
    const { cursor, limit = '20' } = req.query;
    const limitNum = Math.min(Number(limit), 100);

    let filtered = [...users];

    // Filter
    if (req.query.status === 'active') {
        filtered = filtered.filter((u) => u.active);
    }

    // Sort
    filtered.sort((a, b) => {
        const aTs = a.createdAt.getTime();
        const bTs = b.createdAt.getTime();
        if (aTs !== bTs) return aTs - bTs;
        return a.id.localeCompare(b.id);
    });

    // Cursor pagination
    let startIdx = 0;
    if (cursor) {
        const c = decodeCursor(cursor as string);
        if (c) {
            for (let i = 0; i < filtered.length; i++) {
                if (
                    filtered[i].createdAt.toISOString() > c.ts ||
                    (filtered[i].createdAt.toISOString() === c.ts && filtered[i].id >= c.id)
                ) {
                    startIdx = i + 1;
                    break;
                }
            }
        }
    }

    const page = filtered.slice(startIdx, startIdx + limitNum);
    const nextCursor = page.length === limitNum ? encodeCursor(page[page.length - 1]) : null;

    res.json({
        data: page,
        nextCursor,
    } as CursorPage);
});

// Sparse fieldsets
app.get('/users/:id', (req: Request, res: Response) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Not found' });
    }
    const fields = (req.query.fields as string)?.split(',') ?? Object.keys(user);
    const filtered: Record<string, unknown> = {};
    for (const field of fields) {
        if (field in user) (filtered as Record<string, unknown>)[field] = (user as Record<string, unknown>)[field];
    }
    res.json(filtered);
});

app.listen(3000, () => console.log('Pagination demo on :3000'));