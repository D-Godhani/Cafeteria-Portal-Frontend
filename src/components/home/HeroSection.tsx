// src/components/home/HeroSection.tsx

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="hero min-h-[60vh]">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">
            DAIICT Cafeteria
          </h1>
          <p className="mb-5">
            Fresh, Delicious, and Healthy Meals Served Daily. Explore today's
            specials and enjoy a taste of quality.
          </p>
          <a href="#menu" className="btn btn-primary">
            View Today's Menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
