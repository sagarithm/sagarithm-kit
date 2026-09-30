import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_CONFIG, saveConfig } from '../config.ts';
import type { TargetAgent } from '../types.ts';

export function runInit(rootDir: string, flags: string[]): void {
  console.log('🚀 Initializing Sagarithm Kit workspace...');

  const configPath = resolve(rootDir, 'sagarithm.config.json');
  if (existsSync(configPath) && !flags.includes('--force')) {
    console.log('⚠️  Workspace is already initialized (sagarithm.config.json exists). Use --force to overwrite.');
    return;
  }

  // Auto-detect existing agent environments
  const detectedTargets: TargetAgent[] = [];
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

  const targets = detectedTargets.length > 0 ? detectedTargets : DEFAULT_CONFIG.targets;

  const config = {
    ...DEFAULT_CONFIG,
    targets
  };

  saveConfig(rootDir, config);
  console.log(`✅ Created sagarithm.config.json with targets: ${targets.join(', ')}`);
  console.log('💡 Run `sagarithm sync` to compile canonical specifications into target configurations.');
}
