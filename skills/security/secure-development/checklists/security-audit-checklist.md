# Checklist: Security Review

Before declaring any security-sensitive code ready for merge:

- [ ] **No Hardcoded Secrets**: Are there zero API keys, tokens, private keys, or credentials in any committed file?
- [ ] **`.gitignore` Verified**: Are all local environment files (`.env`, `.env.local`) safely ignored?
- [ ] **Parameterized Database Queries**: Are all database queries parameterized or managed through trusted ORMs without raw string interpolation?
- [ ] **Perimeter Input Validation**: Is all untrusted input validated via strict schemas before entering domain logic?
- [ ] **Authorization Checked**: Are resource ownership and role permissions checked on the server side?
- [ ] **No Command Injections**: Are child processes invoked with arguments passed as separate array elements rather than interpolated shell strings?
- [ ] **Safe Error Messages**: Are internal stack traces and database errors hidden from client-facing HTTP responses?
