# VS Code & GitHub Copilot Adapter

> **Compilation Engine for GitHub Copilot & VS Code Environments**

This adapter compiles canonical Sagarithm Kit specifications into `.github/copilot-instructions.md` and related VS Code prompt configurations.

---

## Target Artifacts

1. **Repository Instructions**: Emitted to `.github/copilot-instructions.md`, automatically indexed by GitHub Copilot Chat in VS Code, JetBrains, and GitHub.com.
2. **Prompt Templates**: Optional `.prompts/*.prompt.md` files for task-specific Copilot interactions.

---

## Compilation Mapping

See [mapping.md](mapping.md) for details on instruction structure and Copilot prompt weighting.
