export type PlayableProofType = 'retail-war-room' | 'lifeline-ai' | 'signal-pipeline' | 'none';

export interface ProjectStep {
  step: number;
  phase: string;
  title: string;
  detail: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
  verified: boolean; // false indicates TODO_RAHUL placeholder
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'AI / ML' | 'Operations / BI' | 'MLOps & Systems' | 'FinTech & Trading' | 'Data Analytics & Public Policy';
  summary: string;
  problem: string;
  contribution: string;
  architecture: string;
  impact: string;
  steps: ProjectStep[];
  metrics: ProjectMetric[];
  techStack: string[];
  proofType: PlayableProofType;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  date: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  bulletPoints: {
    text: string;
    metrics?: string;
    verified: boolean;
  }[];
  techStack: string[];
  tags: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  highlights: string[];
  courses?: string[];
  achievements?: string[];
  certifications?: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'core' | 'proficient' | 'familiar';
    usedIn: string[]; // project slugs or experience ids
  }[];
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  shortBio: string;
  location: string;
  phone?: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  keyStats: {
    label: string;
    value: string;
    detail: string;
  }[];
}
