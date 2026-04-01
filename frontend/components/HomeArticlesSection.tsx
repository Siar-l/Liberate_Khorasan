import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getArticles, STRAPI_URL } from "@/lib/api";

type HomeArticlesSectionProps = {
  locale: "fa" | "en";
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

const isLocaleMatch = (item: StrapiItem, locale: "fa" | "en"): boolean => {
  const itemLocale = readField(item, "locale");
  return typeof itemLocale === "string" && itemLocale === locale;
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

const toAbsoluteUrl = (url: string | undefined): string => {
  if (!url) return "/images/article-1.jpg";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
};

export default async function HomeArticlesSection({
  locale,
}: HomeArticlesSectionProps) {
  const isFa = locale === "fa";
  let items: StrapiItem[] = [];

  try {
    const response = await getArticles(locale);
    const data = (response as { data?: unknown }).data;
    if (Array.isArray(data)) {
      items = (data as StrapiItem[])
        .filter((item) => isLocaleMatch(item, locale))
        .slice(0, 3);
    }
  } catch {
    items = [];
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-gray-500">
            {isFa ? "بخش مطالب" : "Content Section"}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {isFa ? "مقاله‌ها" : "Articles"}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-gray-600">
            {isFa
              ? "تازه‌ترین مقاله‌ها، تحلیل‌ها و مطالب آگاهی‌بخش را در این بخش دنبال کنید."
              : "Follow the latest articles, analysis, and informative content in this section."}
          </p>
        </div>

        <Link
          href={`/${locale}/articles`}
          className="hidden rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 md:inline-block"
        >
          {isFa ? "همه مقاله‌ها" : "All Articles"}
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const title = (readField(item, "title") as string | undefined) ?? (isFa ? "بدون عنوان" : "Untitled");
          const excerpt = (readField(item, "excerpt") as string | undefined) ?? "";
          const slug = (readField(item, "slug") as string | undefined) ?? String(item.id);
          const category = (readField(item, "category") as string | undefined) ?? (isFa ? "مقاله" : "Article");
          const date =
            (readField(item, "publishedAtCustom") as string | undefined) ??
            (readField(item, "publishedAt") as string | undefined) ??
            "";
          const image = toAbsoluteUrl(extractMediaUrl(readField(item, "cover")));

          return (
            <ArticleCard
              key={item.id}
              locale={locale}
              article={{
                id: item.id,
                title,
                excerpt,
                image,
                slug,
                date,
                category,
              }}
            />
          );
        })}
      </div>

      <div className="mt-8 md:hidden">
        <Link
          href={`/${locale}/articles`}
          className="inline-block rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
        >
          {isFa ? "همه مقاله‌ها" : "All Articles"}
        </Link>
      </div>
    </section>
  );
}