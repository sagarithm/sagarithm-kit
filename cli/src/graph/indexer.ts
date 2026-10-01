import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import type { ModuleNode, ProjectGraph } from './types.ts';

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.gemini',
  '.agents/scratch',
  'coverage'
]);

export function scanRepositoryFiles(rootDir: string): string[] {
  const fileList: string[] = [];

  function walk(current: string) {
    const entries = readdirSync(current);
    for (const entry of entries) {
      if (IGNORED_DIRS.has(entry)) continue;
      const fullPath = join(current, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        fileList.push(fullPath);
      }
    }
  }

  walk(rootDir);
  return fileList;
}

export function extractExports(fileContent: string): string[] {
  const exports: string[] = [];
  // Match export (function|class|const|let|var|interface|type) Name
  const exportRegex = /export\s+(?:default\s+)?(?:async\s+)?(?:function|class|const|let|var|interface|type)\s+([a-zA-Z0-9_$]+)/g;
  let match: RegExpExecArray | null;
  while ((match = exportRegex.exec(fileContent)) !== null) {
    exports.push(match[1]);
  }
  return exports;
}

export function extractImports(fileContent: string): string[] {
  const imports: string[] = [];
  // Match import ... from '...'
  const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(fileContent)) !== null) {
    imports.push(match[1]);
  }
  return imports;
}

export function buildProjectGraph(rootDir: string): ProjectGraph {
  const allFiles = scanRepositoryFiles(rootDir);
  const relativeFiles = allFiles.map(f => relative(rootDir, f).replace(/\\/g, '/'));

  // Group files into modules by immediate subdirectory under src/ or top-level directory
  const moduleMap = new Map<string, { files: string[]; exports: string[]; imports: string[]; tests: string[] }>();

  for (const relPath of relativeFiles) {
    const parts = relPath.split('/');
    let moduleName = 'root';
    if (parts.length > 1) {
      moduleName = parts[0] === 'src' && parts.length > 2 ? `${parts[0]}/${parts[1]}` : parts[0];
    }

    if (!moduleMap.has(moduleName)) {
      moduleMap.set(moduleName, { files: [], exports: [], imports: [], tests: [] });
    }

    const mod = moduleMap.get(moduleName)!;
    mod.files.push(relPath);

    if (relPath.includes('.test.') || relPath.includes('.spec.')) {
      mod.tests.push(relPath);
    }

    // Extract AST symbols from text files
    if (/\.(ts|tsx|js|jsx|mjs|py|rs|go)$/.test(relPath)) {
      try {
        const content = readFileSync(resolve(rootDir, relPath), 'utf8');
        mod.exports.push(...extractExports(content));
        mod.imports.push(...extractImports(content));
      } catch {
        // Ignore unreadable files
      }
    }
  }

  const modules: ModuleNode[] = [];
  for (const [name, data] of moduleMap.entries()) {
    modules.push({
      name,
      path: name === 'root' ? '.' : name,
      files: data.files,
      exports: Array.from(new Set(data.exports)),
      imports: Array.from(new Set(data.imports)),
      tests: data.tests
    });
  }

  // Load package.json dependencies if available
  let dependencies: Record<string, string> = {};
  const pkgPath = resolve(rootDir, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
    } catch {
      // Ignore invalid JSON
    }
  }

  return {
    version: '1.0.1',
    name: 'sagarithm-project',
    rootPath: rootDir,
    modules,
    allFiles: relativeFiles,
    dependencies
  };
}
