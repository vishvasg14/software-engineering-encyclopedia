# GraphQL Documentation Reference

The authoritative source for GraphQL is the GraphQL Foundation and the GraphQL specification. This file catalogs the GraphQL documentation pages referenced in the API document.

## Primary documentation

- **GraphQL Specification:** <https://spec.graphql.org/>
- **GraphQL Foundation:** <https://foundation.graphql.org/>
- **GraphQL GitHub:** <https://github.com/graphql/graphql-spec>
- **GraphQL.org:** <https://graphql.org/>
- **GraphQL Learn:** <https://graphql.org/learn/>

## Specifications

| Version | Year | Status |
|---------|------|--------|
| October 2021 | 2021 | Current stable |
| June 2018 | 2018 | Older |
| October 2021 | 2021 | Same |
| 2024 | 2024 | Latest |

## Reference implementations

- **graphql-js:** <https://github.com/graphql/graphql-js> (JavaScript reference)
- **graphql-java:** <https://github.com/graphql-java/graphql-java>
- **GraphQL.NET:** <https://github.com/graphql-dotnet/graphql-dotnet>
- **graphql-go:** <https://github.com/graph-gophers/graphql-go>
- **GraphQL Java Tools:** <https://www.graphql-java-generator.com/>
- **graphql-python:** <https://strawberry.rocks/> (Strawberry)
- **Ariadne:** Python (schema-first)
- **gqlgen:** Go (schema-first)
- **Apollo Server:** Node.js
- **Mercurius:** Node.js (Fastify)

## Topics referenced in the document

| Topic | URL |
|-------|-----|
| Type system | <https://spec.graphql.org/draft/#sec-Type-System> |
| Queries | <https://spec.graphql.org/draft/#sec-Language.Query-Language> |
| Mutations | <https://spec.graphql.org/draft/#sec-Language.Mutations> |
| Subscriptions | <https://spec.graphql.org/draft/#sec-Language.Subscriptions> |
| Validation | <https://spec.graphql.org/draft/#sec-Validation> |
| Execution | <https://spec.graphql.org/draft/#sec-Execution> |
| Coercion | <https://spec.graphql.org/draft/#sec-Coercion> |
| Schema definition language (SDL) | <https://spec.graphql.org/draft/#sec-Type-System> |

## Concepts

### Type system <a class="askgpt-btn" data-askgpt="Type system" title="Ask ChatGPT about this section">💬</a>

| Type | Description |
|------|-------------|
| `Scalar` | Primitive (Int, String, Boolean, Float, ID), or custom (Date, JSON) |
| `Object` | Type with fields |
| `Interface` | Abstract type |
| `Union` | Multiple types |
| `Enum` | Enumerated type |
| `Input` | Input type for mutations |
| `List` | `[Type]` |
| `NonNull` | `Type!` (required) |

### Queries <a class="askgpt-btn" data-askgpt="Queries" title="Ask ChatGPT about this section">💬</a>

```graphql
query GetUser($id: ID!) {
    user(id: $id) {
        id
        name
        email
        friends {
            name
        }
    }
}
```

### Mutations <a class="askgpt-btn" data-askgpt="Mutations" title="Ask ChatGPT about this section">💬</a>

```graphql
mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
        name
    }
}
```

### Subscriptions <a class="askgpt-btn" data-askgpt="Subscriptions" title="Ask ChatGPT about this section">💬</a>

```graphql
subscription OnMessage($chatId: ID!) {
    messageAdded(chatId: $chatId) {
        id
        content
        author {
            name
        }
    }
}
```

### Fragments <a class="askgpt-btn" data-askgpt="Fragments" title="Ask ChatGPT about this section">💬</a>

```graphql
fragment UserSummary on User {
    id
    name
    email
}

query {
    me {
        ...UserSummary
    }
}
```

### Variables <a class="askgpt-btn" data-askgpt="Variables" title="Ask ChatGPT about this section">💬</a>

```graphql
query GetUsers($limit: Int = 10, $offset: Int = 0) {
    users(limit: $limit, offset: $offset) {
        ...UserSummary
    }
}
```

### Aliases <a class="askgpt-btn" data-askgpt="Aliases" title="Ask ChatGPT about this section">💬</a>

```graphql
query {
    alice: user(id: "1") { name }
    bob: user(id: "2") { name }
}
```

### Directives <a class="askgpt-btn" data-askgpt="Directives" title="Ask ChatGPT about this section">💬</a>

GraphQL supports custom directives for cross-cutting concerns.

## N+1 problem

When a resolver calls another resolver in a loop:

```js
// Bad: N+1 queries
function userResolver(parent) {
    return db.query('SELECT * FROM users WHERE id = ?', [parent.userId]);
}

// Parent resolver fetches posts; each post triggers a user query
```

**DataLoader** solves this with batching:

```js
import DataLoader from 'dataloader';
const userLoader = new DataLoader(ids =>
    db.query('SELECT * FROM users WHERE id IN (?)', [ids])
);

function userResolver(parent) {
    return userLoader.load(parent.userId);
}
```

## Federation

Apollo Federation, GraphQL federation spec — multiple GraphQL services composed into a single API.

- Subgraph schemas declare their portion.
- Router (gateway) composes them.

## Persisted queries

APQ (Automatic Persisted Queries):

- Client sends a hash of the query instead of the full text.
- Server stores the query and returns the response.

Reduces bandwidth, prevents query injection.

## Security

- **Query depth limiting** — prevent deeply nested queries.
- **Query cost analysis** — limit expensive queries.
- **Rate limiting** per query.
- **Disable introspection** in production (or restrict).

## Operations

- **Subscriptions** via WebSocket or Server-Sent Events.
- **Queries and mutations** via HTTP POST (typically).

## Best practices

- Use SDL (schema definition language) for the type system.
- Use variables for user input.
- Use fragments for shared fields.
- Use aliases to avoid field conflicts.
- Implement DataLoader for N+1 prevention.

## Books

- *Learning GraphQL* — Eve Porcello, Alex Banks (O'Reilly).
- *GraphQL in Action* — Samer Buna (Manning).
- *Production GraphQL* — Marc-André Giroux (Subvert Productions).