import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(project.coverImage ? { images: [absoluteUrl(project.coverImage)] } : {}),
    })),
  ];
}
