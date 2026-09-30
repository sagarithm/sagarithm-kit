# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Phase 1: Engineering Constitution
- Codified the supreme law of engineering for AI coding agents in `constitution/`:
  - `01-engineering-principles.md`: 10 core philosophies and behavioral governors.
  - `02-architecture-principles.md`: System modularity, boundaries, and ADR requirements.
  - `03-coding-standards.md`: Expressiveness, strict typing, error handling, and naming.
  - `04-testing-principles.md`: Testing pyramid, determinism, mocking, and zero assumed success.
  - `05-security-principles.md`: Secrets management, input defense, least privilege, OWASP.
  - `06-documentation-standards.md`: Living documentation, ADR standards, API contracts.
  - `07-git-standards.md`: Atomic commits, Conventional Commits, branch hygiene.
  - `08-release-standards.md`: SemVer, expand/contract migrations, rollback readiness.

### Added - Phase 0: Foundation
- Established canonical architectural specification in [ARCHITECTURE.md](ARCHITECTURE.md).
- Formulated the 6 decoupled architectural layers (Canonical Knowledge, Skills, Policies, Workflows, Project Context, Agent Adapters).
- Codified canonical terminology and taxonomy in [specification/TERMINOLOGY.md](specification/TERMINOLOGY.md).
- Formulated canonical meta-specification in [specification/SPECIFICATION.md](specification/SPECIFICATION.md).
- Authored [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).
- Added Apache-2.0 [LICENSE](LICENSE).
- Initialized clean git repository tracking.
