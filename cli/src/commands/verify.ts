import { runVerificationPipeline } from '../validation/engine.ts';

export function runVerify(rootDir: string, args: string[] = []): void {
  const isStrict = args.includes('--strict');
  const isDeep = args.includes('--deep');
  const isJson = args.includes('--json');
  
  const suiteIndex = args.indexOf('--suite');
  const suite = suiteIndex !== -1 && args[suiteIndex + 1] ? args[suiteIndex + 1] : undefined;

  if (!isJson) {
    console.log('🛡️  Running Sagarithm Multi-Vector Verification Gate (Zero Assumed Success)...');
    if (isStrict) console.log('   Mode: STRICT (Zero Warnings Tolerated)');
    if (suite) console.log(`   Target Suite: ${suite}`);
  }

  const report = runVerificationPipeline(rootDir, { strict: isStrict, deep: isDeep, suite });

  if (isJson) {
    console.log(JSON.stringify(report, null, 2));
    if (report.state === 'FAILED') {
      process.exitCode = 1;
    }
    return;
  }

  // Display Vector Statuses
  console.log('\n📊 Multi-Dimensional Verification Vectors:');
  const vectorEntries = Object.entries(report.vectors);
  for (const [vectorName, result] of vectorEntries) {
    if (!result) continue;
    let badge = '⚪';
    if (result.status === 'passed') badge = '✅ PASS';
    else if (result.status === 'failed') badge = '❌ FAIL';
    else if (result.status === 'warn') badge = '⚠️  WARN';
    else if (result.status === 'skipped') badge = '⏭️  SKIP';

    const duration = result.durationMs !== undefined ? ` (${result.durationMs}ms)` : '';
    const details = result.details ? ` — ${result.details}` : '';
    console.log(`  ${badge.padEnd(8)} [${vectorName.toUpperCase()}]${duration}${details}`);
  }

  // Display Issues if any
  if (report.issues.length > 0) {
    console.log(`\n⚠️  Verification identified ${report.issues.length} issue(s):`);
    for (const issue of report.issues) {
      const loc = issue.file ? ` (${issue.file}${issue.line ? `:${issue.line}` : ''})` : '';
      console.log(`  [${issue.severity.toUpperCase()}] ${issue.ruleId}${loc}: ${issue.message}`);
      console.log(`    ↳ Remediation: ${issue.remediation}`);
    }
  }

  // Summary State Evaluation
  console.log('\n' + '='.repeat(60));
  if (report.state === 'VERIFIED') {
    console.log('🏆 VERIFICATION STATE: [VERIFIED]');
    console.log('   All multi-vector verification criteria satisfied with empirical evidence.');
  } else if (report.state === 'TESTED') {
    console.log('🧪 VERIFICATION STATE: [TESTED]');
    console.log('   Test suites passed, but secondary vector warnings or unverified checks remain.');
  } else if (report.state === 'IMPLEMENTED') {
    console.log('⚙️  VERIFICATION STATE: [IMPLEMENTED]');
    console.log('   Static analysis passed, but behavioral test execution has not run.');
  } else if (report.state === 'ASSUMED') {
    console.log('❓ VERIFICATION STATE: [ASSUMED]');
    console.log('   Code modified without verified automated checks. Promotion rejected.');
    process.exitCode = 1;
  } else {
    console.log('❌ VERIFICATION STATE: [FAILED]');
    console.log('   Verification gate failed. Zero Assumed Success violated; fix failing checks.');
    process.exitCode = 1;
  }
  console.log('='.repeat(60));
}
