export default function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-ink-600 bg-ink-800 px-3 py-1 font-mono text-xs text-paper-400">
      {children}
    </span>
  );
}
