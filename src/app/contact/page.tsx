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
      description="Real contact details haven't been added yet — update src/data/contact.ts once they're ready."
    >
      <ContactSection />
    </Section>
  );
}
