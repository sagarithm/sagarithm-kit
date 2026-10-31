import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_CONFIG, saveConfig } from '../config.ts';
import { runSync } from './sync.ts';
import type { TargetAgent } from '../types.ts';

export function runInit(rootDir: string, flags: string[]): void {
  const isStarter = flags.includes('--starter') || flags.includes('-s');
  console.log(`🚀 Initializing Sagarithm Kit workspace${isStarter ? ' (Starter Mode)' : ''}...`);

  const configPath = resolve(rootDir, 'sagarithm.config.json');
  if (existsSync(configPath) && !flags.includes('--force') && !isStarter) {
    console.log('⚠️  Workspace is already initialized (sagarithm.config.json exists). Use --force to overwrite.');
    return;
  }

  // Auto-detect existing agent environments
  const detectedTargets: TargetAgent[] = [];
  if (
    existsSync(resolve(rootDir, '.agents')) ||
    existsSync(resolve(rootDir, 'AGENTS.md')) ||
    existsSync(resolve(rootDir, 'GEMINI.md'))
  ) {
    detectedTargets.push('antigravity');
  }
  if (existsSync(resolve(rootDir, '.cursor')) || existsSync(resolve(rootDir, '.cursorrules'))) {
    detectedTargets.push('cursor');
  }
  if (existsSync(resolve(rootDir, 'CLAUDE.md')) || existsSync(resolve(rootDir, '.claude'))) {
    detectedTargets.push('claude-code');
  }
  if (existsSync(resolve(rootDir, '.github'))) {
    detectedTargets.push('copilot');
  }
  if (existsSync(resolve(rootDir, '.windsurfrules'))) {
    detectedTargets.push('windsurf');
  }

  // Enable detected targets or default config (which includes antigravity)
  const targets = isStarter
    ? (['antigravity', 'cursor', 'claude-code', 'copilot', 'windsurf', 'codex'] as TargetAgent[])
    : (detectedTargets.length > 0
        ? (detectedTargets.includes('antigravity') ? detectedTargets : ['antigravity', ...detectedTargets] as TargetAgent[])
        : DEFAULT_CONFIG.targets);

  const config = {
    ...DEFAULT_CONFIG,
    targets
  };

  saveConfig(rootDir, config);
  console.log(`✅ Configured sagarithm.config.json with targets: ${targets.join(', ')}`);

  console.log('🔄 Compiling canonical specifications and skills into target agent environments...');
  runSync(rootDir, []);

  console.log(`
════════════════════════════════════════════════════════════════════════════════
🛡️  SAGARITHM KIT READY — CHIEF SYSTEMS ARCHITECT ACTIVATED
════════════════════════════════════════════════════════════════════════════════

All canonical skills and policies are synchronized into your workspace.
For Antigravity: loaded in .agents/skills/ and documented in AGENTS.md / GEMINI.md.
MCP Server is configured in .agents/mcp_config.json.

To begin building with high-integrity truth validation, ask your AI:

  "I have activated Sagarithm Kit. Here is what I want to build: <your idea>. 
   Validate this idea, tell me the hard architectural truths, surface hidden 
   failure points, and establish our specification before writing any code."

Your AI agent will:
  1. Act as a Chief Architect (zero blind compliance).
  2. Question assumptions and define strict Non-Goals.
  3. Formulate an atomic execution plan and TDD verification matrix.
  4. Enforce Zero Assumed Success [VERIFIED] state across all code.
════════════════════════════════════════════════════════════════════════════════
`);
}
