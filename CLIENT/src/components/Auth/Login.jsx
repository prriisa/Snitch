import { ArrowRight } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex bg-black text-white">

      {/* Left side - banner image */}
      <div className="hidden md:flex w-1/2">
        <img
          src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/login.jpg?v=1737548884&quality=80"
          alt="Login banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <h1 className="text-4xl font-bold tracking-[0.3em]">SNITCH</h1>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm mx-auto">
          {/* Email */}
          <label className="block text-gray-300 mb-3 tracking-wide text-xs uppercase">
            Email Address
          </label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            className="w-full h-[40px] border-b border-gray-600 bg-transparent text-white px-3 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-white"
          />

          {/* Password */}
          <label className="block text-gray-300 mt-6 mb-3 tracking-wide text-xs uppercase">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-[40px] border-b border-gray-600 bg-transparent text-white px-3 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-white"
          />

          {/* Login button */}
          <div className="w-full my-8">
            <button
              type="button"
              className="inline-flex items-center justify-center w-full py-4 text-black bg-white border border-black hover:bg-gray-200 rounded-md font-medium transition"
            >
              Login
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>

          {/* Terms */}
          <div className="text-center text-gray-400 text-[11px]">
            By continuing, you agree to SNITCH’s{" "}
            <a href="/terms" className="underline text-white">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline text-white">
              Privacy Policy
            </a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
