# Contributing to Sagarithm Kit

Thank you for contributing to Sagarithm Kit. This project is built as foundational infrastructure for professional software engineering with AI coding agents. We hold all contributions to the highest engineering standards.

---

## 1. Core Principles

Before proposing or implementing any changes, familiarize yourself with our core tenets:

1. **Understand Before Modifying**: Inspect existing architecture, specifications, and conventions before proposing changes.
2. **Inspect Before Creating**: Avoid creating redundant files, directories, or parallel abstractions.
3. **Canonical Agent-Agnosticism**: Never introduce agent-specific syntax or proprietary assumptions into the `specification/` or canonical layers.
4. **Specification First, Tooling Second**: We do not implement speculative tooling or CLIs until the underlying specifications and schemas are validated.
5. **No Assumed Success**: All pull requests must include concrete evidence of verification (passing tests, validation against schemas).

---

## 2. Development Workflow

1. **Identify the Layer**: Determine whether your contribution belongs in:
   - `specification/`: Meta-schemas, glossary, contracts.
   - `canonical/`: Engineering principles, skills, policies, workflows.
   - `adapters/`: Agent-specific compilation engines (Phase 5+).
2. **Adhere to Phase Boundaries**: We develop strictly in phased milestones. Contributions advancing future phases prematurely (e.g. implementing CLI code during Phase 0–5) will not be accepted.
3. **Document Decisions**: Significant architectural or schema updates require an Architectural Decision Record (ADR).

---

## 3. Style & Conventions

- Use standard Markdown with valid YAML frontmatter where applicable.
- Markdown links must follow standard GitHub syntax.
- Schemas must adhere to JSON Schema draft-07 or higher.
- Keep commits atomic, informative, and adhering to Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`).
