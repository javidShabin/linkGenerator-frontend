import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Requires: npm install lucide-react

const UserSidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/user/dashbord/dashbord" },
    { name: "My Links", path: "/user/dashboard/links" },
    { name: "Settings", path: "/user/dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#0f172a] text-white rounded-md border border-white/10 shadow"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#0f172a] text-white p-6 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Link to={"/"}><h2 className="text-2xl font-bold mb-8">💬 WhatsLink</h2></Link>
        <nav className="flex flex-col gap-4">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 rounded-lg transition ${
                pathname === item.path
                  ? "bg-[#14b8a6] text-white"
                  : "hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay when sidebar is open (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;
