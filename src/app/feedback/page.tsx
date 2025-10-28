// src/app/feedback/page.tsx

import Navbar from "@/components/navbar/navbar";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const FeedbackPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="container mx-auto p-6 flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Share Your Feedback</h1>
            <p className="text-lg mt-2">
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
