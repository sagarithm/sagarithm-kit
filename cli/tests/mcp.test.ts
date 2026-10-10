import test from 'node:test';
import assert from 'node:assert';
import { resolve } from 'node:path';
import { dispatchMcpRequest, MCP_TOOLS, SKILL_MAP } from '../src/mcp/server.ts';

const rootDir = resolve(import.meta.dirname, '../..');

test('MCP: initialize handshake conforms to 2024-11-05 protocol', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      clientInfo: { name: 'antigravity-ide', version: '2.0' }
    }
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  assert.strictEqual(res.id, 1);
  assert.strictEqual(res.result.protocolVersion, '2024-11-05');
  assert.strictEqual(res.result.serverInfo.name, 'sagarithm-kit-mcp');
  assert.strictEqual(res.result.serverInfo.version, '1.1.1');
  assert.ok(res.result.capabilities.tools);
});

test('MCP: notifications/initialized is acknowledged with null response', () => {
  const req = {
    jsonrpc: '2.0' as const,
    method: 'notifications/initialized'
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.strictEqual(res, null, 'Notifications must not produce a response');
});

test('MCP: ping responds with empty result object', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 42,
    method: 'ping'
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  assert.strictEqual(res.id, 42);
  assert.deepStrictEqual(res.result, {});
});

test('MCP: tools/list returns all 6 architectural tools with schemas', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 'req-tools-list',
    method: 'tools/list'
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  assert.strictEqual(res.id, 'req-tools-list');
  assert.strictEqual(res.result.tools.length, 6);

  const toolNames = res.result.tools.map((t: any) => t.name);
  assert.ok(toolNames.includes('sagarithm_verify'));
  assert.ok(toolNames.includes('sagarithm_scan_secrets'));
  assert.ok(toolNames.includes('sagarithm_query_graph'));
  assert.ok(toolNames.includes('sagarithm_validate_idea'));
  assert.ok(toolNames.includes('sagarithm_health'));
  assert.ok(toolNames.includes('sagarithm_get_skill'));
});

test('MCP: sagarithm_verify executes verification gate', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 101,
    method: 'tools/call',
    params: {
      name: 'sagarithm_verify',
      arguments: { strict: false }
    }
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  assert.strictEqual(res.id, 101);
  assert.ok(res.result.content[0].text.includes('Sagarithm Verification Gate Status'));
  assert.ok(res.result.content[0].text.includes('STATIC'));
  assert.ok(res.result.content[0].text.includes('SECURITY'));
});

test('MCP: sagarithm_scan_secrets detects credential leaks and passes clean code', () => {
  // Test clean code
  const cleanReq = {
    jsonrpc: '2.0' as const,
    id: 201,
    method: 'tools/call',
    params: {
      name: 'sagarithm_scan_secrets',
      arguments: { content: 'export const API_URL = "https://api.example.com";' }
    }
  };
  const cleanRes = dispatchMcpRequest(cleanReq, rootDir);
  assert.ok(cleanRes?.result.content[0].text.includes('Zero secrets or high-entropy tokens detected'));

  // Test leaking code
  const mockStripe = ['sk', 'live', '51AbCdEfGhIjKlMnOpQrStUvWxYz123456789'].join('_');
  const leakReq = {
    jsonrpc: '2.0' as const,
    id: 202,
    method: 'tools/call',
    params: {
      name: 'sagarithm_scan_secrets',
      arguments: { content: `const key = "${mockStripe}";` }
    }
  };
  const leakRes = dispatchMcpRequest(leakReq, rootDir);
  assert.ok(leakRes?.result.content[0].text.includes('Detected'));
  assert.ok(leakRes?.result.content[0].text.includes('sec-001'));
});

test('MCP: sagarithm_query_graph inspects repository topology and abstractions', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 301,
    method: 'tools/call',
    params: {
      name: 'sagarithm_query_graph',
      arguments: { symbol: 'buildProjectGraph' }
    }
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  assert.ok(res.result.content[0].text.includes('Sagarithm Repository Topology'));
  assert.ok(res.result.content[0].text.includes('buildProjectGraph'));
});

test('MCP: sagarithm_validate_idea stress-tests concept without blind compliance', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 401,
    method: 'tools/call',
    params: {
      name: 'sagarithm_validate_idea',
      arguments: { idea: 'Autonomous Micro-SaaS Agent Swarm' }
    }
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  const text = res.result.content[0].text;
  assert.ok(text.includes('Sagarithm Architectural Truth Assessment'));
  assert.ok(text.includes('Autonomous Micro-SaaS Agent Swarm'));
  assert.ok(text.includes('Anti-Rationalization Checklist'));
  assert.ok(text.includes('Do NOT agree blindly'));
});

test('MCP: sagarithm_health computes composite health index', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 501,
    method: 'tools/call',
    params: {
      name: 'sagarithm_health',
      arguments: {}
    }
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  const text = res.result.content[0].text;
  assert.ok(text.includes('Sagarithm Codebase Health Index'));
  assert.ok(text.includes('Structural Hygiene'));
  assert.ok(text.includes('Modularity & Coupling'));
});

test('MCP: sagarithm_get_skill retrieves canonical skills', () => {
  for (const skillKey of ['ideation', 'spec', 'planning', 'review', 'shipping', 'modularity', 'security', 'testing', 'coding', 'adr']) {
    const req = {
      jsonrpc: '2.0' as const,
      id: `skill-${skillKey}`,
      method: 'tools/call',
      params: {
        name: 'sagarithm_get_skill',
        arguments: { skillId: skillKey }
      }
    };

    const res = dispatchMcpRequest(req, rootDir);
    assert.ok(res);
    assert.ok(res.result.content[0].text.includes('---'), `Skill ${skillKey} must contain frontmatter`);
    assert.ok(res.result.content[0].text.includes('Anti-Rationalization'), `Skill ${skillKey} must contain anti-rationalization table`);
  }
});

test('MCP: unknown method returns JSON-RPC -32601 error', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 999,
    method: 'unknown/method'
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  assert.strictEqual(res.error?.code, -32601);
  assert.ok(res.error?.message.includes('Unhandled method'));
});

test('MCP: unknown tool returns JSON-RPC -32601 error', () => {
  const req = {
    jsonrpc: '2.0' as const,
    id: 1000,
    method: 'tools/call',
    params: {
      name: 'non_existent_tool',
      arguments: {}
    }
  };

  const res = dispatchMcpRequest(req, rootDir);
  assert.ok(res);
  assert.strictEqual(res.error?.code, -32601);
  assert.ok(res.error?.message.includes('Tool "non_existent_tool" not recognized'));
});
