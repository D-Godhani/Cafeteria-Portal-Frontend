// src/components/home/InfoSection.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Clock, Megaphone, SquareMenu, Calendar, Loader2 } from "lucide-react";
// Import the service and type we defined earlier
import { getActiveAnnouncements, Announcement } from "@/services/adminService";

const InfoSection: React.FC = () => {
  // --- Dynamic Time Logic ---
  const [currentHour, setCurrentHour] = useState(0);

  useEffect(() => {
    // Set time on mount to avoid hydration mismatch
    const now = new Date();
    setCurrentHour(now.getHours() + now.getMinutes() / 60);
  }, []);

  const isActive = (start: number, end: number) => {
    return currentHour >= start && currentHour < end;
  };
  // -------------------------

  // --- Fetch Announcements Logic ---
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActiveAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to load announcements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="pt-12 pb-16 bg-base-100">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (Left Side) - Menu */}
        <div className="lg:col-span-1">
          <div className="card bg-white shadow-lg sticky top-24 border border-base-200">
            <div className="card-body">
              <h2 className="card-title text-2xl flex gap-2">
                <SquareMenu className="text-primary" />
                Menu
              </h2>
              <p className="text-gray-500 mt-2">
                View today's special items and full menu details.
              </p>
              {/* You can link this to a full menu page later */}
              <button className="btn btn-outline rounded-lg size-fit p-2 self-center font-bold btn-primary mt-4 btn-sm">
                View Full Menu
              </button>
            </div>
          </div>
        </div>

        {/* Operating Hours (Center) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="card bg-white shadow-lg border border-base-200">
            <div className="card-body">
              <h2 className="card-title text-2xl flex gap-2">
                <Clock className="text-primary" />
                Operating Hours
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="table">
                  <tbody>
                    <tr
                      className={
                        isActive(7.5, 10)
                          ? "bg-primary/10 text-primary-focus font-medium"
                          : ""
                      }
                    >
                      <th className="font-semibold">Breakfast:</th>
                      <td>7:30 AM - 10:00 AM</td>
                    </tr>
                    <tr
                      className={
                        isActive(12, 14.5)
                          ? "bg-primary/10 text-primary-focus font-medium"
                          : ""
                      }
                    >
                      <th className="font-semibold">Lunch:</th>
                      <td>12:00 PM - 2:30 PM</td>
                    </tr>
                    <tr
                      className={
                        isActive(16, 18)
                          ? "bg-primary/10 text-primary-focus font-medium"
                          : ""
                      }
                    >
                      <th className="font-semibold">Snacks:</th>
                      <td>4:00 PM - 6:00 PM</td>
                    </tr>
                    <tr
                      className={
                        isActive(19.5, 21.5)
                          ? "bg-primary/10 text-primary-focus font-medium"
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

        {/* Sidebar (Right Side) - Dynamic Announcements */}
        <div className="lg:col-span-1">
          <div className="card bg-white shadow-lg sticky top-24 border border-base-200">
            <div className="card-body">
              <h2 className="card-title text-2xl flex gap-2">
                <Megaphone className="text-primary" />
                Announcements
              </h2>

              <div className="space-y-4 mt-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No active announcements.</p>
                  </div>
                ) : (
                  announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-4 rounded-xl bg-base-300 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-black text-sm md:text-black">
                          {ann.title}
                        </h3>
                        {ann.createdAt && (
                          <span className="text-[10px] uppercase font-bold text-gray-800 flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                            <Calendar size={10} />
                            {formatDate(ann.createdAt)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-950 leading-relaxed whitespace-pre-wrap">
                        {ann.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
