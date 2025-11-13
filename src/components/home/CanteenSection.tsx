// /src/components/home/CanteenSection.tsx
"use client"; // This component now needs state and effects

import React, { useState, useEffect } from "react";
import { getPublicCanteens, Canteen } from "@/services/publicService"; // Import new service
import CanteenCard from "./CanteenCard"; // Import new card

const CanteenSection: React.FC = () => {
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const data = await getPublicCanteens();
        setCanteens(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCanteens();
  }, []);

  return (
    <section id="canteens" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Our <span className="text-primary">Canteens</span>
          </h2>
          <p className="text-base-content/70 mt-2">
            Explore the canteens available on campus.
          </p>
        </div>

        {/* --- Data Loading States --- */}
        {loading && (
          <div className="text-center">
            <span className="loading loading-lg loading-spinner text-primary"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error max-w-md mx-auto">
            <div>
              <span>Error: {error}</span>
            </div>
          </div>
        )}

        {/* --- Canteen Carousel --- */}
        {!loading && !error && canteens.length > 0 && (
          <div className="carousel rounded-box space-x-6 p-4 bg-neutral">
            {canteens.map((canteen) => (
              <div
                key={canteen.id}
                className="carousel-item w-full sm:w-80" // Responsive card width
              >
                <CanteenCard canteen={canteen} />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && canteens.length === 0 && (
          <div className="text-center">
            <p className="text-lg text-base-content/70">
              No canteens have been added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CanteenSection;
