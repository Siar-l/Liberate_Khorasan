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
    image?: string;
  };
};

export default function AnnouncementCard({
  locale,
  announcement,
}: AnnouncementCardProps) {
  const isFa = locale === "fa";

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {announcement.image ? (
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="p-6">
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
        {isFa ? "ادامه مطلب " : "View Details"}
      </Link>
      </div>
    </article>
  );
}