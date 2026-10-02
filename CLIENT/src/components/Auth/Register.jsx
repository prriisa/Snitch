import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";
import imgDesktop from "../../assets/register-Img.avif";
import imgMobile from "../../assets/register-Img2.avif";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Back Arrow */}
      <div className="flex items-center px-6 py-4">
        <NavLink
          to="/"
          className="text-neutral-400 hover:text-white transition flex items-center gap-2"
        >
          <ArrowLeft size={22} />
        </NavLink>
      </div>

      {/* Main Row */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* Left side - image (hidden on mobile) */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img src={imgDesktop} alt="Register Desktop" className="w-full h-screen object-cover" />
        </div>

        {/* Right side - form + mobile image */}
        <div className="w-full md:w-1/2 flex flex-col h-full px-6 py-6 md:py-10">

          {/* Mobile Image (full width, no space) */}
          <img
            src={imgMobile}
            alt="Register Mobile"
            className="block md:hidden w-full h-auto object-cover mb-4"
          />

          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-4 md:mb-6 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.3em]">SNITCH</h1>
            <h2 className="text-xs tracking-[0.2em] text-neutral-400">CREATE YOUR ACCOUNT</h2>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-md space-y-6 text-center">

              {/* Name */}
              <div className="text-left">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Full Name</label>
                <input type="text" placeholder="John Doe"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 
                             placeholder-neutral-500 outline-none focus:border-white transition 
                             text-white font-[__helveticaLight_ba7d87]" />
              </div>

              {/* Email */}
              <div className="text-left">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Email Address</label>
                <input type="email" placeholder="example@email.com"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 
                             placeholder-neutral-500 outline-none focus:border-white transition 
                             text-white font-[__helveticaLight_ba7d87]" />
              </div>

              {/* Phone */}
              <div className="text-left">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Phone Number</label>
                <div className="flex items-center border-b border-neutral-700 py-3">
                  <span className="text-neutral-400 font-[__helveticaLight_ba7d87] mr-2">+91</span>
                  <input type="tel" placeholder="9876543210"
                    className="flex-1 bg-transparent outline-none placeholder-neutral-500 
                               text-white font-[__helveticaLight_ba7d87] focus:border-white transition" />
                </div>
              </div>

              {/* Password */}
              <div className="text-left relative">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 
                             placeholder-neutral-500 outline-none focus:border-white transition 
                             text-white font-[__helveticaLight_ba7d87]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-8 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="text-left relative">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 
                             placeholder-neutral-500 outline-none focus:border-white transition 
                             text-white font-[__helveticaLight_ba7d87]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-8 text-neutral-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Register Button */}
              <button className="w-full bg-white text-black py-4 rounded-md flex items-center justify-center gap-2 font-medium hover:bg-neutral-200 transition font-[__helveticaLight_ba7d87]">
                Register
              </button>

              {/* Already have account */}
              <p className="text-center text-sm text-neutral-400 mt-4 font-[__helveticaLight_ba7d87]">
                Already have an account? <NavLink to="/" className="text-white underline">Login</NavLink>
              </p>

              {/* Terms */}
              <p className="text-[11px] text-neutral-500 mt-2 font-[__helveticaLight_ba7d87]">
                By continuing, you agree to our Terms & Conditions and Privacy Policy.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
