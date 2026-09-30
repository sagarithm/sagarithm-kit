# Reference: Testing Pyramid & Isolation

## 1. Test Granularity

| Test Level | Scope | Execution Speed | Primary Focus |
| :--- | :--- | :--- | :--- |
| **Unit** | Single function, class, or entity | < 5ms per test | Mathematical correctness, edge cases, branching logic |
| **Integration** | Interaction between modules or DB | < 500ms per test | Query accuracy, serialization, port-adapter wiring |
| **End-to-End (E2E)** | Full deployment stack / browser | Seconds | Critical user journeys, system smoke testing |

---

## 2. Hermetic Isolation Principles
1. **No Shared Database State**: Integration tests should use isolated transactions that roll back after each test or operate on uniquely keyed test fixtures.
2. **Deterministic Time**: Inject a clock abstraction or use test framework fake timers (`vi.useFakeTimers()`, `jest.useFakeTimers()`) rather than relying on real sleep/delays.
3. **Deterministic Randomness**: Seed pseudo-random generators when testing randomized algorithms.
