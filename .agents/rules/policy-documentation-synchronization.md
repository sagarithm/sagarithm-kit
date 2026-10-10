<!-- SAGARITHM:START - DO NOT EDIT DIRECTLY -->
# Rule: Documentation & ADR Synchronization [WARN]

# Policy: Documentation & ADR Synchronization

## 1. The Invariant
**Any change altering public interfaces, architectural boundaries, or system workflows must include updated documentation in the same commit.**

## 2. Trigger Conditions
- **New Public API Endpoint**: Update OpenAPI/Swagger documentation or API reference guide.
- **Architectural Structural Change**: Author or update an ADR in `docs/adr/`.
- **Breaking Configuration Change**: Update `README.md` or installation/setup instructions.
- **Notable Feature or Bug Fix**: Add an entry in `CHANGELOG.md` following Keep a Changelog.
<!-- SAGARITHM:END -->
