# REST API Guidelines Reference

This file catalogs the canonical REST API design guidelines referenced in the API document.

## Primary guidelines

- **Microsoft REST API Guidelines:** <https://github.com/microsoft/api-guidelines>
- **Google API Design Guide:** <https://cloud.google.com/apis/design>
- **JSON:API specification:** <https://jsonapi.org/>
- **PayPal API Style Guide:** <https://github.com/paypal/api-style-guide>
- **Zalando RESTful API Guidelines:** <https://opensource.zalando.com/restful-api-guidelines/>
- **Roy Fielding's REST dissertation (2000):** <https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm>

## Key recommendations

### Resource modeling <a class="askgpt-btn" data-askgpt="Resource modeling" title="Ask ChatGPT about this section">💬</a>

- **Resources** — nouns, not verbs. `/users/123`, not `/getUser`.
- **Collections** — `/users`, `/orders`.
- **Sub-resources** — `/users/123/orders`.
- **Actions that don't fit CRUD** — `/users/123/activate` (verb on sub-resource).

### HTTP methods <a class="askgpt-btn" data-askgpt="HTTP methods" title="Ask ChatGPT about this section">💬</a>

- `GET` — safe, idempotent.
- `POST` — create, non-idempotent.
- `PUT` — replace, idempotent.
- `PATCH` — partial update.
- `DELETE` — delete, idempotent.
- `OPTIONS` — describe capabilities.
- `HEAD` — same as GET but no body.

### URL design <a class="askgpt-btn" data-askgpt="URL design" title="Ask ChatGPT about this section">💬</a>

- Plural nouns: `/users`, not `/user`.
- Lowercase, kebab-case.
- No verbs in URLs.
- Hierarchical: `/users/123/orders/456`.

### Status codes <a class="askgpt-btn" data-askgpt="Status codes" title="Ask ChatGPT about this section">💬</a>

- Use the right code (`200`, `201`, `204`, `400`, `404`, `409`, `422`).
- `5xx` for server errors, `4xx` for client errors.
- Return Problem Details (RFC 7807) for error responses.

### Versioning <a class="askgpt-btn" data-askgpt="Versioning" title="Ask ChatGPT about this section">💬</a>

- **URI version:** `/v1/users` (clear, visible).
- **Header version:** `Accept-Version: v1` (clean URLs).
- **Media type version:** `Accept: application/vnd.myapi.v1+json`.

### Pagination <a class="askgpt-btn" data-askgpt="Pagination" title="Ask ChatGPT about this section">💬</a>

- **Offset-based:** `?offset=20&limit=10` (simple, slow for large offsets).
- **Cursor-based:** `?cursor=abc&limit=10` (efficient, opaque).
- **Keyset pagination:** `?after_id=100&limit=10`.

### Filtering and sorting <a class="askgpt-btn" data-askgpt="Filtering and sorting" title="Ask ChatGPT about this section">💬</a>

- `?status=active&sort=-createdAt,name`.

### Idempotency <a class="askgpt-btn" data-askgpt="Idempotency" title="Ask ChatGPT about this section">💬</a>

- `Idempotency-Key` header for POST requests.
- Server stores the result for 24 hours.
- Same key returns same result.

### Caching <a class="askgpt-btn" data-askgpt="Caching" title="Ask ChatGPT about this section">💬</a>

- `Cache-Control: public, max-age=300` — cacheable.
- `ETag` — client can revalidate.

### Security <a class="askgpt-btn" data-askgpt="Security" title="Ask ChatGPT about this section">💬</a>

- TLS everywhere.
- Authentication: Bearer token / OAuth2.
- Authorization: role-based, scope-based.
- Input validation.
- Output encoding.
- CORS for browser APIs.
- CSP headers.

### Hypermedia (HATEOAS) <a class="askgpt-btn" data-askgpt="Hypermedia (HATEOAS)" title="Ask ChatGPT about this section">💬</a>

- Resources include links to related resources.
- `links: [{ "rel": "self", "href": "/users/123" }]`.

### Asynchronous operations <a class="askgpt-btn" data-askgpt="Asynchronous operations" title="Ask ChatGPT about this section">💬</a>

- Accept POST, return 202.
- Return a status URL: `Location: /jobs/456`.
- Client polls `GET /jobs/456` for status.
- Or use WebHook for callback.

## Problem Details (RFC 7807)

```json
{
    "type": "https://example.com/problems/out-of-credit",
    "title": "You do not have enough credit.",
    "status": 403,
    "detail": "Your current balance is 30, but that costs 50.",
    "instance": "/account/12345/msgs/abc",
    "balance": 30,
    "accounts": ["/account/12345", "/account/67890"]
}
```

## Pagination examples

### Offset-based <a class="askgpt-btn" data-askgpt="Offset-based" title="Ask ChatGPT about this section">💬</a>

```
GET /users?offset=20&limit=10

{
    "data": [...],
    "pagination": {
        "offset": 20,
        "limit": 10,
        "total": 1000
    }
}
```

### Cursor-based <a class="askgpt-btn" data-askgpt="Cursor-based" title="Ask ChatGPT about this section">💬</a>

```
GET /users?cursor=eyJpZCI6MTAwfQ==&limit=10

{
    "data": [...],
    "nextCursor": "eyJpZCI6MTEwfQ=="
}
```

## Filtering

```
GET /users?status=active&role=admin&createdAt=2024-01-01..2024-12-31
```

## Sort

```
GET /users?sort=-lastName,firstName
GET /users?sort=-createdAt:desc,lastName:asc
```

## Sparse fieldsets

```
GET /users?fields=id,name,email
```

## Standard error codes (RFC 7807 extension)

- `https://example.com/problems/validation`
- `https://example.com/problems/authentication`
- `https://example.com/problems/authorization`
- `https://example.com/problems/not-found`
- `https://example.com/problems/rate-limit`
- `https://example.com/problems/internal`

## Tools

- **OpenAPI Generator:** Generate clients from spec.
- **Postman:** API testing, documentation.
- **Insomnia:** REST and GraphQL client.
- **HTTPie:** Command-line HTTP client.

## Books

- *RESTful Web APIs* — Richardson, Amundsen, Ruby (O'Reilly).
- *REST in Practice* — Webber, Parastatidis, Robinson (O'Reilly).
- *API Design Patterns* — JJ Geewax (Manning).