// 16 — OAuth2 authorization code with PKCE (browser/SPA)

const CLIENT_ID = 'my-spa-client';
const REDIRECT_URI = 'https://app.example.com/callback';
const AUTH_ENDPOINT = 'https://auth.example.com';
const TOKEN_ENDPOINT = `${AUTH_ENDPOINT}/oauth2/token`;

// Generate PKCE verifier and challenge
function generatePkce(): { verifier: string; challenge: string } {
    // Verifier: random URL-safe string
    const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
    // Challenge: SHA-256 of verifier
    const digest = crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
    const challenge = base64url(new Uint8Array(digest));
    return { verifier, challenge };
}

function base64url(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Step 1: Redirect user to authorization endpoint
async function authorize(): Promise<void> {
    const state = base64url(crypto.getRandomValues(new Uint8Array(16)));
    const { verifier, challenge } = generatePkce();

    // Store verifier and state in sessionStorage (or backend)
    sessionStorage.setItem('pkce_verifier', verifier);
    sessionStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: 'openid profile email',
        state,
        code_challenge: challenge,
        code_challenge_method: 'S256',
    });
    window.location.href = `${AUTH_ENDPOINT}/oauth2/authorize?${params}`;
}

// Step 2: Handle callback (after redirect back)
async function handleCallback(code: string, state: string): Promise<TokenResponse> {
    const storedState = sessionStorage.getItem('oauth_state');
    if (state !== storedState) throw new Error('State mismatch (CSRF protection)');

    const verifier = sessionStorage.getItem('pkce_verifier');
    if (!verifier) throw new Error('Missing verifier');

    // Exchange code for tokens
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
    });

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        body,
    });
    return response.json();
}

interface TokenResponse {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    token_type: string;
}

// JWT validation
interface JwtPayload {
    sub: string;
    name?: string;
    exp: number;
    iss: string;
    aud: string;
}

function decodeJwt(token: string): JwtPayload {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload));
}

function isExpired(payload: JwtPayload): boolean {
    return payload.exp * 1000 < Date.now();
}

// Authorize API call
async function apiCall(url: string, token: string): Promise<Response> {
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}