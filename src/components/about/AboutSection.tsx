import { profile } from "@/data/profile";

export default function AboutSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        {profile.aboutParagraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-paper-200">
            {paragraph}
          </p>
        ))}
      </div>

      <aside className="h-fit rounded-xl border border-ink-700 bg-ink-800 p-6">
        <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          Currently learning
        </h3>
        <ul className="mt-4 space-y-3">
          {profile.currentlyLearning.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-paper-200">
              <span aria-hidden="true" className="mt-0.5 text-amber-400">
              
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
