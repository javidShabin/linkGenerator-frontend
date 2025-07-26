import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUser, saveUser } from "../redux/feature/userSlice";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

const Header = () => {
  const { isUserExist } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(isUserExist)

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/user/check-user");
      if (response?.data?.user) {
        dispatch(saveUser(response.data.user));
      }
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
      await axiosInstance.delete("/user/logout");
      toast.success("Logout success");
      dispatch(clearUser());
      navigate("/login-page");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="w-full bg-[#0007] backdrop-blur-md border-b border-white/20 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-[#00ffd0] tracking-wide drop-shadow-sm hover:text-white transition"

        >
          💬 WhatsLink
        </Link>

        {/* Right Side */}
        {loading ? (
          <span className="text-white text-sm animate-pulse">Loading...</span>
        ) : isUserExist ? (
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition"
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
              <div className="absolute right-0 mt-2 w-44 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-white overflow-hidden z-50">
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 hover:bg-white/20 transition"
                  onClick={() => setOpenMenu(false)}
                >
                  🧑‍💼 My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-white/20 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/user/link-generating"
            className="bg-[#00ffd0] hover:bg-[#0fffc8] text-[#0f2027] px-6 py-2 rounded-full font-semibold shadow-md transition duration-300"
          >
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
