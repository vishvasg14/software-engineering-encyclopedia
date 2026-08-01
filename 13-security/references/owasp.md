# OWASP References

The authoritative source for OWASP is the Open Worldwide Application Security Project. This file catalogs the OWASP resources referenced in the Security document.

## Primary documentation

- **OWASP Foundation:** <https://owasp.org/
- **OWASP Top 10:** <https://owasp.org/www-project-top-ten/
- **OWASP ASVS:** <https://owasp.org/www-project-application-security-verification-standard/
- **OWASP Cheat Sheet Series:** <https://cheatsheetseries.owasp.org/
- **OWASP SAMM:** <https://owasp.org/www-project-samm/
- **OWASP Dependency-Check:** <https://owasp.org/www-project-dependency-check/

## OWASP Top 10 (2021)

| # | Vulnerability | Description |
|---|--------------|-------------|
| A01 | Broken Access Control | Users act outside intended permissions |
| A02 | Cryptographic Failures | Weak / missing encryption |
| A03 | Injection | SQL, NoSQL, OS command, LDAP injection |
| A04 | Insecure Design | Flaws in design patterns |
| A05 | Security Misconfiguration | Default configs, open cloud storage |
| A06 | Vulnerable & Outdated Components | Unpatched libraries |
| A07 | Identification & Authentication Failures | Weak passwords, no MFA |
| A08 | Software & Data Integrity Failures | Untrusted CI/CD, deserialization |
| A09 | Security Logging & Monitoring Failures | Insufficient observability |
| A10 | Server-Side Request Forgery (SSRF) | Fetches user-controlled URLs |

## OWASP Top 10 (2017 — legacy)

| # | Vulnerability |
|---|--------------|
| A01 | Injection |
| A02 | Broken Authentication |
| A03 | Sensitive Data Exposure |
| A04 | XML External Entities (XXE) |
| A05 | Broken Access Control |
| A06 | Security Misconfiguration |
| A07 | Cross-Site Scripting (XSS) |
| A08 | Insecure Deserialization |
| A09 | Using Components with Known Vulnerabilities |
| A10 | Insufficient Logging & Monitoring |

## OWASP API Security Top 10 (2023)

| # | Vulnerability |
|---|--------------|
| API1 | Broken Object Level Authorization |
| API2 | Broken Authentication |
| API3 | Broken Object Property Level Authorization |
| API4 | Unrestricted Resource Consumption |
| API5 | Broken Function Level Authorization |
| API6 | Unrestricted Access to Sensitive Business Flows |
| API7 | Server Side Request Forgery |
| API8 | Security Misconfiguration |
| API9 | Improper Inventory Management |
| API10 | Unsafe Consumption of APIs |

## OWASP Cheat Sheets

URL: <https://cheatsheetseries.owasp.org/>

| Cheat Sheet | Topic |
|---|---|
| Authentication | password storage, MFA |
| Authorization | access control patterns |
| Session Management | session handling |
| Input Validation | validation, sanitization |
| Output Encoding | XSS, context-aware encoding |
| Cryptographic Storage | algorithms, key management |
| SQL Injection Prevention | parameterized queries |
| Cross-Site Scripting Prevention | CSP, escaping |
| Cross-Site Request Forgery Prevention | tokens, SameSite |
| REST Security | API security |
| GraphQL Security | GraphQL-specific |
| JSON Web Token | JWT best practices |
| OAuth 2 | OAuth 2.0 grant flows |
| OpenID Connect | OIDC |
| TLS | TLS configuration |
| Docker Security | container security |
| Kubernetes | K8s security |
| Logging | security logging |
| Cloud | cloud security |

## OWASP ASVS 4.0 (Application Security Verification Standard)

14 categories:

| # | Category |
|---|----------|
| V1 | Architecture |
| V2 | Authentication |
| V3 | Session Management |
| V4 | Access Control |
| V5 | Validation, Sanitization, Encoding |
| V6 | Stored Cryptography |
| V7 | Error Handling and Logging |
| V8 | Data Protection |
| V9 | Communication |
| V10 | Malicious Code |
| V11 | Business Logic |
| V12 | Files and Resources |
| V13 | API and Web Service |
| V14 | Configuration |

## OWASP SAMM (Software Assurance Maturity Model)

Maturity levels:

| Level | Description |
|------|-------------|
| **1** | Initial ad-hoc |
| **2** | Repeatable |
| **3** | Defined |
| **4** | Managed |
| **5** | Optimizing |

Business functions: Governance, Design, Implementation, Verification, Operations.

## OWASP projects

- **OWASP ZAP:** Zed Attack Proxy; web app scanner.
- **OWASP Dependency-Check:** SCA for vulnerable dependencies.
- **OWASP Dependency-Track:** SBOM analysis.
- **OWASP ModSecurity CRS:** Core Rule Set for WAF.
- **OWASP Juice Shop:** Vulnerable web app for training.
- **OWASP Web Security Testing Guide:** Testing methodology.
- **OWASP Mobile Security Testing Guide:** Mobile testing.

## OWASP community

- **OWASP Slack:** <https://owasp.org/slack/invite
- **OWASP local chapters:** worldwide.
- **OWASP conferences:** AppSec USA, Europe, etc.

## Books

- *The Web Application Hacker's Handbook* — Stuttard, Pinto (Wiley).
- *OWASP Testing Guide* — Meucci et al. (free online).
- *Threat Modeling* — Shostack (Wiley).
- *Alice and Bob Learn Application Security* — Tesfahun (Wiley).