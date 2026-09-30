import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { CanonicalArtifact, CanonicalFrontmatter } from '../types.ts';

export function parseFrontmatter(rawContent: string): { frontmatter: CanonicalFrontmatter; body: string } {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: rawContent };
  }

  const rawYaml = match[1];
  const body = match[2];
  const frontmatter: CanonicalFrontmatter = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey: string | null = null;
  let isArray = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ') && currentKey && isArray) {
      const item = trimmed.slice(2).trim().replace(/^["']|["']$/g, '');
      if (Array.isArray((frontmatter as Record<string, unknown>)[currentKey])) {
        ((frontmatter as Record<string, unknown>)[currentKey] as string[]).push(item);
      }
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();

      if (!val) {
        currentKey = key;
        isArray = true;
        (frontmatter as Record<string, unknown>)[key] = [];
      } else {
        currentKey = key;
        isArray = false;
        const cleanVal = val.replace(/^["']|["']$/g, '');
        (frontmatter as Record<string, unknown>)[key] = cleanVal;
      }
    }
  }

  return { frontmatter, body };
}

export function readCanonicalArtifact(filePath: string): CanonicalArtifact {
  const rawContent = readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(rawContent);
  return {
    filePath,
    frontmatter,
    rawContent,
    body
  };
}

export function listMarkdownFiles(dirPath: string): string[] {
  if (!existsSync(dirPath)) return [];
  const results: string[] = [];

  function walk(current: string) {
    const entries = readdirSync(current);
    for (const entry of entries) {
      const full = join(current, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (stat.isFile() && entry.endsWith('.md')) {
        results.push(full);
      }
    }
  }

  walk(dirPath);
  return results;
}
