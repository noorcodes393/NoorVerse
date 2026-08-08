import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ResumeSection from "@/components/resume/ResumeSection";

export const metadata: Metadata = {
  title: "Resume",
  description: "Noor Fatima's resume: education, skills, and projects.",
};

export default function ResumePage() {
  return (
    <Section
      eyebrow="Resume / CV"
      title="Resume"
      description="A summary view built from the same structured data as the rest of NoorVerse, plus a downloadable PDF once it's added."
    >
      <ResumeSection />
    </Section>
  );
}
