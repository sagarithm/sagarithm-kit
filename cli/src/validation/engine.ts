import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ValidationReport, VerificationState, VectorResult, AuditIssue } from '../types.ts';
import { scanGitDiffForSecrets } from './secrets.ts';
import { evaluateArchitecturalFitness } from './fitness.ts';

export interface VerifyPipelineOptions {
  strict?: boolean;
  deep?: boolean;
  suite?: string;
}

function runNpmScript(script: string, rootDir: string) {
  if (process.platform === 'win32') {
    return spawnSync('cmd.exe', ['/c', 'npm', 'run', script], { cwd: rootDir, encoding: 'utf8' });
  }
  return spawnSync('npm', ['run', script], { cwd: rootDir, encoding: 'utf8' });
}

export function runVerificationPipeline(rootDir: string, options: VerifyPipelineOptions = {}): ValidationReport {
  const issues: AuditIssue[] = [];
  const vectors: ValidationReport['vectors'] = {};

  let testsExecuted = false;
  let testsPassed = false;
  let staticExecuted = false;
  let staticPassed = false;

  // 1. Static Vector: Lint & Typecheck
  const pkgPath = resolve(rootDir, 'package.json');
  let pkgScripts: Record<string, string> = {};
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      pkgScripts = pkg.scripts || {};
    } catch {
      // Ignore parse error
    }
  }

  const staticStart = Date.now();
  if (pkgScripts.lint || pkgScripts.typecheck) {
    staticExecuted = true;
    let allStaticOk = true;

    if (pkgScripts.lint) {
      const lintRes = runNpmScript('lint', rootDir);
      if (lintRes.status !== 0) {
        allStaticOk = false;
        issues.push({
          ruleId: 'vector.static.lint',
          severity: 'error',
          message: 'Linter reported errors or warnings.',
          remediation: 'Run `npm run lint` and resolve all formatting and syntax violations.'
        });
      }
    }

    if (pkgScripts.typecheck) {
      const typeRes = runNpmScript('typecheck', rootDir);
      if (typeRes.status !== 0) {
        allStaticOk = false;
        issues.push({
          ruleId: 'vector.static.typecheck',
          severity: 'error',
          message: 'Static type checking failed.',
          remediation: 'Run `npm run typecheck` and resolve all TypeScript diagnostics.'
        });
      }
    }

    staticPassed = allStaticOk;
    vectors.static = {
      status: allStaticOk ? 'passed' : 'failed',
      durationMs: Date.now() - staticStart
    };
  } else {
    vectors.static = {
      status: 'skipped',
      durationMs: Date.now() - staticStart,
      details: 'No lint or typecheck script configured in package.json'
    };
  }

  // 2. Security Vector: Secrets & Injection Scanning
  const secStart = Date.now();
  const secIssues = scanGitDiffForSecrets(rootDir);
  issues.push(...secIssues);
  const secFailed = secIssues.some((i) => i.severity === 'error');
  vectors.security = {
    status: secFailed ? 'failed' : secIssues.length > 0 ? 'warn' : 'passed',
    durationMs: Date.now() - secStart,
    details: `${secIssues.length} issue(s) detected`
  };

  // 3. Architecture Fitness Vector: Directories, DAG Acyclicity & Manifest
  const archStart = Date.now();
  const archIssues = evaluateArchitecturalFitness(rootDir);
  issues.push(...archIssues);
  const archFailed = archIssues.some((i) => i.severity === 'error');
  vectors.architecture = {
    status: archFailed ? 'failed' : archIssues.length > 0 ? 'warn' : 'passed',
    durationMs: Date.now() - archStart,
    details: `${archIssues.length} issue(s) detected`
  };

  // 4. Behavioral Vector: Test Execution Gate
  const testStart = Date.now();
  const testCmd = options.suite ? `test:${options.suite}` : 'test';
  if (pkgScripts[testCmd] || pkgScripts.test) {
    testsExecuted = true;
    const scriptToRun = pkgScripts[testCmd] ? testCmd : 'test';
    const testRes = runNpmScript(scriptToRun, rootDir);
    if (testRes.status === 0) {
      testsPassed = true;
      vectors.behavioral = {
        status: 'passed',
        durationMs: Date.now() - testStart,
        details: `Passed test suite: ${scriptToRun}`
      };
    } else {
      testsPassed = false;
      issues.push({
        ruleId: 'vector.behavioral.tests-failed',
        severity: 'error',
        message: `Test execution failed with exit code ${testRes.status}.`,
        remediation: 'Execute `npm test` locally to reproduce and correct test failures.'
      });
      vectors.behavioral = {
        status: 'failed',
        durationMs: Date.now() - testStart,
        details: `Exited with code ${testRes.status}`
      };
    }
  } else {
    vectors.behavioral = {
      status: 'skipped',
      durationMs: Date.now() - testStart,
      details: 'No test script found in package.json'
    };
  }

  // 5. Documentation Vector
  const docStart = Date.now();
  const manifestExists = existsSync(resolve(rootDir, 'sagarithm.manifest.json'));
  vectors.documentation = {
    status: manifestExists ? 'passed' : 'warn',
    durationMs: Date.now() - docStart,
    details: manifestExists ? 'Project topology manifest is present' : 'sagarithm.manifest.json not yet generated'
  };

  // Compute Summary
  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warnCount = issues.filter((i) => i.severity === 'warn').length;
  const totalChecks = Object.keys(vectors).length;
  const passedChecks = Object.values(vectors).filter((v) => v.status === 'passed').length;

  // Determine Verification State according to Empirical Promotion Criteria
  let state: VerificationState;
  if (errorCount > 0 || (testsExecuted && !testsPassed)) {
    state = 'FAILED';
  } else if (options.strict && warnCount > 0) {
    state = 'FAILED';
  } else if (testsExecuted && testsPassed && errorCount === 0) {
    state = 'VERIFIED';
  } else if (testsExecuted && testsPassed) {
    state = 'TESTED';
  } else if (staticExecuted && staticPassed) {
    state = 'IMPLEMENTED';
  } else {
    state = 'ASSUMED';
  }

  const report: ValidationReport = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    state,
    summary: {
      totalChecks,
      passed: passedChecks,
      warnings: warnCount,
      errors: errorCount
    },
    vectors,
    issues
  };

  // Write .sagarithm/audit-report.json
  const sagarithmDir = resolve(rootDir, '.sagarithm');
  if (!existsSync(sagarithmDir)) {
    try {
      mkdirSync(sagarithmDir, { recursive: true });
    } catch {
      // Ignore mkdir failure
    }
  }

  try {
    writeFileSync(resolve(sagarithmDir, 'audit-report.json'), JSON.stringify(report, null, 2), 'utf8');
  } catch {
    // Ignore report write error
  }

  return report;
}
