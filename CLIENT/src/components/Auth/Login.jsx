import { ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import imgDesktop from "../../assets/login-Img.avif";
import imgMobile from "../../assets/login-Img2.avif";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../redux/Slice/toastSlice";
import { authenticate } from "../../redux/Slice/authSlice";

const Login = () => {

  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const { handleSubmit, register, formState: { errors }, reset } = useForm({ mode: "onChange" })
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      let response = await loginUser(data)
      console.log(response)
      setLoginError(null)
      navigate("/")
      dispatch(setToast({
        success: true,
        message: response.data.message,
      }))
      dispatch(authenticate({
        accessToken: response.data.data.accessToken,
        user : response.data.data.userData
      }))
      reset()
    } catch (error) {
      setLoginError(error.response?.data.message)
      console.log(error.response?.data)
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* Back Arrow */}
      <div className="flex items-center px-6 py-4">
        <NavLink to="/" className="text-neutral-400 hover:text-white transition flex items-center gap-2">
          <ArrowLeft size={22} />
        </NavLink>
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-6 text-center">

              {/* Email */}
              <div className="text-left">
                <label className="block text-xs text-neutral-400 mb-2 uppercase">Email Address</label>
                <input
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "enter a valid email"
                    }
                  })}
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 outline-none focus:border-white transition"
                />
                {errors.email && <p className="text-red-500 text-right">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="text-left">
                <label className="block text-xs text-neutral-400 mb-2 uppercase">Password</label>

                <div className="relative">
                  <input
                    {...register("password", {
                      required: "password is required",
                      minLength: {
                        value: 6,
                        message: "minimum 6 characters are required"
                      },
                      maxLength: {
                        value: 32,
                        message: "maximum 32 characters are required"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                        message: "include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %)."
                      }
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-neutral-700 py-3 pr-10 outline-none focus:border-white transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && <p className="text-red-500 text-right">{errors.password.message}</p>}
              </div>

              {/* Login Button */}
              <button type="submit" className="w-full bg-white text-black py-4 rounded-md flex items-center justify-center gap-2 font-medium hover:bg-neutral-200 transition">
                Login <ArrowRight size={18} />
              </button>


              {/* Error Message */}
              <p className="text-red-500 mt-[-20px]">{loginError}</p>


              {/* Register */}
              <p className="text-center text-sm text-neutral-400 mt-4">
                Don't have an account? <NavLink to="/register" className="text-white underline">Register</NavLink>
              </p>

              {/* Terms & Conditions directly below button */}
              <p className="text-[11px] text-neutral-500 mt-2">
                By continuing, you agree to our Terms & Conditions and Privacy Policy.
              </p>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
