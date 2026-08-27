import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "secondary"; external?: boolean; download?: boolean; className?: string };

export function Button({ href, children, variant = "primary", external, download, className }: Props) {
  const styles = cn("button", variant === "secondary" && "button-secondary", className);
  if (external || download) return <a className={styles} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} download={download || undefined}>{children}</a>;
  return <Link className={styles} href={href}>{children}</Link>;
}
