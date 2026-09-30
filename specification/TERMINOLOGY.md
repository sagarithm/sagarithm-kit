# Sagarithm Kit: Canonical Terminology & Taxonomy

This document establishes the official vocabulary for Sagarithm Kit. All engineering specifications, schemas, adapters, documentation, and contributions must strictly adhere to these definitions to ensure absolute clarity across human engineers, AI agents, and automated tools.

---

## 1. Foundational Concepts

### Sagarithm Kit
A cross-agent software engineering framework for AI coding agents. It encodes senior engineering practices into an agent-agnostic specification and provides deterministic adaptation mechanisms to configure multiple AI development environments.

### Canonical Specification
The singular, platform-neutral source of truth within Sagarithm Kit. It defines engineering principles, skills, policies, workflows, and schemas without referencing proprietary agent features or target IDE file layouts.

### AI Coding Agent (Agent)
An autonomous or semi-autonomous AI system operating within a software repository to read, analyze, generate, test, or modify codebase artifacts (e.g., Google Antigravity, Cursor, Claude Code, VS Code / GitHub Copilot, Windsurf, OpenAI Codex).

### Development Environment vs. Target Platform
- **Development Environment**: The environment currently used by human engineers and developers to build Sagarithm Kit itself (currently Google Antigravity).
- **Target Platform**: Any supported AI coding environment that consumes Sagarithm Kit configurations to govern software development.
- **Rule**: Sagarithm Kit must never conflate the development environment with target platforms. The framework core must remain 100% agnostic of Google Antigravity.

### Adapter (Agent Adapter)
A deterministic transformation engine that reads the canonical specification and emits native configuration files, rule declarations, tool definitions, and prompt structures tailored to a specific target agent.

---

## 2. The Core Separation Taxonomy

### Canonical Knowledge
Curated, high-level engineering wisdom, architectural decisions, domain models, design patterns, and quality philosophies. It represents *why* software is engineered in a specific manner.

### Skill
A discrete, composable unit of specialized procedural engineering capability.
- **Answers**: *"How should an AI agent perform this specific engineering discipline correctly?"*
- **Characteristics**: Modular, discoverable, versionable, reusable, agent-neutral.
- **Scope**: E.g., Database migration design, API contract modeling, React state architecture, Unit test mocking.
- **Contrast**: A skill provides procedural guidance; it does not enforce project-wide blocking constraints (which are Policies) nor does it dictate full lifecycle sequencing (which are Workflows).

### Policy
A project-wide, non-negotiable behavioral invariant or constraint.
- **Answers**: *"What MUST or MUST NOT be done across the codebase?"*
- **Characteristics**: Deterministic, evaluable, categorized by severity (`error`, `warn`, `advisory`).
- **Scope**: Directory creation limits, dependency addition criteria, security boundaries, change-scope containment.

### Workflow
A structured, sequential execution lifecycle governing a specific class of engineering activities.
- **Answers**: *"In what order should an agent proceed to complete this type of task safely?"*
- **Characteristics**: Phase-gated, includes prerequisites, validation gates, rollback criteria, and completion definitions.
- **Scope**: Feature development, bug triage and fix, architectural refactoring, security remediation, dependency update.

### Project Context (Project Graph)
The declarative representation of a repository's concrete reality—its tech stack, module graph, public APIs, database schemas, existing abstractions, test suites, and documentation.

---

## 3. Engineering Quality & Verification Taxonomy

### Verification Gate
An explicit checkpoint within a workflow where evidence of correctness must be verified before proceeding to the next stage or marking a task complete.

### State of Work Verification
Four distinct states of work:
1. **Implemented**: Code or configuration has been written.
2. **Tested**: Execution of automated suites, scripts, or manual verification steps has been attempted.
3. **Verified**: Concrete, reproducible evidence of success (green tests, passing lint, successful builds, clean logs) has been inspected.
4. **Assumed**: Speculative completion without execution evidence. **Assumed success is strictly prohibited.**

### Risk Tier
A 4-level categorization of engineering changes used to determine the depth of policy enforcement and required verification gates:
1. **Low Risk**: Pure documentation updates, localized styling fixes, non-breaking cosmetic adjustments.
2. **Medium Risk**: Isolated component additions, internal utility extensions, backward-compatible feature work.
3. **High Risk**: Database schema alterations, authentication/authorization updates, external API modifications, third-party dependency additions.
4. **Critical Risk**: Financial transactions, payment processing, secrets/cryptography changes, destructive data operations, production infrastructure modifications.
