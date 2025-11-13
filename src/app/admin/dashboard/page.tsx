"use client";

// UPDATED: Changed path to be relative
import { useUser } from "@/contexts/authContext";
import { ShieldCheck } from "lucide-react";

// This page will only be visible if the user passes
// the security checks in '(admin)/layout.tsx'

export default function AdminDashboardPage() {
  const { user } = useUser(); // We can safely use this now

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-base-content/70">
          Welcome, {user?.studentId || "Admin"}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Admin Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <ShieldCheck className="text-success" />
              Admin Portal
            </h2>
            <p>
              You are viewing this page because you are authenticated and have
              the role of 'ADMIN'.
            </p>
          </div>
        </div>

        {/* Add more admin-specific components here */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Manage Complaints</h2>
            <p>View, update, and resolve all user complaints.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View Complaints</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Manage Feedback</h2>
            <p>Review all user feedback and ratings.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
