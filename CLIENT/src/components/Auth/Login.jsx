import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-[-2px] text-black">
            SNITCH
          </h1>
        </div>

        {/* Login Card */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 text-center mt-2 mb-8">
            Login to continue shopping
          </p>

          {/* Mobile / Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Email or Mobile Number
            </label>

            <input
              id="email"
              type="text"
              placeholder="Enter email or mobile number"
              className="w-full h-12 border border-gray-300 px-4 text-sm outline-none
              transition-all duration-200
              focus:border-black
              placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs text-gray-600 hover:text-black underline"
              >
                Forgot Password?
              </button>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 border border-gray-300 px-4 text-sm outline-none
              transition-all duration-200
              focus:border-black
              placeholder:text-gray-400"
            />
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="w-full h-12 mt-6 bg-black text-white text-sm
            font-semibold tracking-wide
            hover:bg-gray-800 transition-colors duration-200"
          >
            LOGIN
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-xs text-gray-400 uppercase">
              OR
            </span>

            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full h-12 border border-gray-300
            flex items-center justify-center gap-3
            text-sm font-medium text-gray-800
            hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-base font-bold">G</span>
            Continue with Google
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-black font-semibold underline underline-offset-2"
            >
              Create Account
            </button>
          </p>
        </div>

        {/* Bottom text */}
        <p className="text-center text-[11px] text-gray-400 mt-10">
          By continuing, you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
