import React from "react";
import Link from "next/link";
import { Github, ExternalLink, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="full-rule bg-canvas-base border-t border-edge">
      <div className="shell">
        <div className="pad py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Col 1: Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 font-medium tracking-tight">
                <img
                  src="/sagarithm-symbol-triskelion-black.png"
                  alt="Sagarithm logo"
                  className="h-6 w-6 rounded-md shadow-xs object-contain"
                />
                <span className="font-mono text-sm font-semibold tracking-tight text-ink">sagarithm-kit</span>
                <span className="rounded border border-edge bg-canvas-surface px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-48">
                  v1.0.0
                </span>
              </div>
              <p className="mt-3 max-w-sm text-xs text-ink-64 leading-relaxed">
                Universal cross-agent engineering framework. Equipping AI coding agents with architectural
                governance, empirical verification, and quality gates.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-ink-48">
                <a
                  href="https://kit.sagarithm.in"
                  className="text-heat font-medium hover:underline flex items-center gap-1"
                >
                  <span>kit.sagarithm.in</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-edge">•</span>
                <a
                  href="https://www.sagarithm.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-heat transition-colors flex items-center gap-1"
                >
                  <span>sagarithm.in</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-48 mb-3">
                Framework
              </h4>
              <ul className="space-y-2 font-mono text-xs text-ink-64">
                <li>
                  <Link href="#studio" className="hover:text-heat transition-colors">
                    Studio
                  </Link>
                </li>
                <li>
                  <Link href="#capabilities" className="hover:text-heat transition-colors">
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="#architecture" className="hover:text-heat transition-colors">
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="#benchmark" className="hover:text-heat transition-colors">
                    Benchmark
                  </Link>
                </li>
                <li>
                  <Link href="#cli" className="hover:text-heat transition-colors">
                    Usage
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Ecosystem */}
            <div>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-48 mb-3">
                Ecosystem
              </h4>
              <ul className="space-y-2 font-mono text-xs text-ink-64">
                <li>
                  <a
                    href="https://www.npmjs.com/package/sagarithm-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-heat transition-colors flex items-center gap-1.5"
                  >
                    <span>npm Registry</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sagarithm/sagarithm-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-heat transition-colors flex items-center gap-1.5"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sagarithm/sagarithm-kit/pkgs/npm/sagarithm-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-heat transition-colors flex items-center gap-1.5"
                  >
                    <span>GitHub Packages</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://paypal.me/thesagarithm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-heat font-medium hover:underline flex items-center gap-1.5"
                  >
                    <span>Donate via PayPal</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-edge flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-ink-48">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-heat" />
              <span className="font-medium text-ink-64">Built by Builder for Builders</span>
            </div>
            <div>
              <span>Sagarithm</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
