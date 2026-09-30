import React from "react";
import { Check, Minus, X } from "lucide-react";

export function Benchmark() {
  const comparisons = [
    {
      feature: "Proof of Correctness Gate",
      raw: "Self-reported 'Task Completed' (No test run)",
      basic: "Static markdown instructions (Easily ignored)",
      sagarithm: "Zero Assumed Success (Mandatory empirical test execution)",
      status: [false, false, true],
    },
    {
      feature: "Credential Leak Defense",
      raw: "None (High risk of pushing live keys)",
      basic: "Naive regex strings (Misses random tokens)",
      sagarithm: "Shannon Entropy H >= 4.5 + Regex Pattern Engine",
      status: [false, false, true],
    },
    {
      feature: "Architectural Graph Governance",
      raw: "Creates circular dependency cycles",
      basic: "No AST or graph awareness",
      sagarithm: "Acyclic DAG Cycle Interception & Martin Instability (I)",
      status: [false, false, true],
    },
    {
      feature: "Code Organization & Anti-Patterns",
      raw: "Dumps code into 'utils' & 'helpers' drawers",
      basic: "Subjective guidelines",
      sagarithm: "Automated Fitness Audit & Refactoring Remediation (--fix)",
      status: [false, false, true],
    },
    {
      feature: "Cross-Agent Ecosystem Sync",
      raw: "Completely manual prompt re-entry",
      basic: "Hardcoded to a single IDE file (.cursorrules)",
      sagarithm: "Universal AST Compiler (Cursor, Antigravity, Claude, Copilot)",
      status: [false, false, true],
    },
    {
      feature: "Orphan Abstraction Interceptor",
      raw: "Leaves dead code and unreferenced exports",
      basic: "None",
      sagarithm: "AST Export/Import graph isolates unreferenced interfaces",
      status: [false, false, true],
    },
  ];

  return (
    <section id="benchmark" className="full-rule">
      <div className="shell">
        <div className="section-label pad">
          <span>
            [ <b>04</b> / 05 ]
          </span>
          <span>Verification Benchmark</span>
        </div>

        <div className="section-body pad">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-8 lg:gap-14 mb-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.06]">
                Standard prompts assume. Sagarithm Kit verifies.
              </h2>
            </div>
            <div>
              <p className="text-ink-64 text-base sm:text-lg leading-relaxed">
                Evaluating software engineering reliability across raw LLM prompting, static .agents rules, and
                Sagarithm Kit's empirical multi-vector quality gates.
              </p>
            </div>
          </div>

          {/* Benchmark Table */}
          <div className="overflow-x-auto rounded-xl border border-edge bg-canvas-surface shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-edge bg-canvas-base font-mono text-[11px] uppercase tracking-wider text-ink-48">
                  <th className="py-4 px-4 sm:px-6 font-medium">Engineering Dimension</th>
                  <th className="py-4 px-4 sm:px-6 font-medium text-ink-64">Raw LLM Prompting</th>
                  <th className="py-4 px-4 sm:px-6 font-medium text-ink-64">.agents</th>
                  <th className="py-4 px-4 sm:px-6 font-bold text-heat bg-heat/5 border-l border-r border-heat/20">
                    Sagarithm Kit v1.0.1
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-canvas-base/60 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-ink">
                      <div>{row.feature}</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-ink-48">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{row.raw}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-ink-48">
                      <div className="flex items-start gap-2">
                        <Minus className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{row.basic}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-medium text-ink bg-heat/5 border-l border-r border-heat/20">
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-heat shrink-0 mt-0.5" />
                        <span className="font-semibold text-heat-dark">{row.sagarithm}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-xs text-ink-48 px-2">
            <span>Methodology: Multi-vector execution harness</span>
            <span className="text-heat font-medium">Zero Assumed Success Principle</span>
          </div>
        </div>
      </div>
    </section>
  );
}
