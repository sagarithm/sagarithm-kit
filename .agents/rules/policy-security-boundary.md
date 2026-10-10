<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# Rule: Security Boundary & Secrets Containment [ERROR]

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
<!-- SAGARITHM:END -->
