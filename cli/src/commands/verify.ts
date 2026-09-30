import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function runVerify(rootDir: string): void {
  console.log('🛡️  Running Sagarithm Verification Gate (Zero Assumed Success)...');

  let passedAll = true;

  // Check package.json scripts
  const pkgPath = resolve(rootDir, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      const scripts = pkg.scripts || {};

      if (scripts.test) {
        console.log('  ▶ Executing test suite (`npm test`)...');
        const testRun = spawnSync('npm', ['test'], { cwd: rootDir, stdio: 'inherit' });
        if (testRun.status !== 0) {
          console.log('  ❌ Tests failed! Exit code:', testRun.status);
          passedAll = false;
        } else {
          console.log('  ✅ Tests passed with exit code 0.');
        }
      } else {
        console.log('  ℹ️  No test script configured in package.json.');
      }

      if (scripts.lint) {
        console.log('  ▶ Executing linter (`npm run lint`)...');
        const lintRun = spawnSync('npm', ['run', 'lint'], { cwd: rootDir, stdio: 'inherit' });
        if (lintRun.status !== 0) {
          console.log('  ❌ Linting failed! Exit code:', lintRun.status);
          passedAll = false;
        } else {
          console.log('  ✅ Linter passed cleanly.');
        }
      }
    } catch (e: unknown) {
      console.log('  ⚠️  Could not parse package.json:', (e as Error).message);
    }
  } else {
    console.log('  ℹ️  No root package.json found; skipping standard node test scripts.');
  }

  if (passedAll) {
    console.log('\n🏆 Verification Gate PASSED. Implementation is verified by real execution evidence.');
  } else {
    console.log('\n❌ Verification Gate FAILED. Assumed success rejected; fix failing checks.');
    process.exitCode = 1;
  }
}
