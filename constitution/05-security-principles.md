# Article 5: Security Principles

This article defines the non-negotiable security requirements and threat prevention standards that every agent and contributor must adhere to.

---

## 1. Zero Secrets in Source Control
- **Absolute Invariant**: Never commit API keys, tokens, passwords, private certificates, or secrets into source control under any circumstance.
- **Environment Separation**: Secrets must be loaded exclusively through secure environment variables, secret managers, or vault systems.
- **Git Hygiene**: All local environment files (`.env`, `.env.local`, `credentials.json`) must be listed in `.gitignore` prior to commit.

---

## 2. Input Validation & Defense at Boundaries
- **Never Trust Input**: All external input (HTTP request bodies, query parameters, CLI flags, headers, file uploads, third-party webhooks) must be validated and sanitized before entering the application layer.
- **Schema Validation**: Use strict schema validators (e.g., Zod, Pydantic, Joi, Valibot) to enforce data shapes and type boundaries.
- **Injection Prevention**:
  - **SQL / NoSQL**: Use parameterized queries, ORMs, or prepared statements. Never concatenate user strings into queries.
  - **Command Injection**: Avoid shell execution with unescaped user arguments. Use structured exec arrays without shell invocation.
  - **XSS**: Sanitize HTML and escape dynamic content when rendering in browsers.

---

## 3. Authentication & Least Privilege
- **Principle of Least Privilege**: Services, database users, and agent tools must operate with the minimum permissions required to perform their intended task.
- **Centralized Authorization**: Enforce role-based access control (RBAC) or attribute-based access control (ABAC) in the business logic layer, never solely in UI elements.
- **Secure Sessions & Cryptography**: Use industry-standard cryptographic algorithms (e.g., Argon2id, bcrypt, AES-GCM). Never invent custom cryptography or hashing mechanisms.

---

## 4. Supply Chain & Dependency Security
- **Vetted Dependencies**: Inspect package health, maintenance activity, licenses, and known CVEs before adding third-party dependencies.
- **Lockfile Integrity**: Always commit and preserve package lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `Cargo.lock`, `poetry.lock`).
- **Vulnerability Auditing**: Run automated dependency audits (`npm audit`, `pip-audit`, `cargo audit`) periodically to detect and remediate vulnerabilities early.
