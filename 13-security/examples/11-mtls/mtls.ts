// 11 — mTLS configuration (NGINX and Node.js)

// === NGINX as mTLS server ===
server {
    listen 443 ssl;
    server_name api.example.com;

    # Server certificate
    ssl_certificate /etc/ssl/certs/api.example.com.crt;
    ssl_certificate_key /etc/ssl/private/api.example.com.key;

    # CA that signed client certificates
    ssl_client_certificate /etc/ssl/certs/client-ca.crt;

    # Verify client certs (REQUIRE for mTLS)
    ssl_verify_client on;
    ssl_verify_depth 2;

    location / {
        # Pass client cert info to backend
        proxy_set_header X-Client-Cert $ssl_client_cert;
        proxy_set_header X-Client-DN $ssl_client_s_dn;
        proxy_pass http://backend;
    }
}

# === NGINX with optional mTLS (verify if provided) ===
server {
    listen 443 ssl;
    ssl_client_certificate /etc/ssl/certs/client-ca.crt;
    ssl_verify_client optional;
    ssl_verify_depth 2;

    location /api {
        if ($ssl_client_verify != SUCCESS) {
            return 403;
        }
        proxy_pass http://backend;
    }
}

# === Node.js (with mTLS verification) ===
# import https from 'node:https';
# import fs from 'node:fs';
#
# const server = https.createServer({
#   cert: fs.readFileSync('server-cert.pem'),
#   key: fs.readFileSync('server-key.pem'),
#   ca: fs.readFileSync('client-ca.pem'),  // CA that signed client certs
#   requestCert: true,
#   rejectUnauthorized: true,  // require valid client cert
# }, (req, res) => {
#   const cert = req.socket.getPeerCertificate();
#   if (!req.socket.authorized) {
#     res.writeHead(401);
#     return res.end('Client cert required');
#   }
#
#   // Get client cert subject
#   const subject = cert.subject.CN;
#   console.log('Client:', subject);
#
#   res.end('OK');
# });

# === SPIFFE/SPIRE for workload identity ===
# SPIFFE issues SVIDs (X.509 certs) to workloads
# Each service has its own identity
# mTLS between services with workload identity

# === Generate client cert (test) ===
# openssl req -new -newkey rsa:2048 -nodes \
#   -keyout client-key.pem -out client-csr.pem \
#   -subj "/CN=client.example.com"

# === Cert verification details ===
# The server checks:
# 1. Cert is signed by trusted CA
# 2. Cert is not expired
# 3. Cert is not revoked (CRL or OCSP)
# 4. Subject/SAN matches expected identity

# === Common pitfalls ===
# 1. Forgetting to set ssl_verify_client on
# 2. Not validating certificate chain depth
# 3. Trusting self-signed certs in production
# 4. Not rotating certificates
# 5. Hard-coding certificate paths

# === Use cases ===
# - Service-to-service in zero-trust networks
# - mTLS between API gateway and backend
# - Database connections
# - Message broker authentication
# - IoT device authentication