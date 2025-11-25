"use client";

import Link from "next/link";
import React from "react";
import { useUser } from "@/contexts/authContext";
import { Power, LogIn, UserPlus, LayoutDashboard, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, loading, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  // Common button transition classes
  const btnTransition =
    "transition-all duration-200 ease-in-out active:scale-95";

  return (
    <div className="navbar bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 border-b border-base-200/50">
      {/* Left side: Portal Title */}
      <div className="flex-1">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold text-neutral hover:text-primary transition-colors tracking-tight"
        >
          <span className="bg-primary/10 text-primary p-1.5 rounded-lg">
            {/* Optional: You could add a generic icon here if you have a logo */}
            <LayoutDashboard size={20} />
          </span>
          Cafeteria Portal
        </Link>
      </div>

      {/* Right side: Navigation links */}
      <div className="flex-none">
        {loading ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="h-9 w-24 bg-base-200 rounded-full"></div>
            <div className="h-9 w-24 bg-base-200 rounded-full"></div>
          </div>
        ) : (
          <ul className="menu menu-horizontal items-center gap-3 px-1">
            {isAuthenticated ? (
              // --- USER IS LOGGED IN ---
              <>
                {/* User Welcome Badge */}
                <li className="hidden sm:block mr-1">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-base-100 border border-base-200 rounded-full cursor-default hover:bg-base-100">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-xs font-bold text-base-content/70 uppercase tracking-wide">
                      {user?.studentId}
                    </span>
                  </div>
                </li>

                {/* Admin Dashboard Button */}
                {user?.role === "ROLE_ADMIN" && (
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className={`btn btn-sm btn-neutral text-white rounded-full shadow-md shadow-neutral/20 ${btnTransition}`}
                    >
                      <LayoutDashboard size={16} />
                      <span className="hidden sm:inline">Admin Panel</span>
                    </Link>
                  </li>
                )}

                {/* Logout Button */}
                <li>
                  <button
                    onClick={handleLogout}
                    className={`btn btn-sm btn-ghost rounded-full text-base-content/90 hover:text-red-500 hover:bg-error/10 border border-transparent hover:border-error/20 ${btnTransition}`}
                  >
                    <Power size={16} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </li>
              </>
            ) : (
              // --- USER IS LOGGED OUT ---
              <>
                <li>
                  <Link
                    href="/login"
                    className={`btn btn-sm btn-ghost text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-full px-5 ${btnTransition}`}
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className={`btn btn-sm btn-primary text-white rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 ${btnTransition}`}
                  >
                    <UserPlus size={16} />
                    Sign Up
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
