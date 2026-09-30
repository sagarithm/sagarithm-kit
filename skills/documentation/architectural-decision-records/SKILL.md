---
id: "documentation.architectural-decision-records"
name: "Architectural Decision Records (ADRs)"
version: "1.0.0"
domain: "documentation"
description: "Author, update, and manage Architectural Decision Records (ADRs) to record significant engineering choices, context, and trade-offs."
triggers:
  - "Introducing a major technology or framework"
  - "Establishing a new architectural pattern or structural boundary"
  - "Making a significant trade-off affecting maintenance or performance"
prerequisites:
  - "architecture.system-design"
risk_profile: "medium"
---

# Architectural Decision Records (ADRs)

## Overview
This skill guides AI agents and engineers in capturing consequential architectural decisions as living, version-controlled records. ADRs preserve institutional memory, explain the *why* behind complex designs, and prevent recurring circular debates.

## Core Directives
1. **Identify Consequential Decisions**: Not every bug fix requires an ADR; write an ADR whenever a structural choice has long-term implications or accepts explicit trade-offs.
2. **Follow Standard Structure**: Use the standard format: Title, Status, Context, Decision, Consequences.
3. **Record Both Pros and Cons**: A balanced decision record explicitly documents accepted downsides and operational costs.
4. **Immutable History**: Once an ADR is accepted, do not edit its historical decision text; create a new ADR that supersedes the prior one.

## Detailed Guidance
- Read [ADR Lifecycle & Structural Guidelines](references/adr-lifecycle-and-structure.md).
- Examine [Canonical ADR Sample](examples/canonical-adr-sample.md).
- Execute the [ADR Authoring Checklist](checklists/adr-authoring-checklist.md).
