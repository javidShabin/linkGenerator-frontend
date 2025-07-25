import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          💬 WhatsLink
        </Link>

        {/* Call to Action */}
        <Link
          to="/user/link-generating"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;
