# Sagarithm Kit: Meta-Specification

This document defines the formal meta-specification for all artifacts within Sagarithm Kit. It outlines the schema, structure, contracts, and lifecycle requirements for Skills, Policies, Workflows, Project Context, and Adapters.

---

## 1. Specification Principles

1. **Agnostic Expression**: Artifacts must be written in platform-neutral formats (standard Markdown with semantic YAML frontmatter, or JSON Schema).
2. **Zero Proprietary Syntax**: Canonical definitions must never reference editor-specific frontmatter tags (such as Cursor's `globs`, Antigravity's internal tool declarations, or Claude Code's shell execution assumptions) directly in the specification.
3. **Composability**: Skills, Policies, and Workflows must be capable of being combined into domain-specific presets (e.g., `fullstack-web`, `api-backend`, `systems`).
4. **SemVer Versioning**: All canonical artifacts must include semantic versioning (`major.minor.patch`) to support controlled evolution and backward compatibility.

---

## 2. Anatomy of a Canonical Skill

A skill provides deep procedural knowledge for a specific engineering discipline.

### Directory Convention (Phase 2+)
```text
skills/<domain>/<skill-name>/
├── SKILL.md              # Primary declarative guidance & frontmatter
├── references/           # In-depth architectural/engineering references
├── examples/             # Concrete canonical code patterns (good vs. bad)
└── checklists/           # Step-by-step verification checklists
```

### Frontmatter Schema (Draft)
```yaml
id: "domain.skill-name"
name: "Human Readable Skill Name"
version: "1.0.0"
domain: "architecture | frontend | backend | database | testing | security | devops | quality | documentation | product | ai"
description: "High-level summary of what capability this skill provides."
triggers:
  - "Keywords or conditions that signal this skill is relevant"
prerequisites:
  - "domain.other-skill"
risk_profile: "low | medium | high | critical"
```

---

## 3. Anatomy of a Canonical Policy

A policy specifies immutable boundaries, constraints, and project rules.

### Frontmatter Schema (Draft)
```yaml
id: "policy.boundary-name"
name: "Human Readable Policy Name"
version: "1.0.0"
severity: "error | warn | advisory"
scope: "global | file-creation | directory-creation | dependency | security | git"
description: "Precise statement of what is forbidden or required."
rationale: "Why this policy exists (engineering justification)."
enforcement: "automated | static-analysis | prompt-constraint"
remediation: "Steps to rectify a violation."
```

---

## 4. Anatomy of a Canonical Workflow

A workflow governs the temporal lifecycle of an engineering task.

### Lifecycle Model
Every workflow follows the five standard engineering phases:
1. **Understand & Inspect**: Baseline code analysis, dependency inspection, requirement clarification.
2. **Plan & Design**: Identification of blast radius, architecture alignment, test strategy, risk categorization.
3. **Minimal Implementation**: Isolated, cohesive modifications adhering strictly to project policies.
4. **Verification & Testing**: Execution of test suites, type checking, linting, security scans (Verification Gates).
5. **Documentation & Review**: Consequential decision records (ADRs), change logs, summary of evidence.

---

## 5. Anatomy of an Agent Adapter

An adapter is a compilation bridge that translates the canonical layers into target-agent configurations.

### Adapter Contract
Every adapter implementation must:
1. **Input**: Accept the validated canonical specification (Skills, Policies, Workflows, Project Context).
2. **Transform**: Map canonical attributes into target runtime structures:
   - Rules / Instructions emission
   - Tool / Command mappings
   - Context / Workspace indexing hooks
3. **Output**: Emit deterministic, idempotent file outputs into the target repository.
4. **Non-destructive**: Never overwrite user customizations without explicit reconciliation mechanisms.
5. **No Upstream Pollution**: An adapter cannot inject target-specific requirements backward into the canonical specification.
