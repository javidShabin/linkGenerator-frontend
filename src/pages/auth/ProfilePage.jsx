import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../configs/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/feature/userSlice";
import toast from "react-hot-toast";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdVerified,
  MdAccessTime,
  MdHome,
  MdLogout,
} from "react-icons/md";

const ProfilePage = () => {

  
  const [profileDetails, setProfileDetails] = useState({});
  console.log(profileDetails)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axiosInstance.get("/user/user-profile");
        setProfileDetails(res.data.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/user-logout");
      toast.success("Logout successful");
      dispatch(clearUser());
      navigate("/login-page");
    } catch (e) {
      toast.error("Logout failed");
      console.error(e);
    }
  };

  const fields = [
    { label: "Username", key: "userName", icon: <MdPerson size={20} /> },
    { label: "Email", key: "email", icon: <MdEmail size={20} /> },
    { label: "Phone", key: "phone", icon: <MdPhone size={20} /> },
    {
      label: "Account Type",
      key: "isPro",
      icon: <MdVerified size={20} />,
      render: (val) => (val ? "Pro User" : "Free User"),
    },
    {
      label: "Last Login",
      key: "lastLogin",
      icon: <MdAccessTime size={20} />,
      render: (val) => (val ? new Date(val).toLocaleString() : "Not Available"),
    },
  ];

  return (
    <div className="relative min-h-screen flex justify-center items-center p-6 overflow-hidden font-inter bg-[#05030e] text-white">
      {/* Animated glowing circles */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle1 shadow-[0_0_60px_30px_rgba(168,85,247,0.6)]"></div>
      <div className="absolute bottom-[-200px] right-[-250px] w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle2 shadow-[0_0_60px_30px_rgba(59,130,246,0.6)]"></div>
      <div className="absolute top-[200px] right-[-200px] w-[450px] h-[450px] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-moveCircle3 shadow-[0_0_60px_30px_rgba(236,72,153,0.6)]"></div>

      {/* Profile Card */}
      <div className="relative max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Image */}
          <div className="relative">
            <img
              src={profileDetails.profileImg || "https://via.placeholder.com/140"}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
            />
            <span className="absolute bottom-1 right-1 bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-full border-2 border-[#05030e] shadow-lg">
              <MdVerified color="#fff" size={18} />
            </span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold">{profileDetails.userName || "Loading..."}</h2>
            <p className="text-indigo-300 font-medium mb-6">Profile Overview</p>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fields.map(({ label, key, icon, render }) => (
                <div
                  key={key}
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-indigo-500 transition"
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-indigo-300 uppercase">{label}</p>
                    <p className="text-lg font-medium break-words truncate max-w-[200px]">
                      {render ? render(profileDetails[key]) : profileDetails[key] || "Loading..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <Link
            to="/"
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-center shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <MdHome className="inline mr-2 mb-1" />
            Back to Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
