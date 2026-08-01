// 02 — Event-driven architecture (TypeScript)

// Domain events
interface DomainEvent<T = unknown> {
    eventType: string;
    aggregateId: string;
    timestamp: number;
    data: T;
}

interface OrderCreatedEvent extends DomainEvent {
    eventType: 'OrderCreated';
    data: { userId: string; amount: number };
}

interface OrderShippedEvent extends DomainEvent {
    eventType: 'OrderShipped';
    data: { trackingNumber: string };
}

type Event = OrderCreatedEvent | OrderShippedEvent;

// Event bus
class EventBus {
    private handlers = new Map<string, Array<(event: Event) => void>>();

    subscribe<T extends Event>(eventType: T['eventType'], handler: (e: T) => void) {
        if (!this.handlers.has(eventType)) this.handlers.set(eventType, []);
        this.handlers.get(eventType)!.push(handler as (e: Event) => void);
    }

    publish(event: Event) {
        const handlers = this.handlers.get(event.eventType) ?? [];
        for (const handler of handlers) {
            try { handler(event); }
            catch (err) { console.error(`Handler error:`, err); }
        }
    }
}

const bus = new EventBus();

// === Services subscribe to events ===

// Notification service
bus.subscribe('OrderCreated', (e) => {
    console.log(`[Notification] Sending order email for order ${e.aggregateId}`);
});

// Inventory service
bus.subscribe('OrderCreated', (e) => {
    console.log(`[Inventory] Reserving items for order ${e.aggregateId}`);
});

// Shipping service
bus.subscribe('OrderShipped', (e) => {
    console.log(`[Shipping] Tracking ${e.data.trackingNumber} for order ${e.aggregateId}`);
});

// === Events ===
bus.publish({
    eventType: 'OrderCreated',
    aggregateId: 'order-1',
    timestamp: Date.now(),
    data: { userId: 'user-1', amount: 100 },
});

bus.publish({
    eventType: 'OrderShipped',
    aggregateId: 'order-1',
    timestamp: Date.now(),
    data: { trackingNumber: 'TRACK-123' },
});