import { existsSync, readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { createHash } from 'node:crypto';

export interface PresetDefinition {
  id: string;
  name: string;
  version: string;
  description: string;
  riskThreshold: 'low' | 'medium' | 'high' | 'critical';
  enabledDomains: string[];
  skills: string[];
  policies: string[];
  workflows: string[];
  recommendedTargets?: string[];
}

export interface PackageManifest {
  name: string;
  version: string;
  type: string;
  domain?: string;
  description: string;
  author: string;
  license: string;
  integrity?: string;
  entrypoint: string;
}

export interface RegistryCatalog {
  version: string;
  name: string;
  url?: string;
  updatedAt: string;
  presets: Record<string, PresetDefinition>;
  packages: PackageManifest[];
}

/**
 * Loads the local canonical registry index.
 */
export function loadRegistryIndex(rootDir: string): RegistryCatalog | null {
  const candidates = [
    resolve(rootDir, 'registry/index.json'),
    resolve(rootDir, '../registry/index.json')
  ];

  for (const cand of candidates) {
    if (existsSync(cand)) {
      try {
        return JSON.parse(readFileSync(cand, 'utf8'));
      } catch {
        // Parse error
      }
    }
  }
  return null;
}

/**
 * Loads a specific preset by ID.
 */
export function loadPreset(rootDir: string, presetId: string): PresetDefinition | null {
  const index = loadRegistryIndex(rootDir);
  if (index && index.presets[presetId]) {
    return index.presets[presetId];
  }

  const directPath = resolve(rootDir, `registry/presets/${presetId}.json`);
  if (existsSync(directPath)) {
    try {
      return JSON.parse(readFileSync(directPath, 'utf8'));
    } catch {
      // Parse error
    }
  }

  return null;
}

/**
 * Searches the registry for keywords in presets or packages.
 */
export function searchRegistry(rootDir: string, query: string): { presets: PresetDefinition[]; packages: PackageManifest[] } {
  const index = loadRegistryIndex(rootDir);
  const q = query.toLowerCase();

  if (!index) {
    return { presets: [], packages: [] };
  }

  const matchedPresets = Object.values(index.presets).filter(
    (p) =>
      p.id.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.enabledDomains.some((d) => d.toLowerCase().includes(q))
  );

  const matchedPackages = index.packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(q) ||
      pkg.description.toLowerCase().includes(q) ||
      (pkg.domain && pkg.domain.toLowerCase().includes(q))
  );

  return { presets: matchedPresets, packages: matchedPackages };
}

/**
 * Computes a SHA-256 integrity hash for an artifact file or directory bundle.
 */
export function computeIntegrityHash(content: string): string {
  const hash = createHash('sha256').update(content, 'utf8').digest('hex');
  return `sha256-${hash}`;
}

/**
 * Packages a canonical skill or policy folder into an integrity-validated bundle.
 */
export function packArtifact(rootDir: string, targetPath: string): { packagePath: string; manifest: PackageManifest } {
  const absPath = resolve(rootDir, targetPath);
  if (!existsSync(absPath)) {
    throw new Error(`Target path does not exist: ${targetPath}`);
  }

  const skillFile = existsSync(resolve(absPath, 'SKILL.md')) ? resolve(absPath, 'SKILL.md') : null;
  const content = skillFile ? readFileSync(skillFile, 'utf8') : readFileSync(absPath, 'utf8');

  const base = basename(absPath).replace(/\.md$/, '');
  const integrity = computeIntegrityHash(content);

  const manifest: PackageManifest = {
    name: `@sagarithm/skill-${base}`,
    version: '1.0.1',
    type: 'skill',
    description: `Packaged canonical artifact for ${base}`,
    author: 'Sagarithm Community',
    license: 'Apache-2.0',
    integrity,
    entrypoint: skillFile ? 'SKILL.md' : basename(absPath)
  };

  const distDir = resolve(rootDir, '.sagarithm/dist');
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  const packageFileName = `${manifest.name.replace(/[@/]/g, '-')}-1.0.1.json`;
  const packagePath = resolve(distDir, packageFileName);

  const bundle = {
    manifest,
    content
  };

  writeFileSync(packagePath, JSON.stringify(bundle, null, 2), 'utf8');

  return { packagePath, manifest };
}
