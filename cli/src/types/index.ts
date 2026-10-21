export type AIType = 'claude' | 'codex' | 'codex-plugin' | 'cursor' | 'copilot';

export const AI_TYPES: AIType[] = ['claude', 'codex', 'codex-plugin', 'cursor', 'copilot'];

export interface PlatformConfig {
  platform: string;
  displayName: string;
  folderStructure: {
    root: string;
    skillPath: string;
    filename: string;
  };
  components: {
    skills: boolean;
    references: boolean;
    agents: boolean;
  };
  frontmatter: {
    format: string;
  };
  description: string;
  pluginManifest?: string;
}
