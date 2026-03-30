import Link from "next/link";
import AnnouncementCard from "@/components/AnnouncementCard";
import { announcements } from "@/lib/announcement";

type HomeAnnouncementsSectionProps = {
  locale: "fa" | "en";
};

export default function HomeAnnouncementsSection({
  locale,
}: HomeAnnouncementsSectionProps) {
  const isFa = locale === "fa";

  const filteredAnnouncements = announcements
    .filter((item) => item.locale === locale)
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-gray-500">
            {isFa ? "بخش اطلاعیه‌ها" : "Announcements Section"}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {isFa ? "اطلاعیه‌ها" : "Announcements"}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-gray-600">
            {isFa
              ? "تازه‌ترین اطلاعیه‌ها، خبرها و به‌روزرسانی‌ها را در این بخش دنبال کنید."
              : "Follow the latest announcements, notices, and updates in this section."}
          </p>
        </div>

        <Link
          href={`/${locale}/announcements`}
          className="hidden rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 md:inline-block"
        >
          {isFa ? "همه اطلاعیه‌ها" : "All Announcements"}
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            locale={locale}
            announcement={announcement}
          />
        ))}
      </div>

      <div className="mt-8 md:hidden">
        <Link
          href={`/${locale}/announcements`}
          className="inline-block rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
        >
          {isFa ? "همه اطلاعیه‌ها" : "All Announcements"}
        </Link>
      </div>
    </section>
  );
}