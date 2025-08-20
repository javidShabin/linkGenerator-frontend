import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { axiosInstance } from "../../configs/axiosInstance";
import toast from "react-hot-toast";
import { useBranding } from "../../context/BrandingContext";

const EditPackageModal = ({ pkg, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "",
    duration: "",
    features: []
  });

  const durations = ["lifetime", "per year", "per month"];
  const { buttonColor, textColor } = useBranding();

  useEffect(() => {
    if (pkg) {
      setForm({
        name: pkg.name || "",
        price: pkg.price || "",
        currency: pkg.currency || "",
        duration: pkg.duration || "",
        features: pkg.features || []
      });
    }
  }, [pkg]);

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
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/package/package/${pkg._id}`,
        form
      );
      toast.success(res.data.message);
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#1f1c2c] via-[#2d1f4c] to-[#1a1a2e] rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-white relative border border-white/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          style={{ color: textColor || undefined }}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-1xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Edit Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 - Name & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Package Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option className="text-black rounded-lg bg-slate-400" value="">Select Duration</option>
              {durations.map((d) => (
                <option className="text-black rounded-lg bg-slate-400" key={d} value={d}>
                  {d}
                </option>
              ))}
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
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="currency"
              placeholder="Currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block mb-3 font-medium text-gray-300">Features</label>
            <div className="max-h-48 overflow-y-auto pr-1">
              {form.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPackageModal;
