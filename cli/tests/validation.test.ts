import { test } from 'node:test';
import assert from 'node:assert';
import { calculateShannonEntropy, scanContentForSecrets } from '../src/validation/secrets.ts';
import { checkGraphAcyclicity } from '../src/validation/fitness.ts';
import type { ProjectTopologyGraph } from '../src/graph/indexer.ts';

test('calculateShannonEntropy accurately evaluates token randomness', () => {
  const lowEntropy = calculateShannonEntropy('aaaaaaaaaaaaaaaaaaaaaaaaa');
  assert.strictEqual(lowEntropy, 0);

  const naturalText = calculateShannonEntropy('this is a normal human readable sentence');
  assert.ok(naturalText > 2.5 && naturalText < 4.0);

  // High entropy token
  const highEntropyToken = calculateShannonEntropy('vN8xL9pQ2mK5tW7yZ4bC1sD3fG6hJ8kL');
  assert.ok(highEntropyToken >= 4.5, `Expected >= 4.5, got ${highEntropyToken}`);
});

test('scanContentForSecrets detects known credential patterns and injection flaws', () => {
  const mockStripe = ['sk', 'live', '51Abcdefghijklmnopqrstuvw'].join('_');
  const mockGithub = ['ghp', '1234567890abcdefghijklmnopqrstuvwxyz'].join('_');
  const mockGoogle = ['AIzaSy', 'D-1234567890abcdefghijklmnopqr'].join('');
  const mockPrivKey = ['-----BEGIN', 'RSA', 'PRIVATE', 'KEY-----'].join(' ');

  const testInput = [
    `const stripeKey = "${mockStripe}";`,
    `const githubToken = "${mockGithub}";`,
    `const googleKey = "${mockGoogle}";`,
    `const privKey = "${mockPrivKey}";`,
    `const query = "SELECT * FROM users WHERE id = '" + userId + "';"`
  ].join('\n');

  const issues = scanContentForSecrets(testInput, 'test.ts');
  assert.ok(issues.length >= 5, `Expected at least 5 issues, found ${issues.length}`);

  const ruleIds = issues.map((i) => i.ruleId);
  assert.ok(ruleIds.includes('policy.security-boundary.sec-001'));
  assert.ok(ruleIds.includes('policy.security-boundary.sec-002'));
  assert.ok(ruleIds.includes('policy.security-boundary.sec-003'));
  assert.ok(ruleIds.includes('policy.security-boundary.sec-006'));
  assert.ok(ruleIds.includes('policy.security-boundary.sec-007'));
  assert.ok(ruleIds.includes('policy.security-boundary.sec-entropy'));
});

test('scanContentForSecrets produces zero issues on clean code', () => {
  const cleanInput = `
    import { Router } from 'express';
    export const router = Router();
    router.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: Date.now() });
    });
  `;

  const issues = scanContentForSecrets(cleanInput, 'clean.ts');
  assert.strictEqual(issues.length, 0);
});

test('checkGraphAcyclicity detects circular dependency cycles', () => {
  const cyclicGraph: ProjectTopologyGraph = {
    version: '1.0.0',
    indexedAt: new Date().toISOString(),
    nodes: [
      { id: 'nodeA', path: 'src/a.ts', exports: [], imports: ['nodeB'] },
      { id: 'nodeB', path: 'src/b.ts', exports: [], imports: ['nodeC'] },
      { id: 'nodeC', path: 'src/c.ts', exports: [], imports: ['nodeA'] }
    ],
    edges: [
      { source: 'nodeA', target: 'nodeB', type: 'import' },
      { source: 'nodeB', target: 'nodeC', type: 'import' },
      { source: 'nodeC', target: 'nodeA', type: 'import' }
    ]
  };

  const issues = checkGraphAcyclicity(cyclicGraph);
  assert.strictEqual(issues.length, 1);
  assert.strictEqual(issues[0].ruleId, 'policy.architecture-fitness.arch-002');
  assert.ok(issues[0].message.includes('Circular dependency detected'));
});

test('checkGraphAcyclicity passes on DAG graph without cycles', () => {
  const acyclicGraph: ProjectTopologyGraph = {
    version: '1.0.0',
    indexedAt: new Date().toISOString(),
    nodes: [
      { id: 'nodeA', path: 'src/a.ts', exports: [], imports: ['nodeB'] },
      { id: 'nodeB', path: 'src/b.ts', exports: [], imports: ['nodeC'] },
      { id: 'nodeC', path: 'src/c.ts', exports: [], imports: [] }
    ],
    edges: [
      { source: 'nodeA', target: 'nodeB', type: 'import' },
      { source: 'nodeB', target: 'nodeC', type: 'import' }
    ]
  };

  const issues = checkGraphAcyclicity(acyclicGraph);
  assert.strictEqual(issues.length, 0);
});
