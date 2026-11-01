"use client";

import React, { useState } from "react";
import { BookOpen, Box, Compass, GitMerge, Layers, ShieldCheck, Terminal, Users } from "lucide-react";

export function Architecture() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      index: "01",
      name: "Engineering Constitution",
      path: "constitution/",
      icon: BookOpen,
      summary: "8 Immutable Laws of Software Engineering",
      details:
        "Codified principles governing engineering philosophies, strict typing, error handling, testing pyramids, OWASP security, documentation standards, atomic git hygiene, and SemVer releases.",
      items: [
        "01-engineering-principles.md",
        "02-architecture-principles.md",
        "03-coding-standards.md",
        "04-testing-principles.md",
        "05-security-principles.md",
        "06-documentation-standards.md",
        "07-git-standards.md",
        "08-release-standards.md",
      ],
    },
    {
      index: "02",
      name: "Core Skills & Personas",
      path: "skills/ & agents/",
      icon: Box,
      summary: "17 Core Skills & 99 Autonomous Specialist Personas",
      details:
        "Actionable skill bundles containing checklists, reference patterns, examples, and embedded anti-rationalization tables defeating AI shortcuts across all SDLC & STLC stages. Includes 99 specialist agent personas auto-provisioned to IDEs.",
      items: [
        "frontend-ui-engineering (Atomic design, Web Vitals, a11y)",
        "backend-distributed-systems (OpenAPI, idempotency, outbox)",
        "database-architecture-and-modeling (3NF, Expand/Contract, indexes)",
        "devops-sre-observability (Rootless Docker, OTel, canary)",
        "testing-stlc-quality-assurance (All 6 STLC phases, BVA)",
        "ai-systems-and-rag (Token saving, schema outputs, injection defense)",
        "performance-profiling-and-optimization (O(1) maps, stream I/O)",
        "ideation-idea-validation (Truth-driven stress testing)",
        "architecture-spec-driven-development (Contract interfaces)",
        "architecture-system-design (Modularity, DAG acyclicity)",
        "lifecycle-planning-and-task-breakdown (Atomic slices)",
        "quality-code-review-and-quality (Senior adversarial review)",
        "quality-coding-standards (Type safety & error handling)",
        "security-secure-development (Threat modeling & entropy defense)",
        "testing-test-driven-verification (Hermetic TDD assertions)",
        "delivery-shipping-and-launch (4-gate release governance)",
        "documentation-architectural-decision-records (MADR 3.0)",
      ],
    },
    {
      index: "03",
      name: "Specialist Agent Personas",
      path: "agents/",
      icon: Users,
      summary: "99 Production-Tested Engineering Specialists",
      details:
        "Pre-configured specialist identities covering Core Engineering (49), Testing & QA (9), Product & Strategy (5), and Market Operations (36). Automatically synchronized into .agents/agents/, .copilot/agents/, and Cursor rules.",
      items: [
        "engineering-backend-architect.md",
        "engineering-frontend-developer.md",
        "engineering-software-architect.md",
        "engineering-data-engineer.md",
        "engineering-database-optimizer.md",
        "engineering-devops-automator.md",
        "engineering-sre.md",
        "engineering-api-platform-engineer.md",
        "testing-test-automation-engineer.md",
        "testing-api-tester.md",
        "testing-performance-benchmarker.md",
        "product-manager.md",
      ],
    },
    {
      index: "04",
      name: "Behavioral Policies",
      path: "policies/",
      icon: ShieldCheck,
      summary: "Enforceable Quality Constraints",
      details:
        "Deterministic guardrails evaluated by the validation engine during audits and PR gates. Forbids blind assumptions, anti-pattern directories, and unrestricted diff explosions.",
      items: [
        "policy-change-scope.md (Blast-radius confinement)",
        "policy-directory-creation.md (No utils/helpers junk drawers)",
        "policy-dependency-management.md (Zero unvetted packages)",
        "policy-security-boundary.md (Fail-closed secrets isolation)",
        "policy-testing-enforcement.md (Zero Assumed Success)",
        "policy-file-creation.md (Anti-duplication inspection)",
        "policy-documentation-synchronization.md (Zero doc drift)",
      ],
    },
    {
      index: "05",
      name: "Canonical Workflows",
      path: "workflows/",
      icon: Compass,
      summary: "Multi-Stage Agent Lifecycles",
      details:
        "Deterministic state machines for end-to-end development tasks. Guides agents stage-by-stage through discovery, interface definition, implementation, verification, and atomic commit.",
      items: [
        "workflow.feature-development.md",
        "workflow.bug-fix.md",
        "workflow.refactoring.md",
        "workflow.release.md",
      ],
    },
    {
      index: "06",
      name: "Project Intelligence",
      path: "context/",
      icon: Layers,
      summary: "Dynamic Dependency & Topology Graph",
      details:
        "Calculates module boundaries, call topologies, blast-radius analysis, and unreferenced exports. Provides coding agents with precise context without context window overflow.",
      items: [
        "sagarithm.manifest.json (Topology index)",
        "Blast-radius locator (Upstream & downstream)",
        "Martin Instability metric (Ca / Ce calculation)",
        "Orphan abstraction interceptor",
      ],
    },
    {
      index: "07",
      name: "Universal Agent Adapters",
      path: "adapters/",
      icon: GitMerge,
      summary: "Deterministic Native Compilers",
      details:
        "Single-source-of-truth compiler emitting safe, non-destructive demarcated instructions to Google Antigravity (.agents/skills, .agents/agents), Cursor (.cursorrules, .cursor/rules), Claude Code (CLAUDE.md), GitHub Copilot (.github/copilot-instructions, .copilot/agents), Windsurf (.windsurfrules), and Codex.",
      items: [
        "adapters/antigravity (Skills, Agents, MCP)",
        "adapters/cursor (.cursorrules & .mdc)",
        "adapters/claude-code (CLAUDE.md)",
        "adapters/copilot (Custom agents & instructions)",
        "adapters/windsurf (.windsurfrules)",
        "adapters/codex (System prompts)",
      ],
    },
  ];

  const current = layers[activeLayer];
  const Icon = current.icon;

  return (
    <section id="architecture" className="full-rule">
      <div className="shell">
        <div className="section-label pad">
          <span>
            [ <b>03</b> / 05 ]
          </span>
          <span>System Architecture (v1.2.0)</span>
        </div>

        <div className="section-body pad">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-8 lg:gap-14 mb-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.06]">
                The Decoupled Multi-Agent Engineering Stack
              </h2>
            </div>
            <div>
              <p className="text-ink-64 text-base sm:text-lg leading-relaxed">
                Separating canonical engineering knowledge, specialist agent personas, behavioral policies, and workflows from platform-specific adapters and protocol runtimes.
              </p>
            </div>
          </div>

          {/* Interactive Layer Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1.4fr] gap-8 rounded-xl border border-edge bg-canvas-surface p-6 sm:p-8">
            {/* Left: Layer Selector Tabs */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-48 pb-2">
                Architectural Layers
              </span>
              {layers.map((l, idx) => {
                const LayerIcon = l.icon;
                return (
                  <button
                    key={l.index}
                    onClick={() => setActiveLayer(idx)}
                    className={`flex items-center justify-between rounded-lg border p-3.5 text-left font-mono text-xs transition-all ${
                      activeLayer === idx
                        ? "border-heat bg-heat/5 text-ink font-semibold shadow-xs"
                        : "border-edge bg-canvas-base/50 text-ink-64 hover:border-ink-32 hover:text-ink"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] ${activeLayer === idx ? "text-heat font-bold" : "text-ink-48"}`}>
                        {l.index}
                      </span>
                      <LayerIcon className={`h-4 w-4 ${activeLayer === idx ? "text-heat" : "text-ink-48"}`} />
                      <span>{l.name}</span>
                    </div>
                    <span className="text-[10px] text-ink-48 hidden sm:inline">{l.path}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Layer Inspector Card */}
            <div className="rounded-lg border border-edge bg-canvas-base p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-edge">
                  <div className="flex items-center gap-2 font-mono text-xs text-heat font-bold">
                    <Icon className="h-4 w-4" />
                    <span>LAYER {current.index}</span>
                  </div>
                  <span className="font-mono text-xs text-ink-48">{current.path}</span>
                </div>

                <h3 className="mt-5 text-xl font-medium text-ink tracking-tight">{current.summary}</h3>
                <p className="mt-3 text-sm text-ink-64 leading-relaxed">{current.details}</p>

                <div className="mt-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-48 block mb-2.5">
                    Constituent Artifacts &amp; Directives
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {current.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded border border-edge bg-canvas-surface px-2.5 py-1.5 font-mono text-xs text-ink-64 truncate"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-heat shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-edge flex items-center justify-between font-mono text-xs text-ink-48">
                <span>Verification State: [VERIFIED]</span>
                <span className="text-heat font-semibold">100% Deterministic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
