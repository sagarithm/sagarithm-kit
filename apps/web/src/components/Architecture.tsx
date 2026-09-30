"use client";

import React, { useState } from "react";
import { BookOpen, Box, Compass, GitMerge, Layers, ShieldCheck, Terminal } from "lucide-react";

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
      name: "Core Engineering Skills",
      path: "skills/",
      icon: Box,
      summary: "Reusable Behavioral Capabilities",
      details:
        "Actionable skill bundles containing checklists, reference patterns, examples, and execution guidance for architecture design, TDD, security threat modeling, and performance optimization.",
      items: [
        "architecture-design (ADR, boundaries)",
        "test-driven-verification (AAA, property-based)",
        "secure-development (threat modeling, STRIDE)",
        "performance-optimization (profiling, budgets)",
        "refactoring-patterns (strangler-fig, extraction)",
        "git-mastery (atomic commits, interactive rebase)",
      ],
    },
    {
      index: "03",
      name: "Behavioral Policies",
      path: "policies/",
      icon: ShieldCheck,
      summary: "Enforceable Quality Constraints",
      details:
        "Deterministic guardrails evaluated by the validation engine during audits and PR gates. Forbids blind assumptions, anti-pattern directories, and unrestricted diff explosions.",
      items: [
        "no-assumed-success.md (Empirical proof required)",
        "structural-fitness.md (No utils/helpers junk drawers)",
        "diff-discipline.md (Surgical blast-radius limit)",
        "documentation-sync.md (Zero doc drift)",
      ],
    },
    {
      index: "04",
      name: "Canonical Workflows",
      path: "workflows/",
      icon: Compass,
      summary: "Multi-Stage Agent Lifecycles",
      details:
        "Deterministic state machines for end-to-end development tasks. Guides agents stage-by-stage through discovery, interface definition, implementation, verification, and atomic commit.",
      items: [
        "feature-development-workflow.md",
        "bug-fix-workflow.md",
        "refactoring-workflow.md",
        "release-workflow.md",
      ],
    },
    {
      index: "05",
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
      index: "06",
      name: "Universal Agent Adapters",
      path: "adapters/",
      icon: GitMerge,
      summary: "Deterministic Native Compilers",
      details:
        "Translates canonical laws into native config formats for Cursor, Antigravity, Claude Code, GitHub Copilot, and Windsurf using non-destructive demarcated injection blocks.",
      items: [
        "cursor (.cursorrules)",
        "antigravity (.agents/rules/GEMINI.md)",
        "claude-code (CLAUDE.md)",
        "copilot (.github/copilot-instructions.md)",
        "windsurf (.windsurfrules)",
      ],
    },
  ];

  const current = layers[activeLayer];
  const CurrentIcon = current.icon;

  return (
    <section id="architecture" className="full-rule">
      <div className="shell">
        <div className="section-label pad">
          <span>
            [ <b>03</b> / 05 ]
          </span>
          <span>System Architecture</span>
        </div>

        <div className="section-body pad">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-8 lg:gap-14 mb-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.06]">
                Six decoupled layers. One source of truth.
              </h2>
            </div>
            <div>
              <p className="text-ink-64 text-base sm:text-lg leading-relaxed">
                Decoupled engineering principles, skills, and policies compiled deterministically into native agent
                targets without configuration drift.
              </p>
            </div>
          </div>

          {/* Interactive Layer Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px,1fr] gap-6 items-stretch">
            {/* Layer List Tabs */}
            <div className="space-y-2 font-mono text-xs">
              {layers.map((layer, idx) => (
                <button
                  key={layer.index}
                  onClick={() => setActiveLayer(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    activeLayer === idx
                      ? "border-heat bg-heat/5 shadow-sm"
                      : "border-edge bg-canvas-surface hover:border-ink-32 text-ink-64"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${activeLayer === idx ? "text-heat" : "text-ink-32"}`}>
                      {layer.index}
                    </span>
                    <div>
                      <div className={`font-sans font-semibold text-sm ${activeLayer === idx ? "text-ink" : "text-ink-88"}`}>
                        {layer.name}
                      </div>
                      <div className="text-[11px] text-ink-48 mt-0.5">{layer.path}</div>
                    </div>
                  </div>
                  <span className={`text-xs ${activeLayer === idx ? "text-heat" : "text-ink-32"}`}>→</span>
                </button>
              ))}
            </div>

            {/* Active Layer Details Card */}
            <div className="rounded-xl border border-edge bg-canvas-surface p-7 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-edge">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heat/10 text-heat-dark border border-heat/20">
                      <CurrentIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-heat uppercase">Layer {current.index}</span>
                      <h3 className="text-xl font-semibold text-ink tracking-tight">{current.name}</h3>
                    </div>
                  </div>
                  <code className="font-mono text-xs bg-canvas-base border border-edge px-2.5 py-1 rounded text-ink-64">
                    {current.path}
                  </code>
                </div>

                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-ink uppercase tracking-wide font-mono">Role &amp; Purpose</h4>
                  <p className="mt-2 text-ink-64 text-sm leading-relaxed">{current.details}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-edge">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-48 mb-3">
                    Codified Specifications in Layer {current.index}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-ink-88">
                    {current.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded border border-edge bg-canvas-base p-2 text-[11px]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-heat shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-edge flex items-center justify-between font-mono text-xs text-ink-48">
                <span>Decoupled Design:</span>
                <span className="text-ink font-medium">100% Target Agent Agnostic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
