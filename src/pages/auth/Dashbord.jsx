import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);

  // ************** Fetch Link Details *******************
  const getGenerateLinkDetails = async () => {
    try {
      const response = await axiosInstance.get("/link/get-prev-links");
      setLinks(response.data.data || []);
    } catch (error) {
      console.log("Failed to fetch links", error);
    }
  };

  // ************** Fetch User Profile *******************
  const getUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/user/user-profile");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  // ************** Derived Stats *******************
  const totalLinks = links.length;

  const topLink = links.reduce((top, link) => {
    return (link.clicks || 0) > (top.clicks || 0) ? link : top;
  }, {});

  useEffect(() => {
    getUserDetails();
    getGenerateLinkDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0d1528] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Total & Top Link Card */}
          <div className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl min-h-[200px] hover:shadow-[#dd63ff40] transition-all">
            <h2 className="text-xl font-semibold text-[#dd63ff]">Links Summary</h2>
            <p className="text-4xl font-bold mt-4">{totalLinks}</p>
            <p className="text-base text-gray-400 mt-2">Total Links Created</p>
            {topLink?.slug && (
              <>
                <p className="mt-4 text-lg font-medium text-white">
                  🔗 Top Link:
                  <span className="text-[#93c5fd] ml-2">/{topLink.slug}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Clicks: {topLink.clicks || 0}
                </p>
              </>
            )}
          </div>

          {/* Pro Membership */}
          {user && (
            <div className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl min-h-[200px] hover:shadow-[#dd63ff40] transition-all">
              <h2 className="text-xl font-semibold text-[#dd63ff]">Pro Membership</h2>
              {user.isPro ? (
                <>
                  <p className="text-4xl font-bold mt-4 text-green-400">✅ Active</p>
                  <p className="text-base text-gray-400 mt-2">Full access enabled</p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-bold mt-4 text-yellow-400">🚫 Inactive</p>
                  <p className="text-base text-gray-400 mt-2">Upgrade for full access</p>
                </>
              )}
            </div>
          )}

          {/* Account Type */}
          {user && (
            <div className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl min-h-[200px] hover:shadow-[#dd63ff40] transition-all">
              <h2 className="text-xl font-semibold text-[#dd63ff]">Account Type</h2>
              <p className="text-4xl font-bold mt-4">
                {user.isPro ? "Pro" : "Free"}
              </p>
              <p className="text-base text-gray-400 mt-2">
                {user.isPro ? "Full access enabled" : "Limited features"}
              </p>
            </div>
          )}

          {/* Last Login */}
          {user && (
            <div className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl min-h-[200px] hover:shadow-[#dd63ff40] transition-all">
              <h2 className="text-xl font-semibold text-[#dd63ff]">Last Login</h2>
              <p className="text-2xl font-bold mt-4">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Not available"}
              </p>
              <p className="text-base text-gray-400 mt-2">Last activity recorded</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
