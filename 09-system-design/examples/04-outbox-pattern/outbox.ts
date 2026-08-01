// 04 — Transactional outbox (TypeScript + SQL)

import { Pool } from 'pg';

const pool = new Pool({ /* ... */ });

// === Outbox table ===
// CREATE TABLE outbox (
//   id UUID PRIMARY KEY,
//   aggregate_type TEXT NOT NULL,
//   aggregate_id TEXT NOT NULL,
//   event_type TEXT NOT NULL,
//   payload JSONB NOT NULL,
//   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//   published_at TIMESTAMPTZ
// );

interface OutboxEvent {
    id: string;
    aggregateType: string;
    aggregateId: string;
    eventType: string;
    payload: unknown;
    createdAt: Date;
    publishedAt?: Date;
}

// === Service that writes business state AND outbox in same transaction ===
async function createOrder(userId: string, amount: number) {
    const orderId = crypto.randomUUID();

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Write business state
        await client.query(
            'INSERT INTO orders (id, user_id, amount) VALUES ($1, $2, $3)',
            [orderId, userId, amount]
        );

        // 2. Write outbox event (in same transaction)
        await client.query(
            `INSERT INTO outbox (id, aggregate_type, aggregate_id, event_type, payload)
             VALUES ($1, $2, $3, $4, $5)`,
            [crypto.randomUUID(), 'Order', orderId, 'OrderCreated', { orderId, userId, amount }]
        );

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

// === Poller: reads outbox, publishes to broker, marks published ===
async function pollAndPublish() {
    const client = await pool.connect();
    try {
        const result = await client.query<OutboxEvent>(`
            SELECT * FROM outbox
            WHERE published_at IS NULL
            ORDER BY created_at
            LIMIT 100
        `);

        for (const event of result.rows) {
            try {
                // Publish to broker (Kafka, RabbitMQ, etc.)
                await publishToBroker(event.eventType, event.payload);

                // Mark as published
                await client.query(
                    'UPDATE outbox SET published_at = NOW() WHERE id = $1',
                    [event.id]
                );
            } catch (err) {
                console.error(`Failed to publish event ${event.id}:`, err);
                // Will retry on next poll
            }
        }
    } finally {
        client.release();
    }
}

async function publishToBroker(eventType: string, payload: unknown) {
    console.log(`Publishing ${eventType}:`, payload);
    // await kafka.send({ topic: 'orders', messages: [...] });
}

// Run the poller periodically
setInterval(pollAndPublish, 5000);