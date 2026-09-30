---
id: "policy.dependency-management"
name: "Dependency Management & Supply Chain Control"
version: "1.0.0"
severity: "error"
scope: "dependency"
description: "Restricts the introduction of third-party dependencies. Requires evaluation of native standard libraries and lockfile integrity."
rationale: "Unvetted package additions introduce CVE vulnerabilities, license incompatibilities, bundle bloat, and long-term maintenance liabilities."
enforcement: "automated"
remediation: "Remove the third-party package and implement the logic using existing dependencies or native language primitives."
---

# Policy: Dependency Management & Supply Chain Control

## 1. The Invariant
**No third-party dependency may be added without evaluating native standard library capabilities and confirming license/security hygiene.**

## 2. Dependency Admission Criteria
Before adding any package to `package.json`, `requirements.txt`, `Cargo.toml`, or `go.mod`:
1. **Native Alternative Check**: Can this be accomplished in < 50 lines of clean, well-tested code using language built-ins?
2. **Maintenance & Community Health**: Is the package actively maintained with recent releases, healthy issue resolution, and widespread adoption?
3. **License Compatibility**: Is the package license permissive (MIT, Apache-2.0, BSD, ISC)? Strictly forbid viral copyleft licenses (GPLv3, AGPL) in commercial codebases unless explicitly authorized.
4. **Vulnerability Audit**: Run `npm audit` or equivalent before and after installation; zero critical or high vulnerabilities allowed.

## 3. Lockfile Invariant
- Every package installation command must update and commit the corresponding lockfile (`package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`).
- Never delete or regenerate lockfiles from scratch during normal development.
