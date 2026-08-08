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
      description="Only certificates I've actually completed appear here, with no invented dates or credential IDs."
    >
      <CertificatesList certificates={certificates} />
    </Section>
  );
}
