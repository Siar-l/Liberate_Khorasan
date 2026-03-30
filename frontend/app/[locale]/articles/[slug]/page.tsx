import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

type ArticleDetailPageProps = {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { locale, slug } = await params;

  const article = articles.find((item) => item.slug === slug && item.locale === locale);

  if (!article) {
    notFound();
  }

  const isFa = article.locale === "fa";

  return (
    <main
      className="mx-auto max-w-4xl px-6 py-16 md:px-10"
      dir={isFa ? "rtl" : "ltr"}
    >
      <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
        <div className="mb-4 flex items-center justify-between gap-3 text-sm text-gray-500">
          <span className="rounded-full bg-gray-100 px-3 py-1">{article.category}</span>
          <span>{article.date}</span>
        </div>

        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
          {article.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">{article.excerpt}</p>
      </article>
    </main>
  );
}
