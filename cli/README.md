# Sagarithm Kit CLI

> **Command-Line Interface, Compiler, and Verification Engine for Sagarithm Kit**

The `@sagarithm/cli` tool is the operational engine that compiles Sagarithm Kit's canonical engineering specifications into native target agent configurations, runs compliance audits, and enforces the Zero-Assumed-Success verification gate.

---

## Installation & Execution

The CLI runs natively on Node.js (v22+) without required build compilation:

```bash
# Direct execution via bin launcher:
node cli/bin/sagarithm.mjs <command> [options]

# Or run tests:
npm --prefix cli test
```

---

## Core Commands

### 1. `sagarithm init`
Initializes a repository for Sagarithm Kit governance:
- Detects existing agent configurations in the workspace (Cursor, Claude Code, Copilot, etc.).
- Generates `sagarithm.config.json` with target platform settings, risk thresholds, and active domains.

```bash
sagarithm init [--force]
```

### 2. `sagarithm sync`
The multi-agent compiler:
- Ingests canonical layers (`constitution/`, `skills/`, `policies/`, `workflows/`).
- Translates canonical artifacts through the target platform adapter templates.
- Non-destructively emits or updates target files (`.cursorrules`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.windsurfrules`, `.agents/rules/`, etc.) using safe demarcations (`<!-- SAGARITHM:START -->` ... `<!-- SAGARITHM:END -->`).

```bash
# Sync all configured targets:
sagarithm sync

# Sync a specific target:
sagarithm sync --target cursor
```

### 3. `sagarithm doctor`
Diagnoses workspace health against Sagarithm policies:
- Verifies `.gitignore` excludes secrets, credentials, and local agent caches (`.env`, `.gemini/`).
- Detects unauthorized structural sprawl folders (e.g. `utils/`, `helpers/`).
- Asserts package lockfile presence and target configuration validity.

```bash
sagarithm doctor
```

### 4. `sagarithm audit`
Pre-commit / CI policy auditor:
- Scans `git diff` for hardcoded secrets, API tokens, and private keys.
- Detects unparameterized SQL concatenation.
- Asserts compliance with [`policy.security-boundary`](../policies/security-boundary-policy.md) and [`policy.change-scope`](../policies/change-scope-policy.md).

```bash
sagarithm audit
```

### 5. `sagarithm verify`
The Zero-Assumed-Success gate:
- Executes configured test runners, linters, and typecheckers.
- Confirms actual exit code 0 and verifies terminal output.

```bash
sagarithm verify
```
