import { useForm } from "react-hook-form";
import { axiosInstance } from "../../configs/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useBranding } from "../../context/BrandingContext";

const ProfileEdite = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { buttonColor } = useBranding();

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
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (file) {
      formData.append("profileImg", file);
    }

    try {
      await axiosInstance.patch("/user/update-user-profile", formData);
      toast.success("Profile updated successfully!");
      navigate("/user/dashbord/profile");
    } catch (error) {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05030e] flex items-center justify-center px-4 py-12 overflow-hidden font-inter">
      {/* Background glowing circles */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 rounded-full filter blur-3xl opacity-30 animate-moveCircle1"></div>
      <div className="absolute bottom-[-200px] right-[-250px] w-[400px] h-[400px] bg-teal-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle2"></div>
      <div className="absolute top-[200px] right-[-200px] w-[450px] h-[450px] bg-pink-600 rounded-full filter blur-3xl opacity-20 animate-moveCircle3"></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-extrabold mb-8 text-purple-600 text-center">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-purple-400">
              Username
            </label>
            <input
              {...register("userName", { required: "Username is required" })}
              placeholder="Enter your username"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                errors.userName
                  ? "border-red-500"
                  : "border-white/20"
              } text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition`}
            />
            {errors.userName && (
              <p className="mt-1 text-xs text-red-400">{errors.userName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-purple-400">
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
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                errors.email
                  ? "border-red-500"
                  : "border-white/20"
              } text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-purple-400">
              Phone
            </label>
            <input
              {...register("phone")}
              placeholder="Enter your phone"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-purple-400">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold shadow-lg transition-colors duration-300 ${
              loading
                ? "bg-purple-500 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-800"
            }`}
            style={{ backgroundColor: buttonColor || undefined }}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes move1 {
          0% { transform: translate(-120px, -60px) scale(1); }
          50% { transform: translate(60px, 120px) scale(1.15); }
          100% { transform: translate(-120px, -60px) scale(1); }
        }
        @keyframes move2 {
          0% { transform: translate(120px, 60px) scale(1); }
          50% { transform: translate(-60px, -120px) scale(1.1); }
          100% { transform: translate(120px, 60px) scale(1); }
        }
        @keyframes move3 {
          0% { transform: translate(-60px, 120px) scale(1); }
          50% { transform: translate(120px, -60px) scale(1.2); }
          100% { transform: translate(-60px, 120px) scale(1); }
        }
        .animate-moveCircle1 { animation: move1 20s ease-in-out infinite; }
        .animate-moveCircle2 { animation: move2 25s ease-in-out infinite; }
        .animate-moveCircle3 { animation: move3 30s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ProfileEdite;
