import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/feature/userSlice";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaPhone, FaSignOutAlt, FaHome, FaCrown, FaClock } from "react-icons/fa";

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
    { label: "Username", key: "userName", icon: <FaUser /> },
    { label: "Email", key: "email", icon: <FaEnvelope /> },
    { label: "Phone", key: "phone", icon: <FaPhone /> },
    {
      label: "Account Type",
      key: "isPro",
      icon: <FaCrown />,
      render: (value) =>
        value ? (
          <span className="text-green-400 font-semibold">Pro User 🌟</span>
        ) : (
          <span className="text-yellow-400 font-semibold">Free User</span>
        ),
    },
    {
      label: "Last Login",
      key: "lastLogin",
      icon: <FaClock />,
      render: (value) =>
        value ? (
          <span className="text-blue-300">
            {new Date(value).toLocaleString()}
          </span>
        ) : (
          "Not Available"
        ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] px-4 py-10 text-white">
      <div className="bg-[#1e293b] w-full max-w-2xl rounded-3xl shadow-2xl p-8 border border-white/10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {profileDetails.userName?.[0] || "U"}
          </div>
          <h1 className="mt-4 text-2xl font-bold">{profileDetails.userName}</h1>
          <p className="text-gray-400">Profile Overview</p>
        </div>

        <div className="space-y-5">
          {fields.map((field) => (
            <div
              key={field.key}
              className="flex items-center justify-between border-b border-white/10 pb-3"
            >
              <div className="flex items-center gap-3 text-gray-300">
                {field.icon}
                <span className="font-medium">{field.label}</span>
              </div>
              <span className="text-right">
                {field.render
                  ? field.render(profileDetails[field.key])
                  : profileDetails[field.key] || "Loading..."}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg"
          >
            <FaHome /> Back to Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
