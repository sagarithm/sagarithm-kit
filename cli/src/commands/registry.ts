import { searchRegistry, packArtifact } from '../registry/loader.ts';

export function runRegistry(rootDir: string, args: string[]): void {
  const subcommand = args[0] || 'help';

  switch (subcommand) {
    case 'search': {
      const query = args[1] || '';
      if (!query) {
        console.log('🔍 Usage: sagarithm registry search <query>');
        return;
      }

      console.log(`🔍 Searching Sagarithm Registry for '${query}'...\n`);
      const { presets, packages } = searchRegistry(rootDir, query);

      if (presets.length === 0 && packages.length === 0) {
        console.log('ℹ️  No matching presets or packages found.');
        return;
      }

      if (presets.length > 0) {
        console.log(`📦 Presets (${presets.length}):`);
        for (const p of presets) {
          console.log(`  🌟 [preset] ${p.id} — ${p.name}`);
          console.log(`     ${p.description}`);
          console.log(`     ↳ Apply: sagarithm preset apply ${p.id}\n`);
        }
      }

      if (packages.length > 0) {
        console.log(`🧩 Packages (${packages.length}):`);
        for (const pkg of packages) {
          const dom = pkg.domain ? ` [${pkg.domain}]` : '';
          console.log(`  🏷️  [${pkg.type}] ${pkg.name}${dom} (v${pkg.version})`);
          console.log(`     ${pkg.description}`);
          console.log(`     ↳ Entrypoint: ${pkg.entrypoint}\n`);
        }
      }
      break;
    }

    case 'pack': {
      const targetPath = args[1];
      if (!targetPath) {
        console.log('❌ Error: Missing target path to pack. Example: sagarithm registry pack ./skills/architecture/system-design');
        process.exitCode = 1;
        return;
      }

      try {
        console.log(`📦 Packaging canonical artifact from '${targetPath}'...`);
        const { packagePath, manifest } = packArtifact(rootDir, targetPath);
        console.log(`✅ Successfully packaged ${manifest.name} (v${manifest.version})!`);
        console.log(`   Integrity: ${manifest.integrity}`);
        console.log(`   Artifact:  ${packagePath}`);
      } catch (err: unknown) {
        console.log(`❌ Packaging failed: ${(err as Error).message}`);
        process.exitCode = 1;
      }
      break;
    }

    case 'help':
    default:
      console.log(`
Sagarithm Registry Commands:
  sagarithm registry search <query>   Search canonical presets and packages
  sagarithm registry pack <path>      Package a skill or policy with SHA-256 integrity
`);
      break;
  }
}
