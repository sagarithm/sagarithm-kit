# Checklist: Architecture Review

Before finalizing any new module, boundary change, or structural refactoring, verify each item:

- [ ] **Single Responsibility**: Does the module/class have one distinct, cohesive reason to change?
- [ ] **Public API Boundary**: Are internal helper functions and implementation classes kept private or package-scoped?
- [ ] **Dependency Inversion**: Does business logic rely on abstractions/interfaces rather than concrete vendor clients or database drivers?
- [ ] **Acyclic Dependencies**: Are imports between modules strictly unidirectional (no circular dependencies)?
- [ ] **Data Encapsulation**: Are domain entities protected from direct external mutation through clear methods/constructors?
- [ ] **Absence of God Objects**: Has the design avoided bloated `Manager`, `Helper`, or `Common` classes that accumulate disparate responsibilities?
- [ ] **ADR Recorded**: Has an Architectural Decision Record been created for any significant structural or technological decision?
