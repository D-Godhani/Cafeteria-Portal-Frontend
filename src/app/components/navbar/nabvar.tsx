import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    // The main navbar container. 'bg-base-100' gives it a default theme color.
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left side of the navbar: Portal Title */}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Complaints Portal
        </Link>
      </div>

      {/* Right side of the navbar: Navigation links */}
      <div className="flex-none">
        <ul className="menu menu-horizontal items-center space-x-2 px-1">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/complaints">Complaints</Link>
          </li>
          <li>
            <Link href="/feedback">Feedback</Link>
          </li>
          <li>
            <Link href="/login" className="btn btn-primary btn-sm text-white">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
