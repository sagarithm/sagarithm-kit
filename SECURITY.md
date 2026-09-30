# Security Policy

Sagarithm Kit is designed to govern and secure the behavior of AI coding agents operating within production codebases. Security is a primary engineering discipline of this framework.

---

## 1. Supported Versions

| Version | Supported |
| :--- | :--- |
| `0.x` (Pre-release / Foundation) | Best-effort security patches |

---

## 2. Threat Model: AI Agent Engineering Systems

When integrating Sagarithm Kit into software repositories, consider the following security boundaries:

1. **Prompt Injection & Instruction Override**: Canonical skills and policies must be structured to resist instruction hijacking.
2. **Command & Tool Execution**: Agent adapters must not generate configurations that grant unrestricted shell execution or unauthorized environment access.
3. **Secrets & Credentials**: Sagarithm Kit specifications must never contain credentials, API tokens, or sensitive environment variables. Policies explicitly block agents from committing secrets.
4. **Supply Chain & Dependencies**: Policies must require auditing and version-locking before any new third-party dependency is introduced by an agent.

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability within Sagarithm Kit or its generated configurations, please report it responsibly:

- Do **not** open a public GitHub issue.
- Email your findings directly to `security@sagarithm.com` (or create a private GitHub Security Advisory).
- Provide a detailed summary, proof of concept, and affected version(s).
- We acknowledge security reports within 48 hours and aim to coordinate a disclosure timeline upon verification.
