// 10 — Onion architecture (TypeScript)

// === Layer 1: Domain Model (innermost) ===
class Order {
    constructor(
        public id: string,
        public customerId: string,
        public total: number,
        public status: 'pending' | 'paid' = 'pending'
    ) {}
}

// === Layer 2: Domain Services ===
interface IOrderRepository {
    save(order: Order): Promise<void>;
    findById(id: string): Promise<Order | null>;
}

class OrderDomainService {
    constructor(private repo: IOrderRepository) {}

    async placeOrder(customerId: string, amount: number): Promise<Order> {
        const order = new Order(crypto.randomUUID(), customerId, amount);
        await this.repo.save(order);
        return order;
    }
}

// === Layer 3: Application Services ===
class OrderApplicationService {
    constructor(private orderService: OrderDomainService) {}

    async handle(input: { customerId: string; amount: number }) {
        if (input.amount <= 0) throw new Error('Invalid amount');
        return this.orderService.placeOrder(input.customerId, input.amount);
    }
}

// === Layer 4: Infrastructure (outermost) ===
class PostgresOrderRepository implements IOrderRepository {
    async save(order: Order) { console.log(`[Postgres] saved ${order.id}`); }
    async findById(id: string) { return null; }
}

// === Wire up ===
const repo = new PostgresOrderRepository();
const domainService = new OrderDomainService(repo);
const appService = new OrderApplicationService(domainService);

appService.handle({ customerId: 'c1', amount: 100 });