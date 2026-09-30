# Reference: Modularity & Coupling

## 1. High Cohesion vs. Loose Coupling

### Cohesion Metrics
- **Functional Cohesion**: All elements of a module contribute to a single well-defined task (Ideal).
- **Sequential Cohesion**: Output from one part serves as input to the next within the same business concept.
- **Incidental / Coincidental Cohesion**: Unrelated helper functions grouped into generic `utils/` or `common/` files (Anti-Pattern: Avoid).

### Coupling Metrics
- **Content Coupling**: One module directly modifies or accesses the internal variables/private state of another (Severe anti-pattern).
- **Common Coupling**: Multiple modules share global mutable state or singletons.
- **Data / Contract Coupling**: Modules communicate strictly through parameterized data contracts or typed interfaces (Ideal).

---

## 2. Preventing Leaky Abstractions
1. **Database Leaks**: UI components or controllers must never construct or parse SQL queries or raw database entity records. Use Data Transfer Objects (DTOs) or domain entities.
2. **Protocol Leaks**: Domain services must not accept HTTP request/response objects (`req`, `res`) or framework-specific contexts. Extract primitive arguments in controller layers.
3. **Third-Party Client Leaks**: Wrap external SDKs behind domain interfaces (Ports and Adapters / Hexagonal Architecture) so vendor changes do not cascade through business logic.
