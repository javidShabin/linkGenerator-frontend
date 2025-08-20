import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../configs/axiosInstance";
import { Pencil, Trash2, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import toast from "react-hot-toast";
import EditPackageModal from "../../../components/auth/EditPackageModel"; // import your modal
import { Link } from "react-router-dom";
import { useBranding } from "../../../context/BrandingContext";

const Plans = () => {
  const [currentPackage, setCurrentPackage] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null); // store pkg to edit
  const [loading, setLoading] = useState(false); // ✅ loading state
  const { buttonColor, textColor } = useBranding();

  const getAllPackages = async () => {
    setLoading(true); // start loading
    try {
      const response = await axiosInstance.get("/package/get-packages-admin");
      setCurrentPackage(response.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/package/del-package/${id}`);
      toast.success(response.data.message);
      getAllPackages(); // refresh list after delete
    } catch (error) {
      console.log(error);
      toast.error(error.response?.message || "Delete failed");
    }
  };

  const handleEdit = (id) => {
    const pkg = currentPackage.find((p) => p._id === id);
    setEditingPackage(pkg); // open modal with package data
  };

  const handleToggle = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `/package/packages/${id}/toggle-status`
      );
      toast.success(response.data.message);
      getAllPackages(); // refresh list
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05030e] text-white p-6 md:p-10 overflow-hidden font-inter">
      {/* Background Animation */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle1"></div>
      <div className="absolute bottom-[-200px] right-[-250px] w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle2"></div>
      <div className="absolute top-[200px] right-[-200px] w-[450px] h-[450px] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-moveCircle3"></div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-6 relative z-10">
        Manage Packages
      </h1>

      {/* New Plan Button */}
      <div className="relative z-10 flex justify-center mb-12">
        <Link to={"/user/admin/add-plans"}>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition" style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}>
            <Plus className="w-5 h-5" /> New Plan
          </button>
        </Link>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="relative z-10 flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPackage.length > 0 ? (
            currentPackage.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Package Header */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{pkg.name}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pkg.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {pkg.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Package Info */}
                <div className="mb-4 space-y-1">
                  <p className="text-gray-300">
                    <strong>Price:</strong> {pkg.price} {pkg.currency}
                  </p>
                  <p className="text-gray-300">
                    <strong>Duration:</strong> {pkg.duration}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Features:</h3>
                  <ul className="list-disc list-inside text-gray-200 space-y-1">
                    {pkg.features?.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleToggle(pkg._id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg transition"
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                  >
                    {pkg.isActive ? (
                      <ToggleRight className="w-5 h-5" />
                    ) : (
                      <ToggleLeft className="w-5 h-5" />
                    )}
                    Toggle
                  </button>

                  <button
                    onClick={() => handleEdit(pkg._id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg transition"
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                  >
                    <Pencil className="w-5 h-5" /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg transition"
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                  >
                    <Trash2 className="w-5 h-5" /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No packages found.
            </p>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingPackage && (
        <EditPackageModal
          pkg={editingPackage}
          onClose={() => setEditingPackage(null)}
          onUpdated={getAllPackages}
        />
      )}

      {/* Animations */}
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

export default Plans;
