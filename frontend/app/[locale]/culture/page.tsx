import CultureEventsSection from "@/components/CultureEventsSection";
import { getCultures, STRAPI_URL } from "@/lib/api";

type CulturePageProps = {
  params: Promise<{
    locale: "fa" | "en";
  }>;
};

const content = {
  fa: {
    badge: "فرهنگ",
    title: "فرهنگ و هویت",
    subtitle:
      "فرهنگ، زبان، هنر و تاریخ، بخش جدایی‌ناپذیر هویت یک جامعه‌اند.",

    ctaTitle: "رویدادهای فرهنگی",
    ctaText:
      "در این بخش می‌توانید نوشته‌ها، جشن‌ها و مطالب مرتبط با فرهنگ و هویت را دنبال کنید.",
    ctaButton: "مشاهده مقاله‌ها",
  },
  en: {
    badge: "Culture",
    title: "Culture and Identity",
    subtitle:
      "Culture, language, art, and history are inseparable parts of a society’s identity.",

    ctaTitle: "Cultural Events",
    ctaText:
      "In this section, readers can follow articles, events, and writings related to culture and identity.",
    ctaButton: "View Articles",
  },
};

type StrapiCultureItem = {
  id: number;
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
  title?: string;
  excerpt?: string;
  slug?: string;
  category?: string;
  publishedAtCustom?: string;
  publishedAt?: string;
};

const readField = (item: StrapiCultureItem, key: string): unknown => {
  if (key in item) return item[key];
  if (item.attributes && key in item.attributes) return item.attributes[key];
  return undefined;
};

const isLocaleMatch = (item: StrapiCultureItem, locale: "fa" | "en"): boolean => {
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

const toAbsoluteUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
};

const isStrapiCultureArray = (value: unknown): value is StrapiCultureItem[] => {
  if (!Array.isArray(value)) return false;

  return value.every((item) => typeof item === "object" && item !== null && "id" in item);
};

export default async function CulturePage({ params }: CulturePageProps) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === "fa" ? "fa" : "en";
  const isFa = locale === "fa";
  const t = content[locale];

  let cultures: StrapiCultureItem[] = [];

  try {
    const response = await getCultures(locale);
    const data = (response as { data?: unknown }).data;
    if (isStrapiCultureArray(data)) {
      cultures = data.filter((item) => isLocaleMatch(item, locale));
    }
  } catch {
    cultures = [];
  }

  return (
    <main
      dir={isFa ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-gray-900"
    >
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-gray-200 px-4 py-1 text-sm font-medium text-gray-600">
            {t.badge}
          </span>

          <h1 className="mt-6 text-[clamp(1.8rem,8vw,3rem)] font-bold leading-tight">
            {t.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-600 md:text-xl">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-gray-900 px-5 py-8 text-white shadow-sm sm:px-8 sm:py-10">
          <h2 className="text-2xl font-semibold">{t.ctaTitle}</h2>
          <p className="mt-4 max-w-2xl leading-8 text-gray-200">
            {t.ctaText}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`/${locale}/culture/admin`}
              className="inline-block rounded-2xl border border-white/40 bg-transparent px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {locale === "fa" ? "پنل مدیریت فرهنگ" : "Culture Admin"}
            </a>

            <a
              href={`/${locale}/articles`}
              className="inline-block rounded-2xl bg-white px-6 py-3 text-center text-sm font-semibold text-gray-900 transition hover:opacity-90"
            >
              {t.ctaButton}
            </a>
          </div>
        </div>

        <CultureEventsSection locale={locale} />

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            {isFa ? "مطالب فرهنگی " : "Cultural Articles from"}
          </h2>

          {cultures.length === 0 ? (
            <p className="mt-4 leading-8 text-gray-600">
              {isFa
                ? "هنوز مطلب فرهنگی منتشر شده ای در استرپی دیده نمی شود."
                : "No published cultural content from Strapi is visible yet."}
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {cultures.map((item) => {
                const publishedDate =
                  (readField(item, "publishedAtCustom") as string | undefined) ??
                  (readField(item, "publishedAt") as string | undefined) ??
                  "";
                const title =
                  (readField(item, "title") as string | undefined) ??
                  (isFa ? "بدون عنوان" : "Untitled");
                const excerpt =
                  (readField(item, "excerpt") as string | undefined) ??
                  (isFa
                    ? "برای این مطلب خلاصه ای ثبت نشده است."
                    : "No excerpt is available for this item.");
                const category =
                  (readField(item, "category") as string | undefined) ??
                  (isFa ? "فرهنگ" : "Culture");
                const imageUrl = toAbsoluteUrl(extractMediaUrl(readField(item, "cover")));

                return (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6"
                  >
                    {imageUrl ? (
                      <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                        <img src={imageUrl} alt={title} className="h-52 w-full object-cover" />
                      </div>
                    ) : null}

                    <div className="mb-2 flex items-center justify-between gap-3 text-sm text-gray-500">
                      <span className="rounded-full bg-white px-3 py-1">
                        {category}
                      </span>
                      <span>{publishedDate ? new Date(publishedDate).toLocaleDateString() : ""}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                      {title}
                    </h3>

                    <p className="mt-3 leading-7 text-gray-700">{excerpt}</p>
                  </article>
                );
              })}
            </div>
          )}
        </div>

      </section>
    </main>
  );
}

