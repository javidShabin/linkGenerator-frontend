import { useForm } from "react-hook-form";
import { axiosInstance } from "../configs/axiosInstance";
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
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword", "");

  // Step 1: Send OTP
  const handleEmailSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/forgot-password/otp", {
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
      const response = await axiosInstance.put("/auth/forgot-password/reset", {
        email,
        otp: data.otp,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
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
    <>
      <div className="bg-[#05030e] fixed inset-0 -z-10" />
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(step === 1 ? handleEmailSubmit : handleResetSubmit)}
          className="w-full max-w-md border border-white/10 backdrop-blur-3xl bg-[#0f0c1a]/60 p-8 rounded-2xl shadow-2xl text-white"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-500">
            🔐 Reset Password
          </h2>

          {step === 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your registered email"
                className="w-full px-4 py-3 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                  OTP
                </label>
                <input
                  type="number"
                  {...register("otp", { required: "OTP is required" })}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.otp && (
                  <p className="text-sm text-red-400 mt-1">{errors.otp.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                  New Password
                </label>
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
                  className="w-full px-4 py-3 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-400 mt-1">{errors.newPassword.message}</p>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 bg-[#1a1a1f] text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
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
            ) : step === 1 ? (
              "📧 Send OTP"
            ) : (
              "🔁 Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
