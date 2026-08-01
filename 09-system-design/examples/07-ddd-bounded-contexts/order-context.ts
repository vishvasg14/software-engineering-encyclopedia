// 07 — DDD bounded contexts (TypeScript)

// === Order Bounded Context ===
// Ubiquitous language: order, line item, total, place, fulfill, ship

namespace OrderContext {
    export type OrderStatus = 'placed' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled';

    // Aggregate root
    export class Order {
        constructor(
            public id: string,
            public customerId: string,  // reference to Customer context
            public lines: OrderLine[],
            public status: OrderStatus = 'placed'
        ) {
            if (lines.length === 0) throw new Error('Order must have at least one line');
        }

        get total(): number {
            return this.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
        }
    }

    export class OrderLine {
        constructor(
            public productId: string,  // reference to Catalog context
            public quantity: number,
            public price: number
        ) {}
    }

    export class OrderService {
        placeOrder(customerId: string, lines: OrderLine[]): Order {
            return new Order(crypto.randomUUID(), customerId, lines);
        }
    }
}

// === Customer Bounded Context ===
// Ubiquitous language: customer, profile, address, registration, preferences

namespace CustomerContext {
    export interface Customer {
        id: string;
        email: string;
        shippingAddress: Address;
    }

    export class Address {
        constructor(public street: string, public city: string, public zip: string) {}
    }

    export class CustomerService {
        private customers: Map<string, Customer> = new Map();
        register(email: string, address: Address): Customer {
            const customer: Customer = { id: crypto.randomUUID(), email, shippingAddress: address };
            this.customers.set(customer.id, customer);
            return customer;
        }
    }
}

// === Catalog Bounded Context ===
// Ubiquitous language: product, SKU, price, inventory, category

namespace CatalogContext {
    export interface Product {
        sku: string;
        name: string;
        price: number;
        stockLevel: number;
    }

    export class CatalogService {
        private products: Map<string, Product> = new Map();
        getBySku(sku: string): Product | null {
            return this.products.get(sku) ?? null;
        }
    }
}

// === Cross-context references ===
// OrderContext refers to customers by ID only (no Customer entity crossing boundary).
// This maintains context independence.

const orderService = new OrderContext.OrderService();
const customerService = new CustomerContext.CustomerService();
const catalogService = new CatalogContext.CatalogService();

const customer = customerService.register(
    'alice@example.com',
    new CustomerContext.Address('123 Main St', 'Springfield', '12345')
);
const product = catalogService.getBySku('SKU-1')!;
const order = orderService.placeOrder(
    customer.id,
    [new OrderContext.OrderLine(product.sku, 2, product.price)]
);
console.log('Order placed:', order.id, 'total:', order.total);