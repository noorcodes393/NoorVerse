import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import AssistantSection from "@/components/ai-assistant/AssistantSection";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Ask NoorVerse's Claude-powered AI Assistant about Noor Fatima's education, skills, projects, and certificates.",
};

export default function AIAssistantPage() {
  return (
    <Section
      eyebrow="AI Assistant"
      title="Ask about Noor"
      description="A real, Claude-powered assistant grounded in NoorVerse's structured data."
    >
      <AssistantSection />
    </Section>
  );
}
