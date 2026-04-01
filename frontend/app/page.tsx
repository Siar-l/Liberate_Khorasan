import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HomeArticlesSection from "@/components/HomeArticlesSection";
import HomeAnnouncementsSection from "@/components/HomeAnnouncementsSection";
export default function Home() {
  return (
    <div>
      <Hero locale="fa" />
      <HomeArticlesSection locale="fa" />
      <HomeAnnouncementsSection locale="fa" />
      <Footer />
    </div>
  );
}