---
id: "workflow.feature-development"
name: "Feature Development Workflow"
version: "1.0.0"
category: "feature"
description: "End-to-end lifecycle for implementing new capabilities while preventing architectural sprawl, dependency bloat, and unverified assumptions."
applicable_risk_tiers:
  - "low"
  - "medium"
  - "high"
  - "critical"
---

# Feature Development Workflow

## Overview
This workflow governs how an AI coding agent or engineer takes a user requirement from initial concept to verified production-ready code.

---

## Phase 1: Understand & Inspect
1. **Clarify Acceptance Criteria**: Break down the feature request into testable, unambiguous acceptance criteria and edge cases.
2. **Inspect Existing Code**: Search the repository for existing modules, types, and utilities handling similar domain logic.
3. **Verify Existing Conventions**: Check existing styling, naming conventions, test frameworks, and error-handling patterns.
4. **Enforce Policy**: Apply [`policy.directory-creation`](../policies/directory-creation-policy.md) and [`policy.file-creation`](../policies/file-creation-policy.md) to locate where the feature belongs in the existing hierarchy.

---

## Phase 2: Plan & Design
1. **Determine Risk Tier**:
   - *Low*: Localized UI tweaks, text updates.
   - *Medium*: Isolated internal component or utility.
   - *High*: Database schema change, new endpoint, third-party integration.
   - *Critical*: Payment processing, authentication, credentials, data deletion.
2. **Formulate Architecture**:
   - Define data shapes, DTOs, and interface contracts.
   - If introducing a significant architectural boundary, draft an ADR using [`documentation.architectural-decision-records`](../skills/documentation/architectural-decision-records/SKILL.md).
3. **Outline Test Strategy**: Determine required unit tests, boundary validations, and integration tests before writing code.

---

## Phase 3: Minimal Implementation
1. **Strictly Confine Scope**: Modify only files directly required for the feature ([`policy.change-scope`](../policies/change-scope-policy.md)).
2. **Perimeter Validation**: Validate all external inputs with schema parsers ([`policy.security-boundary`](../policies/security-boundary-policy.md)).
3. **Strict Typing**: No `any` or untyped objects ([`quality.coding-standards`](../skills/quality/coding-standards/SKILL.md)).
4. **Dependency Admission**: Do not add third-party packages if language standard libraries suffice ([`policy.dependency-management`](../policies/dependency-management-policy.md)).

---

## Phase 4: Verification Gate (Mandatory)
1. **Execute Test Runner**: Dispatch the test command in the terminal (`npm test`, `pytest`, `cargo test`).
2. **Inspect Terminal Output**: Verify that all new feature tests pass with exit code 0.
3. **Static Analysis & Linting**: Run project type checker and linter (`tsc`, `npm run lint`).
4. **Zero Assumed Success**: Never claim the feature works without inspecting verified passing terminal output.

---

## Phase 5: Documentation & Review
1. **Living Docs Sync**: Update API specifications or developer guides affected by the change.
2. **Changelog Entry**: Add an entry under `[Unreleased]` in `CHANGELOG.md` following Conventional Commits format.
3. **Atomic Commit**: Commit changes with a descriptive message (`feat(scope): add description`).
