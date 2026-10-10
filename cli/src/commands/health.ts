import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildProjectGraph } from '../graph/indexer.ts';
import { detectOrphanAbstractions, calculateSystemComplexity } from '../graph/query.ts';
import { scanContentForSecrets } from '../validation/secrets.ts';

export interface CodebaseHealthMetrics {
  totalScore: number;
  grade: string;
  badge: string;
  hygieneScore: number;
  modularityScore: number;
  maintenanceScore: number;
  securityScore: number;
  testingScore: number;
  violations: string[];
  totalFiles: number;
  totalModules: number;
  orphanCount: number;
  secretCount: number;
  avgInstability: number;
}

export function evaluateCodebaseHealth(rootDir: string): CodebaseHealthMetrics {
  const graph = buildProjectGraph(rootDir);
  const orphans = detectOrphanAbstractions(graph);

  // 1. Structural Hygiene (Max 25 pts)
  let hygieneScore = 25;
  const forbiddenFolders = ['utils', 'helpers', 'src/utils', 'src/helpers', 'common', 'misc'];
  const violations: string[] = [];
  for (const f of forbiddenFolders) {
    if (existsSync(resolve(rootDir, f))) {
      hygieneScore = Math.max(0, hygieneScore - 10);
      violations.push(f);
    }
  }

  // 2. Modularity & Coupling (Max 25 pts)
  let modularityScore = 25;
  let totalInstability = 0;
  let measuredModules = 0;
  for (const mod of graph.modules) {
    const complexity = calculateSystemComplexity(graph, mod.name);
    if (complexity.afferentCoupling > 0 || complexity.efferentCoupling > 0) {
      totalInstability += complexity.instability;
      measuredModules++;
    }
  }
  const avgInstability = measuredModules > 0 ? totalInstability / measuredModules : 0;
  if (avgInstability > 0.8) modularityScore -= 8;
  if (graph.modules.length < 2 && graph.allFiles.length > 15) modularityScore -= 10; // Monolithic sprawl

  // 3. Maintenance & Dead Code (Max 20 pts)
  let maintenanceScore = 20;
  const orphanRatio = graph.modules.length > 0 && graph.allFiles.length > 0
    ? orphans.length / Math.max(1, graph.allFiles.length)
    : 0;
  if (orphanRatio > 0.5) maintenanceScore -= 15;
  else if (orphanRatio > 0.2) maintenanceScore -= 8;

  // 4. Security & Entropy (Max 20 pts)
  let securityScore = 20;
  let secretCount = 0;
  for (const file of graph.allFiles.slice(0, 50)) {
    try {
      const fullPath = resolve(rootDir, file);
      if (existsSync(fullPath)) {
        const content = readFileSync(fullPath, 'utf8');
        const issues = scanContentForSecrets(content, file);
        secretCount += issues.length;
      }
    } catch {
      // Ignore read errors
    }
  }
  if (secretCount > 0) securityScore = Math.max(0, securityScore - (secretCount * 5));

  // 5. Verification & Testing Density (Max 10 pts)
  let testingScore = 10;
  let testCount = 0;
  for (const mod of graph.modules) {
    testCount += mod.tests.length;
  }
  if (testCount === 0) testingScore = 2;
  else if (testCount < 3) testingScore = 6;

  const totalScore = hygieneScore + modularityScore + maintenanceScore + securityScore + testingScore;

  let grade = 'A+';
  let badge = '✅ EXCELLENT';
  if (totalScore < 60) {
    grade = 'F';
    badge = '🚨 CRITICAL';
  } else if (totalScore < 75) {
    grade = 'C';
    badge = '⚠️  AT RISK';
  } else if (totalScore < 90) {
    grade = 'B+';
    badge = '⚡ HEALTHY';
  }

  return {
    totalScore,
    grade,
    badge,
    hygieneScore,
    modularityScore,
    maintenanceScore,
    securityScore,
    testingScore,
    violations,
    totalFiles: graph.allFiles.length,
    totalModules: graph.modules.length,
    orphanCount: orphans.length,
    secretCount,
    avgInstability
  };
}

export function runHealth(rootDir: string, args: string[]): void {
  console.log('⚡ Computing Sagarithm Comprehensive Codebase Health Index...\n');

  const metrics = evaluateCodebaseHealth(rootDir);
  const {
    totalScore,
    grade,
    badge,
    hygieneScore,
    modularityScore,
    maintenanceScore,
    securityScore,
    testingScore,
    violations,
    totalFiles,
    totalModules,
    orphanCount,
    secretCount
  } = metrics;

  const barFilled = Math.round(totalScore / 5);
  const bar = '█'.repeat(barFilled) + '░'.repeat(20 - barFilled);

  console.log(`╔══════════════════════════════════════════════════════════════════════╗`);
  console.log(`║               SAGARITHM CODEBASE HEALTH DASHBOARD                    ║`);
  console.log(`╚══════════════════════════════════════════════════════════════════════╝`);
  console.log(`\n  OVERALL HEALTH INDEX: [${bar}] ${totalScore}/100 (Grade: ${grade})`);
  console.log(`  STATUS EVALUATION:    ${badge}\n`);

  console.log(`┌────────────────────────────────┬────────────┬────────────────────────┐`);
  console.log(`│ Health Dimension               │ Score      │ Benchmark Target       │`);
  console.log(`├────────────────────────────────┼────────────┼────────────────────────┤`);
  console.log(`│ 1. Structural Hygiene          │ ${String(hygieneScore).padStart(2)} / 25 pts │ Zero generic dumpsters │`);
  console.log(`│ 2. Modularity & Coupling       │ ${String(modularityScore).padStart(2)} / 25 pts │ Avg Instability <= 0.6 │`);
  console.log(`│ 3. Dead Code & Orphan Ratio    │ ${String(maintenanceScore).padStart(2)} / 20 pts │ Orphan exports < 15%   │`);
  console.log(`│ 4. Secret & Entropy Defense    │ ${String(securityScore).padStart(2)} / 20 pts │ Zero H >= 4.5 secrets  │`);
  console.log(`│ 5. Automated Test Density      │ ${String(testingScore).padStart(2)} / 10 pts │ Comprehensive TDD      │`);
  console.log(`└────────────────────────────────┴────────────┴────────────────────────┘`);

  console.log(`\n📊 Topology Telemetry:`);
  console.log(`  • Indexed Files:        ${totalFiles}`);
  console.log(`  • Bounded Modules:      ${totalModules}`);
  console.log(`  • Orphan Abstractions:  ${orphanCount} detected`);
  console.log(`  • Secret Leak Flags:    ${secretCount} detected`);

  if (violations.length > 0 || orphanCount > 0 || secretCount > 0) {
    console.log(`\n💡 Recommended Remediation Priorities:`);
    if (violations.length > 0) {
      console.log(`  1. Remove or refactor generic folders: ${violations.join(', ')}`);
    }
    if (orphanCount > 0) {
      console.log(`  2. Run 'sagarithm context orphans' to eliminate ${orphanCount} unused export(s).`);
    }
    if (secretCount > 0) {
      console.log(`  3. Run 'sagarithm audit --fix' to quarantine exposed credentials.`);
    }
  } else {
    console.log(`\n🏆 Pristine Architecture: All health dimensions conform to Sagarithm Kit standards.`);
  }

  if (args.includes('--json')) {
    console.log('\n' + JSON.stringify({
      totalScore,
      grade,
      hygieneScore,
      modularityScore,
      maintenanceScore,
      securityScore,
      testingScore,
      orphansCount: orphans.length,
      secretCount
    }, null, 2));
  }
}
