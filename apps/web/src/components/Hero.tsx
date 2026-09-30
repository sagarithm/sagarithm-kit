"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TerminalPreview } from "./TerminalPreview";
import { ArrowRight, Check, Copy, Sparkles, Terminal } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const command = "npx sagarithm-kit init";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Grid Accent with Radial Mask */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ededed_1px,transparent_1px),linear-gradient(to_bottom,#ededed_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(circle_at_70%_35%,black,transparent_60%)]" />

      <div className="shell">
        <div className="pad min-h-[580px] pt-12 pb-16 lg:pt-20 lg:pb-24 grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-14 items-center">
          {/* Left Column: Copy & Actions */}
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
              <div className="flex items-center gap-2 rounded-md border border-edge-muted bg-white/80 px-2.5 py-1 text-ink-64 shadow-xs">
                <span className="h-3 w-1 bg-heat rounded-xs" />
                <span>Open Source • Apache-2.0</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-ink bg-ink px-2.5 py-1 text-white shadow-xs">
                <span className="font-bold text-heat">TS</span>
                <span>Node 22+ Native Engine</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-medium leading-[1.03] tracking-[-0.045em] text-ink">
              Engineering standards for{" "}
              <em className="text-heat not-italic font-medium">AI coding agents</em>.
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-ink-64 leading-relaxed tracking-tight">
              Universal cross-agent framework delivering architectural governance, empirical verification, living
              context graphs, and quality gates to Cursor, Antigravity, Claude Code, Copilot, and Windsurf.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopy}
                className="group inline-flex h-11 items-center gap-2.5 rounded-lg border border-heat bg-heat px-5 text-sm font-medium text-white shadow-sm transition-all hover:border-heat-dark hover:bg-heat-dark"
              >
                <Terminal className="h-4 w-4 opacity-90" />
                <span className="font-mono">{command}</span>
                {copied ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                )}
              </button>

              <Link
                href="#studio"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-edge-muted bg-canvas-surface px-4 text-sm font-medium text-ink transition-all hover:border-ink-32 hover:bg-white"
              >
                <span>Interactive Studio</span>
                <ArrowRight className="h-3.5 w-3.5 text-heat" />
              </Link>
            </div>

            {/* Quick stats under CTAs */}
            <div className="mt-8 flex items-center gap-6 pt-6 border-t border-edge font-mono text-xs text-ink-48">
              <div>
                <span className="font-bold text-ink">6 Agents</span> Supported
              </div>
              <div className="h-3 w-px bg-edge" />
              <div>
                <span className="font-bold text-ink">5 Vectors</span> Verification
              </div>
              <div className="h-3 w-px bg-edge" />
              <div>
                <span className="font-bold text-ink">Zero</span> Assumed Success
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Preview */}
          <div className="w-full">
            <TerminalPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
