// src/components/feedback/FeedbackForm.tsx
"use client";

import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";

// Labels for the rating bar
const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
const quickTags = [
  "Good Food",
  "Fast Service",
  "Cleanliness",
  "Friendly Staff",
  "Value for Money",
];

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    setIsSubmitting(true);

    // **TODO**: Add your API call logic here
    console.log("Feedback Submitted:", { rating, comment, tags: selectedTags });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setRating(0);
        setComment("");
        setSelectedTags([]);
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="card bg-white shadow-xl">
        <div className="card-body items-center text-center">
          <ThumbsUp size={48} className="text-success" />
          <h2 className="card-title text-2xl mt-4">Thank you!</h2>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-white shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- UPDATED Segmented Bar Rating UI --- */}
          <div className="form-control items-center w-full">
            <label className="label">
              <span className="label-text text-lg">
                How was your experience?
              </span>
            </label>
            <div
              className={`flex w-full cursor-pointer rounded-lg border-2 transition-colors duration-200 
                          ${
                            hoverRating > 0 || rating > 0
                              ? "border-primary-focus"
                              : "border-base-200"
                          }`}
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div
                  key={value}
                  className="flex-1 py-2 text-center transition-colors duration-200"
                  onMouseEnter={() => setHoverRating(value)}
                  onClick={() => setRating(value)}
                >
                  <div
                    className={`h-3 mx-0.5 transition-all duration-200 
                                ${
                                  (hoverRating || rating) >= value
                                    ? "bg-primary border border-primary-focus"
                                    : "bg-base-300 border border-transparent"
                                }
                                ${value === 1 ? "rounded-l-sm" : ""} ${
                      value === 5 ? "rounded-r-sm" : ""
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            {(hoverRating > 0 || rating > 0) && (
              <p className="mt-2 text-md font-semibold text-primary h-6">
                {ratingLabels[(hoverRating || rating) - 1]}
              </p>
            )}
            {/* Fallback for when no rating is selected */}
            {hoverRating === 0 && rating === 0 && (
              <div className="h-6 mt-2"></div>
            )}
          </div>

          {/* Quick Tags */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">What went well? (Optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`badge badge-lg p-3 cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "badge-primary text-white"
                      : "badge-outline"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="form-control">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered h-28"
              placeholder="Any other comments or suggestions?"
            ></textarea>
          </div>

          <div className="card-actions justify-center">
            <button
              type="submit"
              className="btn btn-accent btn-wide text-white"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
