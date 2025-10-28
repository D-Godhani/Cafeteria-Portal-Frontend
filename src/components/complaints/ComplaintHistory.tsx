// src/components/complaints/ComplaintHistory.tsx

"use client";

import React, { useState, useEffect } from "react";

// Mock data - replace with an API call in useEffect
const mockComplaints = [
  {
    id: 1,
    subject: "Water cooler not working",
    status: "Resolved",
    date: "2025-10-25",
  },
  {
    id: 2,
    subject: "Incorrect order received",
    status: "Pending",
    date: "2025-10-27",
  },
  {
    id: 3,
    subject: "Hygiene issues in seating area",
    status: "Pending",
    date: "2025-10-27",
  },
];

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [loading, setLoading] = useState(true);

  // **TODO**: Replace this with a real API call
  useEffect(() => {
    // Simulating a fetch request
    setTimeout(() => {
      setComplaints(mockComplaints);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-4">Your Complaint History</h2>
        <div className="space-y-4">
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="p-4 border rounded-lg bg-base-200"
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold">{complaint.subject}</p>
                  <div
                    className={`badge ${
                      complaint.status === "Resolved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {complaint.status}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Filed on: {complaint.date}
                </p>
              </div>
            ))
          ) : (
            <p>You have no past complaints.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintHistory;
