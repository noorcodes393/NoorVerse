import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import AboutSection from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Noor Fatima — a BS Software Engineering student focused on frontend development and AI engineering.",
};

export default function AboutPage() {
  return (
    <Section
      eyebrow="About"
      title="Who I am"
      
    >
      <AboutSection />
    </Section>
  );
}
