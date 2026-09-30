# Sagarithm Kit

> **Universal Cross-Agent Engineering Framework for AI Coding Agents**

[![npm version](https://img.shields.io/npm/v/sagarithm-kit.svg?color=fa5d19&style=flat-square)](https://www.npmjs.com/package/sagarithm-kit)
[![Website](https://img.shields.io/badge/website-kit.sagarithm.in-fa5d19?style=flat-square)](https://kit.sagarithm.in)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)
[![CI Matrix](https://img.shields.io/github/actions/workflow/status/sagarithm/sagarithm-kit/ci.yml?branch=main&label=CI&style=flat-square)](https://github.com/sagarithm/sagarithm-kit/actions)

Sagarithm Kit encodes the collective wisdom, disciplined practices, and architectural rigor of experienced software architects and engineers into an agent-agnostic framework. It equips AI coding agents with the engineering environment required to produce production-grade software.

- 🌐 **Official Website & Live Studio:** [kit.sagarithm.in](https://kit.sagarithm.in)
- 📦 **npm Registry:** [npmjs.com/package/sagarithm-kit](https://www.npmjs.com/package/sagarithm-kit)
- 📦 **GitHub Packages:** [@sagarithm/sagarithm-kit](https://github.com/sagarithm/sagarithm-kit/pkgs/npm/sagarithm-kit)
- ☕ **Support:** [paypal.me/thesagarithm](https://paypal.me/thesagarithm)

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

## Installation & Quickstart

Run directly without installation via `npx`:

```bash
# Initialize a new or existing workspace
npx sagarithm-kit init

# Apply a curated engineering preset (fullstack-web, api-backend, systems-core, ai-agentic)
npx sagarithm-kit preset apply fullstack-web

# Compile canonical specifications into native agent configurations
npx sagarithm-kit sync

# Run the Zero Assumed Success verification gate
npx sagarithm-kit verify
```

Or install globally:

```bash
npm install -g sagarithm-kit
sagarithm --help
```

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

## Registry & Ecosystem

Decentralized distribution and turn-key engineering profiles for AI coding agents:
- **[Registry Specification](registry/SPECIFICATION.md)**: Architecture, package anatomy, and SHA-256 integrity governance.
- **[Registry Documentation](registry/README.md)**: Presets, search, and packaging workflows.
- **Curated Presets**:
  - `fullstack-web`: Next.js, React, Node, Web APIs, Tailwind, Client/Server state.
  - `api-backend`: Resilient REST, GraphQL, Outbox pattern, Pact contract testing.
  - `systems-core`: High-integrity systems, low-latency, zero-alloc, exhaustive typing.
  - `ai-agentic`: Multi-agent orchestration, prompt isolation, blast-radius containment.
- **Canonical Schemas**:
  - [Package Schema](registry/schema/package.schema.json)
  - [Preset Schema](registry/schema/preset.schema.json)
  - [Catalog Index Schema](registry/schema/index.schema.json)

---

## Agent Adapters & CLI

- **Adapters**: Target platform compilation definitions in [adapters/README.md](adapters/README.md).
- **CLI Engine**: Operational compiler, linter, and audit tool in [cli/README.md](cli/README.md):
  - `sagarithm init`: Workspace manifest generation
  - `sagarithm preset`: List, inspect, and apply curated engineering presets (`list`, `show`, `apply`)
  - `sagarithm registry`: Search canonical catalog and package artifacts with SHA-256 integrity (`search`, `pack`)
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

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
