export type TargetAgent =
  | 'antigravity'
  | 'cursor'
  | 'claude-code'
  | 'copilot'
  | 'windsurf'
  | 'codex';

export interface SagarithmConfig {
  version: string;
  name: string;
  targets: TargetAgent[];
  riskThreshold: 'low' | 'medium' | 'high' | 'critical';
  enabledDomains: string[];
  paths: {
    constitution: string;
    skills: string;
    policies: string;
    workflows: string;
    adapters: string;
  };
}

export interface CanonicalFrontmatter {
  id?: string;
  name?: string;
  version?: string;
  severity?: 'error' | 'warn' | 'advisory';
  scope?: string;
  domain?: string;
  description?: string;
  triggers?: string[];
  prerequisites?: string[];
  risk_profile?: string;
  category?: string;
}

export interface CanonicalArtifact {
  filePath: string;
  frontmatter: CanonicalFrontmatter;
  rawContent: string;
  body: string;
}

export interface AuditIssue {
  ruleId: string;
  severity: 'error' | 'warn' | 'advisory';
  file?: string;
  line?: number;
  message: string;
  remediation: string;
}

export interface VerificationCheck {
  name: string;
  command: string;
  passed: boolean;
  output: string;
  durationMs?: number;
}

export type VerificationState = 'ASSUMED' | 'IMPLEMENTED' | 'TESTED' | 'VERIFIED' | 'FAILED';

export interface VectorResult {
  status: 'passed' | 'failed' | 'skipped' | 'warn';
  durationMs?: number;
  details?: string;
}

export interface ValidationReport {
  version: string;
  timestamp: string;
  state: VerificationState;
  summary: {
    totalChecks: number;
    passed: number;
    warnings: number;
    errors: number;
  };
  vectors: {
    static?: VectorResult;
    security?: VectorResult;
    architecture?: VectorResult;
    behavioral?: VectorResult;
    documentation?: VectorResult;
  };
  issues: AuditIssue[];
}

