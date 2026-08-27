import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { availableSocials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { SocialButton } from "@/components/ui/SocialButton";
import { Reveal } from "@/components/animations/Reveal";

export function Contact() {
  const featured = availableSocials.filter((social) => ["github", "instagram", "linkedin"].includes(social.key));
  return <section id="contact" className="section contact"><Container><Reveal><div className="contact-card"><span>04 / Contact</span><h2>Let&apos;s Connect</h2><p>Have a project, collaboration, or idea you&apos;d like to discuss? Let&apos;s connect.</p><div className="contact-actions">{profile.email && <a className="button" href={`mailto:${profile.email}`}><Mail size={18} /> Send Message <ArrowUpRight size={17} /></a>}{featured.map((social) => <SocialButton social={social} showLabel key={social.key} />)}</div>{!profile.email && featured.length === 0 && <p className="config-note">Contact links will appear here once they are added to the profile configuration.</p>}</div></Reveal></Container></section>;
}
