"use client";

import React from "react";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-[68px] border-b border-edge bg-[rgba(249,249,249,0.92)] backdrop-blur-md">
      <div className="mx-auto flex h-full w-[min(calc(100%-32px),1112px)] items-center justify-between border-l border-r border-edge px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 font-medium tracking-tight">
            <img
              src="/sagarithm-symbol-triskelion-black.png"
              alt="Sagarithm logo"
              className="h-6 w-6 rounded-md shadow-xs object-contain"
            />
            <span className="font-mono text-sm font-semibold tracking-tight text-ink">sagarithm-kit</span>
            <span className="rounded border border-edge bg-canvas-surface px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-48">
              v1.0.1
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-ink-64">
          <Link href="#studio" className="transition-colors hover:text-heat">
            Studio
          </Link>
          <Link href="#capabilities" className="transition-colors hover:text-heat">
            Capabilities
          </Link>
          <Link href="#architecture" className="transition-colors hover:text-heat">
            Architecture
          </Link>
          <Link href="#benchmark" className="transition-colors hover:text-heat">
            Benchmark
          </Link>
          <Link href="#cli" className="transition-colors hover:text-heat">
            Usage
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://www.npmjs.com/package/sagarithm-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-lg border border-edge bg-canvas-surface px-3 font-mono text-xs font-medium text-ink-64 transition-all hover:border-ink-32 hover:text-ink"
          >
            <span>npm v1.0.1</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <a
            href="https://github.com/sagarithm/sagarithm-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-ink bg-ink px-3.5 text-xs font-medium text-white transition-all hover:border-heat hover:bg-heat"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-mono">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
