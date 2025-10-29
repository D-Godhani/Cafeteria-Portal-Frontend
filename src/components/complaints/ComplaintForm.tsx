// src/components/complaints/ComplaintForm.tsx
"use client";

import React, { useState } from "react";
import { createComplaint } from "@/services/complaintService";
import { Send, ListChecks, Type } from "lucide-react";

interface ComplaintFormProps {
  onComplaintSubmitted: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({
  onComplaintSubmitted,
}) => {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Assuming your API expects a `title` and `description`
      await createComplaint({
        title: `[${formData.category}] ${formData.subject}`,
        description: formData.description,
      });
      onComplaintSubmitted(); // Refresh the list
      setFormData({ category: "", subject: "", description: "" }); // Reset form
    } catch (err) {
      setError("Failed to submit complaint. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 'sticky top-24' makes the form stay in view on scroll
    <div className="card bg-white shadow-xl w-full sticky top-24">
      <div className="card-body">
        <h2 className="card-title text-2xl">Lodge a New Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Category */}
          <label className="input input-bordered flex items-center gap-2">
            <ListChecks className="text-base-content/50" size={20} />
            <select
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="grow bg-transparent"
              required
            >
              <option value="" disabled>
                Select Category...
              </option>
              <option>Food Quality</option>
              <option>Service</option>
              <option>Cleanliness</option>
              <option>Other</option>
            </select>
          </label>

          {/* Subject */}
          <label className="input input-bordered flex items-center gap-2">
            <Type className="text-base-content/50" size={20} />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="grow bg-transparent"
              placeholder="Subject"
              required
            />
          </label>

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="textarea textarea-bordered h-32"
            placeholder="Please describe the issue in detail..."
            required
          ></textarea>

          {error && <div className="text-error text-sm">{error}</div>}

          <div className="card-actions">
            <button
              type="submit"
              className="btn btn-accent w-full text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit Complaint"
              )}
              {!isSubmitting && <Send size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
