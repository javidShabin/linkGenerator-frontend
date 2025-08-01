import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Step 1: Send OTP
  const handleEmailSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/forgot-password/otp", {
        email: data.email,
      });
      toast.success(response.data.message || "OTP sent successfully");
      setEmail(data.email);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleResetSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/user/forgot-password/reset", {
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      toast.success(response.data.message || "Password reset successful");
      navigate("/login-page");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <form
        onSubmit={handleSubmit(step === 1 ? handleEmailSubmit : handleResetSubmit)}
        className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center text-[#14b8a6] mb-6">
          🔐 Reset Password
        </h2>

        {step === 1 && (
          <div className="mb-5">
            <label className="block text-sm mb-1 text-white">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
        )}

        {step === 2 && (
          <>
            <div className="mb-5">
              <label className="block text-sm mb-1 text-white">OTP</label>
              <input
                type="number"
                {...register("otp", { required: "OTP is required" })}
                placeholder="Enter OTP"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              />
              {errors.otp && <p className="text-red-400 text-sm mt-1">{errors.otp.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1 text-white">New Password</label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              />
              {errors.newPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.newPassword.message}</p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : step === 1 ? (
            "📧 Send OTP"
          ) : (
            "🔁 Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
