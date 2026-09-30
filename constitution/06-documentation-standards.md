# Article 6: Documentation Standards

This article defines documentation practices to ensure long-term comprehensibility, maintainability, and operational readiness.

---

## 1. Living Documentation
- **Synchronized with Code**: Documentation is a first-class engineering deliverable. Any pull request that modifies architecture, API signatures, configurations, or operational steps must update corresponding documentation in the same commit.
- **Accurate Over Verbose**: Stale documentation is worse than missing documentation. Prefer clear, concise, verified descriptions over lengthy, unmaintained narratives.

---

## 2. Standard Repository Documentation Hierarchy
Every production codebase must maintain:
1. **`README.md`**: Mission, architectural overview, prerequisites, quickstart guide, core commands, and contributing pointers.
2. **`CONTRIBUTING.md`**: Setup instructions, branch conventions, PR requirements, and local validation steps.
3. **`docs/adr/`**: Architectural Decision Records documenting significant architectural choices.
4. **`docs/api/`**: Public API contracts, OpenAPI/Swagger specifications, and integration examples.
5. **`CHANGELOG.md`**: Human-readable record of notable changes following the [Keep a Changelog](https://keepachangelog.com/) standard.

---

## 3. Architectural Decision Records (ADR) Standard
- Every ADR must follow the standardized structure:
  - **Title**: Numbered sequence and concise title (e.g., `ADR-001: Adopt Event-Driven Queue for Webhooks`).
  - **Status**: `Proposed`, `Accepted`, `Deprecated`, or `Superseded`.
  - **Context**: The business/technical problem, constraints, and alternatives evaluated.
  - **Decision**: The selected direction and architectural justification.
  - **Consequences**: Verified trade-offs, operational burdens, and benefits.

---

## 4. API Documentation
- Public endpoints, library APIs, and SDK interfaces must include:
  - Input parameter types, constraints, and validation rules.
  - Response structures for both successful and error responses.
  - Explicit error codes and troubleshooting guidance.
  - Reproducible code examples.
