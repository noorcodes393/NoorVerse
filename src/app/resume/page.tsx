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
      
    >
      <ResumeSection />
    </Section>
  );
}
