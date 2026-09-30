"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export function Quickstart() {
  const [activeCommand, setActiveCommand] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const cliCommands = [
    {
      name: "init",
      command: "npx sagarithm-kit init",
      summary: "Initialize Sagarithm Kit workspace configuration",
      description:
        "Generates the canonical sagarithm.config.json file, detects existing agent configurations, and prepares workspace directories.",
      options: [
        { flag: "--force", desc: "Overwrite existing configurations without confirmation" },
        { flag: "--preset <id>", desc: "Initialize with a curated preset (fullstack-web, systems-core, etc.)" },
      ],
      sampleOutput: `✔ Generated sagarithm.config.json
✔ Detected target: .cursorrules (Cursor IDE)
✔ Successfully initialized Sagarithm Kit in workspace!`,
    },
    {
      name: "sync",
      command: "npx sagarithm-kit sync --target all",
      summary: "Compile canonical specifications to agent configs",
      description:
        "Compiles constitution, skills, policies, and presets into demarcated blocks in .cursorrules, GEMINI.md, CLAUDE.md, copilot-instructions.md, and .windsurfrules.",
      options: [
        { flag: "--target <agent>", desc: "Compile only for a specific agent (cursor, antigravity, claude, copilot)" },
        { flag: "--dry-run", desc: "Print generated configurations without modifying files" },
      ],
      sampleOutput: `✔ Synced .cursorrules (Cursor)
✔ Synced .agents/rules/GEMINI.md (Antigravity)
✔ Synced CLAUDE.md (Claude Code)
✔ Synced .github/copilot-instructions.md (GitHub Copilot)
✔ All 5 agent targets updated with zero configuration drift.`,
    },
    {
      name: "run",
      command: "npx sagarithm-kit run feature-development",
      summary: "Orchestrate autonomous multi-stage workflow",
      description:
        "Executes a canonical engineering state machine through discovery, interface definition, implementation, test verification, and commit.",
      options: [
        { flag: "<workflow>", desc: "Workflow name (feature-development, bug-fix, refactoring, release-prep)" },
      ],
      sampleOutput: `[STAGE 1/5] Discovery & Context Loading -> COMPLETED
[STAGE 2/5] Interface Contract Definition -> COMPLETED
[STAGE 3/5] Test-Driven Implementation -> COMPLETED
[STAGE 4/5] Multi-Vector Verification Gate -> PASSED
[STAGE 5/5] Atomic Conventional Commit -> COMPLETED`,
    },
    {
      name: "context",
      command: "npx sagarithm-kit context stats",
      summary: "Inspect coupling and Martin instability metrics",
      description:
        "Parses project AST to compute Afferent Coupling (Ca), Efferent Coupling (Ce), Martin Instability (I = Ce / (Ca + Ce)), and identifies orphan abstractions.",
      options: [
        { flag: "find <symbol>", desc: "Locate existing abstractions across repository" },
        { flag: "blast-radius <file>", desc: "Compute upstream/downstream impact graph of changes" },
        { flag: "orphans", desc: "Detect unreferenced exported interfaces and dead functions" },
      ],
      sampleOutput: `Afferent Coupling (Ca): 14 incoming
Efferent Coupling (Ce): 3 outgoing
Martin Instability (I): 0.18 (Highly Stable)
Orphan Abstractions: 0 detected`,
    },
    {
      name: "audit",
      command: "npx sagarithm-kit audit --fix",
      summary: "Audit workspace against security and fitness policies",
      description:
        "Scans diff or full repository for Shannon entropy credential leaks (H >= 4.5), cyclomatic anti-patterns, and offers automated refactoring fixes.",
      options: [
        { flag: "--fix", desc: "Automatically remediate detected policy violations" },
        { flag: "--deep", desc: "Scan full repository instead of active git diff" },
        { flag: "--strict", desc: "Treat all warnings as fatal errors (exit code 1)" },
      ],
      sampleOutput: `🔍 Scanning workspace for policy violations...
✔ Security Gate: 0 credential leaks (Shannon entropy H < 4.5)
✔ Fitness Gate: 0 anti-pattern directories
✅ Audit clean! Zero policy violations detected in workspace.`,
    },
    {
      name: "verify",
      command: "npx sagarithm-kit verify --strict",
      summary: "Empirical verification gate (Zero Assumed Success)",
      description:
        "Executes the mandatory 5-vector verification gate (Static, Security, Architecture, Behavioral, Documentation) and generates evidence reports.",
      options: [
        { flag: "--strict", desc: "Enforce zero-tolerance quality threshold" },
        { flag: "--json", desc: "Emit machine-readable audit report for CI/CD" },
        { flag: "--suite <name>", desc: "Target specific test suite" },
      ],
      sampleOutput: `⚙ Executing Multi-Vector Verification Gate...
✔ Static Vector: Passed
✔ Security Vector: Passed
✔ Architecture Vector: Passed
✔ Behavioral Vector: 17/17 tests passing
✔ Documentation Vector: Passed
🏆 VERIFICATION STATE: [VERIFIED]`,
    },
  ];

  const current = cliCommands[activeCommand];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cli" className="full-rule">
      <div className="shell">
        <div className="section-label pad">
          <span>
            [ <b>05</b> / 05 ]
          </span>
          <span>CLI &amp; Quickstart</span>
        </div>

        <div className="section-body pad">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-8 lg:gap-14 mb-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.06]">
                One install. Governs every agent.
              </h2>
            </div>
            <div>
              <p className="text-ink-64 text-base sm:text-lg leading-relaxed">
                Run natively with npx, install globally via npm, or integrate directly into your CI/CD pipeline to
                enforce Zero Assumed Success on every pull request.
              </p>
            </div>
          </div>

          {/* Interactive Command Tabs */}
          <div className="overflow-hidden rounded-xl border border-edge bg-canvas-surface shadow-md">
            {/* Command Navigation Tabs */}
            <div className="flex overflow-x-auto border-b border-edge bg-canvas-base p-1.5 gap-1 font-mono text-xs scrollbar-none">
              {cliCommands.map((cmd, idx) => (
                <button
                  key={cmd.name}
                  onClick={() => setActiveCommand(idx)}
                  className={`px-3.5 py-2 rounded-md font-medium whitespace-nowrap transition-all ${
                    activeCommand === idx
                      ? "bg-canvas-surface border border-edge shadow-xs text-heat font-bold"
                      : "text-ink-48 hover:text-ink hover:bg-canvas-lighter"
                  }`}
                >
                  sagarithm {cmd.name}
                </button>
              ))}
            </div>

            {/* Command Content */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-edge">
                <div>
                  <h3 className="text-lg font-semibold text-ink tracking-tight">{current.summary}</h3>
                  <p className="mt-1 text-sm text-ink-64">{current.description}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-edge bg-canvas-base px-3.5 font-mono text-xs font-medium text-ink hover:border-ink-32 transition-all shadow-xs"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy Command"}</span>
                </button>
              </div>

              {/* Command Banner */}
              <div className="mt-6 flex items-center justify-between rounded-lg bg-code p-4 font-mono text-xs text-white">
                <div className="flex items-center gap-2 truncate mr-3">
                  <span className="text-heat font-bold">$</span>
                  <span className="truncate">{current.command}</span>
                </div>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60 shrink-0">BASH / POWERSHELL</span>
              </div>

              {/* Flags and Options */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-48 mb-3">
                  Command Flags &amp; Options
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {current.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-edge bg-canvas-lighter p-3 font-mono text-xs flex flex-col justify-between"
                    >
                      <code className="text-heat-dark font-bold">{opt.flag}</code>
                      <span className="mt-1 font-sans text-ink-64 text-xs">{opt.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Output */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-48 mb-3">
                  Simulated Output
                </h4>
                <pre className="rounded-lg border border-edge bg-canvas-base p-4 font-mono text-xs leading-relaxed text-ink-88 overflow-x-auto whitespace-pre">
                  {current.sampleOutput}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
