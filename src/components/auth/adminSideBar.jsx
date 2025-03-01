import React, { useEffect, useState } from "react";
import {
  Home,
  User,
  Users,
  Crown,
  CreditCard,
  ClipboardList,
  Settings,
  LogOut,
  UserCog,
  Shield,
} from "lucide-react";
import { axiosInstance } from "../../configs/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearUser } from "../../redux/feature/userSlice";

export default function AdminSideBar({ onNavigate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { isUserExist } = useSelector((state) => state.user);

  let userDetails;

  function getUserDetails() {
    userDetails = JSON.parse(localStorage.getItem("user")) || {};
  }

  getUserDetails();

  const items = [
    { id: "Dashboard", label: "Dashboard", icon: Home },
    {
      id: "Profile",
      label: "Profile",
      icon: User,
      path: "/user/admin/profile",
    },
    {
      id: "All-users",
      label: "All-users",
      icon: Users,
      path: "/user/admin/all-users",
    },
    {
      id: "Pro-users",
      label: "Pro-users",
      icon: Crown,
      path: "/user/admin/pro-users",
    },
    {
      id: "Payments",
      label: "Payments",
      icon: CreditCard,
      path: "/user/admin/payment-details",
    },
    {
      id: "Plans",
      label: "Plans",
      icon: ClipboardList,
      path: "/user/admin/payment-plans",
    },
    {
      id: "Settings",
      label: "Settings",
      icon: Settings,
      path: "/user/settings",
      dropdown: true,
    },
  ];

  function handleNav(item) {
    setActive(item.id);
    if (onNavigate) onNavigate(item.id);
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/user-logout");
      toast.success("Logout success");
      localStorage.removeItem("user");
      navigate("/login-page");
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="flex flex-col justify-between text-white p-4 w-72 h-screen bg-gradient-to-b from-[#0b0710]/80 via-[#0a0810]/70 to-[#070510]/90 backdrop-blur-sm rounded-r-[5px] border-r border-white/6 shadow-2xl">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl p-2 shadow-lg ring-1 ring-white/6 bg-gradient-to-br from-purple-800 to-purple-500">
            <span className="font-extrabold tracking-tight">TS</span>
          </div>
          <div>
            <Link to={"/user/admin"}>
              <h1 className="text-lg font-bold leading-none">Admin Panel</h1>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {items.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;

            return (
              <div key={it.id} className="relative">
                <Link
                  to={!it.dropdown ? it.path : "#"}
                  onClick={() => {
                    handleNav(it);
                    if (it.dropdown) setSettingsOpen((prev) => !prev);
                  }}
                  className={`
                    flex items-center gap-3 w-full text-sm rounded-xl p-2 transition-all hover:translate-x-1
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-purple-800 shadow-lg text-white"
                        : "bg-transparent text-white/80 hover:text-white"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{it.label}</div>
                    <div className="text-xs text-white/50">
                      {isActive ? "Active" : ""}
                    </div>
                  </div>
                  {it.dropdown && (
                    <div className="text-xs text-white/40">
                      {settingsOpen ? "▲" : "▼"}
                    </div>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {it.dropdown && settingsOpen && (
                  <div className="ml-12 mt-1 flex flex-col gap-1">
                    <Link
                      to={"/user/admin/edit-profile"}
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
                    >
                      <UserCog size={14} /> Profile edit
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {isUserExist ? (
        <div className="flex items-center gap-3">
          <img
            src={userDetails?.profileImg}
            alt="avatar"
            className="w-10 h-10 rounded-full ring-1 ring-white/10"
          />
          <div>
            <div className="text-sm font-semibold">{userDetails?.userName}</div>
            <div className="text-xs text-white/50">{userDetails?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <Link
          to={"/login-page"}
          className={`mt-8 py-2 text-center rounded-[10px] bg-purple-600 hover:bg-purple-700 transition duration-300 text-white text-lg font-semibold shadow-xl`}
        >
          <button>🚀 Get Started</button>
        </Link>
      )}
    </aside>
  );
}
