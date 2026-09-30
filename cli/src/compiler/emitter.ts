import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import type { CanonicalArtifact, TargetAgent } from '../types.ts';

const START_MARKER = '<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->';
const END_MARKER = '<!-- SAGARITHM:END -->';

export function injectContent(existingContent: string, newContent: string): string {
  const startIndex = existingContent.indexOf(START_MARKER);
  const endIndex = existingContent.indexOf(END_MARKER);

  const block = `${START_MARKER}\n${newContent.trim()}\n${END_MARKER}\n`;

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const before = existingContent.slice(0, startIndex);
    const after = existingContent.slice(endIndex + END_MARKER.length);
    return before + block + after.trimStart();
  }

  if (existingContent.trim().length > 0) {
    return `${existingContent.trim()}\n\n${block}`;
  }

  return block;
}

export function writeSafely(targetPath: string, content: string): void {
  const dir = dirname(targetPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  let finalContent = content;
  if (existsSync(targetPath)) {
    const existing = readFileSync(targetPath, 'utf8');
    finalContent = injectContent(existing, content);
  } else {
    finalContent = `${START_MARKER}\n${content.trim()}\n${END_MARKER}\n`;
  }

  writeFileSync(targetPath, finalContent, 'utf8');
}

export interface CompilationContext {
  rootDir: string;
  constitution: CanonicalArtifact[];
  skills: CanonicalArtifact[];
  policies: CanonicalArtifact[];
  workflows: CanonicalArtifact[];
}

export function compileForTarget(target: TargetAgent, ctx: CompilationContext): string[] {
  const touchedFiles: string[] = [];

  switch (target) {
    case 'cursor': {
      // 1. .cursorrules
      const cursorrulesPath = resolve(ctx.rootDir, '.cursorrules');
      const rulesSummary = [
        '# Sagarithm Engineering Rules (Cursor)',
        '',
        '## Non-Negotiable Invariants',
        ...ctx.policies.map(p => `- **${p.frontmatter.name || 'Policy'}**: ${p.frontmatter.description || ''}`),
        '',
        '## Workflow Lifecycles',
        ...ctx.workflows.map(w => `- **${w.frontmatter.name || 'Workflow'}**: ${w.frontmatter.description || ''}`)
      ].join('\n');
      writeSafely(cursorrulesPath, rulesSummary);
      touchedFiles.push(cursorrulesPath);

      // 2. .cursor/rules/
      const cursorRulesDir = resolve(ctx.rootDir, '.cursor/rules');
      for (const skill of ctx.skills) {
        const id = skill.frontmatter.id || 'skill';
        const fileName = `${id.replace(/\./g, '-')}.mdc`;
        const rulePath = resolve(cursorRulesDir, fileName);
        const mdcContent = [
          '---',
          `description: "${skill.frontmatter.description || skill.frontmatter.name || ''}"`,
          'globs: ["**/*"]',
          'alwaysApply: false',
          '---',
          '',
          `# ${skill.frontmatter.name || id}`,
          '',
          skill.body.trim()
        ].join('\n');
        writeSafely(rulePath, mdcContent);
        touchedFiles.push(rulePath);
      }
      break;
    }

    case 'claude-code': {
      const claudePath = resolve(ctx.rootDir, 'CLAUDE.md');
      const claudeContent = [
        '# CLAUDE.md — Sagarithm Engineering Guidelines',
        '',
        '## Core Philosophy',
        '- Understand before modifying; inspect before creating; minimal necessary change.',
        '- Zero assumed success: always execute tests and verify terminal output before completing tasks.',
        '',
        '## Repository Policies',
        ...ctx.policies.map(p => `- **${p.frontmatter.name || ''}** [${p.frontmatter.severity || 'error'}]: ${p.frontmatter.description || ''}`),
        '',
        '## Task Workflows',
        ...ctx.workflows.map(w => `### ${w.frontmatter.name || ''}\n${w.body.trim()}`)
      ].join('\n');
      writeSafely(claudePath, claudeContent);
      touchedFiles.push(claudePath);
      break;
    }

    case 'copilot': {
      const copilotPath = resolve(ctx.rootDir, '.github/copilot-instructions.md');
      const copilotContent = [
        '# GitHub Copilot Instructions (Sagarithm Kit)',
        '',
        '## Code Generation Standards',
        ...ctx.policies.map(p => `- ${p.frontmatter.name}: ${p.frontmatter.description || ''}`),
        '',
        '## Engineering Practices',
        ...ctx.skills.map(s => `- **${s.frontmatter.name}**: ${s.frontmatter.description || ''}`)
      ].join('\n');
      writeSafely(copilotPath, copilotContent);
      touchedFiles.push(copilotPath);
      break;
    }

    case 'windsurf': {
      const windsurfPath = resolve(ctx.rootDir, '.windsurfrules');
      const windsurfContent = [
        '# Windsurf Cascade Rules (Sagarithm Kit)',
        '',
        '## Directives for Autonomous Actions',
        '- Inspect repository structure before creating any new file or folder.',
        '- Do not create generic "utils" or "helpers" directories.',
        '- Never claim tests or builds succeeded without terminal execution evidence.',
        '',
        '## Policies',
        ...ctx.policies.map(p => `- [${p.frontmatter.severity || 'error'}] ${p.frontmatter.description || ''}`)
      ].join('\n');
      writeSafely(windsurfPath, windsurfContent);
      touchedFiles.push(windsurfPath);
      break;
    }

    case 'codex': {
      const codexPath = resolve(ctx.rootDir, 'codex-instructions.md');
      const codexContent = [
        '# OpenAI Codex System Instructions (Sagarithm Kit)',
        '',
        'You are an expert AI software engineer operating under Sagarithm Kit engineering principles.',
        '',
        '## Invariants',
        ...ctx.policies.map(p => `1. ${p.frontmatter.name}: ${p.frontmatter.description || ''}`),
        '',
        '## Workflows',
        ...ctx.workflows.map(w => `### ${w.frontmatter.name}\n${w.frontmatter.description || ''}`)
      ].join('\n');
      writeSafely(codexPath, codexContent);
      touchedFiles.push(codexPath);
      break;
    }

    case 'antigravity': {
      const rulesDir = resolve(ctx.rootDir, '.agents/rules');
      for (const policy of ctx.policies) {
        const id = policy.frontmatter.id || 'policy';
        const rulePath = resolve(rulesDir, `${id.replace(/\./g, '-')}.md`);
        const content = [
          `# Rule: ${policy.frontmatter.name || id} [${policy.frontmatter.severity?.toUpperCase() || 'ERROR'}]`,
          '',
          policy.body.trim()
        ].join('\n');
        writeSafely(rulePath, content);
        touchedFiles.push(rulePath);
      }
      break;
    }
  }

  return touchedFiles;
}
