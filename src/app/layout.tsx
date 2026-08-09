import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { profile } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink-900 text-paper-200">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="ai-grid flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}