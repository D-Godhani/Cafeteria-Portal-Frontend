// src/components/navbar/navbar.tsx
"use client";

import Link from "next/link";
import React from "react";
import { useUser } from "@/contexts/authContext";
import { Power, LogIn, UserPlus } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, loading } = useUser();

  return (
    // A clean white background with a shadow to "float" above the page
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4">
      {/* Left side: Portal Title */}
      <div className="flex-1">
        <Link
          href="/"
          className="text-xl font-extrabold text-neutral hover:text-primary transition-colors"
        >
          Cafeteria Portal
        </Link>
      </div>

      {/* Right side: Navigation links */}
      <div className="flex-none">
        {/* Skeleton loader for links while auth state is loading */}
        {loading ? (
          <div className="flex items-center gap-4">
            <div className="skeleton h-6 w-24"></div>
            <div className="skeleton h-8 w-20 rounded-lg"></div>
          </div>
        ) : (
          <ul className="menu menu-horizontal items-center space-x-2 px-1">
            {isAuthenticated || true ? (
              // --- USER IS LOGGED IN ---
              <>
                <li className="hidden sm:block">
                  <span className="font-semibold text-base-content/70">
                    Welcome, {user?.name || "Student"}
                  </span>
                </li>
                <li>
                  <Link href="/complaints">Complaints</Link>
                </li>
                <li>
                  <Link href="/feedback">Feedback</Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    title="Logout"
                    className="btn btn-secondary btn-sm btn-circle text-white"
                  >
                    <Power size={16} />
                  </button>
                </li>
              </>
            ) : (
              // --- USER IS LOGGED OUT ---
              <>
                <li>
                  <Link
                    href="/login"
                    className="btn btn-primary btn-sm text-white rounded-sm"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn btn-sm text-black bg-gray-200 border-2 border-black rounded-sm"
                  >
                    <UserPlus size={16} />
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
