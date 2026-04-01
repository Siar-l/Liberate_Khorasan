import { notFound } from "next/navigation";
import { getAnnouncementByIdentifier, STRAPI_URL } from "@/lib/api";

type AnnouncementDetailPageProps = {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
};

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

const extractMediaUrl = (value: unknown): string | undefined => {
  const getUrl = (source: unknown): string | undefined => {
    if (!source || typeof source !== "object") return undefined;
    const raw = (source as { url?: unknown }).url;
    if (typeof raw === "string" && raw.length > 0) return raw;
    const attrs = (source as { attributes?: { url?: unknown } }).attributes;
    if (attrs && typeof attrs.url === "string" && attrs.url.length > 0) return attrs.url;
    return undefined;
  };

  if (Array.isArray(value)) return getUrl(value[0]);

  if (value && typeof value === "object") {
    const data = (value as { data?: unknown }).data;
    if (Array.isArray(data)) return getUrl(data[0]);
    if (data && typeof data === "object") return getUrl(data);
    return getUrl(value);
  }

  return undefined;
};

const toAbsoluteUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
};

export default async function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const { locale, slug } = await params;
  const isFa = locale === "fa";

  let item: StrapiItem | null = null;

  try {
    const response = await getAnnouncementByIdentifier(locale, slug);
    const data = (response as { data?: unknown }).data;
    if (Array.isArray(data) && data.length > 0) {
      item = data[0] as StrapiItem;
    }
  } catch {
    item = null;
  }

  if (!item) {
    notFound();
  }

  const title = (readField(item, "title") as string | undefined) ?? (isFa ? "بدون عنوان" : "Untitled");
  const excerpt = (readField(item, "excerpt") as string | undefined) ?? "";
  const type = (readField(item, "type") as string | undefined) ?? (isFa ? "اطلاعیه" : "Announcement");
  const date =
    (readField(item, "publishedAtCustom") as string | undefined) ??
    (readField(item, "publishedAt") as string | undefined) ??
    "";
  const imageUrl = toAbsoluteUrl(extractMediaUrl(readField(item, "attachment")));

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:px-10" dir={isFa ? "rtl" : "ltr"}>
      <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
        {imageUrl ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <img src={imageUrl} alt={title} className="h-72 w-full object-cover" />
          </div>
        ) : null}

        <div className="mb-4 flex items-center justify-between gap-3 text-sm text-gray-500">
          <span className="rounded-full bg-gray-100 px-3 py-1">{type}</span>
          <span>{date}</span>
        </div>

        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{title}</h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">{excerpt}</p>
      </article>
    </main>
  );
}
