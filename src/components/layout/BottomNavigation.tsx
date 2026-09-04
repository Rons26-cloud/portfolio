"use client";
import Link from "next/link";
import { FolderKanban, Home, MessageCircle, Wrench } from "lucide-react";
import { T, useLanguage } from "@/components/providers/LanguageProvider";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const items = [{ label: "Home", href: "/#home", Icon: Home }, { label: "Projects", href: "/#projects", Icon: FolderKanban }, { label: "Skills", href: "/#skills", Icon: Wrench }, { label: "Contact", href: "/#contact", Icon: MessageCircle }];
export function BottomNavigation() { const { t } = useLanguage(); const hidden = useScrollVisibility(); return <nav className={`bottom-nav ${hidden ? "nav-hidden" : ""}`} aria-label={t("Quick navigation")}><Link href={items[0].href}><Home size={19} /><span><T>Home</T></span></Link><Link href={items[1].href}><FolderKanban size={19} /><span><T>Projects</T></span></Link><span className="bottom-nav-media-slot" aria-hidden="true" /><Link href={items[2].href}><Wrench size={19} /><span><T>Skills</T></span></Link><Link href={items[3].href}><MessageCircle size={19} /><span><T>Contact</T></span></Link></nav>; }
