export interface ProjectStat {
  label: string;
  value: string;
}

export interface ToolchainItem {
  category: string;
  tech: string;
  role: string;
}

export interface PipelineNode {
  step: string;
  title: string;
  detail?: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  category: 'data-engineering' | 'web-development' | 'mobile-computer-vision';
  description: string;
  detailedDescription: string;
  tags: string[];
  techStack: string[];
  image: string;
  coverImage?: string;
  screenshots?: string[];
  link?: string;
  repoUrl?: string;
  liveUrl?: string;
  year: string;
  metrics?: string;
  stats?: ProjectStat[];
  challenge?: string;
  solution?: string;
  solutionPoints?: string[];
  architecture?: string;
  pipelineNodes?: PipelineNode[];
  features?: string[];
  highlights?: string[];
  toolchainMatrix?: ToolchainItem[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number; // 0 - 100
  description: string;
  iconName: string; // identifier for custom Lucide icons
}

export interface ContactLink {
  platform: string;
  url: string;
  label: string;
}
