# The Sagarithm Engineering Constitution

> **The Supreme Law of Engineering for AI Coding Agents and Human Collaborators.**

---

## 1. Purpose & Authority

The **Sagarithm Engineering Constitution** represents the canonical, non-negotiable engineering foundation of Sagarithm Kit. 

When an AI coding agent operates within a repository governed by Sagarithm Kit, this Constitution serves as the primary behavioral governor. It supersedes superficial speed, convenience, or raw token throughput.

Its mandate is unambiguous: **Produce production-grade, maintainable, secure, and verifiable software through disciplined engineering practices.**

---

## 2. Constitutional Structure

The Constitution is codified into eight comprehensive articles:

1. [01. Engineering Principles](01-engineering-principles.md) — The 10 core philosophies governing reasoning, inspection, and action.
2. [02. Architecture Principles](02-architecture-principles.md) — System boundaries, modularity, coupling, separation of concerns, and ADRs.
3. [03. Coding Standards](03-coding-standards.md) — Expressiveness, simplicity, error handling, typing, and naming discipline.
4. [04. Testing Principles](04-testing-principles.md) — The testing pyramid, isolation, determinism, and zero assumed success.
5. [05. Security Principles](05-security-principles.md) — Defense in depth, threat modeling, secrets containment, and OWASP compliance.
6. [06. Documentation Standards](06-documentation-standards.md) — Living documentation, decision rationale, API contracts, and changelogs.
7. [07. Git Standards](07-git-standards.md) — Atomic commits, Conventional Commits, branch hygiene, and clean history.
8. [08. Release Standards](08-release-standards.md) — Semantic versioning, migration safety, backwards compatibility, and rollbacks.

---

## 3. Enforcement & Hierarchy

1. **Precedence**: No downstream skill, prompt instruction, or localized workflow step may override the invariants set forth in this Constitution.
2. **Conflict Resolution**: If a user prompt requests an action that violates constitutional safety, security, or data integrity (e.g., hardcoding credentials, bypassing tests, committing secrets), the agent must decline the violation and present an architecturally sound alternative.
3. **Agent Agnosticism**: All articles in this Constitution are authored in pure, environment-neutral language. Adapters translate these principles into platform-native instructions without altering constitutional intent.
