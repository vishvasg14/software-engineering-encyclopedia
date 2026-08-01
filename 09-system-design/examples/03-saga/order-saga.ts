// 03 — Saga orchestration (TypeScript)

interface SagaStep {
    name: string;
    execute: () => Promise<void>;
    compensate: () => Promise<void>;
}

class Saga {
    private steps: SagaStep[] = [];
    private completed: SagaStep[] = [];

    addStep(step: SagaStep) { this.steps.push(step); }

    async run() {
        for (const step of this.steps) {
            try {
                await step.execute();
                this.completed.push(step);
                console.log(`  ✓ ${step.name}`);
            } catch (err) {
                console.log(`  ✗ ${step.name} failed: ${err}`);
                await this.compensate();
                throw err;
            }
        }
        console.log('Saga completed');
    }

    private async compensate() {
        // Compensate in reverse order
        for (let i = this.completed.length - 1; i >= 0; i--) {
            try {
                await this.completed[i].compensate();
                console.log(`  ↶ compensated ${this.completed[i].name}`);
            } catch (err) {
                console.error(`  Compensation failed for ${this.completed[i].name}:`, err);
            }
        }
    }
}

// === Order processing saga ===

const saga = new Saga();

saga.addStep({
    name: 'Reserve inventory',
    execute: async () => { /* call inventory service */ },
    compensate: async () => { /* release inventory */ },
});

saga.addStep({
    name: 'Authorize payment',
    execute: async () => { /* call payment service */ },
    compensate: async () => { /* void payment */ },
});

saga.addStep({
    name: 'Create shipment',
    execute: async () => { /* call shipping service */ },
    compensate: async () => { /* cancel shipment */ },
});

saga.addStep({
    name: 'Send confirmation',
    execute: async () => { /* send email */ },
    compensate: async () => { /* send cancellation email */ },
});

saga.run().catch(() => {
    console.log('Saga failed; compensations applied');
});