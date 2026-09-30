import { test } from 'node:test';
import assert from 'node:assert';
import { parseFrontmatter } from '../src/compiler/parser.ts';
import { injectContent } from '../src/compiler/emitter.ts';

test('parseFrontmatter extracts YAML frontmatter and body cleanly', () => {
  const content = `---
id: "policy.test"
name: "Test Policy"
severity: "error"
tags:
  - "alpha"
  - "beta"
---
# Main Content
Body line here.`;

  const { frontmatter, body } = parseFrontmatter(content);
  assert.strictEqual(frontmatter.id, 'policy.test');
  assert.strictEqual(frontmatter.name, 'Test Policy');
  assert.strictEqual(frontmatter.severity, 'error');
  assert.deepStrictEqual(frontmatter.tags, ['alpha', 'beta']);
  assert.strictEqual(body.trim(), '# Main Content\nBody line here.');
});

test('injectContent updates demarcated blocks while preserving existing custom lines', () => {
  const initial = `# Custom Header
<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
Old generated content
<!-- SAGARITHM:END -->
# Custom Footer`;

  const updated = injectContent(initial, 'New generated content');
  assert.match(updated, /# Custom Header/);
  assert.match(updated, /New generated content/);
  assert.match(updated, /# Custom Footer/);
  assert.doesNotMatch(updated, /Old generated content/);
});
