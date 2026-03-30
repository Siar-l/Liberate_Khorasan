import Link from "next/link";

type AnnouncementCardProps = {
  locale: "fa" | "en";
  announcement: {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    type: string;
  };
};

export default function AnnouncementCard({
  locale,
  announcement,
}: AnnouncementCardProps) {
  const isFa = locale === "fa";

  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-gray-500">
        <span className="rounded-full bg-gray-100 px-3 py-1">
          {announcement.type}
        </span>
        <span>{announcement.date}</span>
      </div>

      <h3 className="text-xl font-bold leading-8 text-gray-900">
        {announcement.title}
      </h3>

      <p className="mt-3 line-clamp-3 leading-7 text-gray-600">
        {announcement.excerpt}
      </p>

      <Link
        href={`/${locale}/announcements/${announcement.slug}`}
        className="mt-5 inline-block rounded-2xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        {isFa ? "مشاهده جزئیات" : "View Details"}
      </Link>
    </article>
  );
}