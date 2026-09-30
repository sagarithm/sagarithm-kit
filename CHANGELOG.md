# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Enhanced - Phase 2: Advanced Engineering Skills (v1.0.0)
- Elevated all 5 core skills with production-grade engineering references and patterns:
  - `architecture.system-design`: Added Bounded Contexts, Transactional Outbox pattern, Anti-Corruption Layer (ACL), and Architectural Fitness Functions.
  - `quality.coding-standards`: Added branded nominal types, discriminated union exhaustiveness (`assertNever`), Result monad patterns, and async cancellation (`AbortSignal`).
  - `testing.test-driven-verification`: Added property-based invariant testing with `fast-check`, mutation testing benchmarks, and consumer-driven contract testing (Pact).
  - `security.secure-development`: Added STRIDE threat modeling matrix, timing-attack-resistant constant-time comparisons, and SSRF DNS/CIDR validation defenses.
  - `documentation.architectural-decision-records`: Added MADR 3.0 standard, quantitative weighted decision matrices, and superseding workflows.

### Added - Phase 2: Core Skills
- Validated canonical skill architecture (`SKILL.md`, `references/`, `examples/`, `checklists/`) across 5 core engineering domains:
  - `skills/architecture/system-design/`
  - `skills/quality/coding-standards/`
  - `skills/testing/test-driven-verification/`
  - `skills/security/secure-development/`
  - `skills/documentation/architectural-decision-records/`
- Created [skills/README.md](skills/README.md) cataloging the initial core skill model.

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
