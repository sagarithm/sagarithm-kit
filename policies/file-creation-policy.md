---
id: "policy.file-creation"
name: "File Creation & Abstraction Deduplication"
version: "1.0.0"
severity: "error"
scope: "file-creation"
description: "Prevents creation of redundant files, duplicate helper abstractions, and mislocated source files."
rationale: "Agents frequently create parallel implementations of existing functions (e.g. creating string-helpers.ts when string utilities already exist in formatters.ts)."
enforcement: "automated"
remediation: "Search the codebase using ripgrep or AST index. Extend existing modules or classes instead of creating new files."
---

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
