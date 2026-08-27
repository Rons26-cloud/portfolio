import Image from "next/image";
import { Code2, Compass, Focus } from "lucide-react";
import { about, profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";
import { T } from "@/components/providers/LanguageProvider";

export function About() {
  const details = [{ Icon: Code2, title: "What I build", text: about.description }, { Icon: Focus, title: "Current focus", text: about.focus }, { Icon: Compass, title: "Location", text: about.location }].filter((item) => item.text);
  const introduction = `I'm ${profile.name}, a ${profile.title.toLowerCase()} focused on creating digital experiences that feel fast, useful, and considered.`;
  return <section id="about" className="section about"><Container><Reveal><SectionTitle eyebrow="02 / About" title="Building with clarity and intent" /></Reveal><div className="about-grid"><Reveal><div className="portrait">{profile.profileImage ? <Image className="portrait-image" src={profile.profileImage} alt={`${profile.name}, ${profile.title}`} fill sizes="(min-width: 768px) 40vw, 100vw" priority /> : <span>{profile.brand.charAt(0)}</span>}<div /></div></Reveal><Reveal><div className="about-copy"><p className="lead"><T>{introduction}</T></p><p><T>{profile.description}</T></p>{details.length > 0 && <div className="about-details">{details.map(({ Icon, title, text }) => <div key={title}><Icon size={20} /><span><b><T>{title}</T></b><T>{text}</T></span></div>)}</div>}</div></Reveal></div></Container></section>;
}
