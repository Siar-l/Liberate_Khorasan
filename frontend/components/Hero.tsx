import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

type Locale = "fa" | "en";

type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
};

const content: Record<Locale, HeroContent> = {
  fa: {
    title: "نهضت آزادی بخش دموکراتیک خراسان",
    subtitle: "صدایی برای آزادی٬ عدالت و کرامت انسانی",
    description: "ما در رهایی خراسان به دنبال ایجاد یک جامعه آزاد، عادلانه و با کرامت انسانی هستیم. ما به حقوق بشر، آزادی بیان و عدالت اجتماعی اعتقاد داریم و تلاش می‌کنیم تا صدای کسانی باشیم که در این مسیر مبارزه می‌کنند.",
  },
  en: {
    title: "Khorasan Liberation and Democratic Movement",
    subtitle: "A voice for freedom, justice, and human dignity",
    description: "In Liberate Khurasan, we seek to create a free, just society with human dignity. We believe in human rights, freedom of speech, and social justice. We strive to be the voice of those fighting for this path.",
  },
};

export default function Hero({ locale = "fa" }: { locale?: Locale }) {
  const texts = content[locale] ?? content.fa;
  const isRtl = locale === "fa";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="flex min-h-[72svh] md:min-h-screen items-center justify-center bg-gray-100 px-5 py-14 sm:px-8 md:py-0"
    >
      <div className="w-full max-w-4xl text-center">
        <h1 className={`mb-4 text-[clamp(1.7rem,7vw,3.2rem)] leading-tight font-extrabold text-gray-900 sm:mb-5 ${vazirmatn.className}`}>
          {texts.title}
        </h1>
        <p className="font-shabnam mx-auto mb-5 max-w-2xl text-[clamp(1rem,4.3vw,1.45rem)] leading-relaxed text-gray-700 sm:mb-6">
          {texts.subtitle}
        </p>
        <p className="font-shabnam mx-auto max-w-3xl text-[clamp(0.95rem,3.7vw,1.2rem)] leading-8 text-gray-700">
          {texts.description}
        </p>
      </div>
    </section>
  );
}