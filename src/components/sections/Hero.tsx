import { ArrowDownRight, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { availableSocials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialButton } from "@/components/ui/SocialButton";
import { HeroVisual } from "@/components/animations/HeroVisual";
import { ParticleField } from "@/components/animations/ParticleField";
import { T } from "@/components/providers/LanguageProvider";
import { projects } from "@/data/projects";

export function Hero() {
  return (
    <section id="home" className="hero">
      <ParticleField />
      <Container className="hero-grid">
        <div className="hero-copy">
          <div className="availability">
            <i />
            <T>Available for thoughtful projects</T>
          </div>

          <p className="hero-intro">
            <T>Hello, I&apos;m</T> <strong>{profile.name}</strong>
          </p>
          <h1>
            <T>Creative Developer</T>
            <span>&amp; <T>Digital Builder</T></span>
          </h1>
          <p className="hero-description"><T>{profile.description}</T></p>

          <div className="hero-proof" aria-label="Portfolio overview">
            <div><strong>{String(projects.length).padStart(2, "0")}</strong><span><T>Selected projects</T></span></div>
            <div><strong>WEB · MOBILE</strong><span><T>Product and system development</T></span></div>
          </div>

          <div className="hero-actions">
            <Button href="/#projects">
              <T>View My Work</T> <ArrowDownRight size={18} />
            </Button>
            <Button href="/#contact" variant="secondary">
              <T>Let&apos;s Talk</T> <ArrowRight size={18} />
            </Button>
          </div>

          {availableSocials.length > 0 && (
            <div className="socials hero-socials">
              {availableSocials.map((social) => (
                <SocialButton key={social.key} social={social} />
              ))}
            </div>
          )}
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
