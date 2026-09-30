# Cursor Adapter

> **Compilation Engine for Cursor AI Environments**

This adapter compiles canonical Sagarithm Kit specifications into Cursor's native formats: `.cursorrules` and modern `.cursor/rules/*.mdc` rule definitions.

---

## Target Artifacts

1. **Global Cursor Rules**: Emitted to `.cursorrules` at repository root for baseline instructions.
2. **Modular Cursor Rules**: Emitted to `.cursor/rules/*.mdc` with glob filters matching specific file scopes.

---

## Compilation Mapping

See [mapping.md](mapping.md) for glob associations, metadata fields, and template structures.
