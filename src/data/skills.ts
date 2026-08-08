import { Skill } from "@/types";


export const skills: Skill[] = [
  { name: "HTML", category: "Languages & Markup" },
  { name: "CSS", category: "Languages & Markup" },
  { name: "JavaScript", category: "Languages & Markup" },
  { name: "TypeScript", category: "Languages & Markup" },

  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },

  { name: "Git", category: "Tooling" },
  { name: "GitHub", category: "Tooling" },

  {
    name: "AI/LLM Integration",
    category: "AI Engineering",
    note: "Learning how to design prompts, structure context, and integrate LLM APIs into real applications.",
  },
  {
    name: "Claude / AI SDK Concepts",
    category: "AI Engineering",
    note: "Studying Anthropic's Claude API and AI SDK patterns for building assistant features.",
  },
];

export const skillCategories = [
  "Languages & Markup",
  "Frontend",
  "Tooling",
  "AI Engineering",
] as const;
