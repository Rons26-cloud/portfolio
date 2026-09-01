"use client";

import Image from "next/image";
import { ExternalLink, ImageOff } from "lucide-react";
import { useState } from "react";
import type { ChatImage } from "@/lib/chat-types";

export function ChatImageMessage({ image }: { image: ChatImage }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="xchat-image-fallback"><ImageOff size={18} /><span>Gambar tidak dapat ditampilkan.</span></div>;
  }

  return (
    <figure className="xchat-message-image">
      <Image src={image.url} width={640} height={640} alt={image.alt} unoptimized onError={() => setFailed(true)} />
      <a href={image.url} target="_blank" rel="noopener noreferrer" aria-label="Buka gambar ukuran penuh"><ExternalLink size={14} /> Buka gambar</a>
    </figure>
  );
}
