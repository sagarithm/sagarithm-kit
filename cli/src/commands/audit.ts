import { spawnSync } from 'node:child_process';
import type { AuditIssue } from '../types.ts';

export function runAudit(rootDir: string): void {
  console.log('🔍 Auditing workspace against active Sagarithm policies...');

  const gitDiff = spawnSync('git', ['diff', 'HEAD'], { cwd: rootDir, encoding: 'utf8' });
  const diffOutput = gitDiff.stdout || '';

  const issues: AuditIssue[] = [];

  // 1. Secrets scanning
  const secretPatterns = [
    { pattern: /sk_[live|test]_[0-9a-zA-Z]{24,}/, name: 'Stripe Secret Key' },
    { pattern: /ghp_[0-9a-zA-Z]{36}/, name: 'GitHub Personal Access Token' },
    { pattern: /AIzaSy[0-9a-zA-Z\\-_]{33}/, name: 'Google API Key' },
    { pattern: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/, name: 'Private Cryptographic Key' }
  ];

  for (const { pattern, name } of secretPatterns) {
    if (pattern.test(diffOutput)) {
      issues.push({
        ruleId: 'policy.security-boundary',
        severity: 'error',
        message: `Detected probable hardcoded secret: ${name}`,
        remediation: 'Remove the secret from code immediately and move to environment variables or secret store.'
      });
    }
  }

  // 2. Raw SQL string concatenation scan
  const sqlConcatPattern = /SELECT\s+.*FROM\s+.*WHERE\s+.*['"`]\s*\+/i;
  if (sqlConcatPattern.test(diffOutput)) {
    issues.push({
      ruleId: 'policy.security-boundary',
      severity: 'error',
      message: 'Detected unparameterized SQL string concatenation in git diff.',
      remediation: 'Use parameterized queries ($1, ?) or an ORM query builder to prevent SQL injection.'
    });
  }

  // 3. Output results
  if (issues.length === 0) {
    console.log('✅ Audit clean! Zero policy violations detected in active changes.');
  } else {
    console.log(`❌ Audit found ${issues.length} violation(s):`);
    for (const issue of issues) {
      console.log(`  [${issue.severity.toUpperCase()}] ${issue.ruleId}: ${issue.message}`);
      console.log(`    ↳ Remediation: ${issue.remediation}`);
    }
    process.exitCode = 1;
  }
}
