// 08 — Pact consumer-driven contract testing (TypeScript)

// === Consumer test (defines contract) ===
import { PactV3, MatchersV3, Verifier, LogLevel } from '@pact-foundation/pact';
import { provider } from '@pact-foundation/pact';
import { UserApi } from './user-api';
import { describe, it } from 'vitest';

const pact = new PactV3({
  consumer: 'user-frontend',
  provider: 'user-service',
  logLevel: LogLevel.INFO,
});

describe('Pact with user-service', () => {
  it('returns a user by id', async () => {
    await pact
      .given('user alice exists')
      .uponReceiving('a request to get user by id')
      .withRequest({
        method: 'GET',
        path: '/users/1',
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: 1,
          name: 'Alice',
          email: 'alice@example.com',
        },
      })
      .executeTest(async (mockServer) => {
        const api = new UserApi(mockServer.url);
        const user = await api.getUser(1);
        expect(user.id).toBe(1);
        expect(user.name).toBe('Alice');
      });
  });
});

// === Provider verification (in user-service repo) ===
// import { Verifier } from '@pact-foundation/pact';
//
// describe('Pact verification', () => {
//   it('validates against consumer contracts', async () => {
//     const verifier = new Verifier({
//       providerBaseUrl: 'http://localhost:8080',
//       pactBrokerUrl: process.env.PACT_BROKER_URL!,
//       pactBrokerToken: process.env.PACT_BROKER_TOKEN,
//     });

//     const result = await verifier.verifyProvider();

//     expect(result.success).toBe(true);
//   });
// });

// === Pact Broker (dev mode) ===
// docker run -d -p 9292:9292 --name pact-broker pactfoundation/pact-broker

// Publish pact (from consumer):
// $ npx pact-broker publish dist/pacts \
//     --broker-base-url http://localhost:9292 \
//     --consumer-version 1.0.0 \
//     --tag dev

// Verify pact (from provider):
// $ npx pact-broker can-i-deploy \
//     --pacticipant user-service \
//     --version 1.0.0 \
//     --environment production