import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServicesCards } from "@/components/ServicesCards";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesCards />
      <AboutSection />
    </div>
  );
};

export default Index;
