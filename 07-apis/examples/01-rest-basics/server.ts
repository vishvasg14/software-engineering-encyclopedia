// 01 — Basic REST endpoints with Express.js

import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface User {
    id: string;
    name: string;
    email: string;
}

const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
];

// GET /users
app.get('/users', (req: Request, res: Response) => {
    const { offset = '0', limit = '20' } = req.query;
    const start = Number(offset);
    const end = start + Number(limit);
    res.json({
        data: users.slice(start, end),
        pagination: { offset: start, limit: Number(limit), total: users.length },
    });
});

// GET /users/:id
app.get('/users/:id', (req: Request, res: Response) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// POST /users with idempotency
app.post('/users', (req: Request, res: Response) => {
    const idempotencyKey = req.header('Idempotency-Key');
    if (!idempotencyKey) {
        return res.status(400).json({ error: 'Idempotency-Key required' });
    }
    const newUser: User = {
        id: String(users.length + 1),
        name: req.body.name,
        email: req.body.email,
    };
    users.push(newUser);
    res.status(201)
        .header('Location', `/users/${newUser.id}`)
        .json(newUser);
});

// DELETE /users/:id
app.delete('/users/:id', (req: Request, res: Response) => {
    const idx = users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(idx, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log('Server on :3000'));