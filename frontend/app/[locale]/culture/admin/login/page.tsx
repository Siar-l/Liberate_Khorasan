"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type LoginPageProps = {
  params: {
    locale: string;
  };
};

const labels = {
  fa: {
    title: "ورود مدیریت فرهنگ",
    subtitle: "فقط افراد مجاز می توانند رویداد ثبت کنند.",
    password: "رمز عبور",
    submit: "ورود",
    error: "رمز عبور اشتباه است.",
  },
  en: {
    title: "Culture Admin Login",
    subtitle: "Only authorized users can post cultural events.",
    password: "Password",
    submit: "Sign in",
    error: "Wrong password.",
  },
};

export default function CultureAdminLoginPage({ params }: LoginPageProps) {
  const locale = params.locale === "fa" ? "fa" : "en";
  const isFa = locale === "fa";
  const t = labels[locale];
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/culture-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError(t.error);
        setIsLoading(false);
        return;
      }

      router.push(`/${locale}/culture/admin`);
      router.refresh();
    } catch {
      setError(t.error);
      setIsLoading(false);
    }
  };

  return (
    <main dir={isFa ? "rtl" : "ltr"} className="min-h-screen bg-gray-100 px-5 py-10 sm:px-8">
      <section className="mx-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
        <p className="mt-2 text-gray-600">{t.subtitle}</p>

        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">{t.password}</span>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-fit rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t.submit}
          </button>
        </form>
      </section>
    </main>
  );
}
