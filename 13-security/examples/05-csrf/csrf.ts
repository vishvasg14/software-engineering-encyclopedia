// 05 — CSRF prevention (TypeScript / Express)

// VULNERABLE: state-changing GET (or no CSRF protection)
app.post('/transfer', (req, res) => {
  // Attacker tricks user into submitting this form
  // from another origin; browser sends cookies automatically
  transferFunds(req.user.id, req.body.to, req.body.amount);
  res.json({ ok: true });
});

// === SECURE Option 1: Synchronizer Token Pattern ===
import crypto from 'crypto';
import { doubleCsrf } from 'csrf-csrf';

const {
  generateCsrfToken,  // use this in your route to set the cookie
  doubleCsrfProtection, // use this in your middleware
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
  cookieName: 'csrf-token',
});

// On form render
app.get('/form', (req, res) => {
  const token = generateCsrfToken(req, res);
  res.render('form', { csrfToken: token });
});

// On form submit
app.post('/transfer', doubleCsrfProtection, (req, res) => {
  transferFunds(req.user.id, req.body.to, req.body.amount);
  res.json({ ok: true });
});

// === SECURE Option 2: SameSite cookies (defense in depth) ===
app.use(session({
  cookie: {
    httpOnly: true,
    secure: true,        // HTTPS only
    sameSite: 'Lax',     // or 'Strict' for sensitive ops
    maxAge: 3600000,
  },
}));

// === SECURE Option 3: Origin/Referer header validation ===
app.post('/transfer', (req, res) => {
  const origin = req.headers.origin || req.headers.referer;
  if (!origin || !origin.startsWith('https://app.example.com')) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  transferFunds(req.user.id, req.body.to, req.body.amount);
  res.json({ ok: true });
});

// === SECURE Option 4: Custom header (requires CORS) ===
// Client sends X-CSRF-Token header; server validates
// (only works with proper CORS preflight that allows custom headers from trusted origins)

// === BEST: Use SameSite=Strict + double-submit cookie ===
app.use(session({
  cookie: {
    sameSite: 'strict',  // best protection
    httpOnly: true,
    secure: true,
  },
}));

// For SPAs: bearer token in Authorization header (not vulnerable to CSRF)
// CSRF requires browser to send cookies; bearer tokens aren't sent automatically.