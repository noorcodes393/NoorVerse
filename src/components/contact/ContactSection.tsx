import { contactLinks } from "@/data/contact";

const icons: Record<string, string> = {
  Email: "✉",
  GitHub: "⌘",
  LinkedIn: "in",
};

export default function ContactSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {contactLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label !== "Email" ? "_blank" : undefined}
          rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
          className="group rounded-xl border border-ink-700 bg-ink-800 p-6 transition hover:border-amber-500/50 hover:bg-ink-800/80"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 font-semibold text-amber-400"
            >
              {icons[link.label]}
            </span>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                {link.label}
              </p>

              <p className="mt-1 text-sm font-medium text-paper-100 group-hover:text-amber-400">
                Connect with me ↗
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}