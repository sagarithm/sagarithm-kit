# Examples: Canonical ADR Sample

```markdown
# ADR-002: Adopt Schema-Based Boundary Validation with Zod

## Status
Accepted

## Date
2026-09-30

## Context
Our HTTP endpoints and asynchronous worker tasks accept external JSON payloads. Currently, request parameters are typed via TypeScript interfaces, but no runtime validation occurs. This has caused multiple production incidents due to unhandled undefined properties and incorrect numeric types leaking into database queries.

We considered three alternatives:
1. Manual `typeof` and regex checks in controllers (Too brittle, high boilerplate).
2. JSON Schema validator (ajv) (Fast, but poor TypeScript developer ergonomics and duplicate schema definitions).
3. Zod (Strong TypeScript inference, composable, rich error formatting).

## Decision
We adopt **Zod** as the mandatory boundary validation library across all HTTP handlers and message queue consumers. All incoming payloads must be parsed via a Zod schema before entering application services.

## Consequences

### Positive
- Strict runtime guarantees matching static TypeScript types.
- Centralized, readable schema definitions reusable across API documentation and client SDK generators.
- Uniform client-facing validation error messages.

### Negative
- Adds a runtime parsing overhead of approximately 0.5–2ms per request on large payloads.
- Introduces an external dependency (`zod`) that must be kept up to date.
```
