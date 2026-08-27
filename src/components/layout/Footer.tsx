import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { availableSocials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { SocialButton } from "@/components/ui/SocialButton";

export function Footer() { return <footer><Container><div className="footer-top"><div><Link className="brand" href="/#home"><span>X</span>{profile.brand.slice(1)}<i /></Link><p>{profile.title}</p></div><div className="socials">{availableSocials.map((social) => <SocialButton social={social} key={social.key} />)}<Link className="social-button" href="/#home" aria-label="Back to top"><ArrowUp size={19} /></Link></div></div><div className="footer-bottom"><p>© 2026 {profile.brand}. All rights reserved.</p><p>Designed with purpose. Built with care.</p></div></Container></footer>; }
