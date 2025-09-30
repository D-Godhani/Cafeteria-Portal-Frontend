"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../../../contexts/authContext"; // Corrected path to context
// import logo from "../../../../public/logo.png";

const Signup: React.FC = () => {
  const router = useRouter();
  const { register } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    studentId: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        studentId: formData.studentId,
        emailId: formData.emailId,
        password: formData.password,
      });

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div
      data-theme="light"
      className="flex min-h-screen items-center justify-center bg-gray-100"
    >
      <div className="card w-full m-10 max-w-lg rounded-2xl shadow-[var(--my-shadow)] bg-base-100">
        <div className="card-body">
          <div className="self-center">
            <Link href="/">
              <img src="/logo.png" className="h-30 w-30" alt="logo" />
            </Link>
          </div>
          <h1 className="text-center text-2xl font-bold text-base-content mb-6">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="form-control">
              <label htmlFor="mobileNumber" className="label">
                <span className="label-text font-medium">Mobile Number</span>
              </label>
              <input
                type="tel"
                id="mobileNumber"
                placeholder="9998887770"
                pattern="[0-9]*"
                maxLength={10}
                className="input input-bordered w-full"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Student ID */}
            <div className="form-control">
              <label htmlFor="studentId" className="label">
                <span className="label-text font-medium">Student ID</span>
              </label>
              <input
                type="tel"
                id="studentId"
                placeholder="202xxx001"
                pattern="[0-9]*"
                maxLength={9}
                className="input input-bordered w-full"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Address */}
            <div className="form-control">
              <label htmlFor="emailId" className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                id="emailId"
                placeholder="example@dau.ac.in"
                className="input input-bordered w-full"
                value={formData.emailId}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Display Error/Success Messages */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-500 text-center">{success}</p>
            )}

            <button type="submit" className="btn btn-primary w-full rounded-md">
              Sign Up
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
