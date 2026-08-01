// 13 — Secrets management (TypeScript)

import { Vault } from 'aws-sdk/clients/secretsmanager';
import AWS from 'aws-sdk';

// === VULNERABLE: secrets in code ===
// NEVER do this
const API_KEY = 'sk-live-abc123def456';
const DB_PASSWORD = 'super-secret-password';

// === VULNERABLE: secrets in env files committed to git ===
// .env (NEVER commit!)
// DB_PASSWORD=super-secret-password

// === SECURE: AWS Secrets Manager ===
const client = new AWS.SecretsManager({ region: 'us-east-1' });

async function getSecret(secretName: string): Promise<string> {
  const result = await client.getSecretValue({ SecretId: secretName }).promise();
  if (result.SecretString) {
    return result.SecretString;
  }
  throw new Error(`Secret ${secretName} not found`);
}

// === HashiCorp Vault ===
import Vault from 'node-vault';

const vault = Vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR!,
  token: process.env.VAULT_TOKEN!,
});

async function getDbCredentials(): Promise<{ username: string; password: string }> {
  const result = await vault.read('database/creds/myapp');
  return {
    username: result.data.username,
    password: result.data.password,
  };
}

// === Use dynamic credentials with caching ===
class CachedSecret {
  private cache = new Map<string, { value: string; expires: number }>();

  async get(key: string, ttl = 300_000): Promise<string> {
    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.value;
    }

    const value = await this.fetchFromBackend(key);
    this.cache.set(key, { value, expires: Date.now() + ttl });
    return value;
  }

  private async fetchFromBackend(key: string): Promise<string> {
    // AWS Secrets Manager / Vault / etc.
    return getSecret(key);
  }
}

// === K8s secrets via External Secrets Operator ===
// apiVersion: external-secrets.io/v1beta1
// kind: ExternalSecret
// metadata:
//   name: db-credentials
// spec:
//   secretStoreRef:
//     name: vault-backend
//     kind: ClusterSecretStore
//   target:
//     name: db-credentials-secret
//   data:
//   - secretKey: postgres/password
//     remoteRef:
//       key: secret/data/myapp/db

// === Best practices ===
// 1. Never commit secrets to git
// 2. Use external secrets manager (Vault, AWS SM)
// 3. Use dynamic credentials where possible
// 4. Rotate regularly
// 5. Audit access
// 6. Encrypt at rest
// 7. Use IAM roles / workload identity (no static keys)
// 8. Mount secrets as files in K8s via CSI driver
// 9. Use sealed secrets for GitOps (Bitnami Sealed Secrets)
// 10. Scan git history for leaked secrets (TruffleHog, git-secrets)

// === Common mistakes ===
// 1. Logging secrets (NEVER log API keys, passwords, tokens)
// 2. Storing in version control
// 3. Sending in error messages
// 4. Using in URLs (URLs are logged everywhere)
// 5. Long-lived credentials without rotation
// 6. Same secret across environments
// 7. Not rotating on personnel change

// === Detecting leaked secrets ===
// Tools:
// - TruffleHog: scans git history
// - GitGuardian: monitors public repos
// - git-secrets: pre-commit hook
// - detect-secrets: Yelp's tool
// - GitHub: secret scanning (push protection)

// === Secret rotation strategies ===
// 1. Time-based: rotate every 90 days
// 2. Event-based: rotate on compromise, on personnel change
// 3. Lazy: rotate on next use
// 4. Manual: ops triggers
// Best: combination; automatic time-based for high-value, event-based for sensitive

// === Storage comparison ===
// Option          | Pros                          | Cons
// ---------------|------------------------------|------
// .env files      | Simple                        | Not encrypted, in git
// HashiCorp Vault | Dynamic secrets, audit       | Operational complexity
// AWS SM          | Managed, easy                 | AWS only
// K8s secrets     | Native, encrypted at rest    | Mounted as files
// Sealed Secrets  | GitOps friendly              | Bitnami-specific
// External Secrets| Sync from external to K8s    | Adds layer

// === Example: HashiCorp Vault dynamic DB credentials ===
async function getVaultDbCredentials() {
  // Vault issues short-lived credentials (e.g., 1 hour TTL)
  const result = await vault.read('database/creds/myapp');
  return result.data;  // { username, password }
}

// Use in app
async function connectToDb() {
  const creds = await getVaultDbCredentials();
  return new Pool({
    user: creds.username,
    password: creds.password,
    // Vault automatically revokes when TTL expires
  });
}