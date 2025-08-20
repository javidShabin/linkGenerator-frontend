import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { axiosInstance } from "../../configs/axiosInstance";
import toast from "react-hot-toast";
import { useBranding } from "../../context/BrandingContext";

const AddPackagePage = ({ onAdded }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "",
    duration: "",
    features: [""],
  });
  const { buttonColor, textColor } = useBranding();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (idx, value) => {
    const updated = [...form.features];
    updated[idx] = value;
    setForm((prev) => ({ ...prev, features: updated }));
  };

  const handleAddFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const handleRemoveFeature = (idx) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/package/create-package", form);
      toast.success(res.data.message);
      onAdded();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.message || "Failed to add package");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b172a] via-[#0f091b] to-[#131324] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Add New Package
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 - Name & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Package Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option className="text-black bg-slate-400" value="" disabled>
                Select Duration
              </option>
              <option className="text-black bg-slate-400" value="lifetime">
                Lifetime
              </option>
              <option className="text-black bg-slate-400" value="per year">
                Per Year
              </option>
              <option className="text-black bg-slate-400" value="per month">
                Per Month
              </option>
            </select>
          </div>

          {/* Row 2 - Price & Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <input
              type="text"
              name="currency"
              placeholder="Currency"
              value={form.currency}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block mb-3 font-medium text-gray-300">
              Features
            </label>
            <div className="max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {form.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 
                               focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-3 rounded-lg transition"
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition mt-2"
              style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
            >
              <Plus className="w-5 h-5" /> Add Feature
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg shadow-lg transition"
            style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
          >
            Add Package
          </button>
        </form>
      </div>

      {/* Custom scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default AddPackagePage;
