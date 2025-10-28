// src/components/feedback/FeedbackForm.tsx

"use client";

import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // **TODO**: Add your API call logic here
    console.log("Feedback Submitted:", { rating, comment });
    alert("Thank you for your feedback!");
    // Reset form
    setRating(0);
    setComment("");
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="form-control items-center">
            <label className="label">
              <span className="label-text text-lg">Overall Rating</span>
            </label>
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  checked={rating === star}
                  onChange={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Comments</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered h-32"
              placeholder="What did you like or dislike?"
            ></textarea>
          </div>

          <div className="card-actions justify-center">
            <button type="submit" className="btn btn-primary btn-wide">
              Submit Feedback <ThumbsUp size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
