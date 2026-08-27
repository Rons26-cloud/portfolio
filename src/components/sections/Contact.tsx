import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { availableSocials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { SocialButton } from "@/components/ui/SocialButton";
import { Reveal } from "@/components/animations/Reveal";
import { T } from "@/components/providers/LanguageProvider";

export function Contact() {
  return <section id="contact" className="section contact"><Container><Reveal><div className="contact-card"><span><T>04 / Contact</T></span><h2><T>Let&apos;s Work Together</T></h2><p><T>Have a project, collaboration, or idea you&apos;d like to discuss? Let&apos;s connect.</T></p><div className="contact-actions">{profile.email && <a className="button" href={`mailto:${profile.email}`}><Mail size={18} /> <T>Send Message</T> <ArrowUpRight size={17} /></a>}{availableSocials.map((social) => <SocialButton social={social} showLabel key={social.key} />)}</div>{!profile.email && availableSocials.length === 0 && <p className="config-note">Contact links will appear here once they are added to the profile configuration.</p>}</div></Reveal></Container></section>;
}
