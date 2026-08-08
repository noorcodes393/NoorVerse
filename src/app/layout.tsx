import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { profile } from "@/data/profile";

const siteDescription = `${profile.name} — ${profile.role}. ${profile.education.degree}, ${profile.education.status}.`;

export const metadata: Metadata = {
  title: {
    default: `${profile.name} · NoorVerse`,
    template: `%s · NoorVerse`,
  },
  description: siteDescription,
  openGraph: {
    title: `${profile.name} · NoorVerse`,
    description: siteDescription,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col bg-ink-900 text-paper-200">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
