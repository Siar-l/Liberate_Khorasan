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

export async function getAnnouncementByIdentifier(
  locale: "fa" | "en",
  identifier: string
) {
  const bySlug = await getAnnouncementBySlug(locale, identifier);
  const bySlugData = (bySlug as { data?: unknown }).data;
  if (Array.isArray(bySlugData) && bySlugData.length > 0) {
    return bySlug;
  }

  const byDocumentId = await fetchAPI(
    `/api/announcements?filters[documentId][$eq]=${encodeURIComponent(identifier)}&locale=${locale}&populate=*`
  );
  const byDocumentIdData = (byDocumentId as { data?: unknown }).data;
  if (Array.isArray(byDocumentIdData) && byDocumentIdData.length > 0) {
    return byDocumentId;
  }

  if (/^\d+$/.test(identifier)) {
    return fetchAPI(
      `/api/announcements?filters[id][$eq]=${identifier}&locale=${locale}&populate=*`
    );
  }

  return bySlug;
}