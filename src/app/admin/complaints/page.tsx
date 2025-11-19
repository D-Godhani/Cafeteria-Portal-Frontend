"use client";

import React, { useEffect, useState } from "react";
import {
  getAllComplaints,
  escalateComplaint,
  updateComplaintStatus,
  Complaint,
} from "@/services/adminService";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquareWarning, // Main Header Icon
  FileText, // For "Total" Stat
} from "lucide-react";

export default function AdminComplaintsPage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  // Fetch data on mount
  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      // Sort by ID descending (newest first)
      setComplaints(data.sort((a, b) => b.complainId - a.complainId));
    } catch (error) {
      console.error("Failed to fetch complaints", error);
      // alert("Failed to load complaints. Are you logged in?");
      // Commented out alert to prevent popup spam if API is just empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Handle Resolve Action
  const handleResolve = async (id: number) => {
    if (!confirm("Mark this complaint as RESOLVED?")) return;
    setProcessingId(id);
    try {
      await updateComplaintStatus(id, "RESOLVED");
      // Update local state to reflect change immediately
      setComplaints((prev) =>
        prev.map((c) =>
          c.complainId === id ? { ...c, complaintStatus: "RESOLVED" } : c
        )
      );
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Escalate Action
  const handleEscalate = async (id: number) => {
    if (!confirm("Escalate this to the CMC? This will send an email.")) return;
    setProcessingId(id);
    try {
      await escalateComplaint(id);
      alert("Complaint escalated successfully!");
    } catch (error) {
      alert("Failed to escalate complaint");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

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
            <MessageSquareWarning className="w-8 h-8 text-red-500" />
            Manage Complaints
          </h1>
          <p className="text-base-content/70">Overview of student grievances</p>
        </div>
      </div>

      {/* --- Stats Overview --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Total */}
        <div className="stats shadow bg-base-100 border border-base-200 overflow-visible">
          <div className="stat">
            <div className="stat-figure text-primary bg-primary/10 p-2 rounded-full">
              <FileText className="w-6 h-6" />
            </div>
            <div className="stat-title">Total Complaints</div>
            <div className="stat-value text-primary">{complaints.length}</div>
          </div>
        </div>

        {/* Pending */}
        <div className="stats shadow bg-base-100 border border-base-200 overflow-visible">
          <div className="stat">
            <div className="stat-figure text-warning bg-warning/10 p-2 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div className="stat-title">Pending Attention</div>
            <div className="stat-value text-warning">
              {complaints.filter((c) => c.complaintStatus === "PENDING").length}
            </div>
          </div>
        </div>

        {/* Resolved */}
        <div className="stats shadow bg-base-100 border border-base-200 overflow-visible">
          <div className="stat">
            <div className="stat-figure text-success bg-success/10 p-2 rounded-full">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="stat-title">Resolved Issues</div>
            <div className="stat-value text-success">
              {
                complaints.filter((c) => c.complaintStatus === "RESOLVED")
                  .length
              }
            </div>
          </div>
        </div>
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto card bg-base-100 shadow-xl border border-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200/50">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Student ID</th>
              <th>Issue</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.complainId} className="hover">
                <td className="font-mono text-xs opacity-50">
                  #{complaint.complainId}
                </td>
                <td>
                  <div className="text-sm font-medium">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs opacity-50">
                    {new Date(complaint.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="font-mono text-sm">{complaint.emailId}</td>
                <td className="max-w-xs">
                  <div className="font-bold truncate">{complaint.title}</div>
                  <div
                    className="text-sm opacity-70 truncate"
                    title={complaint.description}
                  >
                    {complaint.description}
                  </div>
                </td>
                <td>
                  {complaint.complaintStatus === "RESOLVED" ? (
                    <div className="badge badge-success gap-1 text-white pl-1.5 pr-3">
                      <CheckCircle className="w-3 h-3" /> Resolved
                    </div>
                  ) : (
                    <div className="badge badge-warning gap-1 pl-1.5 pr-3 animate-pulse">
                      <Clock className="w-3 h-3" /> Pending
                    </div>
                  )}
                </td>
                <td className="text-end">
                  <div className="join shadow-sm">
                    {complaint.complaintStatus === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleResolve(complaint.complainId)}
                          disabled={processingId === complaint.complainId}
                          className="btn btn-sm btn-success join-item text-white border-none"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => handleEscalate(complaint.complainId)}
                          disabled={processingId === complaint.complainId}
                          className="btn btn-sm btn-ghost bg-base-200 text-error join-item hover:bg-red-100"
                          title="Escalate to CMC"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {complaint.complaintStatus === "RESOLVED" && (
                      <button className="btn btn-sm btn-disabled join-item bg-base-200/50 text-base-content/40">
                        Case Closed
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {complaints.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-16 text-base-content/50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-10 h-10 text-success/30" />
                    <p>No complaints found. Good job!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
