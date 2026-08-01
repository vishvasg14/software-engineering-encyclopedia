# HTTP Specifications Reference

The authoritative source for HTTP is the IETF (Internet Engineering Task Force). This file catalogs the HTTP RFCs and key references used in the API document.

## Primary references

- **IETF HTTP Working Group:** <https://httpwg.org/>
- **HTTP RFCs:** <https://datatracker.ietf.org/wg/httpbis/documents/>
- **HTTP Archive (state of the web):** <https://httparchive.org/>
- **Mozilla MDN HTTP:** <https://developer.mozilla.org/en-US/docs/Web/HTTP>

## Key RFCs

| RFC | Title | Year |
|-----|-------|------|
| RFC 9110 | HTTP Semantics | 2022 |
| RFC 9111 | HTTP Caching | 2022 |
| RFC 9112 | HTTP/1.1 | 2022 |
| RFC 9113 | HTTP/2 | 2022 |
| RFC 9114 | HTTP/3 | 2022 |
| RFC 9000 | QUIC (transport for HTTP/3) | 2021 |
| RFC 9001 | QUIC invariants | 2021 |
| RFC 8941 | Structured Field Values | 2020 |
| RFC 8470 | HTTPSRR | 2018 |
| RFC 7807 | Problem Details for HTTP APIs | 2016 |
| RFC 7538 | The "2014-09-25" Style of RFC | 2015 |
| RFC 7231 | HTTP/1.1 Semantics (older) | 2014 |
| RFC 6265 | Cookies | 2011 |
| RFC 5246 | TLS 1.2 | 2008 |
| RFC 8446 | TLS 1.3 | 2018 |
| RFC 5288 | AES-GCM Cipher Suites | 2008 |

## HTTP versions

| Version | Year | Status |
|---------|------|--------|
| HTTP/0.9 | 1991 | Deprecated |
| HTTP/1.0 | 1996 | Legacy |
| HTTP/1.1 | 1997, 1999 | Still widely used |
| HTTP/2 | 2015 | Adopted broadly |
| HTTP/3 | 2022 | Growing adoption |

## Topics referenced in the document

| Topic | URL |
|-------|-----|
| HTTP semantics | <https://www.rfc-editor.org/rfc/rfc9110.html> |
| HTTP caching | <https://www.rfc-editor.org/rfc/rfc9111.html> |
| HTTP/2 | <https://www.rfc-editor.org/rfc/rfc9113.html> |
| HTTP/3 | <https://www.rfc-editor.org/rfc/rfc9114.html> |
| QUIC | <https://www.rfc-editor.org/rfc/rfc9000.html> |
| Problem Details | <https://www.rfc-editor.org/rfc/rfc7807.html> |
| TLS 1.3 | <https://www.rfc-editor.org/rfc/rfc8446.html> |
| Cookies | <https://www.rfc-editor.org/rfc/rfc6265.html> |

## HTTP semantics basics

### Methods <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Methods'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Methods" title="Ask ChatGPT about this section">💬</a>

| Method | Idempotent | Safe | Description |
|--------|-----------|------|-------------|
| GET | Yes | Yes | Retrieve a resource |
| HEAD | Yes | Yes | Same as GET, no body |
| POST | No | No | Create a resource |
| PUT | Yes | No | Replace a resource |
| PATCH | No | No | Partial update |
| DELETE | Yes | No | Delete a resource |
| OPTIONS | Yes | Yes | Describe communication options |
| TRACE | Yes | Yes | Echo back received request |

### Status codes <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Status%20codes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Status codes" title="Ask ChatGPT about this section">💬</a>

| Class | Range | Meaning |
|-------|-------|---------|
| 1xx | 100-199 | Informational |
| 2xx | 200-299 | Success |
| 3xx | 300-399 | Redirection |
| 4xx | 400-499 | Client error |
| 5xx | 500-599 | Server error |

**Common status codes:**

| Code | Name | Use |
|------|------|-----|
| 200 | OK | Success (GET, PUT) |
| 201 | Created | Success (POST creating resource) |
| 202 | Accepted | Async processing |
| 204 | No Content | Success, no body |
| 301 | Moved Permanently | Resource moved |
| 302 | Found | Temporary redirect |
| 304 | Not Modified | Cached version |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Auth required |
| 403 | Forbidden | Auth present but insufficient |
| 404 | Not Found | Resource missing |
| 405 | Method Not Allowed | |
| 409 | Conflict | Version conflict |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Server Error | Generic |
| 502 | Bad Gateway | Upstream error |
| 503 | Service Unavailable | Maintenance / overload |
| 504 | Gateway Timeout | |

### Headers <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Headers'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Headers" title="Ask ChatGPT about this section">💬</a>

**Request headers:**

| Header | Use |
|--------|-----|
| `Host` | Server name |
| `User-Agent` | Client identification |
| `Accept` | Acceptable response types |
| `Accept-Language` | Acceptable languages |
| `Authorization` | Auth credentials |
| `Cookie` | Cookies |
| `Content-Type` | Request body type |
| `If-Match` | Conditional request (ETag) |
| `If-None-Match` | Conditional request (ETag) |
| `If-Modified-Since` | Conditional GET |

**Response headers:**

| Header | Use |
|--------|-----|
| `Content-Type` | Response body type |
| `Content-Length` | Body size |
| `Cache-Control` | Caching directives |
| `ETag` | Entity tag for caching |
| `Last-Modified` | Last modification time |
| `Location` | Redirect target |
| `Set-Cookie` | Set cookies |
| `Server` | Server identification |
| `X-Request-ID` | Request tracing ID |

## Cache directives (Cache-Control)

- `no-cache` — must revalidate.
- `no-store` — must not cache.
- `public` — cacheable by any cache.
- `private` — cacheable only by browser.
- `max-age=N` — fresh for N seconds.
- `s-maxage=N` — fresh for shared cache.
- `must-revalidate` — revalidate when stale.

## Content negotiation

- `Accept: application/json` — preferred response format.
- `Accept-Language: en-US,en;q=0.9` — preferred languages.
- `Accept-Encoding: gzip, br` — accepted compression.

## HTTP/2 features

- **Binary framing** — efficient parsing.
- **Multiplexing** — multiple requests over one connection.
- **Server push** — server can push resources (deprecated in practice).
- **Header compression (HPACK)** — reduces overhead.
- **Stream prioritization** — important requests get priority.

## HTTP/3 features

- **QUIC transport** — UDP-based, no head-of-line blocking.
- **0-RTT** — zero round-trip time for resumed connections.
- **Connection migration** — survives IP address changes.
- **Built-in encryption** — TLS 1.3 always.

## Tools

- **curl:** Command-line HTTP client.
- **Wireshark:** Packet analyzer.
- **nghttp2:** HTTP/2 implementation.
- **nghttpx:** HTTP/2 reverse proxy.
- **curl HTTP/3:** curl with HTTP/3 support.

## Books and resources

- *HTTP: The Definitive Guide* — David Gourley, Brian Totty, Marjorie Sayer, Anshu Aggarwal, Sailu Reddy (O'Reilly).
- *High Performance Browser Networking* — Ilya Grigorik (O'Reilly). Free online.
- MDN HTTP documentation: <https://developer.mozilla.org/en-US/docs/Web/HTTP>
- HTTP/2 specification: <https://httpwg.org/specs/rfc9113.html>