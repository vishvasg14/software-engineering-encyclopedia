// 15 — Server-Sent Events endpoint (Express)

import express, { Request, Response } from 'express';

const app = express();

app.get('/events', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send initial event
    res.write('event: connected\n');
    res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);

    // Send updates every 2 seconds
    const interval = setInterval(() => {
        const data = { time: Date.now(), value: Math.random() };
        res.write(`event: tick\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 2000);

    // Heartbeat (prevents proxy timeout)
    const heartbeat = setInterval(() => {
        res.write(`: heartbeat\n\n`);
    }, 30000);

    // Cleanup on disconnect
    req.on('close', () => {
        clearInterval(interval);
        clearInterval(heartbeat);
    });
});

app.listen(3000, () => console.log('SSE server on :3000'));

// Client (browser)
// const es = new EventSource('/events');
// es.addEventListener('tick', (event) => console.log(event.data));