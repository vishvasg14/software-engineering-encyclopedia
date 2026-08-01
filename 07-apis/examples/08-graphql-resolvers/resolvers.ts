// 08 — GraphQL resolvers with DataLoader to prevent N+1

import DataLoader from 'dataloader';

interface User {
    id: string;
    name: string;
    email: string;
}

interface Post {
    id: string;
    authorId: string;
    title: string;
}

const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
];
const posts: Post[] = [
    { id: '1', authorId: '1', title: 'Hello' },
    { id: '2', authorId: '1', title: 'World' },
    { id: '3', authorId: '2', title: 'Foo' },
];

// Mock DB accessors
async function getUserById(id: string): Promise<User | null> {
    // Simulated DB call
    return users.find((u) => u.id === id) ?? null;
}

async function getUsersByIds(ids: ReadonlyArray<string>): Promise<User[]> {
    // Batch fetch — would be a single SQL query with WHERE id IN (...)
    return users.filter((u) => ids.includes(u.id));
}

// DataLoader batches and caches per-request
const userLoader = new DataLoader<string, User>(async (ids) => {
    console.log(`Batch loading ${ids.length} users:`, ids);
    return getUsersByIds(ids);
});

export const resolvers = {
    Query: {
        me: () => users[0],
        user: (_: unknown, args: { id: string }) => userLoader.load(args.id),
        users: (_: unknown, args: { limit?: number }) => {
            const limit = args.limit ?? 20;
            return users.slice(0, limit);
        },
        feed: () => posts,
    },
    User: {
        // BAD: would cause N+1
        // posts: (parent) => db.findPosts({ authorId: parent.id }),
        // GOOD: DataLoader batches all calls within a single query
        posts: (parent: User) => posts.filter((p) => p.authorId === parent.id),
    },
    Post: {
        author: (parent: Post) => userLoader.load(parent.authorId),
    },
};