export type Announcement = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  type: string;
  locale: "fa" | "en";
};

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "اطلاعیه نشر مقاله جدید",
    excerpt:
      "مقاله جدیدی در بخش مطالب منتشر شده است. برای مطالعه جزئیات بیشتر به بخش مقاله‌ها مراجعه کنید.",
    slug: "new-article-announcement",
    date: "2026-03-29",
    type: "اطلاعیه",
    locale: "fa",
  },
  {
    id: 2,
    title: "اطلاعیه به‌روزرسانی وبسایت",
    excerpt:
      "بخش‌های تازه‌ای به وبسایت اضافه شده‌اند و تجربه کاربری بهبود یافته است.",
    slug: "website-update-announcement",
    date: "2026-03-28",
    type: "خبر",
    locale: "fa",
  },
  {
    id: 3,
    title: "New Article Announcement",
    excerpt:
      "A new article has been published in the articles section. Visit the section for more details.",
    slug: "new-article-announcement-en",
    date: "2026-03-29",
    type: "Announcement",
    locale: "en",
  },
  {
    id: 4,
    title: "Website Update Notice",
    excerpt:
      "New sections have been added to the website and the user experience has been improved.",
    slug: "website-update-notice",
    date: "2026-03-28",
    type: "Update",
    locale: "en",
  },
];