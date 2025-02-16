import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../configs/axiosInstance";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [userList, setUserList] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null); // store delete user details
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const response = await axiosInstance.get("/admin/user-details");
        const users = response.data.data.users || [];
        setUserList(users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // ✅ Stop loading after fetch
      }
    };
    getUsersList();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await axiosInstance.delete(`/admin/delete-user/${deleteTarget._id}`);
      toast.success(response.data.message);
      setUserList((prev) => prev.filter((user) => user._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async (id) => {
    try {
      const response = await axiosInstance.put(`/admin/toggle-active/${id}`);
      setUserList((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isActive: !user.isActive } : user
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05030e] text-white p-6 md:p-10 overflow-hidden font-inter">
      {/* Background Animation Circles */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle1"></div>
      <div className="absolute bottom-[-200px] right-[-250px] w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle2"></div>
      <div className="absolute top-[200px] right-[-200px] w-[450px] h-[450px] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-moveCircle3"></div>

      <h1 className="text-white text-3xl font-bold mb-8">All Users</h1>

      {/* ✅ Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : userList.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No user found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {userList.map((user) => (
            <div
              key={user._id}
              className="relative w-full max-w-[360px] mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-3 transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              {/* Toggle Button */}
              <div className="absolute top-3 left-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={user.isActive}
                    onChange={() => handleToggle(user._id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-400 rounded-full peer-focus:outline-none peer-checked:bg-green-500 transition-colors relative">
                    <span className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></span>
                  </div>
                </label>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteTarget(user)}
                className="absolute top-3 right-3 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition"
              >
                <Trash2 size={18} />
              </button>

              {/* Profile Image */}
              <img
                src={user.profileImg || "https://via.placeholder.com/150"}
                alt={user.userName}
                className="w-20 h-20 rounded-full border-2 border-white/30 mx-auto object-cover"
              />

              {/* User Info */}
              <h2 className="mt-4 text-xl font-semibold text-center">
                {user.userName}
              </h2>
              <p className="text-sm text-gray-300 text-center">{user.email}</p>

              {/* Status Badges */}
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.isActive ? "bg-green-500/70" : "bg-red-500/70"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
                {user.isPro ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/70">
                    Pro
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/70">
                    Normal
                  </span>
                )}
              </div>

              {/* Dates */}
              <div className="text-xs text-gray-400 mt-3 text-center">
                <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a2e] rounded-2xl shadow-lg p-6 max-w-sm w-full border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-3">
              Confirm Deletion
            </h2>
            <p className="text-gray-300 mb-5">
              Are you sure you want to delete{" "}
              <span className="text-red-400 font-bold">{deleteTarget.userName}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>
        {`
          @keyframes move1 {
            0% { transform: translate(-120px, -60px) scale(1); }
            50% { transform: translate(60px, 120px) scale(1.15); }
            100% { transform: translate(-120px, -60px) scale(1); }
          }
          @keyframes move2 {
            0% { transform: translate(120px, 60px) scale(1); }
            50% { transform: translate(-60px, -120px) scale(1.1); }
            100% { transform: translate(120px, 60px) scale(1); }
          }
          @keyframes move3 {
            0% { transform: translate(-60px, 120px) scale(1); }
            50% { transform: translate(120px, -60px) scale(1.2); }
            100% { transform: translate(-60px, 120px) scale(1); }
          }
          .animate-moveCircle1 { animation: move1 20s ease-in-out infinite; }
          .animate-moveCircle2 { animation: move2 25s ease-in-out infinite; }
          .animate-moveCircle3 { animation: move3 30s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default AllUsers;
