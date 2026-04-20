import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/es`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...BUSINESS.serviceAreas.map((a) => ({
      url: `${base}/service-area/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
