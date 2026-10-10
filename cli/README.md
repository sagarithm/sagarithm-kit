# Sagarithm Kit CLI

> **Command-Line Interface, Compiler, and Verification Engine for Sagarithm Kit**

The `@sagarithm/cli` tool is the operational engine that compiles Sagarithm Kit's canonical engineering specifications into native target agent configurations, runs compliance audits, executes Model Context Protocol (MCP) tooling, and enforces the Zero-Assumed-Success verification gate.

---

## Installation & Execution

Run directly via `npx` (recommended):

```bash
# Direct execution without global installation:
npx sagarithm-kit <command> [options]

# Or install globally:
npm install -g sagarithm-kit
sagarithm --help
```

---

## Complete Command Reference (v1.1.1)

### 1. `sagarithm init`
Initializes a repository for Sagarithm Kit governance:
- Detects existing agent configurations in the workspace (Cursor, Claude Code, Copilot, Antigravity, etc.).
- Generates `sagarithm.config.json` with target platform settings, risk thresholds, and active domains.
- With `--starter`, creates turnkey `.agents/` configuration with all 10 canonical skills compiled and ready before any prompt.

```bash
# Standard interactive initialization:
sagarithm init [--force]

# Turnkey starter setup (all skills pre-installed before promoting):
sagarithm init --starter
```

---

### 2. `sagarithm mcp`
Launches the native **Model Context Protocol (MCP)** server over standard input/output (stdio JSON-RPC 2.0):
- Exposes 6 architectural tools directly to MCP-enabled clients (Claude Desktop, Cursor, Antigravity, Windsurf):
  - `sagarithm_verify`: Run multi-vector verification gates
  - `sagarithm_scan_secrets`: Scan code for Shannon entropy leaks ($H \ge 4.5$)
  - `sagarithm_query_graph`: Inspect AST symbols, coupling, and blast-radius
  - `sagarithm_validate_idea`: Stress-test ideas before writing code
  - `sagarithm_health`: Return composite codebase health index
  - `sagarithm_get_skill`: Retrieve canonical skill instructions and anti-rationalization tables
- Generates MCP configuration snippets via `--config <target>`.

```bash
# Run stdio MCP server:
sagarithm mcp

# Print ready-to-use configuration for Claude Desktop:
sagarithm mcp --config claude

# Print ready-to-use configuration for Cursor / Antigravity:
sagarithm mcp --config cursor
```

---

### 3. `sagarithm validate`
Truth-driven idea validation and architectural stress-testing:
- Evaluates proposed software concepts against operational bottlenecks, non-goals, and boundary invariants.
- Strict anti-compliance: forbids AI from blindly agreeing with underspecified requests.

```bash
# Validate an idea before writing code:
sagarithm validate "Multi-tenant real-time collaborative code editor with decentralized CRDT sync"
```

---

### 4. `sagarithm health`
Computes the **Sagarithm Composite Codebase Health Index** (100-point scale):
- Structural Hygiene (25 pts): Zero anti-pattern utility folders.
- Modularity & Coupling (25 pts): Martin Instability ($I \le 0.6$).
- Dead Code & Orphan Ratio (20 pts): Unreferenced exported abstractions.
- Secret & Entropy Defense (20 pts): Zero high-entropy leaks ($H \ge 4.5$).
- Automated Test Density (10 pts): Automated test presence.

```bash
# Compute comprehensive health index:
sagarithm health
```

---

### 5. `sagarithm preset`
Manages curated engineering discipline profiles:

```bash
# List all available presets:
sagarithm preset list

# Inspect preset configuration:
sagarithm preset show fullstack-web

# Apply preset to workspace:
sagarithm preset apply fullstack-web
```

---

### 6. `sagarithm sync`
The multi-agent compiler:
- Translates canonical artifacts through target platform adapter templates.
- Non-destructively emits or updates target files (`.cursorrules`, `CLAUDE.md`, `.github/copilot-instructions.md`, `AGENTS.md`, `GEMINI.md`, `.windsurfrules`, `.agents/rules/`) using safe demarcations (`<!-- SAGARITHM:START -->` ... `<!-- SAGARITHM:END -->`).

```bash
# Sync all configured targets:
sagarithm sync

# Sync a specific target platform:
sagarithm sync --target cursor
```

---

### 7. `sagarithm context`
Parses project AST and computes topological coupling metrics:

```bash
# Inspect afferent coupling, efferent coupling, and instability:
sagarithm context stats

# Search for existing abstractions across the codebase:
sagarithm context find <symbol>

# Calculate blast radius of modifying a specific file:
sagarithm context blast-radius <file>

# Detect unreferenced exported functions and interfaces:
sagarithm context orphans
```

---

### 8. `sagarithm audit`
Pre-commit / CI policy auditor:
- Scans files or active git diff for Shannon entropy token leaks ($H \ge 4.5$).
- Detects anti-pattern directory creation and unparameterized SQL concatenation.
- Asserts compliance with security boundary and change scope policies.

```bash
# Audit active git diff:
sagarithm audit

# Deep full-repository audit:
sagarithm audit --deep

# Enforce strict zero-tolerance mode:
sagarithm audit --strict
```

---

### 9. `sagarithm verify`
The **Zero-Assumed-Success (ZAS)** empirical verification gate:
- Executes 5 verification vectors: Static, Security, Architecture, Behavioral, and Documentation.
- Enforces real terminal test execution with 0 failures before marking tasks complete.
- Emits machine-readable `.sagarithm/audit-report.json`.

```bash
# Run multi-vector verification gate:
sagarithm verify

# Strict mode for CI/CD:
sagarithm verify --strict --json
```

---

### 10. `sagarithm doctor`
Diagnoses workspace health against Sagarithm policies:
- Verifies `.gitignore` excludes secrets, credentials, and agent caches (`.env`, `.gemini/`).
- Detects unauthorized structural sprawl folders (`utils/`, `helpers/`).
- Asserts package lockfile presence and target configuration validity.

```bash
sagarithm doctor
```

---

### 11. `sagarithm registry`
Decentralized ecosystem distribution:

```bash
# Search registry packages:
sagarithm registry search <query>

# Pack artifact with SHA-256 integrity digest:
sagarithm registry pack <path>
```
