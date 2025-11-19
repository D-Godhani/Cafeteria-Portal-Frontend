// src/components/home/InfoSection.tsx

"use client"; // Required for using new Date() on the client

import React from "react";
import { Clock, Megaphone, Phone, Mail, SquareMenu } from "lucide-react";

const InfoSection: React.FC = () => {
  // --- Dynamic Time Logic ---
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isActive = (start: number, end: number) => {
    return currentHour >= start && currentHour < end;
  };
  // -------------------------

  return (
    <section className="pt-12 pb-16 bg-base-100">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (Left Side) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Operating Hours Card */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                <Clock className="text-primary" />
                Operating Hours
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="table">
                  <tbody>
                    {/* Dynamic rows that highlight the current service */}
                    <tr
                      className={
                        isActive(7.5, 10)
                          ? "bg-primary/10 text-primary-focus"
                          : ""
                      }
                    >
                      <th className="font-semibold">Breakfast:</th>
                      <td>7:30 AM - 10:00 AM</td>
                    </tr>
                    <tr
                      className={
                        isActive(12, 14.5)
                          ? "bg-primary/10 text-primary-focus"
                          : ""
                      }
                    >
                      <th className="font-semibold">Lunch:</th>
                      <td>12:00 PM - 2:30 PM</td>
                    </tr>
                    <tr
                      className={
                        isActive(16, 18)
                          ? "bg-primary/10 text-primary-focus"
                          : ""
                      }
                    >
                      <th className="font-semibold">Snacks:</th>
                      <td>4:00 PM - 6:00 PM</td>
                    </tr>
                    <tr
                      className={
                        isActive(19.5, 21.5)
                          ? "bg-primary/10 text-primary-focus"
                          : ""
                      }
                    >
                      <th className="font-semibold">Dinner:</th>
                      <td>7:30 PM - 9:30 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Right Side) (No changes needed here) */}
        <div className="lg:col-span-1">
          <div className="card bg-white shadow-lg sticky top-24">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                <Megaphone className="text-primary" />
                Announcements
              </h2>
              <div className="space-y-4 mt-4">
                <div role="alert" className="alert bg-blue-100 text-blue-800">
                  <span>
                    Special sweet served on all Thalis **today** (Wednesday)!
                  </span>
                </div>
                <div
                  role="alert"
                  className="alert bg-orange-100 text-orange-800"
                >
                  <span>
                    The north-side water cooler is temporarily out of service.
                  </span>
                </div>
                <div role="alert" className="alert bg-green-100 text-green-800">
                  <span>Menu for **tomorrow** (Diwali) is now available.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card bg-white shadow-lg sticky top-24">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                <SquareMenu className="text-primary" />
                Menu
              </h2>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
