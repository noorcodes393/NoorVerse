import AssistantChat from "./AssistantChat";

const EXAMPLE_QUESTIONS = [
  "Who is Noor?",
  "What does Noor study?",
  "What technologies does Noor know?",
  "Tell me about Noor's projects.",
  "What certificates has Noor completed?",
  "What is Noor currently learning?",
  "How can I contact Noor?",
];

export default function AssistantSection() {
  return (
<div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <p className="text-base leading-relaxed text-paper-200">
          This assistant is powered by the real GEMINI API,
          running server-side, with responses streamed live. It answers
          only from NoorVerse&apos;s actual structured data — profile,
          skills, projects, and certificates — and says so plainly when it
          doesn&apos;t have an answer.
        </p>

        <h3 className="mt-8 font-mono text-xs uppercase tracking-widest text-cyan-400">
          Things you can ask
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {EXAMPLE_QUESTIONS.map((q) => (
            <li
              key={q}
              className="rounded-lg border border-ink-700 bg-ink-800 px-3 py-2 text-sm text-paper-200"
            >
              {q}
            </li>
          ))}
        </ul>
      </div>

      <AssistantChat />
    </div>
  );
}
