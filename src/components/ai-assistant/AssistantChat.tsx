"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useChat } from "@/hooks/useChat";

const SUGGESTIONS = [
  "Who is Noor?",
  "What technologies does Noor know?",
  "Tell me about Noor's projects.",
  "What certificates has Noor completed?",
];

export default function AssistantChat() {
  const { messages, isStreaming, sendMessage, stop, retryLast, clear } =
    useChat();

  const [input, setInput] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      listEndRef.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [messages.length, isStreaming]);

  const lastMessage = messages[messages.length - 1];

  const canRetry =
    lastMessage?.role === "assistant" &&
    lastMessage.status === "error";

  function submit(text: string) {
    const trimmed = text.trim();

    if (!trimmed) {
      setValidationError("Type a question before sending.");
      return;
    }

    setValidationError(null);
    sendMessage(trimmed);
    setInput("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  }

  return (
    <div className="flex h-[560px] flex-col overflow-hidden rounded-xl border border-ink-700 bg-ink-800">
      <div className="flex items-center justify-between border-b border-ink-700 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full bg-[#ff5f57]"
          />
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full bg-[#febc2e]"
          />
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full bg-[#28c840]"
          />

          <span className="ml-2 font-mono text-xs text-paper-400">
            noorverse — ai-assistant
          </span>
        </div>

        <button
          type="button"
          onClick={clear}
          disabled={messages.length === 0}
          className="focus-ring rounded-md border border-ink-600 px-2.5 py-1 font-mono text-xs text-paper-400 transition-colors hover:text-paper-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear conversation
        </button>
      </div>

      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation with the NoorVerse AI Assistant"
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-6 text-center">
            <p className="max-w-xs text-sm text-paper-400">
              Ask about Noor&apos;s education, skills, projects, certificates,
              or how to get in touch.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => submit(question)}
                  className="focus-ring rounded-full border border-ink-600 bg-ink-900 px-3 py-1.5 font-mono text-xs text-paper-200 transition-colors hover:border-amber-500/40 hover:text-amber-400"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-amber-500 text-ink-950"
                  : "border border-ink-700 bg-ink-900 text-paper-200"
              }`}
            >
              {message.role === "assistant" &&
              message.status === "streaming" &&
              message.content === "" ? (
                <span
                  role="status"
                  className="flex items-center gap-1.5 text-paper-400"
                >
                  <span className="sr-only">Thinking…</span>

                  <span
                    aria-hidden="true"
                    className="flex gap-1"
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper-400" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper-400 [animation-delay:300ms]" />
                  </span>
                </span>
              ) : (
                <>
                  <p className="whitespace-pre-wrap">
                    {message.content}
                  </p>

                  {message.status === "streaming" && (
                    <span
                      aria-hidden="true"
                      className="caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-amber-400 align-middle"
                    />
                  )}

                  {message.status === "error" && (
                    <p className="mt-2 text-xs text-red-300">
                      {message.errorText ??
                        "Something went wrong while generating the response."}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

        <div ref={listEndRef} aria-hidden="true" />
      </div>

      {canRetry && !isStreaming && (
        <div className="border-t border-ink-700 bg-ink-900/60 px-4 py-2">
          <button
            type="button"
            onClick={retryLast}
            className="focus-ring rounded-md border border-amber-500/40 px-3 py-1.5 font-mono text-xs text-amber-400 transition-colors hover:bg-ink-800"
          >
            Retry last message
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-ink-700 p-3"
      >
        <label htmlFor="assistant-input" className="sr-only">
          Ask a question about Noor
        </label>

        <div className="flex items-end gap-2">
          <textarea
            id="assistant-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);

              if (validationError) {
                setValidationError(null);
              }
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about Noor's skills, projects, or how to get in touch…"
            aria-invalid={validationError ? "true" : undefined}
            aria-describedby={
              validationError
                ? "assistant-input-error"
                : undefined
            }
            className="focus-ring max-h-32 min-h-[42px] flex-1 resize-none rounded-lg border border-ink-700 bg-ink-900 px-3 py-2.5 text-sm text-paper-200 placeholder:text-paper-400"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="focus-ring shrink-0 rounded-lg border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm font-semibold text-paper-100 transition-colors hover:bg-ink-700"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="focus-ring shrink-0 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-amber-400"
            >
              Send
            </button>
          )}
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <p
            id="assistant-input-error"
            role={validationError ? "alert" : undefined}
            className="text-xs text-red-300"
          >
            {validationError}
          </p>

          <p className="text-xs text-paper-400">
            Enter to send · Shift+Enter for a new line
          </p>
        </div>
      </form>
    </div>
  );
}