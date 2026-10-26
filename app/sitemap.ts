import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = site.url;
  return [
    { url, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/process`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
