// ---------------------------------------------------------------------------
// Shared domain types for the portfolio. All content is data-driven and typed.
// ---------------------------------------------------------------------------

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  leetcode: string;
  phone?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  location: string;
  yearsExperience: string;
  /** Path to the resume PDF served from /public. */
  resumeUrl: string;
  heroBadges: string[];
  social: SocialLinks;
}

export interface Metric {
  value: number;
  /** e.g. "M+", "%", "+" — suffix appended after the animated number. */
  suffix?: string;
  prefix?: string;
  /** For values that are not simple integers (e.g. "Millions"). */
  displayOverride?: string;
  label: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  title: string;
  period: string;
  location?: string;
  type?: string;
  achievements: string[];
  stack: string[];
  /** Optional inline architecture flow for the expandable area. */
  architecture?: ArchitectureFlow;
}

/** A node in an interactive architecture diagram. */
export interface ArchNode {
  id: string;
  label: string;
  /** Short role shown when the node is selected. */
  role: string;
  /** Why this component exists in the system. */
  why?: string;
  /** How data flows through it. */
  dataFlow?: string;
  /** Scaling considerations. */
  scaling?: string;
  /** Failure handling strategy. */
  failure?: string;
}

export interface ArchitectureFlow {
  title: string;
  nodes: ArchNode[];
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  technologies: string[];
  highlights: string[];
  /** Impact / metric line shown prominently. */
  impact?: string;
  architecture: ArchitectureFlow;
  /** Leave empty when the real URL is not yet available. */
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  topics: string[];
  /** Configurable — empty until a real certificate URL is supplied. */
  url: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface SystemDesignScenario {
  id: string;
  title: string;
  summary: string;
  architecture: ArchitectureFlow;
}
