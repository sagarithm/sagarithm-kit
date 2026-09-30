# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-09-30

### Fixed
- **CLI Runtime Node.js 24 Compatibility**: Bundled CLI into a standalone zero-dependency ESM bundle (`cli/dist/index.mjs`) via `esbuild`. Resolves `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING` when executing `npx sagarithm-kit init` under Node.js v22/v24.

## [1.0.0] - 2026-09-30

### Initial Production Release - Sagarithm Kit v1.0.0
- **Universal Cross-Agent Compatibility**: Single source of truth compiled to Cursor (`.cursorrules`), Antigravity (`GEMINI.md`), Claude Code (`CLAUDE.md`), GitHub Copilot (`.github/copilot-instructions.md`), and Windsurf (`.windsurfrules`).
- **Autonomous Next-Gen CLI Engine**: Workflow orchestration (`sagarithm run`), structural complexity & instability graph analysis (`sagarithm context stats`), orphan abstraction detection (`sagarithm context orphans`), and auto-remediation (`sagarithm audit --fix`).
- **Enterprise-Grade Validation & Audit**: 5-vector verification gate (Static, Security, Architecture, Behavioral, Documentation) enforcing Zero Assumed Success with algorithmic Shannon entropy token scanning ($H \ge 4.5$).
- **Multi-OS Production CI/CD Matrix**: Automated multi-platform workflows testing Ubuntu, Windows, and macOS on Node.js 22 and 24.
- **Global npm Package Distribution**: Dual binary distribution (`sagarithm`, `sagarithm-kit`) live on npm registry (`https://www.npmjs.com/package/sagarithm-kit`).
- **Open-Source Community Infrastructure**: Standard issue templates, pull request template, CODEOWNERS, Code of Conduct, and comprehensive contribution guidelines.

### Added - Phase 9: Registry & Ecosystem (v1.0.0)
- Established the canonical Registry and Ecosystem subsystem:
  - `registry/SPECIFICATION.md`: Decentralized distribution model, package anatomy, deterministic composition, and supply-chain governance.
  - `registry/README.md`: User documentation for preset management, catalog discovery, and skill bundling.
  - JSON Schemas:
    - `registry/schema/package.schema.json`: Schema for published skill/policy package manifests.
    - `registry/schema/preset.schema.json`: Schema for composite engineering presets.
    - `registry/schema/index.schema.json`: Schema for federated registry catalog indexes.
  - Curated Presets:
    - `registry/presets/fullstack-web.json`: Next.js, React, Node, Web APIs, Tailwind, client/server state preset.
    - `registry/presets/api-backend.json`: Resilient microservices, REST, GraphQL, Outbox pattern, Pact contracts preset.
    - `registry/presets/systems-core.json`: High-integrity systems, low-latency runtimes, zero-alloc, exhaustive types preset.
    - `registry/presets/ai-agentic.json`: Multi-agent orchestration, prompt isolation, blast-radius containment, Zero Assumed Success preset.
  - Canonical Catalog:
    - `registry/index.json`: Static index catalog of standard presets and core packages.
- CLI Registry & Preset Subsystem in `@sagarithm/cli`:
  - `cli/src/registry/loader.ts`: Index loader, preset retriever, catalog search engine, and cryptographic SHA-256 packager.
  - `sagarithm preset`: Commands for listing presets (`list`), inspecting details (`show <id>`), and configuring workspaces (`apply <id>`).
  - `sagarithm registry`: Commands for catalog search (`search <query>`) and integrity-verified artifact packaging (`pack <path>`).
- Automated testing suite in `cli/tests/registry.test.ts` (15/15 tests passing).

### Added - Phase 8: Validation & Audit Engine (v1.0.0)
- Established the canonical Validation and Audit subsystem:
  - `validation/SPECIFICATION.md`: Full specification for the empirical multi-vector verification gate and verification state machine (`ASSUMED`, `IMPLEMENTED`, `TESTED`, `VERIFIED`, `FAILED`).
  - `validation/schema/validation-report.schema.json`: Standard JSON schema for verification and audit report artifacts.
  - Canonical validation rules:
    - `validation/rules/secret-patterns.json`: Pattern and entropy rules for known credential tokens and injection flaws.
    - `validation/rules/architecture-fitness.json`: Prohibited directory patterns and acyclic dependency constraints.
    - `validation/rules/verification-vectors.json`: Five canonical verification vectors (Static, Security, Architecture, Behavioral, Documentation).
- Built native validation engine modules in `@sagarithm/cli`:
  - `cli/src/validation/secrets.ts`: Algorithmic Shannon entropy token scanner ($H \ge 4.5$) and regex rules for Stripe, GitHub, Google, OpenAI, AWS, PEM keys, and SQL injection flaws.
  - `cli/src/validation/fitness.ts`: Automated directory anti-pattern detector (`utils`, `helpers`, `misc`, `common`) and graph cycle detection engine (`checkGraphAcyclicity`).
  - `cli/src/validation/engine.ts`: Multi-vector execution pipeline enforcing Zero Assumed Success, capturing empirical evidence, and generating `.sagarithm/audit-report.json`.
- Enhanced CLI commands:
  - `sagarithm audit`: Added `--deep` (full workspace scan), `--strict` (zero-warning mode), and `--json` (automation report output).
  - `sagarithm verify`: Added multi-vector test harness, `--strict`, `--suite`, and `--json` output.
- Automated validation test suite in `cli/tests/validation.test.ts` (10/10 tests passing).
- Added workspace root `package.json` for centralized test and verification script execution.

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
