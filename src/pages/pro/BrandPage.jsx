import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const BrandPage = () => {
  const [chatLink, setChatLink] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/link/latest-link");
        const userData = response.data.data.user;
        setChatLink(response.data.data.whatsappLink);
        setUserName(userData.userName || "Awesome User");
        setUserEmail(userData.email || "example@example.com");
        setProfilePic(
          userData.profilePic ||
            "https://ui-avatars.com/api/?name=" + userData.name?.split(" ").join("+")
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 text-[#e5e7eb] text-center transition-all duration-300">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={profilePic}
            alt="Profile"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#14b8a6] shadow-xl object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Welcome Heading */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#14b8a6] mb-1">
          👋 Hey, I'm {userName}
        </h1>
        <p className="text-sm text-gray-400 mb-4">{userEmail}</p>

        {/* Custom Message */}
        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
          Let’s connect! I’m just a message away. Whether you have a question,
          a collaboration idea, or just want to say hi, feel free to reach out.
        </p>

        {/* Call to Action */}
        <div className="space-y-4">
          <p className="text-gray-400 text-sm md:text-base">
            📲 Tap below to start a chat on WhatsApp.
          </p>

          <a
            href={chatLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#14b8a6] hover:bg-[#0d9488] text-black font-semibold py-3 px-8 rounded-xl transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            💬 Chat Now
          </a>
        </div>

        {/* Footer */}
        <div className="mt-10 text-xs text-gray-500">
          Powered by{" "}
          <span className="text-[#14b8a6] font-semibold">WhatsGenie</span>
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
