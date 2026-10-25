import type { MetadataRoute } from "next";
import { categories, tools } from "@/lib/registry";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yardcalc.pages.dev";
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.2 },
    ...categories.map((c) => ({
      url: `${siteUrl}/category/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...tools.map((t) => ({
      url: `${siteUrl}/tools/${t.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
