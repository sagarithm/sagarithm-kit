---
id: "testing.test-driven-verification"
name: "Test-Driven Verification"
version: "1.0.0"
domain: "testing"
description: "Design and implement deterministic, hermetic automated test suites, property-based invariants, and mutation verification."
triggers:
  - "Writing unit, integration, or contract tests"
  - "Verifying bug fixes through regression tests"
  - "Validating complex business workflows and boundary states"
  - "Testing mathematical invariants or serialization round-trips"
prerequisites:
  - "quality.coding-standards"
risk_profile: "high"
---

# Test-Driven Verification

## Overview
This skill guides AI agents and engineers in constructing reliable, isolated test suites that verify real runtime correctness. It reinforces the invariant that **implementation is merely a hypothesis until verified by passing tests**.

## Core Directives
1. **Zero Assumed Success**: Always run test suites and inspect actual execution output. Never report that tests pass without executing the command.
2. **Arrange-Act-Assert (AAA)**: Structure every test case into three distinct phases for unambiguous readability.
3. **Hermetic Isolation**: Tests must run independently in any order without relying on shared mutable state or network side-effects.
4. **Mock Only at Boundaries**: Never mock domain entities or business logic; mock only external system boundaries (network I/O, clock, payment gateways).
5. **Verify Invariants with Property-Based Tests**: For parsers, mathematical algorithms, and state transitions, assert invariants across generative random fuzzing.
6. **Guard Against Vanity Coverage**: Use mutation testing principles to ensure assertions are meaningful and capable of catching real regressions.

## Detailed Guidance
- [Testing Pyramid & Isolation Principles](references/testing-pyramid-and-isolation.md)
- [Property-Based, Mutation & Contract Testing](references/property-based-and-mutation-testing.md)
- [Arrange-Act-Assert Patterns](examples/arrange-act-assert-patterns.md)
- [Property-Based Testing Patterns](examples/property-based-testing-patterns.md)
- [Test Verification Checklist](checklists/test-verification-checklist.md)
