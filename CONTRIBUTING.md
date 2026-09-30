# Contributing to Sagarithm Kit

Thank you for your interest in contributing to Sagarithm Kit! As a cross-agent framework for AI coding agents, we hold all contributions to disciplined software engineering standards.

---

## 1. Core Principles

Before proposing or implementing changes, review our foundational tenets:

1. **Understand Before Modifying**: Inspect existing architecture in [ARCHITECTURE.md](ARCHITECTURE.md) and [constitution/](constitution/README.md).
2. **Inspect Before Creating**: Avoid creating redundant files, directories, or parallel abstractions (`policy.file-creation`, `policy.directory-creation`).
3. **Agent-Agnostic Canonical Layer**: Canonical skills, policies, and workflows must never contain agent-specific syntax or proprietary assumptions.
4. **Zero Assumed Success**: All pull requests require empirical verification evidence (test runner logs, passing exit codes).

---

## 2. Local Development Setup

### Prerequisites
- **Node.js**: v22.0.0 or higher (supports native TypeScript stripping)
- **Git**: v2.30 or higher

### Quickstart
```bash
# Clone the repository
git clone https://github.com/sagarithm/sagarithm-kit.git
cd sagarithm-kit

# Run test suite
npm test

# Run policy and security audit
npm run lint

# Run full multi-vector verification gate
npm run verify
```

---

## 3. Contribution Workflows

### Authoring a Canonical Skill
1. Create a directory in `skills/<domain>/<skill-name>/`.
2. Provide `SKILL.md` with valid YAML frontmatter matching [specification/SPECIFICATION.md](specification/SPECIFICATION.md).
3. Include:
   - `references/`: Production patterns, anti-patterns, and architectural tradeoffs.
   - `examples/`: Fully functional, concrete reference implementations.
   - `checklists/`: Actionable verification criteria.
4. Add the skill entry to [skills/README.md](skills/README.md) and [registry/index.json](registry/index.json).
5. Compile and verify adapters:
   ```bash
   node --experimental-strip-types ./cli/src/index.ts sync
   node --experimental-strip-types ./cli/src/index.ts verify --strict
   ```

### Authoring a Policy
1. Propose policies under `policies/<policy-name>-policy.md`.
2. Define:
   - Specific triggering events.
   - Enforcement severity (`error`, `warn`, `advisory`).
   - Actionable remediation steps.
3. Update [policies/README.md](policies/README.md).

---

## 4. Pull Request Standards

Every PR submitted to `sagarithm-kit` must satisfy our verification gate:

- **Conventional Commits**: Format commit messages according to Conventional Commits:
  - `feat(scope): ...` for new capabilities or skills.
  - `fix(scope): ...` for bug fixes.
  - `docs(scope): ...` for documentation updates.
  - `test(scope): ...` for test suite additions.
- **Verification Evidence**: The PR description must include the terminal output of `npm test` and `npm run verify`.
- **Zero Secrets**: Scanned via `sagarithm audit --deep` before submission.
- **Code of Conduct**: All participants must abide by our [Code of Conduct](CODE_OF_CONDUCT.md).
