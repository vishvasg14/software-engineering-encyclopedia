# Security (OWASP, OAuth2, JWT, Encryption)

> A comprehensive, production-grade treatment of security: OWASP Top 10, threat modeling, OAuth2/OIDC/JWT authentication, TLS/mTLS transport, cryptography, compliance frameworks, and incident response.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Definition](#2-definition)
3. [Five Ws + One H](#3-five-ws--one-h)
4. [History](#4-history)
5. [Problem Statement](#5-problem-statement)
6. [Real-World Motivation](#6-real-world-motivation)
7. [Internal Working](#7-internal-working)
8. [Deep Dive](#8-deep-dive)
9. [Architecture](#9-architecture)
10. [Performance](#10-performance)
11. [Security](#11-security)
12. [Production Engineering](#12-production-engineering)
13. [Production Case Studies](#13-production-case-studies)
14. [Code Examples](#14-code-examples)
15. [Common Mistakes](#15-common-mistakes)
16. [Debugging](#16-debugging)
17. [Monitoring & Observability](#17-monitoring--observability)
18. [Best Practices](#18-best-practices)
19. [Anti-Patterns](#19-anti-patterns)
20. [Edge Cases](#20-edge-cases)
21. [Comparisons](#21-comparisons)
22. [Interview Preparation](#22-interview-preparation)
23. [References](#23-references)

---

## 1. Overview

**Security** is the practice of protecting systems and data from unauthorized access, use, disclosure, disruption, modification, or destruction. Modern application security is built on layered defenses: **OWASP Top 10** (web vulnerabilities), **OAuth2/OIDC/JWT** (authentication), **TLS 1.3** (transport encryption), **cryptography** (data protection), **compliance** (SOC2, ISO 27001, PCI-DSS, HIPAA, GDPR), and **security operations** (incident response, vulnerability management).

This document treats security at production depth: the OWASP Top 10 (2021), threat modeling, OAuth2 deep, OIDC, JWT, TLS 1.3, mTLS, cryptography deep, secrets management, compliance, and incident response.

**Scope.** This is not a security tutorial. It assumes you understand HTTP, basic cryptography, and have built production systems. It focuses on **principles and patterns** that distinguish production-grade security from toy implementations.

**Version baselines.** OWASP Top 10 (2021), OAuth 2.1 (draft), OIDC Core 1.0, JWT (RFC 7519), TLS 1.3 (RFC 8446).

## 2. Definition

The security ecosystem uses overlapping terminology. Here's a precise taxonomy:

| Term | Type | Authoritative source |
|------|------|---------------------|
| **CIA triad** | Confidentiality, Integrity, Availability | Classic security model |
| **Defense in depth** | Multiple layers of security controls | NIST |
| **Zero trust** | Never trust, always verify | NIST SP 800-207 |
| **Least privilege** | Grant minimum necessary permissions | Saltzer & Schroeder 1974 |
| **Authentication** | Verify identity | NIST SP 800-63 |
| **Authorization** | Verify permissions | NIST |
| **Accounting** | Audit and log access | NIST |
| **CIA** | Confidentiality, Integrity, Availability | — |
| **OWASP Top 10** | Most critical web vulnerabilities | OWASP |
| **OWASP API Top 10** | API-specific vulnerabilities | OWASP |
| **OWASP ASVS** | Application Security Verification Standard | OWASP |
| **CWE** | Common Weakness Enumeration | MITRE |
| **CVE** | Common Vulnerabilities and Exposures | MITRE |
| **NVD** | National Vulnerability Database | NIST |
| **XSS** | Cross-Site Scripting | OWASP |
| **CSRF** | Cross-Site Request Forgery | OWASP |
| **SSRF** | Server-Side Request Forgery | OWASP |
| **SQLi** | SQL Injection | OWASP |
| **OAuth 2.0** | Authorization framework | RFC 6749 |
| **OAuth 2.1** | Updated OAuth with security best practices | Draft |
| **OIDC** | OpenID Connect — identity on top of OAuth 2.0 | OpenID Foundation |
| **JWT** | JSON Web Token | RFC 7519 |
| **JWS** | JSON Web Signature | RFC 7515 |
| **JWE** | JSON Web Encryption | RFC 7516 |
| **JWK** | JSON Web Key | RFC 7517 |
| **PKCE** | Proof Key for Code Exchange | RFC 7636 |
| **PKI** | Public Key Infrastructure | RFC 5280 |
| **TLS** | Transport Layer Security | RFC 8446 |
| **mTLS** | Mutual TLS | — |
| **CSP** | Content Security Policy | W3C |
| **CORS** | Cross-Origin Resource Sharing | W3C |
| **HSTS** | HTTP Strict Transport Security | RFC 6797 |
| **XSS** | (already listed above) | — |
| **CSRF** | (already listed above) | — |
| **SSO** | Single Sign-On | — |
| **MFA** | Multi-Factor Authentication | — |
| **HSM** | Hardware Security Module | FIPS 140 |
| **KMS** | Key Management Service | — |
| **KDF** | Key Derivation Function | NIST SP 800-108 |
| **MAC** | Message Authentication Code | NIST |
| **HMAC** | Hash-based MAC | RFC 2104 |
| **AEAD** | Authenticated Encryption with Associated Data | NIST |
| **PII** | Personally Identifiable Information | — |
| **PHI** | Protected Health Information | HIPAA |
| **PCI** | Payment Card Industry | PCI-DSS |
| **WAF** | Web Application Firewall | — |
| **DLP** | Data Loss Prevention | — |
| **IDS/IPS** | Intrusion Detection / Prevention System | — |
| **SOC** | Security Operations Center | — |
| **SIEM** | Security Information and Event Management | — |
| **EDR** | Endpoint Detection and Response | — |
| **CSPM** | Cloud Security Posture Management | — |

The standard security architecture:

```mermaid
graph TB
    subgraph "Edge"
        WAF[WAF]
        DDoS[DDoS Protection]
    end
    subgraph "Application"
        App[App with AuthN/Z]
    end
    subgraph "Data"
        DB[(Encrypted DB)]
        Secrets[Secrets Manager]
    end
    subgraph "Identity"
        IdP[OIDC Provider]
    end
    subgraph "Observability"
        SIEM[SIEM/Logs]
    end
    DDoS --> WAF
    WAF --> App
    IdP -->|OIDC| App
    App --> DB
    App --> Secrets
    App --> SIEM
```

## 3. Five Ws + One H

### What <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23what%0A%0ASection%20title%3A%20What' target='_blank' rel='noopener' data-askgpt='What' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#what' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23what%0A%0ASection%20title%3A%20What' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23what%0A%0ASection%20title%3A%20What' title='Ask ChatGPT about this section'>💬</a>

**Security** is the practice of protecting systems from unauthorized access, use, disclosure, disruption, modification, or destruction. Modern security is layered (defense in depth) and built on the CIA triad: Confidentiality, Integrity, Availability.

### Why <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23why%0A%0ASection%20title%3A%20Why' target='_blank' rel='noopener' data-askgpt='Why' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#why' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23why%0A%0ASection%20title%3A%20Why' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23why%0A%0ASection%20title%3A%20Why' title='Ask ChatGPT about this section'>💬</a>

Data breaches cost millions to billions. Reputational damage is worse. Compliance is mandatory (GDPR, HIPAA, PCI-DSS). Production systems need strong security by default.

### When <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23when%0A%0ASection%20title%3A%20When' target='_blank' rel='noopener' data-askgpt='When' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#when' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23when%0A%0ASection%20title%3A%20When' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23when%0A%0ASection%20title%3A%20When' title='Ask ChatGPT about this section'>💬</a>

Security as a discipline has been around since computing began. Modern web security emerged with the web (1990s). OWASP Top 10 was first published in 2003. Modern security frameworks (NIST CSF 2014, OAuth 2.0 2012) emerged as cloud computing grew.

### Where <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23where%0A%0ASection%20title%3A%20Where' target='_blank' rel='noopener' data-askgpt='Where' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#where' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23where%0A%0ASection%20title%3A%20Where' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23where%0A%0ASection%20title%3A%20Where' title='Ask ChatGPT about this section'>💬</a>

Every system that handles user data, payments, PII, or sensitive operations. This includes web applications, APIs, mobile apps, databases, and cloud infrastructure.

### Who <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23who%0A%0ASection%20title%3A%20Who' target='_blank' rel='noopener' data-askgpt='Who' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#who' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23who%0A%0ASection%20title%3A%20Who' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23who%0A%0ASection%20title%3A%20Who' title='Ask ChatGPT about this section'>💬</a>

- **OWASP:** Open Worldwide Application Security Project.
- **NIST:** National Institute of Standards and Technology (US).
- **IETF:** Internet Engineering Task Force (RFCs).
- **Vendor security teams:** Cloudflare, AWS, Google, etc.
- **Researchers:** Bruce Schneier, Dan Kaminsky, etc.

### How (one-paragraph preview) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23how-one-paragraph-preview%0A%0ASection%20title%3A%20How%20(one-paragraph%20preview)' target='_blank' rel='noopener' data-askgpt='How (one-paragraph preview)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#how-one-paragraph-preview' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23how-one-paragraph-preview%0A%0ASection%20title%3A%20How%20(one-paragraph%20preview)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23how-one-paragraph-preview%0A%0ASection%20title%3A%20How%20(one-paragraph%20preview)' title='Ask ChatGPT about this section'>💬</a>

You build a defense-in-depth security posture: secure defaults (HTTPS, MFA, encryption at rest), authentication (OIDC/OAuth2), authorization (RBAC, scopes), input validation (parameterized queries, output encoding), secrets management (Vault or cloud KMS), observability (security logs, anomaly detection), and incident response (runbooks, postmortems). You follow the OWASP Top 10, NIST CSF, and your industry's compliance framework.

## 4. History

### 4.1 Origins (1970s-2000s) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2341-origins-1970s-2000s%0A%0ASection%20title%3A%204.1%20Origins%20(1970s-2000s)' target='_blank' rel='noopener' data-askgpt='4.1 Origins (1970s-2000s)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#41-origins-1970s-2000s' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2341-origins-1970s-2000s%0A%0ASection%20title%3A%204.1%20Origins%20(1970s-2000s)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2341-origins-1970s-2000s%0A%0ASection%20title%3A%204.1%20Origins%20(1970s-2000s)' title='Ask ChatGPT about this section'>💬</a>

- **1970s** — Diffie-Hellman, RSA public key cryptography.
- **1989** — World Wide Web; first security considerations.
- **1990s** — SSL, then TLS; SET (Secure Electronic Transaction).
- **1995** — SSL 2.0; 1996 — SSL 3.0.
- **1999** — TLS 1.0 (RFC 2246).

### 4.2 The web era (2000-2015) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2342-the-web-era-2000-2015%0A%0ASection%20title%3A%204.2%20The%20web%20era%20(2000-2015)' target='_blank' rel='noopener' data-askgpt='4.2 The web era (2000-2015)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#42-the-web-era-2000-2015' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2342-the-web-era-2000-2015%0A%0ASection%20title%3A%204.2%20The%20web%20era%20(2000-2015)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2342-the-web-era-2000-2015%0A%0ASection%20title%3A%204.2%20The%20web%20era%20(2000-2015)' title='Ask ChatGPT about this section'>💬</a>

- **2002** — SAML 1.0; federated identity.
- **2003** — OWASP founded; first OWASP Top 10.
- **2006** — TLS 1.1 (RFC 4346).
- **2008** — TLS 1.2 (RFC 5246).
- **2009** — Bitcoin; renewed interest in cryptography.
- **2010** — Stuxnet; first major cyberweapon.
- **2012** — OAuth 2.0 (RFC 6749).

### 4.3 The data-breach era (2015-2022) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2343-the-data-breach-era-2015-2022%0A%0ASection%20title%3A%204.3%20The%20data-breach%20era%20(2015-2022)' target='_blank' rel='noopener' data-askgpt='4.3 The data-breach era (2015-2022)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#43-the-data-breach-era-2015-2022' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2343-the-data-breach-era-2015-2022%0A%0ASection%20title%3A%204.3%20The%20data-breach%20era%20(2015-2022)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2343-the-data-breach-era-2015-2022%0A%0ASection%20title%3A%204.3%20The%20data-breach%20era%20(2015-2022)' title='Ask ChatGPT about this section'>💬</a>

- **2015** — TLS 1.3 (RFC 8446).
- **2017** — Equifax breach (147M records).
- **2018** — GDPR enforced; Facebook/Cambridge Analytica.
- **2020** — SolarWinds supply chain attack.
- **2021** — Colonial Pipeline ransomware; Log4Shell.
- **2022** — NIST CSF 2.0 draft.

### 4.4 The zero-trust era (2022-2026) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2344-the-zero-trust-era-2022-2026%0A%0ASection%20title%3A%204.4%20The%20zero-trust%20era%20(2022-2026)' target='_blank' rel='noopener' data-askgpt='4.4 The zero-trust era (2022-2026)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#44-the-zero-trust-era-2022-2026' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2344-the-zero-trust-era-2022-2026%0A%0ASection%20title%3A%204.4%20The%20zero-trust%20era%20(2022-2026)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2344-the-zero-trust-era-2022-2026%0A%0ASection%20title%3A%204.4%20The%20zero-trust%20era%20(2022-2026)' title='Ask ChatGPT about this section'>💬</a>

- **2022** — CISA zero-trust mandate.
- **2024** — NIST CSF 2.0 released; supply chain attacks continue.
- **2025** — Post-quantum cryptography (PQC) standardization (NIST).
- **2026** — Quantum-safe migration; AI security.

```mermaid
timeline
    title Security history
    1995 : SSL 2.0
    1999 : TLS 1.0 (RFC 2246)
    2003 : OWASP founded
    2008 : TLS 1.2
    2012 : OAuth 2.0
    2014 : NIST CSF 1.0
    2015 : TLS 1.3
    2017 : Equifax breach
    2018 : GDPR
    2020 : SolarWinds
    2024 : NIST CSF 2.0
```

## 5. Problem Statement

### 5.1 What security solves <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2351-what-security-solves%0A%0ASection%20title%3A%205.1%20What%20security%20solves' target='_blank' rel='noopener' data-askgpt='5.1 What security solves' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#51-what-security-solves' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2351-what-security-solves%0A%0ASection%20title%3A%205.1%20What%20security%20solves' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2351-what-security-solves%0A%0ASection%20title%3A%205.1%20What%20security%20solves' title='Ask ChatGPT about this section'>💬</a>

- **Data breaches:** Unauthorized access to PII, payment data, secrets.
- **Account takeover:** Compromised user credentials.
- **Ransomware:** Encrypting data; extorting payment.
- **Supply chain:** Compromised dependencies.
- **Insider threats:** Malicious or negligent employees.
- **Compliance violations:** GDPR fines; PCI-DSS penalties.

### 5.2 What security doesn't solve <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2352-what-security-doesnt-solve%0A%0ASection%20title%3A%205.2%20What%20security%20doesn't%20solve' target='_blank' rel='noopener' data-askgpt='5.2 What security doesn&#39;t solve' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#52-what-security-doesnt-solve' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2352-what-security-doesnt-solve%0A%0ASection%20title%3A%205.2%20What%20security%20doesn't%20solve' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2352-what-security-doesnt-solve%0A%0ASection%20title%3A%205.2%20What%20security%20doesn't%20solve' title='Ask ChatGPT about this section'>💬</a>

- **Zero-day vulnerabilities:** Until patched.
- **Advanced persistent threats (APTs):** Nation-state attackers.
- **Social engineering:** The human factor.
- **Physical security:** Server rooms, laptops.
- **Third-party risk:** Vendors you depend on.

### 5.3 The cost of poor security <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2353-the-cost-of-poor-security%0A%0ASection%20title%3A%205.3%20The%20cost%20of%20poor%20security' target='_blank' rel='noopener' data-askgpt='5.3 The cost of poor security' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#53-the-cost-of-poor-security' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2353-the-cost-of-poor-security%0A%0ASection%20title%3A%205.3%20The%20cost%20of%20poor%20security' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2353-the-cost-of-poor-security%0A%0ASection%20title%3A%205.3%20The%20cost%20of%20poor%20security' title='Ask ChatGPT about this section'>💬</a>

- Average data breach cost: $4.88M (IBM 2024).
- Reputation damage: customer churn.
- Regulatory fines: GDPR up to 4% of global revenue.
- Operational disruption: ransomware downtime.

## 6. Real-World Motivation

### 6.1 Equifax (2017) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2361-equifax-2017%0A%0ASection%20title%3A%206.1%20Equifax%20(2017)' target='_blank' rel='noopener' data-askgpt='6.1 Equifax (2017)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#61-equifax-2017' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2361-equifax-2017%0A%0ASection%20title%3A%206.1%20Equifax%20(2017)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2361-equifax-2017%0A%0ASection%20title%3A%206.1%20Equifax%20(2017)' title='Ask ChatGPT about this section'>💬</a>

Apache Struts vulnerability (CVE-2017-5638). Unpatched for months. 147M records stolen. Cost: $1.4B+ in settlements.

### 6.2 Target (2013) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2362-target-2013%0A%0ASection%20title%3A%206.2%20Target%20(2013)' target='_blank' rel='noopener' data-askgpt='6.2 Target (2013)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#62-target-2013' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2362-target-2013%0A%0ASection%20title%3A%206.2%20Target%20(2013)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2362-target-2013%0A%0ASection%20title%3A%206.2%20Target%20(2013)' title='Ask ChatGPT about this section'>💬</a>

HVAC vendor breach led to 40M credit card numbers stolen. Cost: $292M.

### 6.3 Marriott (2018) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2363-marriott-2018%0A%0ASection%20title%3A%206.3%20Marriott%20(2018)' target='_blank' rel='noopener' data-askgpt='6.3 Marriott (2018)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#63-marriott-2018' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2363-marriott-2018%0A%0ASection%20title%3A%206.3%20Marriott%20(2018)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2363-marriott-2018%0A%0ASection%20title%3A%206.3%20Marriott%20(2018)' title='Ask ChatGPT about this section'>💬</a>

Starwood reservation system breach. 500M records. Cost: $200M+ in fines.

### 6.4 SolarWinds (2020) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2364-solarwinds-2020%0A%0ASection%20title%3A%206.4%20SolarWinds%20(2020)' target='_blank' rel='noopener' data-askgpt='6.4 SolarWinds (2020)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#64-solarwinds-2020' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2364-solarwinds-2020%0A%0ASection%20title%3A%206.4%20SolarWinds%20(2020)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2364-solarwinds-2020%0A%0ASection%20title%3A%206.4%20SolarWinds%20(2020)' title='Ask ChatGPT about this section'>💬</a>

Supply chain attack via Orion software. 18,000+ customers affected. Nation-state attacker.

### 6.5 Log4Shell (2021) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2365-log4shell-2021%0A%0ASection%20title%3A%206.5%20Log4Shell%20(2021)' target='_blank' rel='noopener' data-askgpt='6.5 Log4Shell (2021)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#65-log4shell-2021' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2365-log4shell-2021%0A%0ASection%20title%3A%206.5%20Log4Shell%20(2021)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2365-log4shell-2021%0A%0ASection%20title%3A%206.5%20Log4Shell%20(2021)' title='Ask ChatGPT about this section'>💬</a>

Critical RCE in Log4j. Trivial exploitation. Affected millions of applications.

```mermaid
graph LR
    subgraph "Production motivations"
        A[Data breaches] --> Drivers
        B[Compliance] --> Drivers
        C[Reputation] --> Drivers
        D[Customer trust] --> Drivers
    end
    Drivers --> Security["Security = layered defenses + zero trust"]
```

---

## 7. Internal Working

### 7.1 Defense in depth <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2371-defense-in-depth%0A%0ASection%20title%3A%207.1%20Defense%20in%20depth' target='_blank' rel='noopener' data-askgpt='7.1 Defense in depth' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#71-defense-in-depth' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2371-defense-in-depth%0A%0ASection%20title%3A%207.1%20Defense%20in%20depth' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2371-defense-in-depth%0A%0ASection%20title%3A%207.1%20Defense%20in%20depth' title='Ask ChatGPT about this section'>💬</a>

```mermaid
graph TB
    subgraph "Layer 1: Perimeter"
        DDoS[DDoS Protection]
        WAF[WAF]
    end
    subgraph "Layer 2: Network"
        TLS[TLS 1.3]
        Segment[Network Segmentation]
    end
    subgraph "Layer 3: Application"
        AuthN[Authentication]
        AuthZ[Authorization]
        Validate[Input Validation]
    end
    subgraph "Layer 4: Data"
        Encrypt[Encryption]
        Secrets[Secrets Manager]
    end
    subgraph "Layer 5: Observability"
        Logs[Security Logs]
        Anomaly[Anomaly Detection]
    end
    DDoS --> WAF
    WAF --> TLS
    TLS --> AuthN
    AuthN --> AuthZ
    AuthZ --> Validate
    Validate --> Encrypt
    Encrypt --> Secrets
    AuthN -.-> Logs
    Logs --> Anomaly
```

### 7.2 Zero trust principles <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2372-zero-trust-principles%0A%0ASection%20title%3A%207.2%20Zero%20trust%20principles' target='_blank' rel='noopener' data-askgpt='7.2 Zero trust principles' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#72-zero-trust-principles' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2372-zero-trust-principles%0A%0ASection%20title%3A%207.2%20Zero%20trust%20principles' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2372-zero-trust-principles%0A%0ASection%20title%3A%207.2%20Zero%20trust%20principles' title='Ask ChatGPT about this section'>💬</a>

- **Never trust, always verify.**
- **Least privilege access.**
- **Assume breach.**
- **Verify explicitly.**
- **Encrypt everywhere.**

---

## 8. Deep Dive

This section is the heart of the document.

### 8.1 OWASP Top 10 (2021) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2381-owasp-top-10-2021%0A%0ASection%20title%3A%208.1%20OWASP%20Top%2010%20(2021)' target='_blank' rel='noopener' data-askgpt='8.1 OWASP Top 10 (2021)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#81-owasp-top-10-2021' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2381-owasp-top-10-2021%0A%0ASection%20title%3A%208.1%20OWASP%20Top%2010%20(2021)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2381-owasp-top-10-2021%0A%0ASection%20title%3A%208.1%20OWASP%20Top%2010%20(2021)' title='Ask ChatGPT about this section'>💬</a>

| # | Vulnerability | Mitigation |
|---|--------------|-----------|
| **A01** | Broken Access Control | Authorization checks; deny by default |
| **A02** | Cryptographic Failures | TLS 1.3; strong algorithms; proper key management |
| **A03** | Injection (SQL, NoSQL, LDAP) | Parameterized queries; input validation |
| **A04** | Insecure Design | Threat modeling; secure design patterns |
| **A05** | Security Misconfiguration | Hardened images; minimal attack surface |
| **A06** | Vulnerable & Outdated Components | SCA; automated updates |
| **A07** | Identification & Authentication Failures | MFA; strong passwords; rate limit |
| **A08** | Software & Data Integrity Failures | Signed artifacts; SLSA; verified dependencies |
| **A09** | Security Logging & Monitoring Failures | Comprehensive logging; alerting |
| **A10** | Server-Side Request Forgery (SSRF) | URL allowlist; network segmentation |

### 8.2 Threat modeling <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2382-threat-modeling%0A%0ASection%20title%3A%208.2%20Threat%20modeling' target='_blank' rel='noopener' data-askgpt='8.2 Threat modeling' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#82-threat-modeling' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2382-threat-modeling%0A%0ASection%20title%3A%208.2%20Threat%20modeling' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2382-threat-modeling%0A%0ASection%20title%3A%208.2%20Threat%20modeling' title='Ask ChatGPT about this section'>💬</a>

**STRIDE** (Microsoft):

| Category | Threat | Example |
|----------|--------|---------|
| **S**poofing | Identity | Stolen credentials |
| **T**ampering | Data modification | SQL injection |
| **R**epudiation | Deny actions | Audit log tampering |
| **I**nformation disclosure | Data leak | Unencrypted database |
| **D**enial of service | Availability | DDoS attack |
| **E**levation of privilege | Authorization | Privilege escalation |

**PASTA** (Process for Attack Simulation and Threat Analysis):

1. Define business objectives.
2. Define technical scope.
3. Decompose application.
4. Analyze threats.
5. Analyze vulnerabilities.
6. Analyze attacks.
7. Analyze risks.

**Attack trees** visualize threat paths.

### 8.3 OWASP API Top 10 (2023) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2383-owasp-api-top-10-2023%0A%0ASection%20title%3A%208.3%20OWASP%20API%20Top%2010%20(2023)' target='_blank' rel='noopener' data-askgpt='8.3 OWASP API Top 10 (2023)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#83-owasp-api-top-10-2023' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2383-owasp-api-top-10-2023%0A%0ASection%20title%3A%208.3%20OWASP%20API%20Top%2010%20(2023)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2383-owasp-api-top-10-2023%0A%0ASection%20title%3A%208.3%20OWASP%20API%20Top%2010%20(2023)' title='Ask ChatGPT about this section'>💬</a>

See [APIs doc](../07-apis/apis.md) for details. Top:

- API1: Broken Object Level Authorization (BOLA).
- API3: Broken Object Property Level Authorization (BOPLA).
- API8: Security Misconfiguration.

### 8.4 Authentication <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2384-authentication%0A%0ASection%20title%3A%208.4%20Authentication' target='_blank' rel='noopener' data-askgpt='8.4 Authentication' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#84-authentication' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2384-authentication%0A%0ASection%20title%3A%208.4%20Authentication' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2384-authentication%0A%0ASection%20title%3A%208.4%20Authentication' title='Ask ChatGPT about this section'>💬</a>

**Passwords:**

- **Hash:** Argon2id (preferred), bcrypt, scrypt. NOT MD5, SHA-1, SHA-256 alone.
- **Salt:** per-user; long; random.
- **Stretching:** Argon2 / bcrypt work factor.
- **Storage:** Never log passwords; never email them.

**MFA (Multi-Factor Authentication):**

- **Something you know:** password.
- **Something you have:** phone, hardware token (YubiKey).
- **Something you are:** biometric.

**Passwordless:**

- WebAuthn (FIDO2).
- Magic links.
- Passkeys (Apple, Google, Microsoft).

### 8.5 OAuth 2.0 deep <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2385-oauth-20-deep%0A%0ASection%20title%3A%208.5%20OAuth%202.0%20deep' target='_blank' rel='noopener' data-askgpt='8.5 OAuth 2.0 deep' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#85-oauth-20-deep' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2385-oauth-20-deep%0A%0ASection%20title%3A%208.5%20OAuth%202.0%20deep' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2385-oauth-20-deep%0A%0ASection%20title%3A%208.5%20OAuth%202.0%20deep' title='Ask ChatGPT about this section'>💬</a>

```mermaid
sequenceDiagram
    participant User
    participant Client as Client App
    participant Auth as Auth Server
    participant API as Resource Server

    User->>Client: Click "Login"
    Client->>Auth: Authorization request
    Auth-->>User: Login + consent
    User->>Auth: Login
    Auth-->>Client: Authorization code
    Client->>Auth: Exchange code for token
    Auth-->>Client: Access token + refresh token
    Client->>API: GET /resource<br/>Authorization: Bearer ...
    API-->>Client: Resource
```

**Grant types:**

| Grant | Use case |
|-------|----------|
| Authorization Code | Web apps with backend |
| Authorization Code + PKCE | SPAs, mobile, native |
| Client Credentials | Service-to-service |
| Device Code | Smart TVs, IoT |
| Refresh Token | Long-lived sessions |
| Token Exchange | Impersonation, delegation |

**PKCE (RFC 7636):** prevents authorization code interception in public clients.

- code_verifier: random URL-safe string (43-128 chars).
- code_challenge: BASE64URL(SHA256(code_verifier)).
- S256 method recommended.

### 8.6 OIDC deep <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2386-oidc-deep%0A%0ASection%20title%3A%208.6%20OIDC%20deep' target='_blank' rel='noopener' data-askgpt='8.6 OIDC deep' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#86-oidc-deep' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2386-oidc-deep%0A%0ASection%20title%3A%208.6%20OIDC%20deep' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2386-oidc-deep%0A%0ASection%20title%3A%208.6%20OIDC%20deep' title='Ask ChatGPT about this section'>💬</a>

OIDC adds identity on top of OAuth 2.0:

- **ID Token:** JWT with user claims.
- **UserInfo endpoint:** returns user info with access token.
- **Discovery:** /.well-known/openid-configuration.
- **Standard claims:** sub, iss, aud, exp, iat, name, email, etc.

### 8.7 JWT deep <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2387-jwt-deep%0A%0ASection%20title%3A%208.7%20JWT%20deep' target='_blank' rel='noopener' data-askgpt='8.7 JWT deep' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#87-jwt-deep' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2387-jwt-deep%0A%0ASection%20title%3A%208.7%20JWT%20deep' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2387-jwt-deep%0A%0ASection%20title%3A%208.7%20JWT%20deep' title='Ask ChatGPT about this section'>💬</a>

**Structure:** `header.payload.signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Header (JOSE):** algorithm, type.

**Payload (claims):** subject, issuer, audience, expiration, etc.

**Signature:** HMAC, RSA, ECDSA, EdDSA.

**Best practices:**

- Use short TTL (5-15 min).
- Use refresh tokens for long-lived sessions.
- Validate `iss`, `aud`, `exp`, `nbf`.
- Use `kid` for key rotation.
- Store no sensitive data in JWT (it's base64, not encrypted).
- Use HTTPS to prevent token theft.

### 8.8 OAuth 2.1 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2388-oauth-21%0A%0ASection%20title%3A%208.8%20OAuth%202.1' target='_blank' rel='noopener' data-askgpt='8.8 OAuth 2.1' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#88-oauth-21' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2388-oauth-21%0A%0ASection%20title%3A%208.8%20OAuth%202.1' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2388-oauth-21%0A%0ASection%20title%3A%208.8%20OAuth%202.1' title='Ask ChatGPT about this section'>💬</a>

OAuth 2.1 (draft) consolidates OAuth 2.0 with current security best practices:

- Mandates PKCE for all clients.
- Removes implicit grant.
- Mandates exact redirect URI matching.
- Removes resource owner password credentials grant.
- Mandates sender-constrained tokens (DPoP or mTLS).

### 8.9 TLS 1.3 deep <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2389-tls-13-deep%0A%0ASection%20title%3A%208.9%20TLS%201.3%20deep' target='_blank' rel='noopener' data-askgpt='8.9 TLS 1.3 deep' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#89-tls-13-deep' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2389-tls-13-deep%0A%0ASection%20title%3A%208.9%20TLS%201.3%20deep' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2389-tls-13-deep%0A%0ASection%20title%3A%208.9%20TLS%201.3%20deep' title='Ask ChatGPT about this section'>💬</a>

**Handshake (1-RTT):**

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    C->>S: ClientHello<br/>(key share, cipher suites)
    S->>C: ServerHello<br/>(key share, chosen cipher)<br/>EncryptedExtensions<br/>Certificate<br/>CertificateVerify<br/>Finished
    C->>S: Finished<br/>Application Data
```

**Cipher suites (TLS 1.3):**

- TLS_AES_128_GCM_SHA256
- TLS_AES_256_GCM_SHA384
- TLS_CHACHA20_POLY1305_SHA256
- TLS_AES_128_CCM_SHA256

**Key features:**

- **1-RTT handshake** (vs 2-RTT in TLS 1.2).
- **0-RTT data** (resumption; replay risk).
- **Forward secrecy mandatory** (every session).
- **AEAD only** (no CBC mode).
- **Encrypted SNI** (in draft).

### 8.10 mTLS deep <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23810-mtls-deep%0A%0ASection%20title%3A%208.10%20mTLS%20deep' target='_blank' rel='noopener' data-askgpt='8.10 mTLS deep' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#810-mtls-deep' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23810-mtls-deep%0A%0ASection%20title%3A%208.10%20mTLS%20deep' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23810-mtls-deep%0A%0ASection%20title%3A%208.10%20mTLS%20deep' title='Ask ChatGPT about this section'>💬</a>

Mutual TLS: both client and server present certificates.

- **Client certificate:** proves client identity.
- **Server certificate:** proves server identity.
- **Use cases:** service-to-service, zero-trust networks.

**SPIFFE / SPIRE** automates mTLS for microservices:

- **SPIFFE ID:** `spiffe://trust-domain/path`.
- **SVID:** SPIFFE Verifiable Identity Document (X.509 cert).
- **SPIRE:** issues and rotates SVIDs.

### 8.11 Cryptography deep <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23811-cryptography-deep%0A%0ASection%20title%3A%208.11%20Cryptography%20deep' target='_blank' rel='noopener' data-askgpt='8.11 Cryptography deep' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#811-cryptography-deep' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23811-cryptography-deep%0A%0ASection%20title%3A%208.11%20Cryptography%20deep' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23811-cryptography-deep%0A%0ASection%20title%3A%208.11%20Cryptography%20deep' title='Ask ChatGPT about this section'>💬</a>

**Symmetric encryption:**

- **AES-GCM:** 128/192/256-bit keys; AEAD; widely used.
- **ChaCha20-Poly1305:** 256-bit key; fast on mobile; AEAD.

**Asymmetric encryption:**

- **RSA:** 2048+ bits; widely used; slow.
- **ECDSA:** 256-bit (P-256); fast; smaller signatures.
- **Ed25519:** fast; compact; modern.

**Hashing:**

- **SHA-256:** general purpose; widely used.
- **SHA-3:** NIST standard; post-quantum readiness.
- **BLAKE3:** very fast; modern.
- **MD5 / SHA-1:** **insecure**; do not use.

**Password hashing:**

- **Argon2id:** preferred (memory-hard).
- **bcrypt:** widely used; work factor 12+.
- **scrypt:** memory-hard; older.

**Key derivation:**

- **HKDF:** from high-entropy input.
- **PBKDF2:** from passwords; iterate.
- **Argon2id:** from passwords; memory-hard.

**Digital signatures:**

- **RSA-PSS:** modern RSA signature.
- **ECDSA P-256:** elliptic curve.
- **Ed25519:** modern; fast.

**Key management:**

- **Generate:** cryptographically secure RNG.
- **Store:** HSM for high-value; KMS otherwise.
- **Rotate:** regularly; on personnel change.
- **Destroy:** when no longer needed.

### 8.12 Post-quantum cryptography (PQC) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23812-post-quantum-cryptography-pqc%0A%0ASection%20title%3A%208.12%20Post-quantum%20cryptography%20(PQC)' target='_blank' rel='noopener' data-askgpt='8.12 Post-quantum cryptography (PQC)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#812-post-quantum-cryptography-pqc' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23812-post-quantum-cryptography-pqc%0A%0ASection%20title%3A%208.12%20Post-quantum%20cryptography%20(PQC)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23812-post-quantum-cryptography-pqc%0A%0ASection%20title%3A%208.12%20Post-quantum%20cryptography%20(PQC)' title='Ask ChatGPT about this section'>💬</a>

NIST PQC standardization (2024):

- **CRYSTALS-Kyber:** key encapsulation (ML-KEM).
- **CRYSTALS-Dilithium:** digital signatures (ML-DSA).
- **SPHINCS+:** hash-based signatures (SLH-DSA).

Hybrid schemes (classical + PQC) recommended for transition.

### 8.13 Application security <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23813-application-security%0A%0ASection%20title%3A%208.13%20Application%20security' target='_blank' rel='noopener' data-askgpt='8.13 Application security' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#813-application-security' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23813-application-security%0A%0ASection%20title%3A%208.13%20Application%20security' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23813-application-security%0A%0ASection%20title%3A%208.13%20Application%20security' title='Ask ChatGPT about this section'>💬</a>

**Input validation:**

- **Whitelist** (not blacklist).
- **Type checking.**
- **Length limits.**
- **Encoding context (HTML, SQL, LDAP, OS command).**

**Output encoding:**

- **HTML:** context-aware escaping.
- **SQL:** parameterized queries (not string concat).
- **JSON:** use json.dumps, not custom serialization.
- **URL:** percent-encoding.

**CSP (Content Security Policy):**

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.example.com
```

**CORS (Cross-Origin Resource Sharing):**

- Whitelist origins explicitly.
- Use credentials only for trusted origins.
- Preflight for non-simple requests.

**HTTP security headers:**

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=()`

### 8.14 XSS prevention <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23814-xss-prevention%0A%0ASection%20title%3A%208.14%20XSS%20prevention' target='_blank' rel='noopener' data-askgpt='8.14 XSS prevention' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#814-xss-prevention' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23814-xss-prevention%0A%0ASection%20title%3A%208.14%20XSS%20prevention' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23814-xss-prevention%0A%0ASection%20title%3A%208.14%20XSS%20prevention' title='Ask ChatGPT about this section'>💬</a>

- **Output encoding** (context-aware).
- **CSP** to limit script sources.
- **HttpOnly cookie** for session.
- **Trusted Types** for DOM manipulation.
- **No innerHTML / eval.**

### 8.15 SQL injection prevention <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23815-sql-injection-prevention%0A%0ASection%20title%3A%208.15%20SQL%20injection%20prevention' target='_blank' rel='noopener' data-askgpt='8.15 SQL injection prevention' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#815-sql-injection-prevention' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23815-sql-injection-prevention%0A%0ASection%20title%3A%208.15%20SQL%20injection%20prevention' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23815-sql-injection-prevention%0A%0ASection%20title%3A%208.15%20SQL%20injection%20prevention' title='Ask ChatGPT about this section'>💬</a>

- **Parameterized queries** (prepared statements).
- **ORM with parameter binding.**
- **Whitelist input validation.**
- **Stored procedures** (use parameter binding, not concat).
- **Least privilege database user.**

### 8.16 CSRF prevention <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23816-csrf-prevention%0A%0ASection%20title%3A%208.16%20CSRF%20prevention' target='_blank' rel='noopener' data-askgpt='8.16 CSRF prevention' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#816-csrf-prevention' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23816-csrf-prevention%0A%0ASection%20title%3A%208.16%20CSRF%20prevention' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23816-csrf-prevention%0A%0ASection%20title%3A%208.16%20CSRF%20prevention' title='Ask ChatGPT about this section'>💬</a>

- **SameSite cookies** (Lax or Strict).
- **CSRF tokens** (per-request, unpredictable).
- **Origin / Referer header validation.**
- **Double-submit cookie pattern.**

### 8.17 SSRF prevention <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23817-ssrf-prevention%0A%0ASection%20title%3A%208.17%20SSRF%20prevention' target='_blank' rel='noopener' data-askgpt='8.17 SSRF prevention' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#817-ssrf-prevention' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23817-ssrf-prevention%0A%0ASection%20title%3A%208.17%20SSRF%20prevention' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23817-ssrf-prevention%0A%0ASection%20title%3A%208.17%20SSRF%20prevention' title='Ask ChatGPT about this section'>💬</a>

- **Allowlist domains** (block 169.254.169.254 metadata).
- **Block private IP ranges** (RFC 1918).
- **Resolve hostname before connecting** (prevent DNS rebinding).
- **Use a proxy** for outbound requests.
- **Disable HTTP redirects** (or validate).

### 8.18 Secrets management <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23818-secrets-management%0A%0ASection%20title%3A%208.18%20Secrets%20management' target='_blank' rel='noopener' data-askgpt='8.18 Secrets management' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#818-secrets-management' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23818-secrets-management%0A%0ASection%20title%3A%208.18%20Secrets%20management' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23818-secrets-management%0A%0ASection%20title%3A%208.18%20Secrets%20management' title='Ask ChatGPT about this section'>💬</a>

**Tools:**

- **HashiCorp Vault:** industry standard; dynamic secrets.
- **AWS Secrets Manager / Parameter Store:** AWS-native.
- **Azure Key Vault:** Azure-native.
- **Google Secret Manager:** GCP-native.
- **Sealed Secrets (Bitnami):** GitOps for k8s secrets.
- **External Secrets Operator:** sync from external to k8s.

**Best practices:**

- Never commit secrets to git.
- Rotate regularly.
- Use short-lived credentials.
- Audit access.
- Encrypt at rest.

### 8.19 Compliance frameworks <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23819-compliance-frameworks%0A%0ASection%20title%3A%208.19%20Compliance%20frameworks' target='_blank' rel='noopener' data-askgpt='8.19 Compliance frameworks' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#819-compliance-frameworks' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23819-compliance-frameworks%0A%0ASection%20title%3A%208.19%20Compliance%20frameworks' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23819-compliance-frameworks%0A%0ASection%20title%3A%208.19%20Compliance%20frameworks' title='Ask ChatGPT about this section'>💬</a>

**SOC 2:** Trust service criteria (security, availability, processing integrity, confidentiality, privacy).

**ISO 27001:** Information Security Management System (ISMS). PDCA cycle.

**PCI-DSS:** Payment Card Industry. 12 requirements, 6 categories.

**HIPAA:** Healthcare data. Privacy Rule, Security Rule.

**GDPR:** EU personal data. Lawful basis, data subject rights, breach notification (72 hours).

**NIST CSF 2.0:** Govern, Identify, Protect, Detect, Respond, Recover.

### 8.20 Secrets rotation <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23820-secrets-rotation%0A%0ASection%20title%3A%208.20%20Secrets%20rotation' target='_blank' rel='noopener' data-askgpt='8.20 Secrets rotation' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#820-secrets-rotation' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23820-secrets-rotation%0A%0ASection%20title%3A%208.20%20Secrets%20rotation' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23820-secrets-rotation%0A%0ASection%20title%3A%208.20%20Secrets%20rotation' title='Ask ChatGPT about this section'>💬</a>

- **AWS Secrets Manager:** automatic rotation.
- **Vault:** dynamic secrets; short TTL.
- **Database credentials:** rotate via Vault.
- **API keys:** versioned; rotation policy.
- **Certificates:** automatic renewal (Let's Encrypt).

### 8.21 Vulnerability management <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23821-vulnerability-management%0A%0ASection%20title%3A%208.21%20Vulnerability%20management' target='_blank' rel='noopener' data-askgpt='8.21 Vulnerability management' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#821-vulnerability-management' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23821-vulnerability-management%0A%0ASection%20title%3A%208.21%20Vulnerability%20management' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23821-vulnerability-management%0A%0ASection%20title%3A%208.21%20Vulnerability%20management' title='Ask ChatGPT about this section'>💬</a>

- **SCA (Software Composition Analysis):** Dependabot, Snyk, GitLab, WhiteSource.
- **SAST (Static Application Security Testing):** SonarQube, Semgrep, CodeQL.
- **DAST (Dynamic Application Security Testing):** OWASP ZAP, Burp Suite.
- **Runtime:** RASP (Runtime Application Self-Protection), eBPF.

### 8.22 Incident response <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23822-incident-response%0A%0ASection%20title%3A%208.22%20Incident%20response' target='_blank' rel='noopener' data-askgpt='8.22 Incident response' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#822-incident-response' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23822-incident-response%0A%0ASection%20title%3A%208.22%20Incident%20response' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23822-incident-response%0A%0ASection%20title%3A%208.22%20Incident%20response' title='Ask ChatGPT about this section'>💬</a>

**NIST 800-61 lifecycle:**

1. **Preparation:** plans, training.
2. **Detection & Analysis:** identify and triage.
3. **Containment, Eradication, Recovery:** stop the bleeding; clean up; restore.
4. **Post-Incident Activity:** lessons learned.

**Blameless postmortem:**

- **What happened:** Timeline.
- **Why:** Root cause analysis (5 Whys).
- **Contributing factors:** not just the root.
- **Lessons learned.**
- **Action items:** with owners and dates.

### 8.23 OWASP ASVS <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23823-owasp-asvs%0A%0ASection%20title%3A%208.23%20OWASP%20ASVS' target='_blank' rel='noopener' data-askgpt='8.23 OWASP ASVS' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#823-owasp-asvs' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23823-owasp-asvs%0A%0ASection%20title%3A%208.23%20OWASP%20ASVS' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23823-owasp-asvs%0A%0ASection%20title%3A%208.23%20OWASP%20ASVS' title='Ask ChatGPT about this section'>💬</a>

Application Security Verification Standard.

**Levels:**

- **Level 1:** Basic; every app.
- **Level 2:** Standard; most apps.
- **Level 3:** Advanced; high-value apps.

**14 categories** (V1-V14): see references.

### 8.24 OWASP SAMM <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23824-owasp-samm%0A%0ASection%20title%3A%208.24%20OWASP%20SAMM' target='_blank' rel='noopener' data-askgpt='8.24 OWASP SAMM' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#824-owasp-samm' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23824-owasp-samm%0A%0ASection%20title%3A%208.24%20OWASP%20SAMM' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23824-owasp-samm%0A%0ASection%20title%3A%208.24%20OWASP%20SAMM' title='Ask ChatGPT about this section'>💬</a>

Software Assurance Maturity Model.

- Governance
- Design
- Implementation
- Verification
- Operations

Maturity levels: 1-5.

### 8.25 Comparison: OAuth2 vs OIDC vs SAML <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23825-comparison-oauth2-vs-oidc-vs-saml%0A%0ASection%20title%3A%208.25%20Comparison%3A%20OAuth2%20vs%20OIDC%20vs%20SAML' target='_blank' rel='noopener' data-askgpt='8.25 Comparison: OAuth2 vs OIDC vs SAML' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#825-comparison-oauth2-vs-oidc-vs-saml' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23825-comparison-oauth2-vs-oidc-vs-saml%0A%0ASection%20title%3A%208.25%20Comparison%3A%20OAuth2%20vs%20OIDC%20vs%20SAML' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23825-comparison-oauth2-vs-oidc-vs-saml%0A%0ASection%20title%3A%208.25%20Comparison%3A%20OAuth2%20vs%20OIDC%20vs%20SAML' title='Ask ChatGPT about this section'>💬</a>

| Dimension | OAuth 2.0 | OIDC | SAML 2.0 |
|-----------|-----------|------|----------|
| **Year** | 2012 | 2014 | 2005 |
| **Purpose** | Authorization | Authentication (on top of OAuth 2.0) | Authentication + Authorization |
| **Token format** | Access token (opaque or JWT) | ID token (JWT) + access token | XML assertion |
| **Transport** | HTTPS | HTTPS | HTTP redirect (SOAP) |
| **Use case** | API authorization, social login | SSO for web and mobile | Enterprise SSO (legacy) |
| **Modern** | Yes | Yes | Legacy |

### 8.26 Comparison: JWT vs SAML <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23826-comparison-jwt-vs-saml%0A%0ASection%20title%3A%208.26%20Comparison%3A%20JWT%20vs%20SAML' target='_blank' rel='noopener' data-askgpt='8.26 Comparison: JWT vs SAML' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#826-comparison-jwt-vs-saml' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23826-comparison-jwt-vs-saml%0A%0ASection%20title%3A%208.26%20Comparison%3A%20JWT%20vs%20SAML' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23826-comparison-jwt-vs-saml%0A%0ASection%20title%3A%208.26%20Comparison%3A%20JWT%20vs%20SAML' title='Ask ChatGPT about this section'>💬</a>

| Dimension | JWT | SAML |
|-----------|-----|------|
| **Format** | JSON | XML |
| **Size** | Compact (~1KB) | Large (~10KB) |
| **Mobile-friendly** | Yes | No |
| **Use case** | Modern web, mobile | Enterprise web |

### 8.27 Comparison: TLS 1.3 vs TLS 1.2 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23827-comparison-tls-13-vs-tls-12%0A%0ASection%20title%3A%208.27%20Comparison%3A%20TLS%201.3%20vs%20TLS%201.2' target='_blank' rel='noopener' data-askgpt='8.27 Comparison: TLS 1.3 vs TLS 1.2' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#827-comparison-tls-13-vs-tls-12' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23827-comparison-tls-13-vs-tls-12%0A%0ASection%20title%3A%208.27%20Comparison%3A%20TLS%201.3%20vs%20TLS%201.2' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23827-comparison-tls-13-vs-tls-12%0A%0ASection%20title%3A%208.27%20Comparison%3A%20TLS%201.3%20vs%20TLS%201.2' title='Ask ChatGPT about this section'>💬</a>

| Dimension | TLS 1.2 | TLS 1.3 |
|-----------|---------|---------|
| **Handshake** | 2-RTT | 1-RTT |
| **0-RTT** | No | Yes (resumption) |
| **PFS** | Optional (via DHE/ECDHE) | Mandatory |
| **Ciphers** | Many (CBC + AEAD) | AEAD only |
| **Legacy** | Some (3DES, RC4) | None |

### 8.28 Comparison: Vault vs Secrets Manager vs Parameter Store <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23828-comparison-vault-vs-secrets-manager-vs-parameter-store%0A%0ASection%20title%3A%208.28%20Comparison%3A%20Vault%20vs%20Secrets%20Manager%20vs%20Parameter%20Store' target='_blank' rel='noopener' data-askgpt='8.28 Comparison: Vault vs Secrets Manager vs Parameter Store' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#828-comparison-vault-vs-secrets-manager-vs-parameter-store' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23828-comparison-vault-vs-secrets-manager-vs-parameter-store%0A%0ASection%20title%3A%208.28%20Comparison%3A%20Vault%20vs%20Secrets%20Manager%20vs%20Parameter%20Store' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23828-comparison-vault-vs-secrets-manager-vs-parameter-store%0A%0ASection%20title%3A%208.28%20Comparison%3A%20Vault%20vs%20Secrets%20Manager%20vs%20Parameter%20Store' title='Ask ChatGPT about this section'>💬</a>

| Dimension | Vault | AWS Secrets Manager |
|-----------|-------|---------------------|
| **Dynamic secrets** | Yes (DB, AWS, etc.) | RDS only |
| **Lease** | Yes | Rotation only |
| **Multi-cloud** | Yes (with federation) | AWS only |
| **Open source** | Yes | No |
| **Learning curve** | High | Low |

### 8.29 Decision matrix <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23829-decision-matrix%0A%0ASection%20title%3A%208.29%20Decision%20matrix' target='_blank' rel='noopener' data-askgpt='8.29 Decision matrix' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#829-decision-matrix' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23829-decision-matrix%0A%0ASection%20title%3A%208.29%20Decision%20matrix' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23829-decision-matrix%0A%0ASection%20title%3A%208.29%20Decision%20matrix' title='Ask ChatGPT about this section'>💬</a>

| Workload | Recommended |
|----------|------------|
| Modern web/mobile auth | OAuth 2.1 + OIDC + PKCE |
| Service-to-service | OAuth 2.0 client credentials + mTLS |
| Enterprise SSO | OIDC (or SAML for legacy) |
| API authentication | OAuth 2.0 access tokens + OIDC |
| Browser to server | Cookies + CSRF token (or JWT in Authorization header) |
| Microservices | mTLS (via SPIFFE/SPIRE) or JWT |
| Database credentials | Vault dynamic secrets |
| API keys | Secrets Manager + rotation |

### 8.30 Migration paths <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23830-migration-paths%0A%0ASection%20title%3A%208.30%20Migration%20paths' target='_blank' rel='noopener' data-askgpt='8.30 Migration paths' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#830-migration-paths' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23830-migration-paths%0A%0ASection%20title%3A%208.30%20Migration%20paths' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23830-migration-paths%0A%0ASection%20title%3A%208.30%20Migration%20paths' title='Ask ChatGPT about this section'>💬</a>

- **SAML to OIDC:** gradual; OIDC federation.
- **TLS 1.2 to TLS 1.3:** enable both; clients prefer 1.3.
- **Passwords to passwordless:** WebAuthn / FIDO2 / passkeys.
- **Shared secrets to Vault:** incremental migration.

---

## 9. Architecture

### 9.1 Zero-trust architecture <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2391-zero-trust-architecture%0A%0ASection%20title%3A%209.1%20Zero-trust%20architecture' target='_blank' rel='noopener' data-askgpt='9.1 Zero-trust architecture' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#91-zero-trust-architecture' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2391-zero-trust-architecture%0A%0ASection%20title%3A%209.1%20Zero-trust%20architecture' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2391-zero-trust-architecture%0A%0ASection%20title%3A%209.1%20Zero-trust%20architecture' title='Ask ChatGPT about this section'>💬</a>

```mermaid
graph TB
    User[User]
    subgraph "Identity plane"
        IdP[OIDC Provider]
    end
    subgraph "Access plane"
        IAP[Identity-Aware Proxy]
        Service[Service]
    end
    subgraph "Data plane"
        EncryptedDB[(Encrypted DB)]
    end
    User -->|OIDC| IdP
    IdP -->|Token| IAP
    IAP -->|Verify token + mTLS| Service
    Service --> EncryptedDB
```

### 9.2 OAuth2 Authorization Code + PKCE <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2392-oauth2-authorization-code-pkce%0A%0ASection%20title%3A%209.2%20OAuth2%20Authorization%20Code%20%2B%20PKCE' target='_blank' rel='noopener' data-askgpt='9.2 OAuth2 Authorization Code + PKCE' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#92-oauth2-authorization-code-pkce' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2392-oauth2-authorization-code-pkce%0A%0ASection%20title%3A%209.2%20OAuth2%20Authorization%20Code%20%2B%20PKCE' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2392-oauth2-authorization-code-pkce%0A%0ASection%20title%3A%209.2%20OAuth2%20Authorization%20Code%20%2B%20PKCE' title='Ask ChatGPT about this section'>💬</a>

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant C as Client
    participant A as Auth Server
    participant R as Resource Server

    U->>C: 1. Click login
    C->>A: 2. Authorization request + code_challenge
    A-->>U: 3. Login + consent
    U->>A: 4. Credentials
    A-->>C: 5. Authorization code
    C->>A: 6. Exchange code + code_verifier for token
    A-->>C: 7. Access token + refresh token
    C->>R: 8. Request with Authorization: Bearer
    R-->>C: 9. Resource
```

### 9.3 TLS 1.3 handshake <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2393-tls-13-handshake%0A%0ASection%20title%3A%209.3%20TLS%201.3%20handshake' target='_blank' rel='noopener' data-askgpt='9.3 TLS 1.3 handshake' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#93-tls-13-handshake' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2393-tls-13-handshake%0A%0ASection%20title%3A%209.3%20TLS%201.3%20handshake' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%2393-tls-13-handshake%0A%0ASection%20title%3A%209.3%20TLS%201.3%20handshake' title='Ask ChatGPT about this section'>💬</a>

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    C->>S: ClientHello<br/>(key share, cipher suites)
    S->>C: ServerHello<br/>(key share)<br/>EncryptedExtensions<br/>Certificate<br/>CertificateVerify<br/>Finished
    C->>S: Finished<br/>Application Data*
```

## 10. Performance

### 10.1 Crypto overhead <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23101-crypto-overhead%0A%0ASection%20title%3A%2010.1%20Crypto%20overhead' target='_blank' rel='noopener' data-askgpt='10.1 Crypto overhead' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#101-crypto-overhead' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23101-crypto-overhead%0A%0ASection%20title%3A%2010.1%20Crypto%20overhead' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23101-crypto-overhead%0A%0ASection%20title%3A%2010.1%20Crypto%20overhead' title='Ask ChatGPT about this section'>💬</a>

- **TLS handshake:** 1-2 RTT; subsequent connections reuse.
- **TLS 1.3:** 1-RTT; 0-RTT for resumption.
- **AES-GCM:** hardware-accelerated (AES-NI); ~1 GB/s.
- **ChaCha20-Poly1305:** fast on mobile (no AES-NI).
- **RSA signatures:** slower than ECDSA; use 2048+ bits.
- **ECDSA P-256:** fast; small signatures.
- **Ed25519:** fastest; modern.

### 10.2 TLS session resumption <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23102-tls-session-resumption%0A%0ASection%20title%3A%2010.2%20TLS%20session%20resumption' target='_blank' rel='noopener' data-askgpt='10.2 TLS session resumption' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#102-tls-session-resumption' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23102-tls-session-resumption%0A%0ASection%20title%3A%2010.2%20TLS%20session%20resumption' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23102-tls-session-resumption%0A%0ASection%20title%3A%2010.2%20TLS%20session%20resumption' title='Ask ChatGPT about this section'>💬</a>

- **Session ID:** 1-RTT for resumed.
- **Session tickets:** 0-RTT (but replay risk).
- **TLS 1.3 PSK:** pre-shared keys; 0-RTT.

### 10.3 JWT validation <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23103-jwt-validation%0A%0ASection%20title%3A%2010.3%20JWT%20validation' target='_blank' rel='noopener' data-askgpt='10.3 JWT validation' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#103-jwt-validation' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23103-jwt-validation%0A%0ASection%20title%3A%2010.3%20JWT%20validation' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23103-jwt-validation%0A%0ASection%20title%3A%2010.3%20JWT%20validation' title='Ask ChatGPT about this section'>💬</a>

- Verify signature (RS256 or ES256).
- Check `iss`, `aud`, `exp`, `nbf`.
- Cache JWKS (key rotation).
- Don't fetch from issuer per request.

### 10.4 OAuth2 token validation <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23104-oauth2-token-validation%0A%0ASection%20title%3A%2010.4%20OAuth2%20token%20validation' target='_blank' rel='noopener' data-askgpt='10.4 OAuth2 token validation' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#104-oauth2-token-validation' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23104-oauth2-token-validation%0A%0ASection%20title%3A%2010.4%20OAuth2%20token%20validation' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23104-oauth2-token-validation%0A%0ASection%20title%3A%2010.4%20OAuth2%20token%20validation' title='Ask ChatGPT about this section'>💬</a>

- Cache access token introspection (if opaque).
- JWT: cache JWKS with TTL.
- Use audience-specific keys.

### 10.5 Hashing throughput <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23105-hashing-throughput%0A%0ASection%20title%3A%2010.5%20Hashing%20throughput' target='_blank' rel='noopener' data-askgpt='10.5 Hashing throughput' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#105-hashing-throughput' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23105-hashing-throughput%0A%0ASection%20title%3A%2010.5%20Hashing%20throughput' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23105-hashing-throughput%0A%0ASection%20title%3A%2010.5%20Hashing%20throughput' title='Ask ChatGPT about this section'>💬</a>

- Bcrypt: ~1000 ops/sec.
- Argon2: ~100 ops/sec (memory-hard).
- SHA-256: GBs/sec.

## 11. Security

(Irony: a security document with a Security section.)

Security is a meta-property. Within security:

- **Defense in depth:** multiple layers.
- **Least privilege:** minimum necessary.
- **Fail securely:** default deny.
- **Open design:** security through transparency.
- **Compartmentalization:** isolation.

## 12. Production Engineering

### 12.1 Security in CI/CD <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23121-security-in-cicd%0A%0ASection%20title%3A%2012.1%20Security%20in%20CI%2FCD' target='_blank' rel='noopener' data-askgpt='12.1 Security in CI/CD' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#121-security-in-cicd' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23121-security-in-cicd%0A%0ASection%20title%3A%2012.1%20Security%20in%20CI%2FCD' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23121-security-in-cicd%0A%0ASection%20title%3A%2012.1%20Security%20in%20CI%2FCD' title='Ask ChatGPT about this section'>💬</a>

```mermaid
graph TB
    Commit[Code Commit]
    SAST[SAST scan]
    SCA[SCA scan]
    Secrets[Secrets scan]
    Build[Build]
    Sign[Image signing]
    Deploy[Deploy]
    Runtime[Runtime security]

    Commit --> SAST
    Commit --> SCA
    Commit --> Secrets
    SAST --> Build
    SCA --> Build
    Secrets --> Build
    Build --> Sign
    Sign --> Deploy
    Deploy --> Runtime
```

- **SAST:** static analysis (Semgrep, CodeQL).
- **SCA:** dependency scanning (Dependabot, Snyk).
- **Secrets scan:** git-secrets, TruffleHog.
- **Image signing:** cosign (Sigstore).
- **Admission control:** OPA/Kyverno in k8s.

### 12.2 Runtime security <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23122-runtime-security%0A%0ASection%20title%3A%2012.2%20Runtime%20security' target='_blank' rel='noopener' data-askgpt='12.2 Runtime security' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#122-runtime-security' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23122-runtime-security%0A%0ASection%20title%3A%2012.2%20Runtime%20security' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23122-runtime-security%0A%0ASection%20title%3A%2012.2%20Runtime%20security' title='Ask ChatGPT about this section'>💬</a>

- **RASP (Runtime Application Self-Protection):** Sqreen, DataDog ASM.
- **WAF:** Cloudflare, AWS WAF, ModSecurity.
- **DDoS protection:** Cloudflare, AWS Shield.
- **Bot detection:** reCAPTCHA, Cloudflare Bot Management.
- **eBPF:** Tetragon, Falco for runtime security events.

### 12.3 Security observability <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23123-security-observability%0A%0ASection%20title%3A%2012.3%20Security%20observability' target='_blank' rel='noopener' data-askgpt='12.3 Security observability' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#123-security-observability' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23123-security-observability%0A%0ASection%20title%3A%2012.3%20Security%20observability' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23123-security-observability%0A%0ASection%20title%3A%2012.3%20Security%20observability' title='Ask ChatGPT about this section'>💬</a>

- **SIEM:** Splunk, Elastic Security, Datadog Security.
- **Log all auth events:** login, logout, password change, MFA.
- **Anomaly detection:** impossible travel, unusual activity.
- **SIEM alerts:** brute force, credential stuffing, data exfiltration.

### 12.4 Backup and DR for security <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23124-backup-and-dr-for-security%0A%0ASection%20title%3A%2012.4%20Backup%20and%20DR%20for%20security' target='_blank' rel='noopener' data-askgpt='12.4 Backup and DR for security' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#124-backup-and-dr-for-security' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23124-backup-and-dr-for-security%0A%0ASection%20title%3A%2012.4%20Backup%20and%20DR%20for%20security' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23124-backup-and-dr-for-security%0A%0ASection%20title%3A%2012.4%20Backup%20and%20DR%20for%20security' title='Ask ChatGPT about this section'>💬</a>

- **Encrypted backups** (AES-256).
- **Test restore** regularly.
- **Air-gapped** backups for ransomware.
- **Immutable** backups (object lock).

## 13. Production Case Studies

### 13.1 Equifax (2017) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23131-equifax-2017%0A%0ASection%20title%3A%2013.1%20Equifax%20(2017)' target='_blank' rel='noopener' data-askgpt='13.1 Equifax (2017)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#131-equifax-2017' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23131-equifax-2017%0A%0ASection%20title%3A%2013.1%20Equifax%20(2017)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23131-equifax-2017%0A%0ASection%20title%3A%2013.1%20Equifax%20(2017)' title='Ask ChatGPT about this section'>💬</a>

- **Vulnerability:** Apache Struts (CVE-2017-5638).
- **Root cause:** Failed to patch known critical vulnerability.
- **Impact:** 147M records; $1.4B+ in settlements.
- **Lesson:** Patch management matters; scan for known vulnerabilities.

### 13.2 Target (2013) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23132-target-2013%0A%0ASection%20title%3A%2013.2%20Target%20(2013)' target='_blank' rel='noopener' data-askgpt='13.2 Target (2013)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#132-target-2013' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23132-target-2013%0A%0ASection%20title%3A%2013.2%20Target%20(2013)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23132-target-2013%0A%0ASection%20title%3A%2013.2%20Target%20(2013)' title='Ask ChatGPT about this section'>💬</a>

- **Vulnerability:** HVAC vendor breach.
- **Root cause:** Network segmentation failure; third-party access.
- **Impact:** 40M credit cards; $292M.
- **Lesson:** Zero trust; segment third-party access.

### 13.3 Marriott (2018) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23133-marriott-2018%0A%0ASection%20title%3A%2013.3%20Marriott%20(2018)' target='_blank' rel='noopener' data-askgpt='13.3 Marriott (2018)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#133-marriott-2018' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23133-marriott-2018%0A%0ASection%20title%3A%2013.3%20Marriott%20(2018)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23133-marriott-2018%0A%0ASection%20title%3A%2013.3%20Marriott%20(2018)' title='Ask ChatGPT about this section'>💬</a>

- **Vulnerability:** Starwood reservation system.
- **Root cause:** Acquisition due diligence failed (acquired compromised system).
- **Impact:** 500M records.
- **Lesson:** Security M&A due diligence.

### 13.4 SolarWinds (2020) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23134-solarwinds-2020%0A%0ASection%20title%3A%2013.4%20SolarWinds%20(2020)' target='_blank' rel='noopener' data-askgpt='13.4 SolarWinds (2020)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#134-solarwinds-2020' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23134-solarwinds-2020%0A%0ASection%20title%3A%2013.4%20SolarWinds%20(2020)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23134-solarwinds-2020%0A%0ASection%20title%3A%2013.4%20SolarWinds%20(2020)' title='Ask ChatGPT about this section'>💬</a>

- **Vulnerability:** Supply chain attack on Orion build system.
- **Root cause:** Compromised build pipeline.
- **Impact:** 18,000+ customers compromised; nation-state attack.
- **Lesson:** Supply chain security; SLSA framework.

### 13.5 Log4Shell (2021) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23135-log4shell-2021%0A%0ASection%20title%3A%2013.5%20Log4Shell%20(2021)' target='_blank' rel='noopener' data-askgpt='13.5 Log4Shell (2021)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#135-log4shell-2021' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23135-log4shell-2021%0A%0ASection%20title%3A%2013.5%20Log4Shell%20(2021)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23135-log4shell-2021%0A%0ASection%20title%3A%2013.5%20Log4Shell%20(2021)' title='Ask ChatGPT about this section'>💬</a>

- **Vulnerability:** Log4j remote code execution (CVE-2021-44228).
- **Root cause:** Trivial exploitation.
- **Impact:** Millions of applications.
- **Lesson:** SCA + rapid patching; defense in depth.

### 13.6 SolarWinds (recap) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23136-solarwinds-recap%0A%0ASection%20title%3A%2013.6%20SolarWinds%20(recap)' target='_blank' rel='noopener' data-askgpt='13.6 SolarWinds (recap)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#136-solarwinds-recap' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23136-solarwinds-recap%0A%0ASection%20title%3A%2013.6%20SolarWinds%20(recap)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23136-solarwinds-recap%0A%0ASection%20title%3A%2013.6%20SolarWinds%20(recap)' title='Ask ChatGPT about this section'>💬</a>

The 2020 attack changed supply chain security forever. Now: SLSA framework, signed artifacts, SBOM.

## 14. Code Examples

### 14.1 Basic: SQL injection prevention <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23141-basic-sql-injection-prevention%0A%0ASection%20title%3A%2014.1%20Basic%3A%20SQL%20injection%20prevention' target='_blank' rel='noopener' data-askgpt='14.1 Basic: SQL injection prevention' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#141-basic-sql-injection-prevention' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23141-basic-sql-injection-prevention%0A%0ASection%20title%3A%2014.1%20Basic%3A%20SQL%20injection%20prevention' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23141-basic-sql-injection-prevention%0A%0ASection%20title%3A%2014.1%20Basic%3A%20SQL%20injection%20prevention' title='Ask ChatGPT about this section'>💬</a>

```typescript
// BAD: SQL injection
const query = `SELECT * FROM users WHERE name = '${userInput}'`;
db.query(query);

// GOOD: parameterized query
const query = `SELECT * FROM users WHERE name = $1`;
db.query(query, [userInput]);

// GOOD: ORM
const user = await User.findOne({ where: { name: userInput } });
```

### 14.2 Basic: XSS prevention <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23142-basic-xss-prevention%0A%0ASection%20title%3A%2014.2%20Basic%3A%20XSS%20prevention' target='_blank' rel='noopener' data-askgpt='14.2 Basic: XSS prevention' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#142-basic-xss-prevention' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23142-basic-xss-prevention%0A%0ASection%20title%3A%2014.2%20Basic%3A%20XSS%20prevention' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23142-basic-xss-prevention%0A%0ASection%20title%3A%2014.2%20Basic%3A%20XSS%20prevention' title='Ask ChatGPT about this section'>💬</a>

```typescript
// BAD: innerHTML with user input
element.innerHTML = userInput;

// GOOD: textContent
element.textContent = userInput;

// GOOD: framework handles escaping
const Safe = ({ userInput }: { userInput: string }) => (
  <div>{userInput}</div>  // React escapes automatically
);

// GOOD: CSP
// Content-Security-Policy: default-src 'self'; script-src 'self'
```

### 14.3 Basic: CSRF prevention <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23143-basic-csrf-prevention%0A%0ASection%20title%3A%2014.3%20Basic%3A%20CSRF%20prevention' target='_blank' rel='noopener' data-askgpt='14.3 Basic: CSRF prevention' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#143-basic-csrf-prevention' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23143-basic-csrf-prevention%0A%0ASection%20title%3A%2014.3%20Basic%3A%20CSRF%20prevention' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23143-basic-csrf-prevention%0A%0ASection%20title%3A%2014.3%20Basic%3A%20CSRF%20prevention' title='Ask ChatGPT about this section'>💬</a>

```typescript
// GOOD: SameSite cookie + CSRF token
const csrfToken = crypto.randomBytes(32).toString('hex');
// Set in cookie and form; compare on submit

// GOOD: SameSite cookies
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'Lax',  // or 'Strict'
});
```

### 14.4 Basic: OAuth2 Authorization Code flow <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23144-basic-oauth2-authorization-code-flow%0A%0ASection%20title%3A%2014.4%20Basic%3A%20OAuth2%20Authorization%20Code%20flow' target='_blank' rel='noopener' data-askgpt='14.4 Basic: OAuth2 Authorization Code flow' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#144-basic-oauth2-authorization-code-flow' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23144-basic-oauth2-authorization-code-flow%0A%0ASection%20title%3A%2014.4%20Basic%3A%20OAuth2%20Authorization%20Code%20flow' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23144-basic-oauth2-authorization-code-flow%0A%0ASection%20title%3A%2014.4%20Basic%3A%20OAuth2%20Authorization%20Code%20flow' title='Ask ChatGPT about this section'>💬</a>

```typescript
// see 06-oauth2-authorization-code/
```

### 14.5 Basic: JWT validation (Node.js) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23145-basic-jwt-validation-nodejs%0A%0ASection%20title%3A%2014.5%20Basic%3A%20JWT%20validation%20(Node.js)' target='_blank' rel='noopener' data-askgpt='14.5 Basic: JWT validation (Node.js)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#145-basic-jwt-validation-nodejs' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23145-basic-jwt-validation-nodejs%0A%0ASection%20title%3A%2014.5%20Basic%3A%20JWT%20validation%20(Node.js)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23145-basic-jwt-validation-nodejs%0A%0ASection%20title%3A%2014.5%20Basic%3A%20JWT%20validation%20(Node.js)' title='Ask ChatGPT about this section'>💬</a>

```typescript
import jwt from 'jsonwebtoken';

function verifyToken(token: string, publicKey: string): jwt.JwtPayload {
  const decoded = jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
    issuer: 'https://auth.example.com',
    audience: 'my-app',
  });

  // Validate claims
  if (!decoded.sub) throw new Error('Missing sub claim');
  if (decoded.exp! < Date.now() / 1000) throw new Error('Token expired');

  return decoded;
}
```

### 14.6 Basic: Password hashing (Node.js) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23146-basic-password-hashing-nodejs%0A%0ASection%20title%3A%2014.6%20Basic%3A%20Password%20hashing%20(Node.js)' target='_blank' rel='noopener' data-askgpt='14.6 Basic: Password hashing (Node.js)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#146-basic-password-hashing-nodejs' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23146-basic-password-hashing-nodejs%0A%0ASection%20title%3A%2014.6%20Basic%3A%20Password%20hashing%20(Node.js)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23146-basic-password-hashing-nodejs%0A%0ASection%20title%3A%2014.6%20Basic%3A%20Password%20hashing%20(Node.js)' title='Ask ChatGPT about this section'>💬</a>

```typescript
import argon2 from 'argon2';

// Hash
const hash = await argon2.hash('password', {
  type: argon2.argon2id,
  memoryCost: 65536,  // 64 MB
  timeCost: 3,
  parallelism: 4,
});

// Verify
const ok = await argon2.verify(hash, 'password');
```

### 14.7 Bad, anti-pattern, refactored, secure examples <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23147-bad-anti-pattern-refactored-secure-examples%0A%0ASection%20title%3A%2014.7%20Bad%2C%20anti-pattern%2C%20refactored%2C%20secure%20examples' target='_blank' rel='noopener' data-askgpt='14.7 Bad, anti-pattern, refactored, secure examples' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#147-bad-anti-pattern-refactored-secure-examples' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23147-bad-anti-pattern-refactored-secure-examples%0A%0ASection%20title%3A%2014.7%20Bad%2C%20anti-pattern%2C%20refactored%2C%20secure%20examples' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23147-bad-anti-pattern-refactored-secure-examples%0A%0ASection%20title%3A%2014.7%20Bad%2C%20anti-pattern%2C%20refactored%2C%20secure%20examples' title='Ask ChatGPT about this section'>💬</a>

**Bad: password in plain text**

```typescript
db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
```

**Anti-pattern: rolling your own crypto**

```typescript
// BAD: don't do this
function myHash(input: string): string {
  let hash = 0;
  for (const char of input) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return hash.toString(16);
}
```

**Refactored: use established crypto**

```typescript
import argon2 from 'argon2';
const hash = await argon2.hash(password);
```

**Secure: parameterized queries + input validation + output encoding**

```typescript
// Use ORM (parameterized), validate input (zod), encode output (default in frameworks)
const user = await User.findOne({ where: { id: parseInt(id, 10) } });
```

**Performance-optimized: cache + JWT verification**

```typescript
const jwksCache = new Map();
function getKey(kid: string): Key {
  if (!jwksCache.has(kid)) {
    // Fetch from JWKS endpoint (cached)
  }
  return jwksCache.get(kid);
}
```

## 15. Common Mistakes

### 15.1 Beginner mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23151-beginner-mistakes%0A%0ASection%20title%3A%2015.1%20Beginner%20mistakes' target='_blank' rel='noopener' data-askgpt='15.1 Beginner mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#151-beginner-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23151-beginner-mistakes%0A%0ASection%20title%3A%2015.1%20Beginner%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23151-beginner-mistakes%0A%0ASection%20title%3A%2015.1%20Beginner%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Storing passwords in plain text.**
- **SQL injection via string concat.**
- **No HTTPS.**
- **XSS via innerHTML.**
- **No CSRF protection.**

### 15.2 Intermediate mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23152-intermediate-mistakes%0A%0ASection%20title%3A%2015.2%20Intermediate%20mistakes' target='_blank' rel='noopener' data-askgpt='15.2 Intermediate mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#152-intermediate-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23152-intermediate-mistakes%0A%0ASection%20title%3A%2015.2%20Intermediate%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23152-intermediate-mistakes%0A%0ASection%20title%3A%2015.2%20Intermediate%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Custom crypto.**
- **Weak random for security.**
- **JWT in localStorage.**
- **No token rotation.**
- **Missing scope validation.**

### 15.3 Senior mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23153-senior-mistakes%0A%0ASection%20title%3A%2015.3%20Senior%20mistakes' target='_blank' rel='noopener' data-askgpt='15.3 Senior mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#153-senior-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23153-senior-mistakes%0A%0ASection%20title%3A%2015.3%20Senior%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23153-senior-mistakes%0A%0ASection%20title%3A%2015.3%20Senior%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Rolling your own auth.**
- **No threat modeling.**
- **No incident response plan.**
- **Secrets in code.**
- **No security logging.**

### 15.4 Production mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23154-production-mistakes%0A%0ASection%20title%3A%2015.4%20Production%20mistakes' target='_blank' rel='noopener' data-askgpt='15.4 Production mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#154-production-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23154-production-mistakes%0A%0ASection%20title%3A%2015.4%20Production%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23154-production-mistakes%0A%0ASection%20title%3A%2015.4%20Production%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Public S3 buckets with sensitive data.**
- **No MFA for admin users.**
- **Logging sensitive data (passwords, tokens).**
- **Long-lived credentials.**
- **No backup of secrets.**

### 15.5 Migration mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23155-migration-mistakes%0A%0ASection%20title%3A%2015.5%20Migration%20mistakes' target='_blank' rel='noopener' data-askgpt='15.5 Migration mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#155-migration-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23155-migration-mistakes%0A%0ASection%20title%3A%2015.5%20Migration%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23155-migration-mistakes%0A%0ASection%20title%3A%2015.5%20Migration%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Big-bang migration:** high risk.
- **No security testing:** deploy blind.
- **No rollback plan:** when security regression happens.

### 15.6 Configuration mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23156-configuration-mistakes%0A%0ASection%20title%3A%2015.6%20Configuration%20mistakes' target='_blank' rel='noopener' data-askgpt='15.6 Configuration mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#156-configuration-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23156-configuration-mistakes%0A%0ASection%20title%3A%2015.6%20Configuration%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23156-configuration-mistakes%0A%0ASection%20title%3A%2015.6%20Configuration%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **TLS 1.0/1.1 enabled.**
- **CORS allow-origin: ***\*.
- **Permissive Security headers.**
- **Default credentials in code.**

### 15.7 Security mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23157-security-mistakes%0A%0ASection%20title%3A%2015.7%20Security%20mistakes' target='_blank' rel='noopener' data-askgpt='15.7 Security mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#157-security-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23157-security-mistakes%0A%0ASection%20title%3A%2015.7%20Security%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23157-security-mistakes%0A%0ASection%20title%3A%2015.7%20Security%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **MD5 / SHA-1 for passwords.**
- **Hardcoded secrets.**
- **No MFA.**
- **Admin endpoints exposed.**

### 15.8 Performance mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23158-performance-mistakes%0A%0ASection%20title%3A%2015.8%20Performance%20mistakes' target='_blank' rel='noopener' data-askgpt='15.8 Performance mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#158-performance-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23158-performance-mistakes%0A%0ASection%20title%3A%2015.8%20Performance%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23158-performance-mistakes%0A%0ASection%20title%3A%2015.8%20Performance%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Synchronous crypto in hot path.**
- **Per-request JWKS fetch.**
- **Heavy logging.**

### 15.9 Debugging mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23159-debugging-mistakes%0A%0ASection%20title%3A%2015.9%20Debugging%20mistakes' target='_blank' rel='noopener' data-askgpt='15.9 Debugging mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#159-debugging-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23159-debugging-mistakes%0A%0ASection%20title%3A%2015.9%20Debugging%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23159-debugging-mistakes%0A%0ASection%20title%3A%2015.9%20Debugging%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Logging tokens in plain text.**
- **No audit trail.**
- **No runbooks for security incidents.**

### 15.10 Deployment mistakes <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%231510-deployment-mistakes%0A%0ASection%20title%3A%2015.10%20Deployment%20mistakes' target='_blank' rel='noopener' data-askgpt='15.10 Deployment mistakes' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#1510-deployment-mistakes' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%231510-deployment-mistakes%0A%0ASection%20title%3A%2015.10%20Deployment%20mistakes' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%231510-deployment-mistakes%0A%0ASection%20title%3A%2015.10%20Deployment%20mistakes' title='Ask ChatGPT about this section'>💬</a>

- **Secrets in CI/CD logs.**
- **Open admin ports.**

## 16. Debugging

### 16.1 OAuth2 flow debugging <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23161-oauth2-flow-debugging%0A%0ASection%20title%3A%2016.1%20OAuth2%20flow%20debugging' target='_blank' rel='noopener' data-askgpt='16.1 OAuth2 flow debugging' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#161-oauth2-flow-debugging' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23161-oauth2-flow-debugging%0A%0ASection%20title%3A%2016.1%20OAuth2%20flow%20debugging' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23161-oauth2-flow-debugging%0A%0ASection%20title%3A%2016.1%20OAuth2%20flow%20debugging' title='Ask ChatGPT about this section'>💬</a>

```bash
# Use ngrok to expose localhost
ngrok http 8080

# Use oauth2-debugger.com (community tool)

# Curl test
curl -X POST https://auth.example.com/oauth2/token \
  -d "grant_type=client_credentials" \
  -d "client_id=..." \
  -d "client_secret=..."
```

### 16.2 JWT debugging <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23162-jwt-debugging%0A%0ASection%20title%3A%2016.2%20JWT%20debugging' target='_blank' rel='noopener' data-askgpt='16.2 JWT debugging' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#162-jwt-debugging' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23162-jwt-debugging%0A%0ASection%20title%3A%2016.2%20JWT%20debugging' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23162-jwt-debugging%0A%0ASection%20title%3A%2016.2%20JWT%20debugging' title='Ask ChatGPT about this section'>💬</a>

```bash
# Decode JWT (don't decode in production!)
echo "header.payload.signature" | cut -d. -f1 | base64 -d 2>/dev/null
echo "header.payload.signature" | cut -d. -f2 | base64 -d 2>/dev/null

# Or use jwt.io (educational only — never paste production tokens)
```

### 16.3 TLS debugging <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23163-tls-debugging%0A%0ASection%20title%3A%2016.3%20TLS%20debugging' target='_blank' rel='noopener' data-askgpt='16.3 TLS debugging' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#163-tls-debugging' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23163-tls-debugging%0A%0ASection%20title%3A%2016.3%20TLS%20debugging' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23163-tls-debugging%0A%0ASection%20title%3A%2016.3%20TLS%20debugging' title='Ask ChatGPT about this section'>💬</a>

```bash
# Test TLS connection
openssl s_client -connect example.com:443 -servername example.com

# Check certificate
openssl x509 -in cert.pem -text -noout

# Check TLS version
openssl s_client -connect example.com:443 -tls1_2
openssl s_client -connect example.com:443 -tls1_3
```

### 16.4 Common debugging scenarios <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23164-common-debugging-scenarios%0A%0ASection%20title%3A%2016.4%20Common%20debugging%20scenarios' target='_blank' rel='noopener' data-askgpt='16.4 Common debugging scenarios' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#164-common-debugging-scenarios' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23164-common-debugging-scenarios%0A%0ASection%20title%3A%2016.4%20Common%20debugging%20scenarios' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23164-common-debugging-scenarios%0A%0ASection%20title%3A%2016.4%20Common%20debugging%20scenarios' title='Ask ChatGPT about this section'>💬</a>

- **OAuth2 fails:** check redirect URI, client credentials, scope.
- **JWT rejected:** check issuer, audience, expiry, signature.
- **TLS handshake fails:** check certificate, SNI, cipher suites.
- **API returns 401:** check token expiration, scopes.

### 16.5 Production troubleshooting checklist <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23165-production-troubleshooting-checklist%0A%0ASection%20title%3A%2016.5%20Production%20troubleshooting%20checklist' target='_blank' rel='noopener' data-askgpt='16.5 Production troubleshooting checklist' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#165-production-troubleshooting-checklist' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23165-production-troubleshooting-checklist%0A%0ASection%20title%3A%2016.5%20Production%20troubleshooting%20checklist' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23165-production-troubleshooting-checklist%0A%0ASection%20title%3A%2016.5%20Production%20troubleshooting%20checklist' title='Ask ChatGPT about this section'>💬</a>

- [ ] Capture auth failures with trace_id.
- [ ] Check token validity.
- [ ] Check token scopes.
- [ ] Check CORS.
- [ ] Check TLS.
- [ ] Engage security team.

## 17. Monitoring & Observability

### 17.1 Security logs <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23171-security-logs%0A%0ASection%20title%3A%2017.1%20Security%20logs' target='_blank' rel='noopener' data-askgpt='17.1 Security logs' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#171-security-logs' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23171-security-logs%0A%0ASection%20title%3A%2017.1%20Security%20logs' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23171-security-logs%0A%0ASection%20title%3A%2017.1%20Security%20logs' title='Ask ChatGPT about this section'>💬</a>

- **Login success/failure** (with user, IP, user-agent).
- **Privilege escalation** (role change).
- **Sensitive data access** (PII, payment).
- **Admin actions.**
- **Authentication failures** (brute force detection).
- **API key usage.**
- **Secrets access.**

### 17.2 Security metrics <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23172-security-metrics%0A%0ASection%20title%3A%2017.2%20Security%20metrics' target='_blank' rel='noopener' data-askgpt='17.2 Security metrics' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#172-security-metrics' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23172-security-metrics%0A%0ASection%20title%3A%2017.2%20Security%20metrics' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23172-security-metrics%0A%0ASection%20title%3A%2017.2%20Security%20metrics' title='Ask ChatGPT about this section'>💬</a>

- Failed login rate per user.
- Failed login rate per IP.
- MFA bypass rate.
- API key rotation rate.
- Secrets access rate.
- Privilege changes per day.

### 17.3 Anomaly detection <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23173-anomaly-detection%0A%0ASection%20title%3A%2017.3%20Anomaly%20detection' target='_blank' rel='noopener' data-askgpt='17.3 Anomaly detection' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#173-anomaly-detection' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23173-anomaly-detection%0A%0ASection%20title%3A%2017.3%20Anomaly%20detection' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23173-anomaly-detection%0A%0ASection%20title%3A%2017.3%20Anomaly%20detection' title='Ask ChatGPT about this section'>💬</a>

- **Impossible travel:** login from different continents within minutes.
- **Unusual activity:** sudden spike in access.
- **New device:** login from new device.
- **New geo:** login from new country.

### 17.4 Security alerts <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23174-security-alerts%0A%0ASection%20title%3A%2017.4%20Security%20alerts' target='_blank' rel='noopener' data-askgpt='17.4 Security alerts' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#174-security-alerts' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23174-security-alerts%0A%0ASection%20title%3A%2017.4%20Security%20alerts' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23174-security-alerts%0A%0ASection%20title%3A%2017.4%20Security%20alerts' title='Ask ChatGPT about this section'>💬</a>

- Failed login rate > 100/min from one IP.
- Admin actions outside business hours.
- New IAM user created.
- Public S3 bucket created.
- TLS certificate expiring in 30 days.

## 18. Best Practices

### 18.1 Industry best practices <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23181-industry-best-practices%0A%0ASection%20title%3A%2018.1%20Industry%20best%20practices' target='_blank' rel='noopener' data-askgpt='18.1 Industry best practices' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#181-industry-best-practices' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23181-industry-best-practices%0A%0ASection%20title%3A%2018.1%20Industry%20best%20practices' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23181-industry-best-practices%0A%0ASection%20title%3A%2018.1%20Industry%20best%20practices' title='Ask ChatGPT about this section'>💬</a>

- **OWASP ASVS** as a checklist.
- **NIST CSF** for governance.
- **Threat modeling** at design time.
- **Defense in depth.**
- **Least privilege.**
- **Encrypt everywhere.**
- **MFA for all users.**
- **Secrets in Vault.**
- **Patch regularly.**
- **Log security events.**

### 18.2 Enterprise practices <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23182-enterprise-practices%0A%0ASection%20title%3A%2018.2%20Enterprise%20practices' target='_blank' rel='noopener' data-askgpt='18.2 Enterprise practices' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#182-enterprise-practices' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23182-enterprise-practices%0A%0ASection%20title%3A%2018.2%20Enterprise%20practices' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23182-enterprise-practices%0A%0ASection%20title%3A%2018.2%20Enterprise%20practices' title='Ask ChatGPT about this section'>💬</a>

- **Identity federation** (OIDC).
- **Centralized secrets management.**
- **Zero trust network.**
- **Security training.**
- **Bug bounty program.**
- **Regular pen testing.**
- **Compliance audits.**

### 18.3 Clean code <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23183-clean-code%0A%0ASection%20title%3A%2018.3%20Clean%20code' target='_blank' rel='noopener' data-askgpt='18.3 Clean code' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#183-clean-code' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23183-clean-code%0A%0ASection%20title%3A%2018.3%20Clean%20code' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23183-clean-code%0A%0ASection%20title%3A%2018.3%20Clean%20code' title='Ask ChatGPT about this section'>💬</a>

- **Validate inputs.**
- **Encode outputs.**
- **Use parameterized queries.**
- **Use established crypto libraries.**
- **Don't log secrets.**

### 18.4 Reliability <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23184-reliability%0A%0ASection%20title%3A%2018.4%20Reliability' target='_blank' rel='noopener' data-askgpt='18.4 Reliability' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#184-reliability' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23184-reliability%0A%0ASection%20title%3A%2018.4%20Reliability' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23184-reliability%0A%0ASection%20title%3A%2018.4%20Reliability' title='Ask ChatGPT about this section'>💬</a>

- **Rate limiting.**
- **Circuit breakers.**
- **Backups.**
- **DR.**

### 18.5 Security <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23185-security%0A%0ASection%20title%3A%2018.5%20Security' target='_blank' rel='noopener' data-askgpt='18.5 Security' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#185-security' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23185-security%0A%0ASection%20title%3A%2018.5%20Security' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23185-security%0A%0ASection%20title%3A%2018.5%20Security' title='Ask ChatGPT about this section'>💬</a>

- **Defense in depth.**
- **Least privilege.**
- **Encrypt everywhere.**
- **MFA.**
- **Audit logs.**

### 18.6 Performance <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23186-performance%0A%0ASection%20title%3A%2018.6%20Performance' target='_blank' rel='noopener' data-askgpt='18.6 Performance' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#186-performance' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23186-performance%0A%0ASection%20title%3A%2018.6%20Performance' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23186-performance%0A%0ASection%20title%3A%2018.6%20Performance' title='Ask ChatGPT about this section'>💬</a>

- **Cache JWT verification.**
- **Connection pooling.**
- **CDN for static.**

### 18.7 Testing <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23187-testing%0A%0ASection%20title%3A%2018.7%20Testing' target='_blank' rel='noopener' data-askgpt='18.7 Testing' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#187-testing' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23187-testing%0A%0ASection%20title%3A%2018.7%20Testing' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23187-testing%0A%0ASection%20title%3A%2018.7%20Testing' title='Ask ChatGPT about this section'>💬</a>

- **SAST** in CI.
- **SCA** in CI.
- **DAST** in staging.
- **Penetration testing.**

### 18.8 Deployment <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23188-deployment%0A%0ASection%20title%3A%2018.8%20Deployment' target='_blank' rel='noopener' data-askgpt='18.8 Deployment' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#188-deployment' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23188-deployment%0A%0ASection%20title%3A%2018.8%20Deployment' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23188-deployment%0A%0ASection%20title%3A%2018.8%20Deployment' title='Ask ChatGPT about this section'>💬</a>

- **Signed artifacts.**
- **Admission control.**
- **Policy as code (OPA).**
- **GitOps.**

## 19. Anti-Patterns

### 19.1 Custom crypto <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23191-custom-crypto%0A%0ASection%20title%3A%2019.1%20Custom%20crypto' target='_blank' rel='noopener' data-askgpt='19.1 Custom crypto' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#191-custom-crypto' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23191-custom-crypto%0A%0ASection%20title%3A%2019.1%20Custom%20crypto' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23191-custom-crypto%0A%0ASection%20title%3A%2019.1%20Custom%20crypto' title='Ask ChatGPT about this section'>💬</a>

```python
# BAD: never do this
def my_hash(input):
    return hashlib.md5(input.encode()).hexdigest()
```

**Fix:** Use established libraries (libsodium, OpenSSL, Bouncy Castle).

### 19.2 Secrets in code <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23192-secrets-in-code%0A%0ASection%20title%3A%2019.2%20Secrets%20in%20code' target='_blank' rel='noopener' data-askgpt='19.2 Secrets in code' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#192-secrets-in-code' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23192-secrets-in-code%0A%0ASection%20title%3A%2019.2%20Secrets%20in%20code' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23192-secrets-in-code%0A%0ASection%20title%3A%2019.2%20Secrets%20in%20code' title='Ask ChatGPT about this section'>💬</a>

```typescript
const apiKey = "sk-live-abc123";
```

**Fix:** Environment variables, secrets manager.

### 19.3 No input validation <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23193-no-input-validation%0A%0ASection%20title%3A%2019.3%20No%20input%20validation' target='_blank' rel='noopener' data-askgpt='19.3 No input validation' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#193-no-input-validation' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23193-no-input-validation%0A%0ASection%20title%3A%2019.3%20No%20input%20validation' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23193-no-input-validation%0A%0ASection%20title%3A%2019.3%20No%20input%20validation' title='Ask ChatGPT about this section'>💬</a>

```typescript
db.query(`SELECT * FROM users WHERE name = '${input}'`);
```

**Fix:** Parameterized queries + validation.

### 19.4 No HTTPS <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23194-no-https%0A%0ASection%20title%3A%2019.4%20No%20HTTPS' target='_blank' rel='noopener' data-askgpt='19.4 No HTTPS' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#194-no-https' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23194-no-https%0A%0ASection%20title%3A%2019.4%20No%20HTTPS' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23194-no-https%0A%0ASection%20title%3A%2019.4%20No%20HTTPS' title='Ask ChatGPT about this section'>💬</a>

```typescript
app.listen(80, () => console.log('Server on :80'));
```

**Fix:** TLS termination (load balancer) or direct TLS.

### 19.5 Long-lived tokens <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23195-long-lived-tokens%0A%0ASection%20title%3A%2019.5%20Long-lived%20tokens' target='_blank' rel='noopener' data-askgpt='19.5 Long-lived tokens' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#195-long-lived-tokens' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23195-long-lived-tokens%0A%0ASection%20title%3A%2019.5%20Long-lived%20tokens' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23195-long-lived-tokens%0A%0ASection%20title%3A%2019.5%20Long-lived%20tokens' title='Ask ChatGPT about this section'>💬</a>

```typescript
const token = jwt.sign({ sub: 'user-1' }, secret, { expiresIn: '365d' });
```

**Fix:** Short-lived access tokens + refresh tokens.

### 19.6 No MFA <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23196-no-mfa%0A%0ASection%20title%3A%2019.6%20No%20MFA' target='_blank' rel='noopener' data-askgpt='19.6 No MFA' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#196-no-mfa' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23196-no-mfa%0A%0ASection%20title%3A%2019.6%20No%20MFA' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23196-no-mfa%0A%0ASection%20title%3A%2019.6%20No%20MFA' title='Ask ChatGPT about this section'>💬</a>

```typescript
// Login with password only
app.post('/login', (req, res) => {
  if (req.body.password === user.password) {
    res.json({ token: ... });
  }
});
```

**Fix:** MFA, especially for admin.

### 19.7 Public S3 with sensitive data <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23197-public-s3-with-sensitive-data%0A%0ASection%20title%3A%2019.7%20Public%20S3%20with%20sensitive%20data' target='_blank' rel='noopener' data-askgpt='19.7 Public S3 with sensitive data' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#197-public-s3-with-sensitive-data' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23197-public-s3-with-sensitive-data%0A%0ASection%20title%3A%2019.7%20Public%20S3%20with%20sensitive%20data' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23197-public-s3-with-sensitive-data%0A%0ASection%20title%3A%2019.7%20Public%20S3%20with%20sensitive%20data' title='Ask ChatGPT about this section'>💬</a>

```json
{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::secrets/*"
}
```

**Fix:** Block public access; use pre-signed URLs.

### 19.8 No logging <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23198-no-logging%0A%0ASection%20title%3A%2019.8%20No%20logging' target='_blank' rel='noopener' data-askgpt='19.8 No logging' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#198-no-logging' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23198-no-logging%0A%0ASection%20title%3A%2019.8%20No%20logging' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23198-no-logging%0A%0ASection%20title%3A%2019.8%20No%20logging' title='Ask ChatGPT about this section'>💬</a>

```typescript
// Auth fails silently
app.post('/login', (req, res) => {
  if (creds invalid) res.status(401).end();
});
```

**Fix:** Log all auth events.

### 19.9 RBAC confusion <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23199-rbac-confusion%0A%0ASection%20title%3A%2019.9%20RBAC%20confusion' target='_blank' rel='noopener' data-askgpt='19.9 RBAC confusion' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#199-rbac-confusion' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23199-rbac-confusion%0A%0ASection%20title%3A%2019.9%20RBAC%20confusion' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23199-rbac-confusion%0A%0ASection%20title%3A%2019.9%20RBAC%20confusion' title='Ask ChatGPT about this section'>💬</a>

```typescript
// Single "admin" role for everything
if (user.role === 'admin') allowEverything();
```

**Fix:** Granular permissions; principle of least privilege.

## 20. Edge Cases

### 20.1 Clock skew <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23201-clock-skew%0A%0ASection%20title%3A%2020.1%20Clock%20skew' target='_blank' rel='noopener' data-askgpt='20.1 Clock skew' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#201-clock-skew' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23201-clock-skew%0A%0ASection%20title%3A%2020.1%20Clock%20skew' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23201-clock-skew%0A%0ASection%20title%3A%2020.1%20Clock%20skew' title='Ask ChatGPT about this section'>💬</a>

JWT validation requires `exp` / `nbf` checks. Clock skew can cause false rejections.

**Mitigation:** 5-minute leeway (`clockTolerance` in libraries).

### 20.2 Key rotation <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23202-key-rotation%0A%0ASection%20title%3A%2020.2%20Key%20rotation' target='_blank' rel='noopener' data-askgpt='20.2 Key rotation' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#202-key-rotation' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23202-key-rotation%0A%0ASection%20title%3A%2020.2%20Key%20rotation' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23202-key-rotation%0A%0ASection%20title%3A%2020.2%20Key%20rotation' title='Ask ChatGPT about this section'>💬</a>

JWT signing keys must rotate. How do clients know?

**Mitigation:** Use `kid` (key ID) header; JWKS endpoint; overlapping keys during rotation.

### 20.3 Certificate expiry <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23203-certificate-expiry%0A%0ASection%20title%3A%2020.3%20Certificate%20expiry' target='_blank' rel='noopener' data-askgpt='20.3 Certificate expiry' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#203-certificate-expiry' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23203-certificate-expiry%0A%0ASection%20title%3A%2020.3%20Certificate%20expiry' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23203-certificate-expiry%0A%0ASection%20title%3A%2020.3%20Certificate%20expiry' title='Ask ChatGPT about this section'>💬</a>

TLS certificates expire. Renew before.

**Mitigation:** Let's Encrypt; ACME; monitoring.

### 20.4 Replay attacks <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23204-replay-attacks%0A%0ASection%20title%3A%2020.4%20Replay%20attacks' target='_blank' rel='noopener' data-askgpt='20.4 Replay attacks' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#204-replay-attacks' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23204-replay-attacks%0A%0ASection%20title%3A%2020.4%20Replay%20attacks' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23204-replay-attacks%0A%0ASection%20title%3A%2020.4%20Replay%20attacks' title='Ask ChatGPT about this section'>💬</a>

JWT can be stolen and replayed.

**Mitigation:** Short TTL; refresh tokens; one-time use tokens for sensitive operations.

### 20.5 Token revocation <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23205-token-revocation%0A%0ASection%20title%3A%2020.5%20Token%20revocation' target='_blank' rel='noopener' data-askgpt='20.5 Token revocation' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#205-token-revocation' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23205-token-revocation%0A%0ASection%20title%3A%2020.5%20Token%20revocation' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23205-token-revocation%0A%0ASection%20title%3A%2020.5%20Token%20revocation' title='Ask ChatGPT about this section'>💬</a>

JWT is hard to revoke (no server-side state).

**Mitigation:** Short TTL; refresh token revocation; denylist (added latency).

### 20.6 Cross-tenant token <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23206-cross-tenant-token%0A%0ASection%20title%3A%2020.6%20Cross-tenant%20token' target='_blank' rel='noopener' data-askgpt='20.6 Cross-tenant token' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#206-cross-tenant-token' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23206-cross-tenant-token%0A%0ASection%20title%3A%2020.6%20Cross-tenant%20token' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23206-cross-tenant-token%0A%0ASection%20title%3A%2020.6%20Cross-tenant%20token' title='Ask ChatGPT about this section'>💬</a>

JWT issued for app A reused for app B.

**Mitigation:** `aud` claim validation.

### 20.7 Algorithm downgrade <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23207-algorithm-downgrade%0A%0ASection%20title%3A%2020.7%20Algorithm%20downgrade' target='_blank' rel='noopener' data-askgpt='20.7 Algorithm downgrade' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#207-algorithm-downgrade' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23207-algorithm-downgrade%0A%0ASection%20title%3A%2020.7%20Algorithm%20downgrade' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23207-algorithm-downgrade%0A%0ASection%20title%3A%2020.7%20Algorithm%20downgrade' title='Ask ChatGPT about this section'>💬</a>

Attacker forces TLS downgrade.

**Mitigation:** Strict TLS version; HSTS.

### 20.8 PII in JWT <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23208-pii-in-jwt%0A%0ASection%20title%3A%2020.8%20PII%20in%20JWT' target='_blank' rel='noopener' data-askgpt='20.8 PII in JWT' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#208-pii-in-jwt' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23208-pii-in-jwt%0A%0ASection%20title%3A%2020.8%20PII%20in%20JWT' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23208-pii-in-jwt%0A%0ASection%20title%3A%2020.8%20PII%20in%20JWT' title='Ask ChatGPT about this section'>💬</a>

JWT is base64, not encrypted.

**Mitigation:** Don't put PII in JWT; use opaque tokens for sensitive data.

### 20.9 Vendor breach <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23209-vendor-breach%0A%0ASection%20title%3A%2020.9%20Vendor%20breach' target='_blank' rel='noopener' data-askgpt='20.9 Vendor breach' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#209-vendor-breach' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23209-vendor-breach%0A%0ASection%20title%3A%2020.9%20Vendor%20breach' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23209-vendor-breach%0A%0ASection%20title%3A%2020.9%20Vendor%20breach' title='Ask ChatGPT about this section'>💬</a>

A library you depend on is compromised.

**Mitigation:** SBOM; SCA; rapid patching.

---

## 21. Comparisons

### 21.1 OAuth 2.0 grant types <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23211-oauth-20-grant-types%0A%0ASection%20title%3A%2021.1%20OAuth%202.0%20grant%20types' target='_blank' rel='noopener' data-askgpt='21.1 OAuth 2.0 grant types' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#211-oauth-20-grant-types' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23211-oauth-20-grant-types%0A%0ASection%20title%3A%2021.1%20OAuth%202.0%20grant%20types' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23211-oauth-20-grant-types%0A%0ASection%20title%3A%2021.1%20OAuth%202.0%20grant%20types' title='Ask ChatGPT about this section'>💬</a>

| Grant | Use case | Security | Modern |
|-------|----------|----------|--------|
| Authorization Code | Web apps with backend | High (with PKCE) | Yes |
| Implicit (deprecated) | SPAs (legacy) | Low (token in URL) | No (use auth code + PKCE) |
| Resource Owner Password | Legacy (own UI) | Very low (plain password) | No (avoid) |
| Client Credentials | Service-to-service | High (client secret or mTLS) | Yes |
| Device Code | Input-constrained devices | Medium (device polling) | Yes |

### 21.2 OAuth 2.0 vs OIDC <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23212-oauth-20-vs-oidc%0A%0ASection%20title%3A%2021.2%20OAuth%202.0%20vs%20OIDC' target='_blank' rel='noopener' data-askgpt='21.2 OAuth 2.0 vs OIDC' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#212-oauth-20-vs-oidc' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23212-oauth-20-vs-oidc%0A%0ASection%20title%3A%2021.2%20OAuth%202.0%20vs%20OIDC' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23212-oauth-20-vs-oidc%0A%0ASection%20title%3A%2021.2%20OAuth%202.0%20vs%20OIDC' title='Ask ChatGPT about this section'>💬</a>

| Dimension | OAuth 2.0 | OIDC |
|-----------|-----------|------|
| **Purpose** | Authorization | Authentication (built on OAuth 2.0) |
| **Token format** | Access token (opaque or JWT) | ID token (JWT) + access token |
| **User info** | No | ID token claims + UserInfo |
| **Standard claims** | Limited | Standardized |

### 21.3 OAuth 2.0 vs SAML <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23213-oauth-20-vs-saml%0A%0ASection%20title%3A%2021.3%20OAuth%202.0%20vs%20SAML' target='_blank' rel='noopener' data-askgpt='21.3 OAuth 2.0 vs SAML' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#213-oauth-20-vs-saml' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23213-oauth-20-vs-saml%0A%0ASection%20title%3A%2021.3%20OAuth%202.0%20vs%20SAML' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23213-oauth-20-vs-saml%0A%0ASection%20title%3A%2021.3%20OAuth%202.0%20vs%20SAML' title='Ask ChatGPT about this section'>💬</a>

| Dimension | OAuth 2.0 | SAML 2.0 |
|-----------|-----------|----------|
| **Year** | 2012 | 2005 |
| **Format** | JSON | XML |
| **Token** | Bearer token | SAML assertion |
| **Mobile** | Yes | Awkward |
| **Modern** | Yes | Legacy enterprise |

### 21.4 JWT vs PASETO <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23214-jwt-vs-paseto%0A%0ASection%20title%3A%2021.4%20JWT%20vs%20PASETO' target='_blank' rel='noopener' data-askgpt='21.4 JWT vs PASETO' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#214-jwt-vs-paseto' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23214-jwt-vs-paseto%0A%0ASection%20title%3A%2021.4%20JWT%20vs%20PASETO' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23214-jwt-vs-paseto%0A%0ASection%20title%3A%2021.4%20JWT%20vs%20PASETO' title='Ask ChatGPT about this section'>💬</a>

| Dimension | JWT | PASETO |
|-----------|-----|--------|
| **Year** | 2015 | 2018 |
| **Algorithms** | Many (some insecure) | Few (secure) |
| **Security** | Algorithm-confusion attacks | Safer by design |
| **Adoption** | Very high | Smaller |

### 21.5 TLS 1.2 vs TLS 1.3 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23215-tls-12-vs-tls-13%0A%0ASection%20title%3A%2021.5%20TLS%201.2%20vs%20TLS%201.3' target='_blank' rel='noopener' data-askgpt='21.5 TLS 1.2 vs TLS 1.3' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#215-tls-12-vs-tls-13' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23215-tls-12-vs-tls-13%0A%0ASection%20title%3A%2021.5%20TLS%201.2%20vs%20TLS%201.3' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23215-tls-12-vs-tls-13%0A%0ASection%20title%3A%2021.5%20TLS%201.2%20vs%20TLS%201.3' title='Ask ChatGPT about this section'>💬</a>

| Dimension | TLS 1.2 | TLS 1.3 |
|-----------|---------|---------|
| **Handshake** | 2-RTT | 1-RTT |
| **0-RTT** | No | Yes |
| **PFS** | Optional | Mandatory |
| **Ciphers** | Mixed | AEAD only |
| **Recommended** | Yes | Yes (preferred) |

### 21.6 mTLS vs TLS <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23216-mtls-vs-tls%0A%0ASection%20title%3A%2021.6%20mTLS%20vs%20TLS' target='_blank' rel='noopener' data-askgpt='21.6 mTLS vs TLS' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#216-mtls-vs-tls' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23216-mtls-vs-tls%0A%0ASection%20title%3A%2021.6%20mTLS%20vs%20TLS' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23216-mtls-vs-tls%0A%0ASection%20title%3A%2021.6%20mTLS%20vs%20TLS' title='Ask ChatGPT about this section'>💬</a>

| Dimension | TLS | mTLS |
|-----------|-----|------|
| **Authentication** | Server only | Server + client |
| **Use case** | Public websites | Service-to-service, zero-trust |
| **Complexity** | Low | High (cert management) |

### 21.7 Vault vs Secrets Manager <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23217-vault-vs-secrets-manager%0A%0ASection%20title%3A%2021.7%20Vault%20vs%20Secrets%20Manager' target='_blank' rel='noopener' data-askgpt='21.7 Vault vs Secrets Manager' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#217-vault-vs-secrets-manager' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23217-vault-vs-secrets-manager%0A%0ASection%20title%3A%2021.7%20Vault%20vs%20Secrets%20Manager' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23217-vault-vs-secrets-manager%0A%0ASection%20title%3A%2021.7%20Vault%20vs%20Secrets%20Manager' title='Ask ChatGPT about this section'>💬</a>

| Dimension | Vault | AWS Secrets Manager |
|-----------|-------|---------------------|
| **Dynamic secrets** | Yes (DB, AWS, etc.) | RDS only |
| **Multi-cloud** | Yes | No (AWS) |
| **Open source** | Yes | No |
| **Pricing** | Open source (Enterprise) | Per-secret |
| **Best for** | Multi-cloud, dynamic | AWS-only |

### 21.8 SAST tools <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23218-sast-tools%0A%0ASection%20title%3A%2021.8%20SAST%20tools' target='_blank' rel='noopener' data-askgpt='21.8 SAST tools' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#218-sast-tools' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23218-sast-tools%0A%0ASection%20title%3A%2021.8%20SAST%20tools' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23218-sast-tools%0A%0ASection%20title%3A%2021.8%20SAST%20tools' title='Ask ChatGPT about this section'>💬</a>

| Tool | Best for |
|------|----------|
| **Semgrep** | Multi-language; fast |
| **CodeQL** | Deep semantic analysis |
| **Snyk Code** | IDE integration |
| **SonarQube** | Enterprise, multi-language |
| **CodeQL** | GitHub integration |

### 21.9 SCA tools <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23219-sca-tools%0A%0ASection%20title%3A%2021.9%20SCA%20tools' target='_blank' rel='noopener' data-askgpt='21.9 SCA tools' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#219-sca-tools' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23219-sca-tools%0A%0ASection%20title%3A%2021.9%20SCA%20tools' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23219-sca-tools%0A%0ASection%20title%3A%2021.9%20SCA%20tools' title='Ask ChatGPT about this section'>💬</a>

| Tool | Strengths |
|------|-----------|
| **Dependabot** | GitHub integration; free |
| **Snyk Open Source** | Comprehensive; auto-fix |
| **WhiteSource** | Enterprise features |
| **GitLab Dependency Scanning** | GitLab integration |
| **Socket** | Detects malicious packages |

### 21.10 WAF comparison <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%232110-waf-comparison%0A%0ASection%20title%3A%2021.10%20WAF%20comparison' target='_blank' rel='noopener' data-askgpt='21.10 WAF comparison' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#2110-waf-comparison' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%232110-waf-comparison%0A%0ASection%20title%3A%2021.10%20WAF%20comparison' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%232110-waf-comparison%0A%0ASection%20title%3A%2021.10%20WAF%20comparison' title='Ask ChatGPT about this section'>💬</a>

| WAF | Strengths |
|-----|-----------|
| **Cloudflare WAF** | Global scale; free tier |
| **AWS WAF** | AWS integration |
| **ModSecurity + CRS** | Open source |
| **Azure WAF** | Azure integration |
| **Cloud Armor (GCP)** | GCP integration |

### 21.11 Decision matrix <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%232111-decision-matrix%0A%0ASection%20title%3A%2021.11%20Decision%20matrix' target='_blank' rel='noopener' data-askgpt='21.11 Decision matrix' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#2111-decision-matrix' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%232111-decision-matrix%0A%0ASection%20title%3A%2021.11%20Decision%20matrix' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%232111-decision-matrix%0A%0ASection%20title%3A%2021.11%20Decision%20matrix' title='Ask ChatGPT about this section'>💬</a>

| Workload | Recommended |
|----------|------------|
| Modern web auth | OAuth 2.1 + OIDC + PKCE |
| Service-to-service | mTLS (SPIFFE/SPIRE) |
| Microservices (K8s) | mTLS via Istio Linkerd |
| Enterprise SSO | OIDC (modern) or SAML (legacy) |
| Database credentials | Vault dynamic secrets |
| API keys | Secrets Manager + rotation |
| TLS | 1.3 with strong cipher suites |
| Compliance | SOC2 + ISO 27001 + GDPR |
| Vulnerability scanning | SCA + SAST + DAST |

---

## 22. Interview Preparation

### 22.1 Beginner (0-1 years) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23221-beginner-0-1-years%0A%0ASection%20title%3A%2022.1%20Beginner%20(0-1%20years)' target='_blank' rel='noopener' data-askgpt='22.1 Beginner (0-1 years)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#221-beginner-0-1-years' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23221-beginner-0-1-years%0A%0ASection%20title%3A%2022.1%20Beginner%20(0-1%20years)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23221-beginner-0-1-years%0A%0ASection%20title%3A%2022.1%20Beginner%20(0-1%20years)' title='Ask ChatGPT about this section'>💬</a>

**Q1: What is the CIA triad?**
**A:** Confidentiality (data is only accessible to authorized), Integrity (data is not tampered with), Availability (data is accessible when needed).

**Q2: What is OWASP Top 10?**
**A:** A list of the ten most critical web application security risks, published by OWASP. Updated every few years; current is 2021.

**Q3: What is SQL injection?**
**A:** An attack where user input is concatenated into SQL queries without sanitization, allowing attackers to execute arbitrary SQL.

**Q4: What is XSS?**
**A:** Cross-Site Scripting — an attack where malicious scripts are injected into web pages viewed by other users.

**Q5: What is HTTPS?**
**A:** HTTP over TLS; encrypts HTTP traffic between client and server, preventing eavesdropping and tampering.

### 22.2 Junior (1-2 years) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23222-junior-1-2-years%0A%0ASection%20title%3A%2022.2%20Junior%20(1-2%20years)' target='_blank' rel='noopener' data-askgpt='22.2 Junior (1-2 years)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#222-junior-1-2-years' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23222-junior-1-2-years%0A%0ASection%20title%3A%2022.2%20Junior%20(1-2%20years)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23222-junior-1-2-years%0A%0ASection%20title%3A%2022.2%20Junior%20(1-2%20years)' title='Ask ChatGPT about this section'>💬</a>

**Q6: How do you store passwords securely?**
**A:** Use Argon2id (or bcrypt). Salt per user. Never log or email passwords. Use a work factor that takes ~250ms.

**Q7: What is OAuth 2.0?**
**A:** An authorization framework. Allows third-party apps to access user resources without sharing credentials. Uses access tokens.

**Q8: What is JWT?**
**A:** JSON Web Token — a signed JSON token format. Header (algorithm), payload (claims), signature. Used for stateless authentication.

**Q9: What is CSRF?**
**A:** Cross-Site Request Forgery — an attack where a user is tricked into submitting a request to a site where they're authenticated. Mitigations: SameSite cookies, CSRF tokens.

**Q10: What is the difference between authentication and authorization?**
**A:** Authentication: verify identity (who you are). Authorization: verify permissions (what you can do).

### 22.3 Mid (2-4 years) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23223-mid-2-4-years%0A%0ASection%20title%3A%2022.3%20Mid%20(2-4%20years)' target='_blank' rel='noopener' data-askgpt='22.3 Mid (2-4 years)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#223-mid-2-4-years' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23223-mid-2-4-years%0A%0ASection%20title%3A%2022.3%20Mid%20(2-4%20years)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23223-mid-2-4-years%0A%0ASection%20title%3A%2022.3%20Mid%20(2-4%20years)' title='Ask ChatGPT about this section'>💬</a>

**Q11: How does PKCE prevent authorization code interception?**
**A:** The client generates a code_verifier, sends its hash (code_challenge) with the auth request. The auth server stores it. When exchanging the code, the client sends the original code_verifier; the auth server verifies it matches. An attacker who intercepts the code can't exchange it without the verifier.

**Q12: How do you rotate JWT signing keys without disrupting users?**
**A:** Use key IDs (kid) in the JWT header. The JWKS endpoint publishes a list of valid keys. During rotation, both old and new keys are valid. Clients fetch the new key on the fly.

**Q13: What is the difference between symmetric and asymmetric encryption? When to use each?**
**A:** Symmetric: same key encrypts and decrypts; fast; use for data at rest and bulk data. Asymmetric: public key encrypts, private key decrypts (or vice versa); slower; use for key exchange and digital signatures.

**Q14: How do you prevent SSRF?**
**A:** Allowlist of allowed domains/IPs. Block private IP ranges (RFC 1918). Resolve hostname before connecting (prevent DNS rebinding). Disable redirects. Use a proxy.

**Q15: What is threat modeling?**
**A:** A systematic approach to identifying and prioritizing threats. STRIDE (Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege). Use attack trees, DREAD, PASTA.

**Q16: How do you handle secrets in a microservices architecture?**
**A:** External secrets manager (Vault, AWS Secrets Manager). Inject at startup. Rotate regularly. Use IAM roles instead of static credentials. Never commit to git.

### 22.4 Senior (4-6 years) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23224-senior-4-6-years%0A%0ASection%20title%3A%2022.4%20Senior%20(4-6%20years)' target='_blank' rel='noopener' data-askgpt='22.4 Senior (4-6 years)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#224-senior-4-6-years' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23224-senior-4-6-years%0A%0ASection%20title%3A%2022.4%20Senior%20(4-6%20years)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23224-senior-4-6-years%0A%0ASection%20title%3A%2022.4%20Senior%20(4-6%20years)' title='Ask ChatGPT about this section'>💬</a>

**Q17: How do you design an OAuth 2.0 authorization server?**
**A:** (1) OIDC-compliant (so it can also authenticate). (2) Issue short-lived access tokens. (3) Refresh token rotation. (3) PKCE for all clients. (4) Exact redirect URI matching. (5) State for CSRF. (6) Use established library (Keycloak, Hydra, Auth0). (7) Audit logs.

**Q18: How do you implement zero trust?**
**A:** (1) Verify explicitly (mTLS, OIDC, MFA). (2) Least privilege. (3) Assume breach (segmentation, encryption). (4) Continuous verification (re-auth, device posture). (5) Encrypted everywhere (TLS, mTLS).

**Q19: How do you respond to a data breach?**
**A:** (1) Contain (isolate affected systems). (2) Investigate (forensic analysis). (3) Notify (GDPR: 72 hours; customers; regulators). (4) Remediate (patch, rotate credentials). (5) Postmortem (blameless; root cause; action items).

**Q20: How do you design a secrets rotation policy?**
**A:** (1) Classify secrets (DB creds, API keys, certs). (2) Define rotation frequency per class. (3) Automate (Vault dynamic secrets, ACME). (4) Audit rotation. (5) Test rotation.

**Q21: How do you implement a CSRF token in a single-page app?**
**A:** (1) Server issues CSRF token in cookie (NOT httpOnly) on initial page load. (2) SPA reads cookie and sends in X-CSRF-Token header. (3) Server compares cookie to header. (4) Use SameSite=Strict cookies for additional protection.

### 22.5 Lead (6-8 years) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23225-lead-6-8-years%0A%0ASection%20title%3A%2022.5%20Lead%20(6-8%20years)' target='_blank' rel='noopener' data-askgpt='22.5 Lead (6-8 years)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#225-lead-6-8-years' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23225-lead-6-8-years%0A%0ASection%20title%3A%2022.5%20Lead%20(6-8%20years)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23225-lead-6-8-years%0A%0ASection%20title%3A%2022.5%20Lead%20(6-8%20years)' title='Ask ChatGPT about this section'>💬</a>

**Q22: How do you design a multi-region OAuth 2.0 deployment?**
**A:** (1) Multi-region OIDC provider (Keycloak, Auth0). (2) Database replication for user data. (3) Token signing keys synchronized via JWKS. (4) Geographic routing for low latency. (5) Consider hybrid: regional + global failover.

**Q23: How do you design a zero-trust network?**
**A:** (1) Identity-aware proxy at every entry point. (2) mTLS between all services. (3) SPIFFE for workload identity. (4) No implicit trust based on network location. (5) Continuous verification (re-auth, device posture).

**Q24: How do you build an effective security operations program?**
**A:** (1) Threat intelligence. (2) Vulnerability management (SCA, SAST, DAST). (3) Incident response plan. (4) Security monitoring (SIEM, anomaly detection). (5) Regular pen testing. (6) Security training. (7) Bug bounty.

### 22.6 Staff (8-12 years) <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23226-staff-8-12-years%0A%0ASection%20title%3A%2022.6%20Staff%20(8-12%20years)' target='_blank' rel='noopener' data-askgpt='22.6 Staff (8-12 years)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#226-staff-8-12-years' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23226-staff-8-12-years%0A%0ASection%20title%3A%2022.6%20Staff%20(8-12%20years)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23226-staff-8-12-years%0A%0ASection%20title%3A%2022.6%20Staff%20(8-12%20years)' title='Ask ChatGPT about this section'>💬</a>

**Q25: How do you evolve security over years?**
**A:** (1) Start with secure defaults (HTTPS, MFA, encryption). (2) Add threat modeling at design time. (3) Implement zero trust. (4) Mature secrets management. (5) Automate security testing. (6) Continuous improvement based on incidents and threat intel.

**Q26: How do you balance security and developer experience?**
**A:** (1) Secure defaults (don't make security opt-in). (2) Easy-to-use libraries (don't make devs write crypto). (3) Fast feedback (security tests in CI). (4) Good documentation. (5) Easy secrets management.

### 22.7 Principal / Architect <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23227-principal-architect%0A%0ASection%20title%3A%2022.7%20Principal%20%2F%20Architect' target='_blank' rel='noopener' data-askgpt='22.7 Principal / Architect' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#227-principal-architect' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23227-principal-architect%0A%0ASection%20title%3A%2022.7%20Principal%20%2F%20Architect' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23227-principal-architect%0A%0ASection%20title%3A%2022.7%20Principal%20%2F%20Architect' title='Ask ChatGPT about this section'>💬</a>

**Q27: When would you choose not to use OAuth 2.0?**
**A:** (1) Simple internal app; just use session cookies. (2) Legacy enterprise with SAML. (3) Embedded system with no browser. (4) Privacy-sensitive where you don't want third-party access.

**Q28: How do you design security for a zero-trust cloud-native system?**
**A:** (1) SPIFFE for workload identity. (2) mTLS between services. (3) OIDC for human identity. (4) Policy as code (OPA). (5) Encrypted everywhere. (6) Audit everything. (7) Assume breach.

### 22.8 Scenario-based questions <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23228-scenario-based-questions%0A%0ASection%20title%3A%2022.8%20Scenario-based%20questions' target='_blank' rel='noopener' data-askgpt='22.8 Scenario-based questions' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#228-scenario-based-questions' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23228-scenario-based-questions%0A%0ASection%20title%3A%2022.8%20Scenario-based%20questions' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23228-scenario-based-questions%0A%0ASection%20title%3A%2022.8%20Scenario-based%20questions' title='Ask ChatGPT about this section'>💬</a>

**Scenario 1:** A user reports their account was hacked. How do you investigate?
**Answer:** (1) Review auth logs (logins, password changes, MFA). (2) Check for credential stuffing (failed logins from many IPs). (3) Check for session hijacking. (4) Check for password reuse (Have I Been Pwned). (5) Force password reset. (6) Revoke active sessions. (7) Enable MFA. (8) Postmortem.

**Scenario 2:** A pentest finds a SQL injection vulnerability. How do you fix it?
**Answer:** (1) Identify the vulnerable query. (2) Use parameterized queries. (3) Validate input. (4) Add WAF rules as defense in depth. (5) Add SAST to CI to prevent regression. (6) Re-test.

**Scenario 3:** Your data breach notification deadline is in 24 hours (GDPR 72 hours). What do you do?
**Answer:** (1) Confirm breach scope. (2) Identify affected users. (3) Notify supervisory authority (within 72 hours). (4) Notify affected users (without undue delay). (5) Document the breach. (6) Begin remediation. (7) Prepare public statement.

**Scenario 4:** A new CVE in a dependency you use was published. How do you respond?
**Answer:** (1) Assess impact (does it apply to your use?). (2) Check if exploited in the wild. (3) Update dependency (or pin/workaround). (4) Test in staging. (5) Deploy to prod. (6) Verify. (7) Document in incident postmortem if needed.

---

## 23. References

### 23.1 Standards and RFCs <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23231-standards-and-rfcs%0A%0ASection%20title%3A%2023.1%20Standards%20and%20RFCs' target='_blank' rel='noopener' data-askgpt='23.1 Standards and RFCs' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#231-standards-and-rfcs' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23231-standards-and-rfcs%0A%0ASection%20title%3A%2023.1%20Standards%20and%20RFCs' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23231-standards-and-rfcs%0A%0ASection%20title%3A%2023.1%20Standards%20and%20RFCs' title='Ask ChatGPT about this section'>💬</a>

- **OWASP Top 10:** <https://owasp.org/www-project-top-ten/
- **OWASP API Security Top 10:** <https://owasp.org/API-Security/editions/2023/
- **OWASP ASVS:** <https://owasp.org/www-project-application-security-verification-standard/
- **OWASP Cheat Sheets:** <https://cheatsheetseries.owasp.org/
- **OAuth 2.0 (RFC 6749):** <https://www.rfc-editor.org/rfc/rfc6749
- **OAuth 2.1:** (Draft)
- **PKCE (RFC 7636):** <https://www.rfc-editor.org/rfc/rfc7636
- **OIDC Core:** <https://openid.net/specs/openid-connect-core-1_0
- **JWT (RFC 7519):** <https://www.rfc-editor.org/rfc/rfc7519
- **JWS (RFC 7515):** <https://www.rfc-editor.org/rfc/rfc7515
- **JWE (RFC 7516):** <https://www.rfc-editor.org/rfc/rfc7516
- **TLS 1.3 (RFC 8446):** <https://www.rfc-editor.org/rfc/rfc8446
- **HSTS (RFC 6797):** <https://www.rfc-editor.org/rfc/rfc6797
- **CSP (W3C):** <https://www.w3.org/TR/CSP3
- **NIST CSF 2.0:** <https://www.nist.gov/cyberframework
- **NIST SP 800-207 (Zero Trust):** <https://csrc.nist.gov/publications/detail/sp/800-207
- **NIST SP 800-53:** <https://csrc.nist.gov/publications/detail/sp/800-53

### 23.2 Books <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23232-books%0A%0ASection%20title%3A%2023.2%20Books' target='_blank' rel='noopener' data-askgpt='23.2 Books' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#232-books' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23232-books%0A%0ASection%20title%3A%2023.2%20Books' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23232-books%0A%0ASection%20title%3A%2023.2%20Books' title='Ask ChatGPT about this section'>💬</a>

- *The Web Application Hacker's Handbook* — Stuttard, Pinto (Wiley).
- *Alice and Bob Learn Application Security* — Tesfahun (Wiley).
- *Threat Modeling* — Shostack (Wiley).
- *Bulletproof TLS and PKI* — Ristic (Feisty Duck). Free online.
- *OWASP Testing Guide* — Meucci et al. Free online.
- *Cryptography Engineering* — Ferguson, Schneier, Kohno (Wiley).
- *OAuth 2 in Action* — Justin Richer, Antonio Sanso (Manning).
- *Hacking Exposed Web Applications* — Scambray, Liu, Sima (McGraw-Hill).
- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly). Free online.
- *Computer Security: Art and Science* — Bishop (Addison-Wesley).

### 23.3 Community <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23233-community%0A%0ASection%20title%3A%2023.3%20Community' target='_blank' rel='noopener' data-askgpt='23.3 Community' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#233-community' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23233-community%0A%0ASection%20title%3A%2023.3%20Community' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23233-community%0A%0ASection%20title%3A%2023.3%20Community' title='Ask ChatGPT about this section'>💬</a>

- **OWASP Slack:** <https://owasp.org/slack/invite
- **OWASP local chapters:** worldwide.
- **r/netsec:** Reddit.
- **Bug Bounty forums:** HackerOne, Bugcrowd.
- **SANS Internet Storm Center:** <https://isc.sans.edu/

### 23.4 Tools <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23234-tools%0A%0ASection%20title%3A%2023.4%20Tools' target='_blank' rel='noopener' data-askgpt='23.4 Tools' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#234-tools' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23234-tools%0A%0ASection%20title%3A%2023.4%20Tools' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23234-tools%0A%0ASection%20title%3A%2023.4%20Tools' title='Ask ChatGPT about this section'>💬</a>

- **OWASP ZAP:** <https://www.zaproxy.org/
- **Burp Suite:** <https://portswigger.net/burp
- **Semgrep:** <https://semgrep.dev/
- **CodeQL:** <https://codeql.github.com/
- **Trivy:** <https://trivy.dev/
- **HashiCorp Vault:** <https://www.vaultproject.io/
- **Snyk:** <https://snyk.io/
- **Auth0:** <https://auth0.com/
- **Keycloak:** <https://www.keycloak.org/
- **Cosign (Sigstore):** <https://github.com/sigstore/cosign
- **Falco:** <https://falco.org/
- **Tetragon:** <https://github.com/cilium/tetragon

### 23.5 Conferences <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23235-conferences%0A%0ASection%20title%3A%2023.5%20Conferences' target='_blank' rel='noopener' data-askgpt='23.5 Conferences' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#235-conferences' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23235-conferences%0A%0ASection%20title%3A%2023.5%20Conferences' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23235-conferences%0A%0ASection%20title%3A%2023.5%20Conferences' title='Ask ChatGPT about this section'>💬</a>

- **OWASP AppSec USA / Europe / Asia.**
- **Black Hat / DEF CON.**
- **RSA Conference.**
- **USENIX Security.**
- **ACM CCS.**

### 23.6 Free online resources <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23236-free-online-resources%0A%0ASection%20title%3A%2023.6%20Free%20online%20resources' target='_blank' rel='noopener' data-askgpt='23.6 Free online resources' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/security.md#236-free-online-resources' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23236-free-online-resources%0A%0ASection%20title%3A%2023.6%20Free%20online%20resources' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fsecurity.md%23236-free-online-resources%0A%0ASection%20title%3A%2023.6%20Free%20online%20resources' title='Ask ChatGPT about this section'>💬</a>

- **OWASP ASVS:** <https://owasp.org/www-project-application-security-verification-standard/
- **PortSwigger Web Security Academy:** <https://portswigger.net/web-security
- **HackTheBox / TryHackMe:** Practice.
- **Google Cybersecurity Certificate:** <https://grow.google/certificates/cybersecurity/
- **Cybrary:** <https://www.cybrary.it/

---

## Appendix A: TLS Cipher Suite Selection

**For TLS 1.3:**

```
TLS_AES_128_GCM_SHA256          # modern; fast
TLS_AES_256_GCM_SHA384          # modern; very strong
TLS_CHACHA20_POLY1305_SHA256    # modern; mobile
```

**For TLS 1.2 (legacy compat):**

```
TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
```

**Disallowed:**

- TLS_RSA_WITH_AES_128_GCM_SHA256 (no PFS)
- TLS_RSA_WITH_AES_256_GCM_SHA384 (no PFS)
- Any CBC mode (BEAST, POODLE)
- 3DES, RC4
- MD5, SHA-1 in signatures

## Appendix B: OWASP ASVS Verification Checklist (v4.0, Level 2)

| ID | Category | Check |
|----|----------|-------|
| V1 | Architecture | Threat model exists |
| V2 | Authentication | MFA for sensitive ops |
| V3 | Session Management | Secure cookie flags |
| V4 | Access Control | Deny by default |
| V5 | Validation, Sanitization | All input validated |
| V6 | Stored Crypto | AES-256 / RSA-2048+ |
| V7 | Error Handling | No info leakage |
| V8 | Data Protection | Encrypted at rest and in transit |
| V9 | Communication | TLS 1.2+ everywhere |
| V10 | Malicious Code | No eval / dynamic code |
| V11 | Business Logic | Rate limiting, throttling |
| V12 | Files | Validate file types |
| V13 | API and Web Service | OAuth2 / OIDC |
| V14 | Configuration | Hardened, no defaults |

## Appendix C: Glossary

| Term | Definition |
|------|-----------|
| **AEAD** | Authenticated Encryption with Associated Data |
| **BCP** | Best Current Practice (IETF) |
| **CCM** | Counter with CBC-MAC |
| **CORS** | Cross-Origin Resource Sharing |
| **CP** | Certificate Pinning (or Customer Premises) |
| **CRL** | Certificate Revocation List |
| **CWE** | Common Weakness Enumeration (MITRE) |
| **DH** | Diffie-Hellman |
| **DPoP** | Demonstration of Proof-of-Possession |
| **FIPS** | Federal Information Processing Standards |
| **GCM** | Galois/Counter Mode |
| **HSM** | Hardware Security Module |
| **HMAC** | Hash-based Message Authentication Code |
| **JWKS** | JSON Web Key Set |
| **KDF** | Key Derivation Function |
| **MAC** | Message Authentication Code |
| **mTLS** | Mutual TLS |
| **OIDC** | OpenID Connect |
| **PFS** | Perfect Forward Secrecy |
| **PII** | Personally Identifiable Information |
| **PKCE** | Proof Key for Code Exchange |
| **PKI** | Public Key Infrastructure |
| **PQC** | Post-Quantum Cryptography |
| **PSK** | Pre-Shared Key |
| **RBAC** | Role-Based Access Control |
| **RPF** | Reverse Path Filtering (or Rotating Proxy Filter) |
| **SAML** | Security Assertion Markup Language |
| **SLO** | Service Level Objective |
| **SLSA** | Supply chain Levels for Software Artifacts |
| **SPIFFE** | Secure Production Identity Framework for Everyone |
| **SPIRE** | SPIFFE Runtime Environment |
| **SSO** | Single Sign-On |
| **TOTP** | Time-based One-Time Password |
| **TPM** | Trusted Platform Module |
| **VPC** | Virtual Private Cloud (or Virtual Port Channel) |
| **WAF** | Web Application Firewall |
| **XSS** | Cross-Site Scripting |
| **ZTA** | Zero Trust Architecture |

---

*End of document. Total: 23 sections + 3 appendices.*

*Companion resources:*
- *Source: [`security.md`](./security.md)*
- *OWASP: [`references/owasp.md`](./references/owasp.md)*
- *OAuth RFCs: [`references/oauth-rfcs.md`](./references/oauth-rfcs.md)*
- *TLS RFCs: [`references/tls-rfcs.md`](./references/tls-rfcs.md)*
- *NIST frameworks: [`references/nist-frameworks.md`](./references/nist-frameworks.md)*
- *Code examples: [`examples/`](./examples/) (16 security examples)*