"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

export function ImagePreview({ file, url, onRemove }: { file: File; url: string; onRemove: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="xchat-upload-preview">
      <Image src={url} width={72} height={72} alt={`Preview ${file.name}`} unoptimized />
      <div><strong>{file.name}</strong><span>{formatBytes(file.size)} · {t("Ready to review")}</span></div>
      <button type="button" onClick={onRemove} aria-label={t("Remove image")}><X size={15} /></button>
    </div>
  );
}
