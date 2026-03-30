import Link from "next/link";

type ArticleCardProps = {
    locale: "fa" | "en";
    article: {
        id: number;
        title: string;
        excerpt: string;
        image: string;
        slug: string;
        date: string;
        category: string;
    };
};
    
export default function ArticleCard({
    locale,
    article,
}: ArticleCardProps) {
  const isFa = locale === "fa";

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-3 text-sm text-gray-500">
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {article.category}
          </span>
          <span>{article.date}</span>
        </div>

        <h3 className="text-xl font-bold leading-8 text-gray-900">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 leading-7 text-gray-600">
          {article.excerpt}
        </p>

        <Link
          href={`/${locale}/articles/${article.slug}`}
          className="mt-5 inline-block rounded-2xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          {isFa ? "ادامه مطلب" : "Read More"}
        </Link>
      </div>
    </article>
  );
}