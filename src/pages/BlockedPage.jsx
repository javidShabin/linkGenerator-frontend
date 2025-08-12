import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const BlockedPage = () => {
  return (
    <div className="h-screen w-full bg-[#05030e] flex items-center justify-center px-4">
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_50px_#2d0a3d55] rounded-3xl px-10 py-12 max-w-md w-full text-center text-white">
        {/* Glowing outline */}
        <div className="absolute inset-0 rounded-3xl border border-purple-900/30 shadow-[0_0_60px_20px_#9b4dff22] pointer-events-none"></div>

        {/* Icon with luxury glow */}
        <div className="flex justify-center mb-6">
          <div className="bg-purple-700/20 p-5 rounded-full shadow-md shadow-purple-800/30">
            <Lock className="text-purple-300 w-10 h-10" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold mb-3 text-purple-200 tracking-tight">
          Account Blocked
        </h1>

        {/* Message */}
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          Your account has been temporarily restricted due to suspicious activity or policy violations. Please contact support for more info.
        </p>

        {/* Return Button */}
        <Link
          to="/"
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-white font-semibold shadow-lg"
        >
          Return to Homepage
        </Link>

        {/* Optional Support Link */}
        <a
          href="mailto:support@example.com"
          className="mt-4 block text-sm text-purple-400 hover:underline hover:text-purple-300"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default BlockedPage;
