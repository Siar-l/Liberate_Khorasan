import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/articles";

type ArticlesPageProps = {
  params: Promise<{ locale: "fa" | "en" }>;
};

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params;
  const isFa = locale === "fa";

  return (
    <main
      className="mx-auto max-w-6xl px-6 py-16 md:px-10"
      dir={isFa ? "rtl" : "ltr"}
    >
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {isFa ? "مقاله ها" : "Articles"}
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          {isFa
            ? "تازه ترین مقاله ها و تحلیل ها را در این بخش دنبال کنید."
            : "Follow the latest articles and analysis in this section."}
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {articles
          .filter((article) => article.locale === locale)
          .map((article) => (
            <ArticleCard key={article.id} locale={locale} article={article} />
          ))}
      </section>
    </main>
  );
}
