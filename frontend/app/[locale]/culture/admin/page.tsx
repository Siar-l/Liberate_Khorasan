"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CULTURAL_EVENTS_STORAGE_KEY,
  parseEvents,
  type CulturalEvent,
  type Locale,
} from "@/lib/cultural-events";

type CultureAdminPageProps = {
  params: {
    locale: string;
  };
};

type FormState = {
  title: string;
  date: string;
  location: string;
  description: string;
};

const labels = {
  fa: {
    pageTitle: "مدیریت رویدادهای فرهنگی",
    subtitle: "رویداد جدید ثبت کنید تا در صفحه فرهنگ نمایش داده شود.",
    logout: "خروج",
    title: "عنوان رویداد",
    date: "تاریخ",
    location: "مکان",
    description: "توضیحات",
    submit: "ثبت رویداد",
    posted: "رویدادهای ثبت‌شده",
    empty: "هنوز رویدادی ثبت نشده است.",
  },
  en: {
    pageTitle: "Cultural Events Admin",
    subtitle: "Post a new event and it will appear on the culture page.",
    logout: "Logout",
    title: "Event title",
    date: "Date",
    location: "Location",
    description: "Description",
    submit: "Post event",
    posted: "Posted events",
    empty: "No events posted yet.",
  },
};

const initialForm: FormState = {
  title: "",
  date: "",
  location: "",
  description: "",
};

export default function CultureAdminPage({ params }: CultureAdminPageProps) {
  const locale: Locale = params.locale === "fa" ? "fa" : "en";
  const isFa = locale === "fa";
  const t = labels[locale];
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [events, setEvents] = useState<CulturalEvent[]>([]);

  const onLogout = async () => {
    await fetch("/api/culture-auth/logout", { method: "POST" });
    router.push(`/${locale}/culture/admin/login`);
    router.refresh();
  };

  useEffect(() => {
    setEvents(parseEvents(localStorage.getItem(CULTURAL_EVENTS_STORAGE_KEY)));
  }, []);

  const localizedEvents = useMemo(
    () => events.filter((eventItem) => eventItem.locale === locale),
    [events, locale]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEvent: CulturalEvent = {
      id: crypto.randomUUID(),
      locale,
      title: form.title.trim(),
      date: form.date,
      location: form.location.trim(),
      description: form.description.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextEvents = [newEvent, ...events];
    setEvents(nextEvents);
    localStorage.setItem(CULTURAL_EVENTS_STORAGE_KEY, JSON.stringify(nextEvents));
    setForm(initialForm);
  };

  return (
    <main dir={isFa ? "rtl" : "ltr"} className="min-h-screen bg-gray-100 px-5 py-10 sm:px-8">
      <section className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{t.pageTitle}</h1>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {t.logout}
          </button>
        </div>
        <p className="mt-2 text-gray-600">{t.subtitle}</p>

        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">{t.title}</span>
            <input
              value={form.title}
              required
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">{t.date}</span>
            <input
              type="date"
              value={form.date}
              required
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">{t.location}</span>
            <input
              value={form.location}
              required
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">{t.description}</span>
            <textarea
              value={form.description}
              required
              rows={5}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-fit rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {t.submit}
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">{t.posted}</h2>

          {localizedEvents.length === 0 ? (
            <p className="mt-3 text-gray-600">{t.empty}</p>
          ) : (
            <div className="mt-4 grid gap-4">
              {localizedEvents.map((eventItem) => (
                <article key={eventItem.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">{eventItem.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{eventItem.date}</p>
                  <p className="mt-1 text-sm text-gray-600">{eventItem.location}</p>
                  <p className="mt-3 text-gray-700">{eventItem.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
