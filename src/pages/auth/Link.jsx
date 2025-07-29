// ...imports remain unchanged
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const LinkGenerator = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [brandedLink, setBrandedLink] = useState(""); // ✅
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const generateLink = async () => {
    if (!phone) return toast.error("📱 Phone number is required");
    setLoading(true);
    setGeneratedLink("");
    setShortLink("");
    setBrandedLink("");

    try {
      const res = await axiosInstance.post("/link/create-link", {
        phone,
        message,
      });

      const fullLink = res?.data?.data?.whatsappLink;
      const generatedSlug = res?.data?.data?.slug;
      const brandedUrl = res?.data?.data?.brandedPageUrl;

      setGeneratedLink(fullLink);
      setSlug(generatedSlug);
      if (brandedUrl) setBrandedLink(brandedUrl);

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-16">
      <Toaster />
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 text-[#e5e7eb]">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#14b8a6] mb-8">
          💬 WhatsApp Link Generator
        </h1>

        <div className="space-y-5">
          <input
            type="tel"
            placeholder="Phone number with country code"
            className="w-full px-4 py-3 bg-white/10 text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#14b8a6] outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            rows={3}
            placeholder="Optional message (e.g. Hello! I’m interested...)"
            className="w-full px-4 py-3 bg-white/10 text-[#e5e7eb] placeholder-[#94a3b8] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#14b8a6] outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={generateLink}
            disabled={loading}
            className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
          >
            {loading ? "Generating..." : "Generate WhatsApp Link"}
          </button>
        </div>

        {generatedLink && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-5 text-center space-y-4">
            <p className="text-sm font-medium text-[#e5e7eb]">Generated Link:</p>
            <a
              href={shortLink || generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14b8a6] break-all font-semibold underline"
            >
              {shortLink || generatedLink}
            </a>

            {/* ✅ Branded Page with copy */}
            {brandedLink && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-[#e5e7eb]">Branded Page:</p>
                <a
                  href={brandedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#14b8a6] break-all font-semibold underline"
                >
                  {brandedLink}
                </a>
                <div>
                  <button
                    onClick={() => copyToClipboard(brandedLink)}
                    className="mt-2 bg-white/10 hover:bg-white/20 text-[#e5e7eb] px-4 py-2 rounded-xl text-sm transition"
                  >
                    📋 Copy Branded Link
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={() => copyToClipboard(shortLink || generatedLink)}
                className="bg-white/10 hover:bg-white/20 text-[#e5e7eb] px-4 py-2 rounded-xl text-sm transition"
              >
                📋 Copy
              </button>
              <a
                href={shortLink || generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm transition"
              >
                👁 Preview
              </a>
            </div>

            <Link to={`/pro-user/qr-generator/${slug}`} className="block mt-6">
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
