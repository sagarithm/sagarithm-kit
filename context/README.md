# Project Context & Intelligence

> **Layer 5: Topological Repository Graph and Context Engine for AI Coding Agents**

The **Project Context** layer provides AI coding agents with a structured, queryable model of the repository's topology before code modifications begin.

Instead of entering a repository with only a prompt, agents enter with a verified model of:
- Existing module boundaries and public exports.
- Inter-module dependency graphs.
- Associated automated test suites per module.
- Public API endpoints and controllers.
- Database schemas, entities, and migration paths.

---

## 1. The Core Problems It Solves

1. **Abstraction Blindness**: Agents creating a second `formatDate` or `jwtVerify` function because they failed to discover the existing one.
2. **Blast Radius Ignorance**: Modifying a utility file without knowing which 15 modules and test suites depend on it.
3. **Mislocated Code**: Dumping new files in arbitrary folders instead of co-locating them with existing domain modules.

---

## 2. Manifest Schema

Project topology is standardized in [`schema/project-manifest.schema.json`](schema/project-manifest.schema.json).

An example manifest is available in [`examples/sample-manifest.json`](examples/sample-manifest.json).

---

## 3. CLI Integration

The `@sagarithm/cli` operational tool provides commands to index and query this graph:
```bash
# Generate / refresh the project manifest
sagarithm context generate

# Find if an abstraction already exists
sagarithm context find AuthService

# Calculate the blast radius of a file modification
sagarithm context blast-radius src/modules/auth/auth.service.ts
```
