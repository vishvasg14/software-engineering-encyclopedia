# 13 — Security (OWASP, OAuth2, JWT, Encryption)

This chapter treats security at production depth: OWASP Top 10, threat modeling, OAuth2/OIDC/JWT authentication, TLS/mTLS transport, cryptography, compliance frameworks, secrets management, and incident response.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Security (OWASP, OAuth2, JWT, Encryption)](./security.md) | The flagship document: OWASP, OAuth2, JWT, TLS, crypto | 🚧 In progress |

## Related chapters

- [02 — JavaScript & TypeScript](../02-javascript-typescript/README.md) — CSP, CORS, XSS in browsers.
- [03 — SQL & Databases](../03-sql-databases/README.md) — SQL injection prevention.
- [04 — Spring Ecosystem](../04-spring-ecosystem/README.md) — Spring Security, OAuth2 integration.
- [05 — Frontend (Angular, Signals, RxJS)](../05-frontend/README.md) — Token storage, CORS.
- [07 — APIs (REST, GraphQL, gRPC, WebSocket)](../07-apis/README.md) — OAuth2, JWT, OWASP API Top 10.
- [10 — DevOps (Docker, Kubernetes, Helm, Istio)](../10-devops/README.md) — Container security, image scanning.
- [11 — Cloud (AWS, Azure, GCP)](../11-cloud/README.md) — IAM, KMS, security services.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (OWASP → Threat modeling → OAuth2 → OIDC → JWT → TLS → mTLS → Crypto → Secrets → Compliance)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- All previous chapters.
- HTTP basics.
- Cryptography basics.

## Version Baselines

- **OWASP Top 10:** 2021.
- **OAuth:** 2.1 (current draft).
- **OIDC:** Core 1.0.
- **JWT:** RFC 7519.
- **TLS:** 1.3 (RFC 8446).
- **NIST CSF:** 2.0.

## Folder Layout

```
13-security/
├── README.md
├── security.md
├── diagrams/
├── examples/                       # 16 security examples
│   ├── 01-owasp-top10/
│   ├── 02-threat-modeling/
│   ├── 03-sql-injection/
│   ├── 04-xss/
│   ├── 05-csrf/
│   ├── 06-oauth2-authorization-code/
│   ├── 07-oauth2-pkce/
│   ├── 08-oidc/
│   ├── 09-jwt/
│   ├── 10-tls-13/
│   ├── 11-mtls/
│   ├── 12-password-hashing/
│   ├── 13-secrets-management/
│   ├── 14-encryption-at-rest/
│   ├── 15-csp-headers/
│   └── 16-incident-response/
└── references/
    ├── owasp.md
    ├── oauth-rfcs.md
    ├── tls-rfcs.md
    └── nist-frameworks.md
```