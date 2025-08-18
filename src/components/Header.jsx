import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUser, saveUser } from "../redux/feature/userSlice";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/axiosInstance";
import toast from "react-hot-toast";
import { useBranding } from "../context/BrandingContext";

const Header = () => {
  const { isUserExist } = useSelector((state) => state.user);
  const { buttonColor, logoText, logoUrl, logoColor, textColor } = useBranding();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [hideHeader, setHiderHeader] = useState("");
  const [loading, setLoading] = useState(true);

  const isDashboardRoute = location.pathname.startsWith("/user/dashbord");
  const isAdminDashboardRoute = location.pathname.startsWith("/user/admin");

  useEffect(() => {
    if (isDashboardRoute || isAdminDashboardRoute) {
      setHiderHeader("hidden");
    } else {
      setHiderHeader("sticky");
    }
  }, [isDashboardRoute, isAdminDashboardRoute]);

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/user/check-user-auth");
      dispatch(saveUser(response.data.data));
    } catch (error) {
      dispatch(clearUser());
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    checkUser();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/user-logout");
      toast.success("Logout success");
      dispatch(clearUser());
      navigate("/login-page");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className={`${hideHeader} w-full bg-[#05030e] shadow-md top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Brand logo"
              className="h-8 md:h-10 object-contain"
              loading="lazy"
            />
          ) : (
            <div
              className="text-xl md:text-2xl font-bold tracking-wide"
              style={{ color: logoColor || "#ffffff" }}
            >
              {logoText || (
                <>
                  <span>Whats</span> Link
                </>
              )}
            </div>
          )}
        </Link>

        {/* Right Side */}
        {loading ? (
          <span className="text-gray-300 text-sm animate-pulse">
            Loading...
          </span>
        ) : isUserExist ? (
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 bg-white/5"
              style={{ color: textColor || "#800080" }}
            >
              <span className="text-sm font-medium">👤 Profile</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  openMenu ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg overflow-hidden z-50"
                style={{ color: textColor || "#ffffff" }}
              >
                <Link
                  to="/user/dashbord"
                  className="block px-4 py-2 hover:bg-yellow-400/10 transition"
                  onClick={() => setOpenMenu(false)}
                >
                  🧑‍💼 My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-yellow-400/10 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login-page">
            <button
              style={{ backgroundColor: buttonColor || "#a855f7" }}
              className="text-white px-5 py-2 rounded-full text-sm md:text-base transition duration-300 shadow"
            >
              Get started
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
