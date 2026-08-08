"use client";

import { useCallback, useRef, useState } from "react";
import type { ChatApiMessage, ChatMessage, ChatStreamEvent } from "@/types/chat";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the server. Check your connection and try again.";
const GENERIC_ERROR_MESSAGE =
  "Something went wrong while generating the response. Please try again.";

/** Parses a chunk of accumulated SSE text, returning parsed events plus
 * whatever partial line remains for the next chunk. */
function parseSseBuffer(buffer: string): {
  events: ChatStreamEvent[];
  remainder: string;
} {
  const events: ChatStreamEvent[] = [];
  const parts = buffer.split("\n\n");
  const remainder = parts.pop() ?? "";

  for (const part of parts) {
    const line = part.trim();
    if (!line.startsWith("data:")) continue;
    const jsonText = line.slice("data:".length).trim();
    if (!jsonText) continue;
    try {
      events.push(JSON.parse(jsonText) as ChatStreamEvent);
    } catch {
      // Ignore malformed lines rather than crashing the whole stream.
    }
  }

  return { events, remainder };
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const updateMessage = useCallback(
    (id: string, updater: (msg: ChatMessage) => ChatMessage) => {
      setMessages((prev) => prev.map((m) => (m.id === id ? updater(m) : m)));
    },
    [],
  );

  const runStream = useCallback(async (history: ChatMessage[]) => {
    const assistantId = makeId();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", status: "streaming" },
    ]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const apiMessages: ChatApiMessage[] = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        let message = GENERIC_ERROR_MESSAGE;
        try {
          const data = await res.json();
          if (typeof data?.error === "string") message = data.error;
        } catch {
          // Keep the generic message if the error body isn't JSON.
        }
        updateMessage(assistantId, (m) => ({
          ...m,
          status: "error",
          errorText: message,
        }));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const { events, remainder } = parseSseBuffer(buffer);
        buffer = remainder;

        for (const event of events) {
          if (event.type === "delta") {
            updateMessage(assistantId, (m) => ({
              ...m,
              content: m.content + event.text,
            }));
          } else if (event.type === "done") {
            updateMessage(assistantId, (m) => ({ ...m, status: "complete" }));
          } else if (event.type === "error") {
            updateMessage(assistantId, (m) => ({
              ...m,
              status: "error",
              errorText: event.message,
            }));
          }
        }
      }

      // If the stream ended without an explicit "done"/"error" event
      // (e.g. the connection dropped), don't leave the bubble stuck
      // showing a streaming/loading state.
      updateMessage(assistantId, (m) =>
        m.status === "streaming" ? { ...m, status: "complete" } : m,
      );
    } catch {
      if (controller.signal.aborted) {
        // Intentional stop — keep whatever text streamed in so far.
        updateMessage(assistantId, (m) =>
          m.status === "streaming" ? { ...m, status: "complete" } : m,
        );
      } else {
        updateMessage(assistantId, (m) => ({
          ...m,
          status: "error",
          errorText: NETWORK_ERROR_MESSAGE,
        }));
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [updateMessage]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: trimmed,
        status: "complete",
      };

      setMessages((prev) => {
        const next = [...prev, userMessage];
        runStream(next);
        return next;
      });
    },
    [isStreaming, runStream],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const retryLast = useCallback(() => {
    if (isStreaming) return;
    setMessages((prev) => {
      // Drop the failed assistant message (if any) and resend using the
      // history up to and including the last user message.
      const lastUserIndex = [...prev]
        .map((m) => m.role)
        .lastIndexOf("user");
      if (lastUserIndex === -1) return prev;
      const next = prev.slice(0, lastUserIndex + 1);
      runStream(next);
      return next;
    });
  }, [isStreaming, runStream]);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsStreaming(false);
  }, []);

  return { messages, isStreaming, sendMessage, stop, retryLast, clear };
}
