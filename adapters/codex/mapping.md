# OpenAI Codex Adapter Mapping Specification

## 1. Directory & File Mapping

| Canonical Source | Codex Target Destination | Format Notes |
| :--- | :--- | :--- |
| `constitution/` + `policies/` | `codex/system-prompt.json` | JSON structure with `role: "system"` instructions |
| `workflows/` | `codex/system-prompt.json` (`workflow_instructions`) | Sequential execution prompts |
| `skills/` | Tool definitions or specialized prompt blocks | Function calling schemas / instructions |

---

## 2. Prompt Formatting for Codex
Codex models excel when instructions are presented as unambiguous rules with positive and negative few-shot examples:
- Explicit constraints: "DO NOT", "MUST".
- Verification states: Explicitly requiring tools to run tests before reporting task completion.
