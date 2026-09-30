# Sagarithm Kit — Registry & Ecosystem

> **Decentralized Distribution & Curated Presets for AI Coding Agents**

The Sagarithm Registry distributes verified canonical skills, behavioral policies, engineering workflows, and turn-key presets.

---

## 1. Curated Presets

Presets assemble canonical skills, policies, and workflows into optimized configurations for specific engineering disciplines:

| Preset ID | Profile | Primary Stacks & Focus |
| :--- | :--- | :--- |
| `fullstack-web` | [Fullstack Web Preset](presets/fullstack-web.json) | Next.js, React, Node, Web APIs, Tailwind, Client/Server state |
| `api-backend` | [API & Microservices](presets/api-backend.json) | High-availability REST, GraphQL, Outbox pattern, Pact contracts |
| `systems-core` | [High-Integrity Systems](presets/systems-core.json) | Low-latency runtimes, zero-alloc idioms, exhaustive types |
| `ai-agentic` | [Autonomous AI Agents](presets/ai-agentic.json) | Non-destructive demarcation, prompt isolation, blast-radius limits |

### Applying a Preset
To apply a preset to an existing Sagarithm workspace:

```bash
sagarithm preset apply fullstack-web
sagarithm sync
```

---

## 2. Searching the Registry

Discover available skills, policies, and presets in the canonical registry:

```bash
sagarithm registry search "security"
sagarithm registry search "testing"
```

---

## 3. Packaging & Publishing

Any domain skill conforming to the [Meta-Specification](../specification/SPECIFICATION.md) can be bundled with cryptographic integrity checksums:

```bash
sagarithm registry pack ./skills/architecture/system-design
```

Output:
```
📦 Packaged @sagarithm/skill-architecture-system-design (v1.0.0)
   Integrity: sha256-4a7b2...
   Target: .sagarithm/dist/@sagarithm-skill-architecture-system-design-1.0.0.json
```

---

## 4. Federated Registries

Organizations can point their workspace to private or internal registries in `sagarithm.config.json`:

```json
{
  "version": "1.0.0",
  "registry": "https://registry.internal.corp/sagarithm"
}
```

Offline and air-gapped environments are supported via local mirrors stored in `.sagarithm/cache/`.
