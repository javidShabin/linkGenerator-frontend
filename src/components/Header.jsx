import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUser, saveUser } from "../redux/feature/userSlice";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/axiosInstance";
import toast from "react-hot-toast";

const Header = () => {
  const { isUserExist } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [hideHeader, setHiderHeader] = useState("");
  const [loading, setLoading] = useState(true);

  const isDashboardRoute = location.pathname.startsWith("/user/dashbord");

  useEffect(() => {
    if (isDashboardRoute) {
      setHiderHeader("hidden");
    } else {
      setHiderHeader("sticky");
    }
  }, [isDashboardRoute]);

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
        <Link
          to="/"
  
        >
          <div className="text-xl md:text-2xl font-bold tracking-wide text-white">
            <span className="text-purple-400">Whats</span> Link
          </div>
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
              className="flex items-center gap-2 bg-white/5 text-[#f3f4f6] px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition"
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
              <div className="absolute right-0 mt-2 w-44 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg text-white overflow-hidden z-50">
                <Link
                  to="/user/dashbord"
                  className="block px-4 py-2 hover:bg-yellow-400/10 text-[#f3f4f6] transition"
                  onClick={() => setOpenMenu(false)}
                >
                  🧑‍💼 My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-yellow-400/10 text-[#f3f4f6] transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login-page">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm md:text-base transition duration-300 shadow">
              Get started
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

//
