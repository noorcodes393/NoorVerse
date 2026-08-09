"use client";

import { useCallback, useRef, useState } from "react";
import type {
  ChatApiMessage,
  ChatMessage,
  ChatStreamEvent,
} from "@/types/chat";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the server. Check your connection and try again.";

const GENERIC_ERROR_MESSAGE =
  "Something went wrong while generating the response. Please try again.";

const STREAM_UPDATE_INTERVAL = 50;

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
      // Ignore malformed events.
    }
  }

  return { events, remainder };
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  // Buffer streamed text so React doesn't re-render for every token.
  const pendingTextRef = useRef("");
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeAssistantIdRef = useRef<string | null>(null);

  const clearFlushTimer = useCallback(() => {
    if (flushTimerRef.current !== null) {
      clearTimeout(flushTimerRef.current);
      flushTimerRef.current = null;
    }
  }, []);

  const flushPendingText = useCallback(() => {
    const assistantId = activeAssistantIdRef.current;
    const pendingText = pendingTextRef.current;

    if (!assistantId || !pendingText) return;

    pendingTextRef.current = "";

    setMessages((prev) =>
      prev.map((message) =>
        message.id === assistantId
          ? {
              ...message,
              content: message.content + pendingText,
            }
          : message,
      ),
    );
  }, []);

  const scheduleFlush = useCallback(() => {
    if (flushTimerRef.current !== null) return;

    flushTimerRef.current = setTimeout(() => {
      flushTimerRef.current = null;
      flushPendingText();
    }, STREAM_UPDATE_INTERVAL);
  }, [flushPendingText]);

  const updateMessage = useCallback(
    (id: string, updater: (msg: ChatMessage) => ChatMessage) => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id ? updater(message) : message,
        ),
      );
    },
    [],
  );

  const finishAssistant = useCallback(
    (
      assistantId: string,
      status: "complete" | "error",
      errorText?: string,
    ) => {
      clearFlushTimer();
      flushPendingText();

      updateMessage(assistantId, (message) => ({
        ...message,
        status,
        ...(errorText ? { errorText } : {}),
      }));

      activeAssistantIdRef.current = null;
    },
    [clearFlushTimer, flushPendingText, updateMessage],
  );

  const runStream = useCallback(
    async (history: ChatMessage[]) => {
      const assistantId = makeId();

      activeAssistantIdRef.current = assistantId;
      pendingTextRef.current = "";

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          status: "streaming",
        },
      ]);

      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const apiMessages: ChatApiMessage[] = history.map((message) => ({
        role: message.role,
        content: message.content,
      }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: apiMessages,
          }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          let errorMessage = GENERIC_ERROR_MESSAGE;

          try {
            const data = await response.json();

            if (typeof data?.error === "string") {
              errorMessage = data.error;
            }
          } catch {
            // Keep generic error.
          }

          finishAssistant(
            assistantId,
            "error",
            errorMessage,
          );

          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, {
            stream: true,
          });

          const { events, remainder } = parseSseBuffer(buffer);

          buffer = remainder;

          for (const event of events) {
            if (event.type === "delta") {
              pendingTextRef.current += event.text;
              scheduleFlush();
            }

            if (event.type === "done") {
              finishAssistant(assistantId, "complete");
            }

            if (event.type === "error") {
              finishAssistant(
                assistantId,
                "error",
                event.message,
              );
            }
          }
        }

        // Flush any text remaining after the final network chunk.
        clearFlushTimer();
        flushPendingText();

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId &&
            message.status === "streaming"
              ? {
                  ...message,
                  status: "complete",
                }
              : message,
          ),
        );

        activeAssistantIdRef.current = null;
      } catch {
        if (controller.signal.aborted) {
          clearFlushTimer();
          flushPendingText();

          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantId &&
              message.status === "streaming"
                ? {
                    ...message,
                    status: "complete",
                  }
                : message,
            ),
          );

          activeAssistantIdRef.current = null;
        } else {
          finishAssistant(
            assistantId,
            "error",
            NETWORK_ERROR_MESSAGE,
          );
        }
      } finally {
        clearFlushTimer();
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [
      clearFlushTimer,
      finishAssistant,
      flushPendingText,
      scheduleFlush,
    ],
  );

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

      setMessages((previous) => {
        const next = [...previous, userMessage];

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

    setMessages((previous) => {
      const lastUserIndex = [...previous]
        .map((message) => message.role)
        .lastIndexOf("user");

      if (lastUserIndex === -1) {
        return previous;
      }

      const next = previous.slice(0, lastUserIndex + 1);

      runStream(next);

      return next;
    });
  }, [isStreaming, runStream]);

  const clear = useCallback(() => {
    abortRef.current?.abort();

    clearFlushTimer();

    pendingTextRef.current = "";
    activeAssistantIdRef.current = null;

    setMessages([]);
    setIsStreaming(false);
  }, [clearFlushTimer]);

  return {
    messages,
    isStreaming,
    sendMessage,
    stop,
    retryLast,
    clear,
  };
}