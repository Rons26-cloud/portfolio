export const GEMINI_CHAT_MODEL = "gemini-3.6-flash";
export const GEMINI_IMAGE_MODEL = "gemini-3.1-flash-image";

export const IMAGE_GENERATION_ENABLED = false;

export const MAX_MESSAGE_LENGTH = 2_000;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
export const GEMINI_TIMEOUT_MS = 45_000;
