import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../configs/axiosInstance";
import { Copy, Link as LinkIcon, Check, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useBranding } from "../../context/BrandingContext";

export default function LinkGenerating() {
  const [phone, setTitle] = useState("");
  const [customSlug, setCutomSlug] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const [generated, setGenerated] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBtn, setShowBtn] = useState("hidden");
  const { buttonColor, textColor } = useBranding();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  async function handleGenerate() {
    setIsPopup(true);
    setTimeout(() => setIsPopup(false), 400);

    setLoading(true);
    try {
      const response = await axiosInstance.post("/link/generate-link", {
        phone,
        customSlug,
        message,
      });
      setSlug(response.data.data.slug);
      setGenerated(response.data.data.whatsappLink);
      setBrandUrl(response.data.data.brandedPageUrl);
      setShortLink(response.data.data.shortLink);

      toast.success(response.data.message || "Link generated successfully!");
      setShowBtn("flex");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to generate link");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(textToCopy) {
    if (!textToCopy) return toast.error("Nothing to copy yet.");
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast("Copied to clipboard", { icon: <Check size={16} /> });
    });
  }

  function handleClear() {
    setTitle("");
    setCutomSlug("");
    setMessage("");
    setGenerated("");
    setBrandUrl("");
    setShortLink("");
    toast("Cleared", { icon: <Trash size={16} /> });
  }

  const baseUrl = "https://your-base-url.com/";

  return (
    <>
      <style>{`
        @keyframes popup-scale {
          0% { transform: scale(1); box-shadow: 0 0 0px rgba(255,255,255,0); }
          50% { transform: scale(1.15); box-shadow: 0 0 15px rgba(255,255,255,0.7); }
          100% { transform: scale(1); box-shadow: 0 0 0px rgba(255,255,255,0); }
        }
        .popup-animate { animation: popup-scale 0.4s ease forwards; }

        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-slide-up { animation: fadeSlideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>

      <div className="relative overflow-hidden min-h-[91vh] flex flex-col items-center justify-center bg-[#05030e] text-white p-4 sm:p-6 md:p-8">
        
        {/* Glowing Background Circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse z-0" />

        <div
          className={`w-full max-w-6xl flex flex-col gap-6 z-10 ${
            isLoaded ? "fade-slide-up" : "opacity-0"
          }`}
        >
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                Link Generator
              </h1>
              <p className="text-sm text-gray-300 mt-1">
                Create short, stylish links with a custom message.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="px-4 py-2 rounded-2xl border border-gray-700 text-sm"
                onClick={handleClear}
                style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
              >
                Clear
              </button>
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side */}
            <section className="p-6 rounded-2xl bg-gradient-to-br from-white/3 via-white/5 to-black/10 shadow-2xl backdrop-blur-md border border-white/6 flex flex-col glow-card">
              <label className="mb-2 text-sm text-gray-300">Phone</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={phone}
                placeholder="Enter phone number"
                className="w-full bg-transparent border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              />

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="mb-2 text-sm text-gray-300">CustomSlug</label>
                  <input
                    onChange={(e) => setCutomSlug(e.target.value)}
                    value={customSlug}
                    placeholder="custom-slug"
                    className="w-full bg-transparent border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Allowed: lowercase letters, numbers and dashes.
                  </p>
                </div>
              </div>

              <label className="mt-6 mb-2 text-sm text-gray-300">Message</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Write the message (optional)."
                rows={4}
                className="w-full bg-transparent border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 resize-none"
              />

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to={`/pro-user/qr-generator/${slug}`}>
                  <button
                    className={`flex-1 ${showBtn} items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold shadow-lg glow-btn`}
                    style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                  >
                    <LinkIcon size={18} /> Generate QR code
                  </button>
                </Link>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold shadow-lg glow-btn ${
                    isPopup ? "popup-animate" : ""
                  }`}
                  style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                >
                  <LinkIcon size={18} />{" "}
                  {loading ? "Generating..." : "Generate Link"}
                </button>
              </div>
            </section>

            {/* Right Side */}
            <aside className="p-6 rounded-2xl bg-gradient-to-br from-[#0b0711] via-[#0b0711]/60 to-[#0b0711] shadow-2xl border border-white/6 flex flex-col justify-between glow-card">
              <div>
                <h2 className="flex items-center gap-3 text-lg font-semibold mb-4">
                  <span className="rounded-full bg-white/8 p-2">
                    <LinkIcon size={18} />
                  </span>
                  Preview
                </h2>
                <div className="rounded-xl p-4 bg-gradient-to-b from-white/2 to-transparent border border-white/4 space-y-4">
                  {/* WhatsApp Link */}
                  <div>
                    <div className="text-sm text-gray-300">WhatsApp Link:</div>
                    <div className="mt-1 text-xs text-indigo-500 break-all">
                      {generated || baseUrl + (customSlug || "your-slug")}
                    </div>
                    {generated && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleCopy(generated)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 text-sm glow-btn"
                          style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                        >
                          <Copy size={14} /> Copy
                        </button>
                        <a
                          href={generated}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-sm border border-white/8 glow-btn"
                          style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                        >
                          <LinkIcon size={14} /> Open
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Brand URL */}
                  {brandUrl && (
                    <div>
                      <div className="text-sm text-gray-300">Brand URL:</div>
                      <div className="mt-1 text-xs text-indigo-500 break-all">
                        {brandUrl}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleCopy(brandUrl)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 text-sm glow-btn"
                          style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                        >
                          <Copy size={14} /> Copy
                        </button>
                        <a
                          href={brandUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-sm border border-white/8 glow-btn"
                          style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                        >
                          <LinkIcon size={14} /> Open
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Short Link */}
                  {shortLink && (
                    <div>
                      <div className="text-sm text-gray-300">Short Link:</div>
                      <div className="mt-1 text-xs text-indigo-500 break-all">
                        {shortLink}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleCopy(shortLink)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 text-sm glow-btn"
                          style={{ backgroundColor: buttonColor || undefined, color: textColor || undefined }}
                        >
                          <Copy size={14} /> Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-4 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
                <div>
                  Status:{" "}
                  {generated ? (
                    <span className="inline-flex items-center gap-2">
                      <Check size={14} /> Generated
                    </span>
                  ) : (
                    <span className="text-yellow-300">Not generated</span>
                  )}
                </div>
                <div>Made with ♥</div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}
