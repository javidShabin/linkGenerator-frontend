import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../configs/axiosInstance";
import { clearUser, saveUser } from "../redux/feature/userSlice";
import googleLogo from "../assets/google.png";
import { BackgroundLines } from "../components/ui/BackgroundLines";
import { useDispatch } from "react-redux";
import { useBranding } from "../context/BrandingContext";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blockLink, setBlockLinkg] = useState();
  const [loading, setLoading] = useState(false);
  const { buttonColor, textColor } = useBranding();

  useEffect(() => {
    if (blockLink) {
      try {
        const url = new URL(blockLink);
        navigate(url.pathname); // This gives "/account-blocked"
      } catch (error) {
        console.error("Invalid URL in blockLink:", blockLink);
      }
    }
  }, [blockLink, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login-user", data);
      const role = response.data.user.role; // 👈 get role
      console.log(role);
      console.log(response)
  
      toast.success("Login success");
      dispatch(saveUser(response.data.user));
  
      // 👇 navigation logic updated
      if (role === "user" || role === "pro") {
        navigate("/user/dashbord");
      } else if(role === "admin") {
        navigate("/user/admin");
      }
    } catch (error) {
      if (error.response.data.redirect) {
        setBlockLinkg(error.response.data.redirect);
      }
      dispatch(clearUser());
      toast.error("Login failed");
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
      <div className="bg-[#05030e] relative w-full h-screen">
        <BackgroundLines />
      </div>
      <div className="min-h-screen flex items-center justify-center px-4 absolute top-0 left-0 right-0">
        <div className="w-full max-w-md border border-white/10 backdrop-blur-3xl p-6 rounded-2xl shadow-2xl text-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-500" style={{ color: textColor || undefined }}>
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                    message: "Minimum 6 characters required",
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
                "Log In"
              )}
            </button>
          </form>

          {/* Google Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#94a3b8] mb-2">Or log in with</p>
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

          <div className="mt-2 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-[#94a3b8]">
            Don’t have an account?{" "}
            <Link
              to={"/signup-page"}
              className="text-purple-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
