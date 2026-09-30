import { resolve } from 'node:path';
import { loadConfig } from '../config.ts';
import { listMarkdownFiles, readCanonicalArtifact } from '../compiler/parser.ts';
import { compileForTarget, type CompilationContext } from '../compiler/emitter.ts';
import type { TargetAgent } from '../types.ts';

export function runSync(rootDir: string, args: string[]): void {
  console.log('🔄 Syncing Sagarithm Kit canonical specifications to target agents...');

  const config = loadConfig(rootDir);

  // Load canonical layers
  const constitutionFiles = listMarkdownFiles(resolve(rootDir, config.paths.constitution));
  const skillFiles = listMarkdownFiles(resolve(rootDir, config.paths.skills)).filter(f => f.endsWith('SKILL.md'));
  const policyFiles = listMarkdownFiles(resolve(rootDir, config.paths.policies)).filter(f => !f.endsWith('README.md'));
  const workflowFiles = listMarkdownFiles(resolve(rootDir, config.paths.workflows)).filter(f => !f.endsWith('README.md'));

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
