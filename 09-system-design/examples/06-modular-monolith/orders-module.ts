// 06 — Modular monolith (TypeScript)

// Each module has a clear public interface; cross-module access only via that interface.

// === Order module ===
namespace OrderModule {
    export interface Order {
        id: string;
        userId: string;
        amount: number;
    }

    export interface OrderService {
        create(userId: string, amount: number): Promise<Order>;
        get(id: string): Promise<Order | null>;
    }

    // Implementation not exported
    class OrderServiceImpl implements OrderService {
        private orders: Map<string, Order> = new Map();
        async create(userId: string, amount: number): Promise<Order> {
            const order: Order = { id: crypto.randomUUID(), userId, amount };
            this.orders.set(order.id, order);
            return order;
        }
        async get(id: string) { return this.orders.get(id) ?? null; }
    }

    export const orderService: OrderService = new OrderServiceImpl();
}

// === Inventory module ===
namespace InventoryModule {
    export interface InventoryService {
        reserve(orderId: string, items: string[]): Promise<void>;
    }
    class InventoryServiceImpl implements InventoryService {
        async reserve(orderId: string, items: string[]) { /* ... */ }
    }
    export const inventoryService: InventoryService = new InventoryServiceImpl();
}

// === Orchestration (uses public interfaces only) ===
class OrderFlow {
    async placeOrder(userId: string, amount: number, items: string[]) {
        const order = await OrderModule.orderService.create(userId, amount);
        await InventoryModule.inventoryService.reserve(order.id, items);
        return order;
    }
}

// Public surface
export { OrderModule, InventoryModule, OrderFlow };