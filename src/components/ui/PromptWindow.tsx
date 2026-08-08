interface PromptLine {
  question: string;
  answer: string;
}

interface PromptWindowProps {
  title?: string;
  lines: PromptLine[];
  /** Show a blinking caret after the final line, implying more is coming. */
  showCaret?: boolean;
}

/**
 * NoorVerse's signature visual: a small "terminal" window styled like a
 * chat with the AI Assistant. Used in the hero to preview what the
 * Assistant does, and reused (in a simpler form) on the AI Assistant page
 * itself so the two feel like the same feature.
 */
export default function PromptWindow({
  title = "noorverse — ai-assistant",
  lines,
  showCaret = true,
}: PromptWindowProps) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-ink-700 bg-ink-800 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-ink-700 px-4 py-3">
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-xs text-paper-400">
          {title}
        </span>
      </div>
      <div className="space-y-4 p-5 font-mono text-sm">
        {lines.map((line, i) => (
          <div
            key={line.question}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <p className="text-cyan-400">
              <span className="select-none text-paper-400">$ </span>
              {line.question}
            </p>
            <p className="mt-1.5 leading-relaxed text-paper-100">
              {line.answer}
              {showCaret && i === lines.length - 1 && (
                <span
                  aria-hidden="true"
                  className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-amber-400 align-middle"
                />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
