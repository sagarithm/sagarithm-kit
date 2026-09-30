---
id: "workflow.refactoring"
name: "Refactoring Workflow"
version: "1.0.0"
category: "refactoring"
description: "Disciplined restructuring of existing code to improve maintainability, performance, or modularity without altering external behavior."
applicable_risk_tiers:
  - "low"
  - "medium"
  - "high"
---

# Refactoring Workflow

## Overview
Refactoring improves the internal design, readability, or performance of code without altering its observable behavior. This workflow ensures refactoring remains safe, incremental, and verifiable.

---

## Phase 1: Baseline Verification
1. **The Invariant**: Never refactor code that is currently failing tests.
2. **Execute Baseline Suite**: Run existing tests covering the target component.
3. **Verify Baseline**: Confirm tests pass with 100% success before making any code modifications. If coverage is inadequate, add characterization tests first.

---

## Phase 2: Plan & Boundary Invariants
1. **Identify the Smell / Goal**: Clearly define why the refactoring is occurring (e.g., reduce cyclomatic complexity, decouple database logic, remove code duplication).
2. **Verify Public Contracts**: Ensure public API signatures, return types, and exceptions remain strictly identical.
3. **No Concurrent Feature Work**: Refactoring and feature development must never be blended in the same task or commit.

---

## Phase 3: Incremental Transformation
1. **Small Steps**: Make transformations in small, isolated steps (e.g. Extract Method, Move Class, Introduce Parameter Object).
2. **Preserve Compatibility**: If moving public functions, provide temporary deprecated aliases to avoid breaking downstream consumers.
3. **Adhere to Code Quality**: Apply [`quality.coding-standards`](../skills/quality/coding-standards/SKILL.md) to all rewritten segments.

---

## Phase 4: Verification Gate (Mandatory)
1. **Run Full Test Suite**: Execute the test suite and confirm that all existing tests pass without modification.
2. **Architectural Invariant Check**: Run architectural fitness functions ([`architecture.system-design`](../skills/architecture/system-design/SKILL.md)) to confirm no circular dependencies were introduced.
3. **Diff Inspection**: Verify with `git diff` that no external behavior or unintended files were modified ([`policy.change-scope`](../policies/change-scope-policy.md)).

---

## Phase 5: Documentation & Review
1. **ADR Update**: If the refactor changed package boundaries or module structures, update or create an ADR in `docs/adr/`.
2. **Conventional Commit**: Commit with `refactor(scope): describe internal improvement`.
