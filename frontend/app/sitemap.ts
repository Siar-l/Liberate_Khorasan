import type { MetadataRoute } from "next";
import { getAnnouncements, getArticles } from "@/lib/api";

const BASE_URL = "https://liberatekhorasan.org";

type StrapiItem = {
  id: number;
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
};

const readField = (item: StrapiItem, key: string): unknown => {
  if (key in item) return item[key];
  if (item.attributes && key in item.attributes) return item.attributes[key];
  return undefined;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/fa`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fa/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fa/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fa/announcements`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/announcements`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fa/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fa/culture`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/culture`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const locales: Array<"fa" | "en"> = ["fa", "en"];

  const articleRoutes: MetadataRoute.Sitemap = [];
  const announcementRoutes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    try {
      const articlesResponse = await getArticles(locale);
      const articleData = (articlesResponse as { data?: unknown }).data;
      if (Array.isArray(articleData)) {
        for (const item of articleData as StrapiItem[]) {
          const slug = readField(item, "slug");
          if (typeof slug !== "string" || slug.length === 0) continue;

          const lastModified =
            (readField(item, "publishedAtCustom") as string | undefined) ??
            (readField(item, "publishedAt") as string | undefined) ??
            now;

          articleRoutes.push({
            url: `${BASE_URL}/${locale}/articles/${slug}`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    } catch {
      // Keep sitemap generation resilient if Strapi is temporarily unavailable.
    }

    try {
      const announcementsResponse = await getAnnouncements(locale);
      const announcementData = (announcementsResponse as { data?: unknown }).data;
      if (Array.isArray(announcementData)) {
        for (const item of announcementData as StrapiItem[]) {
          const slug = readField(item, "slug");
          if (typeof slug !== "string" || slug.length === 0) continue;

          const lastModified =
            (readField(item, "publishedAtCustom") as string | undefined) ??
            (readField(item, "publishedAt") as string | undefined) ??
            now;

          announcementRoutes.push({
            url: `${BASE_URL}/${locale}/announcements/${slug}`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    } catch {
      // Keep sitemap generation resilient if Strapi is temporarily unavailable.
    }
  }

  return [...staticRoutes, ...articleRoutes, ...announcementRoutes];
}
