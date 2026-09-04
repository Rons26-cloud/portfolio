"use client";

import Image from "next/image";
import { ExternalLink, ImageOff } from "lucide-react";
import { useState } from "react";
import type { ChatImage } from "@/lib/chat-types";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function ChatImageMessage({ image }: { image: ChatImage }) {
  const [failed, setFailed] = useState(false);
  const { t } = useLanguage();

  if (failed) {
    return <div className="xchat-image-fallback"><ImageOff size={18} /><span>{t("Image could not be displayed.")}</span></div>;
  }

  return (
    <figure className="xchat-message-image">
      <Image src={image.url} width={640} height={640} alt={image.alt} unoptimized onError={() => setFailed(true)} />
      <a href={image.url} target="_blank" rel="noopener noreferrer" aria-label={t("Open full-size image")}><ExternalLink size={14} /> {t("Open image")}</a>
    </figure>
  );
}
