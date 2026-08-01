// 09 — Hexagonal: ports and adapters (TypeScript)

// === Domain (core) ===
class Order {
    constructor(public id: string, public customerId: string, public total: number) {}
}

// === Ports (interfaces) ===
interface OrderPersistencePort {
    save(order: Order): Promise<void>;
}

interface NotificationPort {
    sendOrderConfirmation(order: Order): Promise<void>;
}

// === Use Case (driven by port interfaces) ===
class PlaceOrderUseCase {
    constructor(
        private persistence: OrderPersistencePort,
        private notifier: NotificationPort
    ) {}

    async execute(customerId: string, amount: number): Promise<Order> {
        const order = new Order(crypto.randomUUID(), customerId, amount);
        await this.persistence.save(order);
        await this.notifier.sendOrderConfirmation(order);
        return order;
    }
}

// === Driving Adapter (web) ===
import express from 'express';

const app = express();
app.use(express.json());

// Wired with driven adapters
const pgAdapter: OrderPersistencePort = {
    async save(order) { console.log(`[Postgres] saved ${order.id}`); },
};
const emailAdapter: NotificationPort = {
    async sendOrderConfirmation(order) { console.log(`[Email] sent for ${order.id}`); },
};
const placeOrder = new PlaceOrderUseCase(pgAdapter, emailAdapter);

app.post('/orders', async (req, res) => {
    const order = await placeOrder.execute(req.body.customerId, req.body.amount);
    res.json(order);
});
app.listen(3000);