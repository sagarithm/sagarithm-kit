# Sagarithm Kit — Validation & Audit Engine Specification (v1.0.0)

## 1. Overview & Core Philosophy

The Sagarithm Kit **Validation & Audit Engine** enforces empirical verification across all AI coding agent operations. Operating under the fundamental constitutional principle of **Zero Assumed Success** (Constitution Article 5, Policy 5), the engine rejects claims of completion unless verified by real execution evidence.

AI agents routinely hallucinate successful compilation, passing tests, or clean security states when they have only written code without executing verification tooling. The Sagarithm Validation Engine bridges this gap by providing automated, multi-dimensional verification vectors and deterministic audit capabilities.

---

## 2. Verification States

Every code change evaluated by Sagarithm Kit transitions through an empirical state machine:

| Verification State | Description | Promotion Criteria |
| :--- | :--- | :--- |
| `ASSUMED` | Code has been generated or modified in the workspace, but no automated checks have executed. | **Default initial state** upon file modification. Never eligible for release or completion. |
| `IMPLEMENTED` | Code syntactically compiles and passes static analysis / type checking, but behavioral tests have not run. | Static analyzer, linter, and type checker exit with code `0`. |
| `TESTED` | Automated unit/integration test suites have executed against the modified codebase. | Test runner executes and returns exit code `0` with at least 1 verified assertion. |
| `VERIFIED` | Full multi-dimensional verification has executed: static types, security scans, architectural fitness, tests, and documentation sync. | **All verification vectors pass** cleanly within configured risk tolerances. |
| `FAILED` | Any verification vector reports a blocking error or exit code $\neq 0$. | Immediate halt. Requires remediation and regression reproduction. |

```
           [ Code Written ]
                  │
                  ▼
              ASSUMED  (Unverified draft)
                  │
          Static Checks Pass
                  │
                  ▼
             IMPLEMENTED (Type-safe & lint-clean)
                  │
          Test Suites Pass
                  │
                  ▼
               TESTED (Behavioral proof)
                  │
     Security + Architecture + Docs Pass
                  │
                  ▼
              VERIFIED 🏆 (Production-ready)
```

---

## 3. Multi-Dimensional Verification Vectors

The Validation Engine evaluates changes across five mandatory orthogonal vectors:

### Vector 1: Static Safety & Typing
- **Type Exhaustiveness**: No unhandled variants in discriminated unions; strict null checks enabled.
- **Compiler Cleanliness**: Zero TypeScript/language compiler errors or uncaught warnings under strict mode.
- **Linter Compliance**: Zero lint violations against canonical engineering standards.

### Vector 2: Security & Secret Hygiene
- **High-Entropy Token Detection**: Algorithmic Shannon entropy scanning ($H \ge 4.5$) on strings exceeding 20 characters to catch unstructured keys.
- **Known Token Patterns**: Deterministic regular expression matching for AWS, GitHub, Stripe, OpenAI, Google, Slack, and private PEM keys.
- **Injection Flaw Patterns**: Detection of unparameterized SQL concatenation, shell interpolation, and unsanitized path joining.

### Vector 3: Architectural Fitness Functions
- **Prohibited Directory Anti-Patterns**: Blocks creation of ambiguous junk directories (`utils/`, `helpers/`, `misc/`, `common/`).
- **Layer Boundary Enforcement**: Ensures unidirectional dependency flow (e.g., Domain must not import Infrastructure; UI components must not import raw database drivers).
- **Acyclic Dependency Graph**: Validates that no circular import cycles exist within the workspace topology graph.

### Vector 4: Behavioral & Test Execution
- **Empirical Execution**: Test runner must be invoked as a real subprocess; mock or assumed test runs are rejected.
- **Assertion Count Verification**: Test output must verify that tests actually executed assertions rather than exiting early.
- **Zero Exit Code**: Exit code must strictly equal `0`.

### Vector 5: Living Documentation Synchronization
- **ADR Freshness**: If changes modify architectural patterns or introduce core dependencies, an Architectural Decision Record in `docs/adr/` is mandated.
- **Specification Parity**: Canonical specifications must match target adapter outputs without un-demarcated manual divergence.

---

## 4. Audit Engine Capabilities

The CLI provides two primary verification entrypoints:

1. **`sagarithm audit`**:
   - Fast inspection of working tree changes (`git diff`) or full workspace (`--deep`).
   - Identifies security risks, secret leaks, and architectural policy violations.
   - Emits machine-readable JSON reports for CI/CD pipelines (`--json`).

2. **`sagarithm verify`**:
   - Multi-vector execution harness.
   - Invokes configured verification scripts (build, test, lint, typecheck).
   - Generates empirical verification reports saved to `.sagarithm/audit-report.json`.
   - Enforces strict zero-tolerance failure modes (`--strict`).

---

## 5. Report Schema Standard

All audits and verification executions produce compliant JSON artifacts matching `validation/schema/validation-report.schema.json`.

```json
{
  "version": "1.0.0",
  "timestamp": "2026-09-30T16:25:00.000Z",
  "state": "VERIFIED",
  "summary": {
    "totalChecks": 5,
    "passed": 5,
    "warnings": 0,
    "errors": 0
  },
  "vectors": {
    "static": { "status": "passed", "durationMs": 140 },
    "security": { "status": "passed", "durationMs": 45 },
    "architecture": { "status": "passed", "durationMs": 60 },
    "behavioral": { "status": "passed", "durationMs": 310 },
    "documentation": { "status": "passed", "durationMs": 20 }
  },
  "issues": []
}
```
