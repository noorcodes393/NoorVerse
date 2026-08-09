import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`page-section mx-auto max-w-6xl px-4 py-16 sm:px-6 ${className}`}
    >
      <div className="section-heading mb-10 max-w-2xl">
        {eyebrow && (
          <p className="section-eyebrow mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            {eyebrow}
          </p>
        )}

        <h2 className="section-title font-display text-3xl font-semibold tracking-tight text-paper-100 sm:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="section-description mt-3 text-base leading-relaxed text-paper-400">
            {description}
          </p>
        )}
      </div>

      <div className="section-content">
        {children}
      </div>
    </section>
  );
}