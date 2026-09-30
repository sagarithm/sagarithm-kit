# Windsurf Adapter Mapping Specification

## 1. Directory & File Mapping

| Canonical Source | Windsurf Target Destination | Format Notes |
| :--- | :--- | :--- |
| `constitution/` + `policies/` + `workflows/` | `.windsurfrules` | Rules ingested by Cascade before autonomous executions |
| `policies/directory-creation-policy.md` | `.windsurfrules` | Forbids unauthorized folder creation in Cascade |
| `policies/testing-enforcement-policy.md` | `.windsurfrules` | Requires Cascade to run and verify terminal commands |

---

## 2. Cascade Behavioral Controls
- Cascade autonomously executes terminal commands. The adapter explicitly instructs Cascade never to assume that a command succeeded without parsing output and checking exit codes.
- Prohibits Cascade from generating unnecessary folder hierarchies during multi-file operations.
