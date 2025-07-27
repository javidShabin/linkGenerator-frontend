import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/feature/userSlice";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/user-profile");
        setProfileDetails(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    getUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/user/logout");
      toast.success("Logout successful");
      dispatch(clearUser());
      navigate("/login-page");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const fields = [
    { label: "Username", key: "userName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    {
      label: "Account Type",
      key: "isPro",
      render: (value) =>
        value ? (
          <span className="text-green-400 font-semibold">Pro User 🌟</span>
        ) : (
          <span className="text-yellow-400 font-semibold">Free User</span>
        ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] rounded-2xl shadow-2xl p-8 mt-10 border border-white/5">
      <h1 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">
        👤 Profile Overview
      </h1>

      <div className="space-y-4 text-white">
        {fields.map((field) => (
          <div
            key={field.key}
            className="flex flex-col sm:flex-row justify-between"
          >
            <span className="font-semibold text-gray-300">{field.label}:</span>
            <span className="text-lg">
              {field.render
                ? field.render(profileDetails[field.key])
                : profileDetails[field.key] || "Loading..."}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center gap-4 flex-wrap">
        <Link
          to="/"
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md"
        >
          🔙 Back to Home
        </Link>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
