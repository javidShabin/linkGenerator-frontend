import { useForm } from "react-hook-form";
import googleLogo from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/feature/userSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      console.log(response)
      toast.success("Login success");
      dispatch(saveUser(response.data.user));
      navigate("/");
    } catch (error) {
      dispatch(clearUser());
      toast.error("Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://linkgenerator-t8x6.onrender.com/v1/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl text-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#14b8a6]">
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
              className="w-full px-4 py-2 bg-white/10 text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
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
              className="w-full px-4 py-2 bg-white/10 text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
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
            className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold py-2 rounded-lg transition duration-200 shadow-lg"
          >
            Log In
          </button>
        </form>

        {/* Google Auth */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#94a3b8] mb-2">Or log in with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-white/10 py-2 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition duration-200"
          >
            <img src={googleLogo} alt="Google" className="h-6 w-6 mr-2" />
            <span className="text-[#e5e7eb] text-sm">Continue with Google</span>
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-[#94a3b8]">
          Don’t have an account?{" "}
          <Link to="/signup-page" className="text-[#14b8a6] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
