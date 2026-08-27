import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap { if (!profile.siteUrl) return []; return [{ url: profile.siteUrl, priority: 1 }, ...projects.map((project) => ({ url: `${profile.siteUrl}/projects/${project.slug}`, priority: 0.8 }))]; }
