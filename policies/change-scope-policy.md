---
id: "policy.change-scope"
name: "Change Scope & Blast Radius Containment"
version: "1.0.0"
severity: "error"
scope: "global"
description: "Confines code modifications strictly to the files and functions directly required to fulfill the user request."
rationale: "Uncontrolled refactoring, broad formatting rewrites, and opportunistic edits cause unexpected regressions and noisy merge conflicts."
enforcement: "automated"
remediation: "Revert unrelated modifications and limit git diff to the minimal necessary changes."
---

# Policy: Change Scope & Blast Radius Containment

## 1. The Invariant
**Modify only what is strictly necessary to solve the assigned task. Never perform opportunistic refactoring or reformat untouched files.**

## 2. Forbidden Actions
- **Formatting Cascades**: Do not run global auto-formatters on files outside the task scope, which produces multi-thousand line diffs.
- **Speculative Refactors**: Do not rewrite working legacy components or change function signatures unless explicitly requested or required by the bug fix.
- **Comment/Docstring Stripping**: Preserve existing comments, licenses, and docstrings in untouched portions of modified files.

## 3. Diff Inspection Requirement
Before committing or marking a task done:
1. Run `git diff` and inspect every line changed.
2. Confirm that every modification directly supports the stated user requirement or verification test.
3. If an unrelated file was touched, revert it via `git checkout -- <file>`.
