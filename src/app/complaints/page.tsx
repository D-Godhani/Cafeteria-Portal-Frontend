// src/app/complaints/page.tsx
"use client"; // This page now manages state, so it must be a client component

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/navbar/navbar";
import ComplaintForm from "@/components/complaints/ComplaintForm";
import ComplaintHistory from "@/components/complaints/ComplaintHistory";
// import { getUserComplaints } from "@/services/complaintService"; // Assuming you have this service
import { useUser } from "@/contexts/authContext"; // Assuming you use this hook

const ComplaintsPage = () => {
  const { isAuthenticated } = useUser();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = useCallback(async () => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const data = await getUserComplaints();
        setComplaints(data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // If not authenticated, stop loading
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
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
          {/* Form now takes up 2/5 of the space on large screens */}
          <div className="lg:col-span-2">
            <ComplaintForm onComplaintSubmitted={fetchComplaints} />
          </div>
          {/* History now takes up 3/5 of the space */}
          <div className="lg:col-span-3">
            <ComplaintHistory complaints={complaints} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintsPage;
