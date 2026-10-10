import type { MetadataRoute } from "next";
import { siteGuides } from "@/lib/site-guides";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/security", priority: 0.8, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.7, changeFrequency: "monthly" },
    { path: "/why-minibrief", priority: 0.7, changeFrequency: "monthly" },
    { path: "/changelog", priority: 0.5, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
    { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" },
  ];

  const pages = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));

  // Guides join the sitemap only once at least one exists.
  if (siteGuides.length === 0) return pages;
  return [
    ...pages,
    { url: `${siteUrl}/guides`, changeFrequency: "weekly", priority: 0.6 },
    ...siteGuides.map((guide) => ({
      url: `${siteUrl}/guides/${guide.slug}`,
      lastModified: guide.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
