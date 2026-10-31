import React from "react";
import { Cpu, Lock, Network, RefreshCw, Radio, Sparkles, HeartPulse, Users } from "lucide-react";

export function Capabilities() {
  const capabilities = [
    {
      id: "01",
      filename: "agents.ts",
      title: "Autonomous Specialist Agent OS",
      description:
        "Full roster of 99 production-tested specialist personas (Backend Architect, Frontend Lead, SRE, QA Lead, DBA) auto-configured into .agents, .copilot, and Cursor.",
      icon: Users,
      command: "sagarithm init",
      highlight: "99 Autonomous Personas",
    },
    {
      id: "02",
      filename: "health.ts",
      title: "100/100 Codebase Health Radar",
      description:
        "Comprehensive 100-point repository health score across structural hygiene, modularity, orphan dead code, secrets, and test density for automated CI/CD gating.",
      icon: HeartPulse,
      command: "sagarithm health",
      highlight: "Flawless Quality Score",
    },
    {
      id: "03",
      filename: "server.ts",
      title: "Native Model Context Protocol (MCP)",
      description:
        "Zero-dependency JSON-RPC 2.0 stdio server exposing 6 architectural tools directly to Antigravity, Claude Code, and Cursor for live verification and ideation.",
      icon: Radio,
      command: "sagarithm mcp",
      highlight: "JSON-RPC 2.0 Protocol",
    },
    {
      id: "04",
      filename: "validate.ts",
      title: "Truth-Driven Idea Validation",
      description:
        "Senior Principal Architect stress-test forbidding blind AI compliance. Surfaces operational bottlenecks, state model risks, and defines strict non-goals.",
      icon: Sparkles,
      command: 'sagarithm validate "<idea>"',
      highlight: "No Blind Compliance",
    },
    {
      id: "05",
      filename: "secrets.ts",
      title: "Algorithmic Shannon Entropy Scanner",
      description:
        "Detects high-randomness tokens and API credentials at H >= 4.5 Shannon entropy, stopping confidential leaks and injection flaws before commits occur.",
      icon: Lock,
      command: "sagarithm audit --strict",
      highlight: "Information Entropy H >= 4.5",
    },
    {
      id: "06",
      filename: "graph.ts",
      title: "Robert C. Martin Instability & Coupling",
      description:
        "Calculates Afferent (Ca) and Efferent (Ce) coupling metrics, calculates component instability I = Ce / (Ca + Ce), and isolates unreferenced orphan abstractions.",
      icon: Network,
      command: "sagarithm context stats",
      highlight: "Afferent/Efferent Metric Graph",
    },
  ];

  return (
    <section id="capabilities" className="full-rule">
      <div className="shell">
        <div className="section-label pad">
          <span>
            [ <b>02</b> / 05 ]
          </span>
          <span>Core Capabilities (v1.2.0)</span>
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
                Transforming AI coding models into a disciplined, self-verifying software engineering company. 116 specialized skills, 99 agent personas, native MCP tools, and 100/100 codebase verification gates.
              </p>
            </div>
          </div>

          {/* 6-card capability grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-edge bg-canvas-surface p-7 transition-all duration-200 hover:border-ink-32 hover:shadow-lg"
                >
                  <div>
                    {/* Header: ID & Highlight */}
                    <div className="flex items-center justify-between pb-4 border-b border-edge font-mono text-xs">
                      <span className="text-heat font-bold">CAP_{cap.id}</span>
                      <span className="rounded bg-canvas-base px-2 py-0.5 text-[11px] text-ink-64 border border-edge">
                        {cap.highlight}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-canvas-base text-ink shadow-xs">
                        <Icon className="h-5 w-5 text-heat" />
                      </div>
                      <h3 className="text-lg font-medium text-ink tracking-tight">{cap.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm text-ink-64 leading-relaxed">{cap.description}</p>
                  </div>

                  {/* Command Footer */}
                  <div className="mt-6 pt-4 border-t border-edge flex items-center justify-between font-mono text-xs text-ink-48">
                    <span className="truncate max-w-[220px]">{cap.command}</span>
                    <span className="text-[10px] uppercase tracking-wider text-heat font-semibold">Active</span>
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
