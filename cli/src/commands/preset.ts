import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadRegistryIndex, loadPreset } from '../registry/loader.ts';
import type { SagarithmConfig } from '../types.ts';

export function runPreset(rootDir: string, args: string[]): void {
  const subcommand = args[0] || 'list';

  switch (subcommand) {
    case 'list': {
      console.log('📦 Available Sagarithm Engineering Presets:\n');
      const catalog = loadRegistryIndex(rootDir);
      if (!catalog || Object.keys(catalog.presets).length === 0) {
        console.log('⚠️  No presets found in canonical registry.');
        return;
      }

      for (const [id, preset] of Object.entries(catalog.presets)) {
        console.log(`  🌟 [${id}] — ${preset.name} (Risk: ${preset.riskThreshold.toUpperCase()})`);
        console.log(`     ${preset.description}`);
        console.log(`     Domains: ${preset.enabledDomains.join(', ')}`);
        console.log(`     Skills:  ${preset.skills.length} | Policies: ${preset.policies.length} | Workflows: ${preset.workflows.length}\n`);
      }

      console.log('Apply a preset to this workspace with:');
      console.log('  sagarithm preset apply <preset-id>\n');
      break;
    }

    case 'show': {
      const presetId = args[1];
      if (!presetId) {
        console.log('❌ Error: Missing preset ID. Example: sagarithm preset show fullstack-web');
        process.exitCode = 1;
        return;
      }

      const preset = loadPreset(rootDir, presetId);
      if (!preset) {
        console.log(`❌ Error: Preset '${presetId}' not found.`);
        process.exitCode = 1;
        return;
      }

      console.log(`\nPreset: ${preset.name} [${preset.id}]`);
      console.log(`Description:   ${preset.description}`);
      console.log(`Risk Threshold: ${preset.riskThreshold}`);
      console.log(`Enabled Domains: ${preset.enabledDomains.join(', ')}`);
      console.log(`\nIncluded Skills (${preset.skills.length}):`);
      preset.skills.forEach((s) => console.log(`  - ${s}`));
      console.log(`\nActive Policies (${preset.policies.length}):`);
      preset.policies.forEach((p) => console.log(`  - ${p}`));
      console.log(`\nWorkflows (${preset.workflows.length}):`);
      preset.workflows.forEach((w) => console.log(`  - ${w}`));
      break;
    }

    case 'apply': {
      const presetId = args[1];
      if (!presetId) {
        console.log('❌ Error: Missing preset ID. Example: sagarithm preset apply fullstack-web');
        process.exitCode = 1;
        return;
      }

      const preset = loadPreset(rootDir, presetId);
      if (!preset) {
        console.log(`❌ Error: Preset '${presetId}' not found.`);
        process.exitCode = 1;
        return;
      }

      console.log(`⚙️  Applying preset '${preset.name}' to workspace...`);

      const configPath = resolve(rootDir, 'sagarithm.config.json');
      let config: SagarithmConfig;

      if (existsSync(configPath)) {
        try {
          config = JSON.parse(readFileSync(configPath, 'utf8'));
        } catch {
          console.log('⚠️  Existing config invalid; creating new configuration.');
          config = {
            version: '1.0.0',
            name: 'sagarithm-project',
            targets: ['antigravity', 'cursor', 'claude-code'],
            riskThreshold: preset.riskThreshold,
            enabledDomains: preset.enabledDomains,
            paths: {
              constitution: 'constitution',
              skills: 'skills',
              policies: 'policies',
              workflows: 'workflows',
              adapters: 'adapters'
            }
          };
        }
      } else {
        config = {
          version: '1.0.0',
          name: 'sagarithm-project',
          targets: ['antigravity', 'cursor', 'claude-code', 'copilot', 'windsurf', 'codex'],
          riskThreshold: preset.riskThreshold,
          enabledDomains: preset.enabledDomains,
          paths: {
            constitution: 'constitution',
            skills: 'skills',
            policies: 'policies',
            workflows: 'workflows',
            adapters: 'adapters'
          }
        };
      }

      // Update config with preset values
      config.riskThreshold = preset.riskThreshold;
      config.enabledDomains = Array.from(new Set([...config.enabledDomains, ...preset.enabledDomains]));

      writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

      console.log(`✅ Successfully applied preset '${presetId}'!`);
      console.log(`   Risk Threshold: ${config.riskThreshold}`);
      console.log(`   Enabled Domains: ${config.enabledDomains.join(', ')}`);
      console.log('\nRun `sagarithm sync` to compile the updated profile to your active AI agent configurations.');
      break;
    }

    default:
      console.log(`Unknown preset subcommand: ${subcommand}`);
      console.log('Available commands: list, show <id>, apply <id>');
      process.exitCode = 1;
      break;
  }
}
