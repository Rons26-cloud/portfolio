export type ChatRole = "user" | "assistant";
export type ChatMessageType = "text" | "image" | "mixed";

export type ChatImage = {
  url: string;
  alt: string;
  mimeType?: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  type: ChatMessageType;
  text?: string;
  images?: ChatImage[];
  createdAt: string;
};

export type ChatImageInput = {
  mimeType: "image/jpeg" | "image/png" | "image/webp";
  data: string;
};

export type ChatRequestBody = {
  message?: string;
  image?: ChatImageInput;
};

export type ChatApiResponse = {
  source: "local" | "gemini";
  type: ChatMessageType;
  text?: string;
  images?: ChatImage[];
};

export type ChatApiError = {
  error: string;
  code?: "GEMINI_RATE_LIMITED" | "GEMINI_UNAVAILABLE";
};
