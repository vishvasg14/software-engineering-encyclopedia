// 08 — Clean Architecture (TypeScript)

// === Entities (innermost) ===
// Domain entities with no dependencies on outer layers.

class Order {
    constructor(
        public id: string,
        public customerId: string,
        public lines: { productId: string; quantity: number; price: number }[],
        public status: 'placed' | 'paid' | 'shipped' | 'cancelled' = 'placed'
    ) {}

    get total(): number {
        return this.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    }
}

// === Use Cases (Application Business Rules) ===
// Orchestrate flow; depend only on Entities.

interface OrderRepository {
    save(order: Order): Promise<void>;
    findById(id: string): Promise<Order | null>;
}

interface PaymentService {
    authorize(orderId: string, amount: number): Promise<string>;
}

class PlaceOrderUseCase {
    constructor(
        private orderRepo: OrderRepository,
        private paymentService: PaymentService
    ) {}

    async execute(customerId: string, lines: Order['lines']): Promise<Order> {
        const order = new Order(crypto.randomUUID(), customerId, lines);
        await this.paymentService.authorize(order.id, order.total);
        await this.orderRepo.save(order);
        return order;
    }
}

// === Interface Adapters ===
// Translate between use cases and external systems.

class PostgresOrderRepository implements OrderRepository {
    async save(order: Order) {
        console.log(`Saving order ${order.id} to Postgres`);
    }
    async findById(id: string) {
        console.log(`Fetching order ${id}`);
        return null;
    }
}

class StripePaymentService implements PaymentService {
    async authorize(orderId: string, amount: number) {
        console.log(`Authorizing ${orderId} for $${amount} via Stripe`);
        return 'payment-id';
    }
}

// === Frameworks & Drivers (outermost) ===
// HTTP, CLI, etc. — only this layer knows about Express, etc.

import express from 'express';

const app = express();

const orderRepo = new PostgresOrderRepository();
const paymentService = new StripePaymentService();
const placeOrder = new PlaceOrderUseCase(orderRepo, paymentService);

app.post('/orders', express.json(), async (req, res) => {
    const order = await placeOrder.execute(req.body.customerId, req.body.lines);
    res.json(order);
});

app.listen(3000);