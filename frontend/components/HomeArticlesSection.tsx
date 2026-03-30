import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "../lib/articles";

type HomeArticlesSectionProps = {
  locale: "fa" | "en";
};

export default function HomeArticlesSection({
  locale,
}: HomeArticlesSectionProps) {
  const isFa = locale === "fa";

  const filteredArticles = articles
    .filter((article) => article.locale === locale)
    .slice(0, 3);

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
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} locale={locale} article={article} />
        ))}
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