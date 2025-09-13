import Link from "next/link";
import logo from "../../../public/logo.png";

const Login: React.FC = () => {
  return (
    <div
      data-theme="light"
      className="flex min-h-screen items-center justify-center bg-base-200"
    >
      <div className="card w-full max-w-md rounded-2xl shadow-xl bg-base-100">
        <div className="card-body">
          {/* Title */}

          <div className="self-center">
            <Link href="/">
              <img src={logo.src} className="h-30 w-30" alt="logo" />
            </Link>
          </div>
          <h1 className="text-center text-2xl font-bold text-base-content">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            Please sign in to continue
          </p>

          {/* Form */}
          <form className="space-y-5">
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

            {/* Remember me + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span className="label-text">Remember me</span>
              </label>
              <Link href="#" className="link link-primary">
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-full rounded-md">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Signup link */}
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
