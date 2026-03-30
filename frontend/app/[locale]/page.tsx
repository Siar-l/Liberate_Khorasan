import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HomeArticlesSection from "@/components/HomeArticlesSection";

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Hero locale={locale} />
      <HomeArticlesSection locale={locale} />
      <Footer />
    </div>
  );
}
