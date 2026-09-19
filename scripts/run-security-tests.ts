/**
 * SkillGraph — Security Test Suite Runner
 * Runs the 11-point security and isolation test suite and prints structured results.
 */

import { runAllSecurityTests } from '../tests/security-checks.test';

async function main() {
  console.log('================================================================');
  console.log('SKILLGRAPH — DAY 11 SECURITY & ISOLATION VERIFICATION SUITE');
  console.log('Reference: GoThrough.txt § 21 (Day 11 Tasks 11.1 – 11.11)');
  console.log('================================================================\n');

  const { passed, results } = await runAllSecurityTests();

  for (const r of results) {
    const mark = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`[${mark}] Task ${r.taskId}: ${r.name}`);
    console.log(`       Details: ${r.details}\n`);
  }

  console.log('----------------------------------------------------------------');
  console.log(`TOTAL CHECKS: ${results.length} | PASSED: ${results.filter((r) => r.passed).length} | FAILED: ${results.filter((r) => !r.passed).length}`);
  console.log(`FINAL SECURITY AUDIT STATUS: ${passed ? 'ALL CHECKS PASSED (READY FOR PRODUCTION)' : 'AUDIT FAILED'}`);
  console.log('================================================================');

  if (!passed) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
