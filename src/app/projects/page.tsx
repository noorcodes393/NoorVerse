import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects built by Noor Fatima, including NoorVerse itself.",
};

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Projects"
      title="Things I've built"
      description="Backed by structured project data. Reserved slots stay marked as placeholders rather than filled with invented details."
    >
      <ProjectsGrid projects={projects} />
    </Section>
  );
}
