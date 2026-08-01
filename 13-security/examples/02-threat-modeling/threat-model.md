# 02 — STRIDE threat model for "User Account Service"

## Application: User Account Service

A microservice that handles user registration, login, profile management, and password reset. Exposed via REST API. Uses PostgreSQL for storage. Deployed in Kubernetes.

## Data flow diagram (DFD)

```
[Client App] → HTTPS → [API Gateway / OAuth2] → [User Service] → SQL → [PostgreSQL]
                                                       ↓
                                                  [Audit Log]
```

## Trust boundaries

1. Client ↔ API Gateway (TLS, JWT validation)
2. API Gateway ↔ User Service (mTLS, JWT validation)
3. User Service ↔ PostgreSQL (TLS, password hashing)
4. User Service ↔ Audit Log (mTLS)

## STRIDE analysis

### Spoofing (S) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Spoofing%20(S)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Spoofing (S)" title="Ask ChatGPT about this section">💬</a>

| Threat | Mitigation |
|--------|-----------|
| Stolen credentials | MFA, strong password policy, rate limiting |
| Token theft | Short TTL, refresh token rotation, TLS only |
| Session hijacking | Secure session cookies, IP binding |
| Impersonation via JWT | Validate iss, aud, exp, signature |

### Tampering (T) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Tampering%20(T)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Tampering (T)" title="Ask ChatGPT about this section">💬</a>

| Threat | Mitigation |
|--------|-----------|
| Modify user data in DB | RBAC, input validation, audit log |
| Modify email content | TLS, DKIM/SPF/DMARC for email |
| Modify password hash | Hashing with salt (Argon2id) |

### Repudiation (R) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Repudiation%20(R)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Repudiation (R)" title="Ask ChatGPT about this section">💬</a>

| Threat | Mitigation |
|--------|-----------|
| User denies action | Audit log with timestamp and user ID |
| Admin denies data change | Immutable audit log |
| API denies data access | Application logs with trace ID |

### Information Disclosure (I) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Information%20Disclosure%20(I)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Information Disclosure (I)" title="Ask ChatGPT about this section">💬</a>

| Threat | Mitigation |
|--------|-----------|
| PII in logs | Log filter; PII tagging; data masking |
| PII in error messages | Generic error messages |
| Email enumeration | Rate limit; same response for valid/invalid |
| Timing attacks | Constant-time comparison for tokens |
| Backup data leak | Encrypted backups; access controls |

### Denial of Service (D) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Denial%20of%20Service%20(D)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Denial of Service (D)" title="Ask ChatGPT about this section">💬</a>

| Threat | Mitigation |
|--------|-----------|
| Login brute force | Rate limiting per IP and per user |
| Resource exhaustion | Connection pool limits; queue limits |
| Large payload DoS | Request size limits; rate limits |
| Database connection storm | Connection pool with backpressure |

### Elevation of Privilege (E) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Elevation%20of%20Privilege%20(E)'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Elevation of Privilege (E)" title="Ask ChatGPT about this section">💬</a>

| Threat | Mitigation |
|--------|-----------|
| SQL injection → data exfiltration | Parameterized queries; principle of least privilege |
| SSRF → internal network access | URL allowlist; network segmentation |
| XSS → session hijacking | CSP; HttpOnly cookies; output encoding |
| Path traversal | Whitelist; canonical paths |
| Deserialization attacks | Avoid deserializing untrusted data |

## Risk matrix

| Threat | Likelihood | Impact | Risk | Action |
|--------|-----------|--------|------|--------|
| Stolen credentials | High | High | High | MFA, short TTL, rotation |
| SQL injection | Medium | High | High | Parameterized queries, SAST |
| SSRF | Medium | Medium | Medium | Allowlist, network segmentation |
| Brute force login | High | Medium | High | Rate limiting, lockout, MFA |
| PII in logs | Medium | High | High | Log filter, PII detection |
| Insider threat | Low | High | Medium | Audit log, least privilege |
| XSS | Low | Medium | Low | CSP, output encoding |
| DDoS | High | Medium | High | Cloudflare, rate limiting |

## Mitigations summary

- **Authentication:** OAuth 2.1 + OIDC + PKCE + MFA.
- **Authorization:** RBAC, principle of least privilege.
- **Input validation:** zod / Joi schemas; parameter binding.
- **Output encoding:** framework default (React etc.).
- **Transport:** TLS 1.3; mTLS between services.
- **Storage:** Argon2id for passwords; AES-256 at rest.
- **Observability:** structured logs; security alerts.
- **Resilience:** rate limiting; circuit breakers.

## Next steps

1. Implement mitigations.
2. Add SAST and SCA to CI.
3. Schedule pen test.
4. Review in 6 months.