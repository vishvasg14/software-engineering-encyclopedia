// 08 — OIDC (TypeScript)

import { Issuer, generators, Client } from 'openid-client';

// === Discovery: get OIDC config ===
const issuer = await Issuer.discover('https://auth.example.com/.well-known/openid-configuration');
// issuer.metadata contains all endpoints

// === Client setup ===
const client = new issuer.Client({
  client_id: 'my-app',
  client_secret: process.env.CLIENT_SECRET!,
  redirect_uris: ['https://app.example.com/callback'],
  response_types: ['code'],
});

// === Generate authorization URL with PKCE ===
const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);

const authUrl = client.authorizationUrl({
  scope: 'openid profile email',
  code_challenge,
  code_challenge_method: 'S256',
  state: generators.state(),  // CSRF protection
});

// Store code_verifier in session
session.code_verifier = code_verifier;

// === Handle callback ===
async function handleCallback(params: URLSearchParams) {
  const params = client.callbackParams(req.url);
  const tokenSet = await client.callback(
    client.callbackPostParams(req.url),
    { state: session.state, code_verifier: session.code_verifier }
  );

  // tokenSet has:
  // - access_token
  // - id_token (JWT)
  // - refresh_token
  // - expires_at

  // === Verify ID token claims ===
  const claims = tokenSet.claims();
  if (!claims.sub) throw new Error('Missing sub claim');
  if (claims.iss !== 'https://auth.example.com') throw new Error('Invalid issuer');
  if (!claims.aud.includes('my-app')) throw new Error('Invalid audience');
  if (claims.exp < Date.now() / 1000) throw new Error('Token expired');

  // === Use ID token claims (user info) ===
  const user = {
    sub: claims.sub,
    name: claims.name,
    email: claims.email,
    email_verified: claims.email_verified,
  };

  return { tokenSet, user };
}

// === Get fresh user info from UserInfo endpoint ===
async function getUserInfo(accessToken: string) {
  const userinfo = await fetch('https://auth.example.com/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return userinfo.json();
}

// === Refresh token ===
async function refreshTokens(refreshToken: string) {
  const tokenSet = await client.refresh(refreshToken);
  return tokenSet;
}

// === OIDC standard claims ===
// Required: iss, sub, aud, exp, iat
// Optional: name, given_name, family_name, email, email_verified,
//            picture, locale, zoneinfo, phone_number, address, etc.

// === ID token vs Access token ===
// ID token: identity (who the user is); for the client app
// Access token: authorization (what the user can do); for the resource server

// === Logout (RP-Initiated) ===
function getLogoutUrl(idToken: string) {
  return client.endSessionUrl({
    id_token_hint: idToken,
    post_logout_redirect_uri: 'https://app.example.com',
  });
}