# Reference: STRIDE Threat Modeling & Advanced Attack Defense

## 1. STRIDE Threat Matrix for Application Architecture

| Threat | Security Property Violated | Architecture Defense |
| :--- | :--- | :--- |
| **S**poofing | Authenticity | Mutual TLS, asymmetric JWT verification, strict session cookies (`HttpOnly`, `Secure`, `SameSite=Strict`). |
| **T**ampering | Integrity | Cryptographic HMAC signatures, database checksums, immutable audit logs. |
| **R**epudiation | Non-Repudiability | Append-only event store, signed transaction receipts, centralized secure logging. |
| **I**nformation Disclosure | Confidentiality | Encryption at rest (AES-256-GCM), TLS 1.3, redaction of PII in logs, strict CORS. |
| **D**enial of Service | Availability | Token-bucket rate limiting, payload size caps, circuit breakers, query complexity budgets. |
| **E**levation of Privilege | Authorization | Centralized RBAC/ABAC guards, principle of least privilege, strict token claims validation. |

---

## 2. Advanced Defenses

### Timing Attack Prevention
When comparing secret tokens, password hashes, or API signatures, standard string equality (`a === b`) leaks timing information based on the first mismatched byte. An attacker can brute-force secrets by measuring microsecond response differentials.
- **Rule**: Always use constant-time byte comparisons (e.g. `crypto.timingSafeEqual` in Node.js, `secrets.compare_digest` in Python).

### Server-Side Request Forgery (SSRF) Defense
When fetching URLs provided by users or webhooks:
1. Parse the host and resolve DNS.
2. Verify the resolved IP does **not** fall within private/loopback/cloud metadata CIDR ranges:
   - `127.0.0.0/8` (Loopback)
   - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` (Private RFC 1918)
   - `169.254.169.254` (Cloud Instance Metadata Service)
   - `::1` (IPv6 Loopback)
3. Disable HTTP redirect following or re-verify each redirect target against the blocklist.
