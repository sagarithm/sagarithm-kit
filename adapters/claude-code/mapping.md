# Claude Code Adapter Mapping Specification

## 1. Directory & File Mapping

| Canonical Source | Claude Code Target Destination | Format Notes |
| :--- | :--- | :--- |
| `constitution/` + `policies/` + `workflows/` | `CLAUDE.md` | Concatenated, high-density Markdown formatted specifically for Claude's reasoning style |
| `workflows/feature-development-workflow.md` | `CLAUDE.md` (`## Feature Workflow`) | Standardized execution sequence |
| `workflows/bug-fix-workflow.md` | `CLAUDE.md` (`## Bug Fix Workflow`) | Reproduction test requirement |

---

## 2. Formatting Characteristics
Claude Code prioritizes concise, actionable command references:
- **Build / Test Commands**: Explicit shell commands (`npm test`, `cargo check`).
- **Code Style Invariants**: Short, bulleted constraints (no `any`, no swallowed errors).
- **Prohibited Actions**: Explicitly forbidden commands (no force push, no arbitrary directory creation).
