// 09 — GraphQL subscriptions over WebSocket

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { execute, subscribe } from 'graphql';

const schema = makeExecutableSchema({
    typeDefs: /* GraphQL */ `
        type Query { hello: String }
        type Subscription {
            counter: Int!
            userCreated: User!
        }
        type User { id: ID!, name: String! }
    `,
    resolvers: {
        Query: { hello: () => 'world' },
        Subscription: {
            counter: {
                subscribe: () => {
                    let count = 0;
                    const id = setInterval(() => count++, 1000);
                    return {
                        [Symbol.asyncIterator]() {
                            return {
                                next: async () => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000));
                                    return { value: { counter: count }, done: false };
                                },
                                return: () => clearInterval(id),
                            };
                        },
                    };
                },
            },
            userCreated: {
                subscribe: () => {
                    return {
                        [Symbol.asyncIterator]() {
                            const queue: any[] = [];
                            const emit = (user: any) => queue.push(user);
                            return {
                                next: async () => {
                                    while (queue.length === 0) await new Promise((r) => setTimeout(r, 100));
                                    return { value: { userCreated: queue.shift() }, done: false };
                                },
                            };
                        },
                    };
                },
            },
        },
    },
});

const wsServer = new WebSocketServer({ port: 4000 });
useServer({ schema }, wsServer);

console.log('GraphQL WS server on :4000');