import type { BlastRadiusResult, ProjectGraph } from './types.ts';

export function findExistingAbstractions(graph: ProjectGraph, query: string): Array<{ symbol: string; module: string; files: string[] }> {
  const normalized = query.toLowerCase();
  const results: Array<{ symbol: string; module: string; files: string[] }> = [];

  for (const mod of graph.modules) {
    for (const exp of mod.exports) {
      if (exp.toLowerCase().includes(normalized)) {
        results.push({
          symbol: exp,
          module: mod.name,
          files: mod.files.filter(f => !f.includes('.test.') && !f.includes('.spec.'))
        });
      }
    }
  }

  return results;
}

export function calculateBlastRadius(graph: ProjectGraph, targetFile: string): BlastRadiusResult {
  const normalizedTarget = targetFile.replace(/\\/g, '/');
  const targetBase = normalizedTarget.replace(/\.[^/.]+$/, ''); // Strip extension

  const affectedModules = new Set<string>();
  const affectedTests = new Set<string>();

  for (const mod of graph.modules) {
    // Check if module imports the target file directly or by relative path
    const importsTarget = mod.imports.some(imp => {
      return normalizedTarget.includes(imp) || imp.includes(targetBase);
    });

    const containsTarget = mod.files.includes(normalizedTarget);

    if (importsTarget || containsTarget) {
      affectedModules.add(mod.name);
      for (const t of mod.tests) {
        affectedTests.add(t);
      }
    }
  }

  return {
    targetPath: normalizedTarget,
    affectedModules: Array.from(affectedModules),
    affectedTests: Array.from(affectedTests)
  };
}

export function suggestModuleLocation(graph: ProjectGraph, domainHint?: string): string {
  if (domainHint) {
    const matchingModule = graph.modules.find(m => m.name.toLowerCase().includes(domainHint.toLowerCase()));
    if (matchingModule) {
      return matchingModule.path;
    }
  }

  // Fallback to highest cohesion existing domain directory or src
  const srcModule = graph.modules.find(m => m.name.startsWith('src/'));
  if (srcModule) {
    return srcModule.path;
  }

  return 'src';
}

export interface SystemComplexityMetrics {
  totalModules: number;
  totalFiles: number;
  totalExports: number;
  afferentCoupling: Record<string, number>; // Ca (incoming dependents)
  efferentCoupling: Record<string, number>; // Ce (outgoing dependencies)
  instability: Record<string, number>; // I = Ce / (Ca + Ce)
  averageInstability: number;
}

export function calculateSystemComplexity(graph: ProjectGraph): SystemComplexityMetrics {
  const Ca: Record<string, number> = {};
  const Ce: Record<string, number> = {};
  const instability: Record<string, number> = {};

  for (const mod of graph.modules) {
    Ca[mod.name] = 0;
    Ce[mod.name] = 0;
  }

  for (const mod of graph.modules) {
    for (const other of graph.modules) {
      if (mod.name === other.name) continue;
      const dependsOnOther = mod.imports.some((imp) => imp.includes(other.name) || other.files.some((f) => imp.endsWith(f)));
      if (dependsOnOther) {
        Ce[mod.name] = (Ce[mod.name] || 0) + 1;
        Ca[other.name] = (Ca[other.name] || 0) + 1;
      }
    }
  }

  let totalInstability = 0;
  let evaluatedModules = 0;

  for (const mod of graph.modules) {
    const ca = Ca[mod.name] || 0;
    const ce = Ce[mod.name] || 0;
    const denom = ca + ce;
    const inst = denom === 0 ? 0 : Number((ce / denom).toFixed(2));
    instability[mod.name] = inst;
    totalInstability += inst;
    evaluatedModules++;
  }

  const totalExports = graph.modules.reduce((acc, m) => acc + m.exports.length, 0);

  return {
    totalModules: graph.modules.length,
    totalFiles: graph.allFiles.length,
    totalExports,
    afferentCoupling: Ca,
    efferentCoupling: Ce,
    instability,
    averageInstability: evaluatedModules === 0 ? 0 : Number((totalInstability / evaluatedModules).toFixed(2))
  };
}

export function detectOrphanAbstractions(graph: ProjectGraph): Array<{ symbol: string; module: string }> {
  const orphans: Array<{ symbol: string; module: string }> = [];

  const allImportStatements = graph.modules.flatMap((m) => m.imports);

  for (const mod of graph.modules) {
    for (const exp of mod.exports) {
      const isReferencedInImports = allImportStatements.some((imp) => imp.includes(exp));
      if (!isReferencedInImports) {
        orphans.push({
          symbol: exp,
          module: mod.name
        });
      }
    }
  }

  return orphans;
}

