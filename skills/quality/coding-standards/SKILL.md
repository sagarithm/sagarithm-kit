---
id: "quality.coding-standards"
name: "Clean Code & Quality Standards"
version: "1.0.0"
domain: "quality"
description: "Author expressive, type-safe, maintainable code with strict error handling and minimal cognitive complexity."
triggers:
  - "Writing or refactoring functions, classes, or modules"
  - "Handling asynchronous control flow or error boundaries"
  - "Reviewing code quality or addressing static analysis feedback"
prerequisites: []
risk_profile: "medium"
---

# Clean Code & Quality Standards

## Overview
This skill guides AI agents and engineers in authoring code that is immediately readable, strictly typed, resilient to runtime failure, and simple to maintain.

## Core Directives
1. **Strict Type Safety**: Never use `any`, untyped collections, or disable linter rules without justification. Model explicit data shapes.
2. **Never Swallow Errors**: Handle errors at the appropriate layer; never leave empty catch blocks or discard stack traces.
3. **Cognitive Simplicity**: Limit cyclomatic and cognitive complexity. Use guard clauses, early returns, and small, pure functions.
4. **Descriptive Intent**: Name functions and variables precisely according to their role and units (e.g. `timeoutMilliseconds`, `isUserEligible`).

## Detailed Guidance
- Read [Clean Code & Typing Principles](references/clean-code-and-typing.md).
- Examine [Robust Error Handling Patterns](examples/robust-error-handling-patterns.md).
- Execute the [Code Quality Checklist](checklists/code-quality-checklist.md).
