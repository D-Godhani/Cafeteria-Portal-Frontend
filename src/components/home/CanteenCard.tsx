// /src/components/home/CanteenCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Canteen } from "@/services/publicService"; // Import type

interface CanteenCardProps {
  canteen: Canteen;
}

const CanteenCard: React.FC<CanteenCardProps> = ({ canteen }) => {
  return (
    // Use next/link to navigate to the dynamic canteen page
    <Link
      href={`/canteen/${canteen.id}`}
      className="card w-full bg-base-100 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
    >
      <figure className="h-48 relative">
        <Image
          src={canteen.imageUrl} // Add a fallback image
          alt={canteen.canteenName}
          layout="fill"
          objectFit="cover"
          priority // Prioritize loading images in the carousel
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{canteen.canteenName}</h2>
        <p className="text-sm text-base-content/70 truncate-2-lines">
          {canteen.info}
        </p>
        <div className="card-actions justify-end mt-2">
          <span className="btn btn-primary btn-sm">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default CanteenCard;
