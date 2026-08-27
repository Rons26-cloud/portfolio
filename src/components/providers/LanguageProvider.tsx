"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { indonesian, type Language } from "@/lib/translations";

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (text: string) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "id") queueMicrotask(() => setLanguageState("id"));
    document.documentElement.lang = saved === "id" ? "id" : "en";
  }, []);
  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("portfolio-language", next);
    document.documentElement.lang = next;
  };
  const value = useMemo(() => ({ language, setLanguage, t: (text: string) => language === "id" ? indonesian[text] ?? text : text }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function T({ children }: { children: string }) {
  const { t } = useLanguage();
  return <>{t(children)}</>;
}
