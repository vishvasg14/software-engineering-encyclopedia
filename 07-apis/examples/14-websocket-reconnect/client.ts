// 14 — Resilient WebSocket client with reconnect

class ResilientWebSocket {
    private ws: WebSocket | null = null;
    private url: string;
    private retries = 0;
    private maxRetries = 10;
    private listeners: ((data: string) => void)[] = [];
    private shouldReconnect = true;

    constructor(url: string) {
        this.url = url;
        this.connect();
    }

    connect(): void {
        console.log(`Connecting to ${this.url}...`);
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('Connected');
            this.retries = 0;  // Reset on success
        };

        this.ws.onmessage = (event) => {
            for (const listener of this.listeners) {
                listener(event.data);
            }
        };

        this.ws.onclose = () => {
            if (!this.shouldReconnect) return;
            if (this.retries >= this.maxRetries) {
                console.error('Max retries reached');
                return;
            }
            // Exponential backoff with jitter
            const delay = Math.min(30000, 1000 * 2 ** this.retries) + Math.random() * 1000;
            console.log(`Reconnecting in ${Math.round(delay)}ms (attempt ${this.retries + 1})`);
            this.retries++;
            setTimeout(() => this.connect(), delay);
        };

        this.ws.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
    }

    onMessage(listener: (data: string) => void): void {
        this.listeners.push(listener);
    }

    send(data: string): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
    }

    close(): void {
        this.shouldReconnect = false;
        if (this.ws) this.ws.close();
    }
}

// Usage
const client = new ResilientWebSocket('ws://localhost:8080');
client.onMessage((data) => console.log('Received:', data));
setInterval(() => client.send('Hello'), 5000);