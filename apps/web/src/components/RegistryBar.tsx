"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

export function RegistryBar() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const packages = [
    {
      id: "npm",
      name: "npm & npx Registry",
      badge: "npm",
      badgeColor: "bg-[#cb3837] text-white",
      tag: "GLOBAL CLI RUNTIME",
      command: "npx sagarithm-kit init",
      link: "https://www.npmjs.com/package/sagarithm-kit",
      desc: "Live public release v1.0.1",
    },
    {
      id: "github",
      name: "GitHub Packages",
      badge: "GH",
      badgeColor: "bg-ink text-white",
      tag: "CONTAINER & NPM REGISTRY",
      command: "npm i @sagarithm/sagarithm-kit",
      link: "https://github.com/sagarithm/sagarithm-kit/pkgs/npm/sagarithm-kit",
      desc: "Scoped enterprise package",
    },
    {
      id: "adapters",
      name: "Multi-Agent Adapters",
      badge: "AI",
      badgeColor: "bg-heat text-white",
      tag: "6 TARGET RUNTIMES",
      command: "sagarithm sync --target all",
      link: "https://github.com/sagarithm/sagarithm-kit#universal-agent-adapters",
      desc: "Cursor • Antigravity • Claude Code",
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="shell full-rule">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-edge bg-canvas-surface">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="group relative flex flex-col justify-between p-6 transition-all duration-150 hover:bg-heat/5 hover:shadow-[inset_0_2px_#fa5d19]"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs font-bold ${pkg.badgeColor}`}
                  >
                    {pkg.badge}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-ink group-hover:text-heat-dark transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="font-mono text-[10px] tracking-wider text-ink-48 uppercase">{pkg.tag}</p>
                  </div>
                </div>
                <a
                  href={pkg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-32 group-hover:text-heat transition-colors p-1"
                  title="Open in new tab"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-3 text-xs text-ink-64">{pkg.desc}</p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-edge flex items-center justify-between">
              <code className="font-mono text-xs text-ink-64 truncate mr-2">{pkg.command}</code>
              <button
                onClick={() => handleCopy(pkg.id, pkg.command)}
                className="flex items-center gap-1 rounded border border-edge bg-canvas-base px-2 py-1 font-mono text-[10px] text-ink-48 hover:border-ink-32 hover:text-ink transition-all"
                title="Copy snippet"
              >
                {copiedId === pkg.id ? (
                  <>
                    <Check className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
