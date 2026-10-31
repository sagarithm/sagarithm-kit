<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# CLAUDE.md — Sagarithm Engineering Guidelines

## Core Philosophy
- Understand before modifying; inspect before creating; minimal necessary change.
- Zero assumed success: always execute tests and verify terminal output before completing tasks.

## Repository Policies
- **Change Scope & Blast Radius Containment** [error]: Confines code modifications strictly to the files and functions directly required to fulfill the user request.
- **Dependency Management & Supply Chain Control** [error]: Restricts the introduction of third-party dependencies. Requires evaluation of native standard libraries and lockfile integrity.
- **Directory Creation & Structural Sprawl Prevention** [error]: Strictly forbids the unauthorized creation of arbitrary directories, generic utility folders, or parallel folder hierarchies.
- **Documentation & ADR Synchronization** [warn]: Requires synchronization of documentation, API specs, and ADRs whenever code architecture or interfaces change.
- **File Creation & Abstraction Deduplication** [error]: Prevents creation of redundant files, duplicate helper abstractions, and mislocated source files.
- **Security Boundary & Secrets Containment** [error]: Prohibits committing credentials, raw SQL concatenation, untrusted shell executions, and unvalidated perimeter inputs.
- **Testing Enforcement & Zero Assumed Success** [error]: Mandates real terminal execution of automated tests, zero test failures, and regression tests for bug fixes.

## Task Workflows
### Bug Fix Workflow
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
### Feature Development Workflow
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
### Refactoring Workflow
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
### Release Workflow
# Release Workflow

## Overview
This workflow governs the preparation, verification, and deployment of software releases according to Semantic Versioning and operational safety standards.

---

## Phase 1: Scope & SemVer Evaluation
1. **Audit Unreleased Changes**: Review all commits and pull requests accumulated under `[Unreleased]` in `CHANGELOG.md`.
2. **Determine SemVer Level**:
   - **MAJOR**: Contains any breaking API changes, dropped database columns, or altered contracts.
   - **MINOR**: Contains new features, new endpoints, or backward-compatible capabilities.
   - **PATCH**: Contains bug fixes, performance optimizations, and security patches only.
3. **Validate Deprecation Cycles**: Verify that any breaking changes were preceded by a formal deprecation period ([`constitution/08-release-standards.md`](../constitution/08-release-standards.md)).

---

## Phase 2: Migration & Backward-Compatibility Verification
1. **Database Schema Auditing**:
   - Confirm all database migrations strictly follow the phased **Expand/Contract** pattern.
   - Verify that migrations do not lock production tables or drop columns in active use.
2. **Environment Variable Audit**: Check if new mandatory environment variables are introduced and documented in `.env.example`.

---

## Phase 3: Release Artifact Preparation
1. **Bump Version**: Update version fields across project metadata files (`package.json`, `Cargo.toml`, `pyproject.toml`).
2. **Finalize Changelog**: Move items from `[Unreleased]` to a versioned section `[X.Y.Z] - YYYY-MM-DD` in `CHANGELOG.md`.
3. **Assemble Build Bundles**: Run production build commands (`npm run build`, `cargo build --release`).

---

## Phase 4: Release Verification Gate (Mandatory)
1. **Full Test Suite Execution**: Execute all unit, integration, and contract test suites.
2. **Dependency Audit**: Run dependency security scan (`npm audit`, `pip-audit`) ensuring zero high/critical CVEs.
3. **Smoke Test Build Artifacts**: Inspect generated binaries, docker containers, or bundles to confirm they launch cleanly without missing assets.
4. **Zero Assumed Success**: Verified passing terminal output is required before proceeding to tagging.

---

## Phase 5: Tagging & Rollback Readiness
1. **Create Annotated Git Tag**:
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```
2. **Confirm Rollback Plan**: Document the rollback procedure (e.g. downward database rollback script, previous container image tag).
3. **Publish Release Notes**: Publish tagged release notes to repository release feeds.
<!-- SAGARITHM:END -->
