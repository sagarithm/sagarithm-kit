import React from "react";
import { Cpu, Lock, Network, RefreshCw } from "lucide-react";

export function Capabilities() {
  const capabilities = [
    {
      id: "01",
      filename: "engine.ts",
      title: "Autonomous Workflow Orchestration",
      description:
        "Deterministic multi-stage workflow runner executing feature development, bug fixes, refactoring, and release prep with strict gate enforcement.",
      icon: Cpu,
      command: "sagarithm run feature-development",
      highlight: "State Machine Automation",
    },
    {
      id: "02",
      filename: "secrets.ts",
      title: "Algorithmic Shannon Entropy Scanner",
      description:
        "Detects high-randomness tokens and API credentials at H >= 4.5 Shannon entropy, stopping confidential leaks and injection flaws before commits occur.",
      icon: Lock,
      command: "sagarithm audit --strict",
      highlight: "Information Entropy H >= 4.5",
    },
    {
      id: "03",
      filename: "graph.ts",
      title: "Robert C. Martin Instability & Coupling",
      description:
        "Calculates Afferent (Ca) and Efferent (Ce) coupling metrics, calculates component instability I = Ce / (Ca + Ce), and isolates unreferenced orphan abstractions.",
      icon: Network,
      command: "sagarithm context stats",
      highlight: "Afferent/Efferent Metric Graph",
    },
    {
      id: "04",
      filename: "compiler.ts",
      title: "Deterministic Cross-Agent Compiler",
      description:
        "Maintains a single canonical source of truth for architectural laws, injecting precision demarcated instruction blocks into Cursor, Antigravity, Claude, and Copilot.",
      icon: RefreshCw,
      command: "sagarithm sync --target all",
      highlight: "Zero Configuration Drift",
    },
  ];

  return (
    <section id="capabilities" className="full-rule">
      <div className="shell">
        <div className="section-label pad">
          <span>
            [ <b>02</b> / 05 ]
          </span>
          <span>Core Capabilities</span>
        </div>

        <div className="section-body pad">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-8 lg:gap-14 mb-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.06]">
                Built for autonomy, architecture, and security.
              </h2>
            </div>
            <div>
              <p className="text-ink-64 text-base sm:text-lg leading-relaxed">
                Embedding architectural governance, entropy token defense, and topological graph analysis directly into
                the agentic development loop.
              </p>
            </div>
          </div>

          {/* 4-card capability grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-edge bg-canvas-surface p-7 transition-all duration-200 hover:border-ink-32 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-edge font-mono text-xs text-ink-48">
                      <div className="flex items-center gap-2">
                        <span className="text-heat font-bold">{cap.id}</span>
                        <span>/</span>
                        <span className="text-ink font-medium">{cap.filename}</span>
                      </div>
                      <span className="rounded bg-canvas-base border border-edge px-2 py-0.5 text-[10px] text-ink-64 uppercase tracking-wider">
                        {cap.highlight}
                      </span>
                    </div>

                    <div className="mt-5 flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-canvas-base text-ink group-hover:border-heat group-hover:text-heat transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-ink group-hover:text-heat-dark transition-colors">
                          {cap.title}
                        </h3>
                        <p className="mt-2 text-sm text-ink-64 leading-relaxed">{cap.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-edge flex items-center justify-between font-mono text-xs text-ink-48">
                    <span>CLI Command:</span>
                    <code className="rounded bg-code px-2 py-1 text-white text-[11px] font-mono">{cap.command}</code>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
