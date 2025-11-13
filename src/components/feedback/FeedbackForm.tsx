// /src/components/feedback/FeedbackForm.tsx
"use client";

import React, { useState } from "react";
import { useUser } from "@/contexts/authContext"; // To check if logged in
import { submitFeedback } from "@/services/feedbackService"; // New service
import type { FeedbackSubmission } from "@/services/feedbackService";
interface FeedbackFormProps {
  canteenId: string; // Passed from the page
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ canteenId }) => {
  const { user, loading: authLoading } = useUser();

  // Form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please log in to leave feedback.");
      return;
    }
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // build an array of FeedbackSubmission to match the service signature
      const submissions: FeedbackSubmission[] = [
        {
          questionId: 0, // <- replace with real questionId if you're submitting per-question answers
          rating: rating as 1 | 2 | 3 | 4 | 5,
          reason: comment || "No comment",
        },
      ];

      const responseMessage = await submitFeedback(submissions);
      setSuccess(responseMessage || "Feedback submitted successfully!");

      // Reset form
      setRating(0);
      setComment("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <span className="loading loading-sm loading-spinner"></span>;
  }

  if (!user) {
    return (
      <div className="alert alert-warning">
        <p>You must be logged in to leave feedback.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Alert Messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Star Rating */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Your Rating</span>
        </label>
        <div className="rating rating-lg">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-primary"
              checked={rating === star}
              onChange={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Comment (Optional)</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="What did you like or dislike?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
