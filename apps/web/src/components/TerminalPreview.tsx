"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function TerminalPreview() {
  const [activeTab, setActiveTab] = useState<"stats" | "verify" | "sync">("stats");
  const [copied, setCopied] = useState(false);

  const commands = {
    stats: "npx sagarithm-kit context stats",
    verify: "npx sagarithm-kit verify --strict",
    sync: "npx sagarithm-kit sync --target all",
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#161616] text-[#ededed] shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex h-11 items-center justify-between border-b border-white/10 px-3.5 sm:px-4 font-mono text-[11px] bg-white/[0.02] gap-2 overflow-hidden">
        {/* macOS Colored Window Controls & Title */}
        <div className="flex items-center gap-3 shrink-0 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-black/15 shadow-xs inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-black/15 shadow-xs inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-black/15 shadow-xs inline-block" />
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <span className="text-white/90 font-medium text-xs">sagarithm-cli</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/40 font-mono">v1.0.1</span>
          </div>
        </div>

        {/* Tab Switcher & Copy */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="flex items-center rounded-md border border-white/10 bg-white/5 p-0.5">
            {(["stats", "verify", "sync"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 sm:px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                  activeTab === tab
                    ? "bg-heat text-white font-medium shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={copyCommand}
            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 sm:px-2.5 py-1 text-[11px] text-white/70 hover:border-white/30 hover:text-white transition-all shrink-0"
            title="Copy command"
          >
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            <span className="font-mono hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Terminal Content Area */}
      <div className="p-5 font-mono text-xs leading-relaxed">
        {/* Command line prompt */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
          <span className="text-heat font-bold text-sm">$</span>
          <span className="text-white font-medium">{commands[activeTab]}</span>
        </div>

        {activeTab === "stats" && (
          <div className="mt-4 space-y-4">
            <div className="text-white/45 text-[11px]">
              ⚙ Parsing project AST &amp; topological dependency graph...
            </div>

            {/* Coupling metric cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/8 bg-white/[0.025] p-3.5">
                <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                  Afferent Coupling (Ca)
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-white tracking-tight">14</span>
                  <span className="text-white/45 text-[11px]">incoming</span>
                </div>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/[0.025] p-3.5">
                <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                  Efferent Coupling (Ce)
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-white tracking-tight">3</span>
                  <span className="text-white/45 text-[11px]">outgoing</span>
                </div>
              </div>
            </div>

            {/* Analysis Result Box */}
            <div className="rounded-lg border border-white/8 bg-white/[0.025] p-3 space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Martin Instability Metric (I):</span>
                <span className="font-bold text-[#ff8b59]">0.18 (Highly Stable)</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-white/5">
                <span className="text-white/50">Orphan Abstractions:</span>
                <span className="text-green-400 font-medium">0 detected (Clean)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "verify" && (
          <div className="mt-4 space-y-2.5">
            <div className="text-white/45 text-[11px]">
              ⚙ Executing Multi-Vector Verification Gate [Strict Mode]...
            </div>

            <div className="space-y-1.5 text-[11px] text-white/75 pt-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-green-400">✔</span>
                  <span>Vector 1: Static Analysis</span>
                </span>
                <span className="text-white/40">Clean AST, strict types</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-green-400">✔</span>
                  <span>Vector 2: Security &amp; Entropy</span>
                </span>
                <span className="text-white/40">0 leaks (H &lt; 4.5)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-green-400">✔</span>
                  <span>Vector 3: Architecture Fitness</span>
                </span>
                <span className="text-white/40">0 circular cycles</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-green-400">✔</span>
                  <span>Vector 4: Behavioral Test Gate</span>
                </span>
                <span className="text-white/40">17/17 tests passing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-green-400">✔</span>
                  <span>Vector 5: Documentation Sync</span>
                </span>
                <span className="text-white/40">Living manifest in sync</span>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-green-500/20 bg-green-500/10 p-2.5 flex items-center justify-between text-[11px]">
              <span className="text-white/70">Quality Gate Decision:</span>
              <span className="font-bold text-green-400 font-mono">STATE: [VERIFIED]</span>
            </div>
          </div>
        )}

        {activeTab === "sync" && (
          <div className="mt-4 space-y-2.5">
            <div className="text-white/45 text-[11px]">
              ⚙ Compiling canonical specifications to agent targets...
            </div>

            <div className="space-y-1.5 text-[11px] text-white/75 pt-1">
              <div className="flex items-center justify-between">
                <span>→ Cursor IDE</span>
                <span className="text-green-400 font-mono">.cursorrules [Synced]</span>
              </div>
              <div className="flex items-center justify-between">
                <span>→ Google Antigravity</span>
                <span className="text-green-400 font-mono">GEMINI.md [Synced]</span>
              </div>
              <div className="flex items-center justify-between">
                <span>→ Anthropic Claude Code</span>
                <span className="text-green-400 font-mono">CLAUDE.md [Synced]</span>
              </div>
              <div className="flex items-center justify-between">
                <span>→ GitHub Copilot</span>
                <span className="text-green-400 font-mono">copilot-instructions [Synced]</span>
              </div>
              <div className="flex items-center justify-between">
                <span>→ Windsurf IDE</span>
                <span className="text-green-400 font-mono">.windsurfrules [Synced]</span>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.025] p-2.5 flex items-center justify-between text-[11px] text-white/60">
              <span>Drift Status:</span>
              <span className="text-white font-medium">0% Divergence Across 5 Agents</span>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Status Footer */}
      <div className="flex items-center justify-between border-t border-white/8 bg-white/[0.015] px-4 py-2.5 font-mono text-[10px] text-white/40">
        <span>Active Preset: systems-core</span>
        <span className="text-heat font-medium">Node.js 22+ Native ESM</span>
      </div>
    </div>
  );
}
