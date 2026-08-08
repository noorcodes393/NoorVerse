import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ways to get in touch with Noor Fatima.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Get in touch"
      description="Have a Question, Collaboration idea, or opportunity?I'd love to hear from you."
    >
      <ContactSection />
    </Section>
  );
}
