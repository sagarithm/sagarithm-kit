# GitHub Copilot Adapter Mapping Specification

## 1. Directory & File Mapping

| Canonical Source | Copilot Target Destination | Format Notes |
| :--- | :--- | :--- |
| `constitution/` + `policies/` | `.github/copilot-instructions.md` | Standard markdown instructions read by Copilot Chat |
| `workflows/` | `.github/copilot-instructions.md` (`## Development Lifecycles`) | Injected under workflow sections |
| `skills/quality/coding-standards/` | `.github/copilot-instructions.md` (`## Coding Standards`) | Synthesized into code generation guidelines |

---

## 2. Copilot Instruction Structure
GitHub Copilot instructions must be concise and prioritize code generation behavior:
- Avoid excessive narrative.
- Use explicit bullet points detailing what code patterns to emit and avoid.
- Emphasize test-driven practices and zero assumed success.
