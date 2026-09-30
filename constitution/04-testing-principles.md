# Article 4: Testing Principles

This article defines the mandatory testing standards governing code validation, test structure, and evidence requirements.

---

## 1. Zero Assumed Success
- **The Core Rule**: Never state or assume tests passed unless the test runner was executed, the exit code was 0, and passing test results were inspected in terminal output.
- **Verification States**:
  - **Implemented**: Code or test has been written.
  - **Tested**: Test command was dispatched.
  - **Verified**: Passing assertions inspected with zero unhandled errors.

---

## 2. The Balanced Testing Pyramid
- **Unit Tests (Broad Base)**: Fast, in-memory, deterministic tests validating individual functions, algorithms, and domain entities.
- **Integration Tests (Middle Tier)**: Validating interactions between modules, database queries, and external contracts using realistic test harnesses or ephemeral containers.
- **End-to-End Tests (Targeted Top)**: Critical user journey verification ensuring end-to-end wiring from UI/API to persistence.

---

## 3. Test Quality & Structure (Arrange-Act-Assert)
- **Clear Structure**: Every test must distinctly follow the **Arrange-Act-Assert (AAA)** pattern.
- **Meaningful Assertions**: Assert on specific expected values and behavior, not merely that a function "did not throw" or that an output is "truthy".
- **Single Behavioral Focus**: Each test should exercise a single logical behavior or edge case. When a test fails, its name and assertion must immediately identify the broken requirement.

---

## 4. Determinism & Isolation
- **No Shared Mutable State**: Tests must be hermetic and isolated. One test must never rely on side-effects or state left behind by a previous test.
- **No Flakiness**: Flaky tests (dependent on race conditions, wall-clock timing, or live internet connectivity) must be fixed or removed immediately. Use virtual timers and local mock servers.

---

## 5. Disciplined Mocking Strategy
- **Mock at Architectural Boundaries**: Mock external third-party network services, payment providers, and heavy external I/O.
- **Do Not Mock Domain Entities**: Never mock internal business entities, value objects, or core domain logic. Test domain logic with real domain objects.
- **Preserve Contract Fidelity**: Test mocks and stubs must strictly adhere to the real interfaces of the systems they represent.
