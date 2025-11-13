// /src/app/canteen/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import React from 'react';

// --- Import your shared components ---
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/home/Footer';
import ComplaintForm from '@/components/complaints/ComplaintForm';
import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function CanteenDetailPage() {
  const params = useParams();
  const id = params.id as string; // Get the canteen ID from the URL

  // --- TODO: Fetch Canteen Details ---
  // const [canteen, setCanteen] = useState<Canteen | null>(null);
  // useEffect(() => {
  //   // You'll need a new service function: getPublicCanteenById(id)
  //   // fetch data and setCanteen
  // }, [id]);

  // --- TODO: Fetch Complaints & Feedback for this canteen ---
  // const [complaints, setComplaints] = useState([]);
  // const [feedback, setFeedback] = useState([]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 py-8">
        
        {/* Placeholder for Canteen Info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Canteen Name (ID: {id})
          </h1>
          <p className="text-lg text-base-content/80">
            This is where the detailed info for the canteen will go, fetched
            from the backend.
          </p>
        </div>

        {/* Forms for Complaint and Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="card bg-base-200 shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
            {/* Pass the canteen ID to your form */}
            <ComplaintForm canteenId={id} />
          </div>
          <div className="card bg-base-200 shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Leave Feedback</h2>
            <FeedbackForm canteenId={id} />
          </div>
        </div>

        {/* --- TODO: Display Lists of Complaints/Feedback --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Complaints</h2>
            {/* Map over fetched complaints */}
            <div className="text-base-content/70">Complaint list...</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Feedback</h2>
            {/* Map over fetched feedback */}
            <div className="text-base-content/70">Feedback list...</div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}