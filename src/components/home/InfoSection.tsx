// src/components/home/InfoSection.tsx

import React from "react";
import { Clock, Megaphone } from "lucide-react";

const InfoSection: React.FC = () => {
  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto px-6 flex flex-cols-1 md:flex-cols-2 gap-8">
        {/* Announcements */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <Megaphone className="text-primary" /> Announcements
            </h2>
            <div role="alert" className="alert alert-info mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                Special sweet served on all Thalis every Wednesday at Padma
                Kamal Caterers!
              </span>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <Clock className="text-primary" /> Operating Hours
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <b>Breakfast:</b> 7:30 AM - 10:00 AM
              </li>
              <li>
                <b>Lunch:</b> 12:00 PM - 2:30 PM
              </li>
              <li>
                <b>Snacks:</b> 4:00 PM - 6:00 PM
              </li>
              <li>
                <b>Dinner:</b> 7:30 PM - 9:30 PM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
