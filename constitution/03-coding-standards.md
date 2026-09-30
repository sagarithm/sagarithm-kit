# Article 3: Coding Standards

This article defines the foundational coding standards that all agents and developers must enforce across all languages and frameworks.

---

## 1. Readability & Expressiveness
- **Self-Documenting Code**: Code must be written so that its intent is obvious without requiring verbose inline commentary.
- **Why over What**: Comments should explain *why* an unusual pattern, algorithm, or workaround is necessary, rather than paraphrasing *what* the syntax obviously does.
- **Consistency**: Adhere to the existing formatting, naming conventions, and idioms of the host repository.

---

## 2. Type Safety & Explicit Contracts
- **Strict Typing**: Use strict typing where supported (e.g. TypeScript, Go, Rust, Java, Python type annotations).
- **Prohibition of `any`**: Do not resort to `any`, untyped objects, or wildcards to silence compiler errors. Define explicit interfaces, types, or generics.
- **Exhaustive Handling**: Ensure union types and enums are exhaustively checked in pattern matching or switch statements.

---

## 3. Resilient Error Handling
- **Never Swallow Errors**: Empty `catch` blocks or suppressing errors (`catch (e) {}`, `except: pass`) without logging or recovery is strictly forbidden.
- **Explicit Error Types**: Create domain-specific error classes/types with actionable context (e.g. `UserNotFoundError`, `InvalidTokenError`).
- **Fail Fast & Explicitly**: Validate preconditions and throw early at system boundaries rather than allowing invalid state to propagate deeply.
- **Safe Resource Cleanup**: Always guarantee resource cleanup (file handles, database connections, locks) using `try...finally`, `using`, or context managers.

---

## 4. Function & Scope Discipline
- **Cognitive Complexity**: Keep functions small, focused, and cohesive. Avoid deeply nested conditionals (prefer early returns / guard clauses).
- **Side Effect Containment**: Favor pure functions and immutable data structures where practical. Isolate stateful mutations and I/O operations cleanly.
- **Meaningful Naming**:
  - Variables and constants must describe their content and unit (e.g., `timeoutMilliseconds` instead of `t`).
  - Functions must start with an active verb describing their action (e.g., `calculateMonthlyTax` instead of `taxCalc`).
  - Booleans must read like assertions (e.g., `isAuthenticated`, `hasPendingOrders`).
