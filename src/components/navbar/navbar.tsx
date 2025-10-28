// src/components/navbar/navbar.tsx

"use client"; // Required because we are using a hook (useUser)

import Link from "next/link";
import React from "react";
import { useUser } from "@/contexts/authContext"; // Adjust the path if necessary
import { LogOut, Power } from "lucide-react";

const Navbar: React.FC = () => {
  // 1. Get auth state and functions from the context
  const { isAuthenticated, user, logout, loading } = useUser();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left side: Portal Title */}
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold m-2 p-2">
          Complaints Portal
        </Link>
      </div>

      {/* Right side: Navigation links */}
      <div className="flex-none">
        {/* 2. Don't render links until the auth state is confirmed */}
        {!loading && (
          <ul className="menu menu-horizontal items-center space-x-2 px-1">
            {/* 3. Use a ternary operator for conditional rendering */}
            {isAuthenticated || true ? (
              // --- USER IS LOGGED IN ---
              <>
                <li>
                  {/* Optional: Greet the user by name */}
                  <span className="font-semibold text-red-600 hover:bg-transparent hover:cursor-default">
                    <Link href="/">Welcome, {user?.name || "John Doe"}</Link>
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
                    className="btn text-white btn-ghost shadow-xl btn-sm rounded-md bg-red-900"
                  >
                    <Power />
                  </button>
                </li>
              </>
            ) : (
              // --- USER IS LOGGED OUT ---
              <>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="btn btn-primary btn-sm text-white rounded-md"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn btn-primary btn-sm rounded-md"
                  >
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
