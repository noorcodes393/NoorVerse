import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-paper-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono">
          © {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <p>NoorVerse </p>
      </div>
    </footer>
  );
}
