"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;
      const passedThreshold = currentY > 80;

      if (scrollingDown && passedThreshold) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const locale: "fa" | "en" = pathname?.startsWith("/en/") || pathname === "/en" ? "en" : "fa";
  const isFa = locale === "fa";

  const labels = isFa
    ? {
        brand: "رهایی خراسان",
        language: "Language/زبان",
        fa: "Persian/پارسی",
        en: "English/انگلیسی",
        home: "خانه",
        about: "درباره ما",
        announcements: "اطلاعیه ها",
        articles: "مقاله ها",
        contact: "تماس با ما",
        cultural: "فرهنگی",
      }
    : {
        brand: "Liberate Khurasan",
        language: "Language",
        fa: "Persian/پارسی",
        en: "English",
        home: "Home",
        about: "About",
        announcements: "Announcements",
        articles: "Articles",
        contact: "Contact",
        cultural: "Culture",
      };

  const getLanguageHref = (targetLocale: "fa" | "en") => {
    if (!pathname || pathname === "/") return `/${targetLocale}`;

    // Swap locale when path already has /fa or /en.
    if (/^\/(fa|en)(?:\/|$)/.test(pathname)) {
      return pathname.replace(/^\/(fa|en)(?=\/|$)/, `/${targetLocale}`);
    }

    // Add locale prefix for non-localized routes like /about.
    return `/${targetLocale}${pathname}`;
  };

  const languageOrderClass = isFa ? "md:order-1" : "md:order-2";
  const menuOrderClass = isFa ? "md:order-2" : "md:order-1";
  const menuDirectionClass = isFa ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <nav
      className={`sticky top-0 z-50 bg-braun-800 p-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mb-4 flex justify-center text-center text-red-500 text-base font-bold sm:text-lg md:text-xl">
        <div className="text-red font-bold calibri break-words">{labels.brand}</div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div className={`group relative text-red text-sm ${languageOrderClass}`}>
            <button type="button" className="cursor-pointer">{labels.language}</button>
            <div className="absolute left-0 top-full hidden w-32 pt-1 group-hover:block group-focus-within:block">
              <div className="rounded-md bg-white p-2 shadow-lg">
                <Link
                  href={getLanguageHref("fa")}
                  className="block rounded px-2 py-1 text-sm text-gray-800 hover:bg-gray-100"
                >
                  {labels.fa}
                </Link>
                <Link
                  href={getLanguageHref("en")}
                  className="block rounded px-2 py-1 text-sm text-gray-800 hover:bg-gray-100"
                >
                  {labels.en}
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2 ${menuOrderClass} ${menuDirectionClass}`}>
            <Link href="/" className="text-brown hover:text-gray-300">{labels.home}</Link>
            <Link href={`/${locale}/about`} className="text-brown hover:text-gray-300">{labels.about}</Link>
            <Link href={`/${locale}/announcements`} className="text-brown hover:text-gray-300">{labels.announcements}</Link>
            <Link href={`/${locale}/articles`} className="text-brown hover:text-gray-300">{labels.articles}</Link>
            <Link href={`/${locale}/contact`} className="text-brown hover:text-gray-300">{labels.contact}</Link>
            <Link href={`/${locale}/culture`} className="text-brown hover:text-gray-300">{labels.cultural}</Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brown text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2 pb-4">
            <Link href="/" className="block text-brown hover:text-gray-300 py-2">{labels.home}</Link>
            <Link href={`/${locale}/about`} className="block text-brown hover:text-gray-300 py-2">{labels.about}</Link>
            <Link href={`/${locale}/announcements`} className="block text-brown hover:text-gray-300 py-2">{labels.announcements}</Link>
            <Link href={`/${locale}/articles`} className="block text-brown hover:text-gray-300 py-2">{labels.articles}</Link>
            <Link href={`/${locale}/contact`} className="block text-brown hover:text-gray-300 py-2">{labels.contact}</Link>
            <Link href={`/${locale}/culture`} className="block text-brown hover:text-gray-300 py-2">{labels.cultural}</Link>
          </div>
        )}
      </div>
    </nav>
  );
}