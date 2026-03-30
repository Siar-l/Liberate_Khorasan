import CultureEventsSection from "@/components/CultureEventsSection";

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

export default async function CulturePage({ params }: CulturePageProps) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === "fa" ? "fa" : "en";
  const isFa = locale === "fa";
  const t = content[locale];

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

      </section>
    </main>
  );
}

