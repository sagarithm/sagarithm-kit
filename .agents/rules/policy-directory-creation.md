<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# Rule: Directory Creation & Structural Sprawl Prevention [ERROR]

# Policy: Directory Creation & Structural Sprawl Prevention

## 1. The Invariant
**No new top-level directory or redundant architectural folder may be created without explicit architectural justification and inspection of existing structure.**

## 2. Forbidden Patterns
- **Prohibited Folder Names**: Do not create generic folders such as:
  - `utils/`, `util/`, `utilities/`
  - `helpers/`, `helper/`
  - `common/`, `shared/` (unless explicitly established as an existing monorepo package)
  - `misc/`, `temp/`, `scratch/`
- **Duplicate Parallel Structures**: If `src/modules/` exists, do not create `src/features/` or `src/services/`.

## 3. Mandatory Inspection Procedure
Before creating ANY directory:
1. Run a recursive directory listing or consult the project manifest.
2. Determine where existing code with similar responsibility resides.
3. Co-locate the new logic within the existing module or package.
4. If a new domain concept genuinely requires a new directory, it must follow the existing naming and casing conventions (`kebab-case`, `camelCase`, etc.) of the parent directory.

## 4. Violations & Remediation
- Any pull request or agent execution introducing an unvetted top-level directory fails the policy gate with `severity: error`.
- Remediation: Delete the unauthorized folder and move contents into the appropriate domain directory.
<!-- SAGARITHM:END -->
