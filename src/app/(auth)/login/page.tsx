"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// UPDATED: Pointing to the correct context file we created
import { useUser } from "../../../contexts/authContext";
import { useRouter } from "next/navigation";
// import logo from "../../../../public/logo.png";

const Login: React.FC = () => {
  // 1. Manage state for inputs and errors
  const [role, setRole] = useState("ROLE_USER");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // 2. Get the login function and user state from our context
  // We need 'user' here to check the role for redirection
  const { login, user } = useUser();

  // UPDATED: 3. Handle Redirection based on Role
  useEffect(() => {
    // If user is logged in (context has user data), redirect immediately
    if (user) {
      if (user.role === "ROLE_ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  // 4. Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Call the login function with user credentials
      // The context will update 'user', triggering the useEffect above
      await login({ studentId: studentId, password });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div
      data-theme="light"
      className="flex min-h-screen min-w-fit items-center justify-center bg-gray-100"
    >
      <div className="card w-full m-10 max-w-lg rounded-2xl shadow-[var(--my-shadow)] bg-base-100">
        <div className="card-body">
          <div className="self-center">
            <Link href="/">
              <img src="/logo.png" className="h-30 w-30" alt="logo" />
            </Link>
          </div>
          <h1 className="text-center text-2xl font-bold text-base-content">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            Please sign in to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@dau.ac.in"
                className="input input-bordered w-full"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Display Error Message */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button type="submit" className="btn btn-primary w-full rounded-md">
              Sign In
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="link link-primary font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
