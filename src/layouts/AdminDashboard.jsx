import React, { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/feature/userSlice";
import { axiosInstance } from "../configs/axiosInstance";
import AdminSideBar from "../components/auth/adminSideBar";

const HamburgerIcon = ({ isOpen, toggle }) => (
  <button
    aria-label="Toggle sidebar"
    onClick={toggle}
    className="fixed top-4 left-4 z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5 md:hidden"
  >
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={`block h-1 w-8 rounded-full bg-white transition-all duration-300 ease-in-out
          ${
            isOpen
              ? i === 0
                ? "translate-y-2 rotate-45"
                : i === 1
                ? "opacity-0"
                : "translate-y-[-8px] -rotate-45"
              : "translate-y-0 rotate-0 opacity-100"
          }
        `}
      />
    ))}
  </button>
);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get("/user/check-user-auth");
        const {role, userName, profileImg} = response.data.data
        localStorage.setItem("user", JSON.stringify({ role, userName, profileImg }));
        console.log(response)
      } catch (error) {
       
        console.error("Error checking user:", error);
      }
    };
    checkUser();
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#070510] overflow-hidden">
      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#0b0710]/90 via-[#0a0810]/80 to-[#070510]/90
          backdrop-blur-sm border-r border-white/10 shadow-2xl rounded-r-3xl z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:shadow-none md:rounded-none md:border-r-white/6
        `}
      >
        <AdminSideBar
          onNavigate={() => {
            if (isMobile) setSidebarOpen(false);
          }}
        />
      </div>

      {/* Hamburger toggle */}
      {isMobile && (
        <HamburgerIcon
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-[100%]">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
