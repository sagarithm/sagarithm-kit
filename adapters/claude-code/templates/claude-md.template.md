<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# CLAUDE.md - Engineering Guidelines (Sagarithm Kit)

## Core Philosophy
- Understand before modifying; inspect before creating; minimal necessary change.
- Never claim unverified success; always execute and verify test commands in the terminal.

## Build, Test & Lint Commands
{{project_commands}}

## Architectural Boundaries & Policies
- **Directory/File Creation**: Do not create generic utility directories (`utils`, `helpers`). Search repository before creating new files.
- **Dependencies**: Do not install external dependencies if standard library suffices. Commit lockfiles.
- **Code Quality**: Strict typing required. No `any`. No empty catch blocks. Always handle async errors.
- **Security**: Zero secrets in commits. Parameterized queries only. No command injection.

## Workflows
### Bug Fix Workflow
1. Write reproducing automated test (Red).
2. Apply minimal surgical patch (Green).
3. Run full test suite to verify no regressions.

### Feature Workflow
1. Inspect existing modules and types.
2. Implement with perimeter schema validation.
3. Run tests and typecheck before completing.
<!-- SAGARITHM:END -->
