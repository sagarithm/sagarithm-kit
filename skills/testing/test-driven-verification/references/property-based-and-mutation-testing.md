# Reference: Property-Based, Mutation & Contract Testing

## 1. Property-Based Testing (Invariant Verification)

Traditional example-based tests check specific hardcoded inputs (e.g. `add(2, 3) === 5`).
**Property-Based Testing** validates fundamental mathematical and business invariants across hundreds or thousands of automatically generated inputs.

### Core Invariants to Test
1. **Round-Trip (Serialization/Deserialization)**:
   $$\text{deserialize}(\text{serialize}(x)) == x$$
2. **Idempotence**:
   $$f(f(x)) == f(x)$$
3. **Commutativity / Invariance**:
   Sorting an array twice yields the exact same array; filtering does not alter the relative order of surviving elements.
4. **Error Handling Boundaries**:
   Any string containing control characters or exceeding size bounds is guaranteed to throw the exact expected validation error, never an unhandled panic.

---

## 2. Mutation Testing (Testing the Tests)

Code coverage percentages can be deceptive: a suite can achieve 90% line coverage with weak or missing assertions.
**Mutation Testing** (e.g. Stryker, Mutmut) systematically introduces bugs ("mutants") into your production code (e.g. changing `>` to `>=`, negating conditionals, replacing return values with `null`) and runs the test suite against each mutant.

- **Killed Mutant**: A test fails when the code is broken (Desired).
- **Survived Mutant**: The code is broken, but tests still pass (Indicates an assertion blind spot).
- **Rule**: High-risk business logic (pricing, discounts, access control) should maintain a mutation score above 80%.

---

## 3. Consumer-Driven Contract Testing (Pact)

When frontend and backend or microservices communicate:
- The consumer defines the expected HTTP contract (request shape, headers, response shape).
- Contracts are exported as JSON pacts and verified against the provider in CI.
- **Benefit**: Catches breaking API changes before deployment without requiring slow, brittle live end-to-end environments.
