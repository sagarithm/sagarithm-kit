# Examples: Quantitative Decision Matrix in an ADR

```markdown
### Decision Drivers & Weighted Evaluation

| Driver | Weight (1–5) | Option A: PostgreSQL | Option B: DynamoDB | Option C: MongoDB |
| :--- | :---: | :---: | :---: | :---: |
| **ACID & Relational Integrity** | 5 | 5 (Score: 25) | 2 (Score: 10) | 3 (Score: 15) |
| **Operational Overhead** | 4 | 3 (Score: 12) | 5 (Score: 20) | 3 (Score: 12) |
| **Complex Analytical Queries** | 4 | 5 (Score: 20) | 1 (Score: 4) | 3 (Score: 12) |
| **Horizontal Scalability** | 3 | 3 (Score: 9) | 5 (Score: 15) | 4 (Score: 12) |
| **Developer Familiarity** | 3 | 5 (Score: 15) | 3 (Score: 9) | 3 (Score: 9) |
| **Total Weighted Score** | - | **81 / 95** | 58 / 95 | 60 / 95 |

### Outcome Justification
**Option A (PostgreSQL)** is selected because relational integrity and complex joins across multi-entity billing models are top priorities (Weight 5), outweighing DynamoDB's superior serverless operational simplicity.
```
