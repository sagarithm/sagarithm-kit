---
id: "architecture.system-design"
name: "System Design & Modularity"
version: "1.0.0"
domain: "architecture"
description: "Decompose complex systems into highly cohesive, loosely coupled modules with explicit public interfaces and acyclic dependencies."
triggers:
  - "Designing new system modules or packages"
  - "Refactoring cross-cutting abstractions"
  - "Defining inter-service or inter-module communication boundaries"
prerequisites: []
risk_profile: "high"
---

# System Design & Modularity

## Overview
This skill guides AI agents and engineers in decomposing system requirements into maintainable, modular components while preventing architectural decay, circular dependencies, and leaky abstractions.

## Core Directives
1. **Define Explicit Boundaries**: Every module must expose a strict public API (e.g. index file or port interface) and hide internal implementation helpers.
2. **Enforce Directional Dependencies**: High-level business policies must never depend on low-level technical mechanisms (database drivers, network protocols). Apply Dependency Inversion.
3. **Prevent Circular References**: Maintain a strict Directed Acyclic Graph (DAG) across modules and packages.
4. **Cohesion Over Fragmentation**: Avoid arbitrary file splitting. Keep concepts that change together within the same domain boundary.

## Detailed Guidance
- Review [Modularity and Coupling Guidelines](references/modularity-and-coupling.md) for architectural trade-offs.
- Inspect [Modular vs. Tightly Coupled Examples](examples/modular-vs-tightly-coupled.md) for concrete patterns.
- Execute the [Architecture Review Checklist](checklists/architecture-review-checklist.md) prior to finalizing architectural designs.
