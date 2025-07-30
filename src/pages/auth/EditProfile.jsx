import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export default function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // <-- Loading state added

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.userName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (file) {
      formData.append("profileImg", file);
    }

    try {
      const response = await axiosInstance.put("/user/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      navigate("/user/dashboard/profile")
    } catch (error) {
      toast.error("Profile update failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl text-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#14b8a6]">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
              Username
            </label>
            <input
              {...register("userName", { required: "Username is required" })}
              className="w-full px-4 py-2 bg-white/10 text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              placeholder="Enter your name"
            />
            {errors.userName && (
              <p className="text-sm text-red-400 mt-1">{errors.userName.message}</p>
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
              className="w-full px-4 py-2 bg-white/10 text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
              Phone
            </label>
            <input
              {...register("phone")}
              className="w-full px-4 py-2 bg-white/10 text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              placeholder="Enter your phone"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#e5e7eb]">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-[#e5e7eb]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded-lg transition duration-200 shadow-lg ${
              loading
                ? "bg-[#0d9488] cursor-not-allowed"
                : "bg-[#14b8a6] hover:bg-[#0d9488]"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
