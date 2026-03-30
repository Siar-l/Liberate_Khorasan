import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HomeArticlesSection from "@/components/HomeArticlesSection";
export default function Home() {
  return (
    <div>
      <Hero locale="fa" />
      <HomeArticlesSection locale="fa" />
      <Footer />
    </div>
  );
}