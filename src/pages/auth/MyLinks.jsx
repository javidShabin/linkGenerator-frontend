import React, { useEffect, useState } from "react";
import { LinkIcon, Pencil, Trash2, X } from "lucide-react";
import { axiosInstance } from "../../configs/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useBranding } from "../../context/BrandingContext";

const MyLinks = () => {
  const [links, setLinks] = useState([]);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({
    customSlug: "",
    message: "",
    phone: "",
  });
  const { buttonColor, textColor } = useBranding();

  // New state for delete confirmation
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState(null);

  useEffect(() => {
    const getPreviousLinks = async () => {
      try {
        const response = await axiosInstance.get("/link/get-prev-links");
        setLinks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPreviousLinks();
  }, []);

  const handleEditClick = (link) => {
    setEditingLink(link);
    setFormData({
      customSlug: link.customSlug || "",
      message: link.message || "",
      phone: link.phone || "",
    });
  };

  // Modified handleDelete to be called only after confirmation
  const handleDelete = async (slug) => {
    try {
      const response = await axiosInstance.delete(`/link/delete-link/${slug}`);
      toast.success(response.data.message);
      setLinks((prev) => prev.filter((link) => link.slug !== slug));
    } catch {
      toast.error("Failed to delete link");
    } finally {
      setDeleteConfirmSlug(null);
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const originalSlug = editingLink.slug;
      const payload = {
        customSlug: formData.customSlug,
        message: formData.message,
        phone: formData.phone,
      };

      const response = await axiosInstance.put(
        `/link/update-link/${originalSlug}`,
        payload
      );

      toast.success(response.data.message || "Link updated successfully");

      setLinks((prev) =>
        prev.map((link) =>
          link.slug === originalSlug ? response.data.data : link
        )
      );

      setEditingLink(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update the link."
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05030e] text-white p-6 md:p-10 overflow-hidden font-inter">
      {/* Glowing Circles Background */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle1"></div>
      <div className="absolute bottom-[-200px] right-[-250px] w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle2"></div>
      <div className="absolute top-[200px] right-[-200px] w-[450px] h-[450px] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-moveCircle3"></div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        🔗 My WhatsApp Links
      </h1>

      {/* Links Grid */}
      {links.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-20">
          No links found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <div
              key={link._id}
              className="px-6 py-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-default"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold break-words w-4/5">
                  {link.slug}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(link)}
                    className="p-2 rounded-full hover:bg-cyan-500/20 transition"
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                    title="Edit Link"
                  >
                    <Pencil size={18} className="text-cyan-400" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmSlug(link.slug)}
                    className="p-2 rounded-full hover:bg-red-500/20 transition"
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                    title="Delete Link"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">💬 Message</p>
                <p className="text-sm text-gray-200 break-words">
                  {link.message}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">📞 WhatsApp Link</p>
                <a
                  href={link.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline break-words text-sm"
                >
                  {link.whatsappLink}
                </a>
              </div>

              <div className="flex justify-between items-center mt-4 text-gray-400">
                <p className="text-sm">👁️ Clicks</p>
                <p className="text-xl font-bold text-green-400">
                  {link.clicks}
                </p>
              </div>
              <Link to={`/user/dashbord/pro-user/qr-generator/${link.slug}`}>
                  <button
                    className={`flex item-center justify-center gap-2 px-3 py-1 rounded-2xl border border-gray-600 shadow-lg`}
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                  >QR code</button>
                </Link>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form Modal */}
      {editingLink && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div
            className="w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-purple-700 relative"
            style={{ backgroundColor: "#05030e" }}
          >
            <button
              onClick={() => setEditingLink(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-purple-500 transition-transform hover:scale-110"
              style={{ color: textColor || undefined }}
              aria-label="Close Edit Modal"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl font-extrabold mb-8 text-purple-500 tracking-wide drop-shadow-lg">
              Edit Link
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {[
                { label: "Custom Slug", name: "customSlug", type: "text" },
                {
                  label: "Message",
                  name: "message",
                  type: "textarea",
                  rows: 4,
                },
                {
                  label: "Phone Number",
                  name: "phone",
                  type: "text",
                  placeholder: "Enter phone number",
                },
              ].map(({ label, name, type, rows }) => (
                <div key={name} className="relative">
                  {type !== "textarea" ? (
                    <>
                      <input
                        id={name}
                        name={name}
                        type={type}
                        placeholder=" "
                        value={formData[name]}
                        onChange={handleFormChange}
                        className="peer block w-full rounded-xl bg-[#05030e] border border-transparent
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-60
                    text-white text-lg px-4 pt-6 pb-2 placeholder-transparent
                    transition-all duration-300 h-14"
                        autoComplete="off"
                      />
                      <label
                        htmlFor={name}
                        className="absolute left-4 top-3 text-gray-400 text-sm transition-all
                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-600 peer-focus:top-3 peer-focus:text-purple-500 peer-focus:text-sm
                    cursor-text select-none"
                      >
                        {label}
                      </label>
                    </>
                  ) : (
                    <>
                      <textarea
                        id={name}
                        name={name}
                        rows={rows}
                        placeholder=" "
                        value={formData[name]}
                        onChange={handleFormChange}
                        className="peer block w-full rounded-xl bg-[#05030e] border border-transparent
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-60
                    text-white text-lg px-4 pt-6 pb-2 placeholder-transparent
                    transition-all duration-300 resize-none h-28"
                        autoComplete="off"
                      />
                      <label
                        htmlFor={name}
                        className="absolute left-4 top-3 text-gray-400 text-sm transition-all
                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-600 peer-focus:top-3 peer-focus:text-purple-500 peer-focus:text-sm
                    cursor-text select-none"
                      >
                        {label}
                      </label>
                    </>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg
            hover:bg-purple-800 hover:shadow-purple-600/70 transition-all duration-300 transform
            hover:-translate-y-0.5 active:scale-95"
                style={{ backgroundColor: buttonColor || "#6b21a8" }}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmSlug && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div
            className="w-full max-w-md p-6 rounded-2xl bg-[#05030e] border border-red-600 shadow-lg text-white"
          >
            <h3 className="text-xl font-bold mb-4 text-red-500">
              Confirm Delete
            </h3>
            <p className="mb-6">
              Are you sure you want to delete the link <b>{deleteConfirmSlug}</b>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmSlug(null)}
                className="px-4 py-2 rounded-lg border border-gray-500 hover:border-gray-400 transition"
                style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmSlug)}
                className="px-4 py-2 rounded-lg transition text-white font-semibold"
                style={{ backgroundColor: buttonColor || "#dc2626" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations CSS */}
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

export default MyLinks;
