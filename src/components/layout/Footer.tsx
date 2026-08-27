import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { availableSocials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { SocialButton } from "@/components/ui/SocialButton";
import { T } from "@/components/providers/LanguageProvider";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

const services = [
  "Web Development",
  "Mobile Development",
  "Backend Development",
  "Game Development",
  "UI / Interactive Experiences",
];

export function Footer() {
  const contactHref = profile.email ? `mailto:${profile.email}` : "/#contact";
  return (
    <footer>
      <Container>
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link className="brand" href="/#home">
              <span>X</span>{profile.brand.slice(1)}<i />
            </Link>
            <p className="footer-bio">
              <T>Creative Developer &amp; Digital Builder creating modern web, mobile, and interactive digital experiences.</T>
            </p>
            <div className="footer-socials">
              {availableSocials.map((social) => (
                <SocialButton social={social} key={social.key} />
              ))}
            </div>
          </div>

          <nav className="footer-col" aria-label="Quick links">
            <h3 className="footer-heading"><T>Quick Links</T></h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}><T>{link.label}</T></Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3 className="footer-heading"><T>Services</T></h3>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service}>
                  <span><T>{service}</T></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-connect">
            <h3 className="footer-heading"><T>Connect</T></h3>
            <p className="footer-connect-text">
              <T>Have a project or collaboration idea?</T><br />
              <T>Let&apos;s make something great.</T>
            </p>
            <a className="footer-cta" href={contactHref} rel="noopener noreferrer">
              {profile.email ? <Mail size={16} /> : null}
              <T>Let&apos;s Talk</T>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {profile.brand}. <T>All rights reserved.</T></p>
          <p><T>Designed with purpose. Built with care.</T></p>
        </div>
      </Container>
    </footer>
  );
}
