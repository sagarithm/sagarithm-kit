<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# Rule: Testing Enforcement & Zero Assumed Success [ERROR]

# Policy: Testing Enforcement & Zero Assumed Success

## 1. The Invariant
**Never claim tests passed, code is verified, or a bug is fixed unless the test runner was executed and exit code 0 was observed.**

## 2. Test Execution Mandate
- Whenever test suites exist in a repository, the agent must run the relevant test suite after making changes.
- If a specific test fails, the task is **not** complete. The agent must diagnose and fix the root cause, not weaken or delete the failing assertion.

## 3. Regression Tests for Bug Fixes
- Every bug fix must include a test that:
  1. Fails when executed against the original broken code (reproducing the issue).
  2. Passes when executed against the proposed fix.

## 4. Unexecutable Test Suites
- If the environment lacks the dependencies or database required to execute tests, the agent must explicitly state: *"Tests could not be executed due to [Reason]. Implementation is complete but unverified."*
<!-- SAGARITHM:END -->
