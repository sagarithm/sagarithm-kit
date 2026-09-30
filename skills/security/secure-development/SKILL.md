---
id: "security.secure-development"
name: "Secure Development & Vulnerability Prevention"
version: "1.0.0"
domain: "security"
description: "Implement defense-in-depth controls, input validation at system boundaries, secret isolation, and OWASP compliance."
triggers:
  - "Handling user input, authentication, or authorization"
  - "Writing database queries, shell executions, or file operations"
  - "Introducing external dependencies or handling credentials"
prerequisites:
  - "quality.coding-standards"
risk_profile: "critical"
---

# Secure Development & Vulnerability Prevention

## Overview
This skill guides AI agents and engineers in constructing software that resists malicious exploitation. Security is not an afterthought; it is built into every architectural boundary, input schema, and database query.

## Core Directives
1. **Never Commit Secrets**: Prevent API keys, tokens, or credentials from entering git history. Use environment configuration.
2. **Validate at the Perimeter**: Parse and validate all external payloads using strict schemas before business logic processing.
3. **Prevent Injection by Default**: Use parameterized queries for databases and structured argument arrays for process executions.
4. **Enforce Least Privilege**: Run processes and queries with the minimal permissions necessary.

## Detailed Guidance
- Read [OWASP Defense in Depth Guidelines](references/owasp-defense-in-depth.md).
- Examine [Input Validation & Secret Isolation Examples](examples/input-validation-and-secrets.md).
- Execute the [Security Audit Checklist](checklists/security-audit-checklist.md).
