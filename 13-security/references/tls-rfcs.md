# TLS RFCs Reference

This file catalogs the TLS, PKI, and cryptography RFCs referenced in the Security document.

## TLS RFCs

| RFC | Title | Year |
|-----|-------|------|
| RFC 2246 | TLS 1.0 | 1999 |
| RFC 4346 | TLS 1.1 | 2006 |
| RFC 5246 | TLS 1.2 | 2008 |
| RFC 6066 | TLS 1.2 Extensions | 2011 |
| RFC 6961 | TLS 1.3 (draft) | 2013 |
| RFC 8446 | TLS 1.3 | 2018 |
| RFC 8447 | TLS 1.3 (IANA) | 2018 |

## TLS 1.3 highlights

- **1-RTT handshake** (vs 2-RTT in TLS 1.2).
- **0-RTT data** (resumption mode).
- **Forward secrecy mandatory.**
- **Encrypted SNI** (draft).
- **Removed legacy ciphers** (RC4, MD5, SHA-1, 3DES).
- **AEAD mandatory** (AES-GCM, ChaCha20-Poly1305).

## Cipher suites (TLS 1.3)

TLS 1.3 has only 5 cipher suites:

| Suite | Description |
|-------|-------------|
| TLS_AES_128_GCM_SHA256 | AES-128-GCM, SHA-256 |
| TLS_AES_256_GCM_SHA384 | AES-256-GCM, SHA-384 |
| TLS_CHACHA20_POLY1305_SHA256 | ChaCha20, SHA-256 |
| TLS_AES_128_CCM_SHA256 | AES-128-CCM, SHA-256 |
| TLS_AES_128_CCM_8_SHA256 | AES-128-CCM-8-bit, SHA-256 |

## PKI RFCs

| RFC | Title | Year |
|-----|-------|------|
| RFC 5280 | X.509 PKI Certificate and CRL Profile | 2008 |
| RFC 6960 | X.509 OCSP (Online Certificate Status Protocol) | 2013 |
| RFC 8555 | ACME v2 (Automatic Certificate Management Environment) | 2019 |
| RFC 8737 | ACME TLS-ALPN-01 | 2020 |
| RFC 8738 | ACME TLS-SNI-01 | 2020 |

## PKCS (Public-Key Cryptography Standards)

| Standard | Title |
|----------|-------|
| PKCS #1 | RSA Cryptography |
| PKCS #5 | Password-Based Cryptography |
| PKCS #7 | Cryptographic Message Syntax (CMS) |
| PKCS #8 | Private-Key Information Syntax |
| PKCS #11 | Cryptographic Token Interface |
| PKCS #12 | Personal Information Exchange Syntax (PFX) |

## Cryptography RFCs

| RFC | Title | Year |
|-----|-------|------|
| RFC 2104 | HMAC | 1997 |
| RFC 3447 | RSA PKCS #1 v2.1 | 2003 |
| RFC 5869 | HKDF | 2010 |
| RFC 6090 | Elliptic Curve Cryptography | 2011 |
| RFC 7748 | Curve25519 | 2016 |
| RFC 8017 | RSA PKCS #1 v2.2 | 2016 |
| RFC 8032 | Ed25519, Ed448 | 2017 |
| RFC 8439 | ChaCha20-Poly1305 | 2018 |
| RFC 9106 | Argon2 | 2021 |
| RFC 9180 | Hybrid Public Key Encryption (HPKE) | 2022 |

## TLS test tools

- **testssl.sh:** <https://testssl.sh/>
- **SSLyze:** <https://github.com/nabla-c0d3/sslyze>
- **TLS Attacker:** <https://github.com/tls-attacker/TLS-Attacker>
- **openssl s_client:** built-in.
- **Qualys SSL Labs:** <https://www.ssllabs.com/ssltest/>

## Cipher suites (TLS 1.2, deprecated)

- TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
- TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
- TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
- TLS_RSA_WITH_AES_128_GCM_SHA256 (deprecated; no PFS)

## Steps for TLS deployment

1. **Generate key:** `openssl genrsa -out key.pem 2048` (RSA) or `openssl ecparam -genkey -name prime256v1 -out key.pem` (ECDSA).
2. **Generate CSR:** `openssl req -new -key key.pem -out csr.pem`.
3. **Sign certificate:** submit CSR to CA (Let's Encrypt, internal CA, etc.).
4. **Install certificate:** configure web server.
5. **Test:** `openssl s_client -connect example.com:443`.
6. **Monitor:** expiration alerts.

## Certificate formats

- **PEM:** base64-encoded DER, with `-----BEGIN CERTIFICATE-----` headers.
- **DER:** binary.
- **PFX/P12:** PKCS#12, encrypted with password.

## Let's Encrypt

Free, automated certificate authority:

- **ACME protocol:** RFC 8555.
- **Certbot:** ACME client.
- **Auto-renewal:** typical 60-day cert valid for 90 days.

## SPIFFE / SPIRE

- **SPIFFE:** Secure Production Identity Framework for Everyone.
- **SPIFFE ID:** `spiffe://trust-domain/path`.
- **SPIRE:** SPIFFE Runtime Environment.
- **SVID:** SPIFFE Verifiable Identity Document (X.509 cert).

For workload identity in zero-trust networks.

## mTLS

- **Client certificate:** same as server certificate.
- **Mutual authentication:** both sides present certs.
- **Use cases:** service-to-service, zero-trust networks.

## TLS hardening

- Disable TLS 1.0 and 1.1.
- Use strong cipher suites (AEAD, PFS).
- HSTS (HTTP Strict Transport Security).
- OCSP stapling.
- HSTS preload.
- Certificate pinning (mobile apps).

## Books

- *Bulletproof TLS and PKI* — Ivan Ristic (Feisty Duck). Free online.
- *High Performance Browser Networking* — Ilya Grigorik (O'Reilly). Free online.
- *Cryptography Engineering* — Ferguson, Schneier, Kohno (Wiley).