# Article 8: Release Standards

This article defines release governance, semantic versioning, backwards compatibility, and operational rollout safety.

---

## 1. Semantic Versioning (SemVer 2.0.0)
Releases must strictly follow `MAJOR.MINOR.PATCH`:
- **MAJOR**: Breaking changes or incompatible API modifications.
- **MINOR**: New backward-compatible functionality.
- **PATCH**: Backward-compatible bug fixes and security patches.

---

## 2. Backward Compatibility & Deprecation
- **Graceful Deprecation**: Never remove or break a public API without a prior deprecation cycle (minimum one MINOR version warning).
- **Clear Migration Path**: Deprecated APIs must issue runtime warnings and document direct alternatives in the changelog.

---

## 3. Database & Data Migration Safety
- **Expand/Contract Pattern**: Database schema migrations must never execute breaking changes in a single step. Follow the phased Expand/Contract pattern:
  1. *Expand*: Add the new column/table without removing the old one.
  2. *Dual-Write / Migrate*: Application writes to both or reads backfilled data.
  3. *Contract*: Once all instances are upgraded and stable, drop old deprecated columns in a subsequent release.
- **Zero-Downtime Guarantee**: Migrations must avoid acquiring exclusive table locks on large tables during active traffic.

---

## 4. Release Verification & Rollback Readiness
- **Automated Sanity Verification**: Every release must pass an automated sanity suite (build artifact generation, smoke test execution, dependency vulnerability scans) prior to tagging.
- **Rollback Plan**: Every high-risk or critical-risk release must include an explicit, tested rollback strategy (e.g. downward migration scripts, feature flag kill-switches, container version rollbacks).
