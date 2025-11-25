"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  X,
  Send,
  FileText,
  Info,
  CheckCircle2,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { createComplaint } from "@/services/complaintService";

export default function FileComplaintPage() {
  const params = useParams();
  const router = useRouter();
  const canteenId = params.id as string;

  // State
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Constants
  const MAX_TITLE = 100;
  const MAX_DESC = 1000;

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setLoading(true);
    try {
      await createComplaint({
        canteenId: canteenId,
        title: formData.title,
        description: formData.description,
      });

      setIsSuccess(true);
      // Close after showing success message for 2 seconds
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      console.error("Failed to file complaint:", error);
      // In a real app, you'd set an error state here instead of alerting
      alert("Failed to file complaint. Please try again.");
      setLoading(false);
    }
  };

  // --- Render Success State (Inline replacement) ---
  if (isSuccess) {
    return (
      <ModalOverlay>
        <ModalContainer>
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Complaint Submitted
            </h2>
            <p className="text-gray-500 max-w-xs mx-auto">
              Your report for Canteen #{canteenId} has been filed successfully.
            </p>
            <p className="text-sm text-gray-400 mt-8">
              Closing automatically...
            </p>
          </div>
        </ModalContainer>
      </ModalOverlay>
    );
  }

  // --- Render Form State ---
  return (
    <ModalOverlay>
      <ModalContainer>
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <ShieldAlert className="w-7 h-7 text-red-600" />
              Submit a Complaint
            </h2>
            <p className="text-sm text-gray-500 mt-1 ml-10">
              Logging an issue for Canteen{" "}
              <span className="font-semibold text-gray-900">#{canteenId}</span>
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="btn btn-circle btn-sm btn-ghost text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 bg-gray-50/50">
          {/* Contextual Info Box */}
          <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl text-sm shadow-sm mb-8">
            <Info className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-gray-900">How this works</p>
              <p className="text-gray-600 leading-relaxed">
                This report is official. It will be reviewed directly by the{" "}
                <strong>Administration</strong> and the{" "}
                <strong>Canteen Manager</strong> for immediate action. Please
                provide clear, objective details.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Input */}
            <div className="form-control w-full">
              <div className="flex justify-between items-center mb-2">
                <label className="label-text font-semibold text-gray-700 text-base flex items-center gap-2">
                  Issue Subject <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-xs font-medium ${
                    formData.title.length >= MAX_TITLE
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {formData.title.length}/{MAX_TITLE}
                </span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Hygiene concern, Food quality issue..."
                  className="input w-full pl-12 bg-white border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-lg transition-all shadow-sm"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  maxLength={MAX_TITLE}
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="form-control w-full">
              <div className="flex justify-between items-center mb-2">
                <label className="label-text font-semibold text-gray-700 text-base flex items-center gap-2">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-xs font-medium ${
                    formData.description.length >= MAX_DESC
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {formData.description.length}/{MAX_DESC}
                </span>
              </div>
              <textarea
                className="textarea w-full h-40 bg-white border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-lg transition-all shadow-sm resize-none text-base leading-relaxed p-4"
                placeholder="Please describe the incident, including dates, times, and specific item names if applicable..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                maxLength={MAX_DESC}
              ></textarea>
              <label className="label pt-2">
                <span className="label-text-alt text-gray-500">
                  Please be specific and objective in your description.
                </span>
              </label>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-ghost text-gray-600 hover:bg-gray-100 px-6 font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  loading ||
                  !formData.title.trim() ||
                  !formData.description.trim()
                }
                className="btn bg-red-600 hover:bg-red-700 text-white border-none shadow-md hover:shadow-lg px-8 font-semibold gap-2 transition-all disabled:bg-gray-300 disabled:text-gray-500"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}

// --- Helper Components for Layout Consistency ---

// The dark background backdrop
const ModalOverlay = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
    {children}
  </div>
);

// The actual white card container
const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="card w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-white/10 relative">
    {children}
  </div>
);
