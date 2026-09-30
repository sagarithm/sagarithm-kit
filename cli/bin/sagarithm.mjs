#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const entry = resolve(__dirname, '../src/index.ts');

const result = spawnSync(
  process.execPath,
  ['--experimental-strip-types', entry, ...process.argv.slice(2)],
  { stdio: 'inherit' }
);

process.exit(result.status ?? 0);
