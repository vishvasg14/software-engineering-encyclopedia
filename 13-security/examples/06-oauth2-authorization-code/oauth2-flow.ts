// 06 — OAuth2 Authorization Code with PKCE (TypeScript)

import crypto from 'crypto';
import { AuthorizationCode } from 'simple-oauth2';

// PKCE: generate code verifier and challenge
function generatePkce() {
  const verifier = crypto.randomBytes(32)
    .toString('base64url');  // 43-128 chars URL-safe

  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');

  return { verifier, challenge };
}

// OAuth2 client config
const client = new AuthorizationCode({
  client: {
    id: process.env.OAUTH_CLIENT_ID!,
    secret: process.env.OAUTH_CLIENT_SECRET!,  // for confidential clients
  },
  auth: {
    tokenHost: 'https://auth.example.com',
    tokenPath: '/oauth2/token',
    authorizePath: '/oauth2/authorize',
  },
});

// Authorization URL
async function getAuthorizationUrl() {
  const { verifier, challenge } = generatePkce();

  // Store verifier in session for later use
  req.session.codeVerifier = verifier;

  const url = client.authorizeURL({
    redirect_uri: 'https://app.example.com/callback',
    scope: ['openid', 'profile', 'email'],
    state: crypto.randomBytes(16).toString('hex'),
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  return url;
}

// Token exchange
async function exchangeCode(code: string, codeVerifier: string) {
  const tokenParams = {
    code,
    redirect_uri: 'https://app.example.com/callback',
    code_verifier: codeVerifier,  // from session
  };

  const accessToken = await client.getToken(tokenParams);
  return accessToken;
}

// Verify ID token (OIDC)
import { JWK, decode } from 'jose';
import jwksClient from 'jwks-rsa';

const clientJwks = jwksClient({
  jwksUri: 'https://auth.example.com/.well-known/jwks.json',
});

async function verifyIdToken(idToken: string) {
  const decoded = decodeJwt(idToken);
  const kid = decoded.header.kid;
  const key = await clientJwks.getSigningKey(kid);
  const verified = await jwtVerify(
    idToken,
    key.getPublicKey(),
    {
      issuer: 'https://auth.example.com',
      audience: process.env.OAUTH_CLIENT_ID,
    }
  );
  return verified.payload;
}

// Use the access token to call the API
async function getUserInfo(accessToken: string) {
  const res = await fetch('https://api.example.com/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}

// Full flow
async function handleCallback(req: any, res: any) {
  const { code, state } = req.query;

  // Verify state (CSRF protection)
  if (state !== req.session.oauthState) {
    return res.status(400).json({ error: 'Invalid state' });
  }

  // Exchange code for token
  const tokenResult = await exchangeCode(code, req.session.codeVerifier);

  // Verify ID token (OIDC)
  const claims = await verifyIdToken(tokenResult.token.id_token);

  // Set session cookie
  req.session.userId = claims.sub;
  res.redirect('/dashboard');
}