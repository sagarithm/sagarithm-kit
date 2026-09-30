import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import type { AuditIssue } from '../types.ts';
import { buildProjectGraph } from '../graph/indexer.ts';
import type { ProjectGraph } from '../graph/types.ts';

export interface TopologyNode {
  id: string;
  path: string;
  exports?: string[];
  imports?: string[];
}

export interface TopologyEdge {
  source: string;
  target: string;
  type?: string;
}

export interface ProjectTopologyGraph {
  version?: string;
  indexedAt?: string;
  nodes: TopologyNode[];
  edges: TopologyEdge[];
}

const PROHIBITED_DIR_NAMES = new Set(['utils', 'helpers', 'misc', 'common']);
const IGNORED_DIRS = new Set(['node_modules', '.git', '.sagarithm', 'dist', 'build', '.gemini']);

/**
 * Recursively scans directory structure to detect prohibited generic folder names.
 */
export function checkDirectoryFitness(dir: string, rootDir: string): AuditIssue[] {
  const issues: AuditIssue[] = [];

  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (IGNORED_DIRS.has(entry)) continue;

      const fullPath = resolve(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        const lowerName = entry.toLowerCase();
        if (PROHIBITED_DIR_NAMES.has(lowerName)) {
          const relPath = relative(rootDir, fullPath).replace(/\\/g, '/');
          issues.push({
            ruleId: 'policy.directory-creation.arch-001',
            severity: 'error',
            file: relPath,
            message: `Prohibited generic directory detected: '${relPath}'. Violates single responsibility & bounded context policy.`,
            remediation: 'Colocate utilities with their owning domain module or rename to a domain-named capability directory.'
          });
        }
        // Recursively inspect subdirectories
        issues.push(...checkDirectoryFitness(fullPath, rootDir));
      }
    }
  } catch {
    // Directory unreadable
  }

  return issues;
}

/**
 * Checks for circular dependency cycles within the project topology graph.
 */
export function checkGraphAcyclicity(graph: ProjectTopologyGraph): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const cycles: string[][] = [];

  function dfs(nodeId: string, currentPath: string[]) {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const outgoing = graph.edges.filter((e) => e.source === nodeId);
    for (const edge of outgoing) {
      if (!visited.has(edge.target)) {
        dfs(edge.target, [...currentPath, edge.target]);
      } else if (recursionStack.has(edge.target)) {
        // Cycle detected
        const cycleStartIndex = currentPath.indexOf(edge.target);
        if (cycleStartIndex !== -1) {
          cycles.push([...currentPath.slice(cycleStartIndex), edge.target]);
        }
      }
    }

    recursionStack.delete(nodeId);
  }

  for (const node of graph.nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id, [node.id]);
    }
  }

  for (const cycle of cycles) {
    issues.push({
      ruleId: 'policy.architecture-fitness.arch-002',
      severity: 'error',
      message: `Circular dependency detected in graph: ${cycle.join(' -> ')}`,
      remediation: 'Break the circular dependency cycle using dependency inversion, events, or shared interfaces.'
    });
  }

  return issues;
}

/**
 * Converts a ProjectGraph into a ProjectTopologyGraph for cycle analysis.
 */
export function buildTopologyFromProject(projectGraph: ProjectGraph): ProjectTopologyGraph {
  const nodes: TopologyNode[] = projectGraph.modules.map((m) => ({
    id: m.name,
    path: m.path
  }));

  const edges: TopologyEdge[] = [];
  for (const mod of projectGraph.modules) {
    for (const imp of mod.imports) {
      for (const other of projectGraph.modules) {
        if (other.name !== mod.name && (imp.includes(other.name) || other.files.some((f) => imp.endsWith(f)))) {
          edges.push({ source: mod.name, target: other.name, type: 'import' });
        }
      }
    }
  }

  return { nodes, edges };
}

/**
 * Evaluates full architectural fitness for a workspace.
 */
export function evaluateArchitecturalFitness(rootDir: string): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // 1. Directory hygiene
  issues.push(...checkDirectoryFitness(rootDir, rootDir));

  // 2. Topology graph acyclicity
  try {
    const projectGraph = buildProjectGraph(rootDir);
    const topo = buildTopologyFromProject(projectGraph);
    issues.push(...checkGraphAcyclicity(topo));
  } catch {
    // If graph indexing fails or workspace lacks files, ignore
  }

  // 3. Manifest conformance
  const manifestPath = resolve(rootDir, 'sagarithm.manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      if (manifest.entrypoints && Array.isArray(manifest.entrypoints)) {
        for (const entry of manifest.entrypoints) {
          const entryFile = resolve(rootDir, entry.path);
          if (!existsSync(entryFile)) {
            issues.push({
              ruleId: 'policy.architecture-fitness.arch-manifest',
              severity: 'warn',
              file: entry.path,
              message: `Declared manifest entrypoint does not exist: '${entry.path}'`,
              remediation: 'Update sagarithm.manifest.json or recreate the missing entrypoint file.'
            });
          }
        }
      }
    } catch {
      // Manifest parse failure
    }
  }

  return issues;
}
