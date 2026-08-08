import { Profile } from "@/types";

// Single source of truth for Noor's personal/professional identity.
// Update this file to change how Noor is described across the whole site
// (and, later, how the AI Assistant describes her).
export const profile: Profile = {
  name: "Noor Fatima",
  role: "Frontend Developer / AI Engineering Learner",
  focusAreas: [
    "Frontend Development",
    "AI Engineering",
    "Full-Stack Web Development",
  ],
  education: {
    degree: "BS Software Engineering",
    status: "5th Semester",
  },
  shortIntro:
    "I'm a software engineering student building toward a career at the intersection of frontend development and AI engineering — currently focused on writing clean, accessible interfaces and learning how to design real, production-grade AI features.",
  aboutParagraphs: [
    "I'm Noor Fatima, currently in my 5th semester of a BS in Software Engineering. My day-to-day work is split between two things I care about: building interfaces that feel considered and fast, and understanding how to responsibly integrate large language models into real products.",
    "My frontend learning journey started with HTML, CSS, and JavaScript fundamentals, and has grown into working with React, TypeScript, and Next.js to build structured, component-driven applications rather than one-off pages.",
    "Alongside that, I've been developing an interest in AI engineering — not just calling an API, but understanding prompt design, streaming responses, error handling, and how to keep an AI feature grounded in real data instead of letting it improvise.",
    "NoorVerse is where those two interests meet: a developer platform that documents my actual skills and projects, with an AI Assistant that can answer questions about my profile using only the structured information I provide it.",
  ],
  currentlyLearning: [
    "Building and shipping a production-ready AI-powered feature end-to-end (NoorVerse's AI Assistant)",
    "Deepening TypeScript and Next.js App Router patterns",
    "Practical AI/LLM integration concepts (prompting, streaming, tool use)",
  ],
};
