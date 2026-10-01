#!/usr/bin/env node

// cli/src/config.ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
var DEFAULT_CONFIG = {
  version: "1.0.1",
  name: "sagarithm-workspace",
  targets: ["cursor", "claude-code", "copilot", "antigravity", "windsurf", "codex"],
  riskThreshold: "high",
  enabledDomains: [
    "architecture",
    "quality",
    "testing",
    "security",
    "documentation"
  ],
  paths: {
    constitution: "./constitution",
    skills: "./skills",
    policies: "./policies",
    workflows: "./workflows",
    adapters: "./adapters"
  }
};
function findWorkspaceRoot(cwd = process.cwd()) {
  let current = cwd;
  while (true) {
    if (existsSync(resolve(current, "sagarithm.config.json")) || existsSync(resolve(current, "ARCHITECTURE.md")) || existsSync(resolve(current, ".git"))) {
      return current;
    }
    const parent = resolve(current, "..");
    if (parent === current) break;
    current = parent;
  }
  return cwd;
}
function loadConfig(rootDir2) {
  const configPath = resolve(rootDir2, "sagarithm.config.json");
  if (!existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }
  try {
    const raw = readFileSync(configPath, "utf8");
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}
function saveConfig(rootDir2, config) {
  const configPath = resolve(rootDir2, "sagarithm.config.json");
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
}

// cli/src/commands/init.ts
import { existsSync as existsSync2 } from "node:fs";
import { resolve as resolve2 } from "node:path";
function runInit(rootDir2, flags) {
  console.log("\u{1F680} Initializing Sagarithm Kit workspace...");
  const configPath = resolve2(rootDir2, "sagarithm.config.json");
  if (existsSync2(configPath) && !flags.includes("--force")) {
    console.log("\u26A0\uFE0F  Workspace is already initialized (sagarithm.config.json exists). Use --force to overwrite.");
    return;
  }
  const detectedTargets = [];
  if (existsSync2(resolve2(rootDir2, ".cursor")) || existsSync2(resolve2(rootDir2, ".cursorrules"))) {
    detectedTargets.push("cursor");
  }
  if (existsSync2(resolve2(rootDir2, "CLAUDE.md")) || existsSync2(resolve2(rootDir2, ".claude"))) {
    detectedTargets.push("claude-code");
  }
  if (existsSync2(resolve2(rootDir2, ".github"))) {
    detectedTargets.push("copilot");
  }
  if (existsSync2(resolve2(rootDir2, ".windsurfrules"))) {
    detectedTargets.push("windsurf");
  }
  const targets = detectedTargets.length > 0 ? detectedTargets : DEFAULT_CONFIG.targets;
  const config = {
    ...DEFAULT_CONFIG,
    targets
  };
  saveConfig(rootDir2, config);
  console.log(`\u2705 Created sagarithm.config.json with targets: ${targets.join(", ")}`);
  console.log("\u{1F4A1} Run `sagarithm sync` to compile canonical specifications into target configurations.");
}

// cli/src/commands/sync.ts
import { resolve as resolve4 } from "node:path";

// cli/src/compiler/parser.ts
import { readFileSync as readFileSync2, readdirSync, statSync, existsSync as existsSync3 } from "node:fs";
import { join } from "node:path";
function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: rawContent };
  }
  const rawYaml = match[1];
  const body = match[2];
  const frontmatter = {};
  const lines = rawYaml.split(/\r?\n/);
  let currentKey = null;
  let isArray = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("- ") && currentKey && isArray) {
      const item = trimmed.slice(2).trim().replace(/^["']|["']$/g, "");
      if (Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey].push(item);
      }
      continue;
    }
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      if (!val) {
        currentKey = key;
        isArray = true;
        frontmatter[key] = [];
      } else {
        currentKey = key;
        isArray = false;
        const cleanVal = val.replace(/^["']|["']$/g, "");
        frontmatter[key] = cleanVal;
      }
    }
  }
  return { frontmatter, body };
}
function readCanonicalArtifact(filePath) {
  const rawContent = readFileSync2(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(rawContent);
  return {
    filePath,
    frontmatter,
    rawContent,
    body
  };
}
function listMarkdownFiles(dirPath) {
  if (!existsSync3(dirPath)) return [];
  const results = [];
  function walk(current) {
    const entries = readdirSync(current);
    for (const entry of entries) {
      const full = join(current, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (stat.isFile() && entry.endsWith(".md")) {
        results.push(full);
      }
    }
  }
  walk(dirPath);
  return results;
}

// cli/src/compiler/emitter.ts
import { existsSync as existsSync4, mkdirSync, readFileSync as readFileSync3, writeFileSync as writeFileSync2 } from "node:fs";
import { dirname, resolve as resolve3 } from "node:path";
var START_MARKER = "<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->";
var END_MARKER = "<!-- SAGARITHM:END -->";
function injectContent(existingContent, newContent) {
  const startIndex = existingContent.indexOf(START_MARKER);
  const endIndex = existingContent.indexOf(END_MARKER);
  const block = `${START_MARKER}
${newContent.trim()}
${END_MARKER}
`;
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const before = existingContent.slice(0, startIndex);
    const after = existingContent.slice(endIndex + END_MARKER.length);
    return before + block + after.trimStart();
  }
  if (existingContent.trim().length > 0) {
    return `${existingContent.trim()}

${block}`;
  }
  return block;
}
function writeSafely(targetPath, content) {
  const dir = dirname(targetPath);
  if (!existsSync4(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  let finalContent = content;
  if (existsSync4(targetPath)) {
    const existing = readFileSync3(targetPath, "utf8");
    finalContent = injectContent(existing, content);
  } else {
    finalContent = `${START_MARKER}
${content.trim()}
${END_MARKER}
`;
  }
  writeFileSync2(targetPath, finalContent, "utf8");
}
function compileForTarget(target, ctx) {
  const touchedFiles = [];
  switch (target) {
    case "cursor": {
      const cursorrulesPath = resolve3(ctx.rootDir, ".cursorrules");
      const rulesSummary = [
        "# Sagarithm Engineering Rules (Cursor)",
        "",
        "## Non-Negotiable Invariants",
        ...ctx.policies.map((p) => `- **${p.frontmatter.name || "Policy"}**: ${p.frontmatter.description || ""}`),
        "",
        "## Workflow Lifecycles",
        ...ctx.workflows.map((w) => `- **${w.frontmatter.name || "Workflow"}**: ${w.frontmatter.description || ""}`)
      ].join("\n");
      writeSafely(cursorrulesPath, rulesSummary);
      touchedFiles.push(cursorrulesPath);
      const cursorRulesDir = resolve3(ctx.rootDir, ".cursor/rules");
      for (const skill of ctx.skills) {
        const id = skill.frontmatter.id || "skill";
        const fileName = `${id.replace(/\./g, "-")}.mdc`;
        const rulePath = resolve3(cursorRulesDir, fileName);
        const mdcContent = [
          "---",
          `description: "${skill.frontmatter.description || skill.frontmatter.name || ""}"`,
          'globs: ["**/*"]',
          "alwaysApply: false",
          "---",
          "",
          `# ${skill.frontmatter.name || id}`,
          "",
          skill.body.trim()
        ].join("\n");
        writeSafely(rulePath, mdcContent);
        touchedFiles.push(rulePath);
      }
      break;
    }
    case "claude-code": {
      const claudePath = resolve3(ctx.rootDir, "CLAUDE.md");
      const claudeContent = [
        "# CLAUDE.md \u2014 Sagarithm Engineering Guidelines",
        "",
        "## Core Philosophy",
        "- Understand before modifying; inspect before creating; minimal necessary change.",
        "- Zero assumed success: always execute tests and verify terminal output before completing tasks.",
        "",
        "## Repository Policies",
        ...ctx.policies.map((p) => `- **${p.frontmatter.name || ""}** [${p.frontmatter.severity || "error"}]: ${p.frontmatter.description || ""}`),
        "",
        "## Task Workflows",
        ...ctx.workflows.map((w) => `### ${w.frontmatter.name || ""}
${w.body.trim()}`)
      ].join("\n");
      writeSafely(claudePath, claudeContent);
      touchedFiles.push(claudePath);
      break;
    }
    case "copilot": {
      const copilotPath = resolve3(ctx.rootDir, ".github/copilot-instructions.md");
      const copilotContent = [
        "# GitHub Copilot Instructions (Sagarithm Kit)",
        "",
        "## Code Generation Standards",
        ...ctx.policies.map((p) => `- ${p.frontmatter.name}: ${p.frontmatter.description || ""}`),
        "",
        "## Engineering Practices",
        ...ctx.skills.map((s) => `- **${s.frontmatter.name}**: ${s.frontmatter.description || ""}`)
      ].join("\n");
      writeSafely(copilotPath, copilotContent);
      touchedFiles.push(copilotPath);
      break;
    }
    case "windsurf": {
      const windsurfPath = resolve3(ctx.rootDir, ".windsurfrules");
      const windsurfContent = [
        "# Windsurf Cascade Rules (Sagarithm Kit)",
        "",
        "## Directives for Autonomous Actions",
        "- Inspect repository structure before creating any new file or folder.",
        '- Do not create generic "utils" or "helpers" directories.',
        "- Never claim tests or builds succeeded without terminal execution evidence.",
        "",
        "## Policies",
        ...ctx.policies.map((p) => `- [${p.frontmatter.severity || "error"}] ${p.frontmatter.description || ""}`)
      ].join("\n");
      writeSafely(windsurfPath, windsurfContent);
      touchedFiles.push(windsurfPath);
      break;
    }
    case "codex": {
      const codexPath = resolve3(ctx.rootDir, "codex-instructions.md");
      const codexContent = [
        "# OpenAI Codex System Instructions (Sagarithm Kit)",
        "",
        "You are an expert AI software engineer operating under Sagarithm Kit engineering principles.",
        "",
        "## Invariants",
        ...ctx.policies.map((p) => `1. ${p.frontmatter.name}: ${p.frontmatter.description || ""}`),
        "",
        "## Workflows",
        ...ctx.workflows.map((w) => `### ${w.frontmatter.name}
${w.frontmatter.description || ""}`)
      ].join("\n");
      writeSafely(codexPath, codexContent);
      touchedFiles.push(codexPath);
      break;
    }
    case "antigravity": {
      const rulesDir = resolve3(ctx.rootDir, ".agents/rules");
      for (const policy of ctx.policies) {
        const id = policy.frontmatter.id || "policy";
        const rulePath = resolve3(rulesDir, `${id.replace(/\./g, "-")}.md`);
        const content = [
          `# Rule: ${policy.frontmatter.name || id} [${policy.frontmatter.severity?.toUpperCase() || "ERROR"}]`,
          "",
          policy.body.trim()
        ].join("\n");
        writeSafely(rulePath, content);
        touchedFiles.push(rulePath);
      }
      break;
    }
  }
  return touchedFiles;
}

// cli/src/commands/sync.ts
function runSync(rootDir2, args2) {
  console.log("\u{1F504} Syncing Sagarithm Kit canonical specifications to target agents...");
  const config = loadConfig(rootDir2);
  const constitutionFiles = listMarkdownFiles(resolve4(rootDir2, config.paths.constitution));
  const skillFiles = listMarkdownFiles(resolve4(rootDir2, config.paths.skills)).filter((f) => f.endsWith("SKILL.md"));
  const policyFiles = listMarkdownFiles(resolve4(rootDir2, config.paths.policies)).filter((f) => !f.endsWith("README.md"));
  const workflowFiles = listMarkdownFiles(resolve4(rootDir2, config.paths.workflows)).filter((f) => !f.endsWith("README.md"));
  const ctx = {
    rootDir: rootDir2,
    constitution: constitutionFiles.map(readCanonicalArtifact),
    skills: skillFiles.map(readCanonicalArtifact),
    policies: policyFiles.map(readCanonicalArtifact),
    workflows: workflowFiles.map(readCanonicalArtifact)
  };
  console.log(`\u{1F4E6} Loaded canonical assets: ${ctx.constitution.length} articles, ${ctx.skills.length} skills, ${ctx.policies.length} policies, ${ctx.workflows.length} workflows.`);
  let targetList = config.targets;
  const targetFlagIdx = args2.indexOf("--target");
  if (targetFlagIdx !== -1 && args2[targetFlagIdx + 1]) {
    targetList = [args2[targetFlagIdx + 1]];
  }
  let totalEmitted = 0;
  for (const target of targetList) {
    const emitted = compileForTarget(target, ctx);
    totalEmitted += emitted.length;
    console.log(`  \u2713 Compiled for [${target}]: ${emitted.length} files updated.`);
  }
  console.log(`\u2728 Sync complete! Updated ${totalEmitted} target configuration files.`);
}

// cli/src/commands/doctor.ts
import { existsSync as existsSync5, readFileSync as readFileSync4 } from "node:fs";
import { resolve as resolve5 } from "node:path";
function runDoctor(rootDir2) {
  console.log("\u{1FA7A} Running Sagarithm Doctor on workspace...");
  const config = loadConfig(rootDir2);
  let issueCount = 0;
  const gitignorePath = resolve5(rootDir2, ".gitignore");
  if (!existsSync5(gitignorePath)) {
    console.log("  \u274C Missing .gitignore file (severity: error)");
    issueCount++;
  } else {
    const content = readFileSync4(gitignorePath, "utf8");
    const requiredPatterns = [".env", ".gemini/"];
    for (const pat of requiredPatterns) {
      if (!content.includes(pat)) {
        console.log(`  \u26A0\uFE0F  .gitignore is missing recommended entry: '${pat}' (severity: warn)`);
        issueCount++;
      }
    }
  }
  const forbiddenFolders = ["utils", "helpers", "src/utils", "src/helpers", "common"];
  for (const f of forbiddenFolders) {
    if (existsSync5(resolve5(rootDir2, f))) {
      console.log(`  \u274C Detected generic structural sprawl folder: '${f}' (violates policy.directory-creation)`);
      issueCount++;
    }
  }
  const hasLockfile = existsSync5(resolve5(rootDir2, "package-lock.json")) || existsSync5(resolve5(rootDir2, "pnpm-lock.yaml")) || existsSync5(resolve5(rootDir2, "yarn.lock")) || existsSync5(resolve5(rootDir2, "Cargo.lock")) || existsSync5(resolve5(rootDir2, "poetry.lock"));
  if (!hasLockfile) {
    console.log("  \u26A0\uFE0F  No package lockfile detected in repository root (violates policy.dependency-management)");
    issueCount++;
  }
  console.log(`  \u2139\uFE0F  Configured targets: ${config.targets.join(", ")}`);
  if (issueCount === 0) {
    console.log("\u{1F389} Doctor passed! Workspace is in full compliance with Sagarithm Kit specifications.");
  } else {
    console.log(`\u26A0\uFE0F  Doctor completed with ${issueCount} warning(s)/issue(s). Review recommendations above.`);
  }
}

// cli/src/commands/audit.ts
import { readdirSync as readdirSync4, statSync as statSync4, existsSync as existsSync9, writeFileSync as writeFileSync3 } from "node:fs";
import { resolve as resolve9, relative as relative3 } from "node:path";

// cli/src/validation/secrets.ts
import { spawnSync } from "node:child_process";
import { readFileSync as readFileSync5, existsSync as existsSync6 } from "node:fs";
import { resolve as resolve6 } from "node:path";
var KNOWN_SECRET_RULES = [
  {
    id: "sec-001",
    name: "Stripe Secret API Key",
    pattern: /sk_(?:live|test)_[0-9a-zA-Z]{24,}/,
    severity: "error",
    remediation: "Move Stripe secret keys to environment variables or secret store. Never commit live or test credentials."
  },
  {
    id: "sec-002",
    name: "GitHub Personal Access Token",
    pattern: /(?:ghp|gho|ghu|ghs|ghr)_[0-9a-zA-Z]{36}/,
    severity: "error",
    remediation: "Revoke the exposed GitHub token immediately and use fine-grained GitHub Actions secrets or environment variables."
  },
  {
    id: "sec-003",
    name: "Google / Gemini API Key",
    pattern: /AIzaSy[0-9a-zA-Z\-_]{30,35}/,
    severity: "error",
    remediation: "Extract the Google API key into GEMINI_API_KEY environment variable and add to .env."
  },
  {
    id: "sec-004",
    name: "OpenAI API Key",
    pattern: /sk-[0-9a-zA-Z]{20}T3BlbkFJ[0-9a-zA-Z]{20}|sk-proj-[0-9a-zA-Z-_]{48,}/,
    severity: "error",
    remediation: "Rotate and configure OpenAI credentials via OPENAI_API_KEY in process environment."
  },
  {
    id: "sec-005",
    name: "AWS Access Key ID",
    pattern: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/,
    severity: "error",
    remediation: "Rotate AWS access key pair immediately; use AWS IAM roles or temporary STS credentials."
  },
  {
    id: "sec-006",
    name: "Private Cryptographic Key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
    severity: "error",
    remediation: "Never commit private cryptographic key blocks into source code repositories."
  },
  {
    id: "sec-007",
    name: "Unparameterized SQL Injection Concatenation",
    pattern: /(?:SELECT|INSERT|UPDATE|DELETE)\s+.*(?:WHERE|VALUES|SET)\s+.*['"`][^;\n]*\s*\+/i,
    severity: "error",
    remediation: "Replace string concatenation with parameterized SQL bindings ($1, ?) or an approved query builder."
  }
];
function calculateShannonEntropy(str) {
  if (!str || str.length === 0) return 0;
  const frequencies = /* @__PURE__ */ new Map();
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
function scanContentForSecrets(content, filePath) {
  const issues = [];
  const lines = content.split("\n");
  lines.forEach((line, index) => {
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
    const assignmentPattern = /(?:api[_-]?key|secret|token|password|auth|bearer)\s*[:=]\s*['"`]([A-Za-z0-9+/=_-]{24,})['"`]/i;
    const match = assignmentPattern.exec(line);
    if (match && match[1]) {
      const candidateToken = match[1];
      const entropy = calculateShannonEntropy(candidateToken);
      if (entropy >= 4.5) {
        issues.push({
          ruleId: "policy.security-boundary.sec-entropy",
          severity: "error",
          file: filePath,
          line: index + 1,
          message: `Detected high-entropy credential string (${entropy.toFixed(2)} bits/char)`,
          remediation: "Replace hardcoded high-entropy credential with an environment variable lookup."
        });
      }
    }
  });
  return issues;
}
function scanGitDiffForSecrets(rootDir2) {
  const gitDiff = spawnSync("git", ["diff", "HEAD"], { cwd: rootDir2, encoding: "utf8" });
  const diffOutput = gitDiff.stdout || "";
  return scanContentForSecrets(diffOutput, "git:diff");
}
function scanFilesForSecrets(rootDir2, files) {
  const issues = [];
  for (const relFile of files) {
    const fullPath = resolve6(rootDir2, relFile);
    if (!existsSync6(fullPath)) continue;
    try {
      const content = readFileSync5(fullPath, "utf8");
      issues.push(...scanContentForSecrets(content, relFile));
    } catch {
    }
  }
  return issues;
}

// cli/src/validation/fitness.ts
import { readdirSync as readdirSync3, statSync as statSync3, existsSync as existsSync8, readFileSync as readFileSync7 } from "node:fs";
import { resolve as resolve8, relative as relative2 } from "node:path";

// cli/src/graph/indexer.ts
import { existsSync as existsSync7, readdirSync as readdirSync2, readFileSync as readFileSync6, statSync as statSync2 } from "node:fs";
import { join as join2, relative, resolve as resolve7 } from "node:path";
var IGNORED_DIRS = /* @__PURE__ */ new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".gemini",
  ".agents/scratch",
  "coverage"
]);
function scanRepositoryFiles(rootDir2) {
  const fileList = [];
  function walk(current) {
    const entries = readdirSync2(current);
    for (const entry of entries) {
      if (IGNORED_DIRS.has(entry)) continue;
      const fullPath = join2(current, entry);
      const stat = statSync2(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        fileList.push(fullPath);
      }
    }
  }
  walk(rootDir2);
  return fileList;
}
function extractExports(fileContent) {
  const exports = [];
  const exportRegex = /export\s+(?:default\s+)?(?:async\s+)?(?:function|class|const|let|var|interface|type)\s+([a-zA-Z0-9_$]+)/g;
  let match;
  while ((match = exportRegex.exec(fileContent)) !== null) {
    exports.push(match[1]);
  }
  return exports;
}
function extractImports(fileContent) {
  const imports = [];
  const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(fileContent)) !== null) {
    imports.push(match[1]);
  }
  return imports;
}
function buildProjectGraph(rootDir2) {
  const allFiles = scanRepositoryFiles(rootDir2);
  const relativeFiles = allFiles.map((f) => relative(rootDir2, f).replace(/\\/g, "/"));
  const moduleMap = /* @__PURE__ */ new Map();
  for (const relPath of relativeFiles) {
    const parts = relPath.split("/");
    let moduleName = "root";
    if (parts.length > 1) {
      moduleName = parts[0] === "src" && parts.length > 2 ? `${parts[0]}/${parts[1]}` : parts[0];
    }
    if (!moduleMap.has(moduleName)) {
      moduleMap.set(moduleName, { files: [], exports: [], imports: [], tests: [] });
    }
    const mod = moduleMap.get(moduleName);
    mod.files.push(relPath);
    if (relPath.includes(".test.") || relPath.includes(".spec.")) {
      mod.tests.push(relPath);
    }
    if (/\.(ts|tsx|js|jsx|mjs|py|rs|go)$/.test(relPath)) {
      try {
        const content = readFileSync6(resolve7(rootDir2, relPath), "utf8");
        mod.exports.push(...extractExports(content));
        mod.imports.push(...extractImports(content));
      } catch {
      }
    }
  }
  const modules = [];
  for (const [name, data] of moduleMap.entries()) {
    modules.push({
      name,
      path: name === "root" ? "." : name,
      files: data.files,
      exports: Array.from(new Set(data.exports)),
      imports: Array.from(new Set(data.imports)),
      tests: data.tests
    });
  }
  let dependencies = {};
  const pkgPath = resolve7(rootDir2, "package.json");
  if (existsSync7(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync6(pkgPath, "utf8"));
      dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
    } catch {
    }
  }
  return {
    version: "1.0.1",
    name: "sagarithm-project",
    rootPath: rootDir2,
    modules,
    allFiles: relativeFiles,
    dependencies
  };
}

// cli/src/validation/fitness.ts
var PROHIBITED_DIR_NAMES = /* @__PURE__ */ new Set(["utils", "helpers", "misc", "common"]);
var IGNORED_DIRS2 = /* @__PURE__ */ new Set(["node_modules", ".git", ".sagarithm", "dist", "build", ".gemini"]);
function checkDirectoryFitness(dir, rootDir2) {
  const issues = [];
  try {
    const entries = readdirSync3(dir);
    for (const entry of entries) {
      if (IGNORED_DIRS2.has(entry)) continue;
      const fullPath = resolve8(dir, entry);
      const stat = statSync3(fullPath);
      if (stat.isDirectory()) {
        const lowerName = entry.toLowerCase();
        if (PROHIBITED_DIR_NAMES.has(lowerName)) {
          const relPath = relative2(rootDir2, fullPath).replace(/\\/g, "/");
          issues.push({
            ruleId: "policy.directory-creation.arch-001",
            severity: "error",
            file: relPath,
            message: `Prohibited generic directory detected: '${relPath}'. Violates single responsibility & bounded context policy.`,
            remediation: "Colocate utilities with their owning domain module or rename to a domain-named capability directory."
          });
        }
        issues.push(...checkDirectoryFitness(fullPath, rootDir2));
      }
    }
  } catch {
  }
  return issues;
}
function checkGraphAcyclicity(graph) {
  const issues = [];
  const visited = /* @__PURE__ */ new Set();
  const recursionStack = /* @__PURE__ */ new Set();
  const cycles = [];
  function dfs(nodeId, currentPath) {
    visited.add(nodeId);
    recursionStack.add(nodeId);
    const outgoing = graph.edges.filter((e) => e.source === nodeId);
    for (const edge of outgoing) {
      if (!visited.has(edge.target)) {
        dfs(edge.target, [...currentPath, edge.target]);
      } else if (recursionStack.has(edge.target)) {
        const cycleStartIndex = currentPath.indexOf(edge.target);
        if (cycleStartIndex !== -1) {
          cycles.push([...currentPath.slice(cycleStartIndex), edge.target]);
        }
      }
    }
    recursionStack.delete(nodeId);
  }
  for (const node of graph.nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id, [node.id]);
    }
  }
  for (const cycle of cycles) {
    issues.push({
      ruleId: "policy.architecture-fitness.arch-002",
      severity: "error",
      message: `Circular dependency detected in graph: ${cycle.join(" -> ")}`,
      remediation: "Break the circular dependency cycle using dependency inversion, events, or shared interfaces."
    });
  }
  return issues;
}
function buildTopologyFromProject(projectGraph) {
  const nodes = projectGraph.modules.map((m) => ({
    id: m.name,
    path: m.path
  }));
  const edges = [];
  for (const mod of projectGraph.modules) {
    for (const imp of mod.imports) {
      for (const other of projectGraph.modules) {
        if (other.name !== mod.name && (imp.includes(other.name) || other.files.some((f) => imp.endsWith(f)))) {
          edges.push({ source: mod.name, target: other.name, type: "import" });
        }
      }
    }
  }
  return { nodes, edges };
}
function evaluateArchitecturalFitness(rootDir2) {
  const issues = [];
  issues.push(...checkDirectoryFitness(rootDir2, rootDir2));
  try {
    const projectGraph = buildProjectGraph(rootDir2);
    const topo = buildTopologyFromProject(projectGraph);
    issues.push(...checkGraphAcyclicity(topo));
  } catch {
  }
  const manifestPath = resolve8(rootDir2, "sagarithm.manifest.json");
  if (existsSync8(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync7(manifestPath, "utf8"));
      if (manifest.entrypoints && Array.isArray(manifest.entrypoints)) {
        for (const entry of manifest.entrypoints) {
          const entryFile = resolve8(rootDir2, entry.path);
          if (!existsSync8(entryFile)) {
            issues.push({
              ruleId: "policy.architecture-fitness.arch-manifest",
              severity: "warn",
              file: entry.path,
              message: `Declared manifest entrypoint does not exist: '${entry.path}'`,
              remediation: "Update sagarithm.manifest.json or recreate the missing entrypoint file."
            });
          }
        }
      }
    } catch {
    }
  }
  return issues;
}

// cli/src/commands/audit.ts
function findWorkspaceFiles(dir, rootDir2) {
  const IGNORE = /* @__PURE__ */ new Set(["node_modules", ".git", ".sagarithm", "dist", "build", ".gemini"]);
  const files = [];
  try {
    const entries = readdirSync4(dir);
    for (const entry of entries) {
      if (IGNORE.has(entry)) continue;
      const fullPath = resolve9(dir, entry);
      const stat = statSync4(fullPath);
      if (stat.isDirectory()) {
        files.push(...findWorkspaceFiles(fullPath, rootDir2));
      } else if (stat.isFile()) {
        const rel = relative3(rootDir2, fullPath).replace(/\\/g, "/");
        if (/\.(?:ts|js|mjs|cjs|json|md|yaml|yml|html|css|py|sh|env)$/i.test(entry) && !entry.includes(".test.") && !entry.includes(".spec.")) {
          files.push(rel);
        }
      }
    }
  } catch {
  }
  return files;
}
function runAudit(rootDir2, args2 = []) {
  const isDeep = args2.includes("--deep");
  const isStrict = args2.includes("--strict");
  const isJson = args2.includes("--json");
  const isFix = args2.includes("--fix");
  if (isFix) {
    console.log("\u{1F527} Auto-remediating safe policy issues...");
    const manifestPath = resolve9(rootDir2, "sagarithm.manifest.json");
    if (!existsSync9(manifestPath)) {
      const graph = buildProjectGraph(rootDir2);
      const manifestData = {
        version: "1.0.1",
        name: graph.name,
        totalFiles: graph.allFiles.length,
        modules: graph.modules.map((m) => ({
          name: m.name,
          path: m.path,
          fileCount: m.files.length,
          exports: m.exports,
          tests: m.tests
        })),
        dependencies: graph.dependencies
      };
      writeFileSync3(manifestPath, JSON.stringify(manifestData, null, 2) + "\n", "utf8");
      console.log("  \u2714 Regenerated missing sagarithm.manifest.json.");
    }
  }
  if (!isJson) {
    console.log(`\u{1F50D} Auditing workspace against active Sagarithm policies (${isDeep ? "Deep Scan" : "Git Diff Scan"})...`);
  }
  const issues = [];
  if (isDeep) {
    const files = findWorkspaceFiles(rootDir2, rootDir2);
    issues.push(...scanFilesForSecrets(rootDir2, files));
  } else {
    issues.push(...scanGitDiffForSecrets(rootDir2));
  }
  issues.push(...evaluateArchitecturalFitness(rootDir2));
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warn");
  if (isJson) {
    console.log(
      JSON.stringify(
        {
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          mode: isDeep ? "deep" : "diff",
          summary: {
            totalIssues: issues.length,
            errors: errors.length,
            warnings: warnings.length
          },
          issues
        },
        null,
        2
      )
    );
  } else {
    if (issues.length === 0) {
      console.log("\u2705 Audit clean! Zero policy violations detected in workspace.");
    } else {
      console.log(`
\u26A0\uFE0F  Audit identified ${issues.length} issue(s) (${errors.length} error(s), ${warnings.length} warning(s)):`);
      for (const issue of issues) {
        const location = issue.file ? ` [${issue.file}${issue.line ? `:${issue.line}` : ""}]` : "";
        console.log(`  [${issue.severity.toUpperCase()}] ${issue.ruleId}${location}: ${issue.message}`);
        console.log(`    \u21B3 Remediation: ${issue.remediation}`);
      }
    }
  }
  if (errors.length > 0 || isStrict && warnings.length > 0) {
    process.exitCode = 1;
  }
}

// cli/src/validation/engine.ts
import { spawnSync as spawnSync2 } from "node:child_process";
import { existsSync as existsSync10, readFileSync as readFileSync8, writeFileSync as writeFileSync4, mkdirSync as mkdirSync2 } from "node:fs";
import { resolve as resolve10 } from "node:path";
function runNpmScript(script, rootDir2) {
  if (process.platform === "win32") {
    return spawnSync2("cmd.exe", ["/c", "npm", "run", script], { cwd: rootDir2, encoding: "utf8" });
  }
  return spawnSync2("npm", ["run", script], { cwd: rootDir2, encoding: "utf8" });
}
function runVerificationPipeline(rootDir2, options = {}) {
  const issues = [];
  const vectors = {};
  let testsExecuted = false;
  let testsPassed = false;
  let staticExecuted = false;
  let staticPassed = false;
  const pkgPath = resolve10(rootDir2, "package.json");
  let pkgScripts = {};
  if (existsSync10(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync8(pkgPath, "utf8"));
      pkgScripts = pkg.scripts || {};
    } catch {
    }
  }
  const staticStart = Date.now();
  if (pkgScripts.lint || pkgScripts.typecheck) {
    staticExecuted = true;
    let allStaticOk = true;
    if (pkgScripts.lint) {
      const lintRes = runNpmScript("lint", rootDir2);
      if (lintRes.status !== 0) {
        allStaticOk = false;
        issues.push({
          ruleId: "vector.static.lint",
          severity: "error",
          message: "Linter reported errors or warnings.",
          remediation: "Run `npm run lint` and resolve all formatting and syntax violations."
        });
      }
    }
    if (pkgScripts.typecheck) {
      const typeRes = runNpmScript("typecheck", rootDir2);
      if (typeRes.status !== 0) {
        allStaticOk = false;
        issues.push({
          ruleId: "vector.static.typecheck",
          severity: "error",
          message: "Static type checking failed.",
          remediation: "Run `npm run typecheck` and resolve all TypeScript diagnostics."
        });
      }
    }
    staticPassed = allStaticOk;
    vectors.static = {
      status: allStaticOk ? "passed" : "failed",
      durationMs: Date.now() - staticStart
    };
  } else {
    vectors.static = {
      status: "skipped",
      durationMs: Date.now() - staticStart,
      details: "No lint or typecheck script configured in package.json"
    };
  }
  const secStart = Date.now();
  const secIssues = scanGitDiffForSecrets(rootDir2);
  issues.push(...secIssues);
  const secFailed = secIssues.some((i) => i.severity === "error");
  vectors.security = {
    status: secFailed ? "failed" : secIssues.length > 0 ? "warn" : "passed",
    durationMs: Date.now() - secStart,
    details: `${secIssues.length} issue(s) detected`
  };
  const archStart = Date.now();
  const archIssues = evaluateArchitecturalFitness(rootDir2);
  issues.push(...archIssues);
  const archFailed = archIssues.some((i) => i.severity === "error");
  vectors.architecture = {
    status: archFailed ? "failed" : archIssues.length > 0 ? "warn" : "passed",
    durationMs: Date.now() - archStart,
    details: `${archIssues.length} issue(s) detected`
  };
  const testStart = Date.now();
  const testCmd = options.suite ? `test:${options.suite}` : "test";
  if (pkgScripts[testCmd] || pkgScripts.test) {
    testsExecuted = true;
    const scriptToRun = pkgScripts[testCmd] ? testCmd : "test";
    const testRes = runNpmScript(scriptToRun, rootDir2);
    if (testRes.status === 0) {
      testsPassed = true;
      vectors.behavioral = {
        status: "passed",
        durationMs: Date.now() - testStart,
        details: `Passed test suite: ${scriptToRun}`
      };
    } else {
      testsPassed = false;
      issues.push({
        ruleId: "vector.behavioral.tests-failed",
        severity: "error",
        message: `Test execution failed with exit code ${testRes.status}.`,
        remediation: "Execute `npm test` locally to reproduce and correct test failures."
      });
      vectors.behavioral = {
        status: "failed",
        durationMs: Date.now() - testStart,
        details: `Exited with code ${testRes.status}`
      };
    }
  } else {
    vectors.behavioral = {
      status: "skipped",
      durationMs: Date.now() - testStart,
      details: "No test script found in package.json"
    };
  }
  const docStart = Date.now();
  const manifestExists = existsSync10(resolve10(rootDir2, "sagarithm.manifest.json"));
  vectors.documentation = {
    status: manifestExists ? "passed" : "warn",
    durationMs: Date.now() - docStart,
    details: manifestExists ? "Project topology manifest is present" : "sagarithm.manifest.json not yet generated"
  };
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warnCount = issues.filter((i) => i.severity === "warn").length;
  const totalChecks = Object.keys(vectors).length;
  const passedChecks = Object.values(vectors).filter((v) => v.status === "passed").length;
  let state;
  if (errorCount > 0 || testsExecuted && !testsPassed) {
    state = "FAILED";
  } else if (options.strict && warnCount > 0) {
    state = "FAILED";
  } else if (testsExecuted && testsPassed && errorCount === 0) {
    state = "VERIFIED";
  } else if (testsExecuted && testsPassed) {
    state = "TESTED";
  } else if (staticExecuted && staticPassed) {
    state = "IMPLEMENTED";
  } else {
    state = "ASSUMED";
  }
  const report = {
    version: "1.0.1",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    state,
    summary: {
      totalChecks,
      passed: passedChecks,
      warnings: warnCount,
      errors: errorCount
    },
    vectors,
    issues
  };
  const sagarithmDir = resolve10(rootDir2, ".sagarithm");
  if (!existsSync10(sagarithmDir)) {
    try {
      mkdirSync2(sagarithmDir, { recursive: true });
    } catch {
    }
  }
  try {
    writeFileSync4(resolve10(sagarithmDir, "audit-report.json"), JSON.stringify(report, null, 2), "utf8");
  } catch {
  }
  return report;
}

// cli/src/commands/verify.ts
function runVerify(rootDir2, args2 = []) {
  const isStrict = args2.includes("--strict");
  const isDeep = args2.includes("--deep");
  const isJson = args2.includes("--json");
  const suiteIndex = args2.indexOf("--suite");
  const suite = suiteIndex !== -1 && args2[suiteIndex + 1] ? args2[suiteIndex + 1] : void 0;
  if (!isJson) {
    console.log("\u{1F6E1}\uFE0F  Running Sagarithm Multi-Vector Verification Gate (Zero Assumed Success)...");
    if (isStrict) console.log("   Mode: STRICT (Zero Warnings Tolerated)");
    if (suite) console.log(`   Target Suite: ${suite}`);
  }
  const report = runVerificationPipeline(rootDir2, { strict: isStrict, deep: isDeep, suite });
  if (isJson) {
    console.log(JSON.stringify(report, null, 2));
    if (report.state === "FAILED") {
      process.exitCode = 1;
    }
    return;
  }
  console.log("\n\u{1F4CA} Multi-Dimensional Verification Vectors:");
  const vectorEntries = Object.entries(report.vectors);
  for (const [vectorName, result] of vectorEntries) {
    if (!result) continue;
    let badge = "\u26AA";
    if (result.status === "passed") badge = "\u2705 PASS";
    else if (result.status === "failed") badge = "\u274C FAIL";
    else if (result.status === "warn") badge = "\u26A0\uFE0F  WARN";
    else if (result.status === "skipped") badge = "\u23ED\uFE0F  SKIP";
    const duration = result.durationMs !== void 0 ? ` (${result.durationMs}ms)` : "";
    const details = result.details ? ` \u2014 ${result.details}` : "";
    console.log(`  ${badge.padEnd(8)} [${vectorName.toUpperCase()}]${duration}${details}`);
  }
  if (report.issues.length > 0) {
    console.log(`
\u26A0\uFE0F  Verification identified ${report.issues.length} issue(s):`);
    for (const issue of report.issues) {
      const loc = issue.file ? ` (${issue.file}${issue.line ? `:${issue.line}` : ""})` : "";
      console.log(`  [${issue.severity.toUpperCase()}] ${issue.ruleId}${loc}: ${issue.message}`);
      console.log(`    \u21B3 Remediation: ${issue.remediation}`);
    }
  }
  console.log("\n" + "=".repeat(60));
  if (report.state === "VERIFIED") {
    console.log("\u{1F3C6} VERIFICATION STATE: [VERIFIED]");
    console.log("   All multi-vector verification criteria satisfied with empirical evidence.");
  } else if (report.state === "TESTED") {
    console.log("\u{1F9EA} VERIFICATION STATE: [TESTED]");
    console.log("   Test suites passed, but secondary vector warnings or unverified checks remain.");
  } else if (report.state === "IMPLEMENTED") {
    console.log("\u2699\uFE0F  VERIFICATION STATE: [IMPLEMENTED]");
    console.log("   Static analysis passed, but behavioral test execution has not run.");
  } else if (report.state === "ASSUMED") {
    console.log("\u2753 VERIFICATION STATE: [ASSUMED]");
    console.log("   Code modified without verified automated checks. Promotion rejected.");
    process.exitCode = 1;
  } else {
    console.log("\u274C VERIFICATION STATE: [FAILED]");
    console.log("   Verification gate failed. Zero Assumed Success violated; fix failing checks.");
    process.exitCode = 1;
  }
  console.log("=".repeat(60));
}

// cli/src/commands/context.ts
import { writeFileSync as writeFileSync5 } from "node:fs";
import { resolve as resolve11 } from "node:path";

// cli/src/graph/query.ts
function findExistingAbstractions(graph, query) {
  const normalized = query.toLowerCase();
  const results = [];
  for (const mod of graph.modules) {
    for (const exp of mod.exports) {
      if (exp.toLowerCase().includes(normalized)) {
        results.push({
          symbol: exp,
          module: mod.name,
          files: mod.files.filter((f) => !f.includes(".test.") && !f.includes(".spec."))
        });
      }
    }
  }
  return results;
}
function calculateBlastRadius(graph, targetFile) {
  const normalizedTarget = targetFile.replace(/\\/g, "/");
  const targetBase = normalizedTarget.replace(/\.[^/.]+$/, "");
  const affectedModules = /* @__PURE__ */ new Set();
  const affectedTests = /* @__PURE__ */ new Set();
  for (const mod of graph.modules) {
    const importsTarget = mod.imports.some((imp) => {
      return normalizedTarget.includes(imp) || imp.includes(targetBase);
    });
    const containsTarget = mod.files.includes(normalizedTarget);
    if (importsTarget || containsTarget) {
      affectedModules.add(mod.name);
      for (const t of mod.tests) {
        affectedTests.add(t);
      }
    }
  }
  return {
    targetPath: normalizedTarget,
    affectedModules: Array.from(affectedModules),
    affectedTests: Array.from(affectedTests)
  };
}
function suggestModuleLocation(graph, domainHint) {
  if (domainHint) {
    const matchingModule = graph.modules.find((m) => m.name.toLowerCase().includes(domainHint.toLowerCase()));
    if (matchingModule) {
      return matchingModule.path;
    }
  }
  const srcModule = graph.modules.find((m) => m.name.startsWith("src/"));
  if (srcModule) {
    return srcModule.path;
  }
  return "src";
}
function calculateSystemComplexity(graph) {
  const Ca = {};
  const Ce = {};
  const instability = {};
  for (const mod of graph.modules) {
    Ca[mod.name] = 0;
    Ce[mod.name] = 0;
  }
  for (const mod of graph.modules) {
    for (const other of graph.modules) {
      if (mod.name === other.name) continue;
      const dependsOnOther = mod.imports.some((imp) => imp.includes(other.name) || other.files.some((f) => imp.endsWith(f)));
      if (dependsOnOther) {
        Ce[mod.name] = (Ce[mod.name] || 0) + 1;
        Ca[other.name] = (Ca[other.name] || 0) + 1;
      }
    }
  }
  let totalInstability = 0;
  let evaluatedModules = 0;
  for (const mod of graph.modules) {
    const ca = Ca[mod.name] || 0;
    const ce = Ce[mod.name] || 0;
    const denom = ca + ce;
    const inst = denom === 0 ? 0 : Number((ce / denom).toFixed(2));
    instability[mod.name] = inst;
    totalInstability += inst;
    evaluatedModules++;
  }
  const totalExports = graph.modules.reduce((acc, m) => acc + m.exports.length, 0);
  return {
    totalModules: graph.modules.length,
    totalFiles: graph.allFiles.length,
    totalExports,
    afferentCoupling: Ca,
    efferentCoupling: Ce,
    instability,
    averageInstability: evaluatedModules === 0 ? 0 : Number((totalInstability / evaluatedModules).toFixed(2))
  };
}
function detectOrphanAbstractions(graph) {
  const orphans = [];
  const allImportStatements = graph.modules.flatMap((m) => m.imports);
  for (const mod of graph.modules) {
    for (const exp of mod.exports) {
      const isReferencedInImports = allImportStatements.some((imp) => imp.includes(exp));
      if (!isReferencedInImports) {
        orphans.push({
          symbol: exp,
          module: mod.name
        });
      }
    }
  }
  return orphans;
}

// cli/src/commands/context.ts
function runContext(rootDir2, args2) {
  const subCommand = args2[0] || "generate";
  console.log("\u{1F9E0} Running Sagarithm Project Intelligence...");
  const graph = buildProjectGraph(rootDir2);
  switch (subCommand) {
    case "generate": {
      const manifestPath = resolve11(rootDir2, "sagarithm.manifest.json");
      const manifestData = {
        version: "1.0.1",
        name: graph.name,
        totalFiles: graph.allFiles.length,
        modules: graph.modules.map((m) => ({
          name: m.name,
          path: m.path,
          fileCount: m.files.length,
          exports: m.exports,
          tests: m.tests
        })),
        dependencies: graph.dependencies
      };
      writeFileSync5(manifestPath, JSON.stringify(manifestData, null, 2) + "\n", "utf8");
      console.log(`\u2705 Project graph generated: Indexed ${graph.modules.length} modules, ${graph.allFiles.length} files.`);
      console.log(`\u{1F4C4} Saved topology manifest to sagarithm.manifest.json`);
      break;
    }
    case "stats": {
      const metrics = calculateSystemComplexity(graph);
      console.log("\u{1F4CA} Architectural System Complexity & Coupling Metrics:");
      console.log(`  - Total Modules: ${metrics.totalModules}`);
      console.log(`  - Total Files:   ${metrics.totalFiles}`);
      console.log(`  - Total Exports: ${metrics.totalExports}`);
      console.log(`  - Average Architectural Instability: ${metrics.averageInstability} (0.0 = maximal stability, 1.0 = maximal instability)
`);
      console.log("  Module Breakdown:");
      for (const [mod, inst] of Object.entries(metrics.instability)) {
        const ca = metrics.afferentCoupling[mod] || 0;
        const ce = metrics.efferentCoupling[mod] || 0;
        console.log(`    \u21B3 [${mod}] Ca: ${ca} (inbound) | Ce: ${ce} (outbound) | Instability: ${inst}`);
      }
      break;
    }
    case "orphans": {
      console.log("\u{1F50D} Scanning workspace for unused / unimported exports...");
      const orphans = detectOrphanAbstractions(graph);
      if (orphans.length === 0) {
        console.log("\u2705 Clean! No unimported public abstractions detected.");
      } else {
        console.log(`\u26A0\uFE0F  Found ${orphans.length} unreferenced exported symbol(s):`);
        for (const o of orphans.slice(0, 10)) {
          console.log(`  - [${o.module}] ${o.symbol}`);
        }
        if (orphans.length > 10) {
          console.log(`  ... and ${orphans.length - 10} more.`);
        }
      }
      break;
    }
    case "find": {
      const query = args2[1];
      if (!query) {
        console.log("\u274C Error: Please specify a search query (e.g. `sagarithm context find AuthService`)");
        process.exitCode = 1;
        return;
      }
      console.log(`\u{1F50D} Searching for existing abstractions matching '${query}'...`);
      const matches = findExistingAbstractions(graph, query);
      if (matches.length === 0) {
        console.log(`\u2139\uFE0F  No existing abstraction found matching '${query}'.`);
      } else {
        console.log(`\u{1F3AF} Found ${matches.length} matching abstraction(s):`);
        for (const m of matches) {
          console.log(`  - Symbol: ${m.symbol} (in module: '${m.module}')`);
          for (const f of m.files.slice(0, 3)) {
            console.log(`    \u21B3 ${f}`);
          }
        }
      }
      break;
    }
    case "blast-radius": {
      const targetFile = args2[1];
      if (!targetFile) {
        console.log("\u274C Error: Please specify a target file (e.g. `sagarithm context blast-radius src/auth/jwt.ts`)");
        process.exitCode = 1;
        return;
      }
      const result = calculateBlastRadius(graph, targetFile);
      console.log(`\u{1F4A5} Blast Radius Analysis for: ${result.targetPath}`);
      console.log(`  - Affected Modules (${result.affectedModules.length}): ${result.affectedModules.join(", ") || "None"}`);
      console.log(`  - Associated Test Suites (${result.affectedTests.length}):`);
      for (const t of result.affectedTests) {
        console.log(`    \u21B3 ${t}`);
      }
      break;
    }
    case "suggest-location": {
      const domainHint = args2[1];
      const suggestion = suggestModuleLocation(graph, domainHint);
      console.log(`\u{1F4CD} Location Suggestion for domain '${domainHint || "general"}':`);
      console.log(`  \u21B3 Place new files in: '${suggestion}' (adheres to policy.directory-creation)`);
      break;
    }
    default:
      console.log(`Unknown context action '${subCommand}'. Supported: generate, stats, orphans, find, blast-radius, suggest-location.`);
      break;
  }
}

// cli/src/commands/preset.ts
import { existsSync as existsSync12, readFileSync as readFileSync10, writeFileSync as writeFileSync7 } from "node:fs";
import { resolve as resolve13 } from "node:path";

// cli/src/registry/loader.ts
import { existsSync as existsSync11, readFileSync as readFileSync9, mkdirSync as mkdirSync3, writeFileSync as writeFileSync6 } from "node:fs";
import { resolve as resolve12, basename } from "node:path";
import { createHash } from "node:crypto";
function loadRegistryIndex(rootDir2) {
  const candidates = [
    resolve12(rootDir2, "registry/index.json"),
    resolve12(rootDir2, "../registry/index.json")
  ];
  for (const cand of candidates) {
    if (existsSync11(cand)) {
      try {
        return JSON.parse(readFileSync9(cand, "utf8"));
      } catch {
      }
    }
  }
  return null;
}
function loadPreset(rootDir2, presetId) {
  const index = loadRegistryIndex(rootDir2);
  if (index && index.presets[presetId]) {
    return index.presets[presetId];
  }
  const directPath = resolve12(rootDir2, `registry/presets/${presetId}.json`);
  if (existsSync11(directPath)) {
    try {
      return JSON.parse(readFileSync9(directPath, "utf8"));
    } catch {
    }
  }
  return null;
}
function searchRegistry(rootDir2, query) {
  const index = loadRegistryIndex(rootDir2);
  const q = query.toLowerCase();
  if (!index) {
    return { presets: [], packages: [] };
  }
  const matchedPresets = Object.values(index.presets).filter(
    (p) => p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.enabledDomains.some((d) => d.toLowerCase().includes(q))
  );
  const matchedPackages = index.packages.filter(
    (pkg) => pkg.name.toLowerCase().includes(q) || pkg.description.toLowerCase().includes(q) || pkg.domain && pkg.domain.toLowerCase().includes(q)
  );
  return { presets: matchedPresets, packages: matchedPackages };
}
function computeIntegrityHash(content) {
  const hash = createHash("sha256").update(content, "utf8").digest("hex");
  return `sha256-${hash}`;
}
function packArtifact(rootDir2, targetPath) {
  const absPath = resolve12(rootDir2, targetPath);
  if (!existsSync11(absPath)) {
    throw new Error(`Target path does not exist: ${targetPath}`);
  }
  const skillFile = existsSync11(resolve12(absPath, "SKILL.md")) ? resolve12(absPath, "SKILL.md") : null;
  const content = skillFile ? readFileSync9(skillFile, "utf8") : readFileSync9(absPath, "utf8");
  const base = basename(absPath).replace(/\.md$/, "");
  const integrity = computeIntegrityHash(content);
  const manifest = {
    name: `@sagarithm/skill-${base}`,
    version: "1.0.1",
    type: "skill",
    description: `Packaged canonical artifact for ${base}`,
    author: "Sagarithm Community",
    license: "Apache-2.0",
    integrity,
    entrypoint: skillFile ? "SKILL.md" : basename(absPath)
  };
  const distDir = resolve12(rootDir2, ".sagarithm/dist");
  if (!existsSync11(distDir)) {
    mkdirSync3(distDir, { recursive: true });
  }
  const packageFileName = `${manifest.name.replace(/[@/]/g, "-")}-1.0.1.json`;
  const packagePath = resolve12(distDir, packageFileName);
  const bundle = {
    manifest,
    content
  };
  writeFileSync6(packagePath, JSON.stringify(bundle, null, 2), "utf8");
  return { packagePath, manifest };
}

// cli/src/commands/preset.ts
function runPreset(rootDir2, args2) {
  const subcommand = args2[0] || "list";
  switch (subcommand) {
    case "list": {
      console.log("\u{1F4E6} Available Sagarithm Engineering Presets:\n");
      const catalog = loadRegistryIndex(rootDir2);
      if (!catalog || Object.keys(catalog.presets).length === 0) {
        console.log("\u26A0\uFE0F  No presets found in canonical registry.");
        return;
      }
      for (const [id, preset] of Object.entries(catalog.presets)) {
        console.log(`  \u{1F31F} [${id}] \u2014 ${preset.name} (Risk: ${preset.riskThreshold.toUpperCase()})`);
        console.log(`     ${preset.description}`);
        console.log(`     Domains: ${preset.enabledDomains.join(", ")}`);
        console.log(`     Skills:  ${preset.skills.length} | Policies: ${preset.policies.length} | Workflows: ${preset.workflows.length}
`);
      }
      console.log("Apply a preset to this workspace with:");
      console.log("  sagarithm preset apply <preset-id>\n");
      break;
    }
    case "show": {
      const presetId = args2[1];
      if (!presetId) {
        console.log("\u274C Error: Missing preset ID. Example: sagarithm preset show fullstack-web");
        process.exitCode = 1;
        return;
      }
      const preset = loadPreset(rootDir2, presetId);
      if (!preset) {
        console.log(`\u274C Error: Preset '${presetId}' not found.`);
        process.exitCode = 1;
        return;
      }
      console.log(`
Preset: ${preset.name} [${preset.id}]`);
      console.log(`Description:   ${preset.description}`);
      console.log(`Risk Threshold: ${preset.riskThreshold}`);
      console.log(`Enabled Domains: ${preset.enabledDomains.join(", ")}`);
      console.log(`
Included Skills (${preset.skills.length}):`);
      preset.skills.forEach((s) => console.log(`  - ${s}`));
      console.log(`
Active Policies (${preset.policies.length}):`);
      preset.policies.forEach((p) => console.log(`  - ${p}`));
      console.log(`
Workflows (${preset.workflows.length}):`);
      preset.workflows.forEach((w) => console.log(`  - ${w}`));
      break;
    }
    case "apply": {
      const presetId = args2[1];
      if (!presetId) {
        console.log("\u274C Error: Missing preset ID. Example: sagarithm preset apply fullstack-web");
        process.exitCode = 1;
        return;
      }
      const preset = loadPreset(rootDir2, presetId);
      if (!preset) {
        console.log(`\u274C Error: Preset '${presetId}' not found.`);
        process.exitCode = 1;
        return;
      }
      console.log(`\u2699\uFE0F  Applying preset '${preset.name}' to workspace...`);
      const configPath = resolve13(rootDir2, "sagarithm.config.json");
      let config;
      if (existsSync12(configPath)) {
        try {
          config = JSON.parse(readFileSync10(configPath, "utf8"));
        } catch {
          console.log("\u26A0\uFE0F  Existing config invalid; creating new configuration.");
          config = {
            version: "1.0.1",
            name: "sagarithm-project",
            targets: ["antigravity", "cursor", "claude-code"],
            riskThreshold: preset.riskThreshold,
            enabledDomains: preset.enabledDomains,
            paths: {
              constitution: "constitution",
              skills: "skills",
              policies: "policies",
              workflows: "workflows",
              adapters: "adapters"
            }
          };
        }
      } else {
        config = {
          version: "1.0.1",
          name: "sagarithm-project",
          targets: ["antigravity", "cursor", "claude-code", "copilot", "windsurf", "codex"],
          riskThreshold: preset.riskThreshold,
          enabledDomains: preset.enabledDomains,
          paths: {
            constitution: "constitution",
            skills: "skills",
            policies: "policies",
            workflows: "workflows",
            adapters: "adapters"
          }
        };
      }
      config.riskThreshold = preset.riskThreshold;
      config.enabledDomains = Array.from(/* @__PURE__ */ new Set([...config.enabledDomains, ...preset.enabledDomains]));
      writeFileSync7(configPath, JSON.stringify(config, null, 2), "utf8");
      console.log(`\u2705 Successfully applied preset '${presetId}'!`);
      console.log(`   Risk Threshold: ${config.riskThreshold}`);
      console.log(`   Enabled Domains: ${config.enabledDomains.join(", ")}`);
      console.log("\nRun `sagarithm sync` to compile the updated profile to your active AI agent configurations.");
      break;
    }
    default:
      console.log(`Unknown preset subcommand: ${subcommand}`);
      console.log("Available commands: list, show <id>, apply <id>");
      process.exitCode = 1;
      break;
  }
}

// cli/src/commands/registry.ts
function runRegistry(rootDir2, args2) {
  const subcommand = args2[0] || "help";
  switch (subcommand) {
    case "search": {
      const query = args2[1] || "";
      if (!query) {
        console.log("\u{1F50D} Usage: sagarithm registry search <query>");
        return;
      }
      console.log(`\u{1F50D} Searching Sagarithm Registry for '${query}'...
`);
      const { presets, packages } = searchRegistry(rootDir2, query);
      if (presets.length === 0 && packages.length === 0) {
        console.log("\u2139\uFE0F  No matching presets or packages found.");
        return;
      }
      if (presets.length > 0) {
        console.log(`\u{1F4E6} Presets (${presets.length}):`);
        for (const p of presets) {
          console.log(`  \u{1F31F} [preset] ${p.id} \u2014 ${p.name}`);
          console.log(`     ${p.description}`);
          console.log(`     \u21B3 Apply: sagarithm preset apply ${p.id}
`);
        }
      }
      if (packages.length > 0) {
        console.log(`\u{1F9E9} Packages (${packages.length}):`);
        for (const pkg of packages) {
          const dom = pkg.domain ? ` [${pkg.domain}]` : "";
          console.log(`  \u{1F3F7}\uFE0F  [${pkg.type}] ${pkg.name}${dom} (v${pkg.version})`);
          console.log(`     ${pkg.description}`);
          console.log(`     \u21B3 Entrypoint: ${pkg.entrypoint}
`);
        }
      }
      break;
    }
    case "pack": {
      const targetPath = args2[1];
      if (!targetPath) {
        console.log("\u274C Error: Missing target path to pack. Example: sagarithm registry pack ./skills/architecture/system-design");
        process.exitCode = 1;
        return;
      }
      try {
        console.log(`\u{1F4E6} Packaging canonical artifact from '${targetPath}'...`);
        const { packagePath, manifest } = packArtifact(rootDir2, targetPath);
        console.log(`\u2705 Successfully packaged ${manifest.name} (v${manifest.version})!`);
        console.log(`   Integrity: ${manifest.integrity}`);
        console.log(`   Artifact:  ${packagePath}`);
      } catch (err) {
        console.log(`\u274C Packaging failed: ${err.message}`);
        process.exitCode = 1;
      }
      break;
    }
    case "help":
    default:
      console.log(`
Sagarithm Registry Commands:
  sagarithm registry search <query>   Search canonical presets and packages
  sagarithm registry pack <path>      Package a skill or policy with SHA-256 integrity
`);
      break;
  }
}

// cli/src/commands/run.ts
import { existsSync as existsSync13, mkdirSync as mkdirSync4, writeFileSync as writeFileSync8 } from "node:fs";
import { resolve as resolve14 } from "node:path";
function runWorkflow(rootDir2, args2) {
  const workflowName = args2[0];
  if (!workflowName || workflowName === "help") {
    console.log(`
\u{1F916} Sagarithm Autonomous Workflow Orchestrator (v1.0.1)

Usage:
  sagarithm run <workflow-name> [options]

Standard Workflows:
  feature-development   Orchestrate end-to-end feature lifecycle (Analyze -> ADR -> TDD -> Verify -> Sync)
  bug-fix               Orchestrate defect resolution (Red Reproduce -> Minimal Patch -> Green Verify)
  refactoring           Orchestrate behavior-preserving refactoring (Baseline -> Atomic Transform -> Parity)
  release               Orchestrate release governance (SemVer -> Audit -> Verify -> Package)

Options:
  --strict              Enforce zero-warning tolerance during execution verification
`);
    return;
  }
  const isStrict = args2.includes("--strict");
  console.log(`\u{1F680} Orchestrating Autonomous Workflow: [${workflowName}]`);
  console.log(`   Strict Mode: ${isStrict ? "ENABLED" : "DISABLED"}`);
  const runId = `run-${Date.now()}`;
  const runRecord = {
    workflowId: workflowName,
    runId,
    startedAt: (/* @__PURE__ */ new Date()).toISOString(),
    currentPhase: 1,
    totalPhases: 4,
    status: "in-progress",
    phases: []
  };
  try {
    console.log("\n\u25B6 Phase 1: Project Intelligence & Topology Analysis...");
    const graph = buildProjectGraph(rootDir2);
    console.log(`  \u2714 Indexed ${graph.modules.length} modules and ${graph.allFiles.length} files.`);
    runRecord.phases.push({
      name: "Topology Analysis",
      passed: true,
      details: `${graph.modules.length} modules, ${graph.allFiles.length} files`
    });
    console.log("\n\u25B6 Phase 2: Architectural Policy Pre-Flight & Hygiene...");
    const manifestExists = existsSync13(resolve14(rootDir2, "sagarithm.manifest.json"));
    if (!manifestExists) {
      console.log("  \u26A0\uFE0F  Missing sagarithm.manifest.json \u2014 Auto-generating topology manifest...");
      const manifestData = {
        version: "1.0.1",
        name: graph.name,
        totalFiles: graph.allFiles.length,
        modules: graph.modules.map((m) => ({
          name: m.name,
          path: m.path,
          fileCount: m.files.length,
          exports: m.exports,
          tests: m.tests
        })),
        dependencies: graph.dependencies
      };
      writeFileSync8(resolve14(rootDir2, "sagarithm.manifest.json"), JSON.stringify(manifestData, null, 2), "utf8");
      console.log("  \u2714 Generated sagarithm.manifest.json.");
    } else {
      console.log("  \u2714 Topology manifest verified.");
    }
    runRecord.phases.push({
      name: "Policy Pre-Flight",
      passed: true,
      details: "Architecture and manifest verified"
    });
    console.log("\n\u25B6 Phase 3: Empirical Execution Verification Gate...");
    const report = runVerificationPipeline(rootDir2, { strict: isStrict });
    if (report.state === "FAILED") {
      console.log("  \u274C Verification Gate FAILED. Halting autonomous workflow.");
      runRecord.status = "failed";
      runRecord.phases.push({
        name: "Verification Gate",
        passed: false,
        details: `Verification state: ${report.state}`
      });
      process.exitCode = 1;
      return;
    }
    console.log(`  \u2714 Verification Gate PASSED. State: [${report.state}].`);
    runRecord.phases.push({
      name: "Verification Gate",
      passed: true,
      details: `Verification state: ${report.state}`
    });
    console.log("\n\u25B6 Phase 4: Workflow Finalization & Audit Logging...");
    runRecord.status = "passed";
    runRecord.completedAt = (/* @__PURE__ */ new Date()).toISOString();
    runRecord.phases.push({
      name: "Workflow Finalization",
      passed: true,
      details: "Audit trail recorded cleanly"
    });
    const runsDir = resolve14(rootDir2, ".sagarithm/runs");
    if (!existsSync13(runsDir)) {
      mkdirSync4(runsDir, { recursive: true });
    }
    writeFileSync8(resolve14(runsDir, `${runId}.json`), JSON.stringify(runRecord, null, 2), "utf8");
    console.log(`
\u{1F3C6} Autonomous Workflow [${workflowName}] COMPLETED SUCCESSFULLY!`);
    console.log(`   Run ID: ${runId}`);
    console.log(`   Execution Log: .sagarithm/runs/${runId}.json`);
  } catch (err) {
    console.log(`
\u274C Workflow error: ${err.message}`);
    runRecord.status = "failed";
    process.exitCode = 1;
  }
}

// cli/src/index.ts
var args = process.argv.slice(2);
var command = args[0] || "help";
var rootDir = findWorkspaceRoot();
function printHelp() {
  console.log(`
Sagarithm Kit CLI (v1.0.1)
Universal Cross-Agent Engineering Framework for AI Coding Agents

Usage:
  sagarithm <command> [options]

Commands:
  init      Initialize Sagarithm Kit workspace configuration (sagarithm.config.json)
  preset    List, inspect, and apply curated engineering presets (fullstack-web, api-backend, etc.)
  registry  Search canonical catalog and package artifacts with SHA-256 integrity
  sync      Compile canonical specifications into native agent configurations
  run       Orchestrate autonomous canonical workflow (feature-development, bug-fix, release)
  context   Generate and query repository intelligence graph (find, blast-radius, suggest-location)
  doctor    Diagnose repository structure, .gitignore hygiene, and policy conformance
  audit     Audit workspace against security, secrets, and architecture policies (--fix to remediate)
  verify    Run execution verification gate (Zero Assumed Success)
  help      Display this help menu

Options:
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
  case "init":
    runInit(rootDir, args.slice(1));
    break;
  case "preset":
    runPreset(rootDir, args.slice(1));
    break;
  case "registry":
    runRegistry(rootDir, args.slice(1));
    break;
  case "run":
    runWorkflow(rootDir, args.slice(1));
    break;
  case "sync":
  case "compile":
    runSync(rootDir, args.slice(1));
    break;
  case "context":
  case "graph":
    runContext(rootDir, args.slice(1));
    break;
  case "doctor":
    runDoctor(rootDir);
    break;
  case "audit":
    runAudit(rootDir, args.slice(1));
    break;
  case "verify":
    runVerify(rootDir, args.slice(1));
    break;
  case "version":
  case "--version":
  case "-v":
    console.log("1.0.1");
    break;
  case "help":
  case "--help":
  case "-h":
  default:
    printHelp();
    break;
}
