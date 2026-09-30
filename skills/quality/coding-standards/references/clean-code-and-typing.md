# Reference: Clean Code & Typing Standards

## 1. Type Modeling Over Primitive Obsession
- **Avoid Primitive Obsession**: Instead of passing raw strings for identifiers (`userId: string`, `orderId: string`), prefer branded/nominal types or value objects (`UserId`, `OrderId`) to prevent accidental inversion.
- **Tagged Unions & Exhaustiveness**: Model distinct states with discriminated/tagged unions rather than combinations of nullable flags.

## 2. Guard Clauses & Early Returns
- Flatten nested `if-else` cascades using guard clauses:
  1. Validate preconditions at the top of the function.
  2. Return or throw immediately on invalid inputs.
  3. Keep the "happy path" un-indented and prominent.

## 3. Immutability
- Declare variables as constants (`const` in JS/TS, `val` in Kotlin, `let` without `mut` in Rust).
- Avoid mutating arrays or objects in-place when returning updated state. Prefer non-destructive transformations (`map`, `filter`, object spread).
