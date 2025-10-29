// src/app/complaints/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/navbar/navbar";
import ComplaintForm from "@/components/complaints/ComplaintForm";
import ComplaintHistory from "@/components/complaints/ComplaintHistory";
import { getUserComplaints } from "@/services/complaintService";
import { useUser } from "@/contexts/authContext";

// 1. Define a type for a single complaint object.
// This should match the structure of the data from your API.
interface Complaint {
  id: string | number;
  title: string;
  status: "Pending" | "Resolved";
  createdAt: string;
}

const ComplaintsPage = () => {
  const { isAuthenticated } = useUser();
  // Use the Complaint type for better type safety.
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  // 2. Add an error state to handle API failures.
  const [error, setError] = useState<string | null>(null);

  const fetchComplaints = useCallback(async () => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        setError(null); // Reset error state on new fetch
        const data = await getUserComplaints();
        setComplaints(data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
        // Set an error message if the fetch fails.
        setError(
          "Could not load your complaints. Please try refreshing the page."
        );
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Complaint Center
          </h1>
          <p className="text-base-content/70">
            Have an issue? Let us know, and we'll work to resolve it.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <ComplaintForm onComplaintSubmitted={fetchComplaints} />
          </div>
          <div className="lg:col-span-3">
            {/* 3. Pass the error state down to the history component. */}
            <ComplaintHistory complaints={complaints} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintsPage;
