import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { runVerificationPipeline } from '../validation/engine.ts';
import { scanContentForSecrets } from '../validation/secrets.ts';
import { buildProjectGraph } from '../graph/indexer.ts';
import { findExistingAbstractions, calculateSystemComplexity } from '../graph/query.ts';
import { evaluateCodebaseHealth } from '../commands/health.ts';
import { findWorkspaceRoot } from '../config.ts';

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: number | string | null;
  method: string;
  params?: Record<string, any>;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id?: number | string | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export const MCP_TOOLS = [
  {
    name: 'sagarithm_verify',
    description: 'Executes the Sagarithm Kit 5-Vector Verification Gate (Zero Assumed Success). Validates static, security, architectural, behavioral (tests), and documentation vectors.',
    inputSchema: {
      type: 'object',
      properties: {
        strict: {
          type: 'boolean',
          description: 'Enforce zero-warning tolerance mode (treat warnings as errors).'
        }
      }
    }
  },
  {
    name: 'sagarithm_scan_secrets',
    description: 'Scans code content or snippets for Shannon entropy (H >= 4.5) and exposed credentials before saving.',
    inputSchema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: 'The code content or diff to scan for credential leaks.'
        },
        filePath: {
          type: 'string',
          description: 'Optional file path for contextual error reporting.'
        }
      },
      required: ['content']
    }
  },
  {
    name: 'sagarithm_query_graph',
    description: 'Queries the architectural repository graph. Calculates module coupling, instability, and finds existing abstractions to prevent duplicate code.',
    inputSchema: {
      type: 'object',
      properties: {
        symbol: {
          type: 'string',
          description: 'Optional symbol or function name to search across module exports.'
        },
        moduleName: {
          type: 'string',
          description: 'Optional module name to calculate afferent/efferent coupling and instability.'
        }
      }
    }
  },
  {
    name: 'sagarithm_validate_idea',
    description: 'Architectural truth-teller: Stress-tests an engineering idea, challenges assumptions, surfaces failure points, and produces an anti-rationalization validation matrix.',
    inputSchema: {
      type: 'object',
      properties: {
        idea: {
          type: 'string',
          description: 'The raw feature idea or architectural concept to validate.'
        }
      },
      required: ['idea']
    }
  },
  {
    name: 'sagarithm_health',
    description: 'Calculates the composite 100-point Codebase Health Index, evaluating structural hygiene, Martin modularity, dead code/orphans, secret isolation, and test density.',
    inputSchema: {
      type: 'object',
      properties: {
        detailed: {
          type: 'boolean',
          description: 'Include detailed violation lists and module breakdown.'
        }
      }
    }
  },
  {
    name: 'sagarithm_get_skill',
    description: 'Retrieves canonical Sagarithm Kit skill guidelines, directives, and anti-rationalization tables for a specific domain.',
    inputSchema: {
      type: 'object',
      properties: {
        skillId: {
          type: 'string',
          description: 'The skill identifier: ideation, spec, planning, review, shipping, modularity, security, testing, coding, adr.'
        }
      },
      required: ['skillId']
    }
  }
];

export const SKILL_MAP: Record<string, string> = {
  ideation: 'skills/ideation/idea-validation/SKILL.md',
  'idea-validation': 'skills/ideation/idea-validation/SKILL.md',
  spec: 'skills/architecture/spec-driven-development/SKILL.md',
  'spec-driven-development': 'skills/architecture/spec-driven-development/SKILL.md',
  planning: 'skills/lifecycle/planning-and-task-breakdown/SKILL.md',
  'planning-and-task-breakdown': 'skills/lifecycle/planning-and-task-breakdown/SKILL.md',
  review: 'skills/quality/code-review-and-quality/SKILL.md',
  'code-review-and-quality': 'skills/quality/code-review-and-quality/SKILL.md',
  shipping: 'skills/delivery/shipping-and-launch/SKILL.md',
  'shipping-and-launch': 'skills/delivery/shipping-and-launch/SKILL.md',
  modularity: 'skills/architecture/system-design/SKILL.md',
  'system-design': 'skills/architecture/system-design/SKILL.md',
  security: 'skills/security/secure-development/SKILL.md',
  'secure-development': 'skills/security/secure-development/SKILL.md',
  testing: 'skills/testing/test-driven-verification/SKILL.md',
  'test-driven-verification': 'skills/testing/test-driven-verification/SKILL.md',
  coding: 'skills/quality/coding-standards/SKILL.md',
  'coding-standards': 'skills/quality/coding-standards/SKILL.md',
  adr: 'skills/documentation/architectural-decision-records/SKILL.md',
  'architectural-decision-records': 'skills/documentation/architectural-decision-records/SKILL.md'
};

/**
 * Dispatches an incoming parsed JSON-RPC request to the appropriate handler.
 * Returns null if the request is a notification (no ID) that doesn't need a response.
 */
export function dispatchMcpRequest(req: JsonRpcRequest, rootDir: string): JsonRpcResponse | null {
  const isNotification = req.id === undefined || req.id === null;

  switch (req.method) {
    case 'initialize': {
      return {
        jsonrpc: '2.0',
        id: req.id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'sagarithm-kit-mcp',
            version: '1.1.1'
          }
        }
      };
    }

    case 'notifications/initialized': {
      // Notification received from client acknowledging initialize
      return null;
    }

    case 'ping': {
      if (isNotification) return null;
      return {
        jsonrpc: '2.0',
        id: req.id,
        result: {}
      };
    }

    case 'tools/list': {
      if (isNotification) return null;
      return {
        jsonrpc: '2.0',
        id: req.id,
        result: {
          tools: MCP_TOOLS
        }
      };
    }

    case 'tools/call': {
      if (isNotification) return null;
      const toolName = req.params?.name;
      const args = req.params?.arguments || {};

      try {
        let resultText = '';

        if (toolName === 'sagarithm_verify') {
          const report = runVerificationPipeline(rootDir, { strict: Boolean(args.strict) });
          const vectorLines = Object.entries(report.vectors).map(([vecName, v]) => {
            if (!v) return '';
            const status = v.status.toUpperCase();
            const duration = v.durationMs !== undefined ? ` (${v.durationMs}ms)` : '';
            const details = v.details ? `: ${v.details}` : '';
            return `- [${status}] **${vecName.toUpperCase()}**${duration}${details}`;
          }).filter(Boolean);

          resultText = [
            `# Sagarithm Verification Gate Status: [${report.state}]`,
            `Timestamp: ${report.timestamp}`,
            `Total Checks: ${report.summary.totalChecks} | Passed: ${report.summary.passed} | Errors: ${report.summary.errors}`,
            '',
            '## Verification Vectors:',
            ...vectorLines
          ].join('\n');
        } else if (toolName === 'sagarithm_scan_secrets') {
          const content = String(args.content || '');
          const filePath = String(args.filePath || 'snippet.ts');
          const issues = scanContentForSecrets(content, filePath);
          if (issues.length === 0) {
            resultText = '✅ Zero secrets or high-entropy tokens detected. Code is secure.';
          } else {
            resultText = [
              `⚠️ Detected ${issues.length} security / secret issue(s):`,
              ...issues.map(i => `- [Line ${i.line}] **${i.ruleId}** (${i.severity}): ${i.message}`)
            ].join('\n');
          }
        } else if (toolName === 'sagarithm_query_graph') {
          const graph = buildProjectGraph(rootDir);
          const lines: string[] = [`# Sagarithm Repository Topology (${graph.name})`];

          if (args.symbol) {
            const abstractions = findExistingAbstractions(graph, String(args.symbol));
            lines.push(`\n## Search for symbol: "${args.symbol}"`);
            if (abstractions.length === 0) {
              lines.push(`Zero existing abstractions found matching "${args.symbol}".`);
            } else {
              for (const abs of abstractions) {
                lines.push(`- **${abs.symbol}** (${abs.kind}) in \`${abs.filePath}\``);
              }
            }
          }

          if (args.moduleName) {
            const complexity = calculateSystemComplexity(graph, String(args.moduleName));
            lines.push(`\n## Module Complexity: "${args.moduleName}"`);
            lines.push(`- Afferent Coupling (Ca): ${complexity.afferentCoupling}`);
            lines.push(`- Efferent Coupling (Ce): ${complexity.efferentCoupling}`);
            lines.push(`- Instability Metric (I): ${complexity.instability.toFixed(2)}`);
          }

          if (!args.symbol && !args.moduleName) {
            lines.push(`\nTotal Modules: ${graph.modules.length} | Total Files: ${graph.allFiles.length}`);
            lines.push(`Modules: ${graph.modules.map(m => m.name).join(', ')}`);
          }

          resultText = lines.join('\n');
        } else if (toolName === 'sagarithm_validate_idea') {
          const idea = String(args.idea || '');
          resultText = [
            `# 🎯 Sagarithm Architectural Truth Assessment`,
            `**Evaluated Concept**: "${idea}"`,
            '',
            '## 1. Feasibility & State Complexity Analysis',
            `- **State Model**: Evaluate whether state is ephemeral, synchronized, or persistent.`,
            `- **Hidden Bottlenecks**: Assess asynchronous boundary race conditions, external network latency, and memory ceilings.`,
            '',
            '## 2. Anti-Rationalization Checklist',
            `- [ ] Is this introducing unnecessary microservices or distributed complexity?`,
            `- [ ] Are domain entities separated from presentation/UI logic?`,
            `- [ ] Has a strict "Non-Goals" (Not Doing) list been defined?`,
            '',
            '## 3. Truth-Teller Directive for Agent',
            `Do NOT agree blindly. Present the simplest viable architecture, outline the hardest edge cases, and define the acceptance criteria before touching code.`
          ].join('\n');
        } else if (toolName === 'sagarithm_health') {
          const health = evaluateCodebaseHealth(rootDir);
          resultText = [
            `# 🏥 Sagarithm Codebase Health Index: ${health.totalScore}/100 (${health.grade} - ${health.badge})`,
            '',
            '## Dimension Breakdown:',
            `- **Structural Hygiene**: ${health.hygieneScore}/25 pts`,
            `- **Modularity & Coupling**: ${health.modularityScore}/25 pts (Avg Instability: ${health.avgInstability.toFixed(2)})`,
            `- **Dead Code & Orphans**: ${health.maintenanceScore}/20 pts (${health.orphanCount} detected)`,
            `- **Secret Isolation (H < 4.5)**: ${health.securityScore}/20 pts (${health.secretCount} leaks detected)`,
            `- **Verification & Tests**: ${health.testingScore}/10 pts`,
            '',
            '## Telemetry:',
            `- Total Files: ${health.totalFiles}`,
            `- Bounded Modules: ${health.totalModules}`,
            health.violations.length > 0 ? `\n⚠️ Violations: Forbidden generic directories: ${health.violations.join(', ')}` : '✅ Zero forbidden directory anti-patterns.'
          ].join('\n');
        } else if (toolName === 'sagarithm_get_skill') {
          const rawId = String(args.skillId || '').toLowerCase().trim();
          const relPath = SKILL_MAP[rawId] || SKILL_MAP['ideation'];
          let fullPath = resolve(rootDir, relPath);
          if (!existsSync(fullPath)) {
            const candidates = [
              resolve(import.meta.dirname, '../..', relPath),
              resolve(import.meta.dirname, '..', relPath),
              resolve(import.meta.dirname, '../../..', relPath)
            ];
            for (const c of candidates) {
              if (existsSync(c)) {
                fullPath = c;
                break;
              }
            }
          }

          if (existsSync(fullPath)) {
            resultText = readFileSync(fullPath, 'utf8');
          } else {
            resultText = `Skill file for "${rawId}" not found at ${relPath}. Available skills: ${Object.keys(SKILL_MAP).join(', ')}`;
          }
        } else {
          return {
            jsonrpc: '2.0',
            id: req.id,
            error: {
              code: -32601,
              message: `Tool "${toolName}" not recognized`
            }
          };
        }

        return {
          jsonrpc: '2.0',
          id: req.id,
          result: {
            content: [
              {
                type: 'text',
                text: resultText
              }
            ]
          }
        };
      } catch (toolErr: any) {
        return {
          jsonrpc: '2.0',
          id: req.id,
          result: {
            isError: true,
            content: [
              {
                type: 'text',
                text: `Execution failed: ${toolErr?.message || String(toolErr)}`
              }
            ]
          }
        };
      }
    }

    default: {
      if (isNotification) return null;
      return {
        jsonrpc: '2.0',
        id: req.id,
        error: {
          code: -32601,
          message: `Unhandled method: ${req.method}`
        }
      };
    }
  }
}

/**
 * Starts the production-grade stdio MCP server loop.
 * Supports line-delimited JSON and Content-Length framed packets.
 */
export function startMcpServer(): void {
  const rootDir = findWorkspaceRoot();
  let buffer = '';

  const sendResponse = (response: JsonRpcResponse) => {
    process.stdout.write(JSON.stringify(response) + '\n');
  };

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk: string) => {
    buffer += chunk;

    // Process all complete messages in buffer
    while (true) {
      // 1. Check for Content-Length header framing
      if (buffer.startsWith('Content-Length:')) {
        const headerEnd = buffer.indexOf('\r\n\r\n');
        if (headerEnd === -1) {
          // Incomplete header, wait for more data
          break;
        }

        const headerLine = buffer.slice(0, headerEnd);
        const match = headerLine.match(/Content-Length:\s*(\d+)/i);
        if (!match) {
          // Malformed header; discard invalid line
          buffer = buffer.slice(headerEnd + 4);
          continue;
        }

        const length = parseInt(match[1], 10);
        const bodyStart = headerEnd + 4;
        if (buffer.length < bodyStart + length) {
          // Incomplete body, wait for more data
          break;
        }

        const body = buffer.slice(bodyStart, bodyStart + length);
        buffer = buffer.slice(bodyStart + length);

        try {
          const req: JsonRpcRequest = JSON.parse(body);
          const res = dispatchMcpRequest(req, rootDir);
          if (res) sendResponse(res);
        } catch (err: any) {
          sendResponse({
            jsonrpc: '2.0',
            error: {
              code: -32700,
              message: `Parse error: ${err?.message || 'Invalid JSON'}`
            }
          });
        }
        continue;
      }

      // 2. Check for line-delimited JSON
      const newlineIndex = buffer.indexOf('\n');
      if (newlineIndex !== -1) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);

        if (!line) continue;

        try {
          const req: JsonRpcRequest = JSON.parse(line);
          const res = dispatchMcpRequest(req, rootDir);
          if (res) sendResponse(res);
        } catch (err: any) {
          sendResponse({
            jsonrpc: '2.0',
            error: {
              code: -32700,
              message: `Parse error: ${err?.message || 'Invalid JSON'}`
            }
          });
        }
        continue;
      }

      // No complete message in buffer yet
      break;
    }
  });

  process.stdin.on('end', () => {
    // Process remaining buffer if non-empty
    const trimmed = buffer.trim();
    if (trimmed) {
      try {
        const req: JsonRpcRequest = JSON.parse(trimmed);
        const res = dispatchMcpRequest(req, rootDir);
        if (res) sendResponse(res);
      } catch {
        // Stdin closed; exit cleanly
      }
    }
    process.exit(0);
  });
}
