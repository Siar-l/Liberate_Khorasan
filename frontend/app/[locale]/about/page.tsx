import { Vazirmatn, Tajawal } from "next/font/google";
const vazirmatn = Vazirmatn({ subsets: ["arabic"] });
const tajawal = Tajawal({ weight: ["400", "700"], subsets: ["arabic"] });

type Locale = "fa" | "en";

type AboutPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

type AboutCopy = {
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  missionTitle: string;
  missionContent: string;
  visionTitle: string;
  visionContent: string;
};

const content: Record<Locale, AboutCopy> = {
    fa: {
        badge: "درباره ما",
        title: "نهضت رهایی بخش خراسان",
        subtitle: "یک جنبش مردمی برای آزادی خراسان",

        intro: "نهضت رهایی بخش خراسان یک جنبش مردمی است که هدف آن آزادی و استقلال خراسان از هرگونه سلطه خارجی و داخلی است. این جنبش با تکیه بر ارزش‌های انسانی، عدالت اجتماعی، و حقوق بشر، در تلاش است تا آینده‌ای بهتر برای مردم خراسان رقم بزند.",

        missionTitle: "ماموریت ما",
        missionContent: "ماموریت ما ایجاد یک جامعه آزاد، عادلانه، و پایدار در خراسان است که در آن حقوق بشر محترم شمرده شود و همه افراد بتوانند به فرصت‌های برابر دسترسی داشته باشند.",
        visionTitle: "بینش ما",
        visionContent: "بینش ما ایجاد یک جامعه در خراسان است که در آن آزادی، عدالت، و کرامت انسانی به عنوان ارزش‌های بنیادین شناخته شود."   
    },
    en: {
        badge: "About Us",
        title: "Khorasan Liberation and Democratic Movement",
        subtitle: "A People's Movement for the Liberation of Khurasan",
        intro: "The Liberating Khurasan Movement is a people's movement with the goal of liberating Khurasan from any foreign and domestic domination. This movement, relying on human values, social justice, and human rights, seeks to create a better future for the people of Khurasan.",
        missionTitle: "Our Mission",
        missionContent: "Our mission is to create a free, just, and sustainable society in Khurasan where human rights are respected and all individuals have equal access to opportunities.",
        visionTitle: "Our Vision",
        visionContent: "Our vision is to establish a society in Khurasan where freedom, justice, and human dignity are recognized as fundamental values."   
    }
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const data = content[locale] ?? content.fa;
  const isFa = locale === "fa";
  const headingFont = isFa ? vazirmatn.className : "font-sans";
  const bodyFont = isFa ? tajawal.className : "font-sans";
  const alignClass = isFa ? "text-right" : "text-left";

    return (
      <main className="min-h-screen bg-gray-50" dir={isFa ? "rtl" : "ltr"}>
        <section className={`mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14 ${bodyFont}`}>
          <p className={`mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 ${alignClass}`}>
            {data.badge}
          </p>
          <h1 className={`${headingFont} mb-4 text-[clamp(1.9rem,5vw,3rem)] font-extrabold leading-tight text-gray-900 ${alignClass}`}>
            {data.title}
          </h1>
          <p className={`mb-8 text-[clamp(1.05rem,2.4vw,1.3rem)] text-gray-600 ${alignClass}`}>
            {data.subtitle}
          </p>

          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <p className={`mb-8 text-[clamp(1rem,2.1vw,1.12rem)] leading-8 text-gray-700 ${alignClass}`}>
              {data.intro}
            </p>

            <h2 className={`${headingFont} mb-3 text-[clamp(1.3rem,3.2vw,1.8rem)] font-bold text-gray-900 ${alignClass}`}>
              {data.missionTitle}
            </h2>
            <p className={`mb-8 text-[clamp(1rem,2.1vw,1.12rem)] leading-8 text-gray-700 ${alignClass}`}>
              {data.missionContent}
            </p>

            <h2 className={`${headingFont} mb-3 text-[clamp(1.3rem,3.2vw,1.8rem)] font-bold text-gray-900 ${alignClass}`}>
              {data.visionTitle}
            </h2>
            <p className={`text-[clamp(1rem,2.1vw,1.12rem)] leading-8 text-gray-700 ${alignClass}`}>
              {data.visionContent}
            </p>
          </div>
        </section>
      </main>
  );
}