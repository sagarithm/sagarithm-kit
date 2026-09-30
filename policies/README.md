# Canonical Policies

> **Non-Negotiable Behavioral Constraints for AI Coding Agents**

Policies define project-wide boundaries that every AI coding agent must respect. While Skills define *"how to do something correctly"*, Policies define *"what MUST or MUST NOT be done"*.

---

## Policy Severity Hierarchy

- **`error` (Blocking)**: Absolute constraint. Any action violating an error-severity policy must be rejected or rolled back immediately.
- **`warn` (Review Gate)**: Requires explicit justification, review sign-off, or compensatory actions before proceeding.
- **`advisory` (Recommendation)**: Best-practice guidance that should be followed unless a compelling technical reason exists.

---

## Foundational Policy Catalog

| Policy | Identifier | Scope | Severity | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| [Directory Creation](directory-creation-policy.md) | `policy.directory-creation` | `directory-creation` | `error` | Prevents arbitrary creation of generic folders (`utils`, `helpers`) and structural sprawl. |
| [File Creation](file-creation-policy.md) | `policy.file-creation` | `file-creation` | `error` | Prevents redundant files, duplicate helper abstractions, and mislocated source code. |
| [Dependency Management](dependency-management-policy.md) | `policy.dependency-management` | `dependency` | `error` | Enforces native alternatives check, license hygiene, and lockfile integrity. |
| [Change Scope](change-scope-policy.md) | `policy.change-scope` | `global` | `error` | Limits blast radius. Forbids speculative refactoring and unrelated formatting cascades. |
| [Testing Enforcement](testing-enforcement-policy.md) | `policy.testing-enforcement` | `testing` | `error` | Prohibits assumed success. Mandates terminal execution and regression tests for bug fixes. |
| [Security Boundary](security-boundary-policy.md) | `policy.security-boundary` | `security` | `error` | Forbids committing secrets, unparameterized queries, and raw shell injections. |
| [Documentation Sync](documentation-synchronization-policy.md) | `policy.documentation-synchronization` | `documentation` | `warn` | Mandates documentation and ADR updates whenever interfaces or architecture change. |
