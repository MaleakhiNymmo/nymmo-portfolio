export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  techStack: string[];
  image: string;
  link?: string;
  year: string;
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
