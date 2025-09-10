import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-black">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login to Your Account
        </h1>

        <form className="space-y-5">
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

          {/* Remember me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm text-black border-2 border-gray-300 checked:border-gray-500"
              />
              Remember me
            </label>
            <Link
              href="#"
              className="text-blue-700 hover:underline hover:text-blue-900 transition-all duration-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-2 font-medium text-white transition hover:bg-blue-900"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <span className="h-px w-1/4 bg-gray-300"></span>
          <span className="px-2 text-sm text-gray-500">OR</span>
          <span className="h-px w-1/4 bg-gray-300"></span>
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-700 hover:underline hover:text-blue-900 transition-all duration-300"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
