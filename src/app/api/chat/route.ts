import {
  getGeminiClient,
  GEMINI_MODEL,
  MAX_OUTPUT_TOKENS,
} from "@/lib/GEMINI";
import { buildSystemPrompt } from "@/lib/system-prompt";
import type { ChatApiMessage, ChatStreamEvent } from "@/types/chat";

export const runtime = "nodejs";

const MAX_TURNS = 20;
const MAX_MESSAGE_CHARS = 4000;

function jsonError(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

function sseEvent(event: ChatStreamEvent) {
  return `data: ${JSON.stringify(event)}\n\n`;
}

function getActualError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown Gemini API error.";
  }
}

function toUserMessage(error: unknown) {
  const message = getActualError(error);

  // IMPORTANT: Show the real error temporarily so we can diagnose it.
  console.error("FULL GEMINI ERROR:", error);

  if (
    message.includes("401") ||
    message.includes("403") ||
    message.toLowerCase().includes("api key")
  ) {
    return `Gemini API key error: ${message}`;
  }

  if (
    message.includes("404") ||
    message.toLowerCase().includes("not found")
  ) {
    return `Gemini model/API error: ${message}`;
  }

  if (message.includes("429")) {
    return `Gemini quota/rate-limit error: ${message}`;
  }

  return `Gemini API error: ${message}`;
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid request body.");
  }

  const rawMessages = (body as { messages?: unknown } | null)?.messages;

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return jsonError(400, "A message is required.");
  }

  if (rawMessages.length > MAX_TURNS) {
    return jsonError(
      400,
      "This conversation has gotten long. Please clear it and start a new one.",
    );
  }

  const messages: ChatApiMessage[] = [];

  for (const message of rawMessages) {
    const role = (message as { role?: unknown })?.role;
    const content = (message as { content?: unknown })?.content;

    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string"
    ) {
      return jsonError(400, "Invalid message format.");
    }

    const trimmed = content.trim();

    // Ignore empty messages instead of sending them to Gemini.
    if (!trimmed) {
      continue;
    }

    if (trimmed.length > MAX_MESSAGE_CHARS) {
      return jsonError(
        400,
        "Message is too long. Please shorten it.",
      );
    }

    messages.push({
      role,
      content: trimmed,
    });
  }

  if (messages.length === 0) {
    return jsonError(400, "A message is required.");
  }

  if (messages[messages.length - 1].role !== "user") {
    return jsonError(400, "The last message must be from the user.");
  }

  let client;

  try {
    client = getGeminiClient();
  } catch (error) {
    return jsonError(500, getActualError(error));
  }

  try {
    const systemPrompt = buildSystemPrompt();

    const contents = messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.content,
        },
      ],
    }));

    console.log("Gemini model:", GEMINI_MODEL);
    console.log("Gemini messages:", contents.length);

    const result = await client.models.generateContentStream({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result) {
            if (req.signal.aborted) {
              break;
            }

            const text = chunk.text;

            if (text) {
              controller.enqueue(
                encoder.encode(
                  sseEvent({
                    type: "delta",
                    text,
                  }),
                ),
              );
            }
          }

          if (!req.signal.aborted) {
            controller.enqueue(
              encoder.encode(
                sseEvent({
                  type: "done",
                }),
              ),
            );
          }
        } catch (error) {
          if (!req.signal.aborted) {
            console.error(
              "Gemini streaming error:",
              getActualError(error),
            );

            controller.enqueue(
              encoder.encode(
                sseEvent({
                  type: "error",
                  message: toUserMessage(error),
                }),
              ),
            );
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "Gemini request failed:",
      getActualError(error),
    );

    return jsonError(500, toUserMessage(error));
  }
}