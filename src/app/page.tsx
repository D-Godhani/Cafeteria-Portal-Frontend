// /src/app/page.tsx

import InfoSection from "@/components/home/InfoSection";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/home/Footer";
// 1. Import your new CanteenSection
import CanteenSection from "@/components/home/CanteenSection";

const Home: React.FC = () => {
  return (
    // Use the primary theme background color
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-grow">
        {/* 2. Replace MenuSection with CanteenSection */}
        <CanteenSection />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
