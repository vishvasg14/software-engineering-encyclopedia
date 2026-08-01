// 13 — Basic WebSocket server (Node.js)

import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface Client extends WebSocket {
    id: string;
}

const clients = new Set<Client>();

wss.on('connection', (ws: WebSocket) => {
    const client = ws as Client;
    client.id = crypto.randomUUID();
    clients.add(client);
    console.log(`Client connected: ${client.id} (${clients.size} total)`);

    client.on('message', (data) => {
        const message = data.toString();
        console.log(`Message from ${client.id}: ${message}`);

        // Broadcast to all clients
        for (const c of clients) {
            if (c.readyState === WebSocket.OPEN) {
                c.send(JSON.stringify({
                    from: client.id,
                    message,
                    timestamp: Date.now(),
                }));
            }
        }
    });

    client.on('close', () => {
        clients.delete(client);
        console.log(`Client disconnected: ${client.id}`);
    });

    client.on('error', (err) => {
        console.error(`Client error: ${err}`);
    });

    // Welcome message
    client.send(JSON.stringify({ type: 'welcome', id: client.id }));
});

console.log('WebSocket server on :8080');