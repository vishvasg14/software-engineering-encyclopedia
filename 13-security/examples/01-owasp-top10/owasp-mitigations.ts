// 01 — OWASP Top 10 (2021) mitigations in TypeScript (Node.js)

// A01: Broken Access Control
// Always check authorization; deny by default
async function deleteUser(currentUser: User, targetUserId: string) {
  if (currentUser.id !== targetUserId && !currentUser.isAdmin) {
    throw new ForbiddenError('Cannot delete other users');
  }
  await db.user.delete(targetUserId);
}

// A02: Cryptographic Failures
// Use strong, standard algorithms; never roll your own
import crypto from 'crypto';

function encrypt(plaintext: Buffer, key: Buffer): Buffer {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]);
}

// A03: Injection — use parameterized queries
async function getUserByName(name: string) {
  // BAD:
  // const query = `SELECT * FROM users WHERE name = '${name}'`;
  // GOOD: parameterized
  return db.query('SELECT * FROM users WHERE name = $1', [name]);
}

// A04: Insecure Design — threat model and secure design patterns
// Use rate limiting, input validation, output encoding
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

function createUser(input: unknown) {
  const validated = UserSchema.parse(input);
  // proceed with validated data
}

// A05: Security Misconfiguration
// Disable debug in production, set security headers
import helmet from 'helmet';
app.use(helmet());
app.disable('x-powered-by');
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.disable('etag');
}

// A06: Vulnerable Components — SCA, auto-update
// Use Dependabot, Snyk, npm audit in CI

// A07: Identification and Authentication Failures — strong passwords + MFA
import argon2 from 'argon2';

async function hashPassword(password: string) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,  // 64 MB
    timeCost: 3,
    parallelism: 4,
  });
}

async function verifyPassword(hash: string, password: string) {
  return argon2.verify(hash, password);
}

// A08: Software and Data Integrity Failures — SLSA, signed artifacts
// Use cosign, Sigstore, verified builds

// A09: Logging and Monitoring Failures — log security events
function logAuthEvent(event: string, userId: string, success: boolean, ip: string) {
  logger.info({
    event: 'auth',
    type: event,
    userId,
    success,
    ip,
    timestamp: new Date().toISOString(),
  });
}

// A10: Server-Side Request Forgery (SSRF) — allowlist
import { URL } from 'url';
const ALLOWED_DOMAINS = ['api.trusted.com'];

async function fetchUrl(url: string) {
  const parsed = new URL(url);
  if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
    throw new Error('URL not allowed');
  }
  // Block private IP ranges
  const ip = await dns.resolve4(parsed.hostname);
  if (isPrivateIP(ip)) {
    throw new Error('Private IP not allowed');
  }
  return fetch(url);
}

function isPrivateIP(ip: string): boolean {
  return /^10\.|^172\.(1[6-9]|2[0-9]|3[01])\.|^192\.168\.|^127\./.test(ip);
}