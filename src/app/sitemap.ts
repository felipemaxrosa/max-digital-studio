import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contato`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/sobre`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
