# Checklist: Code Quality Review

Prior to marking implementation complete, verify each code quality item:

- [ ] **No `any` or Untyped Constructs**: Are all function signatures, parameters, and return types explicitly declared?
- [ ] **No Unhandled Promises / Silent Catches**: Are all asynchronous calls awaited or caught, with zero empty `catch` blocks?
- [ ] **Guard Clauses**: Are preconditions validated at function entry, avoiding deep conditional nesting (> 3 levels)?
- [ ] **Descriptive Naming**: Do variable and function names communicate intent and units without ambiguity?
- [ ] **Immutability Preserved**: Are inputs treated as immutable without unexpected mutation of argument references?
- [ ] **Resource Cleanup**: Are file handles, streams, database connections, and subscriptions reliably closed/unsubscribed?
- [ ] **Linter & Typecheck Clean**: Do all files pass project linting and typecheck commands without manual `@ts-ignore` or linter-disable comments?
