# Reference: MADR 3.0 & Quantitative Decision Matrices

## 1. The MADR 3.0 Standard

The **Markdown Architectural Decision Records (MADR)** standard provides an internationally recognized, highly structured format that AI coding agents can read and write deterministically.

### Core Sections
- **Context and Problem Statement**: What problem is forcing a decision? Include constraints and operational context.
- **Decision Drivers**: Key criteria influencing the decision (e.g., latency, developer productivity, compliance, operational overhead).
- **Considered Options**: Unbiased list of 2–4 architectural options considered.
- **Decision Outcome**: The chosen option, with justification against decision drivers.
- **Pros and Cons of the Options**: Explicit, balanced enumeration of trade-offs for each option.

---

## 2. Weighted Decision Matrices

When multiple strong architectural options exist, gut feelings or superficial preferences must be replaced with an explicit **Weighted Decision Matrix**:

$$\text{Total Score} = \sum (\text{Weight}_i \times \text{Rating}_i)$$

1. **Assign Weights** (1–5) to each Decision Driver based on business priorities.
2. **Rate Each Option** (1–5) on how well it satisfies the driver.
3. **Compute Totals** and record the matrix directly in the ADR.
4. **Document Intangibles**: Note any non-quantifiable factors that break ties.
