// 15 — CSP and security headers (Express / Helmet)

// === Helmet: recommended security headers ===
import helmet from 'helmet';
import express from 'express';

const app = express();

// === Strong CSP (recommended for most apps) ===
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],  // Avoid 'unsafe-inline' and 'unsafe-eval'
        styleSrc: ["'self'", "'unsafe-inline'"],  // Some CSS frameworks need inline
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'data:'],
        connectSrc: ["'self'", 'https://api.example.com'],
        frameSrc: ["'none'"],  // No iframes
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
        blockAllMixedContent: [],
      },
    },
    hsts: {
      maxAge: 31536000,  // 1 year
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    crossOriginEmbedderPolicy: { policy: 'require-corp' },
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'same-origin' },
  })
);

// === Per-route CSP (different for different parts) ===
app.use('/api', (req, res, next) => {
  // API endpoints don't need CSP
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
  next();
});

app.use('/admin', helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'nonce-{nonce}'"],
      // stricter for admin
    },
  },
}));

// === Security headers (manual) ===
function setSecurityHeaders(res: express.Response) {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
}

// === CORS configuration (separate from CSP) ===
import cors from 'cors';

app.use(cors({
  origin: ['https://app.example.com'],  // allowlist
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,  // preflight cache
}));

// === CSP report-only for testing ===
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; report-uri https://example.com/csp-report"
  );
  next();
});

// === Security headers reference ===
// Header                                | Purpose
// -------------------------------------|----------------------------------
// Strict-Transport-Security            | Force HTTPS
// X-Content-Type-Options               | Prevent MIME sniffing
// X-Frame-Options                      | Prevent clickjacking
// Referrer-Policy                      | Control referer header
// Content-Security-Policy              | Prevent XSS / injection
// Permissions-Policy                   | Limit browser features
// Cross-Origin-Embedder-Policy        | Require CORP
// Cross-Origin-Opener-Policy          | COOP for window.opener
// Cross-Origin-Resource-Policy        | CORP for cross-origin

// === Common CSP mistakes ===
// 1. 'unsafe-inline' or 'unsafe-eval' (defeats purpose)
// 2. Wildcards ('*') for script-src
// 3. data: URIs for script-src (XSS risk)
// 4. Not using nonces (rely on hashes instead)
// 5. Loosening CSP for convenience (then forgetting to tighten)

// === CSP with nonces (recommended) ===
import crypto from 'crypto';

app.use((req, res, next) => {
  // Generate per-request nonce
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.cspNonce = nonce;

  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; object-src 'none'; base-uri 'self'`
  );
  next();
});

// In template, use nonce:
// <script nonce={res.locals.cspNonce}>...</script>

// === Permissions-Policy header ===
// Limit browser features (camera, mic, geolocation, etc.)
res.setHeader('Permissions-Policy', [
  'camera=()',  // no camera
  'microphone=()',
  'geolocation=()',
  'payment=()',
  'usb=()',
  'magnetometer=()',
  'gyroscope=()',
  'accelerometer=()',
].join(', '));