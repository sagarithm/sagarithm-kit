export interface ModuleNode {
  name: string;
  path: string;
  files: string[];
  exports: string[];
  imports: string[];
  tests: string[];
}

export interface ProjectGraph {
  version: string;
  name: string;
  rootPath: string;
  modules: ModuleNode[];
  allFiles: string[];
  dependencies: Record<string, string>;
}

export interface BlastRadiusResult {
  targetPath: string;
  affectedModules: string[];
  affectedTests: string[];
}
