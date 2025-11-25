"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, History, Clock, CheckCircle, Store } from "lucide-react";
import { getMyComplaints, Complaint } from "@/services/complaintService";

export default function ComplaintHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const canteenId = params.id as string;

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Assuming this API returns ALL user complaints
        const data = await getMyComplaints();

        // Sort: Newest first
        // Optional: Filter by canteenId if you ONLY want to see history for this specific canteen
        // const filtered = data.filter(c => c.canteenId.toString() === canteenId);

        setComplaints(data.reverse());
      } catch (error) {
        console.error("Failed to fetch history", error);
        // Mock data for UI testing
        setComplaints([
          {
            complainId: 1,
            canteenId: Number(canteenId),
            title: "Cold Coffee",
            description: "Served cold.",
            complaintStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            complainId: 2,
            canteenId: 99,
            title: "Long wait",
            description: "Took 45 mins.",
            complaintStatus: "RESOLVED",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [canteenId]);

  return (
    <div className="min-h-screen bg-base-200/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="btn btn-circle btn-ghost hover:bg-base-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <History className="w-8 h-8 text-primary" />
              Complaint History
            </h1>
            <p className="text-base-content/70">
              Track the status of your reported issues.
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-xl border border-base-200 shadow-sm">
            <History className="w-16 h-16 mx-auto text-base-content/20 mb-4" />
            <h3 className="text-lg font-semibold opacity-60">
              No complaints record found
            </h3>
            <p className="text-base-content/50">
              You haven't filed any complaints yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.complainId}
                className={`card bg-base-100 shadow-md border transition-all hover:shadow-lg ${
                  // Highlight if it belongs to current canteen context
                  complaint.canteenId.toString() === canteenId
                    ? "border-l-4 border-l-primary border-y-base-200 border-r-base-200"
                    : "border-base-200 opacity-90"
                }`}
              >
                <div className="card-body p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-ghost font-mono text-xs">
                          #{complaint.complainId}
                        </span>
                        {/* Canteen Name/ID */}
                        <span className="flex items-center text-xs font-bold text-base-content/60 bg-base-200 px-2 py-1 rounded">
                          <Store className="w-3 h-3 mr-1" />
                          Canteen {complaint.canteenName || complaint.canteenId}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-base-content">
                        {complaint.title}
                      </h3>
                      <p className="text-base-content/70 mt-1 text-sm leading-relaxed">
                        {complaint.description}
                      </p>
                    </div>

                    {/* Status & Date */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 min-w-[140px]">
                      {complaint.complaintStatus === "RESOLVED" ? (
                        <div className="badge badge-success gap-1 text-white py-3">
                          <CheckCircle className="w-3.5 h-3.5" /> Resolved
                        </div>
                      ) : (
                        <div className="badge badge-warning gap-1 py-3">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </div>
                      )}

                      <span className="text-xs text-base-content/50 mt-1">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
