import React, { useEffect, useState } from "react";
import { axiosInstance } from "../configs/axiosInstance";

const BrandPage = () => {
  const userId = window.location.pathname.split("/")[1];
  const [slug, setSlug] = useState("");
  const [chatLink, setChatLink] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getLink = async () => {
      try {
        const response = await axiosInstance.get(
          `/link/get-latest-link/${userId}`
        );
        setSlug(response.data.data.slug);
        setChatLink(response.data.data.whatsappLink);
        setUserName(response.data.data.user.userName);
        setUserEmail(response.data.data.user.email);
        setProfilePic(response.data.data.user.profileImg);
      } catch (error) {
        console.error(error);
      }
    };
    getLink();
  }, [userId]);

  useEffect(() => {
    if (!slug) return;
    const trackLinkUsage = async () => {
      try {
        await axiosInstance.get(`/link/track-link/${slug}`);
      } catch (error) {
        console.error(error);
      }
    };
    trackLinkUsage();
  }, [slug]);

  return (
    <main
      className="
      min-h-[91vh]
        bg-gradient-to-br from-[#05030e] via-[#1a1533] to-[#05030e]
        flex flex-col items-center justify-center
        px-6
        text-white
        select-none
      "
    >
      {/* Profile Image with subtle glowing ring */}
      <div
        className="
          relative
          w-48 h-48
          rounded-full
          overflow-hidden
          mb-12
          shadow-[0_0_20px_6px_rgba(108,99,255,0.7)]
          animate-pulse-slow
          cursor-default
          flex items-center justify-center
          bg-gradient-to-tr from-[#6c63ff] to-[#8a7aff]
        "
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt={`${userName} profile`}
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
          />
        ) : (
          <span className="text-7xl font-extrabold">{userName ? userName[0].toUpperCase() : "B"}</span>
        )}
      </div>

      {/* Brand Name */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#cfc9ff] drop-shadow-lg">
        {userName || "Brand Name"}
      </h1>

      {/* Email */}
      <p className="text-lg text-[#b0aaff] mb-10 tracking-wide max-w-md text-center">
        {userEmail || "contact@brand.com"}
      </p>

      {/* Description */}
      <p className="max-w-xl text-center text-[#d0cbffcc] mb-14 px-4 leading-relaxed text-lg md:text-xl">
        Welcome to my official brand page. I’m here to help, collaborate, or just chat.
        Reach out anytime via the button below!
      </p>

      {/* Chat Now Button */}
      {chatLink ? (
        <a
          href={chatLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-gradient-to-r from-[#6c63ff] to-[#917bff]
            hover:from-[#574fd6] hover:to-[#6c63ff]
            px-14 py-4
            rounded-full
            font-semibold
            text-white
            shadow-lg
            transition-transform transform hover:scale-105
            duration-300
            select-none
            cursor-pointer
            focus:outline-none focus:ring-4 focus:ring-[#6c63ff]/60
          "
        >
          💬 Chat Now
        </a>
      ) : (
        <p className="italic text-[#a59eff]">Chat link not available</p>
      )}
    </main>
  );
};

export default BrandPage;
