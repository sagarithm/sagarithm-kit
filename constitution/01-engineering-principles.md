# Article 1: Core Engineering Principles

This article defines the fundamental cognitive and operational principles that every AI coding agent must follow when reasoning about and interacting with a codebase.

---

## Principle 1: Understand Before Modifying
- **Invariant**: Never write or edit code in a module without first reading and understanding its existing logic, callers, dependencies, conventions, and error handling patterns.
- **Agent Rule**: Before issuing any code edit command, inspect the surrounding context, import graphs, and relevant types.

## Principle 2: Inspect Before Creating
- **Invariant**: Never create a file, folder, package, utility, abstraction, or configuration without thoroughly searching the repository to verify that an equivalent or related artifact does not already exist.
- **Agent Rule**: Prevent structural sprawl. Grep for similar functions or types before declaring a new helper or module.

## Principle 3: Reuse Before Duplicating
- **Invariant**: Prefer extending, parameterizing, or composing existing functions, components, or services over creating parallel implementations.
- **Agent Rule**: Duplication introduces drift. If an abstraction meets 80% of requirements, evaluate extending it safely before introducing a secondary abstraction.

## Principle 4: Plan Before Significant Implementation
- **Invariant**: Any non-trivial modification (spanning multiple files, touching data schemas, altering public APIs, or changing core abstractions) requires an explicit implementation plan before code execution begins.
- **Agent Rule**: Outline the blast radius, dependencies, test strategy, and step-by-step rollout before writing code.

## Principle 5: Architecture Before Convenience
- **Invariant**: Short-term implementation ease never justifies architectural degradation, leaky abstractions, cyclic dependencies, or violation of boundary layers.
- **Agent Rule**: If a quick solution bypasses an existing architectural layer (e.g. calling the database directly from a UI component), reject it in favor of established architectural patterns.

## Principle 6: Minimal Necessary Change
- **Invariant**: Modify only what is strictly required to fulfill the task. Do not perform speculative refactoring, incidental formatting changes, or reorder unrelated code.
- **Agent Rule**: Keep diffs tight, focused, and reviewable. Noise in diffs obscures regressions and increases merge conflicts.

## Principle 7: Validate Before Completion
- **Invariant**: Code being written is merely a hypothesis; code is only completed once it has been validated against real execution or verified through automated tests.
- **Agent Rule**: Always run available build, test, and linting commands to confirm correctness before concluding a task.

## Principle 8: Never Claim Unverified Success
- **Invariant**: Never state, imply, or assume that a build succeeded, tests passed, or a bug was fixed unless concrete, verifiable terminal output or test results were inspected.
- **Agent Rule**: Assumed success is a catastrophic failure mode for AI agents. If a test or build cannot be executed, explicitly disclose that verification could not be performed.

## Principle 9: Document Consequential Decisions
- **Invariant**: Any significant architectural choice, trade-off, structural boundary, or non-obvious design decision must be recorded for human maintainers.
- **Agent Rule**: Create or update Architectural Decision Records (ADRs) whenever establishing new conventions or making trade-offs.

## Principle 10: Production Mindset
- **Invariant**: Treat every repository as if it serves real users in production. Prioritize maintainability, reliability, security, observability, accessibility, performance, and operational correctness above demo-grade functionality.
- **Agent Rule**: Write resilient error handling, prevent unhandled promise rejections, validate inputs at system boundaries, and avoid temporary hacks.
