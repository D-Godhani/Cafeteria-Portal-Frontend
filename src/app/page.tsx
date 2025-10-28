// src/app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import MenuSection from "@/components/home/MenuSection";
import InfoSection from "@/components/home/InfoSection";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/home/Footer";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <MenuSection />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
