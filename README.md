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

The initial suite of validated canonical skills is cataloged in [skills/README.md](skills/README.md):
- **Architecture**: [System Design & Modularity](skills/architecture/system-design/SKILL.md)
- **Quality**: [Clean Code & Quality Standards](skills/quality/coding-standards/SKILL.md)
- **Testing**: [Test-Driven Verification](skills/testing/test-driven-verification/SKILL.md)
- **Security**: [Secure Development](skills/security/secure-development/SKILL.md)
- **Documentation**: [Architectural Decision Records](skills/documentation/architectural-decision-records/SKILL.md)

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
- **[ ] Phase 3 - Policies**: File/directory creation, dependency limits, change containment.
- **[ ] Phase 4 - Workflows**: Feature, Bug Fix, Refactor, Release lifecycles.
- **[ ] Phase 5 - Agent Adapters**: Native compilers for Antigravity, Cursor, Claude Code, Copilot, Windsurf, Codex.
- **[ ] Phase 6 - CLI**: `sagarithm init`, `sync`, `doctor`, `audit`, `verify`.
- **[ ] Phase 7 - Project Intelligence**: Repository graph and context extraction engine.
- **[ ] Phase 8 - Validation & Audit Engine**: Automated verification of implementation states.
- **[ ] Phase 9 - Registry & Ecosystem**: Distributed skill registries and enterprise presets.

---

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
