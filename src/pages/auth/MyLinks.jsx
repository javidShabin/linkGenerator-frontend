import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

const MyLinks = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const getPrevLinks = async () => {
      try {
        const response = await axiosInstance.get('/link/get-prev-links');
        setLinks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPrevLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0d1528] px-4 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center text-white drop-shadow-sm">
          🔗 My WhatsApp Links
        </h1>

        {links.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No links found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <div
                key={link._id}
                className="bg-[#1e293b] rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-5 md:p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-base sm:text-lg font-semibold break-words w-4/5">{link.slug}</h2>
                  <Link
                    to={`/edit/${link._id}`}
                    className="p-2 rounded-full hover:bg-cyan-500/20 transition"
                    title="Edit Link"
                  >
                    <Pencil size={18} className="text-cyan-400" />
                  </Link>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">💬 Message</p>
                  <p className="text-sm sm:text-base leading-snug text-gray-200 break-words">{link.message}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">📞 WhatsApp Link</p>
                  <a
                    href={link.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline break-words text-sm sm:text-base"
                  >
                    {link.whatsappLink}
                  </a>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-400">👁️ Clicks</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-400">{link.clicks}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLinks;
