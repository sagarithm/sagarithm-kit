import { resolve } from 'node:path';
import { loadConfig } from '../config.ts';
import { listMarkdownFiles, readCanonicalArtifact } from '../compiler/parser.ts';
import { compileForTarget, type CompilationContext } from '../compiler/emitter.ts';
import type { TargetAgent } from '../types.ts';

import { existsSync } from 'node:fs';

function resolveCanonicalDir(rootDir: string, relPath: string): string {
  const local = resolve(rootDir, relPath);
  if (existsSync(local) && listMarkdownFiles(local).length > 0) {
    return local;
  }
  const candidates = [
    resolve(import.meta.dirname, '../..', relPath),
    resolve(import.meta.dirname, '..', relPath),
    resolve(import.meta.dirname, '../../..', relPath)
  ];
  for (const cand of candidates) {
    if (existsSync(cand) && listMarkdownFiles(cand).length > 0) {
      return cand;
    }
  }
  return local;
}

export function runSync(rootDir: string, args: string[]): void {
  console.log('🔄 Syncing Sagarithm Kit canonical specifications to target agents...');

  const config = loadConfig(rootDir);

  // Load canonical layers with package fallback
  const constitutionDir = resolveCanonicalDir(rootDir, config.paths.constitution);
  const skillsDir = resolveCanonicalDir(rootDir, config.paths.skills);
  const policiesDir = resolveCanonicalDir(rootDir, config.paths.policies);
  const workflowsDir = resolveCanonicalDir(rootDir, config.paths.workflows);

  const constitutionFiles = listMarkdownFiles(constitutionDir);
  const skillFiles = listMarkdownFiles(skillsDir).filter(f => f.endsWith('SKILL.md'));
  const policyFiles = listMarkdownFiles(policiesDir).filter(f => !f.endsWith('README.md'));
  const workflowFiles = listMarkdownFiles(workflowsDir).filter(f => !f.endsWith('README.md'));

  const ctx: CompilationContext = {
    rootDir,
    constitution: constitutionFiles.map(readCanonicalArtifact),
    skills: skillFiles.map(readCanonicalArtifact),
    policies: policyFiles.map(readCanonicalArtifact),
    workflows: workflowFiles.map(readCanonicalArtifact)
  };

  console.log(`📦 Loaded canonical assets: ${ctx.constitution.length} articles, ${ctx.skills.length} skills, ${ctx.policies.length} policies, ${ctx.workflows.length} workflows.`);

  let targetList: TargetAgent[] = config.targets;

  // Filter if user specified --target <agent>
  const targetFlagIdx = args.indexOf('--target');
  if (targetFlagIdx !== -1 && args[targetFlagIdx + 1]) {
    targetList = [args[targetFlagIdx + 1] as TargetAgent];
  }

  let totalEmitted = 0;
  for (const target of targetList) {
    const emitted = compileForTarget(target, ctx);
    totalEmitted += emitted.length;
    console.log(`  ✓ Compiled for [${target}]: ${emitted.length} files updated.`);
  }

  console.log(`✨ Sync complete! Updated ${totalEmitted} target configuration files.`);
}
