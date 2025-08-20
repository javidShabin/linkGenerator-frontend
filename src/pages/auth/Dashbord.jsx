import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";
import { axiosInstance } from "../../configs/axiosInstance";
import { useBranding } from "../../context/BrandingContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const [countLink, setCountLink] = useState();
  const [userDetails, setUserDetails] = useState();
  const { buttonColor, textColor } = useBranding();
  console.log(buttonColor, "=====")

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/user/user-profile");
        setUserDetails(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const getLinkCount = async () => {
      try {
        const response = await axiosInstance.get("/link/get-link-count-user");
        setCountLink(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLinkCount();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05030e] text-white p-4 sm:p-6 md:p-10 overflow-hidden font-inter">
      {/* Glowing Circles */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle1"></div>
      <div className="absolute bottom-[-200px] right-[-250px] w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle2"></div>
      <div className="absolute top-[200px] right-[-200px] w-[450px] h-[450px] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-moveCircle3"></div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-10">Dashboard</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6 w-full">
        
        {/* Links Summary */}
        <div className="p-6 w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between lg:col-span-2 cursor-default">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-xl font-semibold tracking-wide">Links Summary</h2>
          </div>
          <p className="text-base font-semibold text-white mb-2">
            You have created{" "}
            <span className="font-extrabold text-indigo-400">{countLink} links</span>
          </p>
          <p className="text-indigo-300 font-medium mb-3 cursor-pointer hover:underline">
            Click here to see details and edit links
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <p className="text-gray-400 text-sm leading-relaxed text-center sm:text-left">
              View all your generated links and stats
            </p>
            <Link to={"/user/dashbord/prev-liks"} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-5 py-3 rounded-lg text-white font-semibold shadow-lg transition-transform duration-300" style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}>
                View Details
              </button>
            </Link>
          </div>
        </div>

        {/* Create Link */}
        <div
          onClick={() => navigate("/user/dashbord/link-generate")}
          className="p-6 w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer row-span-2"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-600/80 text-white">
              <LinkIcon size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Create Link</h2>
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Quickly generate your personalized WhatsApp link to share with others.
          </p>

          <p className="text-gray-400 text-sm mb-6">
            Generate a new short link or QR code with just a few clicks.
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/user/dashbord/link-generate");
            }}
            className="self-start px-6 py-3 rounded-lg text-white font-semibold transition-shadow shadow-md"
            style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
          >
            Generate Link
          </button>
        </div>

        {/* Pro / Normal Membership */}
        <div className="p-6 w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-default">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xl font-semibold">
              {userDetails?.isPro ? "Premium Member" : "Normal User"}
            </h2>
          </div>

          <ul className="space-y-1 text-white text-base font-medium">
            {userDetails?.isPro ? (
              <>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 shadow-md"></span>
                  Unlimited QR code generation
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 shadow-md"></span>
                  Priority support & updates
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 shadow-md"></span>
                  Custom branding options
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 shadow-md"></span>
                  Generate WhatsApp link
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 shadow-md"></span>
                  Copy and use
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 shadow-md"></span>
                  Upgrade to premium for more features
                </li>
              </>
            )}
          </ul>

          {!userDetails?.isPro && (
            <p className="mt-6 text-gray-400 text-sm italic tracking-wide">
              Upgrade to unlock{" "}
              <Link to={"/user/check-out"} className="font-semibold text-purple-400">
                Click here
              </Link>
            </p>
          )}

          {userDetails?.isPro && (
            <p className="mt-3 text-indigo-300 text-sm italic tracking-wide">
              Thank you for being a{" "}
              <span className="font-semibold text-indigo-400">valued premium member</span>!
            </p>
          )}
        </div>

        {/* Account Type */}
        <div className="p-6 w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-default">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">Account Type</h2>
          </div>

          <div className="block sm:flex gap-5">
            <p className="break-words font-medium text-purple-500">
              {userDetails?.email || "No Email Provided"}
            </p>
            <p className="break-words font-medium mb-2">
              {userDetails?.userName || "No Username"}
            </p>
          </div>
          {userDetails?.isActive ? (
            <p className="bg-green-500 py-2 px-5 rounded-lg text-center text-white font-semibold mb-2">
              Active User
            </p>
          ) : (
            <p className="text-red-400 font-semibold mb-2">Inactive User</p>
          )}

          <p className="text-gray-300 text-sm">Standard User</p>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes move1 { 0% { transform: translate(-120px, -60px) scale(1); } 50% { transform: translate(60px, 120px) scale(1.15); } 100% { transform: translate(-120px, -60px) scale(1); } }
          @keyframes move2 { 0% { transform: translate(120px, 60px) scale(1); } 50% { transform: translate(-60px, -120px) scale(1.1); } 100% { transform: translate(120px, 60px) scale(1); } }
          @keyframes move3 { 0% { transform: translate(-60px, 120px) scale(1); } 50% { transform: translate(120px, -60px) scale(1.2); } 100% { transform: translate(-60px, 120px) scale(1); } }
          .animate-moveCircle1 { animation: move1 20s ease-in-out infinite; }
          .animate-moveCircle2 { animation: move2 25s ease-in-out infinite; }
          .animate-moveCircle3 { animation: move3 30s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}
