export type Article = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
  category: string;
  locale: "fa" | "en";
};

export const articles: Article[] = [
  {
    id: 1,
    title: "آگاهی، آزادی و مسئولیت اجتماعی",
    excerpt:
      "این مقاله به نقش آگاهی عمومی، آزادی اندیشه و مسئولیت اجتماعی در ساختن آینده ای بهتر می پردازد.",
    image: "/images/article-1.jpg",
    slug: "awareness-freedom-social-responsibility",
    date: "2026-03-29",
    category: "مقاله",
    locale: "fa",
  },
  {
    id: 2,
    title: "نقش رسانه در گسترش آگاهی عمومی",
    excerpt:
      "رسانه می تواند بستری برای روشنگری، دسترسی به اطلاعات و تقویت همبستگی اجتماعی باشد.",
    image: "/images/article-2.jpg",
    slug: "media-and-public-awareness",
    date: "2026-03-28",
    category: "تحلیل",
    locale: "fa",
  },
  {
    id: 3,
    title: "Awareness, Freedom, and Social Responsibility",
    excerpt:
      "This article explores the role of public awareness, freedom of thought, and social responsibility in shaping a better future.",
    image: "/images/article-1.jpg",
    slug: "awareness-freedom-social-responsibility-en",
    date: "2026-03-29",
    category: "Article",
    locale: "en",
  },
  {
    id: 4,
    title: "The Role of Media in Public Awareness",
    excerpt:
      "Media can serve as a platform for enlightenment, access to information, and stronger social solidarity.",
    image: "/images/article-2.jpg",
    slug: "role-of-media-in-public-awareness",
    date: "2026-03-28",
    category: "Analysis",
    locale: "en",
  },
];
