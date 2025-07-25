import { useForm } from "react-hook-form";
import googleLogo from "../assets/google.png";
import { axiosInstance } from "../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/feature/userSlice";

export default function SignupForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/user/signup", {
        ...data,
        role: "user",
      });

      toast.success(response.data.message);
dispatch(saveUser(response.data.user))
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Signup failed");
      dispatch(clearUser());
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 sm:px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-5 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 text-center">
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("userName", { required: "Username is required" })}
              className="mt-1 w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
            {errors.userName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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
              className="mt-1 w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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
              className="mt-1 w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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
              className="mt-1 w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className="mt-1 w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white text-sm py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Google Auth */}
        <div className="mt-5 text-center">
          <p className="text-xs text-gray-500 mb-2">Or sign up with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-200"
          >
            <img src={googleLogo} alt="Google" className="h-5 w-5 mr-2" />
            <span className="text-sm">Continue with Google</span>
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-5 text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link to={"/login-page"} className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
