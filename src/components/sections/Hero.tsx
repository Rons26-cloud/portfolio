import { ArrowDownRight, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { availableSocials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialButton } from "@/components/ui/SocialButton";
import { HeroVisual } from "@/components/animations/HeroVisual";

export function Hero() { return <section id="home" className="hero"><Container className="hero-grid"><div className="hero-copy"><div className="availability"><i /> Available for thoughtful projects</div><p className="hero-intro">Hello, I&apos;m <strong>{profile.name}</strong></p><h1>Creative Developer <span>&amp; Digital Builder</span></h1><p className="hero-description">{profile.description}</p><div className="hero-actions"><Button href="/#projects">View My Work <ArrowDownRight size={18} /></Button><Button href="/#contact" variant="secondary">Contact Me <ArrowRight size={18} /></Button></div>{availableSocials.length > 0 && <div className="socials hero-socials">{availableSocials.map((social) => <SocialButton key={social.key} social={social} />)}</div>}</div><HeroVisual /></Container></section>; }
