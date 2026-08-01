# OAuth and JWT RFCs Reference

This file catalogs the OAuth, OIDC, and JWT RFCs and standards referenced in the Security document.

## OAuth 2.0 RFCs

| RFC | Title | Year |
|-----|-------|------|
| RFC 6749 | The OAuth 2.0 Authorization Framework | 2012 |
| RFC 6750 | The OAuth 2.0 Authorization Framework: Bearer Token Usage | 2012 |
| RFC 7009 | OAuth 2.0 Token Revocation | 2013 |
| RFC 7591 | OAuth 2.0 Dynamic Client Registration | 2015 |
| RFC 7592 | OAuth 2.0 Dynamic Client Registration Management | 2015 |
| RFC 7636 | Proof Key for Code Exchange (PKCE) | 2015 |
| RFC 7662 | OAuth 2.0 Token Introspection | 2015 |
| RFC 8252 | OAuth 2.0 for Native Apps (BCP) | 2017 |
| RFC 8693 | OAuth 2.0 Token Exchange | 2020 |
| RFC 9068 | JWT Profile for OAuth Access Tokens | 2021 |
| RFC 9700 | JWT Best Current Practices | 2025 |
| RFC 9396 | Rich Authorization Requests | 2023 |

## OAuth 2.1 (Draft)

OAuth 2.1 consolidates OAuth 2.0 with current security best practices. Removes implicit grants; mandates PKCE for public clients; mandates exact redirect URI matching.

## OpenID Connect (OIDC)

| Spec | Title |
|------|-------|
| OIDC Core 1.0 | OpenID Connect Core |
| OIDC Discovery 1.0 | Provider metadata |
| OIDC Dynamic Client Registration 1.0 | Registration |
| OIDC Form Post Response Mode | Alternative response mode |
| OIDC RP-Initiated Logout 1.0 | Logout |
| OIDC Front-Channel Logout 1.0 | Front-channel logout |
| OIDC Back-Channel Logout 1.0 | Back-channel logout |
| OIDC Session Management 1.0 | Session |
| OIDC Federation 1.0 | Trust chains |
| OIDC for Verifiable Credentials | VCs |

## JWT (JSON Web Token)

| RFC | Title | Year |
|-----|-------|------|
| RFC 7515 | JSON Web Signature (JWS) | 2015 |
| RFC 7516 | JSON Web Encryption (JWE) | 2015 |
| RFC 7517 | JSON Web Key (JWK) | 2015 |
| RFC 7518 | JSON Web Algorithms (JWA) | 2015 |
| RFC 7519 | JSON Web Token (JWT) | 2015 |
| RFC 7520 | Examples of Protecting Content | 2015 |
| RFC 7521 | Assertion Framework for OAuth 2.0 Client Auth | 2015 |
| RFC 7522 | Security Assertion Markup Language (SAML) 2.0 Profile | 2015 |
| RFC 7523 | JWT Profile for OAuth 2.0 Client Authentication | 2015 |
| RFC 8037 | JWK for OKP (Ed25519 / Ed448) | 2017 |
| RFC 8725 | JWT BCP | 2020 |
| RFC 9068 | JWT Profile for OAuth 2.0 Access Tokens | 2021 |

## SAML

| Version | Year |
|---------|------|
| SAML 1.0 | 2002 |
| SAML 1.1 | 2003 |
| SAML 2.0 | 2005 |

## Tools

- **oauth2-proxy:** <https://github.com/oauth2-proxy/oauth2-proxy>
- **Keycloak:** <https://www.keycloak.org/> (Red Hat)
- **Auth0:** <https://auth0.com/>
- **Okta:** <https://www.okta.com/>
- **Azure AD / Entra ID:** <https://learn.microsoft.com/entra/identity/>
- **Google Cloud Identity:** <https://cloud.google.com/identity>
- **WorkOS:** <https://workos.com/>

## JOSE / JWT libraries

| Language | Library |
|----------|---------|
| Java | nimbus-jose-jwt, jjwt, auth0 java-jwt |
| Python | python-jose, pyjwt, authlib |
| Node.js | jsonwebtoken, jose, auth0 |
| Go | golang-jwt, go-jose |
| .NET | System.IdentityModel.Tokens.Jwt |

## PKCE

PKCE (RFC 7636) prevents authorization code interception attacks.

- **code_verifier:** random URL-safe string.
- **code_challenge:** `BASE64URL(SHA256(code_verifier))`.
- **code_challenge_method:** "S256" (recommended) or "plain" (deprecated).

## OAuth 2.0 grant types

| Grant | Use case |
|-------|----------|
| Authorization Code | Web apps with backend |
| Authorization Code + PKCE | SPAs, mobile, native |
| Client Credentials | Service-to-service |
| Device Code | Smart TVs, IoT |
| Refresh Token | Long-lived sessions |
| Token Exchange | Impersonation |
| JWT Bearer | Service-to-service with JWT |

## Best practices

- **PKCE** for all public clients.
- **State** parameter to prevent CSRF.
- **Exact redirect URI** matching.
- **Short-lived access tokens** (5-15 min).
- **Refresh token rotation** with reuse detection.
- **No tokens in URLs** (use headers or POST body).
- **TLS 1.2+** for all OAuth endpoints.
- **Audience** claim to prevent token misuse.
- **Issuer** validation.
- **Scope** for least privilege.

## Books

- *OAuth 2 in Action* — Justin Richer, Antonio Sanso (Manning).
- *OAuth 2.0 Cookbook* — Adolfo Eloy Nascimento (Packt).