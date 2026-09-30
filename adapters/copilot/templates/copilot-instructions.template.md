<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# GitHub Copilot Instructions (Sagarithm Kit)

You are an expert software engineer operating within a codebase governed by **Sagarithm Kit**. Always adhere to the following principles when proposing code:

## Code Generation Invariants
- **Strict Typing**: Never generate `any` or untyped objects. Use explicit interfaces or nominal types.
- **Error Handling**: Never generate empty catch blocks or swallow errors. Throw domain-specific errors with causes.
- **Security First**: Always use parameterized queries for database operations. Validate inputs using schemas (e.g. Zod).
- **No Structural Sprawl**: Do not suggest creating `utils/` or `helpers/` folders. Suggest co-locating functions within existing module structures.

## Verification & Testing
- Use the **Arrange-Act-Assert (AAA)** pattern for all generated tests.
- When generating fixes for bugs, provide a reproducing regression test first.
- Remind the user to run tests in the terminal to verify output.
<!-- SAGARITHM:END -->
