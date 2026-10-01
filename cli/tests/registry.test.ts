import { test } from 'node:test';
import assert from 'node:assert';
import { resolve } from 'node:path';
import { existsSync, unlinkSync } from 'node:fs';
import {
  loadRegistryIndex,
  loadPreset,
  searchRegistry,
  computeIntegrityHash,
  packArtifact
} from '../src/registry/loader.ts';

const rootDir = resolve(import.meta.dirname, '../..');

test('loadRegistryIndex loads canonical registry index with standard presets', () => {
  const index = loadRegistryIndex(rootDir);
  assert.ok(index !== null, 'Registry index should be loadable');
  assert.strictEqual(index?.version, '1.0.0');

  const presetIds = Object.keys(index!.presets);
  assert.ok(presetIds.includes('fullstack-web'));
  assert.ok(presetIds.includes('api-backend'));
  assert.ok(presetIds.includes('systems-core'));
  assert.ok(presetIds.includes('ai-agentic'));
});

test('loadPreset retrieves specific preset configuration', () => {
  const preset = loadPreset(rootDir, 'fullstack-web');
  assert.ok(preset !== null);
  assert.strictEqual(preset?.id, 'fullstack-web');
  assert.strictEqual(preset?.version, '1.0.0');
  assert.strictEqual(preset?.riskThreshold, 'medium');
  assert.ok(preset?.skills.length > 0);
  assert.ok(preset?.policies.length > 0);
});

test('searchRegistry finds matching presets and packages', () => {
  const secResults = searchRegistry(rootDir, 'security');
  assert.ok(secResults.presets.length > 0 || secResults.packages.length > 0);

  const backendResults = searchRegistry(rootDir, 'backend');
  assert.ok(backendResults.presets.some((p) => p.id === 'api-backend'));

  const emptyResults = searchRegistry(rootDir, 'nonexistent-query-xyz');
  assert.strictEqual(emptyResults.presets.length, 0);
  assert.strictEqual(emptyResults.packages.length, 0);
});

test('computeIntegrityHash produces standard sha256 formatted digest', () => {
  const hash1 = computeIntegrityHash('sample canonical content');
  assert.ok(hash1.startsWith('sha256-'));
  assert.strictEqual(hash1.length, 7 + 64);

  const hash2 = computeIntegrityHash('sample canonical content');
  assert.strictEqual(hash1, hash2, 'Identical content must produce identical digest');
});

test('packArtifact generates integrity-verified package bundle', () => {
  const targetSkill = 'skills/architecture/system-design';
  const { packagePath, manifest } = packArtifact(rootDir, targetSkill);

  assert.ok(existsSync(packagePath), 'Package bundle must be written to disk');
  assert.ok(manifest.name.startsWith('@sagarithm/skill-'));
  assert.strictEqual(manifest.version, '1.0.1');
  assert.ok(manifest.integrity?.startsWith('sha256-'));

  // Clean up generated test package artifact
  try {
    unlinkSync(packagePath);
  } catch {
    // Ignore cleanup error
  }
});
