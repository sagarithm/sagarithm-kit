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

## Canonical Skills Catalog (v1.1.1)

Sagarithm Kit maintains **10 Canonical Engineering Skills** covering the complete software engineering lifecycle from ideation to production shipping:

| Domain | Skill | Identifier | Risk Profile | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Ideation** | [Idea Validation & Truth-Driven Engineering](ideation/idea-validation/SKILL.md) | `ideation.idea-validation` | `critical` | Critically evaluates and stress-tests software ideas before building. Forbids blind AI compliance; demands truth-telling on technical feasibility, operational bottlenecks, architectural boundaries, and non-goals. |
| **Architecture** | [Specification-Driven Architecture](architecture/spec-driven-development/SKILL.md) | `architecture.spec-driven-development` | `critical` | Transforms validated ideas into formal, testable architectural specifications. Defines bounded contexts, contract interfaces, state machines, and acceptance criteria before implementation. |
| **Architecture** | [System Design & Modularity](architecture/system-design/SKILL.md) | `architecture.system-design` | `high` | Decomposes complex systems into highly cohesive, loosely coupled modules with explicit public interfaces, bounded contexts, and acyclic dependencies. |
| **Lifecycle** | [Atomic Planning & Task Breakdown](lifecycle/planning-and-task-breakdown/SKILL.md) | `lifecycle.planning-and-task-breakdown` | `high` | Deconstructs complex specifications into hermetic, sequentially verifiable implementation slices. Enforces blast-radius containment and rollback checkpoints. |
| **Quality** | [Clean Code & Quality Standards](quality/coding-standards/SKILL.md) | `quality.coding-standards` | `medium` | Enforces expressiveness, type safety, strict error handling, nominal typing, discriminated unions, low cognitive complexity, and concurrency safety. |
| **Quality** | [Rigorous Code Review & Quality Defense](quality/code-review-and-quality/SKILL.md) | `quality.code-review-and-quality` | `high` | Applies senior-engineer scrutiny to all code modifications. Enforces architectural fitness, zero-leak secret defense, minimal blast radius, and anti-rationalization pushback. |
| **Security** | [Secure Development & Vulnerability Prevention](security/secure-development/SKILL.md) | `security.secure-development` | `critical` | Defense-in-depth controls, input validation at system boundaries, secret isolation, STRIDE threat mitigation, and SSRF/timing defenses. |
| **Testing** | [Test-Driven Verification](testing/test-driven-verification/SKILL.md) | `testing.test-driven-verification` | `high` | Designs and implements deterministic, hermetic automated test suites, property-based invariants, and mutation verification under Zero Assumed Success. |
| **Documentation** | [Architectural Decision Records](documentation/architectural-decision-records/SKILL.md) | `documentation.architectural-decision-records` | `medium` | Authors, updates, and manages ADRs using MADR 3.0 and quantitative decision matrices to record consequential decisions, alternatives, and trade-offs. |
| **Delivery** | [Production Shipping & Release Governance](delivery/shipping-and-launch/SKILL.md) | `delivery.shipping-and-launch` | `critical` | Governs production deployments, releases, and distribution. Enforces formal verification gates, SemVer versioning, changelog synchronization, and CI/CD attestation. |

---

## Anti-Rationalization Principle

Every skill contains explicit anti-rationalization guidelines. AI agents are prohibited from accepting shortcuts such as:
- *"I will add tests later in a follow-up commit."*
- *"This utility folder is only temporary."*
- *"The user didn't mention edge cases, so standard happy path is sufficient."*
- *"This dependency is safe because it is widely used."*

All canonical skills compile down to native instructions for Google Antigravity, Cursor, Claude Code, GitHub Copilot, Windsurf, and OpenAI Codex via `sagarithm sync`.
