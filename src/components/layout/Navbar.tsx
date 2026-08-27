"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { navigation } from "@/data/navigation";
import { availableSocials } from "@/data/socials";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SocialButton } from "@/components/ui/SocialButton";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -60%" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <header className={cn("navbar", scrolled && "navbar-scrolled")}><Container className="nav-inner">
    <Link href="/#home" className="brand" aria-label={`${profile.brand} home`}><span>X</span>{profile.brand.slice(1)}<i /></Link>
    <nav className="desktop-nav" aria-label={t("Primary navigation")}>{navigation.map((item) => <Link className={active === item.href.split("#")[1] ? "active" : ""} key={item.href} href={item.href}>{t(item.label)}</Link>)}</nav>
    <div className="nav-actions"><div className="language-switch" aria-label="Language"><button className={language === "en" ? "active" : ""} type="button" onClick={() => setLanguage("en")}>EN</button><span>/</span><button className={language === "id" ? "active" : ""} type="button" onClick={() => setLanguage("id")}>ID</button></div>{profile.cvUrl && <a className="nav-cv" href={profile.cvUrl} target="_blank" rel="noopener noreferrer">{t("Download CV")}</a>}<button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div>
  </Container>
  <div className={cn("mobile-panel", open && "open")} aria-hidden={!open}><nav aria-label="Mobile navigation">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{t(item.label)}<span>↗</span></Link>)}{profile.cvUrl && <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t("Download CV")}<span>↓</span></a>}</nav>{availableSocials.length > 0 && <div className="mobile-connect"><p>{t("Let's connect")}</p><div className="mobile-socials">{availableSocials.slice(0, 4).map((social) => <SocialButton key={social.key} social={social} />)}</div></div>}</div>
  </header>;
}
