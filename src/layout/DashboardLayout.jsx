import UserSidebar from "../components/UserSidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex relative min-h-screen bg-[#1e293b] text-white">
      <UserSidebar />
      <main
        className={`transition-all duration-300 w-full ${
          isMobile ? "ml-0" : "ml-64"
        } p-4 md:p-6`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
