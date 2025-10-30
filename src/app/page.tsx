// src/app/page.tsx

import InfoSection from "@/components/home/InfoSection"; // The ONLY content component needed now
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/home/Footer";
import MenuSection from "@/components/home/MenuSection";

const Home: React.FC = () => {
  return (
    // Use the primary theme background color
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-grow">
        <InfoSection />
        <MenuSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
