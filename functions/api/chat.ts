import { GoogleGenAI } from "@google/genai/web";
import type { ChatApiError, ChatApiResponse, ChatImageInput, ChatRequestBody } from "../../src/lib/chat-types.ts";
import { ALLOWED_IMAGE_TYPES, GEMINI_CHAT_MODEL, GEMINI_IMAGE_MODEL, GEMINI_TIMEOUT_MS, IMAGE_GENERATION_ENABLED, MAX_IMAGE_BYTES, MAX_MESSAGE_LENGTH } from "../_shared/gemini-config.ts";

const SAFE_ERROR = "Maaf, jawaban belum berhasil dimuat. Coba lagi.";
const RATE_LIMIT_ERROR = "Xyrons AI sedang mencapai batas penggunaan. Coba lagi beberapa saat.";
const IMAGE_ERROR = "Maaf, gambar ini belum bisa diproses. Coba unggah gambar lain.";
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_INSTRUCTION = `Kamu adalah Xyrons AI Assistant di website portfolio Xyrons.
Jawab dengan akurat, ringkas, ramah, dan gunakan bahasa yang sama dengan pengguna.
Kamu dapat menganalisis gambar yang diunggah pengguna. Jelaskan isi gambar atau screenshot berdasarkan apa yang benar-benar terlihat; jangan mengarang detail yang tidak terlihat.
Jika pengguna memakai bahasa kasar, tetap tegas dan sopan tanpa membalas dengan penghinaan.
Konteks portfolio: Xyrons adalah Creative Developer & Digital Builder dari Indonesia; menguasai React, Next.js, TypeScript, Node.js, Supabase, PostgreSQL, Flutter, Unity, dan C#; proyek unggulannya NIAGANTARA, Dimsum Lumer, BreakBox, dan Petani Nusantara; situs https://www.xyronhub.xyz/ dan GitHub https://github.com/Rons26-cloud.
Jangan mengaku memiliki akses ke data pribadi, sistem internal, atau informasi real-time yang tidak diberikan.`;

interface Env { GEMINI_API_KEY?: string }
interface PagesContext { request: Request; env: Env }

function json(body: ChatApiResponse | ChatApiError, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

function estimatedBase64Bytes(data: string) {
  const padding = data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0;
  return Math.floor((data.length * 3) / 4) - padding;
}

function validImage(image: unknown): image is ChatImageInput {
  if (!image || typeof image !== "object") return false;
  const candidate = image as { mimeType?: unknown; data?: unknown };
  if (typeof candidate.mimeType !== "string" || !ALLOWED_IMAGE_TYPES.has(candidate.mimeType)) return false;
  if (typeof candidate.data !== "string" || !candidate.data || !/^[A-Za-z0-9+/]+={0,2}$/.test(candidate.data)) return false;
  return estimatedBase64Bytes(candidate.data) <= MAX_IMAGE_BYTES;
}

function isRateLimited(request: Request) {
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const now = Date.now();
  const entry = requestsByIp.get(ip);
  if (!entry || entry.resetAt <= now) { requestsByIp.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS }); return false; }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function imageGenerationIntent(message: string) {
  return /\b(buat(?:kan)?|bikin|hasilkan|generate|berikan|kirim)\b.{0,40}\b(gambar|foto|ilustrasi|image|picture)\b/i.test(message);
}

function safeLogGeminiError(error: unknown, apiKey: string) {
  const record = typeof error === "object" && error !== null ? error as Record<string, unknown> : {};
  const rawMessage = error instanceof Error ? error.message : "Unknown provider error";
  const message = rawMessage.replaceAll(apiKey, "[REDACTED]").slice(0, 700);
  console.error("Gemini request failed", JSON.stringify({ name: error instanceof Error ? error.name : "Unknown", status: record.status ?? null, code: record.code ?? null, message }));
}

function providerStatus(error: unknown) {
  const record = typeof error === "object" && error !== null ? error as Record<string, unknown> : {};
  const message = error instanceof Error ? error.message : "";
  const status = typeof record.status === "number" ? record.status : Number(message.match(/"code":(\d{3})/)?.[1] || 0);
  if (status === 401 || status === 403 || status === 429) return status;
  return 502;
}

async function withTimeout<T>(promise: Promise<T>): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timeoutId = setTimeout(() => reject(new Error("GEMINI_TIMEOUT")), GEMINI_TIMEOUT_MS); });
  try { return await Promise.race([promise, timeout]); } finally { if (timeoutId) clearTimeout(timeoutId); }
}

async function generateImage(ai: GoogleGenAI, prompt: string): Promise<ChatApiResponse> {
  const response = await withTimeout(ai.models.generateContent({ model: GEMINI_IMAGE_MODEL, contents: prompt, config: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: "1:1", imageSize: "1K" } } }));
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const text = parts.find((part) => typeof part.text === "string")?.text?.trim() || "Berikut gambar yang kamu minta.";
  const inlineData = parts.find((part) => part.inlineData?.data)?.inlineData;
  if (!inlineData?.data) throw new Error("IMAGE_RESPONSE_EMPTY");
  const url = `data:${inlineData.mimeType || "image/png"};base64,${inlineData.data}`;
  return { source: "gemini", type: "mixed", text, images: [{ url, alt: prompt.slice(0, 140), mimeType: inlineData.mimeType }] };
}

async function handleChat({ request, env }: PagesContext): Promise<Response> {
  if (isRateLimited(request)) return json({ error: "Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi." }, 429);
  if (!(request.headers.get("content-type") || "").toLowerCase().includes("application/json")) return json({ error: "Content-Type harus application/json." }, 415);

  let body: ChatRequestBody;
  try { body = await request.json() as ChatRequestBody; } catch { return json({ error: "Body permintaan tidak valid." }, 400); }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const hasImage = body.image !== undefined;
  if (!message && !hasImage) return json({ error: "Pesan atau gambar wajib diisi." }, 400);
  if (message.length > MAX_MESSAGE_LENGTH) return json({ error: `Pertanyaan maksimal ${MAX_MESSAGE_LENGTH} karakter.` }, 413);
  if (hasImage && !validImage(body.image)) return json({ error: IMAGE_ERROR }, 400);
  if (!env.GEMINI_API_KEY) return json({ error: SAFE_ERROR }, 503);

  const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  try {
    if (!body.image && imageGenerationIntent(message)) {
      if (!IMAGE_GENERATION_ENABLED) return json({ source: "local", type: "text", text: "Fitur pembuatan gambar belum diaktifkan. Saya tetap bisa menganalisis gambar yang kamu unggah." }, 200);
      return json(await generateImage(ai, message), 200);
    }

    const parts: Array<{ text: string } | { inlineData: ChatImageInput }> = [];
    if (body.image) parts.push({ inlineData: body.image });
    parts.push({ text: message || "Jelaskan isi gambar ini secara jelas dan ringkas." });
    console.info("[XYRONS_AI]", body.image ? "route=GEMINI reason=IMAGE" : "route=GEMINI reason=GENERAL_QUERY");
    const response = await withTimeout(ai.models.generateContent({
      model: GEMINI_CHAT_MODEL,
      contents: [{ role: "user", parts }],
      config: { systemInstruction: SYSTEM_INSTRUCTION, maxOutputTokens: 800, temperature: 0.65 },
    }));
    const text = response.text?.trim();
    if (!text) return json({ error: hasImage ? IMAGE_ERROR : SAFE_ERROR }, 502);
    return json({ source: "gemini", type: "text", text }, 200);
  } catch (error) {
    safeLogGeminiError(error, env.GEMINI_API_KEY);
    const status = providerStatus(error);
    if (status === 429) {
      console.warn("GEMINI_RATE_LIMITED", JSON.stringify({ status, code: "GEMINI_QUOTA_EXCEEDED" }));
      return json({ error: RATE_LIMIT_ERROR, code: "GEMINI_RATE_LIMITED" }, 429);
    }
    return json({ error: hasImage ? IMAGE_ERROR : SAFE_ERROR, code: "GEMINI_UNAVAILABLE" }, status);
  }
}

export function onRequest(context: PagesContext): Promise<Response> | Response {
  if (context.request.method !== "POST") return json({ error: "Method tidak diizinkan." }, 405);
  return handleChat(context);
}
