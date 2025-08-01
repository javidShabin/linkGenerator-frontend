import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const BlockedPage = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1e1e2f] via-[#12121a] to-[#1c1c2b] flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white/10 border border-white/10 shadow-xl rounded-3xl p-10 max-w-md text-center text-white">
        <div className="flex justify-center mb-6">
          <div className="bg-red-600/20 p-4 rounded-full">
            <Lock className="text-red-400 w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Account Blocked</h1>
        <p className="text-gray-300 mb-6">
          Your account has been temporarily blocked by the admin due to policy violations or suspicious activity.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default BlockedPage;
