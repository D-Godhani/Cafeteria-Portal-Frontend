"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Megaphone,
  Send,
  Bell,
  Calendar,
  Type,
  AlignLeft,
  Radio,
} from "lucide-react";
import {
  createAnnouncement,
  getActiveAnnouncements,
  Announcement,
} from "@/services/adminService";

export default function AdminAnnouncementsPage() {
  const router = useRouter();

  // State
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Fetch Data
  const fetchData = async () => {
    try {
      const data = await getActiveAnnouncements();
      setAnnouncements(data.reverse());
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      await createAnnouncement(title, message);
      alert("Announcement posted successfully!");
      setTitle("");
      setMessage("");
      fetchData();
    } catch (error) {
      alert("Failed to post announcement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* --- Header --- */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="btn btn-circle btn-ghost"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-orange-500" />
            Announcements
          </h1>
          <p className="text-base-content/70">
            Broadcast updates to all students.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COL: CREATE FORM (Redesigned) --- */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-8">
            {/* Card Header */}
            <div className="bg-base-200/50 px-6 py-4 border-b border-base-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Compose</h2>
                  <p className="text-xs text-base-content/60">
                    Visible to everyone instantly
                  </p>
                </div>
              </div>
            </div>

            <div className="card-body p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Title Input Group */}
                <div className="form-control">
                  <label className="label pt-0 pb-2">
                    <span className="label-text font-semibold">Headline</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Type className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Diwali Holiday Closure"
                      className="input input-bordered w-full pl-10 focus:input-warning transition-all"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Message Input Group */}
                <div className="form-control">
                  <label className="label pt-0 pb-2">
                    <span className="label-text font-semibold">
                      Message Body
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <AlignLeft className="h-5 w-5 text-base-content/40" />
                    </div>
                    <textarea
                      className="textarea textarea-bordered w-full h-40 pl-10 pt-3 focus:textarea-warning transition-all leading-relaxed resize-none"
                      placeholder="Enter the full announcement details here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-base-content/50">
                      Supports basic text formatting
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none w-full shadow-md mt-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Broadcast Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- RIGHT COL: LIVE FEED --- */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6 px-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Bell className="w-5 h-5" /> Active Feed
            </h2>
            <button
              onClick={fetchData}
              className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content"
            >
              <div
                className={`w-2 h-2 rounded-full bg-green-500 ${
                  loading ? "animate-pulse" : ""
                }`}
              ></div>
              Refresh Feed
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <span className="loading loading-spinner loading-lg text-orange-500"></span>
              <p className="text-base-content/50">Syncing announcements...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.length === 0 ? (
                <div className="text-center py-16 bg-base-200/30 rounded-2xl border-2 border-dashed border-base-300">
                  <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Megaphone className="w-8 h-8 text-base-content/30" />
                  </div>
                  <h3 className="text-lg font-semibold opacity-70">
                    Quiet for now
                  </h3>
                  <p className="text-base-content/50">
                    No active announcements found.
                  </p>
                </div>
              ) : (
                announcements.map((ann, index) => (
                  <div
                    key={index}
                    className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="card-body p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
                        <div className="flex-1 space-y-2">
                          <h3 className="font-bold text-lg text-base-content group-hover:text-orange-600 transition-colors">
                            {ann.title}
                          </h3>
                          <p className="text-base-content/70 text-sm leading-relaxed whitespace-pre-wrap">
                            {ann.message}
                          </p>
                        </div>

                        {ann.createdAt && (
                          <div className="flex items-center gap-2 text-xs font-medium text-base-content/40 bg-base-200/50 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(ann.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
