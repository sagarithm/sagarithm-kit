# Sagarithm Kit

> **Cross-Agent Software Engineering Framework for AI Coding Agents**

Sagarithm Kit encodes the collective wisdom, disciplined practices, and architectural rigor of experienced software architects and engineers into an agent-agnostic framework. It equips AI coding agents with the engineering environment required to produce production-grade software.

---

## The Core Product Thesis

AI coding agents should not enter a codebase with only a user prompt. They should enter with:

- **Project Context & Topology**: Understanding existing abstractions, modules, and public APIs.
- **Engineering Principles & Coding Standards**: Strict adherence to architectural invariants and clean code paradigms.
- **Specialized Engineering Skills**: Modular, discipline-specific procedural knowledge (architecture, backend, frontend, database, security, testing, devops).
- **Behavioral Policies**: Non-negotiable constraints preventing redundant folder creation, unvetted dependencies, and architectural drift.
- **Disciplined Workflows**: Phased lifecycles (Understand -> Plan -> Implement -> Verify -> Document) with hard verification gates.
- **Production Mindset**: Favoring reliability, security, maintainability, and operational correctness over quick-and-dirty generation.

---

## Development Environment vs. Target Platform

> **Google Antigravity is the development environment, NOT the target platform.**
> Sagarithm Kit must not become dependent on Antigravity-specific functionality.

Sagarithm Kit maintains a single canonical source of truth that compiles down to configurations for any supported target agent:
- **Google Antigravity**
- **Cursor**
- **Claude Code**
- **VS Code / GitHub Copilot**
- **Windsurf**
- **OpenAI Codex**

---

## The Six Architectural Layers

1. **Canonical Engineering Knowledge** - Architectural principles, domain models, coding standards.
2. **Canonical Skills** - Modular capabilities answering *"How to perform an engineering discipline correctly"*.
3. **Canonical Policies** - Non-negotiable boundaries answering *"What must or must not be done"*.
4. **Canonical Workflows** - Temporal lifecycles answering *"What sequence of steps and gates to follow"*.
5. **Project Context** - Workspace manifests, dependency topologies, and existing abstraction graphs.
6. **Agent-Specific Adapters** - One-way compilation pipelines translating canonical specifications into native agent configurations.

For the complete architectural design, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## The Engineering Constitution

The foundational laws governing all agent interactions are codified in the [Engineering Constitution](constitution/README.md):
1. [Engineering Principles](constitution/01-engineering-principles.md)
2. [Architecture Principles](constitution/02-architecture-principles.md)
3. [Coding Standards](constitution/03-coding-standards.md)
4. [Testing Principles](constitution/04-testing-principles.md)
5. [Security Principles](constitution/05-security-principles.md)
6. [Documentation Standards](constitution/06-documentation-standards.md)
7. [Git Standards](constitution/07-git-standards.md)
8. [Release Standards](constitution/08-release-standards.md)

---

## Core Skills

The suite of validated canonical skills is cataloged in [skills/README.md](skills/README.md):
- **Architecture**: [System Design & Modularity](skills/architecture/system-design/SKILL.md)
- **Quality**: [Clean Code & Quality Standards](skills/quality/coding-standards/SKILL.md)
- **Testing**: [Test-Driven Verification](skills/testing/test-driven-verification/SKILL.md)
- **Security**: [Secure Development](skills/security/secure-development/SKILL.md)
- **Documentation**: [Architectural Decision Records](skills/documentation/architectural-decision-records/SKILL.md)

---

## Behavioral Policies

The project-wide boundary policies are cataloged in [policies/README.md](policies/README.md):
- [Directory Creation Policy](policies/directory-creation-policy.md)
- [File Creation Policy](policies/file-creation-policy.md)
- [Dependency Management Policy](policies/dependency-management-policy.md)
- [Change Scope Policy](policies/change-scope-policy.md)
- [Testing Enforcement Policy](policies/testing-enforcement-policy.md)
- [Security Boundary Policy](policies/security-boundary-policy.md)
- [Documentation Synchronization Policy](policies/documentation-synchronization-policy.md)

---

## Canonical Workflows

The phase-gated task lifecycles are cataloged in [workflows/README.md](workflows/README.md):
- [Feature Development Workflow](workflows/feature-development-workflow.md)
- [Bug Fix Workflow](workflows/bug-fix-workflow.md)
- [Refactoring Workflow](workflows/refactoring-workflow.md)
- [Release Workflow](workflows/release-workflow.md)

---

## Project Context & Intelligence

Topological repository graph and discovery engine in [context/README.md](context/README.md):
- [Project Manifest Schema](context/schema/project-manifest.schema.json)
- [Sample Topology Manifest](context/examples/sample-manifest.json)
- Graph discovery queries: abstraction lookup, blast radius calculation, and location suggestion

---

## Validation & Audit Engine

Empirical multi-vector verification gate enforcing the constitutional **Zero Assumed Success** principle:
- **[Validation Specification](validation/SPECIFICATION.md)**: Verification state machine (`ASSUMED` -> `IMPLEMENTED` -> `TESTED` -> `VERIFIED`).
- **Canonical Rules**:
  - [Secret Hygiene Patterns](validation/rules/secret-patterns.json) (Shannon entropy scanner + token regex).
  - [Architectural Fitness Rules](validation/rules/architecture-fitness.json) (anti-pattern directory blocker, graph cycle detector).
  - [Verification Vectors](validation/rules/verification-vectors.json) (Static, Security, Architecture, Behavioral, Documentation).
- **Execution Harness**:
  - `sagarithm audit --deep`: Full repository secret and architectural fitness audit.
  - `sagarithm verify --strict`: Multi-vector execution gate with empirical evidence collection and `.sagarithm/audit-report.json` generation.

---

## Agent Adapters & CLI

- **Adapters**: Target platform compilation definitions in [adapters/README.md](adapters/README.md).
- **CLI Engine**: Operational compiler, linter, and audit tool in [cli/README.md](cli/README.md):
  - `sagarithm init`: Workspace manifest generation
  - `sagarithm sync`: Multi-agent compiler
  - `sagarithm context`: Project graph generator and topology query engine
  - `sagarithm doctor`: Structural sprawl and repository health check
  - `sagarithm audit`: Pre-commit policy, secret, and architectural fitness scanner (`--deep`, `--strict`, `--json`)
  - `sagarithm verify`: Zero-Assumed-Success multi-vector execution verification gate (`--strict`, `--suite`, `--json`)

---

## Documentation & Specifications

- [Canonical Terminology & Taxonomy](specification/TERMINOLOGY.md)
- [Canonical Meta-Specification](specification/SPECIFICATION.md)
- [Contribution Guidelines](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

---

## Project Status: Phased Roadmap

Sagarithm Kit is developed under a disciplined 10-phase roadmap:
- **[x] Phase 0 - Foundation**: Architecture, terminology, meta-specification, governance standards.
- **[x] Phase 1 - Engineering Constitution**: Encoding core engineering, architectural, coding, security, and testing principles.
- **[x] Phase 2 - Core Skills**: Architecture, Coding Standards, Testing, Security, Documentation.
- **[x] Phase 3 - Policies**: File/directory creation, dependency limits, change containment.
- **[x] Phase 4 - Workflows**: Feature, Bug Fix, Refactor, Release lifecycles.
- **[x] Phase 5 - Agent Adapters**: Native compilers for Antigravity, Cursor, Claude Code, Copilot, Windsurf, Codex.
- **[x] Phase 6 - CLI**: `sagarithm init`, `sync`, `doctor`, `audit`, `verify`.
- **[x] Phase 7 - Project Intelligence**: Repository graph and context extraction engine.
- **[x] Phase 8 - Validation & Audit Engine**: Multi-vector verification gate, secret/entropy scanner, architectural fitness engine.
- **[ ] Phase 9 - Registry & Ecosystem**: Distributed skill registries and enterprise presets.

---

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
