import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-[-2px] text-black">
            SNITCH
          </h1>
        </div>

        {/* Register Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Create your account and start shopping
          </p>
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              placeholder="First name"
              className="w-full h-12 border border-gray-300 px-4 text-sm
              outline-none transition-all duration-200
              focus:border-black placeholder:text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Last Name
            </label>

            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              className="w-full h-12 border border-gray-300 px-4 text-sm
              outline-none transition-all duration-200
              focus:border-black placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 border border-gray-300 px-4 text-sm
            outline-none transition-all duration-200
            focus:border-black placeholder:text-gray-400"
          />
        </div>

        {/* Mobile */}
        <div className="mb-5">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Mobile Number
          </label>

          <div className="flex">
            <div className="h-12 border border-r-0 border-gray-300
              flex items-center px-3 text-sm text-gray-700 bg-gray-50">
              +91
            </div>

            <input
              id="mobile"
              type="tel"
              placeholder="Enter mobile number"
              className="w-full h-12 border border-gray-300 px-4 text-sm
              outline-none transition-all duration-200
              focus:border-black placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Create a password"
            className="w-full h-12 border border-gray-300 px-4 text-sm
            outline-none transition-all duration-200
            focus:border-black placeholder:text-gray-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full h-12 border border-gray-300 px-4 text-sm
            outline-none transition-all duration-200
            focus:border-black placeholder:text-gray-400"
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-6">
          <input
            id="terms"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-black cursor-pointer"
          />

          <label
            htmlFor="terms"
            className="text-xs leading-5 text-gray-500"
          >
            I agree to the{" "}
            <span className="text-black underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-black underline cursor-pointer">
              Privacy Policy
            </span>
          </label>
        </div>

        {/* Create Account */}
        <button
          type="button"
          className="w-full h-12 bg-black text-white text-sm
          font-semibold tracking-wide
          hover:bg-gray-800 transition-colors duration-200"
        >
          CREATE ACCOUNT
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
          <span className="text-base font-bold">
            G
          </span>

          Continue with Google
        </button>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <button
            type="button"
            className="text-black font-semibold underline underline-offset-2"
          >
            Login
          </button>
        </p>

        {/* Bottom Text */}
        <p className="text-center text-[11px] text-gray-400 mt-8">
          Your information is secure and will only be used to manage
          your account.
        </p>
      </div>
    </div>
  );
};

export default Register;
