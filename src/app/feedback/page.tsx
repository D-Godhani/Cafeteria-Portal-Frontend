// src/app/feedback/page.tsx

import Navbar from "@/components/navbar/navbar";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const FeedbackPage = () => {
  return (
    // Use the primary theme background color for consistency
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="container mx-auto p-6 flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold">
              Share Your Feedback
            </h1>
            <p className="text-lg mt-2 text-base-content/70">
              We value your opinion. Help us improve our service!
            </p>
          </div>
          <FeedbackForm />
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;
