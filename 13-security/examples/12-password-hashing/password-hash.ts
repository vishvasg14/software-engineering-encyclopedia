// 12 — Password hashing (TypeScript)

import argon2 from 'argon2';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// === Recommended: Argon2id ===
// Memory-hard; modern; winner of PHC
async function hashPasswordArgon2(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,  // 64 MB
    timeCost: 3,
    parallelism: 4,
  });
}

async function verifyPasswordArgon2(hash: string, password: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

// === bcrypt ===
// Widely used; good if Argon2 not available
async function hashPasswordBcrypt(password: string): Promise<string> {
  return bcrypt.hash(password, 12);  // work factor 12+
}

async function verifyPasswordBcrypt(hash: string, password: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// === Common mistakes (DO NOT USE) ===
// 1. MD5: trivially broken
// const badHash1 = crypto.createHash('md5').update(password).digest('hex');

// 2. SHA-1: collision attacks exist
// const badHash2 = crypto.createHash('sha1').update(password).digest('hex');

// 3. SHA-256 alone: too fast; GPU brute force
// const badHash3 = crypto.createHash('sha256').update(password).digest('hex');

// 4. Unsalted hash: vulnerable to rainbow tables
// const badHash4 = crypto.createHash('sha256').update(password + 'salt').digest('hex');

// 5. Reversible encryption: defeats the purpose
// const badEncrypted = encrypt(password, key);

// === Comparison ===
// Algorithm     | Iterations | Memory    | Notes
// -------------|-----------|---------|------
// MD5          | 1          | -        | BROKEN
// SHA-1        | 1          | -        | BROKEN
// SHA-256      | 1          | -        | Too fast
// bcrypt 12    | 2^12       | 4 KB     | OK
// scrypt       | Configurable| 16 MB   | OK
// Argon2id     | 3          | 64 MB   | Recommended

// === Password policy enforcement ===
function isStrongPassword(password: string): boolean {
  if (password.length < 12) return false;
  if (!/[A-Z]/.test(password)) return false;  // uppercase
  if (!/[a-z]/.test(password)) return false;  // lowercase
  if (!/[0-9]/.test(password)) return false;  // digit
  if (!/[^A-Za-z0-9]/.test(password)) return false;  // symbol
  return true;
}

// === HIBP (Have I Been Pwned) check ===
import crypto from 'crypto';

async function isPasswordPwned(password: string): Promise<boolean> {
  // 1. Hash password with SHA-1
  const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();

  // 2. Send first 5 chars of hash to HIBP API (k-anonymity)
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await res.text();

  // 3. Parse response; look for suffix
  const matches = text.split('\n');
  for (const line of matches) {
    const [s, count] = line.split(':');
    if (s === suffix && parseInt(count) > 0) {
      return true;  // pwned
    }
  }
  return false;
}

// === Combined registration flow ===
async function registerUser(email: string, password: string) {
  if (!isStrongPassword(password)) {
    throw new Error('Password too weak');
  }
  if (await isPasswordPwned(password)) {
    throw new Error('Password has been compromised in a data breach; please choose another');
  }

  const hash = await hashPasswordArgon2(password);
  await db.query('INSERT INTO users (email, password_hash) VALUES ($1, $2)', [email, hash]);
}

// === Login flow with rate limiting ===
async function login(email: string, password: string) {
  // Check rate limit
  await rateLimiter.check(`login:${email}`, { limit: 5, window: '5m' });

  const result = await db.query('SELECT id, password_hash FROM users WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    // Constant-time response to prevent user enumeration
    await bcrypt.compare(password, '$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv');
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0];
  const ok = await verifyPasswordArgon2(user.password_hash, password);
  if (!ok) {
    throw new Error('Invalid credentials');
  }

  return issueToken(user.id, ['openid', 'profile']);
}

// === Password rotation flow ===
async function changePassword(userId: string, oldPassword: string, newPassword: string) {
  if (!isStrongPassword(newPassword)) {
    throw new Error('New password too weak');
  }
  if (await isPasswordPwned(newPassword)) {
    throw new Error('New password has been compromised');
  }

  const result = await db.query('SELECT password_hash FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];

  if (!await verifyPasswordArgon2(user.password_hash, oldPassword)) {
    throw new Error('Current password incorrect');
  }

  const newHash = await hashPasswordArgon2(newPassword);
  await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, userId]);

  // Invalidate all sessions
  await sessionStore.deleteByUserId(userId);
}