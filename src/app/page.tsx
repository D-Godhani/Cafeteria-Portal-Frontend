// src/app/page.tsx

import InfoSection from "@/components/home/InfoSection"; // The ONLY content component needed now
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/home/Footer";

const Home: React.FC = () => {
  return (
    // Use the primary theme background color
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-grow">
        {/* - Removed HeroSection and MenuSection.
          - InfoSection is now the primary and only content on the homepage.
        */}
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
