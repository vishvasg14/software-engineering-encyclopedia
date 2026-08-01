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

### Spoofing (S)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23spoofing-s%0A%0ASection%20title%3A%20Spoofing%20(S)' target='_blank' rel='noopener' data-askgpt='Spoofing (S)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/02-threat-modeling/threat-model.md#spoofing-s' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23spoofing-s%0A%0ASection%20title%3A%20Spoofing%20(S)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23spoofing-s%0A%0ASection%20title%3A%20Spoofing%20(S)' title='Ask ChatGPT about this section'>💬</a>
| Threat | Mitigation |
|--------|-----------|
| Stolen credentials | MFA, strong password policy, rate limiting |
| Token theft | Short TTL, refresh token rotation, TLS only |
| Session hijacking | Secure session cookies, IP binding |
| Impersonation via JWT | Validate iss, aud, exp, signature |

### Tampering (T)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23tampering-t%0A%0ASection%20title%3A%20Tampering%20(T)' target='_blank' rel='noopener' data-askgpt='Tampering (T)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/02-threat-modeling/threat-model.md#tampering-t' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23tampering-t%0A%0ASection%20title%3A%20Tampering%20(T)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23tampering-t%0A%0ASection%20title%3A%20Tampering%20(T)' title='Ask ChatGPT about this section'>💬</a>
| Threat | Mitigation |
|--------|-----------|
| Modify user data in DB | RBAC, input validation, audit log |
| Modify email content | TLS, DKIM/SPF/DMARC for email |
| Modify password hash | Hashing with salt (Argon2id) |

### Repudiation (R)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23repudiation-r%0A%0ASection%20title%3A%20Repudiation%20(R)' target='_blank' rel='noopener' data-askgpt='Repudiation (R)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/02-threat-modeling/threat-model.md#repudiation-r' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23repudiation-r%0A%0ASection%20title%3A%20Repudiation%20(R)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23repudiation-r%0A%0ASection%20title%3A%20Repudiation%20(R)' title='Ask ChatGPT about this section'>💬</a>
| Threat | Mitigation |
|--------|-----------|
| User denies action | Audit log with timestamp and user ID |
| Admin denies data change | Immutable audit log |
| API denies data access | Application logs with trace ID |

### Information Disclosure (I)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23information-disclosure-i%0A%0ASection%20title%3A%20Information%20Disclosure%20(I)' target='_blank' rel='noopener' data-askgpt='Information Disclosure (I)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/02-threat-modeling/threat-model.md#information-disclosure-i' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23information-disclosure-i%0A%0ASection%20title%3A%20Information%20Disclosure%20(I)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23information-disclosure-i%0A%0ASection%20title%3A%20Information%20Disclosure%20(I)' title='Ask ChatGPT about this section'>💬</a>
| Threat | Mitigation |
|--------|-----------|
| PII in logs | Log filter; PII tagging; data masking |
| PII in error messages | Generic error messages |
| Email enumeration | Rate limit; same response for valid/invalid |
| Timing attacks | Constant-time comparison for tokens |
| Backup data leak | Encrypted backups; access controls |

### Denial of Service (D)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23denial-of-service-d%0A%0ASection%20title%3A%20Denial%20of%20Service%20(D)' target='_blank' rel='noopener' data-askgpt='Denial of Service (D)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/02-threat-modeling/threat-model.md#denial-of-service-d' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23denial-of-service-d%0A%0ASection%20title%3A%20Denial%20of%20Service%20(D)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23denial-of-service-d%0A%0ASection%20title%3A%20Denial%20of%20Service%20(D)' title='Ask ChatGPT about this section'>💬</a>
| Threat | Mitigation |
|--------|-----------|
| Login brute force | Rate limiting per IP and per user |
| Resource exhaustion | Connection pool limits; queue limits |
| Large payload DoS | Request size limits; rate limits |
| Database connection storm | Connection pool with backpressure |

### Elevation of Privilege (E)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23elevation-of-privilege-e%0A%0ASection%20title%3A%20Elevation%20of%20Privilege%20(E)' target='_blank' rel='noopener' data-askgpt='Elevation of Privilege (E)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/02-threat-modeling/threat-model.md#elevation-of-privilege-e' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23elevation-of-privilege-e%0A%0ASection%20title%3A%20Elevation%20of%20Privilege%20(E)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F02-threat-modeling%2Fthreat-model.md%23elevation-of-privilege-e%0A%0ASection%20title%3A%20Elevation%20of%20Privilege%20(E)' title='Ask ChatGPT about this section'>💬</a>
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