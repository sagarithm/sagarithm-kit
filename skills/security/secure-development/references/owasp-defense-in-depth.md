# Reference: OWASP Defense in Depth

## 1. Top Vulnerability Categories & Mitigations

### A01: Broken Access Control
- **Mitigation**: Enforce authorization checks server-side on every request. Never rely on client-side UI visibility toggles. Validate ownership (`userId === resource.ownerId`).

### A02: Cryptographic Failures
- **Mitigation**: Never use obsolete ciphers (MD5, SHA1). Use bcrypt, Argon2id, or PBKDF2 for password hashing. Enforce TLS 1.3 for all external traffic.

### A03: Injection (SQL, Command, NoSQL, LDAP)
- **Mitigation**: Use parameterized queries exclusively. Never use string interpolation or concatenation when constructing queries or system commands.

### A04: Insecure Design
- **Mitigation**: Integrate threat modeling before implementing high-risk workflows (payments, password reset, account recovery, role escalation).

### A05: Security Misconfiguration
- **Mitigation**: Disable default accounts, debug endpoints, and verbose stack traces in production responses.
