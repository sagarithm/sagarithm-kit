import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { AuditIssue } from '../types.ts';

export interface SecretRule {
  id: string;
  name: string;
  pattern: RegExp;
  severity: 'error' | 'warn';
  remediation: string;
}

export const KNOWN_SECRET_RULES: SecretRule[] = [
  {
    id: 'sec-001',
    name: 'Stripe Secret API Key',
    pattern: /sk_(?:live|test)_[0-9a-zA-Z]{24,}/,
    severity: 'error',
    remediation: 'Move Stripe secret keys to environment variables or secret store. Never commit live or test credentials.'
  },
  {
    id: 'sec-002',
    name: 'GitHub Personal Access Token',
    pattern: /(?:ghp|gho|ghu|ghs|ghr)_[0-9a-zA-Z]{36}/,
    severity: 'error',
    remediation: 'Revoke the exposed GitHub token immediately and use fine-grained GitHub Actions secrets or environment variables.'
  },
  {
    id: 'sec-003',
    name: 'Google / Gemini API Key',
    pattern: /AIzaSy[0-9a-zA-Z\-_]{30,35}/,
    severity: 'error',
    remediation: 'Extract the Google API key into GEMINI_API_KEY environment variable and add to .env.'
  },
  {
    id: 'sec-004',
    name: 'OpenAI API Key',
    pattern: /sk-[0-9a-zA-Z]{20}T3BlbkFJ[0-9a-zA-Z]{20}|sk-proj-[0-9a-zA-Z-_]{48,}/,
    severity: 'error',
    remediation: 'Rotate and configure OpenAI credentials via OPENAI_API_KEY in process environment.'
  },
  {
    id: 'sec-005',
    name: 'AWS Access Key ID',
    pattern: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/,
    severity: 'error',
    remediation: 'Rotate AWS access key pair immediately; use AWS IAM roles or temporary STS credentials.'
  },
  {
    id: 'sec-006',
    name: 'Private Cryptographic Key',
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
    severity: 'error',
    remediation: 'Never commit private cryptographic key blocks into source code repositories.'
  },
  {
    id: 'sec-007',
    name: 'Unparameterized SQL Injection Concatenation',
    pattern: /(?:SELECT|INSERT|UPDATE|DELETE)\s+.*(?:WHERE|VALUES|SET)\s+.*['"`][^;\n]*\s*\+/i,
    severity: 'error',
    remediation: 'Replace string concatenation with parameterized SQL bindings ($1, ?) or an approved query builder.'
  }
];

/**
 * Calculates Shannon entropy of a given string.
 * Higher entropy (typically > 4.5) indicates cryptographic randomness (tokens/secrets).
 */
export function calculateShannonEntropy(str: string): number {
  if (!str || str.length === 0) return 0;
  const frequencies = new Map<string, number>();
  for (const char of str) {
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }

  let entropy = 0;
  const len = str.length;
  for (const count of frequencies.values()) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

/**
 * Scans string content for known secret patterns and high-entropy secret tokens.
 */
export function scanContentForSecrets(content: string, filePath?: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // 1. Known Regex Rules
    for (const rule of KNOWN_SECRET_RULES) {
      if (rule.pattern.test(line)) {
        issues.push({
          ruleId: `policy.security-boundary.${rule.id}`,
          severity: rule.severity,
          file: filePath,
          line: index + 1,
          message: `Detected probable hardcoded secret: ${rule.name}`,
          remediation: rule.remediation
        });
      }
    }

    // 2. High-Entropy Token Detection on string assignments (e.g. key = "...", secret: '...')
    const assignmentPattern = /(?:api[_-]?key|secret|token|password|auth|bearer)\s*[:=]\s*['"`]([A-Za-z0-9+/=_-]{24,})['"`]/i;
    const match = assignmentPattern.exec(line);
    if (match && match[1]) {
      const candidateToken = match[1];
      const entropy = calculateShannonEntropy(candidateToken);
      if (entropy >= 4.5) {
        issues.push({
          ruleId: 'policy.security-boundary.sec-entropy',
          severity: 'error',
          file: filePath,
          line: index + 1,
          message: `Detected high-entropy credential string (${entropy.toFixed(2)} bits/char)`,
          remediation: 'Replace hardcoded high-entropy credential with an environment variable lookup.'
        });
      }
    }
  });

  return issues;
}

/**
 * Scans active git changes (git diff HEAD).
 */
export function scanGitDiffForSecrets(rootDir: string): AuditIssue[] {
  const gitDiff = spawnSync('git', ['diff', 'HEAD'], { cwd: rootDir, encoding: 'utf8' });
  const diffOutput = gitDiff.stdout || '';
  return scanContentForSecrets(diffOutput, 'git:diff');
}

/**
 * Scans multiple files on disk for secrets.
 */
export function scanFilesForSecrets(rootDir: string, files: string[]): AuditIssue[] {
  const issues: AuditIssue[] = [];
  for (const relFile of files) {
    const fullPath = resolve(rootDir, relFile);
    if (!existsSync(fullPath)) continue;
    try {
      const content = readFileSync(fullPath, 'utf8');
      issues.push(...scanContentForSecrets(content, relFile));
    } catch {
      // Ignore binary or inaccessible files
    }
  }
  return issues;
}
