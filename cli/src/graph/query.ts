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
