// src/components/complaints/ComplaintHistory.tsx
"use client";

import React from "react";
import { Clock, CheckCircle } from "lucide-react";

// Define the shape of a complaint object from your API
interface Complaint {
  id: string | number;
  title: string;
  status: "Pending" | "Resolved";
  createdAt: string; // Or `date` depending on your API response
}

interface ComplaintHistoryProps {
  complaints: Complaint[];
  loading: boolean;
}

// A sub-component for the sleek loading state
const HistorySkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex gap-4">
        <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-4 w-2/3"></div>
          <div className="skeleton h-4 w-1/3"></div>
        </div>
      </div>
    ))}
  </div>
);

// A sub-component for when there are no complaints
const EmptyState = () => (
  <div className="text-center py-10">
    <h3 className="text-xl font-semibold">No Complaints Yet!</h3>
    <p className="text-base-content/60 mt-2">
      When you file a complaint, it will appear here.
    </p>
  </div>
);

const ComplaintHistory: React.FC<ComplaintHistoryProps> = ({
  complaints,
  loading,
}) => {
  const getStatusIcon = (status: "Pending" | "Resolved") => {
    if (status === "Resolved") {
      return <CheckCircle className="text-success" />;
    }
    return <Clock className="text-warning" />;
  };

  return (
    <div className="card bg-white shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">Your Complaint History</h2>
        {loading ? (
          <HistorySkeleton />
        ) : complaints.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {complaints.map((complaint, index) => (
              <li key={complaint.id}>
                <div className="timeline-middle mx-2">
                  {getStatusIcon(complaint.status)}
                </div>
                <div
                  className={`timeline-${
                    index % 2 === 0 ? "start" : "end"
                  } md:text-end mb-10 p-4 bg-base-100 rounded-lg shadow`}
                >
                  <time className="font-mono italic text-sm text-base-content/60">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </time>
                  <div className="text-lg font-bold">{complaint.title}</div>
                  <div
                    className={`badge mt-1 ${
                      complaint.status === "Resolved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {complaint.status}
                  </div>
                </div>
                {index < complaints.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComplaintHistory;
