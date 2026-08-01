// 09 — JWT (JSON Web Token, RFC 7519)

import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// === JWT structure ===
// header.payload.signature
// All base64url-encoded
//
// Header (JOSE): { "alg": "RS256", "typ": "JWT", "kid": "..." }
// Payload (claims): { "iss": "...", "sub": "...", "aud": "...", "exp": ... }
// Signature: HMAC or asymmetric

// === Sign (server side) ===
const PRIVATE_KEY = require('fs').readFileSync('private.pem');

function issueToken(userId: string, scopes: string[]): string {
  const token = jwt.sign(
    {
      sub: userId,
      scope: scopes.join(' '),
      // Standard claims are added by library:
      // iss, aud, exp, iat, nbf
    },
    PRIVATE_KEY,
    {
      algorithm: 'RS256',
      issuer: 'https://auth.example.com',
      audience: 'my-app',
      expiresIn: '15m',
      keyid: 'key-1',  // for rotation
    }
  );
  return token;
}

// === Verify (resource server) ===
const client = jwksClient({
  jwksUri: 'https://auth.example.com/.well-known/jwks.json',
  cache: true,
  cacheMaxAge: 600000,  // 10 min
  rateLimit: true,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  if (!header.kid) return callback(new Error('No kid'));
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

function verifyToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, getKey, {
    algorithms: ['RS256'],
    issuer: 'https://auth.example.com',
    audience: 'my-app',
    clockTolerance: 5,  // 5 seconds clock skew
  }) as jwt.JwtPayload;
}

// === Standard claims (RFC 7519) ===
// iss: issuer (e.g., https://auth.example.com)
// sub: subject (user ID)
// aud: audience (client ID)
// exp: expiration time (seconds since epoch)
// nbf: not before
// iat: issued at
// jti: JWT ID (unique)

// === Custom claims ===
interface AppClaims extends jwt.JwtPayload {
  scope: string;
  role: 'admin' | 'user';
  tenantId: string;
}

// === Algorithm choices ===
// HS256: HMAC + SHA-256; symmetric; fast; use for same issuer/verifier
// RS256: RSA + SHA-256; asymmetric; use for distributed systems
// ES256: ECDSA P-256; asymmetric; small; modern
// EdDSA: Ed25519; modern; very fast

// === JWT best practices ===
// 1. Use short TTL (5-15 min for access tokens)
// 2. Use refresh tokens for long sessions
// 3. Validate iss, aud, exp, nbf
// 4. Use kid for key rotation
// 5. Cache JWKS (don't fetch per request)
// 6. Don't put sensitive data in JWT (it's base64, not encrypted)
// 7. Use HTTPS to prevent token theft
// 8. Use sender-constrained tokens (DPoP or mTLS) for high security

// === Common mistakes ===
// 1. alg: none (algorithm confusion attack)
// 2. Symmetric key for distributed system
// 3. Long TTL (hours/days)
// 4. No iss/aud validation
// 5. Leaking JWT in logs or URLs

// === Token introspection (alternative to JWT for opaque tokens) ===
async function introspectToken(token: string) {
  // RFC 7662: OAuth 2.0 Token Introspection
  const res = await fetch('https://auth.example.com/oauth2/introspect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({ token }),
  });
  return res.json();
}