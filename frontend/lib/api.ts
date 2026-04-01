export const STRAPI_URL = "https://liberate-khorasan-7.onrender.com";

export async function fetchAPI(path: string) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${path}`);
  }

  return res.json();
}

export async function getArticles(locale: "fa" | "en") {
  return fetchAPI(
    `/api/articles?locale=${locale}&populate=*`
  );
}

export async function getArticleBySlug(
  locale: "fa" | "en",
  slug: string
) {
  return fetchAPI(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate=*`
  );
}

export async function getAnnouncements(locale: "fa" | "en") {
  return fetchAPI(
    `/api/announcements?locale=${locale}&populate=*`
  );
}

export async function getAnnouncementBySlug(
  locale: "fa" | "en",
  slug: string
) {
  return fetchAPI(
    `/api/announcements?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate=*`
  );
}

export async function getCultures(locale: "fa" | "en") {
  return fetchAPI(`/api/cultures?locale=${locale}&populate=*`);
}

export async function getCultureBySlug(locale: "fa" | "en", slug: string) {
  return fetchAPI(
    `/api/cultures?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate=*`
  );
}