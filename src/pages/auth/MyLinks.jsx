import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MyLinks = () => {
  const [links, setLinks] = useState([]);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({ message: '', slug: '', phone: '', customSlug: '' });

  console.log(formData)
  

  const fetchLinks = async () => {
    try {
      const response = await axiosInstance.get('/link/get-prev-links');
      setLinks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this link?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/link/delete-link/${slug}`);
      toast.success('Link deleted successfully');
      setLinks(links.filter((link) => link.slug !== slug));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete link');
    }
  };

  const handleEditClick = (link) => {
    setEditingLink(link);
    setFormData({
      message: link.message || '',
      slug: link.slug || '',
      phone: link.phone || '',
      
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/link/update-link/${editingLink.slug}`, formData);
      toast.success('Link updated successfully');
      fetchLinks(); // Refresh list
      setEditingLink(null); // Close form
    } catch (error) {
      toast.error('Update failed');
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0d1528] px-4 py-10 text-white relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center drop-shadow-sm">
          🔗 My WhatsApp Links
        </h1>

        {links.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No links found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <div
                key={link._id}
                className="bg-[#1e293b] rounded-2xl shadow-md hover:shadow-xl p-5 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-base sm:text-lg font-semibold break-words w-4/5">{link.slug}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(link)}
                      className="p-2 rounded-full hover:bg-cyan-500/20 transition"
                      title="Edit Link"
                    >
                      <Pencil size={18} className="text-cyan-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(link.slug)}
                      className="p-2 rounded-full hover:bg-red-500/20 transition"
                      title="Delete Link"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">💬 Message</p>
                  <p className="text-sm text-gray-200 break-words">{link.message}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">📞 WhatsApp Link</p>
                  <a
                    href={link.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline break-words text-sm"
                  >
                    {link.whatsappLink}
                  </a>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-400">👁️ Clicks</p>
                  <p className="text-xl font-bold text-green-400">{link.clicks}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Form Modal */}
      {editingLink && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-[#1e293b] w-full max-w-lg p-6 rounded-xl shadow-xl border border-white/10 relative">
            <button
              onClick={() => setEditingLink(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Edit Link</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleFormChange}
                  className="w-full p-2 rounded-md bg-[#0f172a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Custom slug</label>
                <input
                  type="text"
                  name="customSlug"
                  value={formData.customSlug}
                  onChange={handleFormChange}
                  className="w-full p-2 rounded-md bg-[#0f172a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Message</label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full p-2 rounded-md bg-[#0f172a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Enter phone number"
                  className="w-full p-2 rounded-md bg-[#0f172a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLinks;
