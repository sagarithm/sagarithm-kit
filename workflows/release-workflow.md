---
id: "workflow.release"
name: "Release Workflow"
version: "1.0.0"
category: "release"
description: "Governance lifecycle for version bumping, migration safety validation, changelog compilation, release sanity gates, and rollback readiness."
applicable_risk_tiers:
  - "low"
  - "medium"
  - "high"
  - "critical"
---

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
