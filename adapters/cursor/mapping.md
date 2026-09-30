# Cursor Adapter Mapping Specification

## 1. Directory & File Mapping

| Canonical Source | Cursor Target Destination | Format Notes |
| :--- | :--- | :--- |
| `constitution/` + `policies/` (Global) | `.cursorrules` | Concatenated baseline rules with demarcation markers |
| `skills/quality/coding-standards/` | `.cursor/rules/coding-standards.mdc` | MDC with `globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.py"]` |
| `skills/testing/test-driven-verification/` | `.cursor/rules/testing.mdc` | MDC with `globs: ["**/*.test.*", "**/*.spec.*", "**/tests/**"]` |
| `skills/security/secure-development/` | `.cursor/rules/security.mdc` | MDC with `globs: ["**/api/**", "**/auth/**", "**/db/**"]` |
| `skills/architecture/system-design/` | `.cursor/rules/architecture.mdc` | MDC with `globs: ["**/*"]` |

---

## 2. Frontmatter Transformation for MDC
Cursor `.mdc` rules require YAML frontmatter specifying file globs and auto-attachment behaviors:

```yaml
---
description: "Sagarithm Quality & Coding Standards"
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.py", "**/*.go", "**/*.rs"]
alwaysApply: false
---
```
