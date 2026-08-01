// 05 — Strangler fig pattern (TypeScript)

import express, { Request, Response } from 'express';

const app = express();

// Feature flags for gradual migration
const featureFlags = {
    useNewUserService: false,  // toggle to start migration
    useNewOrderService: false,
};

// Legacy monolith handler
async function legacyUserHandler(req: Request, res: Response) {
    // Calls monolith
    res.json({ source: 'monolith', data: { /* ... */ } });
}

// New microservice handler
async function newUserHandler(req: Request, res: Response) {
    res.json({ source: 'microservice', data: { /* ... */ } });
}

// Router: routes to legacy or new based on feature flag
app.get('/api/users/:id', async (req, res) => {
    if (featureFlags.useNewUserService) {
        console.log('Routing to new user service');
        await newUserHandler(req, res);
    } else {
        console.log('Routing to legacy monolith');
        await legacyUserHandler(req, res);
    }
});

// Mirroring: route to new but also call legacy (for comparison)
app.get('/api/users/:id/mirrored', async (req, res) => {
    const [newResult, legacyResult] = await Promise.all([
        fetch(`http://new-user-service/users/${req.params.id}`).then((r) => r.json()).catch(() => null),
        fetch(`http://monolith/users/${req.params.id}`).then((r) => r.json()).catch(() => null),
    ]);
    res.json({ new: newResult, legacy: legacyResult });
});

// Gradual rollout via percentage
function shouldRouteToNewService(userId: string): boolean {
    // Route X% of traffic to new service
    const rolloutPercentage = 10;
    const hash = parseInt(userId.replace(/-/g, '').slice(0, 8), 16) % 100;
    return hash < rolloutPercentage;
}

app.get('/api/users/:id/percentage', async (req, res) => {
    if (shouldRouteToNewService(req.params.id)) {
        await newUserHandler(req, res);
    } else {
        await legacyUserHandler(req, res);
    }
});

app.listen(3000, () => console.log('Strangler router on :3000'));