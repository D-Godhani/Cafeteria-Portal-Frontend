// src/components/complaints/ComplaintForm.tsx

"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // **TODO**: Add your API call logic here
    console.log("Complaint Submitted:", formData);
    alert("Your complaint has been submitted successfully!");
    // Reset form after submission
    setFormData({ category: "", subject: "", description: "" });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">New Complaint Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Food Quality">Food Quality</option>
              <option value="Service">Service</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Subject Line */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Subject</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Cold Samosas"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered h-24"
              placeholder="Please provide details about your issue..."
              required
            ></textarea>
          </div>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary">
              Submit <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
