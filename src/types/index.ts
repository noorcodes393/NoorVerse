// Shared type definitions for NoorVerse structured data.
// Keeping these centralized makes it easy to validate what the AI Assistant
// (added in a later phase) is allowed to read and reference.

export type SkillCategory =
  | "Languages & Markup"
  | "Frontend"
  | "Tooling"
  | "AI Engineering";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Optional short note on how Noor is using/learning this skill. */
  note?: string;
}

export interface ProjectLink {
  label: "GitHub" | "Live Demo";
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  links: ProjectLink[];
  /** True when the project entry is a placeholder awaiting real details. */
  isPlaceholder?: boolean;
  status?: "In Progress" | "Completed" | "Planned";
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  image: string;
  date?: string;
  credentialUrl?: string;
  isPlaceholder?: boolean;
}

export interface ContactLink {
  label: string;
  value: string;
  href?: string;
  isPlaceholder?: boolean;
}

export interface Profile {
  name: string;
  role: string;
  focusAreas: string[];
  education: {
    degree: string;
    status: string;
  };
  shortIntro: string;
  aboutParagraphs: string[];
  currentlyLearning: string[];
}
