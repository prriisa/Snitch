import { ArrowRight, ArrowLeft } from "lucide-react";
import { Navlink } from "react-router";
import imgDesktop from "../../assets/login-Img.avif";
import imgMobile from "../../assets/login-Img2.avif";

const Login = () => {
  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* Back Arrow */}
      <div className="flex items-center px-6 py-4">
        <Navlink to="/" className="text-neutral-400 hover:text-white transition flex items-center gap-2">
          <ArrowLeft size={22} />
        </Navlink>
      </div>

      {/* Main Row */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* Left side - image */}
        <div className="w-full md:w-1/2 h-64 md:h-full flex flex-col">

          {/* Mobile Logo + Heading */}
          <div className="block md:hidden flex flex-col items-center py-4 space-y-2">
            <h1 className="text-3xl font-bold tracking-[0.3em]">SNITCH</h1>
            <h2 className="text-xs tracking-[0.2em] text-neutral-400">LOGIN TO YOUR ACCOUNT</h2>
          </div>

          {/* Mobile Image */}
          <img src={imgMobile} alt="Login Mobile" className="block md:hidden w-full h-full object-cover" />

          {/* Desktop Image */}
          <img src={imgDesktop} alt="Login Desktop" className="hidden md:block w-full h-screen object-cover" />
        </div>

        {/* Right side - form */}
        <div className="w-full md:w-1/2 flex flex-col h-full px-6 py-6 md:py-10">

          {/* Desktop Logo + Heading */}
          <div className="hidden md:flex flex-col items-center mb-4 md:mb-6 space-y-2">
            <h1 className="text-4xl font-bold tracking-[0.3em]">SNITCH</h1>
            <h2 className="text-xs tracking-[0.2em] text-neutral-400">LOGIN TO YOUR ACCOUNT</h2>
          </div>

          {/* Form */}
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-6 text-center">

              {/* Email */}
              <div className="text-left">
                <label className="block text-xs text-neutral-400 mb-2 uppercase">Email Address</label>
                <input type="email" placeholder="johndoe@gmail.com"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 outline-none focus:border-white transition" />
              </div>

              {/* Password */}
              <div className="text-left">
                <label className="block text-xs text-neutral-400 mb-2 uppercase">Password</label>
                <input type="password" placeholder="••••••••"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 outline-none focus:border-white transition" />
              </div>

              {/* Login Button */}
              <button className="w-full bg-white text-black py-4 rounded-md flex items-center justify-center gap-2 font-medium hover:bg-neutral-200 transition">
                Login <ArrowRight size={18} />
              </button>

              
              {/* Register */}
              <p className="text-center text-sm text-neutral-400 mt-4">
                Don't have an account? <Navlink to="/register" className="text-white underline">Register</Navlink>
              </p>


              {/* Terms & Conditions directly below button */}
              <p className="text-[11px] text-neutral-500 mt-2">
                By continuing, you agree to our Terms & Conditions and Privacy Policy.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
