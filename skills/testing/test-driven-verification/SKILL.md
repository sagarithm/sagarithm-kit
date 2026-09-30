---
id: "testing.test-driven-verification"
name: "Test-Driven Verification"
version: "1.0.0"
domain: "testing"
description: "Design and implement deterministic, hermetic automated test suites validating edge cases and preventing assumed success."
triggers:
  - "Writing unit, integration, or contract tests"
  - "Verifying bug fixes through regression tests"
  - "Validating complex business workflows and boundary states"
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

## Detailed Guidance
- Read [Testing Pyramid & Isolation Principles](references/testing-pyramid-and-isolation.md).
- Examine [Arrange-Act-Assert Patterns](examples/arrange-act-assert-patterns.md).
- Execute the [Test Verification Checklist](checklists/test-verification-checklist.md).
