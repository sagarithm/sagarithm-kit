# Checklist: Test Suite Verification

Prior to declaring a task verified, complete each verification gate:

- [ ] **Real Execution**: Was the test command (`npm test`, `pytest`, `cargo test`) executed in the terminal with actual output inspected?
- [ ] **Zero Failures**: Did all tests pass with an exit code of 0?
- [ ] **Arrange-Act-Assert Structure**: Does each test follow the explicit three-phase structure?
- [ ] **Edge Cases Covered**: Are boundary conditions tested (empty inputs, null/undefined, maximum bounds, error paths)?
- [ ] **Hermetic Independence**: Can tests be run in random order without intermittent failures?
- [ ] **Fast Execution**: Do unit tests execute in milliseconds without arbitrary delays or network calls?
- [ ] **No Assumed Success**: Has the agent verified actual assertions rather than guessing that code "should work"?
