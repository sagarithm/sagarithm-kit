# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Phase 7: Project Intelligence & Topology Graph (v1.0.0)
- Established Layer 5 Project Context and Intelligence subsystem:
  - `context/schema/project-manifest.schema.json`: Standard schema for repository topology, modules, APIs, database models, and test harnesses.
  - `context/examples/sample-manifest.json`: Reference implementation of a complete project manifest.
  - `cli/src/graph/indexer.ts`: Codebase scanner constructing the in-memory module graph, extracting exports and imports, and mapping test suites.
  - `cli/src/graph/query.ts`: Intelligence query engine providing abstraction discovery, blast radius calculation, and location suggestions.
  - `sagarithm context` CLI command suite (`generate`, `find`, `blast-radius`, `suggest-location`).
  - Unit tests verifying symbol parsing and blast radius analysis (`cli/tests/graph.test.ts`).
- Created [context/README.md](context/README.md) documenting the project graph architecture.

### Added - Phase 6: Sagarithm Kit CLI (v1.0.0)
- Implemented `@sagarithm/cli` operational tool under `cli/`:
  - `sagarithm init`: Workspace initialization and target agent autodetection.
  - `sagarithm sync`: Multi-agent compiler translating canonical layers through adapter templates to native target files with safe non-destructive demarcation injection.
  - `sagarithm doctor`: Structural sprawl detector, `.gitignore` validator, and lockfile auditor.
  - `sagarithm audit`: Pre-commit/CI policy checker scanning `git diff` for hardcoded secrets and unparameterized SQL concatenation.
  - `sagarithm verify`: Execution verification gate enforcing Zero Assumed Success.
- Automated testing suite verifying frontmatter parsing and non-destructive injection (`cli/tests/parser.test.ts`).
- Created [cli/README.md](cli/README.md) documenting command specifications and execution examples.

### Added - Phase 5: Agent Adapters (v1.0.0)
- Established the target platform adaptation layer across 6 major AI coding environments:
  - `adapters/antigravity/`: Target compilation to `.agents/rules/` and `.agents/skills/`.
  - `adapters/cursor/`: Target compilation to `.cursorrules` and `.cursor/rules/*.mdc`.
  - `adapters/claude-code/`: Target compilation to `CLAUDE.md` and project guidelines.
  - `adapters/copilot/`: Target compilation to `.github/copilot-instructions.md`.
  - `adapters/windsurf/`: Target compilation to `.windsurfrules` and Cascade directives.
  - `adapters/codex/`: Target compilation to structured system prompt templates.
- Created [adapters/README.md](adapters/README.md) cataloging the adapter contracts, compilation lifecycle, and mapping matrix.

### Added - Phase 4: Canonical Engineering Workflows (v1.0.0)
- Established phase-gated execution lifecycles in `workflows/`:
  - `workflow.feature-development`: Phased lifecycle for introducing new features with policy checks and verification gates.
  - `workflow.bug-fix`: Defect resolution lifecycle requiring reproducing regression tests (Red phase) before applying minimal patches (Green phase).
  - `workflow.refactoring`: Behavioral preservation lifecycle requiring green baselines, incremental transformation, and parity verification.
  - `workflow.release`: Release governance covering SemVer evaluation, Expand/Contract migration safety, sanity builds, and rollback plans.
- Created [workflows/README.md](workflows/README.md) cataloging the universal 5-phase engineering lifecycle.

### Added - Phase 3: Foundational Policies (v1.0.0)
- Established canonical policy enforcement framework in `policies/`:
  - `policy.directory-creation`: Blocks arbitrary creation of generic utility folders (`utils`, `helpers`) and structural sprawl.
  - `policy.file-creation`: Mandates pre-creation search and reuse before duplicating files or abstractions.
  - `policy.dependency-management`: Restricts third-party package additions; requires native checks, license review, and lockfile preservation.
  - `policy.change-scope`: Limits blast radius; prohibits speculative refactoring and unrelated formatting cascades.
  - `policy.testing-enforcement`: Blocks assumed success; requires terminal test execution and regression tests for bug fixes.
  - `policy.security-boundary`: Forbids committing credentials, raw SQL interpolation, and shell injections.
  - `policy.documentation-synchronization`: Mandates living documentation and ADR synchronization on interface modifications.
- Created [policies/README.md](policies/README.md) cataloging the foundational policies and severity hierarchy.

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
