# Reference: Architectural Fitness Functions

## 1. What is an Architectural Fitness Function?

An **Architectural Fitness Function** is an automated test, static analysis rule, or linter check that executes as part of the continuous integration (CI) pipeline to programmatically verify that an architecture does not regress over time.

Instead of relying solely on manual architectural code reviews, fitness functions enforce structural rules deterministically.

---

## 2. Types of Architectural Invariants

### 1. Layer Dependency Isolation
- **Rule**: `domain` must never import `infrastructure` or `presentation`.
- **Enforcement**: Using tools like `dependency-cruiser` (JavaScript/TypeScript), `ArchUnit` (Java/Kotlin), `pytest-archon` (Python), or `cargo-deny` (Rust).

```javascript
// Example: .dependency-cruiser.js rule
module.exports = {
  forbidden: [
    {
      name: 'domain-cannot-import-infrastructure',
      comment: 'Core domain must not depend on database or network infrastructure',
      severity: 'error',
      from: { path: '^src/domain' },
      to: { path: '^src/infrastructure' }
    },
    {
      name: 'no-circular-dependencies',
      severity: 'error',
      from: { path: '^src' },
      to: { circular: true }
    }
  ]
};
```

### 2. Module Boundary Encapsulation
- **Rule**: Outside modules must only import from a module's public entrypoint (`index.ts` / `mod.rs` / `__init__.py`).
- **Enforcement**: Ban deep imports into internal directories (e.g. `src/modules/billing/internal/payment-math.ts`).

### 3. Package Size & Cycle Limits
- Automatically fail pull requests that introduce new cycles or exceed cognitive complexity thresholds in critical business domains.
