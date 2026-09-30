---
id: "workflow.bug-fix"
name: "Bug Fix Workflow"
version: "1.0.0"
category: "bug-fix"
description: "Disciplined defect resolution requiring reproducing regression tests, root-cause diagnosis, minimal surgical patches, and regression verification."
applicable_risk_tiers:
  - "low"
  - "medium"
  - "high"
  - "critical"
---

# Bug Fix Workflow

## Overview
This workflow governs the investigation, reproduction, and resolution of software defects. It ensures bugs are permanently resolved by requiring a **reproducing automated test** before any fix is applied.

---

## Phase 1: Understand & Root-Cause Diagnosis
1. **Understand Reported Defect**: Analyze error logs, stack traces, expected behavior, and actual behavior.
2. **Distinguish Symptoms from Root Cause**: Do not apply superficial band-aids (e.g. adding `if (x) return;` to silence null errors) without understanding why `x` was null.
3. **Trace Data Flow**: Inspect callers, state transitions, and boundary inputs that led to the invalid state.

---

## Phase 2: Reproduce with a Failing Test (Red Phase)
1. **Mandatory Regression Test**: Write an automated unit or integration test that reproduces the exact bug scenario.
2. **Execute Test Runner**: Run the test and confirm that it **fails** against the existing unpatched codebase with the reported error.
3. **Invariant Check**: If the test passes before the fix is applied, the test does not reproduce the bug. Refine the test until it reliably reproduces the failure.

---

## Phase 3: Minimal Surgical Fix (Green Phase)
1. **Minimal Necessary Change**: Implement the minimal code change required to address the root cause ([`policy.change-scope`](../policies/change-scope-policy.md)).
2. **No Opportunistic Refactors**: Do not rewrite unrelated methods, rename variables, or alter untouched code.
3. **Preserve Error Boundaries**: Fix the logic while maintaining explicit typing and domain error models.

---

## Phase 4: Verification Gate (Mandatory)
1. **Verify Target Fix**: Run the reproducing test and confirm it now passes (Green).
2. **Verify Regression Suite**: Execute the broader project test suite to guarantee the fix did not introduce regressions elsewhere.
3. **Static Analysis & Types**: Run linter and typecheckers to ensure syntax and contract integrity.
4. **Zero Assumed Success**: Inspect terminal output to confirm exit code 0.

---

## Phase 5: Documentation & Review
1. **Commit Message Discipline**: Use Conventional Commits (`fix(scope): concise description`).
2. **Explain Root Cause**: In the commit message body, document:
   - What the root cause was.
   - How the patch fixes it.
   - What test verifies the resolution.
3. **Changelog Entry**: Add an entry under `[Unreleased]` in `CHANGELOG.md`.
