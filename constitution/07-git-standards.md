# Article 7: Git Standards

This article defines the version control discipline, commit etiquette, and branch management practices required across all repositories.

---

## 1. Atomic & Cohesive Commits
- **Single Logical Change**: Each commit must represent a single logical change. Do not bundle unrelated bug fixes, formatting updates, and feature code into a single monolithic commit.
- **Always Compilable**: Every commit in the repository history must compile, pass tests, and leave the repository in a working state.

---

## 2. Conventional Commits Standard
All commit messages must adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:
$$\text{<type>[(optional scope)]: <description>}$$

### Allowed Types:
- `feat`: A new feature or capability.
- `fix`: A bug fix.
- `docs`: Documentation-only changes.
- `style`: Formatting, missing semicolons, white-space changes that do not affect code logic.
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `perf`: Performance improvements.
- `test`: Adding or correcting tests.
- `chore`: Build process, dependency updates, tooling, or repository maintenance.

### Message Guidelines:
- Use the imperative present tense: `"add feature"` rather than `"added feature"` or `"adds feature"`.
- Do not capitalize the first letter of the description.
- Do not place a period at the end of the subject line.
- Provide a detailed body when non-obvious context or architectural trade-offs are involved.

---

## 3. Branching & History Hygiene
- **Branch Naming**:
  - `feature/<short-description>`
  - `bugfix/<issue-id>-<short-description>`
  - `refactor/<short-description>`
  - `hotfix/<short-description>`
- **Clean Linear History**: Prefer rebasing feature branches against `main` before merging to prevent tangled merge bubbles.
- **Never Force Push to Shared Branches**: Force pushing to `main` or release branches is strictly prohibited.
