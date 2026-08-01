// 01 — CQRS: separate write and read models (TypeScript)

import { v4 as uuidv4 } from 'uuid';

// === Write side (commands + aggregates + events) ===

interface OrderCommand {
    type: 'create' | 'cancel' | 'pay';
    orderId: string;
    amount?: number;
    userId?: string;
}

interface OrderEvent {
    type: 'created' | 'cancelled' | 'paid';
    orderId: string;
    amount?: number;
    userId?: string;
    timestamp: number;
}

class OrderAggregate {
    private events: OrderEvent[] = [];

    constructor(private state: { id: string; status: string; amount: number }) {}

    static create(userId: string, amount: number): OrderAggregate {
        const order = new OrderAggregate({ id: uuidv4(), status: 'pending', amount });
        order.events.push({ type: 'created', orderId: order.state.id, userId, amount, timestamp: Date.now() });
        return order;
    }

    pay() {
        if (this.state.status !== 'pending') throw new Error('Invalid state');
        this.state.status = 'paid';
        this.events.push({ type: 'paid', orderId: this.state.id, timestamp: Date.now() });
    }

    cancel() {
        this.state.status = 'cancelled';
        this.events.push({ type: 'cancelled', orderId: this.state.id, timestamp: Date.now() });
    }

    getEvents() { return this.events; }
    getState() { return this.state; }
}

// Event store (simplified)
const eventStore: { id: string; type: string; data: any }[] = [];

class EventBus {
    publish(event: OrderEvent) {
        eventStore.push({ id: uuidv4(), type: event.type, data: event });
    }
}

// === Read side (projections + queries) ===

interface OrderView {
    id: string;
    status: string;
    amount: number;
    userId?: string;
    createdAt: number;
    paidAt?: number;
}

class OrderProjection {
    private view: Map<string, OrderView> = new Map();

    handle(event: OrderEvent) {
        switch (event.type) {
            case 'created':
                this.view.set(event.orderId, {
                    id: event.orderId,
                    status: 'pending',
                    amount: event.amount!,
                    userId: event.userId,
                    createdAt: event.timestamp,
                });
                break;
            case 'paid': {
                const order = this.view.get(event.orderId);
                if (order) {
                    order.status = 'paid';
                    order.paidAt = event.timestamp;
                }
                break;
            }
            case 'cancelled': {
                const order = this.view.get(event.orderId);
                if (order) order.status = 'cancelled';
                break;
            }
        }
    }

    getOrder(id: string) { return this.view.get(id); }
}

// === Wire it up ===
const bus = new EventBus();
const projection = new OrderProjection();
bus.publish = ((originalPublish) => (event: OrderEvent) => {
    originalPublish(event);
    projection.handle(event);
})(bus.publish.bind(bus));

// === Use ===
const order = OrderAggregate.create('user-123', 99.99);
order.getEvents().forEach((e) => bus.publish(e));
console.log('Order created:', projection.getOrder(order.getState().id));

order.pay();
order.getEvents().forEach((e) => bus.publish(e));
console.log('After pay:', projection.getOrder(order.getState().id));