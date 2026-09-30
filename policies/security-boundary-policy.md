---
id: "policy.security-boundary"
name: "Security Boundary & Secrets Containment"
version: "1.0.0"
severity: "error"
scope: "security"
description: "Prohibits committing credentials, raw SQL concatenation, untrusted shell executions, and unvalidated perimeter inputs."
rationale: "Security vulnerabilities committed to repositories can be exploited immediately upon push to public or internal repositories."
enforcement: "automated"
remediation: "Purge secrets immediately, convert raw SQL to parameterized queries, and validate all inputs with schema parsers."
---

# Policy: Security Boundary & Secrets Containment

## 1. The Invariants
1. **Zero Secrets**: Never commit passwords, API keys, private tokens, or connection strings into version control.
2. **Mandatory `.gitignore`**: All local environment files (`.env`, `.env.local`) must be excluded from git.
3. **Parameterized Queries**: Raw string interpolation into SQL/NoSQL queries is completely prohibited.
4. **No Direct Shell Interpolation**: Commands spawned via child processes must receive arguments as structured array elements, not concatenated shell strings.

## 2. Pre-Commit Security Gate
Before committing any changes:
- Run git diff to ensure no credential or sensitive token appears in added lines.
- Verify all database access goes through ORM query builders or parameterized placeholders (`$1`, `?`).
