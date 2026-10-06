import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate, useOutletContext } from "react-router";
import { useState } from "react";
import imgDesktop from "../../assets/register-Img.avif";
import imgMobile from "../../assets/register-Img2.avif";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/api";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/Slice/toastSlice";

const Register = () => {

  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState(null)
  const navigate = useNavigate()
 
  const { handleSubmit, reset, register, getValues, formState: { errors } } = useForm({ mode: "onChange" })

  const onSubmit = async (data) => {
    try {
      let response = await registerUser(data)
      console.log(response)
      setRegisterError(null)

      reset()
      navigate("/")

      dispatch(setToast({
        success: true,
        message: response.data.message,
      }))

    } catch (error) {
      setRegisterError(error.response?.data.message)
      console.log(error.response?.data)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Back Arrow */}
      <div className="flex items-center px-6 py-4">
        <NavLink
          to="/login"
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-md space-y-6 text-center">

              {/* Name */}
              <div className="text-left">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Full Name</label>
                <input
                  {...register("name", {
                    required: "name is required",
                    minLength: {
                      value: 3,
                      message: "minimum 3 characters are required"
                    },
                    maxLength: {
                      value: 15,
                      message: "maximum 15 characters are required"
                    }
                  })}
                  type="text" placeholder="John Doe"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 
                             placeholder-neutral-500 outline-none focus:border-white transition 
                             text-white font-[__helveticaLight_ba7d87]" />
              </div>
              {errors.name && <p className="text-red-500 text-right">{errors.name.message}</p>}


              {/* Email */}
              <div className="text-left">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Email Address</label>
                <input
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "enter a valid email"
                    }
                  })}
                  type="email" placeholder="example@email.com"
                  className="w-full bg-transparent border-b border-neutral-700 py-3 
                             placeholder-neutral-500 outline-none focus:border-white transition 
                             text-white font-[__helveticaLight_ba7d87]" />
              </div>
              {errors.email && <p className="text-red-500 text-right">{errors.email.message}</p>}


              {/* Password */}
              <div className="text-left relative">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Password</label>
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
              {errors.password && <p className="text-red-500 text-right">{errors.password.message}</p>}

              {/* Confirm Password */}
              <div className="text-left relative">
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase">Confirm Password</label>
                <input
                  {...register("confirmPassword", {
                    required: "confirm password is required",
                    validate: (value) => value === getValues("password") || "password doesn't match"
                  })}
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
              {errors.confirmPassword && <p className="text-red-500 text-right">{errors.confirmPassword.message}</p>}


              {/* Register Button */}
              <button type="submit" className="w-full bg-white text-black py-4 rounded-md flex items-center justify-center gap-2 font-medium hover:bg-neutral-200 transition font-[__helveticaLight_ba7d87]">
                Register
              </button>


              {/* Error Message */}
              <p className="text-red-500 mt-[-20px]">{registerError}</p>


              {/* Already have account */}
              <p className="text-center text-sm text-neutral-400 mt-4 font-[__helveticaLight_ba7d87]">
                Already have an account? <NavLink to="/login" className="text-white underline">Login</NavLink>
              </p>

              {/* Terms */}
              <p className="text-[11px] text-neutral-500 mt-2 font-[__helveticaLight_ba7d87]">
                By continuing, you agree to our Terms & Conditions and Privacy Policy.
              </p>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
