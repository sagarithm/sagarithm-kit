<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# Rule: File Creation & Abstraction Deduplication [ERROR]

# Policy: File Creation & Abstraction Deduplication

## 1. The Invariant
**Before creating a file, verify that an existing file or abstraction cannot be extended, parameterized, or reused.**

## 2. Mandatory Pre-Creation Search
Before issuing a file creation command, the agent must:
1. Search for existing symbols, interfaces, and function names handling similar responsibilities (`grep_search` / `find`).
2. Verify existing test files and public exports.
3. If similar logic exists, add to or refactor the existing file rather than introducing a parallel file.

## 3. Co-location Rules
- **Tests**: Test files must be co-located with the source code under test (`<name>.test.ts` or `<name>.spec.ts` adjacent to `<name>.ts`) or reside in the dedicated test mirror directory matching project convention.
- **Types**: Internal types must be co-located within the module file; shared boundary types belong in `<module>.types.ts`.
- **Styles**: Component styling must be co-located directly with the component file.

## 4. Single-Export File Discipline
- Avoid files that export dozens of unrelated functions.
- Avoid micro-files with 2 lines of trivial syntax that could be inline.
<!-- SAGARITHM:END -->
