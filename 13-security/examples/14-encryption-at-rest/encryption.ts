// 14 — Encryption at rest (TypeScript)

import crypto from 'crypto';

// === Symmetric encryption (AES-256-GCM) ===
// Authenticated encryption with associated data

function encrypt(plaintext: Buffer, key: Buffer, aad?: Buffer): {
  ciphertext: Buffer;
  iv: Buffer;
  tag: Buffer;
} {
  if (key.length !== 32) throw new Error('Key must be 256 bits');
  const iv = crypto.randomBytes(12);  // 96-bit nonce for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  if (aad) cipher.setAAD(aad);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { ciphertext: encrypted, iv, tag };
}

function decrypt(ciphertext: Buffer, key: Buffer, iv: Buffer, tag: Buffer, aad?: Buffer): Buffer {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  if (aad) decipher.setAAD(aad);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

// === Envelope encryption (encrypt data key with KMS) ===
// 1. Generate a random data key (DEK)
// 2. Encrypt data with DEK
// 3. Encrypt DEK with KMS KEK
// 4. Store encrypted data + encrypted DEK

interface EnvelopeEncryptedData {
  ciphertext: Buffer;
  iv: Buffer;
  tag: Buffer;
  encryptedDek: Buffer;  // DEK encrypted by KMS KEK
}

async function envelopeEncrypt(plaintext: Buffer, kmsClientId: string): Promise<EnvelopeEncryptedData> {
  // 1. Generate DEK
  const dek = crypto.randomBytes(32);

  // 2. Generate data encryption IV
  const iv = crypto.randomBytes(12);

  // 3. Encrypt data with DEK
  const cipher = crypto.createCipheriv('aes-256-gcm', dek, iv);
  const enc = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  // 4. Encrypt DEK with KMS KEK
  const encryptedDek = await encryptWithKms(dek, kmsClientId);

  return { ciphertext: enc, iv, tag, encryptedDek };
}

async function envelopeDecrypt(data: EnvelopeEncryptedData, kmsClientId: string): Promise<Buffer> {
  // 1. Decrypt DEK with KMS KEK
  const dek = await decryptWithKms(data.encryptedDek, kmsClientId);

  // 2. Decrypt data with DEK
  const decipher = crypto.createDecipheriv('aes-256-gcm', dek, data.iv);
  decipher.setAuthTag(data.tag);
  return Buffer.concat([decipher.update(data.ciphertext), decipher.final()]);
}

// Mock KMS calls (in production, use AWS KMS or similar)
async function encryptWithKms(dek: Buffer, keyId: string): Promise<Buffer> {
  // Real: await kmsClient.encrypt({ KeyId: keyId, Plaintext: dek }).promise();
  return Buffer.from('mock-encrypted-dek');
}

async function decryptWithKms(encryptedDek: Buffer, keyId: string): Promise<Buffer> {
  // Real: await kmsClient.decrypt({ CiphertextBlob: encryptedDek }).promise();
  return crypto.randomBytes(32);
}

// === AWS KMS example (real) ===
import { KMSClient, EncryptCommand, DecryptCommand } from '@aws-sdk/client-kms';

const kms = new KMSClient({ region: 'us-east-1' });
const KEY_ID = 'arn:aws:kms:us-east-1:123456789:key/abcd-1234';

async function awsKmsEncrypt(plaintext: Buffer): Promise<Buffer> {
  const result = await kms.send(new EncryptCommand({
    KeyId: KEY_ID,
    Plaintext: plaintext,
  }));
  return result.CiphertextBlob!;
}

async function awsKmsDecrypt(ciphertext: Buffer): Promise<Buffer> {
  const result = await kms.send(new DecryptCommand({
    CiphertextBlob: ciphertext,
  }));
  return result.Plaintext!;
}

// === Database field-level encryption (transparent) ===
// E.g., encrypt SSN, credit card at the application layer
class SSN {
  private static keyId = 'alias/my-app-pii';

  static async encrypt(ssn: string): Promise<Buffer> {
    const data = Buffer.from(ssn, 'utf-8');
    return awsKmsEncrypt(data);
  }

  static async decrypt(encrypted: Buffer): Promise<string> {
    const data = await awsKmsDecrypt(encrypted);
    return data.toString('utf-8');
  }
}

// === TLS at rest (data in motion) ===
// Already covered in TLS 1.3 example

// === Best practices ===
// 1. Use AES-256-GCM or ChaCha20-Poly1305
// 2. Use 96-bit random nonce for GCM
// 3. Never reuse nonce with same key
// 4. Authenticate (AEAD)
// 5. Use envelope encryption for large data
// 6. Use KMS for key management
// 7. Rotate keys regularly
// 8. Audit all key access

// === Common mistakes ===
// 1. Using ECB mode (leaks patterns)
// 2. Using CBC without MAC
// 3. Reusing nonce with same key (catastrophic for GCM)
// 4. Storing keys with data
// 5. Hard-coding keys
// 6. Using DES / 3DES (broken)
// 7. Not authenticating ciphertext (allows tampering)