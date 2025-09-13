import Link from "next/link";

const Signup: React.FC = () => {
  return (
    <div
      data-theme="light"
      className="flex min-h-screen items-center justify-center bg-base-200"
    >
      <div className="card w-full max-w-md rounded-2xl shadow-xl bg-base-100">
        <div className="card-body">
          {/* Title */}
          <h1 className="text-center text-3xl font-bold text-base-content mb-6">
            Create an Account
          </h1>
          {/* Form */}
          <form className="space-y-5">
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
                required
              />
            </div>

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
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                id="terms"
                className="checkbox checkbox-sm"
                required
              />
              <label htmlFor="terms" className="text-gray-600 leading-snug">
                I agree to the{" "}
                <Link href="#" className="link link-primary">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-full rounded-md">
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Login link */}
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
