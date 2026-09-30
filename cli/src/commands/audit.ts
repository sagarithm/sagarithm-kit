import { readdirSync, statSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import type { AuditIssue } from '../types.ts';
import { scanGitDiffForSecrets, scanFilesForSecrets } from '../validation/secrets.ts';
import { evaluateArchitecturalFitness } from '../validation/fitness.ts';

function findWorkspaceFiles(dir: string, rootDir: string): string[] {
  const IGNORE = new Set(['node_modules', '.git', '.sagarithm', 'dist', 'build', '.gemini']);
  const files: string[] = [];

  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (IGNORE.has(entry)) continue;
      const fullPath = resolve(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...findWorkspaceFiles(fullPath, rootDir));
      } else if (stat.isFile()) {
        const rel = relative(rootDir, fullPath).replace(/\\/g, '/');
        // Only scan non-test source/config files
        if (
          /\.(?:ts|js|mjs|cjs|json|md|yaml|yml|html|css|py|sh|env)$/i.test(entry) &&
          !entry.includes('.test.') &&
          !entry.includes('.spec.')
        ) {
          files.push(rel);
        }
      }
    }
  } catch {
    // Ignore read errors
  }

  return files;
}

export function runAudit(rootDir: string, args: string[] = []): void {
  const isDeep = args.includes('--deep');
  const isStrict = args.includes('--strict');
  const isJson = args.includes('--json');

  if (!isJson) {
    console.log(`🔍 Auditing workspace against active Sagarithm policies (${isDeep ? 'Deep Scan' : 'Git Diff Scan'})...`);
  }

  const issues: AuditIssue[] = [];

  // 1. Secrets & Injection Hygiene Scan
  if (isDeep) {
    const files = findWorkspaceFiles(rootDir, rootDir);
    issues.push(...scanFilesForSecrets(rootDir, files));
  } else {
    issues.push(...scanGitDiffForSecrets(rootDir));
  }

  // 2. Architectural Fitness Scan
  issues.push(...evaluateArchitecturalFitness(rootDir));

  // 3. Formatting and Output
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warn');

  if (isJson) {
    console.log(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          mode: isDeep ? 'deep' : 'diff',
          summary: {
            totalIssues: issues.length,
            errors: errors.length,
            warnings: warnings.length
          },
          issues
        },
        null,
        2
      )
    );
  } else {
    if (issues.length === 0) {
      console.log('✅ Audit clean! Zero policy violations detected in workspace.');
    } else {
      console.log(`\n⚠️  Audit identified ${issues.length} issue(s) (${errors.length} error(s), ${warnings.length} warning(s)):`);
      for (const issue of issues) {
        const location = issue.file ? ` [${issue.file}${issue.line ? `:${issue.line}` : ''}]` : '';
        console.log(`  [${issue.severity.toUpperCase()}] ${issue.ruleId}${location}: ${issue.message}`);
        console.log(`    ↳ Remediation: ${issue.remediation}`);
      }
    }
  }

  if (errors.length > 0 || (isStrict && warnings.length > 0)) {
    process.exitCode = 1;
  }
}
