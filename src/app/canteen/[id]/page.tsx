"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Icons
import {
  ArrowLeft,
  Info,
  MessageSquarePlus,
  History,
  ShieldCheck,
  MapPin,
  Clock,
  Store,
} from "lucide-react";

// Relative imports
import { getPublicCanteenById, Canteen } from "../../../services/publicService";

// Placeholder for Image Blur
const PLACEHOLDER_SVG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSIjZTU1ZWRlIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiAvPjwvc3ZnPg==";

export default function CanteenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [canteen, setCanteen] = useState<Canteen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      <div className="flex items-center justify-center min-h-screen bg-base-200/30">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!canteen) return null;

  return (
    <div className="min-h-screen bg-base-200/30">
      {/* Changed 'container max-w-6xl' to 'w-full' for full-screen width */}
      <div className="w-full p-4 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="btn btn-circle btn-ghost hover:bg-base-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Store className="w-8 h-8 text-primary" />
              Canteen Profile
            </h1>
            <p className="text-base-content/70">
              View details, certifications, and menu.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* --- SIDEBAR NAVIGATION --- */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="card bg-base-100 shadow-lg border border-base-200 sticky top-6 overflow-hidden">
              <div className="bg-base-200/50 p-4 border-b border-base-200">
                <h3 className="font-bold text-lg">Actions</h3>
              </div>
              <div className="card-body p-2">
                <ul className="menu w-full p-0 gap-1">
                  <li>
                    <a className="active font-medium bg-primary/10 text-primary hover:bg-primary/20 border-l-4 border-primary rounded-r-lg rounded-l-none">
                      <Info className="w-5 h-5" />
                      Canteen Details
                    </a>
                  </li>
                  <li>
                    <Link
                      href={`/canteen/${id}/complaint`}
                      className="font-medium hover:bg-base-200 border-l-4 border-transparent"
                    >
                      <MessageSquarePlus className="w-5 h-5" />
                      File a Complaint
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/canteen/${id}/complaints-history`}
                      className="font-medium hover:bg-base-200 border-l-4 border-transparent"
                    >
                      <History className="w-5 h-5" />
                      Complaint History
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <div className="flex-grow">
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
              {/* Hero Image Section */}
              <figure className="relative h-64 md:h-80 w-full bg-neutral">
                <Image
                  src={
                    canteen.imageUrl || "https://via.placeholder.com/1200x600"
                  }
                  alt={canteen.canteenName}
                  fill
                  className="object-cover opacity-90"
                  priority
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_SVG}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <div className="badge badge-success gap-1.5 border-none text-white shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                      Open Now
                    </div>
                    <div className="badge badge-outline text-white/80 border-white/40">
                      ID: {canteen.id}
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
                    {canteen.canteenName}
                  </h1>
                </div>
              </figure>

              <div className="card-body p-6 md:p-10">
                {/* Info Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Left: Description */}
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-base-content">
                      <Info className="w-5 h-5 text-primary" />
                      About this Canteen
                    </h3>
                    <p className="text-base-content/70 leading-relaxed text-lg">
                      {canteen.info ||
                        "Welcome to our canteen. We serve fresh and healthy meals for students and staff. Check out our daily specials and menu items!"}
                    </p>

                    <div className="flex flex-col gap-3 mt-6 text-sm text-base-content/60 bg-base-200/40 p-4 rounded-lg border border-base-200">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">
                          Campus Main Block, Ground Floor
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">
                          08:00 AM - 10:00 PM (Mon-Sat)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Safety Card */}
                  <div className="flex flex-col gap-4">
                    <div className="card bg-base-200/50 border border-base-200 p-6 rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 text-green-700 rounded-xl shadow-sm">
                          <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">
                            Safety & Hygiene
                          </h4>
                          <p className="text-sm text-base-content/60 mt-1 leading-relaxed">
                            This establishment adheres to strict food safety
                            protocols and regular hygiene audits.
                          </p>
                        </div>
                      </div>

                      <div className="divider my-4"></div>

                      <div className="flex justify-end">
                        {canteen.fssaiCertificateUrl ? (
                          <a
                            href={canteen.fssaiCertificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline btn-success gap-2 w-full sm:w-auto"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            View FSSAI Certificate
                          </a>
                        ) : (
                          <div className="badge badge-ghost opacity-50 p-3 h-8">
                            Certificate Pending
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
