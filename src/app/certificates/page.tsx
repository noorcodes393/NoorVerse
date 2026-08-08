import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CertificatesList from "@/components/certificates/CertificatesList";
import { certificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Certificates and courses completed by Noor Fatima.",
};

export default function CertificatesPage() {
  return (
    <Section
      eyebrow="Certificates"
      title="Courses & certifications"
      description="A curated collection of certifications that represent my continuous learning and growth across software development and AI"
    >
      <CertificatesList certificates={certificates} />
    </Section>
  );
}
