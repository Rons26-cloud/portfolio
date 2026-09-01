"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { CheckCheck, ImagePlus, Minus, RotateCcw, Send, X } from "lucide-react";
import { ChatImageMessage } from "@/components/chat/ChatImageMessage";
import { ImagePreview } from "@/components/chat/ImagePreview";
import type { ChatApiError, ChatApiResponse, ChatImageInput, ChatMessage, ChatMessageType, ChatRequestBody } from "@/lib/chat-types";
import { resolveLocalResponse } from "@/lib/xyrons-knowledge";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const quickActions = ["Siapa Xyrons?", "Lihat proyek", "Apa kelebihannya?", "Cara menghubungi?"];

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
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [lastSubmission, setLastSubmission] = useState<LastSubmission | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", type: "text", text: "Halo! Saya Xyrons AI Assistant. Kirim pertanyaan atau unggah gambar untuk saya analisis.", createdAt: nowLabel() },
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
    if (!ALLOWED_TYPES.has(file.type)) return setError("Format gambar harus JPG, PNG, atau WebP.");
    if (file.size > MAX_FILE_BYTES) return setError("Ukuran gambar maksimal 10 MB.");
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
      const data = await response.json() as ChatApiResponse | ChatApiError;
      if (!response.ok || !("type" in data)) {
        const message = response.status === 429
          ? "Xyrons AI sedang mencapai batas penggunaan. Coba lagi beberapa saat."
          : "Maaf, jawaban belum berhasil dimuat. Coba lagi.";
        throw new Error(message);
      }
      setMessages((current) => [...current, responseToMessage(data)]);
      setLastSubmission(null);
    } catch (requestError) {
      setError(requestError instanceof Error && requestError.message !== "REQUEST_FAILED"
        ? requestError.message
        : "Maaf, jawaban belum berhasil dimuat. Coba lagi.");
      setLastSubmission({ payload });
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
        setError("Maaf, gambar ini belum bisa diproses. Coba unggah gambar lain.");
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
    <aside className="xchat-root" aria-label="Xyrons AI Assistant">
      {!open ? <button className="xchat-launcher" type="button" onClick={() => setOpen(true)} aria-label="Buka Xyrons AI Assistant"><RobotAvatar online /></button> : (
        <section className="xchat-window" role="dialog" aria-label="Percakapan dengan Xyrons AI Assistant">
          <header className="xchat-header"><RobotAvatar online /><div className="xchat-header-copy"><strong>Xyrons AI Assistant</strong><span className="xchat-status"><i aria-hidden="true" /> Online · Siap membantu</span></div><div className="xchat-header-actions"><button className="xchat-icon-button" type="button" onClick={() => setOpen(false)} aria-label="Minimalkan chatbot"><Minus size={17} /></button><button className="xchat-icon-button" type="button" onClick={() => { setOpen(false); setError(""); }} aria-label="Tutup chatbot"><X size={18} /></button></div></header>
          <div className="xchat-messages" aria-live="polite" aria-busy={loading}>
            {messages.map((message) => <article className={`xchat-message ${message.role}`} key={message.id}>{message.role === "assistant" && <RobotAvatar small />}<div className="xchat-bubble">{message.text && <p>{message.text}</p>}{message.images?.map((image, index) => <ChatImageMessage image={image} key={`${message.id}-${index}`} />)}<div className="xchat-meta"><time>{message.createdAt}</time>{message.role === "user" && <CheckCheck size={11} aria-label="Terkirim" />}</div></div></article>)}
            {loading && <article className="xchat-message assistant"><RobotAvatar small /><div className="xchat-bubble xchat-typing" aria-label="Xyrons AI sedang mengetik"><i /><i /><i /></div></article>}
            <div ref={endRef} />
          </div>
          <div>{error && <div className="xchat-error" role="alert"><span>{error}</span>{lastSubmission && <button type="button" onClick={() => void requestAssistant(lastSubmission.payload)} disabled={loading}><RotateCcw size={12} /> Coba lagi</button>}</div>}<div className="xchat-quick-actions">{quickActions.map((action) => <button type="button" key={action} onClick={() => void send(action)} disabled={loading}>{action}</button>)}</div></div>
          <div className="xchat-composer">
            {attachment && <ImagePreview file={attachment.file} url={attachment.previewUrl} onRemove={removeAttachment} />}
            <form className="xchat-form" onSubmit={submit}><input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => selectFile(event.target.files?.[0])} /><button className="xchat-attach" type="button" onClick={() => fileInputRef.current?.click()} disabled={loading} aria-label="Unggah gambar"><ImagePlus size={18} /></button><textarea value={input} onChange={(event) => { setInput(event.target.value); if (error) setError(""); }} onKeyDown={handleKeyDown} maxLength={2000} rows={1} placeholder={loading ? "Xyrons AI sedang mengetik..." : "Tulis pertanyaan bebas..."} disabled={loading} aria-label="Pesan untuk Xyrons AI" /><button className="xchat-send" type="submit" disabled={loading || (!input.trim() && !attachment)} aria-label="Kirim pesan"><Send size={17} /></button></form>
          </div>
        </section>
      )}
    </aside>
  );
}
