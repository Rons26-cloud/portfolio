"use client";
import Link from "next/link";
import { FolderKanban, Home, MessageCircle, Wrench } from "lucide-react";
import { T } from "@/components/providers/LanguageProvider";

const items = [{ label: "Home", href: "/#home", Icon: Home }, { label: "Projects", href: "/#projects", Icon: FolderKanban }, { label: "Skills", href: "/#skills", Icon: Wrench }, { label: "Contact", href: "/#contact", Icon: MessageCircle }];
export function BottomNavigation() { return <nav className="bottom-nav" aria-label="Quick navigation">{items.map(({ label, href, Icon }) => <Link key={href} href={href}><Icon size={19} /><span><T>{label}</T></span></Link>)}</nav>; }
