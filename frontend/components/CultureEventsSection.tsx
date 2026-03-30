"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CULTURAL_EVENTS_STORAGE_KEY,
  parseEvents,
  type CulturalEvent,
  type Locale,
} from "@/lib/cultural-events";

type CultureEventsSectionProps = {
  locale: Locale;
};

const labels = {
  fa: {
    title: "رویدادهای فرهنگی",
    empty: "هنوز رویدادی ثبت نشده است.",
    location: "مکان",
  },
  en: {
    title: "Cultural Events",
    empty: "No events have been posted yet.",
    location: "Location",
  },
};

const dateFormatter = (locale: Locale, value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    dateStyle: "medium",
  }).format(date);
};

export default function CultureEventsSection({ locale }: CultureEventsSectionProps) {
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const t = labels[locale];

  useEffect(() => {
    const load = () => {
      const data = parseEvents(localStorage.getItem(CULTURAL_EVENTS_STORAGE_KEY));
      setEvents(data);
    };

    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const localizedEvents = useMemo(
    () => events.filter((eventItem) => eventItem.locale === locale),
    [events, locale]
  );

  return (
    <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold">{t.title}</h2>

      {localizedEvents.length === 0 ? (
        <p className="mt-4 leading-8 text-gray-600">{t.empty}</p>
      ) : (
        <div className="mt-6 grid gap-6">
          {localizedEvents.map((eventItem) => (
            <article
              key={eventItem.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">{eventItem.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{dateFormatter(locale, eventItem.date)}</p>
              <p className="mt-2 text-sm text-gray-600">
                {t.location}: {eventItem.location}
              </p>
              <p className="mt-4 leading-7 text-gray-700">{eventItem.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
