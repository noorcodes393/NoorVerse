export type ChatRole = "user" | "assistant";

export interface ChatApiMessage {
  role: ChatRole;
  content: string;
}

export type MessageStatus = "complete" | "streaming" | "error";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  status: MessageStatus;
  /** User-facing error text, set when status is "error". */
  errorText?: string;
}

/** Server-sent-event payloads used by the /api/chat streaming route. */
export type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };
