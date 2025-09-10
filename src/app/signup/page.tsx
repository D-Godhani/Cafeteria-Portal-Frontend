import Link from "next/link";
export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-black">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h1>

        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@dau.ac.in"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="checkbox checkbox-sm border-2 border-gray-300 checked:border-gray-500"
              required
            />
            <label htmlFor="terms" className="text-gray-600">
              I agree to the{" "}
              <Link
                href="#"
                className="text-blue-700 hover:underline hover:text-blue-900 transition-all duration-300"
              >
                Terms & Conditions
              </Link>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-2 font-medium text-white transition hover:bg-blue-900"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <span className="h-px w-1/4 bg-gray-300"></span>
          <span className="px-2 text-sm text-gray-500">OR</span>
          <span className="h-px w-1/4 bg-gray-300"></span>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-700 hover:underline hover:text-blue-900 transition-all duration-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
