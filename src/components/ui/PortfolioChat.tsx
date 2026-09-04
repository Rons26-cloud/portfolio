"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { CheckCheck, ImagePlus, Minus, RotateCcw, Send } from "lucide-react";
import { ChatImageMessage } from "@/components/chat/ChatImageMessage";
import { ImagePreview } from "@/components/chat/ImagePreview";
import type { ChatApiError, ChatApiResponse, ChatImageInput, ChatMessage, ChatMessageType, ChatRequestBody } from "@/lib/chat-types";
import { resolveLocalResponse } from "@/lib/xyrons-knowledge";
import { useLanguage } from "@/components/providers/LanguageProvider";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const quickActions = ["Who is Xyrons?", "See projects", "How can I get in touch?"];
const welcomeMessage = "Hi! I can help with Xyrons, projects, skills, and contact information.";

type Attachment = { file: File; previewUrl: string };
type LastSubmission = { payload: ChatRequestBody };

function nowLabel() {
  return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function RobotAvatar({ small = false, online = false }: { small?: boolean; online?: boolean }) {
  return <span className={`xchat-avatar ${small ? "small" : "large"}`}><Image src="/assets/chat/xyrons-robot.png" width={small ? 28 : 52} height={small ? 28 : 52} alt="Avatar robot Xyrons AI" priority={!small} />{online && <i className="xchat-online-dot" aria-hidden="true" />}</span>;
}

function fileToInput(file: File): Promise<ChatImageInput> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("READ_FAILED"));
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const data = result.split(",")[1];
      if (!data || !ALLOWED_TYPES.has(file.type)) return reject(new Error("INVALID_IMAGE"));
      resolve({ mimeType: file.type as ChatImageInput["mimeType"], data });
    };
    reader.readAsDataURL(file);
  });
}

function responseToMessage(data: ChatApiResponse): ChatMessage {
  return { id: createId(), role: "assistant", type: data.type, text: data.text, images: data.images, createdAt: nowLabel() };
}

export function PortfolioChat() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [lastSubmission, setLastSubmission] = useState<LastSubmission | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", type: "text", text: t(welcomeMessage), createdAt: nowLabel() },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const attachmentRef = useRef<Attachment | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading, error]);
  useEffect(() => () => {
    if (attachmentRef.current) URL.revokeObjectURL(attachmentRef.current.previewUrl);
  }, []);

  const removeAttachment = () => {
    if (attachment) URL.revokeObjectURL(attachment.previewUrl);
    attachmentRef.current = null;
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const selectFile = (file?: File) => {
    setError("");
    if (!file) return;
    if (!ALLOWED_TYPES.has(file.type)) return setError(t("Image format must be JPG, PNG, or WebP."));
    if (file.size > MAX_FILE_BYTES) return setError(t("Image size is limited to 10 MB."));
    if (attachment) URL.revokeObjectURL(attachment.previewUrl);
    const nextAttachment = { file, previewUrl: URL.createObjectURL(file) };
    attachmentRef.current = nextAttachment;
    setAttachment(nextAttachment);
  };

  const requestAssistant = async (payload: ChatRequestBody) => {
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 50_000);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: controller.signal });
      const isJson = response.headers.get("content-type")?.includes("application/json");
      if (!isJson || response.status === 404 || response.status === 503) {
        if (payload.image) throw new Error(t("Sorry, this image could not be processed. Please upload another image."));
        setMessages((current) => [...current, responseToMessage({ source: "local", type: "text", text: t("I can only answer about Xyrons, portfolio projects, skills, and contact information right now.") })]);
        setLastSubmission(null);
        return;
      }
      const data = await response.json() as ChatApiResponse | ChatApiError;
      if (!response.ok || !("type" in data)) throw new Error(response.status === 429 ? t("Xyrons AI has reached its usage limit. Please try again shortly.") : t("Sorry, the answer could not be loaded. Please try again."));
      setMessages((current) => [...current, responseToMessage(data)]);
      setLastSubmission(null);
    } catch (requestError) {
      if (!payload.image && requestError instanceof TypeError) {
        setMessages((current) => [...current, responseToMessage({ source: "local", type: "text", text: t("I can only answer about Xyrons, portfolio projects, skills, and contact information right now.") })]);
        setLastSubmission(null);
      } else {
        setError(requestError instanceof Error ? requestError.message : t("Sorry, the answer could not be loaded. Please try again."));
        setLastSubmission({ payload });
      }
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (loading || (!text && !attachment)) return;
    const localResponse = attachment ? null : resolveLocalResponse(text);
    let image: ChatImageInput | undefined;
    let userImageUrl: string | undefined;
    if (attachment) {
      try {
        image = await fileToInput(attachment.file);
        userImageUrl = `data:${image.mimeType};base64,${image.data}`;
      } catch {
        setError(t("Sorry, this image could not be processed. Please upload another image."));
        return;
      }
    }
    const type: ChatMessageType = userImageUrl && text ? "mixed" : userImageUrl ? "image" : "text";
    setMessages((current) => [...current, { id: createId(), role: "user", type, text: text || undefined, images: userImageUrl ? [{ url: userImageUrl, alt: "Gambar yang dikirim pengguna", mimeType: image?.mimeType }] : undefined, createdAt: nowLabel() }]);
    setInput("");
    removeAttachment();
    if (localResponse) {
      if (process.env.NODE_ENV !== "production") console.info(`[XYRONS_AI] route=LOCAL intent=${localResponse.intent}`);
      setLoading(true);
      await new Promise((resolve) => window.setTimeout(resolve, 220));
      setMessages((current) => [...current, responseToMessage(localResponse)]);
      setLoading(false);
      setLastSubmission(null);
      return;
    }
    await requestAssistant({ message: text || undefined, image });
  };

  const submit = (event: FormEvent) => { event.preventDefault(); void send(input); };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(input); }
  };

  return (
    <aside className={`xchat-root ${open ? "is-open" : ""}`} aria-label="Xyrons AI Assistant">
      {!open ? <button className="xchat-launcher" type="button" onClick={() => setOpen(true)} aria-label={t("Open Xyrons AI Assistant")}><RobotAvatar online /></button> : (
        <section className="xchat-window" role="dialog" aria-label={t("Chat with Xyrons AI Assistant")}>
          <header className="xchat-header"><RobotAvatar online /><div className="xchat-header-copy"><strong>Xyrons Assistant</strong><span className="xchat-status">{t("Portfolio scope")}</span></div><button className="xchat-icon-button" type="button" onClick={() => setOpen(false)} aria-label={t("Minimize chatbot")}><Minus size={17} /></button></header>
          <div className="xchat-messages" aria-live="polite" aria-busy={loading}>
            {messages.map((message) => <article className={`xchat-message ${message.role}`} key={message.id}><div className="xchat-bubble">{message.text && <p>{message.id === "welcome" ? t(welcomeMessage) : message.text}</p>}{message.images?.map((image, index) => <ChatImageMessage image={image} key={`${message.id}-${index}`} />)}<div className="xchat-meta"><time>{message.createdAt}</time>{message.role === "user" && <CheckCheck size={11} aria-label={t("Sent")} />}</div></div></article>)}
            {loading && <article className="xchat-message assistant"><div className="xchat-bubble xchat-typing" aria-label={t("Xyrons AI is typing")}><i /><i /><i /></div></article>}
            <div ref={endRef} />
          </div>
          <div>{error && <div className="xchat-error" role="alert"><span>{error}</span>{lastSubmission && <button type="button" onClick={() => void requestAssistant(lastSubmission.payload)} disabled={loading}><RotateCcw size={12} /> {t("Try again")}</button>}</div>}<div className="xchat-quick-actions">{quickActions.map((action) => <button type="button" key={action} onClick={() => void send(t(action))} disabled={loading}>{t(action)}</button>)}</div></div>
          <div className="xchat-composer">
            {attachment && <ImagePreview file={attachment.file} url={attachment.previewUrl} onRemove={removeAttachment} />}
            <form className="xchat-form" onSubmit={submit}><input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => selectFile(event.target.files?.[0])} /><button className="xchat-attach" type="button" onClick={() => fileInputRef.current?.click()} disabled={loading} aria-label={t("Upload image")}><ImagePlus size={18} /></button><textarea value={input} onChange={(event) => { setInput(event.target.value); if (error) setError(""); }} onKeyDown={handleKeyDown} maxLength={2000} rows={1} placeholder={loading ? t("Xyrons AI is typing") : t("Type your message...")} disabled={loading} aria-label={t("Message Xyrons AI")} /><button className="xchat-send" type="submit" disabled={loading || (!input.trim() && !attachment)} aria-label={t("Send message")}><Send size={17} /></button></form>
          </div>
        </section>
      )}
    </aside>
  );
}
