"use client";

import React, { useState } from "react";
import { Check, Copy, Play, Shield, Sparkles, Terminal } from "lucide-react";

export function InteractiveStudio() {
  const [selectedAgent, setSelectedAgent] = useState<"cursor" | "antigravity" | "claude" | "copilot" | "windsurf">(
    "cursor"
  );
  const [selectedPreset, setSelectedPreset] = useState<"fullstack" | "api" | "systems" | "agentic">("systems");
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const targetFiles: Record<string, string> = {
    cursor: ".cursorrules",
    antigravity: ".agents/rules/GEMINI.md",
    claude: "CLAUDE.md",
    copilot: ".github/copilot-instructions.md",
    windsurf: ".windsurfrules",
  };

  const presetData = {
    systems: {
      name: "systems-core",
      description: "High-integrity systems, zero-alloc patterns, exhaustive types, acyclic architecture.",
      rules: [
        "1. Never create circular dependencies; all modules must form a strict DAG.",
        "2. Shannon entropy threshold for credentials is H >= 4.5. Secrets must never be committed.",
        "3. Zero Assumed Success: Verify code using empirical test execution before reporting done.",
        "4. No generic 'utils' or 'helpers' directories; use domain-oriented taxonomy.",
      ],
    },
    fullstack: {
      name: "fullstack-web",
      description: "Next.js, React 19, server actions, client/server boundaries, and Tailwind CSS.",
      rules: [
        "1. Strictly enforce Server and Client boundary isolation ('use client').",
        "2. Never expose server environment variables or database models to client components.",
        "3. Validate all user inputs at server boundaries using schema verification.",
        "4. Enforce empirical verification before marking features implemented.",
      ],
    },
    api: {
      name: "api-backend",
      description: "Resilient microservices, REST/GraphQL, Outbox pattern, idempotency keys.",
      rules: [
        "1. All mutations must require idempotency keys and transactional outbox patterns.",
        "2. Domain logic must remain decoupled from HTTP and transport layers.",
        "3. Zero unhandled promise rejections; exhaustive error type-guards mandatory.",
        "4. Multi-vector audit gate must pass on all PR branches.",
      ],
    },
    agentic: {
      name: "ai-agentic",
      description: "Multi-agent orchestration, blast-radius containment, prompt isolation.",
      rules: [
        "1. Autonomous agents must execute in sandbox environments with least-privilege tokens.",
        "2. Dynamic blast-radius verification required before modifying core graph topology.",
        "3. Multi-agent subagents must report empirical proof of work, not simulated output.",
        "4. Enforce strict git atomic commits for all autonomous mutations.",
      ],
    },
  };

  const activePreset = presetData[selectedPreset];

  const generatedOutput = `<!-- SAGARITHM:START -->
# SAGARITHM ENGINEERING CONSTITUTION (Target: ${targetFiles[selectedAgent]})
# Preset: ${activePreset.name} | Version: 1.0.0

## Supreme Behavioral Governors
- Zero Assumed Success: You are strictly forbidden from declaring a task complete without empirical test evidence.
- Entropy Security Gate: Shannon entropy H >= 4.5 triggers an immediate security abort.
- Acyclic Graph Constraint: Circular dependencies between modules are considered critical bugs.

## Active Preset Directives (${activePreset.name})
${activePreset.rules.map((r) => `- ${r}`).join("\n")}

## Required Verification Vectors
1. Static Analysis: Strict typing, zero eslint warnings.
2. Security Gate: Zero hardcoded API keys, tokens, or private secrets.
3. Architecture Fitness: Acyclic DAG topology, zero 'utils/helpers' anti-patterns.
4. Behavioral Tests: All unit and integration test assertions green.
5. Documentation: Topology manifest and ADR state synchronized.
<!-- SAGARITHM:END -->`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setIsVerifying(true);
    setTimeout(() => setIsVerifying(false), 800);
  };

  return (
    <section id="studio" className="full-rule">
      <div className="shell">
        <div className="section-label pad">
          <span>
            [ <b>01</b> / 05 ]
          </span>
          <span>Interactive Studio</span>
        </div>

        <div className="section-body pad">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-8 lg:gap-14 mb-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.06]">
                Compile cross-agent configurations in real-time.
              </h2>
            </div>
            <div>
              <p className="text-ink-64 text-base sm:text-lg leading-relaxed">
                Select an agent target and architectural preset to observe deterministic instruction compilation,
                policy constraints, and empirical quality gates.
              </p>
            </div>
          </div>

          {/* Interactive Demo Shell */}
          <div className="overflow-hidden rounded-xl border border-edge bg-canvas-surface shadow-xl">
            {/* Toolbar */}
            <div className="flex flex-wrap h-auto sm:h-12 items-center justify-between border-b border-edge px-4 py-2 sm:py-0 font-mono text-[11px] text-ink-48 bg-canvas-lighter gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-heat animate-pulse" />
                <span className="font-semibold text-ink">sagarithm-compiler</span>
                <span className="text-ink-32">|</span>
                <span>Deterministic AST Engine</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-ink-64">
                  <Shield className="h-3.5 w-3.5 text-heat" />
                  <span>100% Client-Side Simulation</span>
                </div>
              </div>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[340px,1fr]">
              {/* Left Column: Controls */}
              <div className="p-6 border-b lg:border-b-0 lg:border-r border-edge bg-canvas-base flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Agent Target */}
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wider text-ink-48 block mb-2">
                      1. Select Target Agent
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
                      {[
                        { id: "cursor", label: "Cursor" },
                        { id: "antigravity", label: "Antigravity" },
                        { id: "claude", label: "Claude Code" },
                        { id: "copilot", label: "Copilot" },
                        { id: "windsurf", label: "Windsurf" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedAgent(item.id as any)}
                          className={`px-3 py-2 rounded-md border text-left transition-all ${
                            selectedAgent === item.id
                              ? "border-heat bg-heat/10 text-heat-dark font-medium shadow-xs"
                              : "border-edge bg-canvas-surface text-ink-64 hover:border-ink-32"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preset Selector */}
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wider text-ink-48 block mb-2">
                      2. Engineering Preset
                    </label>
                    <div className="space-y-1.5 font-mono text-xs">
                      {[
                        { id: "systems", name: "systems-core", tag: "Low latency & zero-alloc" },
                        { id: "fullstack", name: "fullstack-web", tag: "Next.js & server boundaries" },
                        { id: "api", name: "api-backend", tag: "Microservices & idempotency" },
                        { id: "agentic", name: "ai-agentic", tag: "Autonomous orchestration" },
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setSelectedPreset(preset.id as any)}
                          className={`w-full p-2.5 rounded-md border text-left transition-all flex items-center justify-between ${
                            selectedPreset === preset.id
                              ? "border-heat bg-heat/10 text-heat-dark font-medium shadow-xs"
                              : "border-edge bg-canvas-surface text-ink-64 hover:border-ink-32"
                          }`}
                        >
                          <span>{preset.name}</span>
                          <span className="text-[10px] text-ink-32">{preset.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Compiler Status Indicator */}
                <div className="rounded-lg border border-edge bg-canvas-surface p-3.5 font-mono text-xs">
                  <div className="flex items-center gap-2 text-heat font-semibold text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-heat animate-pulse" />
                    <span>Real-Time Compiler</span>
                  </div>
                  <p className="mt-1.5 font-sans text-xs text-ink-48 leading-relaxed">
                    Canonical laws compile deterministically into native targets on selection with zero manual drift.
                  </p>
                </div>
              </div>

              {/* Right Column: Output */}
              <div className="flex flex-col bg-code text-white min-h-[480px] min-w-0 overflow-hidden">
                {/* Output Header */}
                <div className="flex h-12 items-center justify-between border-b border-white/10 px-4 font-mono text-[11px] text-white/50 bg-white/[0.01]">
                  <div className="flex items-center gap-2 min-w-0 truncate mr-2">
                    <Terminal className="h-3.5 w-3.5 text-heat shrink-0" />
                    <span className="shrink-0 text-white/40">Target:</span>
                    <strong className="text-white font-medium truncate font-mono">{targetFiles[selectedAgent]}</strong>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white hover:border-heat hover:text-white transition-all shrink-0"
                  >
                    {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? "Copied" : "Copy Compiled Rules"}</span>
                  </button>
                </div>

                {/* Output Metrics Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-white/10 bg-white/[0.02] p-3 font-mono text-[10px] text-white/60 gap-2 sm:gap-0">
                  <div className="sm:border-r sm:border-white/5 sm:pr-3">
                    <span className="text-white/35 block uppercase tracking-wider">Active Preset</span>
                    <span className="text-white font-bold truncate block">{activePreset.name}</span>
                  </div>
                  <div className="sm:border-r sm:border-white/5 sm:px-3">
                    <span className="text-white/35 block uppercase tracking-wider">Quality Gate</span>
                    <span className="text-green-400 font-bold block">[VERIFIED]</span>
                  </div>
                  <div className="sm:pl-3">
                    <span className="text-white/35 block uppercase tracking-wider">Graph Cycles</span>
                    <span className="text-white font-bold block">0 (Acyclic DAG)</span>
                  </div>
                </div>

                {/* Code Preview - wrapped & scrollable to prevent any text clipping */}
                <pre className="flex-1 p-5 font-mono text-xs leading-relaxed text-white/80 whitespace-pre-wrap break-words overflow-y-auto selection:bg-heat/30">
                  {generatedOutput}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
