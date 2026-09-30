import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildProjectGraph } from '../graph/indexer.ts';
import { calculateBlastRadius, findExistingAbstractions, suggestModuleLocation, calculateSystemComplexity, detectOrphanAbstractions } from '../graph/query.ts';

export function runContext(rootDir: string, args: string[]): void {
  const subCommand = args[0] || 'generate';

  console.log('🧠 Running Sagarithm Project Intelligence...');
  const graph = buildProjectGraph(rootDir);

  switch (subCommand) {
    case 'generate': {
      const manifestPath = resolve(rootDir, 'sagarithm.manifest.json');
      const manifestData = {
        version: '1.0.0',
        name: graph.name,
        totalFiles: graph.allFiles.length,
        modules: graph.modules.map(m => ({
          name: m.name,
          path: m.path,
          fileCount: m.files.length,
          exports: m.exports,
          tests: m.tests
        })),
        dependencies: graph.dependencies
      };
      writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2) + '\n', 'utf8');
      console.log(`✅ Project graph generated: Indexed ${graph.modules.length} modules, ${graph.allFiles.length} files.`);
      console.log(`📄 Saved topology manifest to sagarithm.manifest.json`);
      break;
    }

    case 'stats': {
      const metrics = calculateSystemComplexity(graph);
      console.log('📊 Architectural System Complexity & Coupling Metrics:');
      console.log(`  - Total Modules: ${metrics.totalModules}`);
      console.log(`  - Total Files:   ${metrics.totalFiles}`);
      console.log(`  - Total Exports: ${metrics.totalExports}`);
      console.log(`  - Average Architectural Instability: ${metrics.averageInstability} (0.0 = maximal stability, 1.0 = maximal instability)\n`);
      console.log('  Module Breakdown:');
      for (const [mod, inst] of Object.entries(metrics.instability)) {
        const ca = metrics.afferentCoupling[mod] || 0;
        const ce = metrics.efferentCoupling[mod] || 0;
        console.log(`    ↳ [${mod}] Ca: ${ca} (inbound) | Ce: ${ce} (outbound) | Instability: ${inst}`);
      }
      break;
    }

    case 'orphans': {
      console.log('🔍 Scanning workspace for unused / unimported exports...');
      const orphans = detectOrphanAbstractions(graph);
      if (orphans.length === 0) {
        console.log('✅ Clean! No unimported public abstractions detected.');
      } else {
        console.log(`⚠️  Found ${orphans.length} unreferenced exported symbol(s):`);
        for (const o of orphans.slice(0, 10)) {
          console.log(`  - [${o.module}] ${o.symbol}`);
        }
        if (orphans.length > 10) {
          console.log(`  ... and ${orphans.length - 10} more.`);
        }
      }
      break;
    }

    case 'find': {
      const query = args[1];
      if (!query) {
        console.log('❌ Error: Please specify a search query (e.g. `sagarithm context find AuthService`)');
        process.exitCode = 1;
        return;
      }
      console.log(`🔍 Searching for existing abstractions matching '${query}'...`);
      const matches = findExistingAbstractions(graph, query);
      if (matches.length === 0) {
        console.log(`ℹ️  No existing abstraction found matching '${query}'.`);
      } else {
        console.log(`🎯 Found ${matches.length} matching abstraction(s):`);
        for (const m of matches) {
          console.log(`  - Symbol: ${m.symbol} (in module: '${m.module}')`);
          for (const f of m.files.slice(0, 3)) {
            console.log(`    ↳ ${f}`);
          }
        }
      }
      break;
    }

    case 'blast-radius': {
      const targetFile = args[1];
      if (!targetFile) {
        console.log('❌ Error: Please specify a target file (e.g. `sagarithm context blast-radius src/auth/jwt.ts`)');
        process.exitCode = 1;
        return;
      }
      const result = calculateBlastRadius(graph, targetFile);
      console.log(`💥 Blast Radius Analysis for: ${result.targetPath}`);
      console.log(`  - Affected Modules (${result.affectedModules.length}): ${result.affectedModules.join(', ') || 'None'}`);
      console.log(`  - Associated Test Suites (${result.affectedTests.length}):`);
      for (const t of result.affectedTests) {
        console.log(`    ↳ ${t}`);
      }
      break;
    }

    case 'suggest-location': {
      const domainHint = args[1];
      const suggestion = suggestModuleLocation(graph, domainHint);
      console.log(`📍 Location Suggestion for domain '${domainHint || 'general'}':`);
      console.log(`  ↳ Place new files in: '${suggestion}' (adheres to policy.directory-creation)`);
      break;
    }

    default:
      console.log(`Unknown context action '${subCommand}'. Supported: generate, stats, orphans, find, blast-radius, suggest-location.`);
      break;
  }
}
