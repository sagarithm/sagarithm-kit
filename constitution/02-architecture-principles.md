# Article 2: Architecture Principles

This article defines the architectural rules governing system structure, modularity, boundary isolation, and long-term maintainability.

---

## 1. Modularity & High Cohesion
- **High Cohesion**: Elements that change together must live together within the same domain or module.
- **Loose Coupling**: Modules must interact through well-defined, explicit public interfaces (APIs, contracts, ports) rather than reaching into internal implementation details.
- **Single Responsibility Principle (SRP)**: Each module, service, class, or component must have one well-defined reason to change.

---

## 2. Layering & Separation of Concerns
Systems must respect strict directional dependencies across standard architectural layers:
1. **Presentation / Interface Layer**: Handles user interaction, HTTP endpoints, or CLI commands. Never accesses databases directly.
2. **Application / Orchestration Layer**: Coordinates business workflows, transactions, and domain use cases.
3. **Domain / Business Logic Layer**: Pure business models, domain invariants, and rules. Free of framework, UI, or database dependencies.
4. **Infrastructure / Persistence Layer**: Database drivers, external network clients, filesystem access, message brokers.

**Direction of Dependency**: Outer layers depend on inner layers; inner domain logic never depends on concrete infrastructure implementations (Dependency Inversion).

---

## 3. Dependency Management & Acyclic Graphs
- **No Circular Dependencies**: Circular imports or dependencies between modules/packages are strictly prohibited.
- **Explicit Interfaces**: Cross-boundary communication must use explicit types and contracts rather than untyped maps, dictionary bags, or global singletons.
- **Minimal External Dependencies**: Every third-party dependency introduced incurs security, maintenance, and upgrade overhead. Evaluate native standard library capabilities before introducing external packages.

---

## 4. Preservation of Abstractions
- **No Leaky Abstractions**: Implementation details of a subsystem (e.g. database column names, raw SQL exceptions, proprietary protocol specifics) must never leak into consumers or UI layers.
- **Encapsulation**: Expose only what is strictly necessary through the module index/public API; keep internal helpers private or package-scoped.

---

## 5. Architectural Decision Records (ADRs)
- Whenever a significant architectural decision is made (e.g. state management paradigm, database technology, authentication protocol, major restructuring), document it in an ADR under `docs/adr/`.
- Every ADR must clearly capture:
  - **Context**: The problem being solved and constraints.
  - **Decision**: The selected architecture or approach.
  - **Consequences**: Both positive advantages and negative trade-offs/risks accepted.
