import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { SagarithmConfig } from './types.ts';

export const DEFAULT_CONFIG: SagarithmConfig = {
  version: '1.0.0',
  name: 'sagarithm-workspace',
  targets: ['cursor', 'claude-code', 'copilot', 'antigravity', 'windsurf', 'codex'],
  riskThreshold: 'high',
  enabledDomains: [
    'architecture',
    'quality',
    'testing',
    'security',
    'documentation'
  ],
  paths: {
    constitution: './constitution',
    skills: './skills',
    policies: './policies',
    workflows: './workflows',
    adapters: './adapters'
  }
};

export function findWorkspaceRoot(cwd: string = process.cwd()): string {
  let current = cwd;
  while (true) {
    if (
      existsSync(resolve(current, 'sagarithm.config.json')) ||
      existsSync(resolve(current, 'ARCHITECTURE.md')) ||
      existsSync(resolve(current, '.git'))
    ) {
      return current;
    }
    const parent = resolve(current, '..');
    if (parent === current) break;
    current = parent;
  }
  return cwd;
}

export function loadConfig(rootDir: string): SagarithmConfig {
  const configPath = resolve(rootDir, 'sagarithm.config.json');
  if (!existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }
  try {
    const raw = readFileSync(configPath, 'utf8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(rootDir: string, config: SagarithmConfig): void {
  const configPath = resolve(rootDir, 'sagarithm.config.json');
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
}
