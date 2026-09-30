#!/usr/bin/env node
import { findWorkspaceRoot } from './config.ts';
import { runInit } from './commands/init.ts';
import { runSync } from './commands/sync.ts';
import { runDoctor } from './commands/doctor.ts';
import { runAudit } from './commands/audit.ts';
import { runVerify } from './commands/verify.ts';
import { runContext } from './commands/context.ts';
import { runPreset } from './commands/preset.ts';
import { runRegistry } from './commands/registry.ts';

const args = process.argv.slice(2);
const command = args[0] || 'help';
const rootDir = findWorkspaceRoot();

function printHelp() {
  console.log(`
Sagarithm Kit CLI (v1.0.0)
Universal Cross-Agent Engineering Framework for AI Coding Agents

Usage:
  sagarithm <command> [options]

Commands:
  init      Initialize Sagarithm Kit workspace configuration (sagarithm.config.json)
  preset    List, inspect, and apply curated engineering presets (fullstack-web, api-backend, etc.)
  registry  Search canonical catalog and package artifacts with SHA-256 integrity
  sync      Compile canonical specifications into native agent configurations
  context   Generate and query repository intelligence graph (find, blast-radius, suggest-location)
  doctor    Diagnose repository structure, .gitignore hygiene, and policy conformance
  audit     Audit workspace against security, secrets, and architecture policies
  verify    Run execution verification gate (Zero Assumed Success)
  help      Display this help menu

Options:
  --target <agent>   Filter sync to a specific target (antigravity, cursor, claude-code, copilot, windsurf, codex)
  --force            Force overwrite existing configurations during init
  --deep             Execute deep workspace scan instead of git diff in audit
  --strict           Enforce zero warnings mode (treat warnings as errors)
  --suite <name>     Target specific test suite in verify
  --json             Emit structured JSON report for automation and CI/CD
`);
}

switch (command) {
  case 'init':
    runInit(rootDir, args.slice(1));
    break;
  case 'preset':
    runPreset(rootDir, args.slice(1));
    break;
  case 'registry':
    runRegistry(rootDir, args.slice(1));
    break;
  case 'sync':
  case 'compile':
    runSync(rootDir, args.slice(1));
    break;
  case 'context':
  case 'graph':
    runContext(rootDir, args.slice(1));
    break;
  case 'doctor':
    runDoctor(rootDir);
    break;
  case 'audit':
    runAudit(rootDir, args.slice(1));
    break;
  case 'verify':
    runVerify(rootDir, args.slice(1));
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}
