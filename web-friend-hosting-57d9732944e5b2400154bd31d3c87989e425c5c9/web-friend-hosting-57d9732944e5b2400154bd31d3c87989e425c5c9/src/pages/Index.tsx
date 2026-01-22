import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import UpcomingEvents from "@/components/UpcomingEvents";
import CategoryGrid from "@/components/CategoryGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturedEvents />
        <UpcomingEvents />
        <CategoryGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
