// 07 — OAuth2 PKCE (Proof Key for Code Exchange, RFC 7636)

import crypto from 'crypto';

// === PKCE flow ===
// 1. Client generates code_verifier (random URL-safe string)
// 2. Client computes code_challenge = BASE64URL(SHA256(code_verifier))
// 3. Client sends authorization request with code_challenge
// 4. Auth server stores challenge
// 5. Auth server redirects with authorization code
// 6. Client sends code + code_verifier to token endpoint
// 7. Auth server verifies SHA256(code_verifier) == code_challenge
// 8. Auth server returns tokens

// === Generate verifier and challenge ===
function generatePkcePair() {
  // code_verifier: 43-128 chars URL-safe
  // MUST have enough entropy (min 256 bits)
  const verifier = base64UrlEncode(crypto.randomBytes(32));  // 32 bytes = 43 chars

  // code_challenge: S256 method (recommended)
  const challenge = base64UrlEncode(
    crypto.createHash('sha256').update(verifier).digest()
  );

  return { verifier, challenge, method: 'S256' };
}

function base64UrlEncode(buf: Buffer): string {
  return buf.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// === Generate authorization URL ===
function getAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const { verifier, challenge, method } = generatePkcePair();

  // Store verifier in session / secure storage
  sessionStorage.setItem('pkce_verifier', verifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'openid profile email',
    state,
    code_challenge: challenge,
    code_challenge_method: method,
  });

  return `https://auth.example.com/authorize?${params}`;
}

// === Token exchange (server-side) ===
async function exchangeCodeForToken(
  code: string,
  codeVerifier: string,
  clientId: string,
  clientSecret: string,  // confidential client only
  redirectUri: string
) {
  // The token endpoint validates:
  // 1. authorization code
  // 2. client credentials
  // 3. redirect_uri matches
  // 4. code_verifier matches code_challenge (PKCE)

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
    code_verifier: codeVerifier,  // CRITICAL for PKCE
  });

  const res = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Token exchange failed: ${error.error_description}`);
  }

  return res.json();
  // Returns: { access_token, token_type: "Bearer", expires_in, refresh_token, id_token }
}

// === Why PKCE is necessary ===
// 1. Authorization code can be intercepted (e.g., malicious app, custom URL scheme on mobile)
// 2. Without PKCE, attacker exchanges code for token
// 3. PKCE binds the code to the client that requested it
// 4. Attacker has the code but not the code_verifier
// 5. Therefore, the token exchange fails

// === Security properties of PKCE ===
// - Code binding: the code is only valid for the client that requested it
// - Code_verifier: stored in client (memory or sessionStorage)
// - Replay protection: code_verifier is single-use
// - Man-in-the-middle: attacker can't exchange code without verifier
// - Cross-origin: PKCE works for SPAs and mobile (no client secret)

// === Difference: plain vs S256 ===
// plain (deprecated): code_challenge == code_verifier (no transformation)
// S256 (recommended): code_challenge = BASE64URL(SHA256(code_verifier))