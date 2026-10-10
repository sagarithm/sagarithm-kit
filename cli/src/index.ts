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
import { runWorkflow } from './commands/run.ts';
import { runValidate } from './commands/validate.ts';
import { runHealth } from './commands/health.ts';
import { startMcpServer } from './mcp/server.ts';

const args = process.argv.slice(2);
const command = args[0] || 'help';
const rootDir = findWorkspaceRoot();

function printHelp() {
  console.log(`
Sagarithm Kit CLI (v1.1.1)
Universal Cross-Agent Engineering Framework for AI Coding Agents

Usage:
  sagarithm <command> [options]

Commands:
  init      Initialize Sagarithm Kit workspace configuration (--starter for instant turnkey setup)
  validate  Validate a software or feature idea critically (truth-teller, no blind compliance)
  preset    List, inspect, and apply curated engineering presets (fullstack-web, api-backend, etc.)
  registry  Search canonical catalog and package artifacts with SHA-256 integrity
  sync      Compile canonical specifications into native agent configurations
  run       Orchestrate autonomous canonical workflow (feature-development, bug-fix, release)
  context   Generate and query repository intelligence graph (find, blast-radius, graph)
  health    Compute comprehensive codebase health index (hygiene, coupling, dead code, secrets)
  doctor    Diagnose repository structure, .gitignore hygiene, and policy conformance
  audit     Audit workspace against security, secrets, and architecture policies (--fix to remediate)
  verify    Run execution verification gate (Zero Assumed Success)
  mcp       Start native Model Context Protocol (MCP) server for AI coding agents
  help      Display this help menu

Options:
  --starter          Turnkey zero-friction starter mode (compiles all agent targets & activates architect)
  --target <agent>   Filter sync to a specific target (antigravity, cursor, claude-code, copilot, windsurf, codex)
  --force            Force overwrite existing configurations during init
  --fix              Automatically remediate safe policy violations in audit
  --deep             Execute deep workspace scan instead of git diff in audit
  --strict           Enforce zero warnings mode (treat warnings as errors)
  --suite <name>     Target specific test suite in verify
  --json             Emit structured JSON report for automation and CI/CD
`);
}

switch (command) {
  case 'init':
    runInit(process.cwd(), args.slice(1));
    break;
  case 'validate':
  case 'ideate':
  case 'interview':
    runValidate(rootDir, args.slice(1));
    break;
  case 'mcp':
  case 'serve':
    startMcpServer();
    break;
  case 'preset':
    runPreset(rootDir, args.slice(1));
    break;
  case 'registry':
    runRegistry(rootDir, args.slice(1));
    break;
  case 'run':
    runWorkflow(rootDir, args.slice(1));
    break;
  case 'sync':
  case 'compile':
    runSync(rootDir, args.slice(1));
    break;
  case 'context':
  case 'graph':
    runContext(rootDir, args.slice(1));
    break;
  case 'health':
    runHealth(rootDir, args.slice(1));
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
  case 'version':
  case '--version':
  case '-v':
    console.log('1.1.1');
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}
