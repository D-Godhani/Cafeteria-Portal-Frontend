"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Relative imports
import { getPublicCanteenById, Canteen } from "../../../services/publicService";

export default function CanteenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [canteen, setCanteen] = useState<Canteen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch canteen details now
        const canteenData = await getPublicCanteenById(id);
        setCanteen(canteenData);
      } catch (err) {
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!canteen) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs / Back Button */}
      <button
        onClick={() => router.back()}
        className="btn btn-ghost btn-sm mb-6 gap-2 pl-0 hover:bg-transparent text-base-content/60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Canteens
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Sidebar Navigation --- */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="card bg-base-100 shadow-lg border border-base-200 sticky top-24">
            <div className="card-body p-4">
              <h3 className="font-bold text-lg mb-4 px-2">Navigation</h3>
              <ul className="menu bg-base-100 w-full p-0 gap-2">
                <li>
                  <a className="active font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    Canteen Details
                  </a>
                </li>
                <li>
                  <Link
                    href={`/canteens/${id}/complaint`}
                    className="font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    File a Complaint
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/canteens/${id}/complaints-history`}
                    className="font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    My Complaints History
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* --- Main Content: Canteen Details --- */}
        <div className="flex-grow">
          <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
            {/* Hero Image */}
            <figure className="relative h-64 md:h-96 w-full">
              <Image
                src={canteen.imageUrl || "https://via.placeholder.com/1200x600"}
                alt={canteen.canteenName}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-base-content drop-shadow-sm">
                  {canteen.canteenName}
                </h1>
              </div>
            </figure>

            <div className="card-body p-6 md:p-10">
              {/* Status Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="badge badge-success gap-2 p-3">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  Open Now
                </div>
                <div className="badge badge-ghost gap-2 p-3">
                  ID: {canteen.id}
                </div>
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <h3 className="text-2xl font-semibold mb-3">About Us</h3>
                <p className="text-lg text-base-content/80 leading-relaxed">
                  {canteen.info ||
                    "Welcome to our canteen. We serve fresh and healthy meals for students and staff. Check out our daily specials and menu items!"}
                </p>
              </div>

              <div className="divider my-8"></div>

              {/* Certifications & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-base-200/50 p-6 rounded-box">
                <div>
                  <h4 className="font-bold text-lg">Safety & Standards</h4>
                  <p className="text-sm text-base-content/60">
                    We adhere to strict hygiene and food safety protocols.
                  </p>
                </div>
                {canteen.fssaiCertificateUrl ? (
                  <a
                    href={canteen.fssaiCertificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-primary gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                    View FSSAI Certificate
                  </a>
                ) : (
                  <div className="badge badge-neutral">Certificate Pending</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
