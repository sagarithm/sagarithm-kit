# Sagarithm Kit

> **Universal Cross-Agent Engineering Framework for AI Coding Agents**

[![npm version](https://img.shields.io/npm/v/sagarithm-kit.svg?color=fa5d19&style=flat-square)](https://www.npmjs.com/package/sagarithm-kit)
[![Website](https://img.shields.io/badge/website-kit.sagarithm.in-fa5d19?style=flat-square)](https://kit.sagarithm.in)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)
[![CI Matrix](https://img.shields.io/github/actions/workflow/status/sagarithm/sagarithm-kit/ci.yml?branch=main&label=CI&style=flat-square)](https://github.com/sagarithm/sagarithm-kit/actions)
[![MCP Ready](https://img.shields.io/badge/MCP-Native%20Stdio%20JSON--RPC-blueviolet?style=flat-square)](cli/src/mcp/server.ts)

Sagarithm Kit encodes the collective wisdom, disciplined practices, and architectural rigor of experienced software architects and engineers into an agent-agnostic framework. It equips AI coding agents with the engineering environment, protocol tools, and boundary policies required to produce production-grade software.

- 🌐 **Official Website & Live Studio:** [kit.sagarithm.in](https://kit.sagarithm.in)
- 📦 **npm Registry:** [npmjs.com/package/sagarithm-kit](https://www.npmjs.com/package/sagarithm-kit)
- 📦 **GitHub Packages:** [@sagarithm/sagarithm-kit](https://github.com/sagarithm/sagarithm-kit/pkgs/npm/sagarithm-kit)
- ☕ **Support:** [paypal.me/thesagarithm](https://paypal.me/thesagarithm)

---

## The Core Product Thesis

AI coding agents should not enter a codebase with only a user prompt. They should enter with:

- **Truth-Driven Ideation**: Stress-testing feasibility, non-goals, and operational bottlenecks before code generation begins.
- **Project Context & Topology**: Understanding existing abstractions, modules, call topologies, and public APIs.
- **Engineering Principles & Coding Standards**: Strict adherence to architectural invariants and clean code paradigms.
- **10 Canonical Engineering Skills**: Modular, discipline-specific procedural knowledge with strict anti-rationalization defense.
- **Behavioral Policies**: Non-negotiable constraints preventing redundant folder creation, unvetted dependencies, and architectural drift.
- **Disciplined Workflows**: Phased lifecycles (Understand -> Plan -> Implement -> Verify -> Document) with hard verification gates.
- **Native Protocol Interfaces (MCP)**: Providing runtime tools directly to LLMs for verification, entropy secret scanning, and AST queries.
- **Production Mindset**: Favoring reliability, security, maintainability, and operational correctness over quick-and-dirty generation.

---

## Installation & Quickstart

Run directly without installation via `npx`:

```bash
# Turnkey starter init: pre-installs all 10 canonical skills before prompting
npx sagarithm-kit init --starter

# Run the native Model Context Protocol (MCP) server for Claude Desktop / Cursor
npx sagarithm-kit mcp

# Stress-test an idea before building (Truth-Driven Engineering)
npx sagarithm-kit validate "Decentralized real-time multiplayer state engine"

# Compute the 100-point Codebase Health Index
npx sagarithm-kit health

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
- **Claude Code & Claude Desktop**
- **VS Code / GitHub Copilot**
- **Windsurf**
- **OpenAI Codex**
- **Any Model Context Protocol (MCP) Client**

---

## The Seven Architectural Layers

1. **Canonical Engineering Knowledge** - Architectural principles, domain models, coding standards.
2. **Canonical Skills** - 10 modular capabilities answering *"How to perform an engineering discipline correctly"*.
3. **Canonical Policies** - Non-negotiable boundaries answering *"What must or must not be done"*.
4. **Canonical Workflows** - Temporal lifecycles answering *"What sequence of steps and gates to follow"*.
5. **Project Context** - Workspace manifests, dependency topologies, and AST coupling analytics.
6. **Agent-Specific Adapters** - One-way compilation pipelines translating canonical specifications into native agent configurations.
7. **Model Context Protocol (MCP) Server** - Stdio JSON-RPC 2.0 interface exposing runtime architectural tools directly to AI models.

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

## Canonical Skills (v1.1.1)

The complete suite of 10 canonical skills is cataloged in [skills/README.md](skills/README.md):

| Domain | Skill | Identifier | Description |
| :--- | :--- | :--- | :--- |
| **Ideation** | [Idea Validation & Truth-Driven Engineering](skills/ideation/idea-validation/SKILL.md) | `ideation.idea-validation` | Stress-tests concepts; forbids blind AI compliance; demands truth on feasibility and non-goals. |
| **Architecture** | [Specification-Driven Architecture](skills/architecture/spec-driven-development/SKILL.md) | `architecture.spec-driven-development` | Formal bounded contexts, contract interfaces, state machines, and acceptance criteria. |
| **Architecture** | [System Design & Modularity](skills/architecture/system-design/SKILL.md) | `architecture.system-design` | Highly cohesive, loosely coupled modules with explicit public interfaces and acyclic graphs. |
| **Lifecycle** | [Atomic Planning & Task Breakdown](skills/lifecycle/planning-and-task-breakdown/SKILL.md) | `lifecycle.planning-and-task-breakdown` | Hermetic, sequentially verifiable implementation slices with rollback checkpoints. |
| **Quality** | [Clean Code & Quality Standards](skills/quality/coding-standards/SKILL.md) | `quality.coding-standards` | Expressive, type-safe code with strict error handling, discriminated unions, and concurrency safety. |
| **Quality** | [Rigorous Code Review & Quality Defense](skills/quality/code-review-and-quality/SKILL.md) | `quality.code-review-and-quality` | Senior-engineer scrutiny, zero-leak defense, minimal blast radius, anti-rationalization pushback. |
| **Security** | [Secure Development & Vulnerability Prevention](skills/security/secure-development/SKILL.md) | `security.secure-development` | Defense-in-depth, input sanitization, Shannon entropy secret isolation ($H \ge 4.5$), STRIDE mitigation. |
| **Testing** | [Test-Driven Verification](skills/testing/test-driven-verification/SKILL.md) | `testing.test-driven-verification` | Deterministic automated test suites, property-based invariants, and mutation verification. |
| **Documentation** | [Architectural Decision Records](skills/documentation/architectural-decision-records/SKILL.md) | `documentation.architectural-decision-records` | MADR 3.0 decision matrices capturing consequential choices, alternatives, and trade-offs. |
| **Delivery** | [Production Shipping & Release Governance](skills/delivery/shipping-and-launch/SKILL.md) | `delivery.shipping-and-launch` | Verification gates, SemVer versioning, changelog synchronization, and CI/CD attestation. |

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

## Native Model Context Protocol (MCP) Server

Sagarithm Kit includes a native **Model Context Protocol (MCP)** server operating over standard input/output (stdio JSON-RPC 2.0). It equips AI models directly with 6 architectural tools:

```json
{
  "mcpServers": {
    "sagarithm": {
      "command": "npx",
      "args": ["-y", "sagarithm-kit", "mcp"]
    }
  }
}
```

### Exposed MCP Tools
1. `sagarithm_verify`: Run empirical multi-vector verification gate (Static, Security, Architecture, Behavioral, Documentation).
2. `sagarithm_scan_secrets`: Scan source code for Shannon entropy leaks ($H \ge 4.5$) and credential signatures.
3. `sagarithm_query_graph`: Inspect AST symbols, calculate blast-radius, and evaluate Martin instability.
4. `sagarithm_validate_idea`: Stress-test concepts against operational bottlenecks and anti-goals.
5. `sagarithm_health`: Return composite 100-point codebase health index.
6. `sagarithm_get_skill`: Retrieve canonical skill instructions and anti-rationalization tables.

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

---

## Agent Adapters & CLI Engine

The `@sagarithm/cli` tool is documented in [cli/README.md](cli/README.md):
- `sagarithm init [--starter]`: Workspace manifest generation and turnkey skill initialization
- `sagarithm mcp [--config <target>]`: Stdio Model Context Protocol server
- `sagarithm validate "<idea>"`: Truth-driven feasibility and bottleneck stress-testing
- `sagarithm health`: 100-point composite codebase health dashboard
- `sagarithm preset`: List, inspect, and apply curated engineering presets (`list`, `show`, `apply`)
- `sagarithm sync`: Multi-agent compiler (`--target cursor`, `--target claude`, etc.)
- `sagarithm context`: Project graph generator and AST topology query engine (`stats`, `find`, `blast-radius`, `orphans`)
- `sagarithm doctor`: Structural sprawl and repository health check
- `sagarithm audit`: Pre-commit policy, secret, and architectural fitness scanner (`--deep`, `--strict`, `--json`)
- `sagarithm verify`: Zero-Assumed-Success multi-vector execution verification gate (`--strict`, `--suite`, `--json`)
- `sagarithm registry`: Search canonical catalog and package artifacts with SHA-256 integrity (`search`, `pack`)

---

## Documentation & Specifications

- [Canonical Terminology & Taxonomy](specification/TERMINOLOGY.md)
- [Canonical Meta-Specification](specification/SPECIFICATION.md)
- [Contribution Guidelines](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

---

## License

Apache License 2.0. See [LICENSE](LICENSE) for details.
