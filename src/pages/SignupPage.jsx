import { useForm } from "react-hook-form";
import googleLogo from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { BackgroundLines } from "../components/ui/BackgroundLines";
import { useState } from "react";
import { axiosInstance } from "../configs/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import VerifyOtp from "../components/VerifyOtp";
import { clearUser } from "../redux/feature/userSlice";
import { useBranding } from "../context/BrandingContext";

export default function SignupForm() {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { buttonColor, textColor } = useBranding();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/otp-generation", {
        ...data,
        role: "user",
      });
      toast.success(response.data.message);
      setUserData(data);
      setShowOtpForm(true);
    } catch (error) {
      console.log(error)
      toast.error("Signup failed");
      dispatch(clearUser());
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://linkgenerator-backend.onrender.com/api/v1/api/auth/google";
  };

  return (
    <>
      {/* Background Layer */}
      <div className="fixed inset-0 bg-[#05030e] -z-10">
        <BackgroundLines />
      </div>

      {/* Form Wrapper */}
      <div className="min-h-screen flex items-center justify-center px-4 py-1 overflow-auto">
        <div className="w-full max-w-md border border-white/10 backdrop-blur-3xl p-6 rounded-2xl shadow-2xl text-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-500"
            style={{ color: textColor || undefined }}
          >
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                Username
              </label>
              <input
                {...register("userName", { required: "Username is required" })}
                className="w-full px-4 py-2 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
              {errors.userName && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="w-full px-4 py-2 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                Phone
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                type="tel"
                className="w-full px-4 py-2 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="w-full px-4 py-2 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                className="w-full px-4 py-2 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              style={{ backgroundColor: buttonColor || undefined }}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Google Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#94a3b8] mb-2">Or sign up with</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full border border-white/10 py-2 rounded-lg flex items-center justify-center bg-[#1a1a1f] hover:bg-[#2a2a33] transition duration-200"
              style={{ backgroundColor: buttonColor || undefined }}
            >
              <img src={googleLogo} alt="Google" className="h-6 w-6 mr-2" />
              <span className="text-[#e5e7eb] text-sm" style={{ color: textColor || undefined }}>
                Continue with Google
              </span>
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-[#94a3b8]">
            Already have an account?{" "}
            <Link
              to={"/login-page"}
              className="text-purple-500 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* OTP Verification Section */}
      {showOtpForm && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#05030e] bg-opacity-70 z-10">
          <div className="bg-[#05030ea7] border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl text-white max-w-sm w-full">
            <VerifyOtp email={userData.email} />
          </div>
        </div>
      )}
    </>
  );
}
