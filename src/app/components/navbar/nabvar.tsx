import { Ellipsis } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "../buttons/primary";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 shadow-sm shadow-red-800">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Cafeteria Portal</a>
      </div>
      <div className="flex-none">
        <ul className="flex gap-5 menu menu-horizontal px-1">
          <li>
            <PrimaryButton href="/home" color="bg-white">
              Home
            </PrimaryButton>
          </li>
          <li>
            <details>
              <summary>Menu</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/signup">Signup</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
