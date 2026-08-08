import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SkillsGrid from "@/components/skills/SkillsGrid";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frameworks, tools, and AI engineering concepts Noor Fatima uses and is learning.",
};

export default function SkillsPage() {
  return (
    <Section
      eyebrow="Skills"
      title="Technologies I use and am learning"
      description="Grouped by category. This list only includes technologies I've actually worked with — nothing aspirational."
    >
      <SkillsGrid skills={skills} />
    </Section>
  );
}
