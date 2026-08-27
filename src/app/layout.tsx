import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { absoluteUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const title = `${profile.brand} | Portfolio`;
const description = `${profile.brand} is a creative developer and digital builder creating modern web, mobile, and interactive digital products.`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: `%s | ${profile.brand}` },
  description,
  applicationName: profile.brand,
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  keywords: ["Xyrons", "creative developer", "full-stack developer", "web developer", "mobile app developer", "UI development", "digital products", "portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: profile.brand,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.brand} portfolio` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#070a10", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: absoluteUrl(),
    image: absoluteUrl(profile.profileImage),
    jobTitle: profile.title,
    description: profile.description,
    sameAs: [profile.githubUrl],
    knowsAbout: ["Web Development", "Mobile Applications", "TypeScript", "React", "Flutter"],
  };

  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
