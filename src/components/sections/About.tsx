import { Code2, Compass, Focus } from "lucide-react";
import Image from "next/image";
import { about, profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";

const ABOUT_IMAGE = "/assets/images/about/xyrons-about.webp";

export function About() {
  const details = [{ Icon: Code2, title: "What I build", text: about.description }, { Icon: Focus, title: "Current focus", text: about.focus }, { Icon: Compass, title: "Location", text: about.location }].filter((item) => item.text);
  return <section id="about" className="section about"><Container><Reveal><SectionTitle eyebrow="02 / About" title="Building with clarity and intent" /></Reveal><div className="about-grid"><Reveal><div className="about-image-wrapper"><Image src={ABOUT_IMAGE} alt="Xyrons" fill sizes="(max-width: 768px) 100vw, 40vw" className="about-image" /><div className="about-image-fallback" role="img" aria-label={`${profile.name} profile placeholder`}><span>{profile.brand.charAt(0)}</span></div></div></Reveal><Reveal><div className="about-copy"><p className="lead">I&apos;m {profile.name}, a {profile.title.toLowerCase()} focused on creating digital experiences that feel fast, useful, and considered.</p><p>{profile.description}</p>{details.length > 0 && <div className="about-details">{details.map(({ Icon, title, text }) => <div key={title}><Icon size={20} /><span><b>{title}</b>{text}</span></div>)}</div>}</div></Reveal></div></Container></section>;
}
