import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadConfig } from '../config.ts';

export function runDoctor(rootDir: string): void {
  console.log('🩺 Running Sagarithm Doctor on workspace...');
  const config = loadConfig(rootDir);
  let issueCount = 0;

  // 1. Check gitignore
  const gitignorePath = resolve(rootDir, '.gitignore');
  if (!existsSync(gitignorePath)) {
    console.log('  ❌ Missing .gitignore file (severity: error)');
    issueCount++;
  } else {
    const content = readFileSync(gitignorePath, 'utf8');
    const requiredPatterns = ['.env', '.gemini/'];
    for (const pat of requiredPatterns) {
      if (!content.includes(pat)) {
        console.log(`  ⚠️  .gitignore is missing recommended entry: '${pat}' (severity: warn)`);
        issueCount++;
      }
    }
  }

  // 2. Check for anti-pattern folders
  const forbiddenFolders = ['utils', 'helpers', 'src/utils', 'src/helpers', 'common'];
  for (const f of forbiddenFolders) {
    if (existsSync(resolve(rootDir, f))) {
      console.log(`  ❌ Detected generic structural sprawl folder: '${f}' (violates policy.directory-creation)`);
      issueCount++;
    }
  }

  // 3. Check for lockfiles
  const hasLockfile =
    existsSync(resolve(rootDir, 'package-lock.json')) ||
    existsSync(resolve(rootDir, 'pnpm-lock.yaml')) ||
    existsSync(resolve(rootDir, 'yarn.lock')) ||
    existsSync(resolve(rootDir, 'Cargo.lock')) ||
    existsSync(resolve(rootDir, 'poetry.lock'));

  if (!hasLockfile) {
    console.log('  ⚠️  No package lockfile detected in repository root (violates policy.dependency-management)');
    issueCount++;
  }

  // 4. Check targets
  console.log(`  ℹ️  Configured targets: ${config.targets.join(', ')}`);

  if (issueCount === 0) {
    console.log('🎉 Doctor passed! Workspace is in full compliance with Sagarithm Kit specifications.');
  } else {
    console.log(`⚠️  Doctor completed with ${issueCount} warning(s)/issue(s). Review recommendations above.`);
  }
}
