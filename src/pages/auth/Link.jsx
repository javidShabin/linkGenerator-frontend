import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const LinkGenerator = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const generateLink = async () => {
    if (!phone) return toast.error("📱 Phone number is required");
    setLoading(true);
    setGeneratedLink("");
    setShortLink("");

    try {
      const res = await axiosInstance.post("/link/create-link", {
        phone,
        message,
      });

      const fullLink = res?.data?.data?.whatsappLink;
      const generatedSlug = res?.data?.data?.slug;

      setGeneratedLink(fullLink);
      setSlug(generatedSlug);

      toast.success("Link generated!");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("📋 Copied to clipboard!");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100 px-4 py-16">
      <Toaster />
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8">
          💬 WhatsApp Link Generator
        </h1>

        <div className="space-y-5">
          <input
            type="tel"
            placeholder="Phone number with country code"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            rows={3}
            placeholder="Optional message (e.g. Hello! I’m interested...)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={generateLink}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
          >
            {loading ? "Generating..." : "Generate WhatsApp Link"}
          </button>
        </div>

        {generatedLink && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4 text-center">
            <p className="text-gray-700 font-medium text-sm">Generated Link:</p>
            <a
              href={shortLink || generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 break-all font-semibold underline"
            >
              {shortLink || generatedLink}
            </a>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={() => copyToClipboard(shortLink || generatedLink)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl text-sm"
              >
                📋 Copy
              </button>
              <a
                href={shortLink || generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm"
              >
                👁 Preview
              </a>
            </div>

            <Link to={`/user/qr-generator/${slug}`} className="block mt-6">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm transition">
                🧾 Generate QR Code
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkGenerator;
