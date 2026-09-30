---
id: "policy.documentation-synchronization"
name: "Documentation & ADR Synchronization"
version: "1.0.0"
severity: "warn"
scope: "documentation"
description: "Requires synchronization of documentation, API specs, and ADRs whenever code architecture or interfaces change."
rationale: "Stale documentation misleads human engineers and future AI agents, causing architectural divergence."
enforcement: "prompt-constraint"
remediation: "Update corresponding README, API docs, or ADR files in the same pull request."
---

# Policy: Documentation & ADR Synchronization

## 1. The Invariant
**Any change altering public interfaces, architectural boundaries, or system workflows must include updated documentation in the same commit.**

## 2. Trigger Conditions
- **New Public API Endpoint**: Update OpenAPI/Swagger documentation or API reference guide.
- **Architectural Structural Change**: Author or update an ADR in `docs/adr/`.
- **Breaking Configuration Change**: Update `README.md` or installation/setup instructions.
- **Notable Feature or Bug Fix**: Add an entry in `CHANGELOG.md` following Keep a Changelog.
