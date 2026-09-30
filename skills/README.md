# Canonical Skills

> **Modular, Composable Engineering Disciplines for AI Coding Agents**

Skills encode specialized procedural engineering knowledge answering:
> *"How should an AI coding agent perform this specific engineering discipline correctly?"*

---

## Skill Architecture

Every canonical skill adheres to the Sagarithm Kit meta-specification:
```text
skills/<domain>/<skill-name>/
├── SKILL.md              # Declarative capability specification & frontmatter
├── references/           # In-depth architectural/engineering references
├── examples/             # Concrete canonical code patterns (good vs. bad)
└── checklists/           # Step-by-step verification checklists
```

---

## Phase 2 Core Skills Catalog

| Domain | Skill | Identifier | Risk Profile | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Architecture** | [System Design & Modularity](architecture/system-design/SKILL.md) | `architecture.system-design` | `high` | Decomposes systems into cohesive, loosely coupled modules with explicit public boundaries. |
| **Quality** | [Clean Code & Quality Standards](quality/coding-standards/SKILL.md) | `quality.coding-standards` | `medium` | Enforces expressiveness, strict typing, error handling, and low cognitive complexity. |
| **Testing** | [Test-Driven Verification](testing/test-driven-verification/SKILL.md) | `testing.test-driven-verification` | `high` | Deterministic unit/integration testing, hermetic isolation, and zero assumed success. |
| **Security** | [Secure Development](security/secure-development/SKILL.md) | `security.secure-development` | `critical` | Defense-in-depth, perimeter validation, secret isolation, and OWASP Top 10 mitigation. |
| **Documentation** | [Architectural Decision Records](documentation/architectural-decision-records/SKILL.md) | `documentation.architectural-decision-records` | `medium` | Capturing consequential engineering decisions, context, alternatives, and trade-offs. |
