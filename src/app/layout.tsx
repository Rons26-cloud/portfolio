import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const title = `${profile.brand} — ${profile.title}`;
const description = `Personal portfolio of ${profile.brand} showcasing web development, applications, digital products, and selected projects.`;

export const metadata: Metadata = {
  metadataBase: profile.siteUrl ? new URL(profile.siteUrl) : undefined,
  title: { default: title, template: `%s — ${profile.brand}` },
  description,
  applicationName: profile.brand,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: profile.siteUrl ? { canonical: "/" } : undefined,
  openGraph: { title, description, type: "website", siteName: profile.brand },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#070a10", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${mono.variable}`}><body>{children}</body></html>;
}
